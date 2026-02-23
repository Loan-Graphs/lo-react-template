import './theme.css'
import { headers } from 'next/headers'
import { getProfile } from '@/lib/profileContext'
import {
  HeroSection,
  SocialProofBar,
  LoanProducts,
  WhyMeSection,
  HowItWorks,
  MarketRatesWidget,
  TestimonialCarousel,
  AboutSection,
  LeadCaptureForm,
  BlogResources,
  LOFooter,
  UpsellGate,
  GeoAwareCTA,
} from '@/components/base'

/** Electric stat ticker — replaces Social Proof Bar visually */
function EdgeStatBar({
  rating,
  reviews,
  years,
}: {
  rating: number
  reviews: number
  years: number
}) {
  const stats = [
    { value: rating > 0 ? `${rating}★` : '5.0★', label: 'Google Rating' },
    { value: reviews > 0 ? `${reviews}+` : '200+', label: 'Funded Loans' },
    { value: years > 0 ? `${years}+` : '10+', label: 'Years Active' },
    { value: '24hr', label: 'Pre-Approval' },
    { value: '$0', label: 'App Fee' },
  ]

  return (
    <div className="edge-stat-bar">
      <div className="edge-stat-bar-inner">
        {stats.map((s) => (
          <div key={s.label} className="edge-stat">
            <span className="edge-stat-value">{s.value}</span>
            <span className="edge-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function ModernEdgePage() {
  const loProfile = await getProfile()
  const headersList = await headers()
  const visitorState = headersList.get('x-visitor-region') ?? undefined

  // Allow LO's accentColor to drive the electric accent if configured
  const electricAccent = loProfile.accentColor?.match(/^#/)
    ? loProfile.accentColor
    : '#00ff88'

  const geoAwareCTA = <GeoAwareCTA loProfile={loProfile} visitorState={visitorState} />

  return (
    <div
      className="theme-modern-edge"
      style={
        {
          '--color-primary': electricAccent,
          '--color-accent': electricAccent,
          '--color-primary-light': `${electricAccent}1a`,
          '--color-primary-dark': electricAccent,
        } as React.CSSProperties
      }
    >
      <HeroSection loProfile={loProfile} geoAwareCTA={geoAwareCTA} />

      {/* Electric stat ticker — aggressive conversion signal */}
      <EdgeStatBar
        rating={loProfile.googleRating}
        reviews={loProfile.reviewCount}
        years={loProfile.yearsExperience}
      />

      <div className="edge-diagonal-top" />
      <SocialProofBar loProfile={loProfile} />
      <div className="edge-diagonal-bottom" />

      <LoanProducts loProfile={loProfile} />

      <div className="edge-diagonal-top" />
      <WhyMeSection loProfile={loProfile} />
      <div className="edge-diagonal-bottom" />

      <HowItWorks loProfile={loProfile} />

      <UpsellGate feature="market-data" loProfile={loProfile}>
        <div className="edge-diagonal-top" />
        <MarketRatesWidget loProfile={loProfile} />
        <div className="edge-diagonal-bottom" />
      </UpsellGate>

      <TestimonialCarousel loProfile={loProfile} />

      <div className="edge-diagonal-top" />
      <AboutSection loProfile={loProfile} />
      <div className="edge-diagonal-bottom" />

      <LeadCaptureForm loProfile={loProfile} geoAwareCTA={geoAwareCTA} />

      <UpsellGate feature="seo-articles" loProfile={loProfile}>
        <div className="edge-diagonal-top" />
        <BlogResources loProfile={loProfile} />
        <div className="edge-diagonal-bottom" />
      </UpsellGate>

      <LOFooter loProfile={loProfile} geoAwareCTA={geoAwareCTA} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['LocalBusiness', 'FinancialService'],
            name: `${loProfile.name} — Mortgage Loan Officer`,
            telephone: loProfile.phone ? `+1${loProfile.phone.replace(/\D/g, '')}` : undefined,
            email: loProfile.email || undefined,
          }),
        }}
      />
    </div>
  )
}
