export interface LoanProgram {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  headline: (state: string) => string;
  metaTitle: (state: string) => string;
  metaDesc: (state: string) => string;
  intro: (state: string) => string;
  benefits: string[];
  requirements: string[];
  ctaText: string;
  faqs: (state: string) => { q: string; a: string }[];
}

export const LOAN_PROGRAMS: LoanProgram[] = [
  {
    slug: "fha",
    name: "FHA Loans",
    icon: "🏠",
    tagline: "Low down payment for first-time buyers",
    headline: (state: string) => `FHA Loans in ${state}`,
    metaTitle: (state: string) =>
      `FHA Loans in ${state} — Low Down Payment Home Loans | LoanGraphs`,
    metaDesc: (state: string) =>
      `Get an FHA loan in ${state} with as little as 3.5% down. a licensed mortgage loan officer, helps ${state} buyers qualify for FHA financing. Free pre-approval.`,
    intro: (state: string) =>
      `FHA loans are one of the most popular mortgage programs in ${state} for first-time homebuyers and those with less-than-perfect credit. With a minimum 3.5% down payment and flexible qualifying criteria, FHA loans open the door to homeownership for thousands of ${state} families every year.`,
    benefits: [
      "3.5% minimum down payment (with 580+ credit score)",
      "Credit scores as low as 500 accepted (10% down required)",
      "Competitive interest rates",
      "Seller concessions up to 6%",
      "Gift funds allowed for down payment",
    ],
    requirements: [
      "Minimum 580 credit score for 3.5% down",
      "Debt-to-income ratio typically under 57%",
      "Property must be primary residence",
      "FHA-approved lender required",
      "Mortgage insurance premium (MIP) required",
    ],
    ctaText: "Get FHA Pre-Approval",
    faqs: (state: string) => [
      {
        q: `What is the minimum credit score for an FHA loan in ${state}?`,
        a: `The FHA requires a minimum 580 credit score for the 3.5% down payment option. Borrowers with scores between 500–579 can still qualify with a 10% down payment. Lenders in ${state} may have their own overlay requirements.`,
      },
      {
        q: `How much is the FHA mortgage insurance in ${state}?`,
        a: `FHA loans require an upfront MIP of 1.75% of the loan amount, plus an annual MIP that ranges from 0.15% to 0.75% depending on your loan amount and term. For most ${state} buyers with a 30-year loan, the annual MIP is 0.55%.`,
      },
      {
        q: `Can I use gift funds for my FHA down payment in ${state}?`,
        a: `Yes! FHA loans allow 100% of the down payment to come from gift funds from an acceptable donor such as a family member. This makes FHA loans especially attractive for ${state} first-time homebuyers.`,
      },
      {
        q: `What are the FHA loan limits in ${state}?`,
        a: `FHA loan limits vary by county in ${state}. For most ${state} counties, the 2024 FHA loan limit for a single-family home is $498,257 (the national baseline), though high-cost areas can go significantly higher. Contact your loan officer for the exact limit in your ${state} county.`,
      },
    ],
  },
  {
    slug: "va",
    name: "VA Loans",
    icon: "🎖️",
    tagline: "$0 down for veterans and active duty",
    headline: (state: string) => `VA Loans in ${state}`,
    metaTitle: (state: string) =>
      `VA Loans in ${state} — $0 Down for Veterans | LoanGraphs`,
    metaDesc: (state: string) =>
      `VA loans in ${state} for eligible veterans, active-duty service members, and surviving spouses. $0 down payment, no PMI, competitive rates. Your Loan Officer, VA-approved lender.`,
    intro: (state: string) =>
      `VA loans are the #1 benefit available to ${state} veterans and active-duty service members. With $0 down payment required, no private mortgage insurance, and competitive rates, the VA loan program is unmatched for eligible borrowers in ${state}.`,
    benefits: [
      "$0 down payment required",
      "No private mortgage insurance (PMI)",
      "Competitive interest rates",
      "Flexible credit requirements",
      "No prepayment penalty",
    ],
    requirements: [
      "Valid Certificate of Eligibility (COE)",
      "Honorable discharge or active-duty status",
      "Minimum 620 credit score (lender overlay)",
      "Sufficient remaining entitlement",
      "Property must meet VA appraisal standards",
    ],
    ctaText: "Check VA Eligibility",
    faqs: (state: string) => [
      {
        q: `Who qualifies for a VA loan in ${state}?`,
        a: `VA loans are available to ${state} veterans, active-duty service members, National Guard/Reserve members with qualifying service, and surviving spouses of veterans who died in service or from a service-connected disability.`,
      },
      {
        q: `Is there a VA loan limit in ${state}?`,
        a: `Veterans with full entitlement have no VA loan limit — they can borrow as much as a lender will approve with $0 down. ${state} veterans with partial entitlement may have county-based limits. Ask Nathan about your specific entitlement situation.`,
      },
      {
        q: `What is the VA funding fee in ${state}?`,
        a: `The VA funding fee ranges from 1.25% to 3.3% of the loan amount depending on your down payment and whether it's a first or subsequent use. Some ${state} veterans with service-connected disabilities are exempt from the funding fee entirely.`,
      },
      {
        q: `How fast can I close a VA loan in ${state}?`,
        a: `VA loans typically close in 30–45 days in ${state}. Nathan specializes in VA loans and knows how to move through the process efficiently, including the VA appraisal requirement.`,
      },
    ],
  },
  {
    slug: "conventional",
    name: "Conventional Loans",
    icon: "🏡",
    tagline: "Flexible terms, competitive rates",
    headline: (state: string) => `Conventional Loans in ${state}`,
    metaTitle: (state: string) =>
      `Conventional Home Loans in ${state} | LoanGraphs`,
    metaDesc: (state: string) =>
      `Conventional mortgage loans in ${state}. As low as 3% down, no upfront MIP, flexible loan amounts. Get pre-approved today with Your Loan Officer, licensed ${state} mortgage loan officer.`,
    intro: (state: string) =>
      `Conventional loans are the most common mortgage type in ${state}, offering flexible terms, competitive rates, and the ability to cancel mortgage insurance once you reach 20% equity. Whether buying or refinancing in ${state}, a conventional loan may be your best option.`,
    benefits: [
      "Down payments as low as 3%",
      "PMI cancellable at 20% equity",
      "Loan amounts up to conforming limits",
      "Fixed or adjustable rate options",
      "Primary, second home, or investment property",
    ],
    requirements: [
      "Minimum 620 credit score",
      "DTI typically under 50%",
      "2 years employment history",
      "Documented income and assets",
      "Property appraisal required",
    ],
    ctaText: "Get Pre-Approved",
    faqs: (state: string) => [
      {
        q: `What is the conventional loan limit in ${state} for 2024?`,
        a: `The 2024 conforming loan limit for most ${state} counties is $766,550 for a single-family home. High-cost ${state} counties have higher limits. Loans above these limits are considered jumbo loans.`,
      },
      {
        q: `How much down payment do I need for a conventional loan in ${state}?`,
        a: `Conventional loans in ${state} require as little as 3% down for first-time homebuyers (Fannie Mae HomeReady or Freddie Mac Home Possible programs). Most ${state} buyers put down 5–20%. A 20% down payment eliminates PMI entirely.`,
      },
      {
        q: `When can I cancel PMI on my ${state} conventional loan?`,
        a: `You can request PMI cancellation once your loan balance reaches 80% of the original home value. PMI automatically terminates at 78% LTV based on original amortization. A new appraisal showing increased ${state} home values can also support earlier PMI removal.`,
      },
      {
        q: `What credit score do I need for a conventional loan in ${state}?`,
        a: `The minimum credit score for a conventional loan in ${state} is 620, though the best rates go to borrowers with 740+ scores. A higher credit score can save thousands over the life of your ${state} mortgage.`,
      },
    ],
  },
  {
    slug: "dscr",
    name: "DSCR Loans",
    icon: "📈",
    tagline: "Qualify on rental income — no W-2 needed",
    headline: (state: string) => `DSCR Loans in ${state}`,
    metaTitle: (state: string) =>
      `DSCR Loans in ${state} — Qualify on Rental Income | LoanGraphs`,
    metaDesc: (state: string) =>
      `DSCR loans in ${state} for real estate investors. Qualify based on rental income, not your W-2. No tax returns required. Your Loan Officer specializes in DSCR financing for ${state} investment properties.`,
    intro: (state: string) =>
      `DSCR (Debt Service Coverage Ratio) loans are the premier financing option for ${state} real estate investors. Unlike conventional loans, DSCR loans qualify you based on the property's rental income — not your personal income, tax returns, or W-2s. This makes DSCR loans ideal for self-employed investors and those with complex income.`,
    benefits: [
      "Qualify on rental income — no W-2 or tax returns",
      "No personal income verification required",
      "Short-term rental (Airbnb/VRBO) income accepted",
      "Unlimited investment properties",
      "Competitive rates for strong DSCR ratios",
    ],
    requirements: [
      "DSCR ratio of 1.0 or higher preferred",
      "Minimum 680 credit score",
      "20-25% down payment typical",
      "Investment property only",
      "Property must generate documented rental income",
    ],
    ctaText: "Get DSCR Pre-Approval",
    faqs: (state: string) => [
      {
        q: `How is DSCR calculated for ${state} investment properties?`,
        a: `DSCR = Monthly Rental Income ÷ Monthly PITIA (Principal, Interest, Taxes, Insurance, and Association dues). A DSCR of 1.0 means the property breaks even; most ${state} lenders prefer 1.0–1.25 or higher. Nathan can help you calculate DSCR for any ${state} investment property.`,
      },
      {
        q: `Can I use Airbnb income for a DSCR loan in ${state}?`,
        a: `Yes! Many DSCR lenders in ${state} now accept short-term rental income from platforms like Airbnb and VRBO. Lenders typically use a percentage of trailing 12-month revenue from the platform's earnings summary. ${state} has some of the most active STR markets in the country.`,
      },
      {
        q: `What is the minimum down payment for a DSCR loan in ${state}?`,
        a: `Most DSCR lenders require 20–25% down for ${state} investment properties. Rates and terms improve with larger down payments. Some lenders allow cash-out refinances on existing ${state} investment properties with sufficient equity.`,
      },
      {
        q: `Do I need tax returns for a DSCR loan in ${state}?`,
        a: `No — that's the beauty of DSCR loans! You don't need tax returns, W-2s, pay stubs, or personal income verification. The ${state} property's rental income is what matters. This is ideal for self-employed ${state} investors whose tax returns show significant deductions.`,
      },
    ],
  },
  {
    slug: "jumbo",
    name: "Jumbo Loans",
    icon: "🏰",
    tagline: "Luxury homes above conforming limits",
    headline: (state: string) => `Jumbo Loans in ${state}`,
    metaTitle: (state: string) =>
      `Jumbo Mortgage Loans in ${state} | LoanGraphs`,
    metaDesc: (state: string) =>
      `Jumbo mortgage loans in ${state} for luxury homes and high-value properties above conforming limits. Competitive jumbo rates, flexible terms. Get pre-approved with Your Loan Officer.`,
    intro: (state: string) =>
      `Jumbo loans finance properties above the conventional conforming loan limits in ${state}. Whether purchasing a luxury home or refinancing a high-value property, jumbo loans offer the financing you need with competitive rates and terms from an experienced ${state} mortgage professional.`,
    benefits: [
      "Loan amounts above conforming limits",
      "Competitive rates for well-qualified borrowers",
      "Fixed and adjustable rate options",
      "Primary, second home, and investment properties",
      "Interest-only options available",
    ],
    requirements: [
      "Minimum 700 credit score typical",
      "12-24 months cash reserves",
      "Debt-to-income ratio under 43%",
      "Full income documentation",
      "20-30% down payment typical",
    ],
    ctaText: "Get Jumbo Pre-Approval",
    faqs: (state: string) => [
      {
        q: `What qualifies as a jumbo loan in ${state}?`,
        a: `Any loan that exceeds the conforming loan limit is considered a jumbo loan. In most ${state} counties, that threshold is $766,550 for 2024. High-cost ${state} counties have higher conforming limits before jumbo kicks in.`,
      },
      {
        q: `Are jumbo loan rates higher in ${state}?`,
        a: `Jumbo loan rates in ${state} are often very competitive — sometimes even lower than conforming rates for well-qualified borrowers. The key factors are your credit score (720+), cash reserves, and debt-to-income ratio.`,
      },
      {
        q: `How much cash reserves do I need for a ${state} jumbo loan?`,
        a: `Most jumbo lenders in ${state} require 12–24 months of mortgage payments in liquid reserves. This demonstrates financial stability and is a key underwriting factor for ${state} jumbo loans.`,
      },
      {
        q: `Can I get a jumbo loan for a second home in ${state}?`,
        a: `Yes! Jumbo loans are available for primary residences, second homes/vacation properties, and investment properties in ${state}. Down payment requirements and rates may vary by property type.`,
      },
    ],
  },
];

export function getLoanProgram(slug: string): LoanProgram | undefined {
  return LOAN_PROGRAMS.find((p) => p.slug === slug);
}
