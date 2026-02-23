import type { Metadata } from "next";
import { getAllResources } from "@/lib/resources";
import ResourceCard from "@/components/ResourceCard";
import Link from "next/link";
import { getProfile } from "@/lib/profileContext";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: `Mortgage Resources & Guides — Checklists, Tips, and Tools | ${profile.name}`,
    description: `Free mortgage resources by ${profile.name}. Download checklists, read guides on Loan Estimates, pre-approval, and more.`,
  };
}

export default async function ResourcesPage() {
  const resources = getAllResources();
  const profile = await getProfile();
  const firstName = profile.name.split(" ")[0];
  const telHref = profile.phone ? `tel:${profile.phone.replace(/\D/g, "")}` : null;

  return (
    <>
      {/* Header */}
      <section style={{ backgroundColor: "#0f172a" }} className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800 }}
            className="mb-3"
          >
            Mortgage Resources &amp; Guides
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "550px" }} className="mx-auto text-base">
            Free checklists, guides, and explainers to help you navigate the mortgage process with confidence.
          </p>
        </div>
      </section>

      {/* Resources */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#f8fafc" }} className="py-12">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 style={{ color: "#0f172a", fontWeight: 700, fontSize: "1.25rem" }} className="mb-2">
            Have Questions? Ask {firstName}.
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }} className="mb-5">
            Reading the guides is great. Talking to an expert is even better.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/contact"
              style={{ backgroundColor: "#0ea5e9" }}
              className="px-5 py-2.5 text-white font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Schedule a Call
            </Link>
            {telHref && (
              <a
                href={telHref}
                style={{ border: "1px solid #e2e8f0" }}
                className="px-5 py-2.5 font-semibold rounded-lg text-sm text-gray-700 hover:border-sky-400 transition-colors"
              >
                Call {profile.phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
