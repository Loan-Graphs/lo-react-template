"use client";

import Link from "next/link";

const calculators = [
  {
    title: "Conventional Loan",
    desc: "Calculate payments with PMI based on your credit score",
    href: "/calculators/conventional",
    icon: "🏠",
  },
  {
    title: "FHA Loan",
    desc: "FHA financing with MIP — as low as 3.5% down",
    href: "/calculators/fha",
    icon: "🏛️",
  },
  {
    title: "VA Loan",
    desc: "$0 down for eligible veterans with no PMI",
    href: "/calculators/va",
    icon: "🎖️",
  },
  {
    title: "USDA Loan",
    desc: "Rural housing loan with no down payment",
    href: "/calculators/usda",
    icon: "🌾",
  },
  {
    title: "Jumbo Loan",
    desc: "High-value properties above conforming limits",
    href: "/calculators/jumbo",
    icon: "🏰",
  },
  {
    title: "Refinance",
    desc: "Calculate savings, cash-out potential, and break-even",
    href: "/calculators/refinance",
    icon: "🔄",
  },
];

export default function CalculatorsHub() {
  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}
        className="py-16 text-center"
      >
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold" style={{ color: "#ffffff" }}>
            Mortgage Calculators
          </h1>
          <p style={{ color: "#94a3b8", marginTop: "0.75rem", fontSize: "1.05rem" }}>
            Estimate your monthly payment for any loan type — live calculations, no sign-up required.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "1rem",
                  padding: "1.75rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  transition: "border-color 0.2s, transform 0.15s, box-shadow 0.2s",
                  cursor: "pointer",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "#0ea5e9";
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 8px 24px rgba(14,165,233,0.15)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "#334155";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "2.5rem", lineHeight: 1 }}>{calc.icon}</div>
                <h2
                  style={{
                    color: "#ffffff",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {calc.title}
                </h2>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.875rem",
                    margin: 0,
                    lineHeight: 1.5,
                    flex: 1,
                  }}
                >
                  {calc.desc}
                </p>
                <div
                  style={{
                    color: "#0ea5e9",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginTop: "0.25rem",
                  }}
                >
                  Calculate →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: "3rem",
            textAlign: "center",
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "1rem",
            padding: "2.5rem 1.5rem",
          }}
        >
          <h2 className="text-2xl font-bold" style={{ color: "#ffffff", marginBottom: "0.5rem" }}>
            Ready to apply?
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
            Get pre-approved in minutes.
          </p>
          <Link
            href="/apply"
            style={{
              backgroundColor: "#0ea5e9",
              color: "#fff",
              padding: "0.875rem 2rem",
              borderRadius: "0.75rem",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-block",
              fontSize: "1rem",
            }}
          >
            Get Pre-Approved with Nathan →
          </Link>
        </div>
      </div>
    </div>
  );
}
