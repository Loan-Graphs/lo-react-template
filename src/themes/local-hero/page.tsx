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

/** Organic leaf SVG icon for Local Hero badge */
function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={{ width: 14, height: 14, fill: '#5a7a4e', flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M17 8C8 10 5.9 16.17 3.82 19.65A2 2 0 0 0 5.5 22.5a2 2 0 0 0 1.73-1l.38-.69C8.72 18.5 13 17 21 21c0-8-2-13-4-13z" />
    </svg>
  )
}

export default async function LocalHeroPage() {
  const loProfile = await getProfile()
  const headersList = await headers()
  const visitorState = headersList.get('x-visitor-region') ?? undefined

  const geoAwareCTA = <GeoAwareCTA loProfile={loProfile} visitorState={visitorState} />

  return (
    <div className="theme-local-hero">
      {/* Community lender badge — Local Hero signature touch */}
      <div
        style={{
          backgroundColor: '#faf5ef',
          borderBottom: '1px solid #e8dece',
          padding: '0.6rem 1rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className="local-hero-badge">
          <LeafIcon />
          Your Local Lender · Serving This Community Since{' '}
          {new Date().getFullYear() - loProfile.yearsExperience}
        </div>
      </div>

      <HeroSection loProfile={loProfile} geoAwareCTA={geoAwareCTA} />

      <SocialProofBar loProfile={loProfile} />

      <LoanProducts loProfile={loProfile} />

      <WhyMeSection loProfile={loProfile} />

      <HowItWorks loProfile={loProfile} />

      <UpsellGate feature="market-data" loProfile={loProfile}>
        <MarketRatesWidget loProfile={loProfile} />
      </UpsellGate>

      <TestimonialCarousel loProfile={loProfile} />

      <AboutSection loProfile={loProfile} />

      <LeadCaptureForm loProfile={loProfile} geoAwareCTA={geoAwareCTA} />

      <UpsellGate feature="seo-articles" loProfile={loProfile}>
        <BlogResources loProfile={loProfile} />
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
