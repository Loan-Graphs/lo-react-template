import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ type: string }>;
}

const CALCULATOR_META: Record<string, { title: string; subtitle: string; desc: string; href: string }> = {
  fha: {
    title: "FHA Calculator",
    subtitle: "Estimate your monthly FHA loan payment",
    desc: "Calculate FHA loan payments including MIP.",
    href: "/calculators/fha",
  },
  conventional: {
    title: "Conventional Calculator",
    subtitle: "Estimate your monthly conventional payment",
    desc: "Calculate conventional loan payments with PMI.",
    href: "/calculators/conventional",
  },
  va: {
    title: "VA Loan Calculator",
    subtitle: "Estimate your monthly VA loan payment",
    desc: "Calculate VA loan payments with no PMI.",
    href: "/calculators/va",
  },
  usda: {
    title: "USDA Calculator",
    subtitle: "Estimate your monthly USDA payment",
    desc: "Calculate USDA rural housing loan payments.",
    href: "/calculators/usda",
  },
  refinance: {
    title: "Refinance Calculator",
    subtitle: "Calculate your refinance break-even",
    desc: "Determine if refinancing makes sense.",
    href: "/calculators/refinance",
  },
  jumbo: {
    title: "Jumbo Loan Calculator",
    subtitle: "High balance mortgage payment estimator",
    desc: "Calculate jumbo loan payments.",
    href: "/calculators/jumbo",
  },
};

export async function generateStaticParams() {
  return Object.keys(CALCULATOR_META).map((type) => ({ type }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const meta = CALCULATOR_META[type];
  const title = meta?.title ?? `${type.charAt(0).toUpperCase() + type.slice(1)} Calculator`;
  const subtitle = meta?.subtitle ?? "Estimate your monthly mortgage payment";

  const ogTitle = encodeURIComponent(title);
  const ogSubtitle = encodeURIComponent(subtitle);

  return {
    title: `${title} | Nathan Tschappler Mortgage`,
    description: meta?.desc ?? "Mortgage calculator by Nathan Tschappler.",
    openGraph: {
      title,
      description: subtitle,
      images: [
        {
          url: `/api/og?title=${ogTitle}&subtitle=${ogSubtitle}&type=Calculator`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [`/api/og?title=${ogTitle}&subtitle=${ogSubtitle}&type=Calculator`],
    },
  };
}

export default async function CalculatorTypePage({ params }: PageProps) {
  const { type } = await params;
  const meta = CALCULATOR_META[type];
  if (!meta) notFound();

  // These routes exist as specific pages — redirect via meta refresh for crawlers
  // (In production, this page won't be reached because specific routes take priority)
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <div
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}
        className="py-16"
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 style={{ color: "#fff", fontWeight: 800, fontSize: "2rem" }} className="mb-3">
            {meta.title}
          </h1>
          <p style={{ color: "#94a3b8" }} className="mb-8">
            {meta.subtitle}
          </p>
          <Link
            href={meta.href}
            style={{
              backgroundColor: "#0ea5e9",
              color: "#fff",
              padding: "0.875rem 2rem",
              borderRadius: "0.5rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
            className="hover:opacity-90 transition-opacity"
          >
            Open Calculator →
          </Link>
        </div>
      </div>
    </div>
  );
}
