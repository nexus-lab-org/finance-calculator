import { useMemo, useState } from "react";
import CalculatorShell from "../components/CalculatorShell";
import Card from "../components/Card";
import NumberField from "../components/NumberField";
import ToggleSwitch from "../components/ToggleSwitch";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import GrowthChart from "../components/charts/GrowthChart";
import { calculateLumpsum } from "../lib/finance";

export default function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [annualReturnRate, setAnnualReturnRate] = useState(12);
  const [years, setYears] = useState(10);
  const [inflationEnabled, setInflationEnabled] = useState(true);
  const [inflationRate, setInflationRate] = useState(6);

  const result = useMemo(
    () =>
      calculateLumpsum({
        principal,
        annualReturnRate,
        years,
        inflationRate,
        adjustForInflation: inflationEnabled,
      }),
    [principal, annualReturnRate, years, inflationEnabled, inflationRate]
  );

  const inputs = (
    <Card>
      <NumberField
        label="Investment amount"
        value={principal}
        onChange={setPrincipal}
        min={1000}
        max={10000000}
        step={5000}
        prefix="₹"
      />
      <NumberField
        label="Expected annual return"
        value={annualReturnRate}
        onChange={setAnnualReturnRate}
        min={1}
        max={30}
        step={0.5}
        suffix="%"
      />
      <NumberField
        label="Investment duration"
        value={years}
        onChange={setYears}
        min={1}
        max={40}
        step={1}
        suffix=" yrs"
      />

      <div className="border-t pt-3 mt-1" style={{ borderColor: "var(--border)" }}>
        <ToggleSwitch
          label="Adjust for inflation"
          checked={inflationEnabled}
          onChange={setInflationEnabled}
          helpText="Show what your corpus is worth in today's money"
        />
        {inflationEnabled && (
          <NumberField
            label="Expected inflation"
            value={inflationRate}
            onChange={setInflationRate}
            min={0}
            max={15}
            step={0.5}
            suffix="%"
          />
        )}
      </div>
    </Card>
  );

  const results = (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Invested amount" value={result.totalInvested} accentColor="var(--series-1)" />
        <StatCard label="Est. returns" value={result.totalGain} accentColor="var(--series-2)" />
        <StatCard label="Total value" value={result.totalValue} accentColor="var(--series-2)" large compact />
        {inflationEnabled && (
          <StatCard label="Inflation-adjusted value" value={result.realValue} accentColor="var(--series-3)" />
        )}
      </div>

      <Card>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Growth over time
        </h3>
        <GrowthChart data={result.yearly} showReal={inflationEnabled} />
      </Card>

      <Card>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Year-by-year breakdown
        </h3>
        <DataTable
          columns={[
            { key: "year", label: "Year" },
            { key: "value", label: "Value", format: "currency" },
            { key: "gain", label: "Gain", format: "currency" },
            ...(inflationEnabled
              ? [{ key: "realValue", label: "Real value", format: "currency" }]
              : []),
          ]}
          rows={result.yearly}
        />
      </Card>
    </>
  );

  return (
    <CalculatorShell
      title="Lumpsum Calculator"
      icon="💰"
      description="Estimate the future value of a one-time investment, with optional inflation adjustment."
      inputs={inputs}
      results={results}
    />
  );
}
