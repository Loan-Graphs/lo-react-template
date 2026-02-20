"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  calculateMonthlyPayment,
  calculateBreakEven,
  formatCurrency,
  numberWithCommas,
} from "@/lib/mortgageHelpers";

// ── Shared styles ─────────────────────────────────────────────────────────────
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

const dividerCls: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  margin: "0.25rem 0 1rem",
};

const dividerLineCls: React.CSSProperties = {
  flex: 1,
  height: "1px",
  backgroundColor: "#334155",
};

const dividerTextCls: React.CSSProperties = {
  color: "#64748b",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={dividerCls}>
      <div style={dividerLineCls} />
      <span style={dividerTextCls}>{label}</span>
      <div style={dividerLineCls} />
    </div>
  );
}

function ToggleRow({
  checked,
  onToggle,
  label,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: "pointer",
        userSelect: "none",
        color: "#94a3b8",
        fontSize: "0.85rem",
        fontWeight: 500,
        marginBottom: "0.75rem",
      }}
    >
      <span
        onClick={onToggle}
        style={{
          width: "38px",
          height: "22px",
          borderRadius: "11px",
          backgroundColor: checked ? "#0ea5e9" : "#334155",
          position: "relative",
          transition: "background 0.2s",
          flexShrink: 0,
          cursor: "pointer",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "3px",
            left: checked ? "17px" : "3px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            transition: "left 0.2s",
          }}
        />
      </span>
      <span onClick={onToggle}>{label}</span>
    </label>
  );
}

function ResultRow({
  label,
  value,
  highlight = false,
  positive,
  sub,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  positive?: boolean;
  sub?: string;
}) {
  const valueColor = highlight
    ? positive === true
      ? "#4ade80"
      : positive === false
      ? "#f87171"
      : "#38bdf8"
    : "#e2e8f0";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "0.625rem 0",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <div>
        <p style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{label}</p>
        {sub && <p style={{ color: "#475569", fontSize: "0.7rem", marginTop: "0.1rem" }}>{sub}</p>}
      </div>
      <p style={{ color: valueColor, fontWeight: 700, fontSize: highlight ? "1.1rem" : "0.9rem" }}>
        {value}
      </p>
    </div>
  );
}

