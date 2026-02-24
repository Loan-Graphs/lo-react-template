import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft, CheckCircle, Phone } from "lucide-react";
import { getAllResources, getResourceBySlug } from "@/lib/resources";
import LeadForm from "@/components/LeadForm";
import { getProfile } from "@/lib/profileContext";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllResources().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return { title: "Resource Not Found" };
  return {
    title: resource.title,
    description: resource.metaDescription,
  };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();
  const profile = await getProfile();
  const firstName = profile.name.split(" ")[0];
  const telHref = profile.phone ? `tel:${profile.phone.replace(/\D/g, "")}` : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Back */}
      <Link
        href="/resources"
        style={{ color: "#64748b", fontSize: "0.875rem" }}
        className="flex items-center gap-1.5 mb-8 hover:text-sky-600 transition-colors"
      >
        <ArrowLeft size={14} />
        All Resources
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <article className="lg:col-span-2">
          <div className="mb-3 flex items-center gap-4">
            <span
              style={{
                backgroundColor: "#f1f5f9",
                color: "#475569",
                padding: "0.2rem 0.75rem",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {resource.category}
            </span>
            <span
              style={{ color: "#94a3b8", fontSize: "0.75rem" }}
              className="flex items-center gap-1.5"
            >
              <Clock size={12} />
              {resource.readTime}
            </span>
          </div>

          <h1
            style={{
              color: "#0f172a",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 800,
              lineHeight: 1.2,
            }}
            className="mb-4"
          >
            {resource.title}
          </h1>

          <p
            style={{
              color: "#475569",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              borderLeft: "3px solid #0ea5e9",
              paddingLeft: "1rem",
            }}
            className="mb-8"
          >
            {resource.excerpt}
          </p>

          {/* Sections */}
          <div className="space-y-8">
            {resource.sections.map((section, i) => (
              <section key={i}>
                <h2
                  style={{
                    color: "#0f172a",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "2px solid #f1f5f9",
                  }}
                >
                  {section.heading}
                </h2>
                {section.body && (
                  <div className="space-y-3 mb-4">
                    {section.body.split("\n\n").map((para, j) => (
                      <p key={j} style={{ color: "#374151", lineHeight: 1.8, fontSize: "0.95rem" }}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}
                {section.items && (
                  <ul className="space-y-2.5">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <CheckCircle
                          size={15}
                          style={{ color: "#0ea5e9", flexShrink: 0, marginTop: "3px" }}
                        />
                        <span style={{ color: "#374151", fontSize: "0.9rem", lineHeight: 1.6 }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6" style={{ borderTop: "1px solid #e2e8f0" }}>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: "#f1f5f9",
                    color: "#475569",
                    padding: "0.25rem 0.625rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "0.875rem",
              padding: "1.5rem",
              position: "sticky",
              top: "5rem",
            }}
          >
            <LeadForm
              title="Ready to Get Started?"
              subtitle={`Questions about what you read? ${firstName} can walk you through next steps.`}
              compact
            />
          </div>

          <div
            style={{
              backgroundColor: "#0f172a",
              borderRadius: "0.875rem",
              padding: "1.25rem",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#94a3b8", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
              {`Call ${firstName} directly`}
            </p>
            <a
              href={telHref ?? "#"}
              style={{ backgroundColor: "#0ea5e9" }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-white font-bold rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              <Phone size={14} />
              {profile.phone || "Call Now"}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
