export default function SelectField({ label, value, onChange, options }) {
  return (
    <div className="mb-5">
      <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--text-secondary)" }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border py-2 px-3 text-sm font-medium outline-none"
        style={{
          background: "var(--surface-card)",
          borderColor: "var(--border)",
          color: "var(--text-primary)",
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
