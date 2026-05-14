import Scorecard from "@/components/Scorecard"
import TrafficSplit from "@/components/TrafficSplit"
import UitgaveOmzet from "@/components/UitgaveOmzet"
import SocialFunnel from "@/components/SocialFunnel"
import { getDashboardData } from "@/lib/dashboard-data"
import TimeSelector from "@/components/TimeSelector"

type DashboardRange = "week" | "month" | "year"

type AdminPageProps = {
  searchParams: {
    range?: DashboardRange;
  };
};

const AdminPage = async ({ searchParams }: AdminPageProps) => {
  const params = await searchParams
  const activeRange = params.range ?? "week";
  const dashboardData = await getDashboardData(activeRange);

  return (
    <div className="p-4 flex gap-4 flex-col overflow-x-hidden overflow-y-visible">

      <TimeSelector activeRange={activeRange} />

      {/* Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <Scorecard type="Omzet" value={dashboardData.totalRevenue} percentage={dashboardData.revenuePercentageChange}/>
        <Scorecard type="ROAS" />
        <Scorecard type="Account conversie" value={dashboardData.accountConversion ?? 0} percentage={dashboardData.accountConversionPercentageChange} format="percentage" />
        <Scorecard type="Actieve leerlingen" value={dashboardData.activeStudents} format="number" />
      </div>

      {/* Grafieken */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full pb-3">
        <div className="lg:col-span-6 min-w-0">
          <UitgaveOmzet data={dashboardData.revenueChartData} />
        </div>

        <div className="lg:col-span-3 min-w-0">
          <SocialFunnel />
        </div>

        <div className="lg:col-span-3 min-w-0">
          <TrafficSplit />
        </div>
      </div>
    </div>
  )
}

export default AdminPage