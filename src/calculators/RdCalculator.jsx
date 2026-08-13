import { useMemo, useState } from "react";
import CalculatorShell from "../components/CalculatorShell";
import Card from "../components/Card";
import NumberField from "../components/NumberField";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import GrowthChart from "../components/charts/GrowthChart";
import { calculateRD } from "../lib/finance";

export default function RdCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [annualRate, setAnnualRate] = useState(6.5);
  const [years, setYears] = useState(5);

  const result = useMemo(
    () => calculateRD({ monthlyDeposit, annualRate, years }),
    [monthlyDeposit, annualRate, years]
  );

  const chartData = result.yearly.map((r) => ({ year: r.year, invested: r.invested, value: r.value }));

  const inputs = (
    <Card>
      <NumberField
        label="Monthly deposit"
        value={monthlyDeposit}
        onChange={setMonthlyDeposit}
        min={500}
        max={200000}
        step={500}
        prefix="₹"
      />
      <NumberField
        label="Interest rate"
        value={annualRate}
        onChange={setAnnualRate}
        min={1}
        max={12}
        step={0.1}
        suffix="%"
      />
      <NumberField
        label="Tenure"
        value={years}
        onChange={setYears}
        min={0.5}
        max={10}
        step={0.5}
        suffix=" yrs"
      />
    </Card>
  );

  const results = (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard label="Total deposited" value={result.totalInvested} accentColor="var(--series-1)" />
        <StatCard label="Interest earned" value={result.interestEarned} accentColor="var(--series-2)" />
        <StatCard label="Maturity value" value={result.maturityValue} accentColor="var(--series-2)" large />
      </div>

      <Card>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Growth over time
        </h3>
        <GrowthChart data={chartData} />
      </Card>

      <Card>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Year-by-year breakdown
        </h3>
        <DataTable
          columns={[
            { key: "year", label: "Year" },
            { key: "invested", label: "Deposited", format: "currency" },
            { key: "value", label: "Value", format: "currency" },
            { key: "interest", label: "Interest earned", format: "currency" },
          ]}
          rows={result.yearly}
        />
      </Card>
    </>
  );

  return (
    <CalculatorShell
      title="RD Calculator"
      icon="🗓️"
      description="Estimate the maturity value of your recurring deposit."
      inputs={inputs}
      results={results}
    />
  );
}
