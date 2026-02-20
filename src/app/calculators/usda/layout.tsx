import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "USDA Loan Calculator — Rural Housing Payment Estimator",
  description:
    "Calculate your USDA Rural Development loan payment. No down payment required for eligible rural properties. Includes USDA guarantee fee calculation.",
  openGraph: {
    title: "USDA Loan Calculator",
    description: "Rural housing payment estimator — no down payment required",
    images: [
      {
        url: "/api/og?title=USDA+Calculator&subtitle=Estimate+your+monthly+payment&type=Calculator",
        width: 1200,
        height: 630,
        alt: "USDA Loan Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og?title=USDA+Calculator&subtitle=Estimate+your+monthly+payment&type=Calculator"],
  },
};

export default function USDACalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
