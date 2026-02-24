import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getProfile } from "@/lib/profileContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
