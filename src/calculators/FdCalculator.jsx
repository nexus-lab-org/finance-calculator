import { useMemo, useState } from "react";
import CalculatorShell from "../components/CalculatorShell";
import Card from "../components/Card";
import NumberField from "../components/NumberField";
import SelectField from "../components/SelectField";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import GrowthChart from "../components/charts/GrowthChart";
import { calculateFD } from "../lib/finance";

const COMPOUNDING_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "half-yearly", label: "Half-yearly" },
  { value: "annually", label: "Annually" },
];

export default function FdCalculator() {
  const [principal, setPrincipal] = useState(200000);
  const [annualRate, setAnnualRate] = useState(7.1);
  const [years, setYears] = useState(5);
  const [compounding, setCompounding] = useState("quarterly");

  const result = useMemo(
    () => calculateFD({ principal, annualRate, years, compounding }),
    [principal, annualRate, years, compounding]
  );

  const chartData = result.yearly.map((r) => ({ year: r.year, invested: result.principal, value: r.value }));

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
        label="Interest rate"
        value={annualRate}
        onChange={setAnnualRate}
        min={1}
        max={15}
        step={0.1}
        suffix="%"
      />
      <NumberField
        label="Tenure"
        value={years}
        onChange={setYears}
        min={0.25}
        max={10}
        step={0.25}
        suffix=" yrs"
      />
      <SelectField
        label="Compounding frequency"
        value={compounding}
        onChange={setCompounding}
        options={COMPOUNDING_OPTIONS}
      />
    </Card>
  );

  const results = (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard label="Principal" value={result.principal} accentColor="var(--series-1)" />
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
      title="FD Calculator"
      icon="🏦"
      description="Calculate the maturity value of a fixed deposit with your choice of compounding frequency."
      inputs={inputs}
      results={results}
    />
  );
}
