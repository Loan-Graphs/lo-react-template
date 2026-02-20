import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Phone, ChevronRight } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { ALL_STATES, getStateBySlug } from "@/lib/states";
import { LOAN_PROGRAMS, getLoanProgram } from "@/lib/loan-programs";
import { getProfile } from "@/lib/profileContext";

interface PageProps {
  params: Promise<{ program: string; state: string }>;
}

export async function generateStaticParams() {
  const params: { program: string; state: string }[] = [];
  for (const program of LOAN_PROGRAMS) {
    for (const state of ALL_STATES) {
      params.push({ program: program.slug, state: state.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { program: programSlug, state: stateSlug } = await params;
  const program = getLoanProgram(programSlug);
  const state = getStateBySlug(stateSlug);

  if (!program || !state) {
    return { title: "Not Found" };
  }

  const ogTitle = encodeURIComponent(`${program.name} Loans in ${state.name}`);
  const ogSubtitle = encodeURIComponent("Compare rates, limits, and requirements");
  const ogType = encodeURIComponent("Loan Program");

  return {
    title: program.metaTitle(state.name),
    description: program.metaDesc(state.name),
    alternates: {
      canonical: `https://nathanloanteam.com/loans/${program.slug}/${state.slug}`,
    },
    openGraph: {
      title: program.metaTitle(state.name),
      description: program.metaDesc(state.name),
      url: `https://nathanloanteam.com/loans/${program.slug}/${state.slug}`,
      images: [
        {
          url: `/api/og?title=${ogTitle}&subtitle=${ogSubtitle}&type=${ogType}`,
          width: 1200,
          height: 630,
          alt: `${program.name} Loans in ${state.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [`/api/og?title=${ogTitle}&subtitle=${ogSubtitle}&type=${ogType}`],
    },
  };
}

export default async function LoanProgramStatePage({ params }: PageProps) {
  const { program: programSlug, state: stateSlug } = await params;
  const program = getLoanProgram(programSlug);
  const state = getStateBySlug(stateSlug);

  if (!program || !state) {
    notFound();
  }

  const profile = await getProfile();
  const firstName = profile.name.split(" ")[0];
  const telHref = profile.phone ? `tel:${profile.phone.replace(/\D/g, "")}` : null;

  const faqs = program.faqs(state.name);

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: "#0f172a" }} className="py-3">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm" style={{ color: "#94a3b8" }}>
            <Link href="/" style={{ color: "#94a3b8" }} className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/loans" style={{ color: "#94a3b8" }} className="hover:text-white transition-colors">
              Loan Programs
            </Link>
            <ChevronRight size={14} />
            <Link href={`/loans/${program.slug}`} style={{ color: "#94a3b8" }} className="hover:text-white transition-colors">
              {program.name}
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: "#e2e8f0" }}>{state.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }} className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left content */}
            <div>
              <div className="mb-4">
                <span
                  style={{
                    backgroundColor: "rgba(14,165,233,0.2)",
                    color: "#38bdf8",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    textTransform: "uppercase",
                  }}
                >
                  {program.icon} {program.tagline}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-6" style={{ color: "#ffffff", lineHeight: 1.2 }}>
                {program.headline(state.name)}
              </h1>
              <p className="text-lg mb-8" style={{ color: "#94a3b8", lineHeight: 1.7 }}>
                {program.intro(state.name)}
              </p>

              {/* Phone CTA */}
              {telHref && (
                <a
                  href={telHref}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "#0ea5e9",
                    color: "#ffffff",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.5rem",
                    fontWeight: 700,
                    fontSize: "1rem",
                    textDecoration: "none",
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  <Phone size={18} />
                  Call {firstName}: {profile.phone}
                </a>
              )}
            </div>

            {/* Right: Lead form */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              }}
            >
              <LeadForm
                title={`${program.ctaText} in ${state.name}`}
                subtitle={`${profile.name} will contact you within 24 hours to discuss your ${program.name.toLowerCase()} options in ${state.name}.`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left column: Benefits + Requirements + FAQ */}
          <div className="lg:col-span-2 space-y-10">
            {/* Benefits */}
            <section
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: "#0f172a" }}>
                Benefits of {program.name} in {state.name}
              </h2>
              <ul className="space-y-4">
                {program.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} style={{ color: "#16a34a", flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ color: "#374151", fontSize: "1rem" }}>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: "#0f172a" }}>
                {program.name} Requirements in {state.name}
              </h2>
              <ul className="space-y-3">
                {program.requirements.map((req, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      padding: "0.75rem",
                      backgroundColor: "#f8fafc",
                      borderRadius: "0.5rem",
                      borderLeft: "3px solid #0ea5e9",
                    }}
                  >
                    <span style={{ color: "#374151", fontSize: "0.95rem" }}>{req}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm" style={{ color: "#64748b" }}>
                Requirements vary by lender. Contact {firstName} for your specific situation in {state.name}.
              </p>
            </section>

            {/* FAQ */}
            <section
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: "#0f172a" }}>
                {program.name} FAQs — {state.name}
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i}>
                    <h3 className="font-semibold mb-2" style={{ color: "#1e293b", fontSize: "1rem" }}>
                      {faq.q}
                    </h3>
                    <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.95rem" }}>{faq.a}</p>
                    {i < faqs.length - 1 && (
                      <hr style={{ marginTop: "1.5rem", borderColor: "#f1f5f9" }} />
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Other states for this program */}
            <section
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: "#0f172a" }}>
                {program.name} Available in All 50 States
              </h2>
              <p className="text-sm mb-4" style={{ color: "#64748b" }}>
                {profile.name} is licensed to help borrowers across the country. Select your state:
              </p>
              <div className="flex flex-wrap gap-2">
                {ALL_STATES.filter((s) => s.slug !== state.slug).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/loans/${program.slug}/${s.slug}`}
                    style={{
                      fontSize: "0.8rem",
                      padding: "0.25rem 0.625rem",
                      backgroundColor: "#f1f5f9",
                      color: "#0ea5e9",
                      borderRadius: "0.375rem",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                    className="hover:bg-sky-50 transition-colors"
                  >
                    {s.abbreviation}
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* About Nathan */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <h3 className="font-bold text-lg mb-3" style={{ color: "#0f172a" }}>
                About {profile.name}
              </h3>
              <p className="text-sm mb-4" style={{ color: "#64748b", lineHeight: 1.6 }}>
                {profile.name} is a licensed mortgage loan officer with experience helping borrowers across the country secure the right loan program. Specializing in{" "}{program.name.toLowerCase()} and known for fast closings and clear communication.
              </p>
              <div className="space-y-2">
                <a
                  href={telHref ?? "#"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#0ea5e9",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                  }}
                >
                  <Phone size={16} />
                  {profile.phone}
                </a>
              </div>
            </div>

            {/* CTA box */}
            <div
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
                borderRadius: "1rem",
                padding: "1.5rem",
              }}
            >
              <h3 className="font-bold text-lg mb-2" style={{ color: "#ffffff" }}>
                Ready to Get Started?
              </h3>
              <p className="text-sm mb-4" style={{ color: "#94a3b8" }}>
                Get your free {program.name.toLowerCase()} pre-approval in {state.name} today.
                No obligation — just answers.
              </p>
              <a
                href={telHref ?? "#"}
                style={{
                  display: "block",
                  backgroundColor: "#0ea5e9",
                  color: "#ffffff",
                  textAlign: "center",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                {program.ctaText}
              </a>
            </div>

            {/* Other programs */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <h3 className="font-bold text-base mb-3" style={{ color: "#0f172a" }}>
                Other Loan Programs in {state.name}
              </h3>
              <div className="space-y-2">
                {LOAN_PROGRAMS.filter((p) => p.slug !== program.slug).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/loans/${p.slug}/${state.slug}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 0.75rem",
                      backgroundColor: "#f8fafc",
                      borderRadius: "0.5rem",
                      color: "#0ea5e9",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                    className="hover:bg-sky-50 transition-colors"
                  >
                    <span>{p.icon}</span>
                    {p.name} in {state.name}
                    <ChevronRight size={14} style={{ marginLeft: "auto" }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA banner */}
      <div style={{ backgroundColor: "#0ea5e9" }} className="py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#ffffff" }}>
            Ready to Apply for {program.name} in {state.name}?
          </h2>
          <p className="mb-6" style={{ color: "#e0f2fe", fontSize: "1.1rem" }}>
            {profile.name} will personally guide you through the process. Fast, clear, and stress-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={telHref ?? "#"}
              style={{
                backgroundColor: "#ffffff",
                color: "#0ea5e9",
                padding: "0.875rem 2rem",
                borderRadius: "0.5rem",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              className="hover:opacity-90 transition-opacity"
            >
              <Phone size={18} />
              Call {profile.phone}
            </a>
            <Link
              href="/get-started/purchase"
              style={{
                backgroundColor: "transparent",
                color: "#ffffff",
                padding: "0.875rem 2rem",
                borderRadius: "0.5rem",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                border: "2px solid rgba(255,255,255,0.5)",
              }}
              className="hover:bg-white/10 transition-colors"
            >
              Get Pre-Approved Online →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
