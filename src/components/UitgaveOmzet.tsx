"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type RevenueChartPoint = {
  name: string;
  omzet: number;
};

type UitgaveOmzetProps = {
  data: RevenueChartPoint[];
};

const UitgaveOmzet = ({ data }: UitgaveOmzetProps) => {
  return (
    <div className="bg-white rounded-xl p-4 w-full shadow-sm hover:shadow-md transition-all duration-200">
      <h1 className="text-lg font-bold mb-4">Omzet</h1>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tickLine={false} dataKey="name" />
            <YAxis tickLine={false} />
            <Tooltip
  formatter={(value) => {
    const numberValue = Number(value);

    return [
      `€${numberValue.toFixed(2).replace(".", ",")}`,
      "Omzet",
    ];
  }}
/>
            <Legend />

            <Line
              type="monotone"
              dataKey="omzet"
              stroke="#7F4287"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UitgaveOmzet;