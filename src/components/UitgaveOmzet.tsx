"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "3 mei", uitgaven: 4000, omzet: 2400 },
  { name: "4 mei", uitgaven: 3000, omzet: 1398 },
  { name: "5 mei", uitgaven: 2000, omzet: 9800 },
  { name: "6 mei", uitgaven: 2780, omzet: 3908 },
  { name: "7 mei", uitgaven: 1890, omzet: 4800 },
  { name: "8 mei", uitgaven: 2390, omzet: 3800 },
  { name: "9 mei", uitgaven: 3490, omzet: 4300 },
];

const UitgaveOmzet = () => {
  return (
    <div className="bg-white rounded-xl p-4 w-full shadow-sm hover:shadow-md transition-all duration-200">
      <h1 className="text-lg font-bold mb-4">Uitgave en omzet</h1>

      <LineChart width={550} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis tickLine={false} dataKey="name" />
        <YAxis tickLine={false} />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="uitgaven" stroke="#DFC2E4" strokeWidth={3} />
        <Line type="monotone" dataKey="omzet" stroke="#7F4287" strokeWidth={3} />
      </LineChart>
    </div>
  );
};

export default UitgaveOmzet;