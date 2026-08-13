import { useMemo, useState } from "react";
import CalculatorShell from "../components/CalculatorShell";
import Card from "../components/Card";
import NumberField from "../components/NumberField";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import GrowthChart from "../components/charts/GrowthChart";
import { calculatePPF } from "../lib/finance";

const PPF_MAX_YEARLY = 150000;

export default function PpfCalculator() {
  const [yearlyInvestment, setYearlyInvestment] = useState(150000);
  const [annualRate, setAnnualRate] = useState(7.1);
  const [years, setYears] = useState(15);

  const result = useMemo(
    () => calculatePPF({ yearlyInvestment, annualRate, years }),
    [yearlyInvestment, annualRate, years]
  );

  const chartData = result.yearly.map((r) => ({ year: r.year, invested: r.invested, value: r.value }));

  const inputs = (
    <Card>
      <NumberField
        label="Yearly investment"
        value={yearlyInvestment}
        onChange={setYearlyInvestment}
        min={500}
        max={PPF_MAX_YEARLY}
        step={500}
        prefix="₹"
        helpText={`PPF allows a maximum of ₹${PPF_MAX_YEARLY.toLocaleString("en-IN")} per year`}
      />
      <NumberField
        label="Interest rate"
        value={annualRate}
        onChange={setAnnualRate}
        min={5}
        max={10}
        step={0.1}
        suffix="%"
      />
      <NumberField
        label="Tenure"
        value={years}
        onChange={setYears}
        min={15}
        max={50}
        step={5}
        suffix=" yrs"
        helpText="15-year lock-in, extendable in blocks of 5 years"
      />
    </Card>
  );

  const results = (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard label="Total invested" value={result.totalInvested} accentColor="var(--series-1)" />
        <StatCard label="Interest earned" value={result.interestEarned} accentColor="var(--series-2)" />
        <StatCard label="Maturity value" value={result.maturityValue} accentColor="var(--series-2)" large compact />
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
            { key: "invested", label: "Invested", format: "currency" },
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
      title="PPF Calculator"
      icon="🛡️"
      description="Estimate the maturity value of your Public Provident Fund contributions."
      inputs={inputs}
      results={results}
    />
  );
}
