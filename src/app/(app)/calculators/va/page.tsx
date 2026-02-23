"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_STATES } from "@/lib/states";
import {
  calculateDownPayment,
  calculateMonthlyPayment,
  calculateMonthlyPropertyTax,
  calculateMonthlyInsurance,
  calculateVaLoanAmount,
  calculateTotalMonthlyPayment,
  calculateLTV,
  formatCurrency,
  numberWithCommas,
} from "@/lib/mortgageHelpers";

type FundingFeeOption = "first_use" | "after_use" | "exempt";

const FUNDING_FEE_OPTIONS: { label: string; value: FundingFeeOption; rate: number }[] = [
  { label: "First Use of VA Loan (2.15%)", value: "first_use", rate: 2.15 },
  { label: "Subsequent Use (3.3%)", value: "after_use", rate: 3.3 },
  { label: "Exempt (disabled veteran)", value: "exempt", rate: 0 },
];

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

interface PieSlice { value: number; color: string; label: string; }

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
  const grad = segments.map((s) => `${s.color} ${s.start.toFixed(1)}% ${(s.start + s.pct).toFixed(1)}%`).join(",");
  return (
    <div>
      <div style={{ width: "180px", height: "180px", borderRadius: "50%", background: `conic-gradient(${grad})`, margin: "0 auto 1.25rem", boxShadow: "0 0 0 4px #1e293b" }} />
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

export default function VACalculator() {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(0); // VA allows $0 down
  const [downPaymentType, setDownPaymentType] = useState<"%" | "$">("%");
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [propertyTax, setPropertyTax] = useState(5000);
  const [homeownersInsurance, setHomeownersInsurance] = useState(1800);
  const [hoaDues, setHoaDues] = useState(0);
  const [selectedState, setSelectedState] = useState("AZ");
  const [fundingFeeOption, setFundingFeeOption] = useState<FundingFeeOption>("first_use");
  const [grossIncome, setGrossIncome] = useState(10500);
  const [monthlyDebts, setMonthlyDebts] = useState(1500);

  const fundingFeeRate = FUNDING_FEE_OPTIONS.find((o) => o.value === fundingFeeOption)?.rate ?? 2.15;

  const dpAmount = useMemo(
    () => calculateDownPayment(homePrice, downPayment, downPaymentType),
    [homePrice, downPayment, downPaymentType]
  );

  const vaDetails = useMemo(
    () => calculateVaLoanAmount(homePrice, dpAmount, fundingFeeRate, fundingFeeOption),
    [homePrice, dpAmount, fundingFeeRate, fundingFeeOption]
  );

  const { baseLoanAmount, vaFundingFee, vaLoanAmount } = vaDetails;
  const ltv = useMemo(() => calculateLTV(baseLoanAmount, homePrice), [baseLoanAmount, homePrice]);

  const monthlyPI = useMemo(
    () => calculateMonthlyPayment(vaLoanAmount, interestRate, loanTerm),
    [vaLoanAmount, interestRate, loanTerm]
  );
  const monthlyTax = useMemo(() => calculateMonthlyPropertyTax(propertyTax), [propertyTax]);
  const monthlyIns = useMemo(() => calculateMonthlyInsurance(homeownersInsurance), [homeownersInsurance]);
  // VA has NO PMI
  const totalMonthly = useMemo(
    () => calculateTotalMonthlyPayment(monthlyPI, monthlyTax, monthlyIns, hoaDues, 0),
    [monthlyPI, monthlyTax, monthlyIns, hoaDues]
  );

  const frontEndDTI = grossIncome > 0 ? ((totalMonthly / grossIncome) * 100).toFixed(1) : "—";
  const backEndDTI = grossIncome > 0 ? (((totalMonthly + monthlyDebts) / grossIncome) * 100).toFixed(1) : "—";

  const pieSlices: PieSlice[] = [
    { value: monthlyPI, color: "#0ea5e9", label: "Principal & Interest" },
    { value: monthlyTax, color: "#8b5cf6", label: "Property Tax" },
    { value: monthlyIns, color: "#10b981", label: "Insurance" },
    { value: hoaDues, color: "#f59e0b", label: "HOA" },
  ].filter((s) => s.value > 0);

  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }} className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-2">
            <Link href="/calculators" style={{ color: "#0ea5e9", textDecoration: "none", fontSize: "0.85rem" }}>← All Calculators</Link>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span style={{ backgroundColor: "#1d4ed8", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 700 }}>VA</span>
            <h1 className="text-3xl font-bold" style={{ color: "#ffffff" }}>VA Loan Affordability Calculator</h1>
          </div>
          <p style={{ color: "#94a3b8", maxWidth: "540px" }}>
            VA loans offer $0 down and no PMI for eligible veterans. Includes VA funding fee
            rolled into the loan.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div style={{ backgroundColor: "#1e293b", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #334155" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#ffffff" }}>Loan Details</h2>
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
                <label style={labelCls}>Home Value</label>
                <input type="number" min={50000} max={5000000} step={5000} value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} style={inputCls} />
                <input type="range" min={100000} max={3000000} step={10000} value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} style={{ width: "100%", accentColor: "#0ea5e9", marginTop: "0.4rem" }} />
              </div>
              <div>
                <label style={labelCls}>Down Payment (0% allowed for VA)</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="number"
                    min={0}
                    step={downPaymentType === "%" ? 1 : 1000}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    style={{ ...inputCls, flex: 1 }}
                  />
                  <button
                    onClick={() => {
                      setDownPaymentType(downPaymentType === "%" ? "$" : "%");
                      setDownPayment(downPaymentType === "%" ? dpAmount : (homePrice > 0 ? (dpAmount / homePrice) * 100 : 0));
                    }}
                    style={{ padding: "0.5rem 0.75rem", backgroundColor: "#334155", border: "1px solid #475569", borderRadius: "0.375rem", color: "#e2e8f0", cursor: "pointer", fontWeight: 700, fontSize: "0.875rem" }}
                  >
                    {downPaymentType}
                  </button>
                </div>
                <p style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                  = {formatCurrency(dpAmount)} · LTV: {ltv.toFixed(1)}%
                </p>
              </div>
              <div>
                <label style={labelCls}>VA Funding Fee</label>
                <div className="flex flex-col gap-2">
                  {FUNDING_FEE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setFundingFeeOption(opt.value)}
                      style={{
                        padding: "0.625rem 0.75rem",
                        borderRadius: "0.375rem",
                        border: fundingFeeOption === opt.value ? "2px solid #0ea5e9" : "2px solid #334155",
                        backgroundColor: fundingFeeOption === opt.value ? "rgba(14,165,233,0.15)" : "transparent",
                        color: fundingFeeOption === opt.value ? "#38bdf8" : "#94a3b8",
                        cursor: "pointer",
                        textAlign: "left",
                        fontSize: "0.85rem",
                        fontWeight: fundingFeeOption === opt.value ? 700 : 500,
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelCls}>Loan Term</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[15, 20, 30].map((yr) => (
                    <button key={yr} onClick={() => setLoanTerm(yr)} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.375rem", border: loanTerm === yr ? "2px solid #0ea5e9" : "2px solid #334155", backgroundColor: loanTerm === yr ? "rgba(14,165,233,0.15)" : "transparent", color: loanTerm === yr ? "#38bdf8" : "#94a3b8", fontWeight: loanTerm === yr ? 700 : 500, cursor: "pointer", fontSize: "0.875rem" }}>
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
                  {ALL_STATES.map((s) => <option key={s.slug} value={s.abbreviation}>{s.name}</option>)}
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
              <div style={{ backgroundColor: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: "0.5rem", padding: "0.75rem", fontSize: "0.8rem" }}>
                <p style={{ color: "#38bdf8", fontWeight: 600, marginBottom: "0.4rem" }}>VA Loan Summary</p>
                <p style={{ color: "#94a3b8" }}>Base Loan: {formatCurrency(baseLoanAmount)}</p>
                <p style={{ color: "#94a3b8" }}>VA Funding Fee ({fundingFeeRate}%): {formatCurrency(vaFundingFee)}</p>
                <p style={{ color: "#94a3b8" }}>Final VA Loan: {formatCurrency(vaLoanAmount)}</p>
                <p style={{ color: "#86efac", marginTop: "0.4rem" }}>✓ No PMI required</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div style={{ backgroundColor: "#1e293b", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #334155", textAlign: "center" }}>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Total Monthly VA Payment</p>
              <p style={{ color: "#0ea5e9", fontSize: "3rem", fontWeight: 800, lineHeight: 1 }}>${numberWithCommas(totalMonthly)}</p>
              <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.5rem" }}>/month · No PMI</p>
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
                  ["Base Loan Amount", formatCurrency(baseLoanAmount)],
                  ["VA Funding Fee", formatCurrency(vaFundingFee)],
                  ["Final VA Loan", formatCurrency(vaLoanAmount)],
                  ["Down Payment", formatCurrency(dpAmount)],
                  ["LTV Ratio", `${ltv.toFixed(1)}%`],
                  ["Monthly P&I", formatCurrency(monthlyPI)],
                  ["PMI", "None (VA benefit)"],
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
            <Link href="/get-started/purchase" style={{ backgroundColor: "#0ea5e9", color: "#fff", padding: "1rem", borderRadius: "0.75rem", fontWeight: 700, textAlign: "center", textDecoration: "none", display: "block", fontSize: "1rem" }}>
              Get Pre-Approved with Nathan →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
