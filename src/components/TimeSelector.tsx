import Link from "next/link"

type DashboardRange = "week" | "month" | "year"

type TimeSelectorProps = {
  activeRange?: DashboardRange
}

const ranges: { label: string; value: DashboardRange }[] = [
  { label: "Afgelopen week", value: "week" },
  { label: "Afgelopen maand", value: "month" },
  { label: "Afgelopen jaar", value: "year" },
]

const TimeSelector = ({ activeRange = "week" }: TimeSelectorProps) => {
  return (
    <div className="flex justify-begin">
      <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm">
        {ranges.map((range) => (
          <Link
            key={range.value}
            href={`/dashboard/admin?range=${range.value}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeRange === range.value
                ? "bg-[#91579A] text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {range.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TimeSelector