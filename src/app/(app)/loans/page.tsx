import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LOAN_PROGRAMS } from "@/lib/loan-programs";
import { getProfile } from "@/lib/profileContext";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: `Loan Programs | ${profile.name}`,
    description: `Explore all mortgage loan programs offered by ${profile.name}${profile.nmls ? ` (NMLS #${profile.nmls})` : ""} — FHA, VA, Conventional, DSCR, and Jumbo loans. Get pre-approved today.`,
  };
}

export default async function LoansPage() {
  const profile = await getProfile();
  const firstName = profile.name.split(" ")[0];
  const telHref = profile.phone ? `tel:${profile.phone.replace(/\D/g, "")}` : null;

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}
        className="py-16"
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#ffffff" }}>
            Mortgage Loan Programs
          </h1>
          <p className="text-xl" style={{ color: "#94a3b8", maxWidth: "600px", margin: "0 auto" }}>
            {profile.name} offers a full suite of mortgage products. Find the right loan
            program for your situation — available across all licensed states.
          </p>
        </div>
      </div>

      {/* Programs grid */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOAN_PROGRAMS.map((program) => (
            <div
              key={program.slug}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
                padding: "1.75rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="mb-4">
                <span style={{ fontSize: "2.5rem" }}>{program.icon}</span>
              </div>
              <h2 className="text-xl font-bold mb-2" style={{ color: "#0f172a" }}>
                {program.name}
              </h2>
              <p className="text-sm mb-1" style={{ color: "#0ea5e9", fontWeight: 600 }}>
                {program.tagline}
              </p>
              <p className="text-sm mb-6" style={{ color: "#64748b", lineHeight: 1.6, flex: 1 }}>
                {program.intro("your state").slice(0, 160)}...
              </p>
              <div className="space-y-2">
                <Link
                  href={`/loans/${program.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    padding: "0.625rem 1rem",
                    borderRadius: "0.5rem",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  Browse by State
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Info section */}
        <div
          className="mt-16 text-center"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "1rem",
            padding: "3rem 2rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#0f172a" }}>
            Not Sure Which Loan Is Right for You?
          </h2>
          <p className="text-lg mb-8" style={{ color: "#64748b", maxWidth: "600px", margin: "0 auto 2rem" }}>
            {firstName} will review your situation and recommend the best loan program in minutes.
            Free consultation, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {telHref && (
              <a
                href={telHref}
                style={{
                  backgroundColor: "#0ea5e9",
                  color: "#ffffff",
                  padding: "0.875rem 2rem",
                  borderRadius: "0.5rem",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textDecoration: "none",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                Call {profile.phone}
              </a>
            )}
            <Link
              href="/get-started/purchase"
              style={{
                backgroundColor: "#f1f5f9",
                color: "#0f172a",
                padding: "0.875rem 2rem",
                borderRadius: "0.5rem",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
              }}
              className="hover:bg-slate-200 transition-colors"
            >
              Get Pre-Approved Online →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
