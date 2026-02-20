"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_STATES } from "@/lib/states";
import {
  calculateDownPayment,
  calculateLoanAmount,
  calculateMonthlyPayment,
  calculateMonthlyPropertyTax,
  calculateMonthlyInsurance,
  calculateFhaLoanAmount,
  calculateTotalMonthlyPayment,
  calculateLTV,
  formatCurrency,
  numberWithCommas,
} from "@/lib/mortgageHelpers";

// FHA 2024 loan limits (simplified — use standard limit)
const FHA_STANDARD_LIMIT = 498257;
const FHA_HIGH_COST_LIMIT = 1149825;

const inputCls: React.CSSProperties = {
  backgroundColor: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "0.375rem",
  padding: "0.5rem 0.625rem",
  width: "100%",
  fontSize: "0.875rem",
  color: "#e2e8f0",
  outline: "none",
  boxSizing: "border-box",
};

const labelCls: React.CSSProperties = {
  color: "#94a3b8",
  fontSize: "0.75rem",
  fontWeight: 600,
  display: "block",
  marginBottom: "0.3rem",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

interface PieSlice {
  value: number;
  color: string;
  label: string;
}

function PieChart({ slices }: { slices: PieSlice[] }) {
  const total = slices.reduce((s, sl) => s + sl.value, 0);
  if (total <= 0) return null;
  let cumPct = 0;
  const segments = slices.map((sl) => {
    const pct = (sl.value / total) * 100;
    const start = cumPct;
    cumPct += pct;
    return { ...sl, pct, start };
  });
  const grad = segments
    .map((s) => `${s.color} ${s.start.toFixed(1)}% ${(s.start + s.pct).toFixed(1)}%`)
    .join(",");
  return (
    <div>
      <div
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: `conic-gradient(${grad})`,
          margin: "0 auto 1.25rem",
          boxShadow: "0 0 0 4px #1e293b",
        }}
      />
      <div className="flex flex-col gap-1.5">
        {segments.map((seg) => (
          <div key={seg.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: seg.color, flexShrink: 0 }} />
            <span style={{ color: "#94a3b8", flex: 1 }}>{seg.label}</span>
            <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{formatCurrency(seg.value)}/mo</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FHACalculator() {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(3.5); // FHA min 3.5%
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.875);
  const [propertyTax, setPropertyTax] = useState(3500);
  const [homeownersInsurance, setHomeownersInsurance] = useState(1400);
  const [hoaDues, setHoaDues] = useState(0);
  const [selectedState, setSelectedState] = useState("CA");
  const [grossIncome, setGrossIncome] = useState(10500);
  const [monthlyDebts, setMonthlyDebts] = useState(1500);
  const [upfrontMIPRate] = useState(1.75); // fixed per FHA rules
  const [annualMIPRate] = useState(0.55); // for >15yr, LTV > 90%

  // Enforce FHA min 3.5%
  const dp = Math.max(downPayment, 3.5);
  const dpAmount = useMemo(() => calculateDownPayment(homePrice, dp, "%"), [homePrice, dp]);
  const baseLoan = useMemo(() => calculateLoanAmount(homePrice, dpAmount), [homePrice, dpAmount]);
  const fhaLoan = useMemo(
    () => calculateFhaLoanAmount(homePrice, dpAmount, upfrontMIPRate),
    [homePrice, dpAmount, upfrontMIPRate]
  );
  const upfrontMIP = useMemo(() => baseLoan * (upfrontMIPRate / 100), [baseLoan, upfrontMIPRate]);
  const monthlyMIP = useMemo(() => (fhaLoan * (annualMIPRate / 100)) / 12, [fhaLoan, annualMIPRate]);
  const ltv = useMemo(() => calculateLTV(baseLoan, homePrice), [baseLoan, homePrice]);

  const monthlyPI = useMemo(
    () => calculateMonthlyPayment(fhaLoan, interestRate, loanTerm),
    [fhaLoan, interestRate, loanTerm]
  );
  const monthlyTax = useMemo(() => calculateMonthlyPropertyTax(propertyTax), [propertyTax]);
  const monthlyIns = useMemo(() => calculateMonthlyInsurance(homeownersInsurance), [homeownersInsurance]);
  const totalMonthly = useMemo(
    () => calculateTotalMonthlyPayment(monthlyPI, monthlyTax, monthlyIns, hoaDues, monthlyMIP),
    [monthlyPI, monthlyTax, monthlyIns, hoaDues, monthlyMIP]
  );

  const overLimit = baseLoan > FHA_STANDARD_LIMIT;
  const overHighCostLimit = baseLoan > FHA_HIGH_COST_LIMIT;

  const frontEndDTI = grossIncome > 0 ? ((totalMonthly / grossIncome) * 100).toFixed(1) : "—";
  const backEndDTI =
    grossIncome > 0 ? (((totalMonthly + monthlyDebts) / grossIncome) * 100).toFixed(1) : "—";

  const pieSlices: PieSlice[] = [
    { value: monthlyPI, color: "#0ea5e9", label: "Principal & Interest" },
    { value: monthlyTax, color: "#8b5cf6", label: "Property Tax" },
    { value: monthlyIns, color: "#10b981", label: "Insurance" },
    { value: hoaDues, color: "#f59e0b", label: "HOA" },
    { value: monthlyMIP, color: "#ef4444", label: "Annual MIP" },
  ].filter((s) => s.value > 0);

  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }} className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2" style={{ color: "#64748b", fontSize: "0.85rem" }}>
            <Link href="/calculators" style={{ color: "#0ea5e9", textDecoration: "none" }}>
              ← All Calculators
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span
              style={{
                backgroundColor: "#16a34a",
                color: "#fff",
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              FHA
            </span>
            <h1 className="text-3xl font-bold" style={{ color: "#ffffff" }}>
              FHA Loan Affordability Calculator
            </h1>
          </div>
          <p style={{ color: "#94a3b8", maxWidth: "540px" }}>
            FHA loans require a minimum 3.5% down payment. Includes upfront MIP (1.75%) rolled
            into the loan and annual MIP (0.55%).
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div style={{ backgroundColor: "#1e293b", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #334155" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#ffffff" }}>Loan Details</h2>

            {overLimit && (
              <div
                style={{
                  backgroundColor: "rgba(251,191,36,0.1)",
                  border: "1px solid rgba(251,191,36,0.4)",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                  marginBottom: "1rem",
                  fontSize: "0.8rem",
                  color: "#fbbf24",
                }}
              >
                ⚠️ Base loan amount ({formatCurrency(baseLoan)}) exceeds the FHA standard limit of{" "}
                {formatCurrency(FHA_STANDARD_LIMIT)}.{overHighCostLimit ? " Exceeds high-cost limit too. May not qualify for FHA." : " May qualify in high-cost areas."}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div>
                <label style={labelCls}>Gross Monthly Income</label>
                <input type="number" min={0} step={100} value={grossIncome} onChange={(e) => setGrossIncome(Number(e.target.value))} style={inputCls} />
                <input type="range" min={0} max={30000} step={100} value={grossIncome} onChange={(e) => setGrossIncome(Number(e.target.value))} style={{ width: "100%", accentColor: "#0ea5e9", marginTop: "0.4rem" }} />
              </div>
              <div>
                <label style={labelCls}>Monthly Debts (non-housing)</label>
                <input type="number" min={0} step={50} value={monthlyDebts} onChange={(e) => setMonthlyDebts(Number(e.target.value))} style={inputCls} />
              </div>
              <div>
                <label style={labelCls}>Home Price</label>
                <input type="number" min={50000} max={2000000} step={5000} value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} style={inputCls} />
                <input type="range" min={100000} max={2000000} step={10000} value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} style={{ width: "100%", accentColor: "#0ea5e9", marginTop: "0.4rem" }} />
              </div>
              <div>
                <label style={labelCls}>Down Payment % (min 3.5%)</label>
                <input
                  type="number"
                  min={3.5}
                  max={20}
                  step={0.5}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Math.max(3.5, Number(e.target.value)))}
                  style={inputCls}
                />
                <p style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                  = {formatCurrency(dpAmount)} · LTV: {ltv.toFixed(1)}%
                </p>
              </div>
              <div>
                <label style={labelCls}>Loan Term</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[15, 20, 30].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setLoanTerm(yr)}
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        borderRadius: "0.375rem",
                        border: loanTerm === yr ? "2px solid #0ea5e9" : "2px solid #334155",
                        backgroundColor: loanTerm === yr ? "rgba(14,165,233,0.15)" : "transparent",
                        color: loanTerm === yr ? "#38bdf8" : "#94a3b8",
                        fontWeight: loanTerm === yr ? 700 : 500,
                        cursor: "pointer",
                        fontSize: "0.875rem",
                      }}
                    >
                      {yr} yr
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelCls}>Interest Rate (%)</label>
                <input type="number" min={1} max={20} step={0.125} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} style={inputCls} />
              </div>
              <div>
                <label style={labelCls}>Property State</label>
                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} style={{ ...inputCls, cursor: "pointer" }}>
                  {ALL_STATES.map((s) => (
                    <option key={s.slug} value={s.abbreviation}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelCls}>Property Tax (Annual $)</label>
                <input type="number" min={0} step={100} value={propertyTax} onChange={(e) => setPropertyTax(Number(e.target.value))} style={inputCls} />
              </div>
              <div>
                <label style={labelCls}>Homeowners Insurance (Annual $)</label>
                <input type="number" min={0} step={100} value={homeownersInsurance} onChange={(e) => setHomeownersInsurance(Number(e.target.value))} style={inputCls} />
              </div>
              <div>
                <label style={labelCls}>HOA Dues (Monthly $)</label>
                <input type="number" min={0} step={10} value={hoaDues} onChange={(e) => setHoaDues(Number(e.target.value))} style={inputCls} />
              </div>
              {/* FHA info readonly */}
              <div
                style={{
                  backgroundColor: "rgba(14,165,233,0.06)",
                  border: "1px solid rgba(14,165,233,0.2)",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                  fontSize: "0.8rem",
                }}
              >
                <p style={{ color: "#38bdf8", fontWeight: 600, marginBottom: "0.4rem" }}>FHA Mortgage Insurance</p>
                <p style={{ color: "#94a3b8" }}>Upfront MIP: 1.75% → {formatCurrency(upfrontMIP)} added to loan</p>
                <p style={{ color: "#94a3b8" }}>Annual MIP: 0.55% → {formatCurrency(monthlyMIP)}/mo</p>
                <p style={{ color: "#94a3b8" }}>FHA Loan Amount: {formatCurrency(fhaLoan)}</p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-6">
            <div style={{ backgroundColor: "#1e293b", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #334155", textAlign: "center" }}>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Total Monthly FHA Payment</p>
              <p style={{ color: "#0ea5e9", fontSize: "3rem", fontWeight: 800, lineHeight: 1 }}>${numberWithCommas(totalMonthly)}</p>
              <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.5rem" }}>/month</p>
            </div>
            <div style={{ backgroundColor: "#1e293b", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #334155" }}>
              <h3 className="text-base font-semibold mb-4" style={{ color: "#ffffff" }}>Payment Breakdown</h3>
              <PieChart slices={pieSlices} />
            </div>
            <div style={{ backgroundColor: "#1e293b", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #334155" }}>
              <h3 className="text-base font-semibold mb-4" style={{ color: "#ffffff" }}>Loan Details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem 1rem", fontSize: "0.85rem" }}>
                {[
                  ["Home Value", formatCurrency(homePrice)],
                  ["Base Loan Amount", formatCurrency(baseLoan)],
                  ["FHA Loan (w/ MIP)", formatCurrency(fhaLoan)],
                  ["Down Payment", formatCurrency(dpAmount)],
                  ["LTV Ratio", `${ltv.toFixed(1)}%`],
                  ["Upfront MIP", formatCurrency(upfrontMIP)],
                  ["Monthly MIP", formatCurrency(monthlyMIP)],
                  ["Monthly P&I", formatCurrency(monthlyPI)],
                  ["Front-End DTI", `${frontEndDTI}%`],
                  ["Back-End DTI", `${backEndDTI}%`],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p style={{ color: "#64748b", fontSize: "0.75rem" }}>{k}</p>
                    <p style={{ color: "#e2e8f0", fontWeight: 600 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/get-started/purchase"
              style={{ backgroundColor: "#0ea5e9", color: "#fff", padding: "1rem", borderRadius: "0.75rem", fontWeight: 700, textAlign: "center", textDecoration: "none", display: "block", fontSize: "1rem" }}
            >
              Get Pre-Approved with Nathan →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
