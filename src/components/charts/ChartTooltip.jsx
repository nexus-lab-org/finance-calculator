import { formatINR } from "../../lib/format";

export default function ChartTooltip({ active, payload, label, labelPrefix = "Year" }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      className="rounded-lg border px-3 py-2 text-xs shadow-lg"
      style={{
        background: "var(--surface-card)",
        borderColor: "var(--border)",
        color: "var(--text-primary)",
      }}
    >
      <div className="font-semibold mb-1" style={{ color: "var(--text-secondary)" }}>
        {labelPrefix} {label}
      </div>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 tabular">
          <span className="inline-block rounded-full" style={{ width: 7, height: 7, background: p.color }} />
          <span style={{ color: "var(--text-muted)" }}>{p.name}:</span>
          <span className="font-medium">{formatINR(p.value)}</span>
        </div>
      ))}
    </div>
  );
}
