"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface ChartProps {
  data: any[];
  keys: { dataKey: string; color: string }[];
}

export function Component({ data, keys }: ChartProps) {
  return (
    <div className="min-h-[200px] w-full">
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" />
        {keys.map((key) => (
          <Bar key={key.dataKey} dataKey={key.dataKey} fill={key.color} radius={4} />
        ))}
      </BarChart>
    </div>
  );
}
