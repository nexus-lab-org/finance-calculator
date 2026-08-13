import { formatINR, formatCompactINR } from "../lib/format";

export default function StatCard({ label, value, accentColor, large = false, compact = false }) {
  const isNumber = typeof value === "number";
  const display = isNumber ? (compact ? formatCompactINR(value) : formatINR(value)) : value;
  const fullValue = isNumber ? formatINR(value) : value;
  return (
    <div
      className="min-w-0 rounded-xl border p-4"
      style={{ background: "var(--surface-page)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        {accentColor && (
          <span
            className="inline-block shrink-0 rounded-full"
            style={{ width: 8, height: 8, background: accentColor }}
          />
        )}
        <span className="text-xs font-medium truncate" style={{ color: "var(--text-muted)" }}>
          {label}
        </span>
      </div>
      <div
        title={fullValue}
        className={`font-semibold tabular truncate ${large ? "text-lg sm:text-xl lg:text-2xl" : "text-base sm:text-lg"}`}
        style={{ color: "var(--text-primary)" }}
      >
        {display}
      </div>
    </div>
  );
}
