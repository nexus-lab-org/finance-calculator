import { useMemo, useState } from "react";
import CalculatorShell from "../components/CalculatorShell";
import Card from "../components/Card";
import NumberField from "../components/NumberField";
import SelectField from "../components/SelectField";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import GrowthChart from "../components/charts/GrowthChart";
import { calculateCompoundInterest } from "../lib/finance";

const COMPOUNDING_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "half-yearly", label: "Half-yearly" },
  { value: "annually", label: "Annually" },
];

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [annualRate, setAnnualRate] = useState(8);
  const [years, setYears] = useState(10);
  const [compounding, setCompounding] = useState("annually");
  const [monthlyContribution, setMonthlyContribution] = useState(0);

  const result = useMemo(
    () => calculateCompoundInterest({ principal, annualRate, years, compounding, monthlyContribution }),
    [principal, annualRate, years, compounding, monthlyContribution]
  );

  const chartData = result.yearly.map((r) => ({ year: r.year, invested: r.invested, value: r.value }));

  const inputs = (
    <Card>
      <NumberField
        label="Principal amount"
        value={principal}
        onChange={setPrincipal}
        min={1000}
        max={10000000}
        step={5000}
        prefix="₹"
      />
      <NumberField
        label="Annual interest rate"
        value={annualRate}
        onChange={setAnnualRate}
        min={1}
        max={30}
        step={0.5}
        suffix="%"
      />
      <NumberField
        label="Time period"
        value={years}
        onChange={setYears}
        min={1}
        max={40}
        step={1}
        suffix=" yrs"
      />
      <SelectField
        label="Compounding frequency"
        value={compounding}
        onChange={setCompounding}
        options={COMPOUNDING_OPTIONS}
      />
      <NumberField
        label="Additional monthly contribution"
        value={monthlyContribution}
        onChange={setMonthlyContribution}
        min={0}
        max={100000}
        step={500}
        prefix="₹"
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
      title="Compound Interest Calculator"
      icon="🧮"
      description="General-purpose compound interest calculator with optional periodic contributions."
      inputs={inputs}
      results={results}
    />
  );
}
