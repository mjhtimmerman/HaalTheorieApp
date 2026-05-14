import { supabase } from "./supabase";

type DashboardRange = "week" | "month" | "year";

type Purchase = {
  lw_id: string;
  price: number | string | null;
  started_at: string;
  expires_at: string | null;
  is_free: boolean | null;
};

type User = {
  lw_id: string;
  lw_created_at: string;
};

function getStartDate(range: DashboardRange) {
  const now = new Date();
  const startDate = new Date(now);

  if (range === "week") {
    startDate.setDate(now.getDate() - 6);
  }

  if (range === "month") {
    startDate.setMonth(now.getMonth() - 1);
  }

  if (range === "year") {
    startDate.setFullYear(now.getFullYear() - 1);
  }

  startDate.setHours(0, 0, 0, 0);

  return startDate;
}

function formatLabel(date: Date) {
  return date.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
  });
}

function getDateKey(date: Date) {
  return date.toLocaleDateString("sv-SE", {
    timeZone: "Europe/Amsterdam",
  });
}

function getDateString(dateString: string) {
  return new Date(dateString).toLocaleDateString("sv-SE", {
    timeZone: "Europe/Amsterdam",
  });
}

function isOnOrAfterDate(dateString: string, compareDate: Date) {
  return getDateString(dateString) >= getDateKey(compareDate);
}

function isBeforeDate(dateString: string, compareDate: Date) {
  return getDateString(dateString) < getDateKey(compareDate);
}

export async function getDashboardData(range: DashboardRange = "week") {
  const now = new Date();
  const startDate = getStartDate(range);
  const previousStartDate = new Date(startDate);

  if (range === "week") {
    previousStartDate.setDate(startDate.getDate() - 7);
  }

  if (range === "month") {
    previousStartDate.setMonth(startDate.getMonth() - 1);
  }

  if (range === "year") {
    previousStartDate.setFullYear(startDate.getFullYear() - 1);
  }

  const { data: purchases, error } = await supabase
    .from("purchases")
    .select("lw_id, price, started_at, expires_at, is_free")
    .gte("started_at", previousStartDate.toISOString())
    .order("started_at", { ascending: true });

  if (error) {
    console.error("Error loading dashboard data:", error);

    return {
      totalRevenue: 0,
      previousRevenue: 0,
      revenuePercentageChange: null,
      activeStudents: 0,
      accountConversion: null,
      accountConversionPercentageChange: null,
      revenueChartData: [],
    };
  }

const todayKey = new Date().toISOString().slice(0, 10);

const { data: activePurchases, error: activeStudentsError } = await supabase
  .from("purchases")
  .select("expires_at, is_free")
  .eq("is_free", false)
  .gte("expires_at", `${todayKey}T00:00:00.000Z`);

  if (activeStudentsError) {
    console.error("Error loading active students:", activeStudentsError);
  }

  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("lw_id, lw_created_at")
    .gte("lw_created_at", previousStartDate.toISOString());

  if (usersError) {
    console.error("Error loading users:", usersError);
  }

  const activeStudents = activePurchases?.length ?? 0;

  const paidPurchases = (purchases as Purchase[]).filter(
    (purchase) => !purchase.is_free
  );

  const usersList = (users as User[]) ?? [];

  const currentPeriodPurchases = paidPurchases.filter((purchase) => {
    return isOnOrAfterDate(purchase.started_at, startDate);
  });

  const previousPeriodPurchases = paidPurchases.filter((purchase) => {
    return (
      isOnOrAfterDate(purchase.started_at, previousStartDate) &&
      isBeforeDate(purchase.started_at, startDate)
    );
  });

  const currentPeriodUsers = usersList.filter((user) => {
    return isOnOrAfterDate(user.lw_created_at, startDate);
  });

  const previousPeriodUsers = usersList.filter((user) => {
    return (
      isOnOrAfterDate(user.lw_created_at, previousStartDate) &&
      isBeforeDate(user.lw_created_at, startDate)
    );
  });

  const currentPeriodUserIds = new Set(
    currentPeriodUsers.map((user) => user.lw_id)
  );

  const previousPeriodUserIds = new Set(
    previousPeriodUsers.map((user) => user.lw_id)
  );

  const currentUniquePaidUsers = new Set(
    currentPeriodPurchases
      .filter((purchase) => currentPeriodUserIds.has(purchase.lw_id))
      .map((purchase) => purchase.lw_id)
  );

  const previousUniquePaidUsers = new Set(
    previousPeriodPurchases
      .filter((purchase) => previousPeriodUserIds.has(purchase.lw_id))
      .map((purchase) => purchase.lw_id)
  );

  const accountConversion =
    currentPeriodUsers.length === 0
      ? null
      : (currentUniquePaidUsers.size / currentPeriodUsers.length) * 100;

  const previousAccountConversion =
    previousPeriodUsers.length === 0
      ? null
      : (previousUniquePaidUsers.size / previousPeriodUsers.length) * 100;

  const accountConversionPercentageChange =
    previousAccountConversion === null ||
    previousAccountConversion === 0 ||
    accountConversion === null
      ? null
      : ((accountConversion - previousAccountConversion) /
          previousAccountConversion) *
        100;

  const totalRevenue = currentPeriodPurchases.reduce((sum, purchase) => {
    return sum + Number(purchase.price || 0);
  }, 0);

  const previousRevenue = previousPeriodPurchases.reduce((sum, purchase) => {
    return sum + Number(purchase.price || 0);
  }, 0);

  const revenuePercentageChange =
    previousRevenue === 0
      ? null
      : ((totalRevenue - previousRevenue) / previousRevenue) * 100;

  const revenueByDay: Record<string, number> = {};

  currentPeriodPurchases.forEach((purchase) => {
    const key = getDateKey(new Date(purchase.started_at));

    revenueByDay[key] =
      (revenueByDay[key] || 0) + Number(purchase.price || 0);
  });

  const revenueChartData = [];
  const currentDate = new Date(startDate);

  while (currentDate <= now) {
    const key = getDateKey(currentDate);

    revenueChartData.push({
      name: formatLabel(currentDate),
      omzet: revenueByDay[key] || 0,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return {
    totalRevenue,
    previousRevenue,
    revenuePercentageChange,
    activeStudents,
    accountConversion,
    accountConversionPercentageChange,
    revenueChartData,
  };
}