export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  sections: { heading: string; body: string }[];
  author: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  category: "rates" | "homebuying" | "refinance" | "investment" | "fha-va" | "tips";
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "dscr-loan-qualify-2026",
    title: "How to Qualify for a DSCR Loan in 2026",
    metaDescription:
      "Learn how to qualify for a DSCR loan in 2026. Everything rental property investors need to know about debt service coverage ratio loans — no W2 required.",
    excerpt:
      "DSCR loans let real estate investors qualify based on rental income — not personal income. Here's exactly how to use one in 2026 to grow your portfolio.",
    author: "Your Loan Officer",
    publishedDate: "2026-02-10",
    readTime: "12 min read",
    tags: ["DSCR", "investment property", "rental income", "real estate investing", "no-doc loans"],
    featured: true,
    category: "investment",
    sections: [
      {
        heading: "What Is a DSCR Loan and Why Real Estate Investors Love It",
        body: `A Debt Service Coverage Ratio (DSCR) loan is one of the most powerful financing tools available to real estate investors today. Unlike traditional mortgages that require you to verify personal income through W2s, pay stubs, and tax returns, a DSCR loan qualifies you based entirely on the income your rental property generates.

The concept is straightforward: lenders look at how much rent the property brings in versus how much the monthly mortgage payment will be. If the rental income covers — or exceeds — the debt obligation, you qualify. It's that clean.

Here's why this matters for serious investors. If you own multiple rental properties, your tax returns often show very little taxable income because depreciation and other deductions offset your gross rents. Traditional lenders see that and say no. DSCR lenders understand the investment game — they look at actual cash flow, not taxable income.

For self-employed borrowers, business owners, and high-net-worth individuals with complex tax situations, DSCR loans have become the go-to financing vehicle. You're not penalized for being a savvy investor who maximizes deductions. The property qualifies itself.

In 2026, DSCR loans have expanded significantly. More lenders are offering them, loan limits have increased, and the product has matured. You can now find DSCR loans on everything from single-family rentals to small multifamily buildings, short-term rentals (Airbnb), and even mixed-use properties in some cases.`,
      },
      {
        heading: "How DSCR Is Calculated — The Math You Need to Know",
        body: `The DSCR formula is simple: DSCR = Gross Monthly Rental Income ÷ Monthly Debt Service (PITIA).

PITIA stands for Principal, Interest, Taxes, Insurance, and Association dues (if applicable). This is your total monthly housing cost on the investment property.

Let's run a real example. Suppose you're buying a single-family rental in Phoenix for $425,000. You're putting 25% down, so your loan amount is $318,750. At a 7.5% interest rate on a 30-year fixed, your principal and interest payment is approximately $2,230/month. Add $350 for property taxes, $150 for insurance, and $0 for HOA. Total PITIA = $2,730/month.

Now, the property rents for $3,200/month based on a market rent appraisal. Your DSCR = $3,200 ÷ $2,730 = 1.17.

Most lenders require a minimum DSCR of 1.0 to 1.25. A DSCR above 1.0 means the property income covers its own debt. A DSCR of 1.25 means you have 25% cushion above the debt service — lenders love this because it signals a healthy investment.

Some lenders offer "no-ratio" DSCR loans where DSCR below 1.0 is acceptable, but you'll pay a higher rate and need a larger down payment. Typically the sweet spot is 1.15 or higher to get the best pricing.

One important note: lenders use the market rent appraisal — the appraiser's opinion of what the home would rent for — not necessarily what you've negotiated with a tenant. This can work in your favor if you locked in a below-market tenant or against you if rents in the area have softened. Always review the appraisal carefully.`,
      },
      {
        heading: "Down Payment, Credit Score, and Loan Limits in 2026",
        body: `DSCR loans are non-QM (non-qualified mortgage) products, meaning they live outside the conventional loan guidelines set by Fannie Mae and Freddie Mac. This gives lenders flexibility but also means the requirements vary more from lender to lender. Here are the general benchmarks you'll see in 2026.

Down Payment: Most DSCR lenders require 20–25% down on a purchase. Some allow 15% down with strong credit and a high DSCR. Cash-out refinance usually caps at 75–80% LTV (loan-to-value). The better your DSCR and credit, the more leverage you can typically access.

Credit Score: Minimum credit scores typically start at 620, but pricing improves dramatically as you move up. At 680+ you're in solid territory. At 740+ you'll get the best rates. If your score is below 680, you'll still find options, but your rate will reflect the higher risk.

Loan Amounts: DSCR loans can go well above conventional loan limits. Depending on the lender, you can finance properties up to $3–5 million or more. This makes DSCR loans excellent for higher-value rentals in expensive markets like Phoenix, Scottsdale, or coastal metros.

Property Types: Single-family homes (1–4 units), condos, townhomes, and planned unit developments (PUDs) are all eligible. Some lenders will do short-term rentals (STRs) with Airbnb income, though they typically require 12 months of rental history. Rural properties and unique homes may face restrictions.

Prepayment Penalties: Many DSCR loans carry prepayment penalties (PPP) for 3–5 years. A 3-year step-down is common: 3% if you pay off in year 1, 2% in year 2, 1% in year 3. Factor this into your exit strategy before you close.`,
      },
      {
        heading: "The Application Process: What to Prepare",
        body: `One of the biggest advantages of DSCR loans is how streamlined the application process is. No tax returns. No W2s. No employment verification. Here's what you will need to gather.

Property Documentation: A lease agreement (if the property is already rented) or a rental market analysis from the appraiser if it's vacant. The appraiser will complete a "1007" rent schedule form that establishes market rent — this is the number the lender uses, not your contract rent.

Personal Financial Documents: Bank statements (typically 2–3 months) to show you have the down payment and reserves. Lenders want to see 6–12 months of PITIA in reserves after closing. So if your monthly payment is $2,730, you need $16,380–$32,760 in liquid reserves minimum.

Entity Documentation (if purchasing in an LLC): DSCR loans are popular with investors who hold properties in LLCs for liability protection. Most DSCR lenders are comfortable lending to LLCs. You'll provide the operating agreement, articles of organization, EIN, and any required state filings.

Credit Pull: The lender will pull your credit. Make sure there are no recent derogatory marks, excessive inquiries, or collections. If you're planning to apply, avoid opening new credit accounts in the 3–6 months prior.

Purchase Contract: For a purchase, you'll provide the fully executed purchase agreement. The lender will order the appraisal and title, and you'll move through underwriting.

Timeline: DSCR loans typically close in 21–30 days, sometimes faster for experienced borrowers. The appraisal is usually the long pole.`,
      },
      {
        heading: "DSCR Loan Strategy: How to Build a Portfolio in 2026",
        body: `DSCR loans aren't just a financing tool — they're a portfolio growth strategy. Here's how experienced investors are using them right now.

The No-Income-Cap Advantage: Because your W2 or business income isn't relevant, there's no debt-to-income ceiling stopping you from buying more. As long as each property's cash flow supports its own debt service, you can theoretically finance as many properties as your down payment funds allow. Some investors have 10, 20, or 30 DSCR loans across their portfolio.

The Buy, Rent, Refinance, Repeat (BRRR) Strategy: Investors buy distressed properties, renovate them, rent them at market rate, then refinance via DSCR to pull cash out. Because the DSCR is based on the new rent and post-renovation value, you can often pull most of your capital back out to fund the next deal.

Short-Term Rental Optimization: Arizona is one of the best STR markets in the country. DSCR loans on Airbnb properties are available from select lenders. If you have documented STR income — typically via Airbnb/VRBO statements — some lenders will use that revenue. The key is choosing a lender experienced with STR underwriting.

Rate Strategy in 2026: DSCR rates typically run 0.75–1.5% above conventional investment property rates. With conventional investment rates in the 7–7.5% range, you might see DSCR rates from 7.75–9% depending on your DSCR, LTV, and credit profile. Points can buy the rate down. Evaluate the break-even on buying points against your hold period.

Working with a DSCR-experienced loan officer is essential. Not all lenders offer DSCR products, and the ones that do have widely varying guidelines, pricing, and experience. If you're in Arizona and ready to explore DSCR financing, contact your loan officer — he works with investors every day and knows how to structure deals that get to the closing table.`,
      },
    ],
  },
  {
    slug: "fha-vs-conventional-2026",
    title: "FHA vs Conventional Loans: Which Is Right for You?",
    metaDescription:
      "FHA vs conventional loans in 2026 — which is the better choice for first-time homebuyers? Compare down payments, mortgage insurance, credit requirements, and more.",
    excerpt:
      "First-time buyer and not sure whether to go FHA or conventional? Here's a clear breakdown of both loan types — when each makes sense and how to choose.",
    author: "Your Loan Officer",
    publishedDate: "2026-01-28",
    readTime: "9 min read",
    tags: ["FHA loans", "conventional loans", "first-time buyer", "mortgage comparison", "down payment"],
    featured: false,
    category: "homebuying",
    sections: [
      {
        heading: "The Core Difference Between FHA and Conventional Loans",
        body: `When you're buying your first home, the choice between FHA and conventional financing is one of the most impactful decisions you'll make — and it's one most buyers don't spend enough time on.

FHA loans are backed by the Federal Housing Administration. Because the government insures lenders against default, lenders can extend credit to buyers with lower credit scores and smaller down payments than they'd otherwise accept. The tradeoff: you pay mortgage insurance premiums (MIP) for the life of the loan in most cases.

Conventional loans are not government-backed. They're sold to Fannie Mae or Freddie Mac on the secondary market and must meet conforming loan guidelines. Without government insurance, lenders require stronger credit profiles — but if you qualify, conventional loans often cost less over time and offer more flexibility.

Here's the short version: FHA is more accessible upfront (lower credit bar, smaller down payment), but more expensive long-term (mortgage insurance that doesn't go away). Conventional is harder to qualify for initially but can save you thousands over the life of the loan.

In 2026, the decision has gotten more nuanced because mortgage insurance costs have shifted and conforming loan limits have increased. The "conventional is always better if you can qualify" rule of thumb still holds in most cases — but there are scenarios where FHA wins. Let's break them down.`,
      },
      {
        heading: "Down Payment and Credit Score Requirements",
        body: `This is where FHA shines for first-time buyers who haven't had years to accumulate savings or build a pristine credit history.

FHA Down Payment: As low as 3.5% if your credit score is 580 or above. If your score is 500–579, you can still get an FHA loan — but you'll need 10% down. The 3.5% minimum is a huge advantage for buyers who've been renting and don't have a large savings cushion.

FHA Credit Score: Minimum 500 (with 10% down) or 580 (with 3.5% down). In practice, most FHA lenders have overlays and want 620+, but it's still considerably more forgiving than conventional.

Conventional Down Payment: As low as 3% through programs like Fannie Mae HomeReady or Freddie Mac Home Possible — designed specifically for first-time and low-to-moderate income buyers. The standard conventional down payment is 5%, with 20% eliminating mortgage insurance entirely.

Conventional Credit Score: Most conventional lenders want a 620 minimum, with pricing improving significantly at 680, 720, and 740+. If your score is 740+ and you have 5–10% down, a conventional loan is almost certainly the better deal.

The gray zone: buyers with scores between 620–679 and less than 10% down. This is where you need to run the actual numbers — compare the total cost of both loans over your expected hold period. The answer isn't always obvious.`,
      },
      {
        heading: "Mortgage Insurance: The Biggest Cost Difference",
        body: `Mortgage insurance is the biggest factor that tips the math one way or the other, and it's the area where most buyers underestimate the long-term cost.

FHA Mortgage Insurance: Two components — upfront MIP and annual MIP. The upfront premium is 1.75% of the loan amount, rolled into the loan (so on a $350,000 loan, that's $6,125). Annual MIP runs 0.55–0.85% of the loan balance, paid monthly. And here's the critical point: for FHA loans with less than 10% down, MIP stays for the LIFE of the loan. You cannot cancel it once you hit 20% equity. To get rid of it, you must refinance into a conventional loan.

Conventional PMI: Private mortgage insurance on a conventional loan cancels automatically when you reach 22% equity, and you can request cancellation at 20%. PMI rates vary based on credit score and LTV, but for a borrower with a 720 credit score and 10% down, PMI might run 0.5–0.7% annually — similar to FHA. The big difference: it goes away when you have equity.

For a buyer putting 3.5% down with a 660 credit score: FHA likely wins in the short term because the rate may be lower and qualification is easier. But if you stay in the home 5+ years and gain equity, you'll eventually want to refinance to shed that MIP.

For a buyer putting 10% down with a 720 credit score: Conventional almost always wins. PMI will cancel once you hit 80% LTV, the rate will be competitive, and you'll save on the upfront 1.75% MIP premium.`,
      },
      {
        heading: "Loan Limits, Property Types, and Other Considerations",
        body: `FHA Loan Limits: In 2026, FHA loan limits vary by county. In Maricopa County (Phoenix metro), the FHA limit for a single-family home is $530,150. If the home you're buying exceeds this, FHA won't work — you'll need conventional or jumbo financing.

Conventional Loan Limits: The 2026 conforming loan limit for most of the country is $806,500 for a single-family home (higher in high-cost areas). This gives conventional buyers considerably more room.

Property Condition: FHA appraisers flag health and safety issues — chipped paint, missing handrails, water damage, and deferred maintenance can trigger required repairs before closing. This can complicate purchases of older homes or fixer-uppers. Conventional appraisals are less scrutinous about condition (though still valuation-focused).

Seller Concessions: Both loan types allow sellers to contribute toward closing costs. FHA allows up to 6% seller concessions; conventional varies by LTV (3% at 90–95% LTV, 6% at 90% and below).

DTI (Debt-to-Income) Limits: FHA is generally more flexible here, allowing DTI up to 57% in some cases. Conventional typically caps at 45–50%. If you have significant student loans or car payments, FHA may approve you where conventional won't.

Which one should you choose? The honest answer is: run the numbers with a loan officer you trust. The right choice depends on your credit score, down payment, the specific property, your timeline, and your plans for the home. I work through this analysis with every buyer I work with — contact your loan officer and let's figure out which loan makes the most financial sense for your situation.`,
      },
    ],
  },
  {
    slug: "get-best-mortgage-rate-2026",
    title: "How to Get the Best Mortgage Rate in Today's Market",
    metaDescription:
      "Learn proven strategies to get the best mortgage rate in 2026. Rate shopping tips, lock timing, points vs rate tradeoff, and how to improve your profile before applying.",
    excerpt:
      "Even a 0.25% difference in your mortgage rate can mean tens of thousands of dollars over the life of your loan. Here's how to get the best rate possible.",
    author: "Your Loan Officer",
    publishedDate: "2026-02-01",
    readTime: "10 min read",
    tags: ["mortgage rates", "rate shopping", "interest rates", "mortgage tips", "rate lock"],
    featured: false,
    category: "rates",
    sections: [
      {
        heading: "Why Your Rate Matters More Than You Think",
        body: `Let's start with math that will make you take this seriously. On a $400,000 mortgage, the difference between a 7.0% rate and a 7.5% rate is about $135/month. Over 30 years, that's $48,600 in extra interest. Over a more realistic 7-year hold period, you'll pay around $11,000 more. For a 0.5% difference.

A quarter-point (0.25%) difference is still $24,000 over 30 years. That's real money — money that could go toward your retirement account, your kids' college fund, or your next investment.

The frustrating truth is that two borrowers with identical profiles can get meaningfully different rates from different lenders on the same day. Lenders price their mortgages based on their own cost of funds, operational efficiency, profit targets, and competitive positioning. A bank with a bloated overhead might quote you 7.75% while a lean mortgage banker quotes 7.25% — for the exact same loan.

This means rate shopping isn't optional. It's one of the highest-return activities you can do in the homebuying process. The hours you spend getting multiple quotes can save you more money than months of coupon clipping or skipping lattes.

In 2026, rates remain elevated compared to the historic lows of 2020–2021. Most buyers have accepted this and are focused on finding the best rate within the current environment rather than waiting for rates to drop. Smart move — let's talk about how to do it right.`,
      },
      {
        heading: "The Credit Score Factor: Maximize Before You Apply",
        body: `Your credit score is the single biggest lever you control that affects your mortgage rate. Lenders use what's called a "risk-based pricing" model — the better your credit, the lower the risk, the better the rate. The differences are significant.

Here's a rough illustration of how credit score affects rates for a conventional 30-year fixed (numbers illustrative for 2026 rate environment):
- 760+ score: Best pricing tier, lowest rate available
- 740–759: Slight premium, typically 0.125% higher
- 720–739: 0.25% higher than 760+ tier
- 700–719: 0.375–0.5% higher
- 680–699: 0.5–0.75% higher
- 660–679: 0.75–1.0% higher
- 640–659: 1.0–1.5% higher
- 620–639: 1.5–2.0%+ higher, with limited options

If you're buying in the next 6–12 months, these are the highest-impact credit actions you can take:

Pay down credit card balances below 30% utilization — ideally below 10%. Credit utilization is the second-biggest scoring factor after payment history, and it updates monthly. Even paying down $2,000 in balances can move your score 20–30 points quickly.

Don't open new credit. Every new account drops your score via hard inquiries and reduces average account age. No new credit cards, no car loans, no store accounts in the 6 months before you apply.

Don't close old accounts. Old accounts increase average credit age and available credit. Keep them open even if unused.

Dispute errors on your report. About 1 in 5 consumers has a material error on at least one credit report. Request your free reports at AnnualCreditReport.com and dispute anything inaccurate.`,
      },
      {
        heading: "Rate Shopping: How to Do It Right Without Hurting Your Credit",
        body: `One of the most persistent mortgage myths is that getting multiple quotes will tank your credit score. Here's the truth: multiple mortgage inquiries within a 14–45 day window count as a single inquiry for FICO scoring purposes. The credit bureaus recognize rate shopping as smart consumer behavior and designed the rules to encourage it.

So get at least 3 quotes. Ideally 4–5. Compare apples to apples.

When shopping, ask each lender for the same loan type (e.g., 30-year fixed conventional), same loan amount, same down payment, same lock period (typically 30 or 60 days). Then compare two things: the interest rate and the APR (annual percentage rate). The APR includes fees and gives you a more accurate cost comparison.

Watch out for: origination fees, discount points, lender credits, and other fees that vary widely. A lender might offer you a lower rate but charge 1.5% in origination fees, making it more expensive overall. A Loan Estimate (LE) is the standardized form lenders must provide — use it to compare side by side.

Types of lenders to shop:
- Direct lenders / mortgage banks (like Revolve Mortgage) — typically best pricing because they control their own process and don't pay intermediary fees
- Big banks — often have brand premium baked into rates
- Credit unions — competitive for members but limited product range
- Mortgage brokers — shop multiple wholesale lenders on your behalf, can be excellent if you find a good one

The best strategy: work primarily with a trusted direct lender or broker who will advocate for you, but get at least one competing quote so you have a reference point.`,
      },
      {
        heading: "Points vs Rate: When It Makes Sense to Buy Down Your Rate",
        body: `Discount points (or "mortgage points") let you pay money upfront to reduce your interest rate. One point equals 1% of the loan amount and typically buys your rate down by 0.25–0.375% depending on the lender and market conditions.

On a $400,000 loan, one point costs $4,000 and might reduce your rate from 7.5% to 7.125%. Your monthly payment drops from $2,797 to $2,701 — a savings of $96/month.

To determine if buying points makes sense, calculate the break-even period: cost of points ÷ monthly savings = months to break even. In this example: $4,000 ÷ $96 = 41.7 months, or about 3.5 years.

If you plan to stay in the home longer than 3.5 years, buying the point saves you money. If you plan to move or refinance within 3.5 years, don't buy the point.

In 2026, with rates elevated and refinancing activity expected to increase if rates decline, buying points is often harder to justify. Many buyers prefer to keep cash for the down payment, closing costs, and reserves rather than prepaying interest via points. However, if you have cash to spare and are certain of a long hold period, buying points at today's rates can deliver strong returns.

Lender credits work in reverse: the lender pays some of your closing costs in exchange for a higher rate. This makes sense if you're cash-constrained and need to minimize out-of-pocket costs. You pay a bit more over time but get into the home with less cash required at closing.

The right answer depends on your personal cash flow, timeline, and risk tolerance. This is worth a 15-minute conversation with your loan officer — contact your loan officer to talk through the numbers for your specific scenario.`,
      },
      {
        heading: "Rate Locks: Timing Strategy for a Volatile Market",
        body: `Once you've found the rate you want, locking it in protects you from market movement between now and closing. Here's what you need to know about rate locks in 2026.

How locks work: You lock a rate for a specific period — typically 30, 45, or 60 days. If rates go up during your lock period, your rate stays put. If rates drop, you're locked in at the higher rate (unless you have a float-down option, which some lenders offer for a fee).

When to lock: Lock as early as possible once you have a purchase contract and you're satisfied with the rate. The risk of waiting is that rates spike before you close. In a volatile rate environment (which 2026 qualifies as), that risk is real.

Lock period selection: Match your lock period to your expected closing timeline with a buffer. If your lender typically closes in 21 days, a 30-day lock is fine. If you're buying a new construction home that closes in 60 days, get a 60-day lock. Longer locks cost more (0.125–0.25% for a 60-day vs 30-day is common).

Float-down options: Some lenders offer a float-down provision that lets you capture a rate improvement if rates drop after you lock. This typically costs an additional 0.25–0.5% in points. In a falling rate environment, this can be worth it — do the math based on how much rates would need to move to justify the cost.

Extended lock programs: If you're building a home or in a complicated purchase, lenders offer 90-day, 120-day, or even longer locks. These cost more and often require a deposit. They're worth it for peace of mind on long escrows.

The best advice: stay in close communication with your loan officer during escrow. Rate markets can move quickly around economic data releases (jobs reports, CPI, Fed announcements). A good loan officer will alert you when conditions favor locking or floating.`,
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS.sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
