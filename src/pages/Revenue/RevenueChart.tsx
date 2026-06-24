/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart({
  data,
}: any) {
  return (
    <div className="rounded-2xl border bg-white p-5">

      <h3 className="mb-5 font-bold">
        Doanh thu tháng
      </h3>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={data}>

          <XAxis
            dataKey="date"
          />

          <YAxis />

          <Tooltip />

          <Line
            dataKey="revenue"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}