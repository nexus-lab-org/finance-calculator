import { Link } from "react-router-dom";
import { CALCULATORS } from "../lib/calculatorList";
import Card from "../components/Card";

export default function Home() {
  return (
    <div>
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <h1
          className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Financial Calculators
        </h1>
        <p className="text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
          Plan your investments and loans with instant, detailed breakdowns —
          growth charts, year-by-year tables, and inflation-adjusted views.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CALCULATORS.map((c) => (
          <Link key={c.path} to={c.path}>
            <Card className="h-full transition-transform hover:-translate-y-0.5">
              <div className="text-3xl mb-3">{c.icon}</div>
              <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                {c.name}
              </h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {c.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
