const Scorecard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:bg-[#DFC2E4] even:bg-[#E9D5EC] p-5 min-w-[130px] min-h-[140px] flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">

      {/* Top */}
      <div className="flex items-start justify-between">
        <h1 className="font-semibold text-sm text-[#4B4450]">
          {type}
        </h1>
      </div>

      {/* Main number */}
      <div className="flex items-baseline justify-center leading-none">
        <span className="text-3xl font-bold tracking-tight">
          €1693
        </span>

        <span className="text-sm ml-[2px] font-semibold opacity-70">
          ,32
        </span>
      </div>

      {/* Bottom */}
      <div className="flex items-center gap-1 text-green-600 text-xs font-semibold ml-auto">
        <span>↑</span>
        <span>12%</span>
      </div>

    </div>
  )
}

export default Scorecard