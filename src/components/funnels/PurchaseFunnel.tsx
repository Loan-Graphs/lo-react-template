"use client";

import { useState } from "react";
import {
  CheckCircle,
  Loader2,
  ChevronRight,
  Home,
  Building2,
  Layers,
  MapPin,
  Smartphone,
  TreePine,
  Phone,
  ArrowLeft,
} from "lucide-react";
import { ALL_STATES } from "@/lib/states";
import { formatCurrency, calculateMonthlyPayment } from "@/lib/mortgageHelpers";

// ── Types ────────────────────────────────────────────────────────────────────

type PropertyType =
  | "Single Family Home"
  | "Condo"
  | "Townhouse"
  | "Multi-Family"
  | "Mobile Home"
  | "Land";

type DownPaymentPct = "3%" | "3.5%" | "5%" | "10%" | "20%" | "Other";
type ContractStatus =
  | "Just browsing"
  | "Getting pre-approved"
  | "Have a contract"
  | "Under contract";
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

interface PurchaseData {
  propertyType: PropertyType | "";
  state: string;
  purchasePrice: number;
  downPaymentPct: DownPaymentPct | "";
  contractStatus: ContractStatus | "";
  employmentStatus: EmploymentStatus | "";
  annualIncome: number;
  creditScore: CreditScore | "";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const PCT_MAP: Record<string, number> = {
  "3%": 0.03,
  "3.5%": 0.035,
  "5%": 0.05,
  "10%": 0.1,
  "20%": 0.2,
  Other: 0.1,
};

function getDownPaymentAmount(price: number, pct: DownPaymentPct | ""): number {
  if (!pct) return 0;
  return price * (PCT_MAP[pct] ?? 0.1);
}

function getLoanAmount(price: number, pct: DownPaymentPct | ""): number {
  return price - getDownPaymentAmount(price, pct);
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

const btnStyle = (active: boolean): React.CSSProperties =>
  active ? btnActive : btnInactive;

const PROPERTY_TYPE_ICONS: Record<PropertyType, React.ReactNode> = {
  "Single Family Home": <Home size={28} />,
  Condo: <Building2 size={28} />,
  Townhouse: <Layers size={28} />,
  "Multi-Family": <Building2 size={28} />,
  "Mobile Home": <Smartphone size={28} />,
  Land: <TreePine size={28} />,
};

const TOTAL_STEPS = 8;

// ── Component ────────────────────────────────────────────────────────────────

export default function PurchaseFunnel() {
  const [step, setStep] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [stateSearch, setStateSearch] = useState("");

  const [data, setData] = useState<PurchaseData>({
    propertyType: "",
    state: "",
    purchasePrice: 450000,
    downPaymentPct: "",
    contractStatus: "",
    employmentStatus: "",
    annualIncome: 100000,
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

  const autoAdvance = (next: number) => {
    setTimeout(() => goToStep(next), 350);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "purchase" }),
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

  const loanAmount = getLoanAmount(data.purchasePrice, data.downPaymentPct);
  const estMonthlyPayment = loanAmount > 0
    ? calculateMonthlyPayment(loanAmount, 6.875, 30)
    : 0;

  const filteredStates = ALL_STATES.filter(
    (s) =>
      s.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
      s.abbreviation.toLowerCase().includes(stateSearch.toLowerCase())
  );

  // ── Success ──────────────────────────────────────────────────────────────

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
            You&apos;re on your way!
          </h2>
          <p style={{ color: "#86efac", lineHeight: 1.6, marginBottom: "1rem" }}>
            We&apos;ll be in touch within 1 business day.
          </p>
          {loanAmount > 0 && (
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
                Your estimated loan amount
              </p>
              <p style={{ color: "#38bdf8", fontSize: "2rem", fontWeight: 700 }}>
                {formatCurrency(loanAmount)}
              </p>
              <p style={{ color: "#64748b", fontSize: "0.75rem" }}>
                Est. ~{formatCurrency(estMonthlyPayment)}/mo at 6.875% · 30yr
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

  // ── Funnel Card ───────────────────────────────────────────────────────────

  return (
    <div className="flex items-start justify-center min-h-screen px-4 py-12">
      <div style={{ maxWidth: "620px", width: "100%" }}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-5">
            <Home size={26} style={{ color: "#0ea5e9" }} />
            <span className="text-xl font-bold" style={{ color: "#ffffff" }}>
              Home Purchase Pre-Approval
            </span>
          </div>

          {/* Progress segments */}
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
                What type of property are you buying?
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

          {/* ── STEP 2: Property State ───────────────────────────────────── */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#ffffff" }}>
                Which state is the property in?
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                This helps us match you with the right programs.
              </p>

              <div className="mb-3">
                <label style={labelStyle}>Search State</label>
                <input
                  type="text"
                  placeholder="Type to search..."
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div
                style={{
                  maxHeight: "260px",
                  overflowY: "auto",
                  border: "1px solid #334155",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                {filteredStates.map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => setData({ ...data, state: s.abbreviation })}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.75rem",
                      textAlign: "left",
                      backgroundColor:
                        data.state === s.abbreviation
                          ? "rgba(14,165,233,0.15)"
                          : "transparent",
                      border: "none",
                      borderBottom: "1px solid #1e293b",
                      color: data.state === s.abbreviation ? "#38bdf8" : "#94a3b8",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <MapPin size={14} />
                    {s.name}
                    {data.state === s.abbreviation && (
                      <CheckCircle size={14} style={{ marginLeft: "auto", color: "#0ea5e9" }} />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => goToStep(1)} style={{ ...btnInactive, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={() => goToStep(3)}
                  disabled={!data.state}
                  style={{
                    flex: 3,
                    backgroundColor: "#0ea5e9",
                    color: "#fff",
                    padding: "0.875rem",
                    borderRadius: "0.5rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: data.state ? "pointer" : "not-allowed",
                    opacity: data.state ? 1 : 0.5,
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

          {/* ── STEP 3: Purchase Price ───────────────────────────────────── */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#ffffff" }}>
                What&apos;s your estimated purchase price?
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Adjust the price and select a down payment.
              </p>

              {/* Purchase price */}
              <div className="mb-5">
                <label style={labelStyle}>Home Price</label>
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="range"
                    min={100000}
                    max={3000000}
                    step={10000}
                    value={data.purchasePrice}
                    onChange={(e) =>
                      setData({ ...data, purchasePrice: Number(e.target.value) })
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
                    {formatCurrency(data.purchasePrice)}
                  </span>
                </div>
                <div className="flex justify-between text-xs" style={{ color: "#64748b" }}>
                  <span>$100k</span>
                  <span>$3M</span>
                </div>
              </div>

              {/* Down payment buttons */}
              <div className="mb-5">
                <label style={labelStyle}>Down Payment</label>
                <div className="flex flex-wrap gap-2">
                  {(["3%", "3.5%", "5%", "10%", "20%", "Other"] as DownPaymentPct[]).map(
                    (pct) => (
                      <button
                        key={pct}
                        onClick={() => setData({ ...data, downPaymentPct: pct })}
                        style={btnStyle(data.downPaymentPct === pct)}
                      >
                        {pct}
                        {data.downPaymentPct === pct && pct !== "Other" && (
                          <span style={{ marginLeft: "5px", fontSize: "0.75rem", opacity: 0.8 }}>
                            ({formatCurrency(getDownPaymentAmount(data.purchasePrice, pct))})
                          </span>
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Loan amount live display */}
              {data.downPaymentPct && (
                <div
                  style={{
                    backgroundColor: "rgba(14,165,233,0.08)",
                    border: "1px solid rgba(14,165,233,0.25)",
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    marginBottom: "1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p style={{ color: "#64748b", fontSize: "0.78rem", marginBottom: "0.2rem" }}>
                      Loan Amount
                    </p>
                    <p style={{ color: "#38bdf8", fontSize: "1.5rem", fontWeight: 700 }}>
                      {formatCurrency(loanAmount)}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ color: "#64748b", fontSize: "0.78rem", marginBottom: "0.2rem" }}>
                      Est. Monthly P&I
                    </p>
                    <p style={{ color: "#e2e8f0", fontSize: "1.1rem", fontWeight: 600 }}>
                      {formatCurrency(estMonthlyPayment)}/mo
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => goToStep(2)} style={{ ...btnInactive, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={() => goToStep(4)}
                  disabled={!data.downPaymentPct}
                  style={{
                    flex: 3,
                    backgroundColor: "#0ea5e9",
                    color: "#fff",
                    padding: "0.875rem",
                    borderRadius: "0.5rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: data.downPaymentPct ? "pointer" : "not-allowed",
                    opacity: data.downPaymentPct ? 1 : 0.5,
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

          {/* ── STEP 4: Contract Status ──────────────────────────────────── */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#ffffff" }}>
                Where are you in the buying process?
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                This helps us prioritize your application.
              </p>
              <div className="flex flex-col gap-3 mb-4">
                {(
                  [
                    "Just browsing",
                    "Getting pre-approved",
                    "Have a contract",
                    "Under contract",
                  ] as ContractStatus[]
                ).map((cs) => (
                  <button
                    key={cs}
                    onClick={() => {
                      setData({ ...data, contractStatus: cs });
                      autoAdvance(5);
                    }}
                    style={{
                      ...btnStyle(data.contractStatus === cs),
                      padding: "1rem 1.25rem",
                      textAlign: "left",
                      fontSize: "1rem",
                    }}
                  >
                    {cs}
                  </button>
                ))}
              </div>
              <button onClick={() => goToStep(3)} style={{ ...btnInactive, display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1rem" }}>
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
              <button onClick={() => goToStep(4)} style={{ ...btnInactive, display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1rem" }}>
                <ArrowLeft size={16} /> Back
              </button>
            </div>
          )}

          {/* ── STEP 6: Annual Income ────────────────────────────────────── */}
          {step === 6 && (
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#ffffff" }}>
                What is your annual household income?
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Used to estimate what loan programs you qualify for.
              </p>

              <div className="mb-5">
                <label style={labelStyle}>Annual Household Income</label>
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="range"
                    min={30000}
                    max={500000}
                    step={5000}
                    value={data.annualIncome}
                    onChange={(e) =>
                      setData({ ...data, annualIncome: Number(e.target.value) })
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
                    {data.annualIncome >= 500000
                      ? "$500k+"
                      : formatCurrency(data.annualIncome)}
                  </span>
                </div>
                <div className="flex justify-between text-xs" style={{ color: "#64748b" }}>
                  <span>$30k</span>
                  <span>$500k+</span>
                </div>
              </div>

              <div className="mb-5">
                <label style={labelStyle}>Or enter directly</label>
                <input
                  type="number"
                  min={30000}
                  max={999999}
                  step={1000}
                  value={data.annualIncome}
                  onChange={(e) =>
                    setData({ ...data, annualIncome: Number(e.target.value) })
                  }
                  style={inputStyle}
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => goToStep(5)} style={{ ...btnInactive, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={() => goToStep(7)}
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

          {/* ── STEP 7: Credit Score ─────────────────────────────────────── */}
          {step === 7 && (
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#ffffff" }}>
                What&apos;s your estimated credit score?
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Affects your rate options. A rough estimate is fine.
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
                      autoAdvance(8);
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
              <button onClick={() => goToStep(6)} style={{ ...btnInactive, display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1rem" }}>
                <ArrowLeft size={16} /> Back
              </button>
            </div>
          )}

          {/* ── STEP 8: Lead Capture ─────────────────────────────────────── */}
          {step === 8 && (
            <div>
              <h2 className="text-2xl font-bold mb-1" style={{ color: "#ffffff" }}>
                Almost done!
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Where should we send your results?
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
                {data.propertyType} in {data.state} · {formatCurrency(data.purchasePrice)} ·{" "}
                {data.downPaymentPct} down · {data.creditScore}
                {loanAmount > 0 && (
                  <span>
                    {" "}
                    · Loan Amount:{" "}
                    <strong style={{ color: "#38bdf8" }}>{formatCurrency(loanAmount)}</strong>
                  </span>
                )}
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
                  I agree to be contacted by your loan officer regarding my mortgage inquiry. No
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
                  onClick={() => goToStep(7)}
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
                      <CheckCircle size={16} /> Get My Free Pre-Approval
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
