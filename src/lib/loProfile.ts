// NOTE: API endpoint assumptions (to be verified against live LoanGraphs API):
//   GET /{slug}/loan-officer/get-owner   -> profile object
//   GET /{slug}/loan-officer/social-media-links -> links object (applyUrl, etc.)

import type { LOProfile } from '@/types/lo-profile'

const LOANGRAPHS_API =
  process.env.LOANGRAPHS_API ?? 'https://app.loangraphs.com/api'

// Re-export the canonical LOProfile type
export type { LOProfile } from '@/types/lo-profile'

export async function getLOProfile(slug: string): Promise<LOProfile> {
  try {
    const [profileRes, linksRes] = await Promise.all([
      fetch(`${LOANGRAPHS_API}/${slug}/loan-officer/get-owner`, {
        next: { revalidate: 3600 },
        headers: { 'Content-Type': 'application/json' },
      }),
      fetch(`${LOANGRAPHS_API}/${slug}/loan-officer/social-media-links`, {
        next: { revalidate: 3600 },
        headers: { 'Content-Type': 'application/json' },
      }),
    ])

    if (profileRes.ok) {
      const profile = await profileRes.json()
      const links = linksRes.ok ? await linksRes.json() : {}
      return mapApiToLOProfile(profile, links)
    }
  } catch (e) {
    console.error('[loProfile] API error:', e)
  }

  // Static fallback — used in local dev without API
  return getStaticFallback()
}

function mapApiToLOProfile(
  profile: Record<string, unknown>,
  links: Record<string, unknown>
): LOProfile {
  const name = (profile.displayName ?? profile.name ?? 'Loan Officer') as string

  return {
    // Identity
    name,
    title: (profile.title as string) ?? 'Licensed Mortgage Professional',
    nmls: (profile.nmls as string) ?? '',
    photo: (profile.headshotUrl ?? profile.headshot_url ?? '') as string,
    company: (profile.company as string) ?? '',
    licenseStates: (profile.licensedStates ?? profile.licensed_states ?? []) as string[],

    // Contact
    phone: (profile.phone as string) ?? '',
    email: (profile.email as string) ?? '',
    calendlyUrl: (links.applyUrl ?? links.apply_url ?? undefined) as string | undefined,

    // Social proof — defaults until API provides these
    googleRating: (profile.googleRating as number) ?? 5.0,
    reviewCount: (profile.reviewCount as number) ?? 0,
    yearsExperience: (profile.yearsExperience as number) ?? 0,

    // Branding
    primaryColor: (profile.primaryColor as string) ?? '#0ea5e9',
    accentColor: (profile.accentColor as string) ?? '#f97316',
    logoUrl: (profile.logoUrl as string) ?? undefined,

    // Content
    headline: (profile.headline as string) ?? 'Your Mortgage, Done Right.',
    subheadline:
      (profile.subheadline as string) ??
      (profile.bio as string) ??
      `${name} is a licensed mortgage loan officer. Whether you're buying your first home or growing a rental portfolio, we'll get you to the closing table with the best loan for your situation.`,
    bio: (profile.bio as string) ?? '',
    loanProducts: Array.isArray(profile.loanProducts)
      ? profile.loanProducts
      : [
          { id: 'purchase', name: 'Home Purchase', description: 'Buying your first home or upgrading? We\'ll find the right loan.', icon: 'home' },
          { id: 'refinance', name: 'Refinance', description: 'Lower your rate, shorten your term, or pull cash out.', icon: 'refinance' },
          { id: 'investment', name: 'DSCR Investment Loans', description: 'Grow your rental portfolio without W2 income requirements.', icon: 'investment' },
          { id: 'fha', name: 'FHA & Low Down Payment', description: '3–3.5% down payment options for eligible buyers.', icon: 'dollar' },
        ],
    testimonials: Array.isArray(profile.testimonials)
      ? profile.testimonials
      : [
          { id: 't1', author: 'Sarah M.', rating: 5, text: 'Made the homebuying process so smooth. Everything was explained clearly and we closed in 28 days.', date: 'Phoenix, AZ' },
          { id: 't2', author: 'James & Linda T.', rating: 5, text: 'We were first-time buyers and nervous about the process. Our LO held our hand through every step.', date: 'Scottsdale, AZ' },
          { id: 't3', author: 'Mike R.', rating: 5, text: 'Used them for my third DSCR loan. They know the investor side better than anyone.', date: 'Mesa, AZ' },
        ],
    differentiators: Array.isArray(profile.differentiators)
      ? profile.differentiators
      : [
          'Local market expertise with years of experience',
          'Investor-friendly: DSCR, LLC lending, portfolio strategies',
          'Direct access to your loan officer — not a call center',
          'Fast closings: 21–30 days for most purchases',
          'Competitive rates across 50+ loan programs',
        ],

    // Tier / upsells
    plan: (profile.plan as 'free' | 'paid') ?? 'free',
    marketDataEnabled: (profile.marketDataEnabled as boolean) ?? false,
    seoArticlesEnabled: (profile.seoArticlesEnabled as boolean) ?? false,
    seoTier: profile.seoTier as LOProfile['seoTier'],
    targetGeos: profile.targetGeos as string[] | undefined,
    targetTopics: profile.targetTopics as string[] | undefined,
  }
}

