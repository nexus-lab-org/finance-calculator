import { useMemo, useState } from "react";
import CalculatorShell from "../components/CalculatorShell";
import Card from "../components/Card";
import NumberField from "../components/NumberField";
import ToggleSwitch from "../components/ToggleSwitch";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import BreakdownBarChart from "../components/charts/BreakdownBarChart";
import BalanceChart from "../components/charts/BalanceChart";
import { calculateEMI } from "../lib/finance";

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [annualRate, setAnnualRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [prepaymentEnabled, setPrepaymentEnabled] = useState(false);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState(5000);
  const [oneTimePrepayment, setOneTimePrepayment] = useState(0);
  const [oneTimePrepaymentMonth, setOneTimePrepaymentMonth] = useState(12);

  const result = useMemo(
    () =>
      calculateEMI({
        loanAmount,
        annualRate,
        years,
        extraMonthlyPayment: prepaymentEnabled ? extraMonthlyPayment : 0,
        oneTimePrepayment: prepaymentEnabled ? oneTimePrepayment : 0,
        oneTimePrepaymentMonth,
      }),
    [loanAmount, annualRate, years, prepaymentEnabled, extraMonthlyPayment, oneTimePrepayment, oneTimePrepaymentMonth]
  );

  const inputs = (
    <Card>
      <NumberField
        label="Loan amount"
        value={loanAmount}
        onChange={setLoanAmount}
        min={100000}
        max={50000000}
        step={50000}
        prefix="₹"
      />
      <NumberField
        label="Interest rate"
        value={annualRate}
        onChange={setAnnualRate}
        min={5}
        max={20}
        step={0.05}
        suffix="%"
      />
      <NumberField
        label="Loan tenure"
        value={years}
        onChange={setYears}
        min={1}
        max={30}
        step={1}
        suffix=" yrs"
      />

      <div className="border-t pt-3 mt-1" style={{ borderColor: "var(--border)" }}>
        <ToggleSwitch
          label="Prepayment"
          checked={prepaymentEnabled}
          onChange={setPrepaymentEnabled}
          helpText="See how extra payments reduce your tenure and interest"
        />
        {prepaymentEnabled && (
          <>
            <NumberField
              label="Extra monthly payment"
              value={extraMonthlyPayment}
              onChange={setExtraMonthlyPayment}
              min={0}
              max={100000}
              step={500}
              prefix="₹"
            />
            <NumberField
              label="One-time prepayment"
              value={oneTimePrepayment}
              onChange={setOneTimePrepayment}
              min={0}
              max={5000000}
              step={10000}
              prefix="₹"
            />
            {oneTimePrepayment > 0 && (
              <NumberField
                label="Prepayment in month #"
                value={oneTimePrepaymentMonth}
                onChange={setOneTimePrepaymentMonth}
                min={1}
                max={years * 12}
                step={1}
              />
            )}
          </>
        )}
      </div>
    </Card>
  );

  const results = (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Monthly EMI" value={result.emi} accentColor="var(--series-1)" large />
        <StatCard label="Total interest" value={result.totalInterest} accentColor="var(--series-2)" />
        <StatCard label="Total payment" value={result.totalPayment} accentColor="var(--series-2)" />
        {prepaymentEnabled && (
          <StatCard
            label="Interest saved"
            value={result.interestSaved}
            accentColor="var(--success)"
          />
        )}
      </div>

      {prepaymentEnabled && result.tenureReducedMonths > 0 && (
        <Card>
          <p className="text-sm" style={{ color: "var(--text-primary)" }}>
            With these prepayments, your loan gets paid off{" "}
            <strong>
              {Math.floor(result.tenureReducedMonths / 12)} yrs {result.tenureReducedMonths % 12} mo
            </strong>{" "}
            earlier, saving you <strong>{result.interestSaved.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}</strong> in interest.
          </p>
        </Card>
      )}

      <Card>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Principal vs interest per year
        </h3>
        <BreakdownBarChart data={result.yearly} />
      </Card>

      <Card>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Outstanding balance over time
        </h3>
        <BalanceChart data={result.yearly} />
      </Card>

      <Card>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Year-by-year amortization
        </h3>
        <DataTable
          columns={[
            { key: "year", label: "Year" },
            { key: "principal", label: "Principal paid", format: "currency" },
            { key: "interest", label: "Interest paid", format: "currency" },
            { key: "balance", label: "Closing balance", format: "currency" },
          ]}
          rows={result.yearly}
        />
      </Card>
    </>
  );

  return (
    <CalculatorShell
      title="Home Loan EMI Calculator"
      icon="🏠"
      description="Calculate your monthly EMI, view the full amortization schedule, and see how prepayments reduce your tenure and interest."
      inputs={inputs}
      results={results}
    />
  );
}