// ── Main Calculator ───────────────────────────────────────────────────────────
export default function RefinanceCalculator() {
  // Current loan
  const [firstLoanAmount, setFirstLoanAmount] = useState(400000);
  const [firstLoanRate, setFirstLoanRate] = useState(7.25);
  const [firstLoanTerm, setFirstLoanTerm] = useState(30);
  const [loanStartMonth, setLoanStartMonth] = useState("2022-03");

  // Optional second loan
  const [addSecondLoan, setAddSecondLoan] = useState(false);
  const [secondLoanAmount, setSecondLoanAmount] = useState(50000);
  const [secondLoanRate, setSecondLoanRate] = useState(8.5);
  const [secondLoanTerm, setSecondLoanTerm] = useState(20);

  // Optional credit card
  const [addCreditCard, setAddCreditCard] = useState(false);
  const [ccBalance, setCcBalance] = useState(15000);
  const [ccRate, setCcRate] = useState(22.0);

  // Refinance details
  const [currentBalance, setCurrentBalance] = useState(360000);
  const [cashOutAmount, setCashOutAmount] = useState(0);
  const [refinanceCosts, setRefinanceCosts] = useState(8000);

  // New loan
  const [newRate, setNewRate] = useState(6.5);
  const [newTerm, setNewTerm] = useState(30);

  // ── Derived calculations ───────────────────────────────────────────────────
  const newLoanAmount = useMemo(
    () => currentBalance + cashOutAmount + refinanceCosts,
    [currentBalance, cashOutAmount, refinanceCosts]
  );

  const currentMonthlyPayment = useMemo(
    () => calculateMonthlyPayment(firstLoanAmount, firstLoanRate, firstLoanTerm),
    [firstLoanAmount, firstLoanRate, firstLoanTerm]
  );

  const newMonthlyPayment = useMemo(
    () => calculateMonthlyPayment(newLoanAmount, newRate, newTerm),
    [newLoanAmount, newRate, newTerm]
  );

  const monthlySavings = useMemo(
    () => currentMonthlyPayment - newMonthlyPayment,
    [currentMonthlyPayment, newMonthlyPayment]
  );

  const totalInterestCurrent = useMemo(
    () => currentMonthlyPayment * firstLoanTerm * 12 - firstLoanAmount,
    [currentMonthlyPayment, firstLoanTerm, firstLoanAmount]
  );

  const totalInterestNew = useMemo(
    () => newMonthlyPayment * newTerm * 12 - newLoanAmount,
    [newMonthlyPayment, newTerm, newLoanAmount]
  );

  const interestSavings = useMemo(
    () => totalInterestCurrent - totalInterestNew,
    [totalInterestCurrent, totalInterestNew]
  );

  const breakEven = useMemo(
    () => calculateBreakEven(refinanceCosts, monthlySavings),
    [refinanceCosts, monthlySavings]
  );

  // Blended rate: weighted avg of first loan + optional second + optional CC
  const blendedRate = useMemo(() => {
    let totalDebt = firstLoanAmount;
    let weightedRate = firstLoanRate * firstLoanAmount;

    if (addSecondLoan && secondLoanAmount > 0) {
      totalDebt += secondLoanAmount;
      weightedRate += secondLoanRate * secondLoanAmount;
    }
    if (addCreditCard && ccBalance > 0) {
      totalDebt += ccBalance;
      weightedRate += ccRate * ccBalance;
    }

    return totalDebt > 0 ? weightedRate / totalDebt : firstLoanRate;
  }, [
    firstLoanAmount,
    firstLoanRate,
    addSecondLoan,
    secondLoanAmount,
    secondLoanRate,
    addCreditCard,
    ccBalance,
    ccRate,
  ]);

  const showBlendedRate = addSecondLoan || addCreditCard;

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
            Refinance Calculator
          </h1>
          <p style={{ color: "#94a3b8", marginTop: "0.5rem", maxWidth: "540px" }}>
            See your monthly savings, break-even point, and total interest comparison — live as you type.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ── Left: Inputs ──────────────────────────────────────────────── */}
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

            {/* ── Current Loan ── */}
            <SectionDivider label="Current Loan" />

            <div className="flex flex-col gap-4 mb-4">
              <div>
                <label style={labelCls}>1st Loan Amount ($)</label>
                <input
                  type="number"
                  min={0}
                  step={5000}
                  value={firstLoanAmount}
                  onChange={(e) => setFirstLoanAmount(Number(e.target.value))}
                  style={inputCls}
                />
                <input
                  type="range"
                  min={50000}
                  max={3000000}
                  step={10000}
                  value={firstLoanAmount}
                  onChange={(e) => setFirstLoanAmount(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#0ea5e9", marginTop: "0.4rem" }}
                />
              </div>

              <div>
                <label style={labelCls}>Interest Rate (%)</label>
                <input
                  type="number"
                  min={0.5}
                  max={25}
                  step={0.125}
                  value={firstLoanRate}
                  onChange={(e) => setFirstLoanRate(Number(e.target.value))}
                  style={inputCls}
                />
              </div>

              <div>
                <label style={labelCls}>Loan Term (years)</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[15, 20, 30].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setFirstLoanTerm(yr)}
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        borderRadius: "0.375rem",
                        border: firstLoanTerm === yr ? "2px solid #0ea5e9" : "2px solid #334155",
                        backgroundColor: firstLoanTerm === yr ? "rgba(14,165,233,0.15)" : "transparent",
                        color: firstLoanTerm === yr ? "#38bdf8" : "#94a3b8",
                        fontWeight: firstLoanTerm === yr ? 700 : 500,
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
                <label style={labelCls}>Loan Start Date</label>
                <input
                  type="month"
                  value={loanStartMonth}
                  onChange={(e) => setLoanStartMonth(e.target.value)}
                  style={inputCls}
                />
              </div>
            </div>

            {/* ── Second Loan Toggle ── */}
            <ToggleRow
              checked={addSecondLoan}
              onToggle={() => setAddSecondLoan((v) => !v)}
              label="Add Second Loan"
            />

            {addSecondLoan && (
              <div className="flex flex-col gap-4 mb-4 pl-1" style={{ borderLeft: "2px solid #334155", paddingLeft: "0.75rem" }}>
                <div>
                  <label style={labelCls}>2nd Loan Amount ($)</label>
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={secondLoanAmount}
                    onChange={(e) => setSecondLoanAmount(Number(e.target.value))}
                    style={inputCls}
                  />
                  <input
                    type="range"
                    min={0}
                    max={500000}
                    step={5000}
                    value={secondLoanAmount}
                    onChange={(e) => setSecondLoanAmount(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#0ea5e9", marginTop: "0.4rem" }}
                  />
                </div>
                <div>
                  <label style={labelCls}>2nd Loan Rate (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={25}
                    step={0.125}
                    value={secondLoanRate}
                    onChange={(e) => setSecondLoanRate(Number(e.target.value))}
                    style={inputCls}
                  />
                </div>
                <div>
                  <label style={labelCls}>2nd Loan Term (years)</label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {[15, 20, 30].map((yr) => (
                      <button
                        key={yr}
                        onClick={() => setSecondLoanTerm(yr)}
                        style={{
                          flex: 1,
                          padding: "0.5rem",
                          borderRadius: "0.375rem",
                          border: secondLoanTerm === yr ? "2px solid #0ea5e9" : "2px solid #334155",
                          backgroundColor: secondLoanTerm === yr ? "rgba(14,165,233,0.15)" : "transparent",
                          color: secondLoanTerm === yr ? "#38bdf8" : "#94a3b8",
                          fontWeight: secondLoanTerm === yr ? 700 : 500,
                          cursor: "pointer",
                          fontSize: "0.875rem",
                        }}
                      >
                        {yr} yr
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Credit Card Toggle ── */}
            <ToggleRow
              checked={addCreditCard}
              onToggle={() => setAddCreditCard((v) => !v)}
              label="Add Credit Card Debt to Pay Off"
            />

            {addCreditCard && (
              <div className="flex flex-col gap-4 mb-4" style={{ borderLeft: "2px solid #334155", paddingLeft: "0.75rem" }}>
                <div>
                  <label style={labelCls}>Credit Card Balance ($)</label>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={ccBalance}
                    onChange={(e) => setCcBalance(Number(e.target.value))}
                    style={inputCls}
                  />
                  <input
                    type="range"
                    min={0}
                    max={100000}
                    step={500}
                    value={ccBalance}
                    onChange={(e) => setCcBalance(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#0ea5e9", marginTop: "0.4rem" }}
                  />
                </div>
                <div>
                  <label style={labelCls}>Average Interest Rate (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    step={0.5}
                    value={ccRate}
                    onChange={(e) => setCcRate(Number(e.target.value))}
                    style={inputCls}
                  />
                </div>
              </div>
            )}

            {/* ── Refinance Details ── */}
            <SectionDivider label="Refinance Details" />

            <div className="flex flex-col gap-4 mb-4">
              <div>
                <label style={labelCls}>Current Loan Balance ($)</label>
                <input
                  type="number"
                  min={0}
                  step={5000}
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(Number(e.target.value))}
                  style={inputCls}
                />
                <input
                  type="range"
                  min={0}
                  max={3000000}
                  step={10000}
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#0ea5e9", marginTop: "0.4rem" }}
                />
              </div>

              <div>
                <label style={labelCls}>Cash-Out Amount ($)</label>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={cashOutAmount}
                  onChange={(e) => setCashOutAmount(Number(e.target.value))}
                  style={inputCls}
                />
                <input
                  type="range"
                  min={0}
                  max={500000}
                  step={5000}
                  value={cashOutAmount}
                  onChange={(e) => setCashOutAmount(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#0ea5e9", marginTop: "0.4rem" }}
                />
              </div>

              <div>
                <label style={labelCls}>Refinance Costs ($)</label>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={refinanceCosts}
                  onChange={(e) => setRefinanceCosts(Number(e.target.value))}
                  style={inputCls}
                />
                <p style={{ color: "#64748b", fontSize: "0.72rem", marginTop: "0.25rem" }}>
                  New loan total: {formatCurrency(newLoanAmount)} (balance + cash-out + costs)
                </p>
              </div>
            </div>

            {/* ── New Loan ── */}
            <SectionDivider label="New Loan" />

            <div className="flex flex-col gap-4">
              <div>
                <label style={labelCls}>New Interest Rate (%)</label>
                <input
                  type="number"
                  min={0.5}
                  max={25}
                  step={0.125}
                  value={newRate}
                  onChange={(e) => setNewRate(Number(e.target.value))}
                  style={inputCls}
                />
              </div>

              <div>
                <label style={labelCls}>New Loan Term</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[15, 20, 30].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setNewTerm(yr)}
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        borderRadius: "0.375rem",
                        border: newTerm === yr ? "2px solid #0ea5e9" : "2px solid #334155",
                        backgroundColor: newTerm === yr ? "rgba(14,165,233,0.15)" : "transparent",
                        color: newTerm === yr ? "#38bdf8" : "#94a3b8",
                        fontWeight: newTerm === yr ? 700 : 500,
                        cursor: "pointer",
                        fontSize: "0.875rem",
                      }}
                    >
                      {yr} yr
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Results ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* Monthly Savings Hero */}
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
                Monthly {monthlySavings >= 0 ? "Savings" : "Extra Cost"}
              </p>
              <p
                style={{
                  color: monthlySavings >= 0 ? "#4ade80" : "#f87171",
                  fontSize: "3rem",
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                {monthlySavings >= 0 ? "+" : ""}
                {formatCurrency(Math.abs(monthlySavings))}
              </p>
              <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                /month
              </p>
            </div>

            {/* Monthly Comparison */}
            <div
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "1rem",
                padding: "1.5rem",
                border: "1px solid #334155",
              }}
            >
              <h3 className="text-base font-semibold mb-3" style={{ color: "#ffffff" }}>
                Monthly Payment Comparison
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.75rem" }}>
                <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "#0f172a", borderRadius: "0.5rem", border: "1px solid #334155" }}>
                  <p style={{ color: "#64748b", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Current</p>
                  <p style={{ color: "#f87171", fontSize: "1.5rem", fontWeight: 800, marginTop: "0.25rem" }}>
                    {formatCurrency(currentMonthlyPayment)}
                  </p>
                  <p style={{ color: "#475569", fontSize: "0.72rem" }}>/month</p>
                </div>
                <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "#0f172a", borderRadius: "0.5rem", border: "1px solid #334155" }}>
                  <p style={{ color: "#64748b", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>New</p>
                  <p style={{ color: "#4ade80", fontSize: "1.5rem", fontWeight: 800, marginTop: "0.25rem" }}>
                    {formatCurrency(newMonthlyPayment)}
                  </p>
                  <p style={{ color: "#475569", fontSize: "0.72rem" }}>/month</p>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "1rem",
                padding: "1.5rem",
                border: "1px solid #334155",
              }}
            >
              <h3 className="text-base font-semibold mb-1" style={{ color: "#ffffff" }}>
                Refinance Analysis
              </h3>

              <ResultRow
                label="Total Interest — Current Loan"
                value={formatCurrency(totalInterestCurrent)}
                sub={`${firstLoanTerm}-year term at ${firstLoanRate}%`}
              />
              <ResultRow
                label="Total Interest — New Loan"
                value={formatCurrency(totalInterestNew)}
                sub={`${newTerm}-year term at ${newRate}%`}
              />
              <ResultRow
                label="Lifetime Interest Savings"
                value={interestSavings >= 0 ? `+${formatCurrency(interestSavings)}` : `-${formatCurrency(Math.abs(interestSavings))}`}
                highlight
                positive={interestSavings >= 0}
              />
              <ResultRow
                label="Break-Even Point"
                value={
                  breakEven === null
                    ? monthlySavings <= 0
                      ? "N/A — no savings"
                      : "N/A"
                    : `${breakEven} months`
                }
                highlight
                positive={breakEven !== null && breakEven <= 36}
                sub={
                  breakEven !== null
                    ? `${formatCurrency(refinanceCosts)} ÷ ${formatCurrency(monthlySavings)}/mo`
                    : undefined
                }
              />
              <ResultRow
                label="New Loan Amount"
                value={formatCurrency(newLoanAmount)}
                sub="Balance + cash-out + costs"
              />
              {showBlendedRate && (
                <ResultRow
                  label="Blended Rate (Current Debts)"
                  value={`${blendedRate.toFixed(3)}%`}
                  highlight
                  sub="Weighted avg across all included debt"
                />
              )}
            </div>

            {/* CTA */}
            <Link
              href="/get-started/refinance"
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
              Start Your Refinance with Nathan →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
