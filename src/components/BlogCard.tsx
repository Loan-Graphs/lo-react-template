import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

const categoryColors: Record<BlogPost["category"], { bg: string; text: string }> = {
  rates: { bg: "#e0f2fe", text: "#0369a1" },
  homebuying: { bg: "#f0fdf4", text: "#15803d" },
  refinance: { bg: "#fef3c7", text: "#b45309" },
  investment: { bg: "#f3e8ff", text: "#7e22ce" },
  "fha-va": { bg: "#fce7f3", text: "#9d174d" },
  tips: { bg: "#f1f5f9", text: "#475569" },
};

const categoryLabels: Record<BlogPost["category"], string> = {
  rates: "Rates",
  homebuying: "Homebuying",
  refinance: "Refinance",
  investment: "Investment",
  "fha-va": "FHA & VA",
  tips: "Tips",
};

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const colors = categoryColors[post.category];

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "0.75rem",
          overflow: "hidden",
          backgroundColor: "white",
          transition: "box-shadow 0.2s, transform 0.2s",
        }}
        className="hover:shadow-lg hover:-translate-y-1"
      >
        {/* Header bar */}
        <div style={{ backgroundColor: "#0f172a", height: "4px" }} />

        <div className="p-5">
          {/* Category tag */}
          <div className="flex items-center justify-between mb-3">
            <span
              style={{
                backgroundColor: colors.bg,
                color: colors.text,
                padding: "0.2rem 0.6rem",
                borderRadius: "999px",
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {categoryLabels[post.category]}
            </span>
            <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>
              {new Date(post.publishedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h2
            style={{ color: "#0f172a", fontSize: "1rem", fontWeight: 700, lineHeight: 1.4 }}
            className="mb-2 group-hover:text-sky-600 transition-colors"
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.6 }} className="mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5" style={{ color: "#94a3b8", fontSize: "0.75rem" }}>
              <Clock size={12} />
              {post.readTime}
            </div>
            <span
              style={{ color: "#0ea5e9", fontSize: "0.8rem", fontWeight: 600 }}
              className="flex items-center gap-1 group-hover:gap-2 transition-all"
            >
              Read More <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
