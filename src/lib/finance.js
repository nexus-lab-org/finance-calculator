// All amounts in rupees, rates in % per annum, durations in years unless noted.

/**
 * SIP with optional annual step-up and optional inflation adjustment.
 * Simulates month by month so step-up (applied at each anniversary) compounds correctly.
 */
export function calculateSIP({
  monthlyInvestment,
  annualReturnRate,
  years,
  stepUpPercent = 0,
  inflationRate = 0,
  adjustForInflation = false,
}) {
  const monthlyRate = annualReturnRate / 12 / 100;
  const totalMonths = Math.round(years * 12);

  let currentMonthlyInvestment = monthlyInvestment;
  let corpus = 0;
  let totalInvested = 0;

  const yearly = [];
  let yearInvested = 0;
  let yearStart = 0;

  for (let month = 1; month <= totalMonths; month++) {
    // Step up at the start of each new year (after the first)
    if (month > 1 && (month - 1) % 12 === 0) {
      currentMonthlyInvestment *= 1 + stepUpPercent / 100;
    }

    corpus = (corpus + currentMonthlyInvestment) * (1 + monthlyRate);
    totalInvested += currentMonthlyInvestment;
    yearInvested += currentMonthlyInvestment;

    if (month % 12 === 0 || month === totalMonths) {
      const yearNum = Math.ceil(month / 12);
      const realValue = adjustForInflation
        ? corpus / Math.pow(1 + inflationRate / 100, yearNum)
        : corpus;
      yearly.push({
        year: yearNum,
        invested: round2(totalInvested),
        value: round2(corpus),
        gain: round2(corpus - totalInvested),
        realValue: round2(realValue),
      });
      yearInvested = 0;
      yearStart = totalInvested;
    }
  }

  const finalValue = corpus;
  const realFinalValue = adjustForInflation
    ? finalValue / Math.pow(1 + inflationRate / 100, years)
    : finalValue;

  return {
    totalInvested: round2(totalInvested),
    totalValue: round2(finalValue),
    totalGain: round2(finalValue - totalInvested),
    realValue: round2(realFinalValue),
    yearly,
  };
}

/** Lumpsum with optional inflation adjustment. */
export function calculateLumpsum({
  principal,
  annualReturnRate,
  years,
  inflationRate = 0,
  adjustForInflation = false,
}) {
  const yearly = [];
  for (let y = 1; y <= Math.ceil(years); y++) {
    const t = Math.min(y, years);
    const value = principal * Math.pow(1 + annualReturnRate / 100, t);
    const realValue = adjustForInflation
      ? value / Math.pow(1 + inflationRate / 100, t)
      : value;
    yearly.push({
      year: y,
      invested: round2(principal),
      value: round2(value),
      gain: round2(value - principal),
      realValue: round2(realValue),
    });
  }

  const finalValue = principal * Math.pow(1 + annualReturnRate / 100, years);
  const realFinalValue = adjustForInflation
    ? finalValue / Math.pow(1 + inflationRate / 100, years)
    : finalValue;

  return {
    totalInvested: round2(principal),
    totalValue: round2(finalValue),
    totalGain: round2(finalValue - principal),
    realValue: round2(realFinalValue),
    yearly,
  };
}

const COMPOUNDING_N = {
  monthly: 12,
  quarterly: 4,
  "half-yearly": 2,
  annually: 1,
};

/** Fixed Deposit with configurable compounding frequency. */
export function calculateFD({ principal, annualRate, years, compounding = "quarterly" }) {
  const n = COMPOUNDING_N[compounding] ?? 4;
  const yearly = [];
  for (let y = 1; y <= Math.ceil(years); y++) {
    const t = Math.min(y, years);
    const value = principal * Math.pow(1 + annualRate / 100 / n, n * t);
    yearly.push({
      year: y,
      invested: round2(principal),
      value: round2(value),
      interest: round2(value - principal),
    });
  }
  const maturityValue = principal * Math.pow(1 + annualRate / 100 / n, n * years);
  return {
    principal: round2(principal),
    maturityValue: round2(maturityValue),
    interestEarned: round2(maturityValue - principal),
    yearly,
  };
}

/** Recurring Deposit — monthly deposits, compounded quarterly (standard RD convention). */
export function calculateRD({ monthlyDeposit, annualRate, years }) {
  const totalMonths = Math.round(years * 12);
  const quarterlyRate = annualRate / 100 / 4;
  let value = 0;
  let totalInvested = 0;
  const yearly = [];

  for (let month = 1; month <= totalMonths; month++) {
    value += monthlyDeposit;
    totalInvested += monthlyDeposit;
    // apply quarterly compounding approximation: compound monthly at (quarterlyRate/3) equivalent monthly effective rate
    const monthlyEquivRate = Math.pow(1 + quarterlyRate, 1 / 3) - 1;
    value *= 1 + monthlyEquivRate;

    if (month % 12 === 0 || month === totalMonths) {
      yearly.push({
        year: Math.ceil(month / 12),
        invested: round2(totalInvested),
        value: round2(value),
        interest: round2(value - totalInvested),
      });
    }
  }

  return {
    totalInvested: round2(totalInvested),
    maturityValue: round2(value),
    interestEarned: round2(value - totalInvested),
    yearly,
  };
}

