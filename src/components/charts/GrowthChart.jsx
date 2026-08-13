import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartTooltip from "./ChartTooltip";
import { formatCompactINR } from "../../lib/format";

/**
 * Invested vs total value (and optionally real/inflation-adjusted value) over time.
 */
export default function GrowthChart({ data, showReal = false }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="fillInvested" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--series-1)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--series-1)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--series-2)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--series-2)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillReal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--series-3)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--series-3)" stopOpacity={0.02} />
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
        <Legend wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)" }} />
        <Area
          type="monotone"
          dataKey="invested"
          name="Invested"
          stroke="var(--series-1)"
          strokeWidth={2}
          fill="url(#fillInvested)"
        />
        <Area
          type="monotone"
          dataKey="value"
          name="Total value"
          stroke="var(--series-2)"
          strokeWidth={2}
          fill="url(#fillValue)"
        />
        {showReal && (
          <Area
            type="monotone"
            dataKey="realValue"
            name="Inflation-adjusted value"
            stroke="var(--series-3)"
            strokeWidth={2}
            strokeDasharray="4 3"
            fill="url(#fillReal)"
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
