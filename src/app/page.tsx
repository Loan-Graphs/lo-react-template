import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, CheckCircle, Star, TrendingUp, Home, RefreshCw, DollarSign } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import EmailCapture from "@/components/EmailCapture";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/blog";
import { getProfile } from "@/lib/profileContext";

export const metadata: Metadata = {
  // Overridden dynamically in layout.tsx via generateMetadata()
};

const stats = [
  { value: "500+", label: "Loans Closed" },
  { value: "8+", label: "Years Experience" },
  { value: "24hr", label: "Pre-Approval" },
  { value: "5★", label: "Client Rating" },
];

const services = [
  {
    icon: Home,
    title: "Home Purchase",
    description:
      "Buying your first home or upgrading? We'll find the right loan program — conventional, FHA, VA — and get you to closing fast.",
    cta: { label: "Learn More", href: "/loans/conventional" },
  },
  {
    icon: RefreshCw,
    title: "Refinance",
    description:
      "Lower your rate, shorten your term, or pull cash out for renovations or debt consolidation. Let's see what makes sense for your situation.",
    cta: { label: "Get Quote", href: "/contact" },
  },
  {
    icon: TrendingUp,
    title: "DSCR Investment Loans",
    description:
      "Grow your rental portfolio without W2 income requirements. Qualify on your property's cash flow. No tax returns required.",
    cta: { label: "Learn More", href: "/loans/conventional" },
  },
  {
    icon: DollarSign,
    title: "FHA & Low Down Payment",
    description:
      "3–3.5% down payment options for buyers who haven't accumulated a large savings cushion. Down payment assistance programs available.",
    cta: { label: "Check Eligibility", href: "/apply" },
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "Phoenix, AZ",
    text: "My loan officer made the homebuying process so smooth. Everything was explained clearly and we closed in 28 days. Highly recommend!",
    stars: 5,
  },
  {
    name: "James & Linda T.",
    location: "Scottsdale, AZ",
    text: "We were first-time buyers and nervous about the whole process. Our LO held our hand through every step and got us a great rate.",
    stars: 5,
  },
  {
    name: "Mike R.",
    location: "Mesa, AZ",
    text: "Used them for my third DSCR loan. They know the investor side of the market better than anyone. Fast, professional, great pricing.",
    stars: 5,
  },
];

const whyChoose = [
  "Local market expertise with years of experience",
  "Investor-friendly: DSCR, LLC lending, portfolio strategies",
  "Direct access to your loan officer — not a call center",
  "Fast closings: 21–30 days for most purchases",
  "Competitive rates across 50+ loan programs",
  "Clear communication throughout the entire process",
];

