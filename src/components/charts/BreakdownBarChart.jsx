import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartTooltip from "./ChartTooltip";
import { formatCompactINR } from "../../lib/format";

/** Principal vs interest paid per year, stacked. */
export default function BreakdownBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }} barGap={2}>
        <CartesianGrid stroke="var(--gridline)" vertical={false} />
        <XAxis
          dataKey="year"
          tick={{ fill: "var(--text-muted)", fontSize: 12 }}
          axisLine={{ stroke: "var(--axis)" }}
          tickLine={false}
          label={{ value: "Year", position: "insideBottom", offset: -2, fill: "var(--text-muted)", fontSize: 12 }}
        />
        <YAxis
          tick={{ fill: "var(--text-muted)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => formatCompactINR(v)}
          width={64}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--surface-card-hover)" }} />
        <Legend wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)" }} />
        <Bar dataKey="principal" name="Principal" stackId="a" fill="var(--series-1)" radius={[0, 0, 0, 0]} />
        <Bar dataKey="interest" name="Interest" stackId="a" fill="var(--series-2)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