function getStaticFallback(): LOProfile {
  const name = process.env.NEXT_PUBLIC_LO_NAME ?? 'Your Loan Officer'
  return {
    name,
    title: 'Licensed Mortgage Professional',
    nmls: process.env.NEXT_PUBLIC_LO_NMLS ?? '',
    photo: '',
    company: '',
    licenseStates: (process.env.NEXT_PUBLIC_LO_STATES ?? '').split(',').filter(Boolean),
    phone: process.env.NEXT_PUBLIC_LO_PHONE ?? '',
    email: process.env.NEXT_PUBLIC_LO_EMAIL ?? '',
    calendlyUrl: process.env.NEXT_PUBLIC_APPLY_URL || undefined,
    googleRating: 5.0,
    reviewCount: 0,
    yearsExperience: 0,
    primaryColor: '#0ea5e9',
    accentColor: '#f97316',
    headline: 'Your Mortgage, Done Right.',
    subheadline: `${name} is a licensed mortgage loan officer. Whether you're buying your first home or growing a rental portfolio, we'll get you to the closing table with the best loan for your situation.`,
    bio: '',
    loanProducts: [
      { id: 'purchase', name: 'Home Purchase', description: 'Buying your first home or upgrading? We\'ll find the right loan.', icon: 'home' },
      { id: 'refinance', name: 'Refinance', description: 'Lower your rate, shorten your term, or pull cash out.', icon: 'refinance' },
      { id: 'investment', name: 'DSCR Investment Loans', description: 'Grow your rental portfolio without W2 income requirements.', icon: 'investment' },
      { id: 'fha', name: 'FHA & Low Down Payment', description: '3–3.5% down payment options for eligible buyers.', icon: 'dollar' },
    ],
    testimonials: [
      { id: 't1', author: 'Sarah M.', rating: 5, text: 'Made the homebuying process so smooth. Everything was explained clearly and we closed in 28 days.', date: 'Phoenix, AZ' },
      { id: 't2', author: 'James & Linda T.', rating: 5, text: 'We were first-time buyers and nervous about the process. Our LO held our hand through every step.', date: 'Scottsdale, AZ' },
      { id: 't3', author: 'Mike R.', rating: 5, text: 'Used them for my third DSCR loan. They know the investor side better than anyone.', date: 'Mesa, AZ' },
    ],
    differentiators: [
      'Local market expertise with years of experience',
      'Investor-friendly: DSCR, LLC lending, portfolio strategies',
      'Direct access to your loan officer — not a call center',
      'Fast closings: 21–30 days for most purchases',
      'Competitive rates across 50+ loan programs',
    ],
    plan: 'free',
    marketDataEnabled: false,
    seoArticlesEnabled: false,
  }
}