/** PPF — yearly contribution at start of year, compounded annually (standard PPF convention). */
export function calculatePPF({ yearlyInvestment, annualRate, years }) {
  let value = 0;
  let totalInvested = 0;
  const yearly = [];

  for (let y = 1; y <= years; y++) {
    value += yearlyInvestment;
    totalInvested += yearlyInvestment;
    value *= 1 + annualRate / 100;
    yearly.push({
      year: y,
      invested: round2(totalInvested),
      value: round2(value),
      interest: round2(value - totalInvested),
    });
  }

  return {
    totalInvested: round2(totalInvested),
    maturityValue: round2(value),
    interestEarned: round2(value - totalInvested),
    yearly,
  };
}

/** General compound interest with optional periodic (monthly) additional contribution. */
export function calculateCompoundInterest({
  principal,
  annualRate,
  years,
  compounding = "annually",
  monthlyContribution = 0,
}) {
  const n = COMPOUNDING_N[compounding] ?? 1;
  const totalMonths = Math.round(years * 12);
  const periodRate = annualRate / 100 / n;
  const monthsPerPeriod = 12 / n;

  let value = principal;
  let totalInvested = principal;
  const yearly = [];

  for (let month = 1; month <= totalMonths; month++) {
    value += monthlyContribution;
    totalInvested += monthlyContribution;
    if (month % monthsPerPeriod === 0) {
      value *= 1 + periodRate;
    }
    if (month % 12 === 0 || month === totalMonths) {
      yearly.push({
        year: Math.ceil(month / 12),
        invested: round2(totalInvested),
        value: round2(value),
        interest: round2(value - totalInvested),
      });
    }
  }

  return {
    totalInvested: round2(totalInvested),
    maturityValue: round2(value),
    interestEarned: round2(value - totalInvested),
    yearly,
  };
}

/**
 * Home loan EMI with full amortization schedule, optional one-time or recurring
 * prepayments, and comparison against the no-prepayment baseline.
 */
export function calculateEMI({
  loanAmount,
  annualRate,
  years,
  extraMonthlyPayment = 0,
  oneTimePrepayment = 0,
  oneTimePrepaymentMonth = 0,
}) {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = Math.round(years * 12);
  const emi =
    monthlyRate === 0
      ? loanAmount / totalMonths
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const schedule = [];
  let balance = loanAmount;
  let month = 0;
  let totalInterest = 0;
  let totalPrepaid = 0;

  while (balance > 0.5 && month < totalMonths * 3) {
    month++;
    const interestPayment = balance * monthlyRate;
    let principalPayment = emi - interestPayment;
    let extra = extraMonthlyPayment;

    if (oneTimePrepayment > 0 && month === oneTimePrepaymentMonth) {
      extra += oneTimePrepayment;
    }

    if (principalPayment + extra > balance) {
      extra = Math.max(0, balance - principalPayment);
      if (principalPayment > balance) principalPayment = balance;
    }

    balance = balance - principalPayment - extra;
    totalInterest += interestPayment;
    totalPrepaid += extra;

    schedule.push({
      month,
      year: Math.ceil(month / 12),
      emi: round2(emi),
      principal: round2(principalPayment),
      interest: round2(interestPayment),
      extra: round2(extra),
      balance: round2(Math.max(balance, 0)),
    });

    if (balance <= 0.5) break;
  }

  // Yearly rollup for charting
  const yearlyMap = new Map();
  for (const row of schedule) {
    if (!yearlyMap.has(row.year)) {
      yearlyMap.set(row.year, { year: row.year, principal: 0, interest: 0, balance: row.balance });
    }
    const entry = yearlyMap.get(row.year);
    entry.principal += row.principal;
    entry.interest += row.interest;
    entry.balance = row.balance;
  }
  const yearly = Array.from(yearlyMap.values()).map((e) => ({
    ...e,
    principal: round2(e.principal),
    interest: round2(e.interest),
  }));

  // Baseline (no prepayment) for comparison
  let baselineInterest = 0;
  let baselineMonths = totalMonths;
  if (monthlyRate > 0) {
    baselineInterest = emi * totalMonths - loanAmount;
  } else {
    baselineInterest = 0;
  }

  const actualMonths = schedule.length;
  const interestSaved = round2(baselineInterest - totalInterest);
  const tenureReducedMonths = baselineMonths - actualMonths;

  return {
    emi: round2(emi),
    totalInterest: round2(totalInterest),
    totalPayment: round2(loanAmount + totalInterest),
    totalPrepaid: round2(totalPrepaid),
    actualMonths,
    baselineMonths,
    tenureReducedMonths,
    interestSaved,
    schedule,
    yearly,
  };
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
