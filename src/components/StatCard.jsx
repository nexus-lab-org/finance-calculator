import { formatINR } from "../lib/format";

export default function StatCard({ label, value, accentColor, large = false }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ background: "var(--surface-page)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        {accentColor && (
          <span
            className="inline-block rounded-full"
            style={{ width: 8, height: 8, background: accentColor }}
          />
        )}
        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          {label}
        </span>
      </div>
      <div
        className={`font-semibold tabular ${large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}
        style={{ color: "var(--text-primary)" }}
      >
        {typeof value === "number" ? formatINR(value) : value}
      </div>
    </div>
  );
}
