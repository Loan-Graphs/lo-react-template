import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FHA Loan Calculator — Estimate Your Monthly Payment",
  description:
    "Calculate your FHA loan payment including MIP, property taxes, and insurance. See how much house you can afford with FHA financing.",
  openGraph: {
    title: "FHA Calculator",
    description: "Estimate your monthly FHA loan payment",
    images: [
      {
        url: "/api/og?title=FHA+Calculator&subtitle=Estimate+your+monthly+payment&type=Calculator",
        width: 1200,
        height: 630,
        alt: "FHA Loan Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og?title=FHA+Calculator&subtitle=Estimate+your+monthly+payment&type=Calculator"],
  },
};

export default function FHACalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