export default async function HomePage() {
  const featuredPosts = getAllPosts().slice(0, 3);
  const profile = await getProfile();
  const telHref = `tel:${profile.phone.replace(/\D/g, "")}`;
  const applyHref = profile.applyUrl === "#" ? "/apply" : profile.applyUrl;
  const firstName = profile.name.split(" ")[0];
  const statesLabel =
    profile.states.length > 0
      ? profile.states.length === 1
        ? `Serving ${profile.states[0]}`
        : `Licensed in ${profile.states.slice(0, 3).join(", ")}${profile.states.length > 3 ? " & more" : ""}`
      : "Licensed Mortgage Professional";

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        }}
        className="relative overflow-hidden"
      >
        {/* Decorative gradient orb */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "rgba(14,165,233,0.15)",
                  border: "1px solid rgba(14,165,233,0.3)",
                  borderRadius: "999px",
                  padding: "0.35rem 0.9rem",
                  marginBottom: "1.25rem",
                }}
              >
                <span style={{ color: "#38bdf8", fontSize: "0.8rem", fontWeight: 600 }}>
                  📍 {statesLabel}
                </span>
              </div>

              <h1
                style={{ color: "white", fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 800, lineHeight: 1.15 }}
                className="mb-5"
              >
                Your Mortgage,{" "}
                <span style={{ color: "#0ea5e9" }}>Done Right.</span>
              </h1>

              <p
                style={{ color: "#94a3b8", fontSize: "1.1rem", lineHeight: 1.7 }}
                className="mb-8 max-w-xl"
              >
                {profile.bio
                  ? profile.bio.slice(0, 200) + (profile.bio.length > 200 ? "…" : "")
                  : `${profile.name} is a licensed mortgage loan officer. Whether you're buying your first home or growing a rental portfolio, we'll get you to the closing table with the best loan for your situation.`}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href={applyHref}
                  target={profile.applyUrl.startsWith("http") ? "_blank" : undefined}
                  rel={profile.applyUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{ backgroundColor: "#0ea5e9" }}
                  className="px-6 py-3 text-white font-bold rounded-xl text-base hover:opacity-90 transition-opacity"
                >
                  Get Pre-Approved →
                </a>
                {profile.phone && (
                  <a
                    href={telHref}
                    style={{
                      border: "2px solid rgba(14,165,233,0.5)",
                      color: "white",
                      borderRadius: "0.75rem",
                      padding: "0.75rem 1.5rem",
                      fontWeight: 600,
                      fontSize: "1rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                    className="hover:border-sky-400 transition-colors"
                  >
                    <Phone size={16} />
                    {profile.phone}
                  </a>
                )}
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-3">
                {["No Application Fees", "Fast 24hr Pre-Approval", "Dedicated Loan Officer"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle size={15} style={{ color: "#0ea5e9" }} />
                    <span style={{ color: "#cbd5e1", fontSize: "0.8rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Lead Form */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "1rem",
                padding: "1.75rem",
                boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
              }}
            >
              <LeadForm
                title="Get Your Free Quote"
                subtitle="Takes 2 minutes. No credit check until you're ready."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: "#0ea5e9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div style={{ color: "white", fontSize: "2.25rem", fontWeight: 800, lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ backgroundColor: "#f8fafc" }} className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 style={{ color: "#0f172a", fontSize: "1.875rem", fontWeight: 800 }} className="mb-3">
              Loan Programs for Every Situation
            </h2>
            <p style={{ color: "#64748b", maxWidth: "600px" }} className="mx-auto">
              From first-time buyers to experienced investors, {firstName} has the right loan program for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => (
              <div
                key={service.title}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.875rem",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                }}
                className="hover:shadow-lg transition-shadow"
              >
                <div
                  style={{
                    backgroundColor: "#e0f2fe",
                    borderRadius: "0.625rem",
                    padding: "0.75rem",
                    width: "fit-content",
                    marginBottom: "1rem",
                  }}
                >
                  <service.icon size={22} style={{ color: "#0ea5e9" }} />
                </div>
                <h3 style={{ color: "#0f172a", fontWeight: 700, marginBottom: "0.5rem" }}>
                  {service.title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.6, flex: 1 }}>
                  {service.description}
                </p>
                <Link
                  href={service.cta.href}
                  style={{ color: "#0ea5e9", fontSize: "0.875rem", fontWeight: 600, marginTop: "1rem" }}
                  className="hover:underline"
                >
                  {service.cta.label} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 style={{ color: "#0f172a", fontSize: "1.875rem", fontWeight: 800 }} className="mb-3">
                Why Work With {firstName}?
              </h2>
              <p style={{ color: "#64748b" }} className="mb-8">
                Here&#39;s why borrowers choose {profile.name} and keep coming back.
              </p>
              <ul className="space-y-3">
                {whyChoose.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} style={{ color: "#0ea5e9", flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ color: "#374151" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-4">
                <Link
                  href="/about"
                  style={{ backgroundColor: "#0f172a" }}
                  className="px-5 py-2.5 text-white font-semibold rounded-lg text-sm hover:opacity-80 transition-opacity"
                >
                  About {firstName}
                </Link>
                <Link
                  href="/contact"
                  style={{ border: "2px solid #0ea5e9", color: "#0ea5e9" }}
                  className="px-5 py-2.5 font-semibold rounded-lg text-sm hover:opacity-80 transition-opacity"
                >
                  Schedule a Call
                </Link>
              </div>
            </div>

            {/* Contact card */}
            <div
              style={{
                backgroundColor: "#0f172a",
                borderRadius: "1rem",
                padding: "2rem",
                color: "white",
              }}
            >
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Ready to get started?
              </h3>
              <p style={{ color: "#94a3b8", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                Reach out directly. {firstName} answers the phone and replies promptly.
              </p>
              <div className="space-y-4">
                {profile.phone && (
                  <a
                    href={telHref}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.875rem 1rem",
                      backgroundColor: "#0ea5e9",
                      borderRadius: "0.625rem",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                    className="hover:opacity-90 transition-opacity"
                  >
                    <Phone size={18} />
                    Call: {profile.phone}
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.875rem 1rem",
                      border: "1px solid #334155",
                      borderRadius: "0.625rem",
                      color: "#cbd5e1",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                    className="hover:border-sky-500 transition-colors"
                  >
                    <Mail size={16} />
                    {profile.email}
                  </a>
                )}
              </div>
              <p style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "1.25rem" }}>
                {profile.company || "Licensed Mortgage Professional"}
                {profile.nmls ? ` · NMLS# ${profile.nmls}` : ""}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ backgroundColor: "#f8fafc" }} className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 style={{ color: "#0f172a", fontSize: "1.875rem", fontWeight: 800 }} className="mb-3">
              What Clients Say
            </h2>
            <p style={{ color: "#64748b" }}>
              Families and investors have trusted {firstName} with their mortgage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.875rem",
                  padding: "1.5rem",
                }}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                  ))}
                </div>
                <p style={{ color: "#374151", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                  &quot;{t.text}&quot;
                </p>
                <div>
                  <div style={{ color: "#0f172a", fontWeight: 700, fontSize: "0.875rem" }}>{t.name}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Teasers */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 style={{ color: "#0f172a", fontSize: "1.875rem", fontWeight: 800 }} className="mb-2">
                Mortgage Tips &amp; Insights
              </h2>
              <p style={{ color: "#64748b" }}>Learn before you borrow.</p>
            </div>
            <Link
              href="/blog"
              style={{ color: "#0ea5e9", fontWeight: 600, fontSize: "0.875rem" }}
              className="hover:underline hidden sm:block"
            >
              All Articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/blog"
              style={{ color: "#0ea5e9", fontWeight: 600, fontSize: "0.875rem" }}
              className="hover:underline"
            >
              View All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Email Capture Banner */}
      <section style={{ backgroundColor: "#0f172a" }} className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: 700 }} className="mb-2">
            Get Weekly Mortgage Tips
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "1.25rem", fontSize: "0.9rem" }}>
            Rate updates, buying tips, and market insights — delivered free to your inbox.
          </p>
          <EmailCapture />
        </div>
      </section>

      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "FinancialService"],
            name: `${profile.name} — Mortgage Loan Officer`,
            description: `Licensed mortgage loan officer specializing in home purchase, refinance, and investment loans.`,
            telephone: profile.phone ? `+1${profile.phone.replace(/\D/g, "")}` : undefined,
            email: profile.email || undefined,
            employee: {
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.title || "Mortgage Loan Officer",
              telephone: profile.phone ? `+1${profile.phone.replace(/\D/g, "")}` : undefined,
              email: profile.email || undefined,
            },
          }),
        }}
      />
    </>
  );
}
