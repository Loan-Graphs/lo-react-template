import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refinance Calculator — Should You Refinance?",
  description:
    "Calculate if refinancing makes sense for your situation. Compare your current rate vs new rate, break-even period, and total savings over time.",
  openGraph: {
    title: "Refinance Calculator",
    description: "Calculate your refinance break-even and total savings",
    images: [
      {
        url: "/api/og?title=Refinance+Calculator&subtitle=Is+refinancing+right+for+you%3F&type=Calculator",
        width: 1200,
        height: 630,
        alt: "Refinance Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "/api/og?title=Refinance+Calculator&subtitle=Is+refinancing+right+for+you%3F&type=Calculator",
    ],
  },
};

export default function RefinanceCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
