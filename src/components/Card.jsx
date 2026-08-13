export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${className}`}
      style={{
        background: "var(--surface-card)",
        borderColor: "var(--border)",
      }}
    >
      {children}
    </div>
  );
}
