export default function CalculatorShell({ title, description, icon, inputs, results }) {
  return (
    <div>
      <div className="mb-6 flex items-start gap-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
            {title}
          </h1>
          {description && (
            <p className="text-sm sm:text-base mt-1" style={{ color: "var(--text-secondary)" }}>
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5 items-start">
        <div className="lg:sticky lg:top-20">{inputs}</div>
        <div className="flex flex-col gap-5">{results}</div>
      </div>
    </div>
  );
}
