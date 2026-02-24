import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conventional Loan Calculator — Estimate Your Monthly Payment",
  description:
    "Calculate your conventional loan payment with PMI, property taxes, and insurance. Compare scenarios based on down payment and credit score.",
  openGraph: {
    title: "Conventional Loan Calculator",
    description: "Estimate your monthly conventional loan payment",
    images: [
      {
        url: "/api/og?title=Conventional+Calculator&subtitle=Estimate+your+monthly+payment&type=Calculator",
        width: 1200,
        height: 630,
        alt: "Conventional Loan Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "/api/og?title=Conventional+Calculator&subtitle=Estimate+your+monthly+payment&type=Calculator",
    ],
  },
};

export default function ConventionalCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
