// NOTE: API endpoint assumptions (to be verified against live LoanGraphs API):
//   GET /{slug}/loan-officer/get-owner   → profile object
//   GET /{slug}/loan-officer/social-media-links → links object (applyUrl, etc.)
// Field names assumed: displayName, name, nmls, title, phone, email, licensedStates,
// headshotUrl, company, bio, applyUrl/apply_url, licensed_states, headshot_url

const LOANGRAPHS_API =
  process.env.LOANGRAPHS_API ?? 'https://app.loangraphs.com/api'

export interface LOProfile {
  name: string
  nmls: string
  title: string
  phone: string
  email: string
  applyUrl: string
  states: string[]
  headshotUrl?: string
  company?: string
  bio?: string
}

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
      return {
        name: profile.displayName ?? profile.name ?? 'Loan Officer',
        nmls: profile.nmls ?? '',
        title: profile.title ?? 'Licensed Mortgage Professional',
        phone: profile.phone ?? '',
        email: profile.email ?? '',
        applyUrl: links.applyUrl ?? links.apply_url ?? '#',
        states: profile.licensedStates ?? profile.licensed_states ?? [],
        headshotUrl: profile.headshotUrl ?? profile.headshot_url,
        company: profile.company ?? '',
        bio: profile.bio ?? '',
      }
    }
  } catch (e) {
    console.error('[loProfile] API error:', e)
  }

  // Static fallback — used in local dev without API
  return {
    name: process.env.NEXT_PUBLIC_LO_NAME ?? 'Your Loan Officer',
    nmls: process.env.NEXT_PUBLIC_LO_NMLS ?? '',
    title: 'Licensed Mortgage Professional',
    phone: process.env.NEXT_PUBLIC_LO_PHONE ?? '',
    email: process.env.NEXT_PUBLIC_LO_EMAIL ?? '',
    applyUrl: process.env.NEXT_PUBLIC_APPLY_URL ?? '#',
    states: (process.env.NEXT_PUBLIC_LO_STATES ?? '')
      .split(',')
      .filter(Boolean),
    company: '',
    bio: '',
  }
}
