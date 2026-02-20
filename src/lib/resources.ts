export interface Resource {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  sections: { heading: string; body: string; items?: string[] }[];
  readTime: string;
  tags: string[];
  category: "guides" | "calculators" | "checklists" | "glossary";
}

export const RESOURCES: Resource[] = [
  {
    slug: "mortgage-pre-approval-checklist",
    title: "Mortgage Pre-Approval Checklist",
    metaDescription:
      "Complete mortgage pre-approval checklist for 2026. Every document you need to get pre-approved fast and make a strong offer on your next home.",
    excerpt:
      "Being fully prepared for pre-approval gives you a competitive edge in any market. Here's everything you need to gather before you apply.",
    readTime: "6 min read",
    tags: ["pre-approval", "mortgage documents", "first-time buyer", "checklist"],
    category: "checklists",
    sections: [
      {
        heading: "Why Getting Pre-Approved Is Step One",
        body: `In today's competitive housing market, a pre-approval letter is table stakes. Sellers and their agents won't take your offer seriously without one. More importantly, getting pre-approved before you shop tells you exactly how much home you can afford — so you don't fall in love with a home that's out of reach.

A pre-approval is more than a pre-qualification. Pre-qual is a quick estimate based on self-reported info. Pre-approval involves submitting actual documentation, having your credit pulled, and going through initial underwriting. A strong pre-approval letter signals to sellers that you're a serious, financeable buyer.

Most pre-approvals take 24–48 hours once you submit complete documentation. The key is having everything ready to go from the start. Missing documents are the number one cause of delays.`,
      },
      {
        heading: "Income & Employment Documents",
        body: `These documents verify your income and employment history. Lenders want to see stability and continuity.`,
        items: [
          "W2s — last 2 years (all employers)",
          "Recent pay stubs — most recent 30 days (2 pay stubs if paid bi-weekly)",
          "Federal tax returns — last 2 years, all pages, all schedules (if self-employed or have rental income)",
          "Self-employed: business tax returns (1120S, 1065, or Schedule C) — last 2 years",
          "Self-employed: year-to-date profit & loss statement (CPA-prepared preferred)",
          "Social Security award letter (if SS income is used for qualification)",
          "Pension/retirement income: award letter or 1099R",
          "Rental income: lease agreements + Schedule E from tax returns",
          "Child support/alimony: court order + 12 months of deposit statements showing receipt",
        ],
      },
      {
        heading: "Asset & Bank Account Documents",
        body: `Lenders verify you have enough cash for the down payment, closing costs, and reserves (typically 2–6 months of housing payments in the bank after closing).`,
        items: [
          "Bank statements — last 2 months, ALL pages (checking and savings)",
          "Investment/brokerage statements — last 2 months, all pages",
          "401k / IRA / retirement statements — most recent statement",
          "Gift letter (if receiving down payment gift from family) — standard form provided by lender",
          "Gift funds: 2-month bank statement from donor showing the funds",
          "Sale of current home: listing agreement or HUD-1 settlement statement",
          "Liquidated assets: documentation of source (sale of vehicle, etc.)",
        ],
      },
      {
        heading: "Identity & Credit Documents",
        body: `Standard identity verification and information needed for the credit pull and loan application.`,
        items: [
          "Government-issued photo ID (driver's license or passport)",
          "Social Security number (for credit pull — not submitted in writing, entered securely)",
          "Green card or visa documentation (non-US citizens)",
          "Divorce decree (if applicable — affects income, debt, and property ownership)",
          "Bankruptcy discharge papers — if bankruptcy within last 7 years",
          "Explanation letters for any derogatory credit items",
          "Any judgments, liens, or collection accounts: be prepared to explain or pay off",
        ],
      },
      {
        heading: "Property-Related Documents (Once You Have a Contract)",
        body: `These documents are needed after you've made an offer, but gather what you can in advance.`,
        items: [
          "Fully executed purchase contract",
          "MLS listing or property details",
          "HOA contact information and phone number (for HOA cert/questionnaire)",
          "Most recent property tax statements (for refinance or if you own other properties)",
          "Current mortgage statements (for all properties you own)",
          "Homeowners insurance contact information",
          "Landlord contact info if renting (for verification of rent history)",
        ],
      },
    ],
  },
  {
    slug: "understanding-your-loan-estimate",
    title: "Understanding Your Loan Estimate",
    metaDescription:
      "A plain-English guide to reading your Loan Estimate. Know exactly what you're being charged and how to compare offers from multiple lenders.",
    excerpt:
      "Your Loan Estimate is the most important document in your mortgage process. Here's how to read it line by line and avoid being overcharged.",
    readTime: "8 min read",
    tags: ["Loan Estimate", "closing costs", "mortgage fees", "lender comparison", "transparency"],
    category: "guides",
    sections: [
      {
        heading: "What Is a Loan Estimate and Why Does It Matter?",
        body: `The Loan Estimate (LE) is a standardized 3-page document that lenders are legally required to provide within 3 business days of receiving your mortgage application. It replaced the older Good Faith Estimate (GFE) in 2015 and is your primary tool for comparing mortgage offers from different lenders.

Every lender uses the exact same format — that's the point. When you get LEs from three different lenders for the same loan, you can compare them side by side and see exactly where the differences are.

The LE is not a commitment to lend. It's an estimate. But closing costs cannot increase by more than 10% (for most fees) and the interest rate cannot change (if you've locked it) between the LE and the final Closing Disclosure. Understanding what's on the LE helps you spot overcharges, ask the right questions, and make an informed decision.`,
      },
      {
        heading: "Page 1: Loan Terms and Projected Payments",
        body: `The first page of the LE has the key loan parameters. Here's what each section tells you.

Loan Terms Box (top right): This summarizes the core loan details — loan amount, interest rate, monthly principal & interest payment, whether the rate or payment can increase (it should say "NO" for fixed-rate loans), and whether there's a prepayment penalty or balloon payment. Read this carefully. Any "YES" boxes need a full explanation.

Projected Payments: This breaks down what your total monthly payment will be, including principal & interest, mortgage insurance (PMI or MIP), and estimated escrow (taxes + insurance). The "Year 1" column shows your first year payment. For loans with MIP that falls off, it may show a different payment in later years.

Costs at Closing: A summary box showing estimated closing costs and estimated cash to close. This is the headline number most borrowers focus on — but always dig into the details on page 2 to understand what's driving it.`,
      },
      {
        heading: "Page 2: Closing Cost Details — Where to Find Overcharges",
        body: `Page 2 is where the money details live. It's divided into sections A through H.

Section A — Origination Charges: This is what the lender charges you directly. It includes origination fees, underwriting fees, discount points (if any), and processing fees. There is no standard — lenders charge what they want here. Compare Section A across lenders to see who's charging more for the loan itself.

Section B — Services You Cannot Shop For: These are third-party services the lender selects — appraisal, credit report, flood determination, tax monitoring. You can't shop these, but you can compare them across lenders' LEs to spot outliers.

Section C — Services You Can Shop For: Title insurance, settlement/closing agent, title search, survey. You CAN shop these. A good title company or closing attorney can save you $300–$800 vs the lender's default pick. Ask your real estate agent for referrals.

Section E — Taxes and Other Government Fees: Recording fees and transfer taxes. These are largely fixed by the county/state.

Section F — Prepaids: These are not fees — they're prepaid expenses you'd owe regardless of who your lender is. Includes prepaid interest (from closing date to end of month), homeowners insurance premium (first year), and mortgage insurance premium if applicable.

Section G — Initial Escrow Payment at Closing: The upfront funding of your escrow account for future tax and insurance payments. Typically 2–3 months of taxes and insurance. Again, not a lender fee.

Section H — Other: Anything else, including HOA transfer fees or home warranty. These vary by transaction.`,
      },
      {
        heading: "Comparing LEs: A Step-by-Step Process",
        body: `To compare two LEs properly, follow this process.

Step 1: Confirm the loan details match. Same loan amount, same loan type (30yr fixed, etc.), same lock period. If they're not identical, the comparison isn't apples-to-apples.

Step 2: Compare Section A (Origination Charges). This is the pure lender markup. If Lender A charges $2,500 in Section A and Lender B charges $800, Lender B is cheaper — assuming the rates are the same. If Lender A has a lower rate, check if discount points in Section A explain it (points buy the rate down).

Step 3: Compare the interest rate. Lower is better, but see Step 2 — a lower rate might come with higher points.

Step 4: Look at the APR. The Annual Percentage Rate factors in certain fees and gives a more complete cost picture. Compare APRs as a sanity check on which loan is truly cheaper.

Step 5: Total the "Origination Charges" (Section A) + the interest rate impact over your expected hold period to find the true cost difference.

Step 6: Shop Section C services. Title insurance and settlement fees can vary. You don't have to use the lender's recommended providers for these.

Pro tip: When you get a Loan Estimate from a lender, you can take it to a competing lender and say "can you beat this?" The transparency of the standardized form makes comparison shopping more effective than ever. Contact your loan officer — we'll review any LE you've received and make sure you're getting a competitive deal.`,
      },
    ],
  },
];

export function getAllResources(): Resource[] {
  return RESOURCES;
}

export function getResourceBySlug(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}
