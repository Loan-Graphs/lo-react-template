"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_STATES } from "@/lib/states";
import {
  calculateDownPayment,
  calculateLoanAmount,
  calculateMonthlyPayment,
  calculatePMI,
  calculateMonthlyPropertyTax,
  calculateMonthlyInsurance,
  calculateTotalMonthlyPayment,
  calculateLTV,
  formatCurrency,
  numberWithCommas,
  PMI_RATE_TABLE,
} from "@/lib/mortgageHelpers";

// ── Credit score options for conventional ────────────────────────────────────
const CREDIT_OPTIONS = PMI_RATE_TABLE.map((r) => ({
  label: r.label,
  pmiRate: r.pmiRate,
}));

// ── Shared styles ────────────────────────────────────────────────────────────
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

// ── CSS Pie Chart ────────────────────────────────────────────────────────────
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

  // Build conic-gradient string
  let gradientStr = "";
  segments.forEach((seg) => {
    gradientStr += `${seg.color} ${seg.start.toFixed(1)}% ${(seg.start + seg.pct).toFixed(1)}%,`;
  });
  gradientStr = gradientStr.slice(0, -1);

  return (
    <div>
      <div
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: `conic-gradient(${gradientStr})`,
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
            <span style={{ color: "#64748b", fontSize: "0.72rem" }}>({seg.pct.toFixed(0)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Calculator ──────────────────────────────────────────────────────────
export default function ConventionalCalculator() {
  const [homePrice, setHomePrice] = useState(550000);
  const [downPayment, setDownPayment] = useState(15);
  const [downPaymentType, setDownPaymentType] = useState<"%" | "$">("%");
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.875);
  const [propertyTax, setPropertyTax] = useState(5500);
  const [homeownersInsurance, setHomeownersInsurance] = useState(1925);
  const [hoaDues, setHoaDues] = useState(0);
  const [selectedState, setSelectedState] = useState("CA");
  const [selectedCreditPMI, setSelectedCreditPMI] = useState(0.52); // 700-719 default
  const [grossIncome, setGrossIncome] = useState(10500);
  const [monthlyDebts, setMonthlyDebts] = useState(1500);

  // ── Derived values ────────────────────────────────────────────────────────
  const dpAmount = useMemo(
    () => calculateDownPayment(homePrice, downPayment, downPaymentType),
    [homePrice, downPayment, downPaymentType]
  );
  const loanAmount = useMemo(() => calculateLoanAmount(homePrice, dpAmount), [homePrice, dpAmount]);
  const ltv = useMemo(() => calculateLTV(loanAmount, homePrice), [loanAmount, homePrice]);
  const pmiApplies = ltv > 80;

  const monthlyPI = useMemo(
    () => calculateMonthlyPayment(loanAmount, interestRate, loanTerm),
    [loanAmount, interestRate, loanTerm]
  );
  const monthlyTax = useMemo(() => calculateMonthlyPropertyTax(propertyTax), [propertyTax]);
  const monthlyIns = useMemo(() => calculateMonthlyInsurance(homeownersInsurance), [homeownersInsurance]);
  const monthlyPMI = useMemo(
    () => (pmiApplies ? calculatePMI(loanAmount, selectedCreditPMI) : 0),
    [loanAmount, selectedCreditPMI, pmiApplies]
  );
  const totalMonthly = useMemo(
    () => calculateTotalMonthlyPayment(monthlyPI, monthlyTax, monthlyIns, hoaDues, monthlyPMI),
    [monthlyPI, monthlyTax, monthlyIns, hoaDues, monthlyPMI]
  );

  // DTI
  const frontEndDTI = grossIncome > 0 ? ((totalMonthly / grossIncome) * 100).toFixed(1) : "—";
  const backEndDTI =
    grossIncome > 0 ? (((totalMonthly + monthlyDebts) / grossIncome) * 100).toFixed(1) : "—";

  const pieSlices: PieSlice[] = [
    { value: monthlyPI, color: "#0ea5e9", label: "Principal & Interest" },
    { value: monthlyTax, color: "#8b5cf6", label: "Property Tax" },
    { value: monthlyIns, color: "#10b981", label: "Insurance" },
    { value: hoaDues, color: "#f59e0b", label: "HOA" },
    { value: monthlyPMI, color: "#ef4444", label: "PMI" },
  ].filter((s) => s.value > 0);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }} className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2" style={{ color: "#64748b", fontSize: "0.85rem" }}>
            <Link href="/calculators" style={{ color: "#0ea5e9", textDecoration: "none" }}>
              ← All Calculators
            </Link>
          </div>
          <h1 className="text-3xl font-bold" style={{ color: "#ffffff" }}>
            Conventional Loan Affordability Calculator
          </h1>
          <p style={{ color: "#94a3b8", marginTop: "0.5rem", maxWidth: "540px" }}>
            Calculate your monthly payment breakdown including PMI, taxes, and insurance. Live
            calculations update as you type.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ── Left: Inputs ────────────────────────────────────────────── */}
          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: "1rem",
              padding: "1.5rem",
              border: "1px solid #334155",
            }}
          >
            <h2 className="text-lg font-bold mb-4" style={{ color: "#ffffff" }}>
              Loan Details
            </h2>

            <div className="flex flex-col gap-4">
              {/* Gross Income */}
              <div>
                <label style={labelCls}>Gross Monthly Income</label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={grossIncome}
                  onChange={(e) => setGrossIncome(Number(e.target.value))}
                  style={inputCls}
                />
                <input
                  type="range"
                  min={0}
                  max={30000}
                  step={100}
                  value={grossIncome}
                  onChange={(e) => setGrossIncome(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#0ea5e9", marginTop: "0.4rem" }}
                />
              </div>

              {/* Monthly Debts */}
              <div>
                <label style={labelCls}>Monthly Debts (non-housing)</label>
                <input
                  type="number"
                  min={0}
                  step={50}
                  value={monthlyDebts}
                  onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                  style={inputCls}
                />
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={50}
                  value={monthlyDebts}
                  onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#0ea5e9", marginTop: "0.4rem" }}
                />
              </div>

              {/* Home Price */}
              <div>
                <label style={labelCls}>Home Price</label>
                <input
                  type="number"
                  min={50000}
                  max={5000000}
                  step={5000}
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  style={inputCls}
                />
                <input
                  type="range"
                  min={100000}
                  max={3000000}
                  step={10000}
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#0ea5e9", marginTop: "0.4rem" }}
                />
              </div>

              {/* Down Payment */}
              <div>
                <label style={labelCls}>Down Payment</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="number"
                    min={0}
                    step={downPaymentType === "%" ? 0.5 : 1000}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    style={{ ...inputCls, flex: 1 }}
                  />
                  <button
                    onClick={() => {
                      setDownPaymentType(downPaymentType === "%" ? "$" : "%");
                      setDownPayment(downPaymentType === "%" ? dpAmount : (dpAmount / homePrice) * 100);
                    }}
                    style={{
                      padding: "0.5rem 0.75rem",
                      backgroundColor: "#334155",
                      border: "1px solid #475569",
                      borderRadius: "0.375rem",
                      color: "#e2e8f0",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                    }}
                  >
                    {downPaymentType}
                  </button>
                </div>
                <p style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                  = {formatCurrency(dpAmount)} · LTV: {ltv.toFixed(1)}%
                  {pmiApplies && <span style={{ color: "#fbbf24" }}> — PMI applies</span>}
                  {!pmiApplies && ltv > 0 && <span style={{ color: "#86efac" }}> — No PMI</span>}
                </p>
              </div>

              {/* Loan Term */}
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

              {/* Interest Rate */}
              <div>
                <label style={labelCls}>Interest Rate (%)</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  step={0.125}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  style={inputCls}
                />
              </div>

              {/* Credit Score / PMI */}
              <div>
                <label style={labelCls}>Credit Score Range</label>
                <select
                  value={selectedCreditPMI}
                  onChange={(e) => setSelectedCreditPMI(Number(e.target.value))}
                  style={{ ...inputCls, cursor: "pointer" }}
                >
                  {CREDIT_OPTIONS.map((o) => (
                    <option key={o.label} value={o.pmiRate}>
                      {o.label} — PMI {o.pmiRate}%
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div>
                <label style={labelCls}>Property State</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  style={{ ...inputCls, cursor: "pointer" }}
                >
                  {ALL_STATES.map((s) => (
                    <option key={s.slug} value={s.abbreviation}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Tax */}
              <div>
                <label style={labelCls}>Property Tax (Annual $)</label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(Number(e.target.value))}
                  style={inputCls}
                />
              </div>

              {/* Insurance */}
              <div>
                <label style={labelCls}>Homeowners Insurance (Annual $)</label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={homeownersInsurance}
                  onChange={(e) => setHomeownersInsurance(Number(e.target.value))}
                  style={inputCls}
                />
              </div>

              {/* HOA */}
              <div>
                <label style={labelCls}>HOA Dues (Monthly $)</label>
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={hoaDues}
                  onChange={(e) => setHoaDues(Number(e.target.value))}
                  style={inputCls}
                />
              </div>
            </div>
          </div>

          {/* ── Right: Results ───────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* Total Monthly Payment */}
            <div
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "1rem",
                padding: "1.5rem",
                border: "1px solid #334155",
                textAlign: "center",
              }}
            >
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                Total Monthly Payment
              </p>
              <p style={{ color: "#0ea5e9", fontSize: "3rem", fontWeight: 800, lineHeight: 1 }}>
                ${numberWithCommas(totalMonthly)}
              </p>
              <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                /month
              </p>
            </div>

            {/* Pie chart */}
            <div
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "1rem",
                padding: "1.5rem",
                border: "1px solid #334155",
              }}
            >
              <h3 className="text-base font-semibold mb-4" style={{ color: "#ffffff" }}>
                Payment Breakdown
              </h3>
              <PieChart slices={pieSlices} />
            </div>

            {/* Loan Details */}
            <div
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "1rem",
                padding: "1.5rem",
                border: "1px solid #334155",
              }}
            >
              <h3 className="text-base font-semibold mb-4" style={{ color: "#ffffff" }}>
                Loan Details
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem 1rem",
                  fontSize: "0.85rem",
                }}
              >
                {[
                  ["Home Value", formatCurrency(homePrice)],
                  ["Loan Amount", formatCurrency(loanAmount)],
                  ["Down Payment", formatCurrency(dpAmount)],
                  ["LTV Ratio", `${ltv.toFixed(1)}%`],
                  ["Monthly P&I", formatCurrency(monthlyPI)],
                  ["Monthly PMI", pmiApplies ? formatCurrency(monthlyPMI) : "None"],
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

            {/* CTA */}
            <Link
              href="/get-started/purchase"
              style={{
                backgroundColor: "#0ea5e9",
                color: "#fff",
                padding: "1rem",
                borderRadius: "0.75rem",
                fontWeight: 700,
                textAlign: "center",
                textDecoration: "none",
                display: "block",
                fontSize: "1rem",
              }}
            >
              Get Pre-Approved with Nathan →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
