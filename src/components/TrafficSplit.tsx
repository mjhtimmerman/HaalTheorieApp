"use client";

import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";

const data = [
  { name: "Betaald", uv: 41.6, pv: 4567, fill: "#E9D5EC" },    
  { name: "Organisch", uv: 58.4, pv: 2400, fill: "#7F4287" },
  { name: "Totaal", uv: 100, pv: 6967, fill: "white" },
];

const TrafficSplit = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="text-lg font-bold mb-4">Verkeer</div>

      <RadialBarChart
        width={400}
        height={300}
        cx="35%"
        cy="50%"
        innerRadius="40%"
        outerRadius="100%"
        barSize={28}
        data={data}
      >
        <RadialBar background dataKey="uv" />
        <Tooltip />
      </RadialBarChart>
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full bg-[#7F4287]"></div>
          <span className="text-sm text-black-500">Organisch</span>
            <span className="text-xs text-black-500">58,4%</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full bg-[#E9D5EC]"></div>
          <span className="text-sm text-black-500">Betaald</span>
          <span className="text-xs text-black-500">41,6%</span>
        </div>
      </div>
    </div>
  );
};

export default TrafficSplit;