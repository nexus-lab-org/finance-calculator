import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartTooltip from "./ChartTooltip";
import { formatCompactINR } from "../../lib/format";

/** Outstanding loan balance reduction over time. */
export default function BalanceChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="fillBalance" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--series-5)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--series-5)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
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
        <Tooltip content={<ChartTooltip />} />
        <Area
          type="monotone"
          dataKey="balance"
          name="Outstanding balance"
          stroke="var(--series-5)"
          strokeWidth={2}
          fill="url(#fillBalance)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
