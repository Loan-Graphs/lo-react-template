import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ALL_STATES } from "@/lib/states";
import { LOAN_PROGRAMS, getLoanProgram } from "@/lib/loan-programs";
import { getProfile } from "@/lib/profileContext";

interface PageProps {
  params: Promise<{ program: string }>;
}

export async function generateStaticParams() {
  return LOAN_PROGRAMS.map((p) => ({ program: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { program: programSlug } = await params;
  const program = getLoanProgram(programSlug);
  if (!program) return { title: "Not Found" };
  const profile = await getProfile();

  return {
    title: `${program.name} by State | ${profile.name}`,
    description: `Find ${program.name} information and get pre-approved. ${profile.name}${profile.nmls ? ` (NMLS #${profile.nmls})` : ""} is a licensed mortgage loan officer helping borrowers achieve homeownership.`,
  };
}

export default async function LoanProgramPage({ params }: PageProps) {
  const { program: programSlug } = await params;
  const program = getLoanProgram(programSlug);
  if (!program) notFound();
  const profile = await getProfile();
  const telHref = profile.phone ? `tel:${profile.phone.replace(/\D/g, "")}` : null;

  // Group states alphabetically (already sorted)
  const stateGroups: Record<string, typeof ALL_STATES> = {};
  for (const state of ALL_STATES) {
    const letter = state.name[0];
    if (!stateGroups[letter]) stateGroups[letter] = [];
    stateGroups[letter].push(state);
  }

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: "#0f172a" }} className="py-3">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm" style={{ color: "#94a3b8" }}>
            <Link href="/" style={{ color: "#94a3b8" }} className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/loans" style={{ color: "#94a3b8" }} className="hover:text-white transition-colors">
              Loan Programs
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: "#e2e8f0" }}>{program.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}
        className="py-16"
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">{program.icon}</div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#ffffff" }}>
            {program.name} — All 50 States
          </h1>
          <p className="text-xl mb-8" style={{ color: "#94a3b8", maxWidth: "600px", margin: "0 auto 2rem" }}>
            {program.tagline}. Click your state to get program details, requirements, and start
            your free pre-approval.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {telHref && (
              <a
                href={telHref}
                style={{
                  backgroundColor: "#0ea5e9",
                  color: "#ffffff",
                  padding: "0.75rem 1.75rem",
                  borderRadius: "0.5rem",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                Call {profile.name.split(" ")[0]}: {profile.phone}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* State grid */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8" style={{ color: "#0f172a" }}>
          {program.name} by State
        </h2>

        {Object.entries(stateGroups).map(([letter, states]) => (
          <div key={letter} className="mb-8">
            <h3
              className="text-sm font-bold mb-3"
              style={{ color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              {letter}
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {states.map((state) => (
                <Link
                  key={state.slug}
                  href={`/loans/${program.slug}/${state.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    textDecoration: "none",
                    color: "#1e293b",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    transition: "all 0.15s",
                  }}
                  className="hover:border-sky-400 hover:shadow-sm"
                >
                  <span>
                    {program.name} in {state.name}
                  </span>
                  <span style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{state.abbreviation}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Other programs */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "1rem",
            padding: "2rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            marginTop: "2rem",
          }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: "#0f172a" }}>
            Explore Other Loan Programs
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {LOAN_PROGRAMS.filter((p) => p.slug !== program.slug).map((p) => (
              <Link
                key={p.slug}
                href={`/loans/${p.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "#f8fafc",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  color: "#0f172a",
                  fontWeight: 500,
                }}
                className="hover:bg-sky-50 transition-colors"
              >
                <span style={{ fontSize: "1.5rem" }}>{p.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{p.name}</div>
                  <div style={{ color: "#64748b", fontSize: "0.8rem" }}>{p.tagline}</div>
                </div>
                <ChevronRight size={16} style={{ marginLeft: "auto", color: "#94a3b8" }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
