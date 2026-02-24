import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VA Loan Calculator — $0 Down Payment Estimate",
  description:
    "Calculate your VA loan payment with the VA funding fee included. No PMI, no down payment required for eligible veterans and active duty military.",
  openGraph: {
    title: "VA Loan Calculator",
    description: "$0 down mortgage payment estimator for veterans",
    images: [
      {
        url: "/api/og?title=VA+Loan+Calculator&subtitle=Estimate+your+monthly+payment&type=Calculator",
        width: 1200,
        height: 630,
        alt: "VA Loan Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og?title=VA+Loan+Calculator&subtitle=Estimate+your+monthly+payment&type=Calculator"],
  },
};

export default function VACalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
