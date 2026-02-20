import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jumbo Loan Calculator — High Balance Mortgage Estimator",
  description:
    "Calculate payments for jumbo loans above conforming limits. See how high-balance mortgage pricing compares to conventional financing.",
  openGraph: {
    title: "Jumbo Loan Calculator",
    description: "High balance mortgage payment estimator",
    images: [
      {
        url: "/api/og?title=Jumbo+Loan+Calculator&subtitle=High+balance+mortgage+estimator&type=Calculator",
        width: 1200,
        height: 630,
        alt: "Jumbo Loan Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "/api/og?title=Jumbo+Loan+Calculator&subtitle=High+balance+mortgage+estimator&type=Calculator",
    ],
  },
};

export default function JumboCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
