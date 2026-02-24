import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { getProfile } from "@/lib/profileContext";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const loName = profile.name || "Loan Officer";
  const nmls = profile.nmls ? ` NMLS #${profile.nmls}` : "";
  const phone = profile.phone || "";

  return {
    title: {
      default: `${loName} | Licensed Mortgage Professional`,
      template: `%s | ${loName} Mortgage`,
    },
    description: `Get pre-qualified with ${loName}${nmls}. Competitive rates, fast approvals.${phone ? ` Call ${phone}.` : ""}`,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: `${loName} — Mortgage Loan Officer`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(loName)}&subtitle=Licensed+Mortgage+Professional`,
          width: 1200,
          height: 630,
          alt: `${loName} — Licensed Mortgage Professional`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [
        `/api/og?title=${encodeURIComponent(loName)}&subtitle=Licensed+Mortgage+Professional`,
      ],
    },
  };
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
