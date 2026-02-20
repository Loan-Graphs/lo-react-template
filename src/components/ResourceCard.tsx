import Link from "next/link";
import { Clock, FileText, ArrowRight } from "lucide-react";
import type { Resource } from "@/lib/resources";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Link href={`/resources/${resource.slug}`} className="group block">
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
        <div style={{ backgroundColor: "#0ea5e9", height: "4px" }} />

        <div className="p-5">
          <div className="flex items-start gap-3">
            <div
              style={{ backgroundColor: "#e0f2fe", borderRadius: "0.5rem", padding: "0.5rem", flexShrink: 0 }}
            >
              <FileText size={20} style={{ color: "#0ea5e9" }} />
            </div>
            <div className="flex-1 min-w-0">
              <span
                style={{
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "999px",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {resource.category}
              </span>
              <h2
                style={{
                  color: "#0f172a",
                  fontSize: "1rem",
                  fontWeight: 700,
                  lineHeight: 1.4,
                  marginTop: "0.4rem",
                  marginBottom: "0.4rem",
                }}
                className="group-hover:text-sky-600 transition-colors"
              >
                {resource.title}
              </h2>
              <p
                style={{ color: "#64748b", fontSize: "0.8rem", lineHeight: 1.5 }}
                className="line-clamp-2 mb-3"
              >
                {resource.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5" style={{ color: "#94a3b8", fontSize: "0.75rem" }}>
                  <Clock size={12} />
                  {resource.readTime}
                </div>
                <span
                  style={{ color: "#0ea5e9", fontSize: "0.8rem", fontWeight: 600 }}
                  className="flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Read Guide <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
