import { headers } from 'next/headers'
import { getProfile } from '@/lib/profileContext'
import { GeoAwareCTA } from '@/components/base'

export const revalidate = 86400 // ISR: revalidate every 24 hours

const VALID_TOPICS = [
  'mortgage-rates-today',
  'fha-loan-limits',
  'va-loan-requirements',
  'how-much-can-i-afford',
  'home-price-trends',
] as const

type Topic = (typeof VALID_TOPICS)[number]

const TOPIC_HEADLINES: Record<Topic, (city: string, state: string) => string> = {
  'mortgage-rates-today': (city, state) => `Mortgage Rates in ${city}, ${state} Today`,
  'fha-loan-limits': (city, state) => `FHA Loan Limits in ${city}, ${state}`,
  'va-loan-requirements': (city, state) => `VA Loan Requirements in ${city}, ${state}`,
  'how-much-can-i-afford': (city, state) => `How Much House Can You Afford in ${city}, ${state}?`,
  'home-price-trends': (city, state) => `Home Price Trends in ${city}, ${state}`,
}

const TOPIC_DESCRIPTIONS: Record<Topic, string> = {
  'mortgage-rates-today': 'Compare current mortgage rates and find the best deal for your home purchase or refinance.',
  'fha-loan-limits': 'Learn about FHA loan limits in your area and see if you qualify for an FHA-backed mortgage.',
  'va-loan-requirements': 'Explore VA loan eligibility requirements and benefits for veterans and active-duty service members.',
  'how-much-can-i-afford': 'Calculate how much home you can afford based on your income, debts, and down payment.',
  'home-price-trends': 'Track local home price trends and market conditions to make informed buying decisions.',
}

function formatSlug(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

interface MarketPageProps {
  params: Promise<{
    state: string
    county: string
    city: string
    topic: string
  }>
}

export async function generateMetadata({ params }: MarketPageProps) {
  const { state, county, city, topic } = await params
  const cityName = formatSlug(city)
  const stateName = formatSlug(state)
  const topicKey = topic as Topic
  const headline = TOPIC_HEADLINES[topicKey]?.(cityName, stateName) ?? `${formatSlug(topic)} in ${cityName}, ${stateName}`

  return {
    title: headline,
    description: TOPIC_DESCRIPTIONS[topicKey] ?? `${headline} — local market data and mortgage information for ${formatSlug(county)} County.`,
  }
}

export function generateStaticParams() {
  const states = ['arizona', 'california', 'texas']
  const counties: Record<string, string[]> = {
    arizona: ['maricopa', 'pima'],
    california: ['los-angeles', 'san-diego'],
    texas: ['harris', 'travis'],
  }
  const cities: Record<string, string[]> = {
    maricopa: ['phoenix', 'scottsdale'],
    pima: ['tucson', 'oro-valley'],
    'los-angeles': ['los-angeles', 'pasadena'],
    'san-diego': ['san-diego', 'carlsbad'],
    harris: ['houston', 'katy'],
    travis: ['austin', 'round-rock'],
  }

  const params: { state: string; county: string; city: string; topic: string }[] = []

  for (const state of states) {
    for (const county of counties[state]) {
      for (const city of cities[county]) {
        for (const topic of VALID_TOPICS) {
          params.push({ state, county, city, topic })
        }
      }
    }
  }

  return params
}

export default async function MarketDataPage({ params }: MarketPageProps) {
  const { state, city, topic } = await params
  const loProfile = await getProfile()
  const headersList = await headers()
  const visitorState = headersList.get('x-visitor-region') ?? undefined

  const cityName = formatSlug(city)
  const stateName = formatSlug(state)
  const topicKey = topic as Topic
  const headline = TOPIC_HEADLINES[topicKey]?.(cityName, stateName) ?? `${formatSlug(topic)} in ${cityName}, ${stateName}`
  const description = TOPIC_DESCRIPTIONS[topicKey] ?? ''

  return (
    <div
      style={{
        '--color-primary': loProfile.primaryColor,
        '--color-accent': loProfile.accentColor,
      } as React.CSSProperties}
    >
      {/* Hero / Headline */}
      <section
        style={{ backgroundColor: 'var(--hero-bg)', color: 'white' }}
        className="py-16 md:py-24"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            style={{
              fontSize: '2.25rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              marginBottom: '1rem',
              lineHeight: 1.2,
            }}
          >
            {headline}
          </h1>
          <p style={{ color: 'var(--color-muted-light)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            {description}
          </p>
          <GeoAwareCTA loProfile={loProfile} visitorState={visitorState} />
        </div>
      </section>

      {/* Market Data Placeholder */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            style={{
              backgroundColor: 'var(--section-bg-alt)',
              border: '2px dashed var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '3rem 2rem',
              textAlign: 'center',
            }}
          >
            <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', fontWeight: 500 }}>
              Market data for {cityName}, {stateName} will be displayed here once connected to the LoanGraphs data API.
            </p>
          </div>
        </div>
      </section>

      {/* LO Contact Section */}
      <section style={{ backgroundColor: 'var(--section-bg-alt)' }} className="py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            style={{
              color: 'var(--color-foreground)',
              fontSize: '1.5rem',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)',
              marginBottom: '0.75rem',
            }}
          >
            Questions about {cityName} mortgages?
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            {loProfile.name} — NMLS #{loProfile.nmls} — is here to help you navigate your options.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {loProfile.phone && (
              <a
                href={`tel:${loProfile.phone}`}
                style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.95rem' }}
                className="hover:underline"
              >
                {loProfile.phone}
              </a>
            )}
            {loProfile.email && (
              <a
                href={`mailto:${loProfile.email}`}
                style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.95rem' }}
                className="hover:underline"
              >
                {loProfile.email}
              </a>
            )}
          </div>
          <div className="mt-6">
            <GeoAwareCTA loProfile={loProfile} visitorState={visitorState} />
          </div>
        </div>
      </section>
    </div>
  )
}
