import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft, Phone } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { fetchCMSPostBySlug } from "@/lib/cmsFeed";
import LeadForm from "@/components/LeadForm";
import { getProfile } from "@/lib/profileContext";
import { getSlugFromRequest } from "@/lib/subdomain";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const profile = await getProfile();
  const title = post?.title ?? slug.replace(/-/g, " ");
  const description = post?.metaDescription ?? `Mortgage insights from ${profile.name}.`;

  const ogTitle = encodeURIComponent(title);
  const ogSubtitle = encodeURIComponent(`Mortgage Insights by ${profile.name}`);
  const ogType = encodeURIComponent("Blog");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post?.publishedDate,
      authors: post ? [post.author] : [profile.name],
      images: [
        {
          url: `/api/og?title=${ogTitle}&subtitle=${ogSubtitle}&type=${ogType}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [`/api/og?title=${ogTitle}&subtitle=${ogSubtitle}&type=${ogType}`],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const profile = await getProfile();
  const loSlug = getSlugFromRequest();
  const firstName = profile.name.split(" ")[0];
  const telHref = profile.phone ? `tel:${profile.phone.replace(/\D/g, "")}` : null;

  // Try static post first
  const staticPost = getPostBySlug(slug);

  // Try CMS post using the LO's slug
  const cmsPost = await fetchCMSPostBySlug(loSlug, slug);

  // Prefer CMS if available, otherwise use static
  if (!staticPost && !cmsPost) notFound();

  const allPosts = getAllPosts().filter((p) => p.slug !== slug).slice(0, 2);

  // CMS-based rendering path
  if (cmsPost && !staticPost) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <Link
          href="/blog"
          style={{ color: "#64748b", fontSize: "0.875rem" }}
          className="flex items-center gap-1.5 mb-8 hover:text-sky-600 transition-colors"
        >
          <ArrowLeft size={14} />
          All Articles
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            <h1
              style={{
                color: "#0f172a",
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                fontWeight: 800,
                lineHeight: 1.2,
              }}
              className="mb-4"
            >
              {cmsPost.title}
            </h1>
            <div style={{ color: "#94a3b8", fontSize: "0.75rem" }} className="mb-6 flex items-center gap-2">
              <Calendar size={12} />
              {new Date(cmsPost.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div
              style={{ color: "#374151", lineHeight: 1.8, fontSize: "0.95rem" }}
              className="space-y-4"
            >
              {cmsPost.content.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="lg:col-span-1 space-y-6">
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
                title={`Talk to ${firstName}`}
                subtitle={`Questions about this? ${firstName} can help.`}
                compact
              />
            </div>
          </aside>
        </div>
      </div>
    );
  }

  const post = staticPost!;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Back */}
      <Link
        href="/blog"
        style={{ color: "#64748b", fontSize: "0.875rem" }}
        className="flex items-center gap-1.5 mb-8 hover:text-sky-600 transition-colors"
      >
        <ArrowLeft size={14} />
        All Articles
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <article className="lg:col-span-2">
          {/* Meta */}
          <div className="mb-3 flex items-center gap-4 flex-wrap">
            <span
              style={{
                backgroundColor: "#e0f2fe",
                color: "#0369a1",
                padding: "0.2rem 0.75rem",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {post.category}
            </span>
            <span
              style={{ color: "#94a3b8", fontSize: "0.75rem" }}
              className="flex items-center gap-1.5"
            >
              <Calendar size={12} />
              {new Date(post.publishedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span
              style={{ color: "#94a3b8", fontSize: "0.75rem" }}
              className="flex items-center gap-1.5"
            >
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          <h1
            style={{
              color: "#0f172a",
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              fontWeight: 800,
              lineHeight: 1.2,
            }}
            className="mb-4"
          >
            {post.title}
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
            {post.excerpt}
          </p>

          {/* Author */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "2rem",
              padding: "0.75rem 1rem",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "0.625rem",
            }}
          >
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                backgroundColor: "#0ea5e9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "0.875rem",
                flexShrink: 0,
              }}
            >
              NT
            </div>
            <div>
              <div style={{ color: "#0f172a", fontWeight: 600, fontSize: "0.875rem" }}>
                {post.author}
              </div>
              <div style={{ color: "#64748b", fontSize: "0.75rem" }}>
                Mortgage Loan Officer · Revolve Mortgage · Phoenix, AZ
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {post.sections.map((section, i) => (
              <section key={i}>
                <h2
                  style={{
                    color: "#0f172a",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "2px solid #f1f5f9",
                  }}
                >
                  {section.heading}
                </h2>
                <div
                  style={{ color: "#374151", lineHeight: 1.8, fontSize: "0.95rem" }}
                  className="space-y-3"
                >
                  {section.body.split("\n\n").map((paragraph, j) => (
                    <p key={j}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6" style={{ borderTop: "1px solid #e2e8f0" }}>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
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

          {/* Related posts */}
          {allPosts.length > 0 && (
            <div className="mt-10">
              <h3 style={{ color: "#0f172a", fontWeight: 700, marginBottom: "1rem" }}>
                More Articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    style={{ border: "1px solid #e2e8f0", borderRadius: "0.625rem", padding: "1rem" }}
                    className="hover:border-sky-300 transition-colors block"
                  >
                    <div
                      style={{
                        color: "#0f172a",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {related.title}
                    </div>
                    <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{related.readTime}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Lead Form */}
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
              title={`Talk to ${firstName}`}
              subtitle={`Questions about this? ${firstName} can help you apply it to your situation.`}
              compact
            />
          </div>

          {/* Phone CTA */}
          <div
            style={{
              backgroundColor: "#0f172a",
              borderRadius: "0.875rem",
              padding: "1.25rem",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#94a3b8", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
              {`Prefer to talk? Call ${firstName} directly.`}
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
