import { formatINR } from "../lib/format";

/**
 * columns: [{ key, label, format?: 'currency' | (v)=>string }]
 */
export default function DataTable({ columns, rows }) {
  return (
    <div className="table-scroll overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border)" }}>
      <table className="w-full text-sm min-w-[480px]">
        <thead>
          <tr style={{ background: "var(--surface-page)" }}>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left font-medium px-3 py-2.5 whitespace-nowrap"
                style={{ color: "var(--text-muted)" }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-t"
              style={{ borderColor: "var(--border)" }}
            >
              {columns.map((col) => {
                const raw = row[col.key];
                let display = raw;
                if (col.format === "currency") display = formatINR(raw);
                else if (typeof col.format === "function") display = col.format(raw);
                return (
                  <td
                    key={col.key}
                    className="px-3 py-2.5 tabular whitespace-nowrap"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {display}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
