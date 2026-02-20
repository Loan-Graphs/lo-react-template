import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PurchaseFunnel from "@/components/funnels/PurchaseFunnel";
import RefiFunnel from "@/components/funnels/RefiFunnel";

const VALID_TYPES = ["purchase", "refinance"] as const;
type FunnelType = (typeof VALID_TYPES)[number];

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return VALID_TYPES.map((type) => ({ type }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;

  if (type === "purchase") {
    return {
      title: "Get Pre-Approved for a Home Purchase | Nathan Loan Team",
      description:
        "Start your home purchase pre-approval in minutes. Answer a few questions about your situation and Nathan Tschappler will connect with you fast. Free, no obligation.",
      alternates: { canonical: "https://nathanloanteam.com/get-started/purchase" },
    };
  }

  if (type === "refinance") {
    return {
      title: "Refinance Your Mortgage — See Your Savings | Nathan Loan Team",
      description:
        "Find out how much you could save by refinancing your mortgage. Get a personalized refi analysis from Nathan Tschappler in minutes. Free consultation.",
      alternates: { canonical: "https://nathanloanteam.com/get-started/refinance" },
    };
  }

  return { title: "Get Started | Nathan Loan Team" };
}

export default async function GetStartedPage({ params }: PageProps) {
  const { type } = await params;

  if (!VALID_TYPES.includes(type as FunnelType)) {
    notFound();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
      }}
    >
      {type === "purchase" ? <PurchaseFunnel /> : <RefiFunnel />}
    </div>
  );
}
