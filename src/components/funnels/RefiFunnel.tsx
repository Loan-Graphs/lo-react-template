"use client";

import { useState } from "react";
import {
  CheckCircle,
  Loader2,
  ChevronRight,
  RefreshCw,
  Home,
  Building2,
  Layers,
  Smartphone,
  TreePine,
  Phone,
  ArrowLeft,
} from "lucide-react";
import { ALL_STATES } from "@/lib/states";
import {
  formatCurrency,
  calculateMonthlyPayment,
} from "@/lib/mortgageHelpers";

// ── Types ────────────────────────────────────────────────────────────────────

type PropertyType =
  | "Single Family Home"
  | "Condo"
  | "Townhouse"
  | "Multi-Family"
  | "Mobile Home"
  | "Land";

type RefiGoal =
  | "Lower Monthly Payment"
  | "Cash-Out Equity"
  | "Shorter Loan Term"
  | "Remove PMI"
  | "Lower Interest Rate";

type EmploymentStatus =
  | "W-2 Employee"
  | "Self-Employed"
  | "Retired"
  | "Military"
  | "Other";

type CreditScore =
  | "Excellent (760+)"
  | "Good (720-759)"
  | "Fair (680-719)"
  | "Below Average (620-679)"
  | "Not Sure";

interface RefiData {
  propertyType: PropertyType | "";
  street: string;
  city: string;
  state: string;
  zip: string;
  homeValue: number;
  currentBalance: number;
  refiGoal: RefiGoal | "";
  employmentStatus: EmploymentStatus | "";
  creditScore: CreditScore | "";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function estimateSavings(balance: number): number | null {
  // Assumes current rate 7.5% → new rate 6.5%
  if (balance <= 0) return null;
  const oldPayment = calculateMonthlyPayment(balance, 7.5, 30);
  const newPayment = calculateMonthlyPayment(balance, 6.5, 30);
  const savings = Math.round(oldPayment - newPayment);
  return savings > 0 ? savings : null;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  backgroundColor: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "0.5rem",
  padding: "0.625rem 0.75rem",
  width: "100%",
  fontSize: "0.9rem",
  color: "#e2e8f0",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  color: "#94a3b8",
  fontSize: "0.8rem",
  fontWeight: 600,
  display: "block",
  marginBottom: "0.4rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const btnActive: React.CSSProperties = {
  padding: "0.625rem 1rem",
  borderRadius: "0.5rem",
  border: "2px solid #0ea5e9",
  backgroundColor: "rgba(14,165,233,0.15)",
  color: "#38bdf8",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: "0.9rem",
  transition: "all 0.15s",
};

const btnInactive: React.CSSProperties = {
  padding: "0.625rem 1rem",
  borderRadius: "0.5rem",
  border: "2px solid #334155",
  backgroundColor: "transparent",
  color: "#94a3b8",
  fontWeight: 500,
  cursor: "pointer",
  fontSize: "0.9rem",
  transition: "all 0.15s",
};

const btnStyle = (active: boolean) => (active ? btnActive : btnInactive);

const PROPERTY_TYPE_ICONS: Record<PropertyType, React.ReactNode> = {
  "Single Family Home": <Home size={28} />,
  Condo: <Building2 size={28} />,
  Townhouse: <Layers size={28} />,
  "Multi-Family": <Building2 size={28} />,
  "Mobile Home": <Smartphone size={28} />,
  Land: <TreePine size={28} />,
};

const TOTAL_STEPS = 7;

// ── Component ────────────────────────────────────────────────────────────────

export default function RefiFunnel() {
  const [step, setStep] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState<RefiData>({
    propertyType: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    homeValue: 500000,
    currentBalance: 350000,
    refiGoal: "",
    employmentStatus: "",
    creditScore: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
  });

  const goToStep = (next: number) => {
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 180);
  };

