import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { fetchCMSPosts, CMSPost } from "@/lib/cmsFeed";
import BlogCard from "@/components/BlogCard";
import EmailCapture from "@/components/EmailCapture";
import { Calendar } from "lucide-react";
import { getProfile } from "@/lib/profileContext";
import { getSlugFromRequest } from "@/lib/subdomain";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: `Mortgage Blog — Rates, Homebuying Tips & Investment Strategies | ${profile.name}`,
    description: `Expert mortgage articles by ${profile.name}. Learn about home loans, refinancing, investment strategies, and more.`,
  };
}

export default async function BlogPage() {
  const staticPosts = getAllPosts();
  const profile = await getProfile();
  const loSlug = await getSlugFromRequest();

  // Fetch from Mission Control CMS using the LO's slug
  const cmsPosts: CMSPost[] = await fetchCMSPosts(loSlug, "blog", 10);

  // CMS posts that don't clash with static slugs
  const staticSlugs = new Set(staticPosts.map((p) => p.slug));
  const newCmsPosts = cmsPosts.filter((p) => !staticSlugs.has(p.slug));

  return (
    <>
      {/* Header */}
      <section style={{ backgroundColor: "#0f172a" }} className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800 }}
            className="mb-3"
          >
            Mortgage Tips &amp; Insights
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "600px" }} className="mx-auto text-base">
            Expert articles on home loans, investment strategies, rates, and more. Written by{" "}
            {profile.name} — a loan officer who knows the market.
          </p>
        </div>
      </section>

      {/* CMS posts from Mission Control */}
      {newCmsPosts.length > 0 && (
        <section className="pt-12 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <span
                style={{
                  backgroundColor: "#22c55e",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
              <h2 style={{ color: "#374151", fontSize: "0.875rem", fontWeight: 600 }}>
                Latest from Mission Control
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newCmsPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{
                    display: "block",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    textDecoration: "none",
                  }}
                  className="hover:border-sky-300 hover:shadow-md transition-all"
                >
                  <span
                    style={{
                      backgroundColor: "#dcfce7",
                      color: "#15803d",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    New
                  </span>
                  <h3
                    style={{ color: "#0f172a", fontWeight: 700, fontSize: "1rem", marginTop: "0.75rem", lineHeight: 1.3 }}
                    className="mb-2"
                  >
                    {post.title}
                  </h3>
                  <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.6 }} className="mb-3 line-clamp-2">
                    {post.content?.slice(0, 120)}...
                  </p>
                  <div style={{ color: "#94a3b8", fontSize: "0.75rem" }} className="flex items-center gap-1.5">
                    <Calendar size={11} />
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fallback: show message when CMS is empty */}
      {cmsPosts.length === 0 && (
        <div style={{ backgroundColor: "#f0fdf4", borderTop: "1px solid #bbf7d0" }} className="py-3">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <span style={{ color: "#15803d", fontSize: "0.8rem" }}>
              📡 Loading from Mission Control...
            </span>
          </div>
        </div>
      )}

      {/* Static Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {newCmsPosts.length > 0 && (
            <h2 style={{ color: "#374151", fontWeight: 700, fontSize: "1.125rem" }} className="mb-6">
              All Articles
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staticPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ backgroundColor: "#f8fafc" }} className="py-12">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 style={{ color: "#0f172a", fontWeight: 700, fontSize: "1.25rem" }} className="mb-2">
            Get New Articles in Your Inbox
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }} className="mb-5">
            Rate alerts, buying tips, and market updates. No spam.
          </p>
          <EmailCapture />
        </div>
      </section>
    </>
  );
}
