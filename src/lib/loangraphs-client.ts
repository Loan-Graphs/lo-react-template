/**
 * loangraphs-client.ts
 * Typed API client for the LoanGraphs REST API.
 *
 * Env vars required:
 *   NEXT_PUBLIC_LOANGRAPHS_API_URL  — e.g. https://app.loangraphs.com/api
 *   LOANGRAPHS_API_KEY              — server-side only key for authenticated endpoints
 *   LO_ID                           — slug / ID of the LO whose site this is
 *   LOANGRAPHS_LEADS_API_KEY        — key used when forwarding leads to LoanGraphs
 */

import type { LOProfile } from '@/types/lo-profile'

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const API_BASE =
  process.env.NEXT_PUBLIC_LOANGRAPHS_API_URL ?? 'https://app.loangraphs.com/api'

const API_KEY = process.env.LOANGRAPHS_API_KEY ?? ''

/** Default revalidation interval (seconds) for Next.js fetch cache */
const CACHE_TTL = 3600

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function authHeaders(): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`
  return headers
}

async function apiFetch<T>(
  path: string,
  options: RequestInit & { revalidate?: number } = {}
): Promise<T | null> {
  const { revalidate = CACHE_TTL, ...fetchOptions } = options
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...fetchOptions,
      headers: { ...authHeaders(), ...(fetchOptions.headers ?? {}) },
      next: { revalidate },
    })
    if (!res.ok) {
      console.warn(`[loangraphs-client] ${res.status} ${res.statusText} — ${path}`)
      return null
    }
    return (await res.json()) as T
  } catch (err) {
    console.error(`[loangraphs-client] fetch error for ${path}:`, err)
    return null
  }
}

// ---------------------------------------------------------------------------
// Raw API response shapes (partial — extend as the API evolves)
// ---------------------------------------------------------------------------

interface ApiLOProfile {
  id?: string
  slug?: string
  displayName?: string
  name?: string
  title?: string
  nmls?: string
  headshotUrl?: string
  headshot_url?: string
  company?: string
  licensedStates?: string[]
  licensed_states?: string[]
  phone?: string
  email?: string
  googleRating?: number
  reviewCount?: number
  yearsExperience?: number
  primaryColor?: string
  accentColor?: string
  logoUrl?: string
  headline?: string
  subheadline?: string
  bio?: string
  loanProducts?: LOProfile['loanProducts']
  testimonials?: LOProfile['testimonials']
  differentiators?: string[]
  plan?: 'free' | 'paid'
  marketDataEnabled?: boolean
  seoArticlesEnabled?: boolean
  seoTier?: LOProfile['seoTier']
  targetGeos?: string[]
  targetTopics?: string[]
  teamMembers?: LOProfile['teamMembers']
}

interface ApiSocialLinks {
  applyUrl?: string
  apply_url?: string
  calendlyUrl?: string
  calendly_url?: string
}

// ---------------------------------------------------------------------------
// Mapper: raw API → LOProfile
// ---------------------------------------------------------------------------

function mapToLOProfile(
  raw: ApiLOProfile,
  links: ApiSocialLinks = {}
): LOProfile {
  const name = raw.displayName ?? raw.name ?? 'Loan Officer'

  return {
    // Identity
    name,
    title: raw.title ?? 'Licensed Mortgage Professional',
    nmls: raw.nmls ?? '',
    photo: raw.headshotUrl ?? raw.headshot_url ?? '',
    company: raw.company ?? '',
    licenseStates: raw.licensedStates ?? raw.licensed_states ?? [],

    // Contact
    phone: raw.phone ?? '',
    email: raw.email ?? '',
    calendlyUrl:
      links.applyUrl ??
      links.apply_url ??
      links.calendlyUrl ??
      links.calendly_url ??
      undefined,

    // Social proof
    googleRating: raw.googleRating ?? 5.0,
    reviewCount: raw.reviewCount ?? 0,
    yearsExperience: raw.yearsExperience ?? 0,

    // Branding
    primaryColor: raw.primaryColor ?? '#0ea5e9',
    accentColor: raw.accentColor ?? '#f97316',
    logoUrl: raw.logoUrl ?? undefined,

    // Content
    headline: raw.headline ?? 'Your Mortgage, Done Right.',
    subheadline:
      raw.subheadline ??
      raw.bio ??
      `${name} is a licensed mortgage loan officer committed to helping you find the right loan.`,
    bio: raw.bio ?? '',
    loanProducts: raw.loanProducts ?? DEFAULT_LOAN_PRODUCTS,
    testimonials: raw.testimonials ?? DEFAULT_TESTIMONIALS,
    differentiators: raw.differentiators ?? DEFAULT_DIFFERENTIATORS,

    // Tier / upsells
    plan: raw.plan ?? 'free',
    marketDataEnabled: raw.marketDataEnabled ?? false,
    seoArticlesEnabled: raw.seoArticlesEnabled ?? false,
    seoTier: raw.seoTier,
    targetGeos: raw.targetGeos,
    targetTopics: raw.targetTopics,
    teamMembers: raw.teamMembers,
  }
}

// ---------------------------------------------------------------------------
// Default fallback values
// ---------------------------------------------------------------------------

const DEFAULT_LOAN_PRODUCTS: LOProfile['loanProducts'] = [
  { id: 'purchase', name: 'Home Purchase', description: "Buying your first home or upgrading? We'll find the right loan.", icon: 'home' },
  { id: 'refinance', name: 'Refinance', description: 'Lower your rate, shorten your term, or pull cash out.', icon: 'refinance' },
  { id: 'investment', name: 'DSCR Investment Loans', description: 'Grow your rental portfolio without W2 income requirements.', icon: 'investment' },
  { id: 'fha', name: 'FHA & Low Down Payment', description: '3–3.5% down payment options for eligible buyers.', icon: 'dollar' },
]

const DEFAULT_TESTIMONIALS: LOProfile['testimonials'] = [
  { id: 't1', author: 'Sarah M.', rating: 5, text: 'Made the homebuying process so smooth. Closed in 28 days.', date: 'Phoenix, AZ' },
  { id: 't2', author: 'James & Linda T.', rating: 5, text: 'We were first-time buyers and nervous. Our LO walked us through every step.', date: 'Scottsdale, AZ' },
  { id: 't3', author: 'Mike R.', rating: 5, text: 'Used them for my third DSCR loan. They know the investor side better than anyone.', date: 'Mesa, AZ' },
]

const DEFAULT_DIFFERENTIATORS: string[] = [
  'Local market expertise with years of experience',
  'Investor-friendly: DSCR, LLC lending, portfolio strategies',
  'Direct access to your loan officer — not a call center',
  'Fast closings: 21–30 days for most purchases',
  'Competitive rates across 50+ loan programs',
]

// ---------------------------------------------------------------------------
// Static fallback (for local dev or when API is unreachable)
// ---------------------------------------------------------------------------

export function getStaticFallbackProfile(): LOProfile {
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
    subheadline: `${name} is a licensed mortgage loan officer. Whether you're buying your first home or growing a rental portfolio, we'll get you to the closing table.`,
    bio: '',
    loanProducts: DEFAULT_LOAN_PRODUCTS,
    testimonials: DEFAULT_TESTIMONIALS,
    differentiators: DEFAULT_DIFFERENTIATORS,
    plan: 'free',
    marketDataEnabled: false,
    seoArticlesEnabled: false,
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch an LOProfile from the LoanGraphs REST API.
 *
 * Falls back to:
 *  1. `public/lo-profile.json` (served as /lo-profile.json) — populated by local dev
 *  2. Static env-var fallback via `getStaticFallbackProfile()`
 *
 * @param loId  The LO's slug or ID in LoanGraphs (defaults to LO_ID env var)
 */
export async function getLOProfile(
  loId: string = process.env.LO_ID ?? ''
): Promise<LOProfile> {
  if (!loId) {
    console.warn('[loangraphs-client] LO_ID not set — using static fallback')
    return getStaticFallbackProfile()
  }

  // Fetch profile + social links in parallel
  const [rawProfile, rawLinks] = await Promise.all([
    apiFetch<ApiLOProfile>(`/${loId}/loan-officer/get-owner`),
    apiFetch<ApiSocialLinks>(`/${loId}/loan-officer/social-media-links`),
  ])

  if (rawProfile) {
    return mapToLOProfile(rawProfile, rawLinks ?? {})
  }

  // API unavailable — fall back to static JSON if it exists
  try {
    const staticRes = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/lo-profile.json`,
      { cache: 'no-store' }
    )
    if (staticRes.ok) {
      const staticData = (await staticRes.json()) as Partial<LOProfile>
      return { ...getStaticFallbackProfile(), ...staticData }
    }
  } catch {
    // /lo-profile.json not present — fall through to env-var fallback
  }

  return getStaticFallbackProfile()
}

// ---------------------------------------------------------------------------
// Lead submission
// ---------------------------------------------------------------------------

export interface LeadPayload {
  loId: string
  name: string
  email: string
  phone: string
  loanType: string
  message?: string
  consent: boolean
}

/**
 * Forward a lead to the LoanGraphs leads API.
 * Call this from the Next.js API route (server-side only).
 */
export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const leadsKey = process.env.LOANGRAPHS_LEADS_API_KEY ?? API_KEY
  const loId = payload.loId || (process.env.LO_ID ?? '')

  try {
    const res = await fetch(`${API_BASE}/${loId}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${leadsKey}`,
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        loanType: payload.loanType,
        message: payload.message,
        consent: payload.consent,
        source: 'lo-website',
      }),
      // NOTE: This endpoint doesn't exist yet in LoanGraphs — using stub.
      // Alex will wire the real endpoint. Until then, the route returns 200 for any valid payload.
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error(`[loangraphs-client] leads API error ${res.status}:`, body)
      return { ok: false, error: `Upstream error ${res.status}` }
    }

    return { ok: true }
  } catch (err) {
    console.error('[loangraphs-client] leads submit error:', err)
    return { ok: false, error: 'Network error' }
  }
}
