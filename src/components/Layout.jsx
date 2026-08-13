import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../lib/ThemeContext";
import { CALCULATORS } from "../lib/calculatorList";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const cycle = () => {
    const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(next);
  };
  const icon = theme === "light" ? "☀️" : theme === "dark" ? "🌙" : "🖥️";
  return (
    <button
      onClick={cycle}
      className="rounded-lg border px-3 py-1.5 text-sm"
      style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
      title={`Theme: ${theme}`}
    >
      {icon}
    </button>
  );
}

export default function Layout({ children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-svh">
      <header
        className="sticky top-0 z-20 border-b backdrop-blur"
        style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--surface-page) 88%, transparent)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-semibold" style={{ color: "var(--text-primary)" }}>
            <span
              className="inline-flex items-center justify-center rounded-lg text-white"
              style={{ width: 28, height: 28, background: "var(--accent)" }}
            >
              ₹
            </span>
            <span className="hidden sm:inline">FinCalc</span>
          </Link>

          {!isHome && (
            <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
              {CALCULATORS.map((c) => (
                <Link
                  key={c.path}
                  to={c.path}
                  className="text-sm px-3 py-1.5 rounded-lg whitespace-nowrap"
                  style={{
                    color: location.pathname === c.path ? "var(--accent)" : "var(--text-secondary)",
                    background: location.pathname === c.path ? "var(--accent-soft)" : "transparent",
                  }}
                >
                  {c.short}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!isHome && (
              <button
                className="md:hidden rounded-lg border px-3 py-1.5 text-sm"
                style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                onClick={() => setMenuOpen((v) => !v)}
              >
                ☰
              </button>
            )}
          </div>
        </div>

        {!isHome && menuOpen && (
          <nav
            className="md:hidden border-t px-4 py-2 flex flex-col gap-1"
            style={{ borderColor: "var(--border)", background: "var(--surface-page)" }}
          >
            {CALCULATORS.map((c) => (
              <Link
                key={c.path}
                to={c.path}
                onClick={() => setMenuOpen(false)}
                className="text-sm px-3 py-2 rounded-lg"
                style={{
                  color: location.pathname === c.path ? "var(--accent)" : "var(--text-secondary)",
                  background: location.pathname === c.path ? "var(--accent-soft)" : "transparent",
                }}
              >
                {c.name}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">{children}</main>

      <footer
        className="border-t py-6 text-center text-xs"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        Built for quick estimates only — not financial advice.
      </footer>
    </div>
  );
}
