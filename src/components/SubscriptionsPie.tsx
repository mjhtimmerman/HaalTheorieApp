"use client";

import { Pie, PieChart, PieLabelRenderProps, PieSectorShapeProps, Sector } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
const data = [
  { name: 'Deluxe', value: 86 },
  { name: 'Gratis examen', value: 75 },
  { name: 'Examens', value: 3 },
  { name: 'Plus', value: 2 },
];

// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ['#91579A', '#B57CBD', '#D4B1D9', '#E9D5EC'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null || percent == null || percent < 0.1) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

const SubscriptionsPie = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
        <div className="text-lg font-bold mb-4">Gebruikers</div>
        <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
        <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={true}
            shape={MyCustomPie}
        />
        <RechartsDevtools />
        </PieChart>
        <div className="flex justify-center gap-8">
          {data.map((entry, index) => (
            <div key={`item-${index}`} className="flex flex-col gap-1">
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span className="text-sm text-black-500">{entry.name}</span>
              <span className="text-xs text-black-500">{entry.value}</span>
            </div>
          ))}
        </div>
    </div>
  )
}

export default SubscriptionsPie