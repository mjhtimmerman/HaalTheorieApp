type ScorecardProps = {
  type: string;
  value?: number;
  percentage?: number | null;
  format?: "currency" | "number" | "percentage";
};

const Scorecard = ({ type, value = 0, percentage, format = "currency" }: ScorecardProps) => {
  const formattedValue = value.toFixed(2);
  const [whole, decimal] = formattedValue.split(".");
  const isPositive = percentage !== null && percentage !== undefined && percentage >= 0;

  return (
    <div className="rounded-2xl odd:bg-[#DFC2E4] even:bg-[#E9D5EC] p-5 min-w-[130px] min-h-[140px] flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <h1 className="font-semibold text-sm text-[#4B4450]">{type}</h1>
      </div>

      <div className="flex items-baseline justify-center leading-none">
{format === "currency" && (
  <>
    <span className="text-3xl font-bold tracking-tight">
      €{whole}
    </span>

    <span className="text-sm ml-[2px] font-semibold opacity-70">
      ,{decimal}
    </span>
  </>
)}

{format === "number" && (
  <span className="text-3xl font-bold tracking-tight">
    {Math.round(value)}
  </span>
)}

{format === "percentage" && (
  <>
    <span className="text-3xl font-bold tracking-tight">
      {value.toFixed(1)}
    </span>

    <span className="text-sm ml-[2px] font-semibold opacity-70">
      %
    </span>
  </>
)}
      </div>

<div
  className={`flex items-center gap-1 text-xs font-semibold ml-auto ${
    percentage === null || percentage === undefined
      ? "text-gray-400"
      : isPositive
        ? "text-green-600"
        : "text-red-600"
  }`}
>
  {percentage === null || percentage === undefined ? (
    <span>—</span>
  ) : (
    <>
      <span>{isPositive ? "↑" : "↓"}</span>
      <span>{Math.abs(percentage).toFixed(1)}%</span>
    </>
  )}
</div>
    </div>
  );
};

export default Scorecard;