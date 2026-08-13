import { formatNumber } from "../lib/format";

/**
 * A labeled numeric input paired with a range slider, plus optional prefix/suffix.
 */
export default function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  prefix,
  suffix,
  helpText,
}) {
  const handleNumberChange = (e) => {
    const raw = e.target.value;
    if (raw === "") return onChange(0);
    const n = Number(raw);
    if (!Number.isNaN(n)) onChange(n);
  };

  return (
    <div className="mb-5">
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          {label}
        </label>
        <div
          className="flex items-center rounded-lg border overflow-hidden"
          style={{ borderColor: "var(--border)" }}
        >
          {prefix && (
            <span className="px-2 text-sm" style={{ color: "var(--text-muted)" }}>
              {prefix}
            </span>
          )}
          <input
            type="number"
            value={value}
            onChange={handleNumberChange}
            className="w-24 sm:w-28 py-1.5 px-1 text-right text-sm font-semibold outline-none tabular"
            style={{ background: "transparent", color: "var(--text-primary)" }}
          />
          {suffix && (
            <span className="pr-2 text-sm" style={{ color: "var(--text-muted)" }}>
              {suffix}
            </span>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {prefix}
          {formatNumber(min)}
          {suffix}
        </span>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {prefix}
          {formatNumber(max)}
          {suffix}
        </span>
      </div>
      {helpText && (
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          {helpText}
        </p>
      )}
    </div>
  );
}
