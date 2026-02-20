import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, CheckCircle, Award, Users, TrendingUp, Home } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { getProfile } from "@/lib/profileContext";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: `About ${profile.name} — Licensed Mortgage Loan Officer`,
    description: `Learn about ${profile.name}${profile.nmls ? `, NMLS #${profile.nmls}` : ""}. Licensed mortgage loan officer.`,
  };
}

const processSteps = [
  {
    step: "01",
    title: "Application & Pre-Approval",
    description:
      "Submit your documents and application. We review everything and get you a pre-approval letter within 24–48 hours. You'll know exactly what you can afford before you start shopping.",
  },
  {
    step: "02",
    title: "Find Your Home (or Investment)",
    description:
      "Shop for homes with confidence. Your pre-approval letter shows sellers you're a serious buyer. Your loan officer is available throughout your search to answer questions.",
  },
  {
    step: "03",
    title: "Loan Processing",
    description:
      "Once you're in contract, your full loan package is submitted to underwriting. The appraisal is ordered, title is opened, and the processing team works the file.",
  },
  {
    step: "04",
    title: "Underwriting & Approval",
    description:
      "Underwriting reviews all documents and issues a conditional approval. We work through any conditions quickly. Final approval is typically issued 1–2 weeks before closing.",
  },
  {
    step: "05",
    title: "Clear to Close & Closing",
    description:
      "Once underwriting clears all conditions, you get a Closing Disclosure 3 days before closing. On closing day, you sign documents and get your keys.",
  },
];

export default async function AboutPage() {
  const profile = await getProfile();
  const firstName = profile.name.split(" ")[0];
  const telHref = `tel:${profile.phone.replace(/\D/g, "")}`;

  const credentials = [
    "NMLS Licensed Mortgage Loan Officer",
    ...(profile.company ? [`${profile.company}`] : []),
    ...(profile.states.length > 0
      ? [`Licensed in: ${profile.states.join(", ")}`]
      : []),
    "Specializing in Purchase, Refinance & Investment Loans",
    "FHA, VA, Conventional, Jumbo, DSCR",
  ];

  const stats = [
    { icon: Award, value: "8+", label: "Years Experience" },
    { icon: Users, value: "500+", label: "Loans Closed" },
    { icon: TrendingUp, value: "50+", label: "Loan Programs" },
    {
      icon: Home,
      value: profile.states.length > 0 ? `${profile.states.length} States` : "Multi-State",
      label: "Markets Served",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#0f172a" }} className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(14,165,233,0.15)",
                  border: "1px solid rgba(14,165,233,0.3)",
                  borderRadius: "999px",
                  padding: "0.3rem 0.875rem",
                  marginBottom: "1rem",
                }}
              >
                <span style={{ color: "#38bdf8", fontSize: "0.8rem", fontWeight: 600 }}>
                  About {firstName}
                </span>
              </div>
              <h1
                style={{
                  color: "white",
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
                className="mb-5"
              >
                A Loan Officer Who Actually{" "}
                <span style={{ color: "#0ea5e9" }}>Picks Up the Phone</span>
              </h1>
              {profile.bio ? (
                <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: "2rem" }}>
                  {profile.bio}
                </p>
              ) : (
                <>
                  <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    {profile.name} is a licensed mortgage loan officer dedicated to helping families
                    and investors navigate the home financing process.
                  </p>
                  <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: "2rem" }}>
                    What sets {firstName} apart isn&#39;t just experience or loan volume — it&#39;s
                    availability and communication. They answer the phone. They reply to texts.
                    They explain things in plain English.
                  </p>
                </>
              )}
              <div className="flex gap-4">
                {profile.phone && (
                  <a
                    href={telHref}
                    style={{ backgroundColor: "#0ea5e9" }}
                    className="flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity"
                  >
                    <Phone size={15} />
                    {profile.phone}
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    style={{ border: "1px solid #334155", color: "#cbd5e1" }}
                    className="flex items-center gap-2 px-5 py-2.5 font-semibold rounded-lg text-sm hover:border-sky-500 transition-colors"
                  >
                    <Mail size={15} />
                    Email {firstName}
                  </a>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "0.875rem",
                    padding: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <stat.icon size={28} style={{ color: "#0ea5e9", margin: "0 auto 0.75rem" }} />
                  <div style={{ color: "white", fontSize: "2rem", fontWeight: 800 }}>{stat.value}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 style={{ color: "#0f172a", fontSize: "1.75rem", fontWeight: 800 }} className="mb-5">
                Background &amp; Credentials
              </h2>
              <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
                {firstName} is committed to making the mortgage process transparent and
                straightforward. As a licensed loan officer, {firstName} works with borrowers
                to find the best loan program for their situation — whether that&#39;s a
                first-time home purchase, a refinance, or growing an investment portfolio.
              </p>
              <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                With access to 50+ loan programs, {firstName} can help borrowers in a wide
                range of situations. Communication and transparency are a priority throughout
                every transaction.
              </p>
              <ul className="space-y-2">
                {credentials.map((cred) => (
                  <li key={cred} className="flex items-start gap-2.5">
                    <CheckCircle size={16} style={{ color: "#0ea5e9", flexShrink: 0, marginTop: "3px" }} />
                    <span style={{ color: "#374151", fontSize: "0.9rem" }}>{cred}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "1rem",
                padding: "1.75rem",
              }}
            >
              <h3 style={{ color: "#0f172a", fontWeight: 700, marginBottom: "1rem" }}>
                Get a Free Consultation
              </h3>
              <LeadForm compact title="" subtitle="" />
            </div>
          </div>
        </div>
      </section>

      {/* Mortgage Process */}
      <section style={{ backgroundColor: "#f8fafc" }} className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 style={{ color: "#0f172a", fontSize: "1.75rem", fontWeight: 800 }} className="mb-3">
              The Mortgage Process — Step by Step
            </h2>
            <p style={{ color: "#64748b", maxWidth: "500px" }} className="mx-auto">
              Here&#39;s what you can expect from application to closing when you work with {firstName}.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: "1.25rem",
                top: 0,
                bottom: 0,
                width: "2px",
                backgroundColor: "#e2e8f0",
              }}
              className="hidden sm:block"
            />

            <div className="space-y-8">
              {processSteps.map((step, i) => (
                <div key={step.step} className="relative flex gap-5 sm:gap-8">
                  <div
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "50%",
                      backgroundColor: i === 0 ? "#0ea5e9" : "#1e293b",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {step.step}
                  </div>
                  <div>
                    <h3 style={{ color: "#0f172a", fontWeight: 700, marginBottom: "0.35rem" }}>
                      {step.title}
                    </h3>
                    <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/apply"
              style={{ backgroundColor: "#0ea5e9" }}
              className="inline-block px-7 py-3 text-white font-bold rounded-xl text-base hover:opacity-90 transition-opacity"
            >
              Start Your Application →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
