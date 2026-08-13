export default function ToggleSwitch({ label, checked, onChange, helpText }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="pr-4">
        <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          {label}
        </div>
        {helpText && (
          <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {helpText}
          </div>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors"
        style={{ background: checked ? "var(--accent)" : "var(--border-strong)" }}
      >
        <span
          className="inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform"
          style={{
            transform: checked ? "translateX(22px)" : "translateX(4px)",
            width: "18px",
            height: "18px",
          }}
        />
      </button>
    </div>
  );
}
