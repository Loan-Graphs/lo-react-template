"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type LoanTerm = 15 | 20 | 30;

function calcMonthlyPI(principal: number, annualRate: number, termYears: number): number {
  if (annualRate === 0) return principal / (termYears * 12);
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function calcTotalInterest(principal: number, annualRate: number, termYears: number): number {
  const monthly = calcMonthlyPI(principal, annualRate, termYears);
  return monthly * termYears * 12 - principal;
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatCurrencyDec(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function getPayoffDate(termYears: number): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + termYears);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

interface PieSlice {
  label: string;
  value: number;
  color: string;
}

function PieChart({ slices }: { slices: PieSlice[] }) {
  const total = slices.reduce((s, x) => s + x.value, 0);
  if (total === 0) return null;

  // Build conic-gradient stops
  let cumPct = 0;
  const stops = slices.map((s) => {
    const pct = (s.value / total) * 100;
    const from = cumPct;
    cumPct += pct;
    return `${s.color} ${from.toFixed(1)}% ${cumPct.toFixed(1)}%`;
  });

  return (
    <div>
      <div
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: `conic-gradient(${stops.join(", ")})`,
          margin: "0 auto 1.5rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      />
      <div className="space-y-2">
        {slices.map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "2px",
                  backgroundColor: s.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ color: "#64748b", fontSize: "0.85rem" }}>{s.label}</span>
            </div>
            <span style={{ color: "#1e293b", fontWeight: 600, fontSize: "0.85rem" }}>
              {((s.value / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LoanComparison {
  program: string;
  minDown: number;
  downPct: number;
  estRate: number;
  monthly: number;
  note: string;
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPct, setDownPct] = useState(10);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState<LoanTerm>(30);
  const [taxRate, setTaxRate] = useState(1.2);
  const [insurance, setInsurance] = useState(1500);
  const [hoa, setHoa] = useState(0);

  const downAmount = Math.round(homePrice * (downPct / 100));
  const loanAmount = homePrice - downAmount;

  const results = useMemo(() => {
    const pi = calcMonthlyPI(loanAmount, rate, term);
    const taxes = (homePrice * (taxRate / 100)) / 12;
    const ins = insurance / 12;
    const hoaMonthly = hoa;
    const total = pi + taxes + ins + hoaMonthly;
    const totalInterest = calcTotalInterest(loanAmount, rate, term);

    const slices: PieSlice[] = [
      { label: "Principal & Interest", value: pi, color: "#0ea5e9" },
      { label: "Property Taxes", value: taxes, color: "#f59e0b" },
      { label: "Insurance", value: ins, color: "#10b981" },
      ...(hoaMonthly > 0 ? [{ label: "HOA", value: hoaMonthly, color: "#8b5cf6" }] : []),
    ];

    return { pi, taxes, ins, hoaMonthly, total, totalInterest, slices };
  }, [loanAmount, homePrice, rate, term, taxRate, insurance, hoa]);

  // Loan program comparison
  const comparisons: LoanComparison[] = useMemo(() => {
    const price = homePrice;
    const programs: LoanComparison[] = [];

    // FHA: 3.5% down, rate ~0.25 above conventional, plus MIP ~0.55%/yr
    const fhaDown = Math.round(price * 0.035);
    const fhaLoan = price - fhaDown;
    const fhaMIPMonthly = (fhaLoan * 0.0055) / 12;
    const fhaRate = rate + 0.125;
    const fhaPI = calcMonthlyPI(fhaLoan, fhaRate, 30);
    programs.push({
      program: "FHA",
      minDown: fhaDown,
      downPct: 3.5,
      estRate: fhaRate,
      monthly: Math.round(fhaPI + fhaMIPMonthly),
      note: "Incl. 0.55% MIP",
    });

    // Conventional: current inputs
    programs.push({
      program: "Conventional",
      minDown: downAmount,
      downPct: downPct,
      estRate: rate,
      monthly: Math.round(results.pi + (downPct < 20 ? (loanAmount * 0.006) / 12 : 0)),
      note: downPct < 20 ? "Incl. est. PMI" : "No PMI",
    });

    // VA: 0% down, rate typically ~0.25 below conventional
    const vaLoan = price;
    const vaRate = Math.max(rate - 0.25, 3.0);
    const vaPI = calcMonthlyPI(vaLoan, vaRate, 30);
    programs.push({
      program: "VA",
      minDown: 0,
      downPct: 0,
      estRate: vaRate,
      monthly: Math.round(vaPI),
      note: "$0 down, no PMI (if eligible)",
    });

    return programs;
  }, [homePrice, downAmount, downPct, rate, results.pi, loanAmount]);

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    padding: "1.5rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "0.5rem",
    padding: "0.5rem 0.75rem",
    width: "100%",
    fontSize: "0.9rem",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    color: "#374151",
    fontSize: "0.78rem",
    fontWeight: 700,
    display: "block",
    marginBottom: "0.4rem",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Inputs */}
        <div style={cardStyle}>
          <h2 className="text-xl font-bold mb-6" style={{ color: "#0f172a" }}>
            Loan Details
          </h2>

          {/* Home Price */}
          <div className="mb-5">
            <label style={labelStyle}>
              Home Price: <span style={{ color: "#0ea5e9", fontWeight: 700 }}>{formatCurrency(homePrice)}</span>
            </label>
            <input
              type="range"
              min={100000}
              max={2000000}
              step={5000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#0ea5e9" }}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: "#94a3b8" }}>
              <span>$100k</span>
              <span>$2M</span>
            </div>
          </div>

          {/* Down Payment */}
          <div className="mb-5">
            <label style={labelStyle}>
              Down Payment: <span style={{ color: "#0ea5e9", fontWeight: 700 }}>{downPct}%</span>
              <span style={{ color: "#64748b", fontWeight: 400, marginLeft: "0.5rem" }}>
                ({formatCurrency(downAmount)})
              </span>
            </label>
            <input
              type="range"
              min={3}
              max={30}
              step={0.5}
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#0ea5e9" }}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: "#94a3b8" }}>
              <span>3%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="mb-5">
            <label style={labelStyle}>Interest Rate (%)</label>
            <input
              type="number"
              step={0.125}
              min={1}
              max={20}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              style={inputStyle}
            />
          </div>

          {/* Loan Term */}
          <div className="mb-5">
            <label style={labelStyle}>Loan Term</label>
            <div className="flex gap-2">
              {([15, 20, 30] as LoanTerm[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTerm(t)}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: term === t ? "2px solid #0ea5e9" : "2px solid #e2e8f0",
                    backgroundColor: term === t ? "#e0f2fe" : "#f8fafc",
                    color: term === t ? "#0369a1" : "#64748b",
                    fontWeight: term === t ? 700 : 500,
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  {t} yr
                </button>
              ))}
            </div>
          </div>

          <hr style={{ borderColor: "#f1f5f9", marginBottom: "1.25rem" }} />

          {/* Property Tax */}
          <div className="mb-5">
            <label style={labelStyle}>Property Tax Rate (%/yr)</label>
            <input
              type="number"
              step={0.1}
              min={0}
              max={5}
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              style={inputStyle}
            />
          </div>

          {/* Insurance */}
          <div className="mb-5">
            <label style={labelStyle}>Homeowner's Insurance ($/yr)</label>
            <input
              type="number"
              step={100}
              min={0}
              value={insurance}
              onChange={(e) => setInsurance(Number(e.target.value))}
              style={inputStyle}
            />
          </div>

          {/* HOA */}
          <div>
            <label style={labelStyle}>HOA ($/mo)</label>
            <input
              type="number"
              step={50}
              min={0}
              value={hoa}
              onChange={(e) => setHoa(Number(e.target.value))}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Monthly Breakdown */}
          <div style={cardStyle}>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#0f172a" }}>
              Monthly Payment Breakdown
            </h2>

            {/* Total */}
            <div
              style={{
                backgroundColor: "#0f172a",
                borderRadius: "0.75rem",
                padding: "1.25rem",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                Estimated Monthly Payment
              </p>
              <p style={{ color: "#38bdf8", fontSize: "3rem", fontWeight: 800, lineHeight: 1 }}>
                {formatCurrencyDec(results.total)}
              </p>
              <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.25rem" }}>
                {formatCurrency(loanAmount)} loan · {term}-yr · {rate}% rate
              </p>
            </div>

            {/* Line items */}
            <div className="space-y-2 mb-5">
              {[
                { label: "Principal & Interest", value: results.pi, color: "#0ea5e9" },
                { label: "Property Taxes", value: results.taxes, color: "#f59e0b" },
                { label: "Homeowner's Insurance", value: results.ins, color: "#10b981" },
                ...(results.hoaMonthly > 0
                  ? [{ label: "HOA", value: results.hoaMonthly, color: "#8b5cf6" }]
                  : []),
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "0.375rem",
                    borderLeft: `3px solid ${item.color}`,
                    backgroundColor: "#f8fafc",
                  }}
                >
                  <span style={{ color: "#64748b", fontSize: "0.9rem" }}>{item.label}</span>
                  <span style={{ color: "#0f172a", fontWeight: 700, fontSize: "0.9rem" }}>
                    {formatCurrencyDec(item.value)}/mo
                  </span>
                </div>
              ))}
            </div>

            {/* Pie chart */}
            <PieChart slices={results.slices} />
          </div>

          {/* Amortization Summary */}
          <div style={cardStyle}>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#0f172a" }}>
              Loan Summary
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Loan Amount", value: formatCurrency(loanAmount) },
                { label: "Down Payment", value: `${formatCurrency(downAmount)} (${downPct}%)` },
                { label: "Total Interest Paid", value: formatCurrency(results.totalInterest) },
                { label: "Total Cost", value: formatCurrency(loanAmount + results.totalInterest) },
                { label: "Payoff Date", value: getPayoffDate(term) },
                {
                  label: "LTV",
                  value: `${Math.round((loanAmount / homePrice) * 100)}%`,
                },
              ].map((item) => (
                <div key={item.label}>
                  <p style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {item.label}
                  </p>
                  <p style={{ color: "#0f172a", fontWeight: 700, fontSize: "1rem" }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Loan Program Comparison */}
      <div style={cardStyle}>
        <h2 className="text-xl font-bold mb-6" style={{ color: "#0f172a" }}>
          Loan Program Comparison
        </h2>
        <p className="text-sm mb-4" style={{ color: "#64748b" }}>
          For a {formatCurrency(homePrice)} home — comparing FHA, Conventional, and VA loan programs.
        </p>
        <div className="overflow-x-auto">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc" }}>
                {["Program", "Min Down Payment", "Est. Rate", "Monthly P&I", "Note"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      color: "#374151",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      borderBottom: "2px solid #e2e8f0",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((c, i) => (
                <tr
                  key={c.program}
                  style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8fafc" }}
                >
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 700, color: "#0f172a" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        backgroundColor:
                          c.program === "FHA"
                            ? "#fef3c7"
                            : c.program === "Conventional"
                            ? "#e0f2fe"
                            : "#dcfce7",
                        color:
                          c.program === "FHA"
                            ? "#92400e"
                            : c.program === "Conventional"
                            ? "#0369a1"
                            : "#15803d",
                        fontWeight: 700,
                      }}
                    >
                      {c.program}
                    </span>
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "#374151" }}>
                    {formatCurrency(c.minDown)} ({c.downPct}%)
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "#374151" }}>
                    {c.estRate.toFixed(3)}%
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "#0f172a", fontWeight: 700 }}>
                    {formatCurrencyDec(c.monthly)}/mo
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "#64748b", fontSize: "0.82rem" }}>
                    {c.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-4" style={{ color: "#94a3b8" }}>
          * Rates and payments are estimates for illustration purposes only. Actual rates depend on
          credit score, loan details, and market conditions. Contact Nathan for your personalized quote.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/get-started/purchase"
            style={{
              backgroundColor: "#0ea5e9",
              color: "#ffffff",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              fontWeight: 700,
              textDecoration: "none",
              textAlign: "center",
              display: "block",
            }}
            className="hover:opacity-90 transition-opacity sm:inline-block"
          >
            Get Pre-Approved — It's Free
          </Link>
          <Link
            href="/loans"
            style={{
              backgroundColor: "#f1f5f9",
              color: "#0f172a",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              fontWeight: 600,
              textDecoration: "none",
              textAlign: "center",
              display: "block",
            }}
            className="hover:bg-slate-200 transition-colors sm:inline-block"
          >
            Compare Loan Programs →
          </Link>
        </div>
      </div>
    </div>
  );
}
