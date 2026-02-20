export interface LandingPage {
  slug: string;
  headline: string;
  subheadline: string;
  heroContent: string;
  ctaText: string;
  ctaUrl: string;
  metaTitle: string;
  metaDescription: string;
  stats: { value: string; label: string }[];
  benefits: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  body: string;
}

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "dscr-loans",
    headline: "DSCR Loans — Qualify on Rental Income, Not Your W2",
    subheadline:
      "Grow your rental portfolio without the paperwork headache. No tax returns required. No employment verification. Just your property's cash flow.",
    heroContent:
      "Designed for real estate investors who are tired of being told no by banks that don't understand investing. DSCR loans qualify you based on what matters: the property's rental income.",
    ctaText: "Get DSCR Loan Quote",
    ctaUrl: "/apply",
    metaTitle: "DSCR Loans in Phoenix AZ — No W2 Required | Your Loan Officer",
    metaDescription:
      "DSCR loans for Arizona real estate investors. Qualify on rental income, not W2 income. No tax returns required. Contact your loan officer at your loan officer.",
    stats: [
      { value: "No W2", label: "Income Verification Required" },
      { value: "20%", label: "Minimum Down Payment" },
      { value: "500+", label: "Investor Loans Closed" },
      { value: "1–4 Units", label: "Eligible Property Types" },
    ],
    benefits: [
      {
        title: "Qualify on Rental Income",
        description:
          "Your W2 or business income doesn't matter. As long as the property's rent covers the mortgage payment (DSCR ≥ 1.0), you can qualify.",
      },
      {
        title: "No Tax Returns Required",
        description:
          "Self-employed investors with complex returns often show little taxable income. DSCR lenders don't care — we look at the property, not your 1040.",
      },
      {
        title: "Unlimited Properties",
        description:
          "Build your portfolio without hitting conventional loan limits. Finance your 5th, 10th, or 20th rental the same way you financed your first.",
      },
      {
        title: "LLC-Friendly",
        description:
          "Most DSCR lenders lend directly to your LLC for liability protection. No need to take title personally to qualify.",
      },
      {
        title: "Fast Closings",
        description:
          "With less documentation to verify, DSCR loans often close in 21–30 days. Move fast in competitive markets.",
      },
      {
        title: "Short-Term Rentals Eligible",
        description:
          "Airbnb and VRBO investors: ask about STR DSCR programs. Qualify using documented short-term rental income.",
      },
    ],
    faqs: [
      {
        question: "What is the minimum DSCR to qualify?",
        answer:
          "Most lenders require a DSCR of 1.0 or higher. Some programs allow below 1.0 (no-ratio DSCR) with a larger down payment. To get the best rate, target a DSCR of 1.15 or above.",
      },
      {
        question: "What credit score do I need for a DSCR loan?",
        answer:
          "Minimum 620 for most programs. Pricing improves significantly at 680, 720, and 740+. Your rate will reflect your credit tier.",
      },
      {
        question: "How much do I need to put down?",
        answer:
          "Typically 20–25% for a purchase. Some programs allow 15% down with strong credit and DSCR. Cash-out refinances typically go to 75–80% LTV.",
      },
      {
        question: "Can I buy in an LLC?",
        answer:
          "Yes. Most DSCR lenders are comfortable lending to single-member or multi-member LLCs. You'll need to provide your operating agreement, articles of organization, and EIN.",
      },
      {
        question: "Do DSCR loans have prepayment penalties?",
        answer:
          "Many DSCR loans include a prepayment penalty (typically a 3-year step-down). Factor this into your exit strategy. Ask about programs with no PPP if you need flexibility.",
      },
    ],
    body: "Arizona's real estate market offers some of the best returns for rental property investors. Phoenix, Scottsdale, Mesa, Gilbert, Chandler — rental demand is strong and appreciation has been consistent. DSCR loans make it possible to scale your portfolio without the W2 qualification grind. Whether you're buying your first investment property or your fifteenth, Your Loan Officer can structure the right DSCR loan for your deal. Call your loan officer or submit your information to get started.",
  },
  {
    slug: "first-time-homebuyer",
    headline: "Ready to Buy Your First Home?",
    subheadline:
      "Stop renting and start building equity. Low down payment options, expert guidance, and a loan officer who will hold your hand through every step.",
    heroContent:
      "Buying your first home is one of the biggest financial decisions of your life. It doesn't have to be overwhelming. Your Loan Officer has helped hundreds of first-time buyers in Arizona get into their first home — and he can help you too.",
    ctaText: "Check My Eligibility",
    ctaUrl: "/apply",
    metaTitle: "First-Time Homebuyer Programs in Phoenix AZ | Your Loan Officer",
    metaDescription:
      "First-time homebuyer programs in Arizona. Low down payment options, FHA loans, down payment assistance. Contact your loan officer at your loan officer to get started.",
    stats: [
      { value: "3%", label: "Minimum Down Payment" },
      { value: "580+", label: "Minimum Credit Score (FHA)" },
      { value: "8+", label: "Years Helping AZ Buyers" },
      { value: "500+", label: "Loans Closed" },
    ],
    benefits: [
      {
        title: "Low Down Payment Options",
        description:
          "FHA loans require just 3.5% down. Conventional HomeReady/Home Possible programs start at 3% down. You may need less than you think.",
      },
      {
        title: "Down Payment Assistance Programs",
        description:
          "Arizona offers several DPA programs that provide grants or forgivable second loans to help cover your down payment and closing costs.",
      },
      {
        title: "FHA Loan Flexibility",
        description:
          "FHA loans accept credit scores as low as 580 and have more flexible qualifying guidelines than conventional loans — ideal for buyers building credit.",
      },
      {
        title: "Expert Guidance",
        description:
          "Your Loan Officer explains every step clearly — from application to closing table. No jargon, no surprises. You'll always know where your loan stands.",
      },
      {
        title: "Rate Lock Protection",
        description:
          "Once you're in contract, we lock your rate so you're protected from market movement while your loan processes.",
      },
      {
        title: "Fast Pre-Approval",
        description:
          "Get your pre-approval letter in 24–48 hours once you submit your documents. Be ready to make offers immediately when you find the right home.",
      },
    ],
    faqs: [
      {
        question: "How much do I really need to buy my first home?",
        answer:
          "With FHA: 3.5% down + 2–4% for closing costs. On a $350,000 home, that's roughly $12,250 down + up to $14,000 in closing costs. Seller concessions and DPA programs can reduce your out-of-pocket significantly.",
      },
      {
        question: "What credit score do I need to buy a home?",
        answer:
          "FHA loans go as low as 580 (3.5% down) or 500 (10% down). Conventional loans typically require 620+. The higher your score, the better your rate.",
      },
      {
        question: "How long does the process take?",
        answer:
          "From application to closing typically takes 30–45 days. The process starts with pre-approval (24–48 hours), then home shopping, then a 30-day escrow after you're in contract.",
      },
      {
        question: "What's the difference between FHA and conventional?",
        answer:
          "FHA is more flexible with credit and down payment, but requires mortgage insurance for the life of the loan. Conventional loans have stricter requirements but PMI cancels once you hit 20% equity. We'll run both options for you.",
      },
      {
        question: "Are there first-time buyer programs in Arizona?",
        answer:
          "Yes. The Arizona Department of Housing (ADOH) and Home Plus program offer down payment assistance for eligible buyers. Income and purchase price limits apply. Contact your loan officer about current programs.",
      },
    ],
    body: "Phoenix, Mesa, Scottsdale, Chandler, Gilbert, Tempe, Peoria, Surprise — Your Loan Officer helps first-time buyers across the entire Phoenix metro area. With 8+ years in Arizona mortgage lending and 500+ loans closed, he has the experience to navigate any situation. Whether you have a 580 credit score and $10,000 saved, or a 750 score and a 10% down payment, there's a path to homeownership for you. Take the first step today.",
  },
];

export function getAllLandingPages(): LandingPage[] {
  return LANDING_PAGES;
}

export function getLandingPageBySlug(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((lp) => lp.slug === slug);
}