  const autoAdvance = (next: number) => setTimeout(() => goToStep(next), 350);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "refinance" }),
      });
      if (res.ok) {
        setIsSuccess(true);
      } else {
        setError("Something went wrong. Please call your loan officer.");
      }
    } catch {
      setError("Something went wrong. Please call your loan officer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const equity = Math.max(data.homeValue - data.currentBalance, 0);
  const ltv =
    data.homeValue > 0 ? Math.round((data.currentBalance / data.homeValue) * 100) : 0;
  const savings = estimateSavings(data.currentBalance);

  // ── Success ───────────────────────────────────────────────────────────────

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          style={{
            backgroundColor: "#0f2a1e",
            border: "1px solid #16a34a",
            borderRadius: "1.25rem",
            padding: "3rem",
            textAlign: "center",
            maxWidth: "520px",
            width: "100%",
          }}
        >
          <CheckCircle size={56} style={{ color: "#16a34a", margin: "0 auto 1.5rem" }} />
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#ffffff" }}>
            Refi Analysis Requested!
          </h2>
          <p style={{ color: "#86efac", lineHeight: 1.6, marginBottom: "1rem" }}>
            We&apos;ll be in touch within 1 business day with your personalized analysis.
          </p>
          {savings && savings > 0 && (
            <div
              style={{
                backgroundColor: "rgba(14,165,233,0.1)",
                border: "1px solid rgba(14,165,233,0.3)",
                borderRadius: "0.75rem",
                padding: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                Based on your inputs, you may save approximately
              </p>
              <p style={{ color: "#38bdf8", fontSize: "2rem", fontWeight: 700 }}>
                ~{formatCurrency(savings)}/month
              </p>
              <p style={{ color: "#64748b", fontSize: "0.75rem" }}>
                Estimate based on current market rates. Actual savings vary.
              </p>
            </div>
          )}
          <a
            href={`tel:${(process.env.NEXT_PUBLIC_LO_PHONE ?? "").replace(/\D/g, "")}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#0ea5e9",
              color: "#fff",
              padding: "0.75rem 1.75rem",
              borderRadius: "0.5rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <Phone size={18} />
            {process.env.NEXT_PUBLIC_LO_PHONE || "Call Now"}
          </a>
        </div>
      </div>
    );
  }

  // ── Funnel ────────────────────────────────────────────────────────────────

  return (
    <div className="flex items-start justify-center min-h-screen px-4 py-12">
      <div style={{ maxWidth: "620px", width: "100%" }}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-5">
            <RefreshCw size={26} style={{ color: "#0ea5e9" }} />
            <span className="text-xl font-bold" style={{ color: "#ffffff" }}>
              Refinance Savings Analysis
            </span>
          </div>
          <div className="flex items-center gap-1.5 mb-2">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "4px",
                  borderRadius: "2px",
                  backgroundColor: i < step ? "#0ea5e9" : "#334155",
                  transition: "background-color 0.3s",
                }}
              />
            ))}
          </div>
          <p style={{ color: "#64748b", fontSize: "0.8rem" }}>
            Step {step} of {TOTAL_STEPS}
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: "#1e293b",
            borderRadius: "1.25rem",
            padding: "2rem",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            border: "1px solid #334155",
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(10px)" : "translateY(0)",
            transition: "opacity 0.18s ease, transform 0.18s ease",
          }}
        >
          {/* ── STEP 1: Property Type ─────────────────────────────────────── */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#ffffff" }}>
                What type of property are you refinancing?
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Select your property type to get started.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {(
                  [
                    "Single Family Home",
                    "Condo",
                    "Townhouse",
                    "Multi-Family",
                    "Mobile Home",
                    "Land",
                  ] as PropertyType[]
                ).map((pt) => (
                  <button
                    key={pt}
                    onClick={() => {
                      setData({ ...data, propertyType: pt });
                      autoAdvance(2);
                    }}
                    style={{
                      padding: "1.25rem 0.75rem",
                      borderRadius: "0.75rem",
                      border:
                        data.propertyType === pt
                          ? "2px solid #0ea5e9"
                          : "2px solid #334155",
                      backgroundColor:
                        data.propertyType === pt
                          ? "rgba(14,165,233,0.15)"
                          : "rgba(255,255,255,0.03)",
                      color: data.propertyType === pt ? "#38bdf8" : "#94a3b8",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.6rem",
                      transition: "all 0.15s",
                      fontWeight: data.propertyType === pt ? 700 : 500,
                      fontSize: "0.85rem",
                      textAlign: "center",
                    }}
                  >
                    {PROPERTY_TYPE_ICONS[pt]}
                    {pt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 2: Property Address ─────────────────────────────────── */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#ffffff" }}>
                What&apos;s the address of the property?
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                We use this to verify property details.
              </p>

              <div className="mb-3">
                <label style={labelStyle}>Street Address *</label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  value={data.street}
                  onChange={(e) => setData({ ...data, street: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label style={labelStyle}>City *</label>
                  <input
                    type="text"
                    placeholder="Phoenix"
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Zip Code *</label>
                  <input
                    type="text"
                    placeholder="85001"
                    maxLength={5}
                    value={data.zip}
                    onChange={(e) => setData({ ...data, zip: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label style={labelStyle}>State *</label>
                <select
                  value={data.state}
                  onChange={(e) => setData({ ...data, state: e.target.value })}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="">Select state...</option>
                  {ALL_STATES.map((s) => (
                    <option key={s.slug} value={s.abbreviation}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => goToStep(1)}
                  style={{ ...btnInactive, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={() => goToStep(3)}
                  disabled={!data.street || !data.city || !data.state || !data.zip}
                  style={{
                    flex: 3,
                    backgroundColor: "#0ea5e9",
                    color: "#fff",
                    padding: "0.875rem",
                    borderRadius: "0.5rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    opacity:
                      !data.street || !data.city || !data.state || !data.zip ? 0.5 : 1,
                  }}
                >
                  Continue <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Property Value ───────────────────────────────────── */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#ffffff" }}>
                What&apos;s your estimated home value?
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                A rough estimate is fine — we can refine this later.
              </p>

              {/* Home value */}
              <div className="mb-5">
                <label style={labelStyle}>Estimated Home Value</label>
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="range"
                    min={100000}
                    max={3000000}
                    step={10000}
                    value={data.homeValue}
                    onChange={(e) =>
                      setData({ ...data, homeValue: Number(e.target.value) })
                    }
                    style={{ flex: 1, accentColor: "#0ea5e9" }}
                  />
                  <span
                    style={{
                      color: "#38bdf8",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      minWidth: "110px",
                      textAlign: "right",
                    }}
                  >
                    {formatCurrency(data.homeValue)}
                  </span>
                </div>
                <div className="flex justify-between text-xs" style={{ color: "#64748b" }}>
                  <span>$100k</span>
                  <span>$3M</span>
                </div>
              </div>

              {/* Current balance */}
              <div className="mb-5">
                <label style={labelStyle}>Current Loan Balance</label>
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="range"
                    min={0}
                    max={Math.max(data.homeValue, 100000)}
                    step={5000}
                    value={data.currentBalance}
                    onChange={(e) =>
                      setData({ ...data, currentBalance: Number(e.target.value) })
                    }
                    style={{ flex: 1, accentColor: "#0ea5e9" }}
                  />
                  <span
                    style={{
                      color: "#38bdf8",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      minWidth: "110px",
                      textAlign: "right",
                    }}
                  >
                    {formatCurrency(data.currentBalance)}
                  </span>
                </div>
              </div>

              {/* Equity display */}
              <div
                style={{
                  backgroundColor: "rgba(14,165,233,0.08)",
                  border: "1px solid rgba(14,165,233,0.25)",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  marginBottom: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ color: "#64748b", fontSize: "0.78rem", marginBottom: "0.2rem" }}>
                    Estimated Equity
                  </p>
                  <p style={{ color: "#38bdf8", fontSize: "1.5rem", fontWeight: 700 }}>
                    {formatCurrency(equity)}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ color: "#64748b", fontSize: "0.78rem", marginBottom: "0.2rem" }}>
                    Current LTV
                  </p>
                  <p
                    style={{
                      color: ltv <= 80 ? "#86efac" : "#fbbf24",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                    }}
                  >
                    {ltv}%
                  </p>
                  {ltv <= 80 && (
                    <p style={{ color: "#86efac", fontSize: "0.7rem" }}>PMI removal eligible</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => goToStep(2)}
                  style={{ ...btnInactive, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={() => goToStep(4)}
                  style={{
                    flex: 3,
                    backgroundColor: "#0ea5e9",
                    color: "#fff",
                    padding: "0.875rem",
                    borderRadius: "0.5rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  Continue <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 4: Refi Goal ────────────────────────────────────────── */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#ffffff" }}>
                What&apos;s your primary goal for refinancing?
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                This helps us find the best program for you.
              </p>
              <div className="flex flex-col gap-3 mb-4">
                {(
                  [
                    "Lower Monthly Payment",
                    "Cash-Out Equity",
                    "Shorter Loan Term",
                    "Remove PMI",
                    "Lower Interest Rate",
                  ] as RefiGoal[]
                ).map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      setData({ ...data, refiGoal: g });
                      autoAdvance(5);
                    }}
                    style={{
                      ...btnStyle(data.refiGoal === g),
                      padding: "1rem 1.25rem",
                      textAlign: "left",
                      fontSize: "1rem",
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <button
                onClick={() => goToStep(3)}
                style={{ ...btnInactive, display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1rem" }}
              >
                <ArrowLeft size={16} /> Back
              </button>
            </div>
          )}

          {/* ── STEP 5: Employment Status ────────────────────────────────── */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#ffffff" }}>
                What is your employment status?
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Select the option that best describes you.
              </p>
              <div className="flex flex-col gap-3 mb-4">
                {(
                  [
                    "W-2 Employee",
                    "Self-Employed",
                    "Retired",
                    "Military",
                    "Other",
                  ] as EmploymentStatus[]
                ).map((es) => (
                  <button
                    key={es}
                    onClick={() => {
                      setData({ ...data, employmentStatus: es });
                      autoAdvance(6);
                    }}
                    style={{
                      ...btnStyle(data.employmentStatus === es),
                      padding: "1rem 1.25rem",
                      textAlign: "left",
                      fontSize: "1rem",
                    }}
                  >
                    {es}
                  </button>
                ))}
              </div>
              <button
                onClick={() => goToStep(4)}
                style={{ ...btnInactive, display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1rem" }}
              >
                <ArrowLeft size={16} /> Back
              </button>
            </div>
          )}

          {/* ── STEP 6: Credit Score ─────────────────────────────────────── */}
          {step === 6 && (
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#ffffff" }}>
                What&apos;s your estimated credit score?
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                A rough estimate is fine.
              </p>
              <div className="flex flex-col gap-3 mb-4">
                {(
                  [
                    "Excellent (760+)",
                    "Good (720-759)",
                    "Fair (680-719)",
                    "Below Average (620-679)",
                    "Not Sure",
                  ] as CreditScore[]
                ).map((cs) => (
                  <button
                    key={cs}
                    onClick={() => {
                      setData({ ...data, creditScore: cs });
                      autoAdvance(7);
                    }}
                    style={{
                      ...btnStyle(data.creditScore === cs),
                      padding: "1rem 1.25rem",
                      textAlign: "left",
                      fontSize: "1rem",
                    }}
                  >
                    {cs}
                  </button>
                ))}
              </div>
              <button
                onClick={() => goToStep(5)}
                style={{ ...btnInactive, display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1rem" }}
              >
                <ArrowLeft size={16} /> Back
              </button>
            </div>
          )}

          {/* ── STEP 7: Lead Capture ─────────────────────────────────────── */}
          {step === 7 && (
            <div>
              <h2 className="text-2xl font-bold mb-1" style={{ color: "#ffffff" }}>
                Almost done!
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Where should we send your refi analysis?
              </p>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label style={labelStyle}>First Name *</label>
                  <input
                    type="text"
                    placeholder="John"
                    value={data.firstName}
                    onChange={(e) => setData({ ...data, firstName: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Last Name *</label>
                  <input
                    type="text"
                    placeholder="Smith"
                    value={data.lastName}
                    onChange={(e) => setData({ ...data, lastName: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label style={labelStyle}>Email *</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div className="mb-3">
                <label style={labelStyle}>Phone *</label>
                <input
                  type="tel"
                  placeholder="(602) 555-0100"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* Savings teaser */}
              {savings && savings > 0 && (
                <div
                  style={{
                    backgroundColor: "rgba(22,163,74,0.1)",
                    border: "1px solid rgba(22,163,74,0.3)",
                    borderRadius: "0.75rem",
                    padding: "0.875rem",
                    marginBottom: "1rem",
                  }}
                >
                  <p style={{ color: "#86efac", fontWeight: 600, fontSize: "0.85rem" }}>
                    💰 Based on your inputs, you may save ~{formatCurrency(savings)}/month
                  </p>
                  <p style={{ color: "#4ade80", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                    Estimate based on current market rates. Your loan officer will verify your exact savings.
                  </p>
                </div>
              )}

              {/* Summary */}
              <div
                style={{
                  backgroundColor: "rgba(14,165,233,0.07)",
                  border: "1px solid rgba(14,165,233,0.2)",
                  borderRadius: "0.75rem",
                  padding: "0.875rem",
                  marginBottom: "1rem",
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: "#38bdf8" }}>Your summary:</strong>{" "}
                {data.propertyType} · {data.city}, {data.state} ·{" "}
                {formatCurrency(data.homeValue)} value · {formatCurrency(data.currentBalance)}{" "}
                balance · Goal: {data.refiGoal}
              </div>

              {/* Consent */}
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.6rem",
                  cursor: "pointer",
                  marginBottom: "1.25rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={data.consent}
                  onChange={(e) => setData({ ...data, consent: e.target.checked })}
                  style={{ marginTop: "2px", accentColor: "#0ea5e9" }}
                />
                <span style={{ color: "#64748b", fontSize: "0.8rem", lineHeight: 1.5 }}>
                  I agree to be contacted by your loan officer regarding my refinance inquiry. No
                  spam — your info is never sold or shared.
                </span>
              </label>

              {error && (
                <p style={{ color: "#f87171", fontSize: "0.85rem", marginBottom: "1rem" }}>
                  {error}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => goToStep(6)}
                  style={{ ...btnInactive, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting ||
                    !data.firstName ||
                    !data.lastName ||
                    !data.email ||
                    !data.phone ||
                    !data.consent
                  }
                  style={{
                    flex: 3,
                    backgroundColor: "#16a34a",
                    color: "#fff",
                    padding: "0.875rem",
                    borderRadius: "0.5rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    opacity:
                      isSubmitting ||
                      !data.firstName ||
                      !data.lastName ||
                      !data.email ||
                      !data.phone ||
                      !data.consent
                        ? 0.5
                        : 1,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} /> Get My Free Refi Analysis
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
