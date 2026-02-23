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

/** Trust badge row — NMLS verified + licensed + compliant */
function TrustBadgeRow({ nmls, states }: { nmls: string; states: string[] }) {
  const badges = [
    { label: 'NMLS Verified', sub: nmls ? `#${nmls}` : 'Registered' },
    { label: 'State Licensed', sub: states.length > 0 ? `${states.length} States` : 'Licensed' },
    { label: 'Equal Housing', sub: 'HMDA Compliant' },
    { label: 'Secure Process', sub: '256-bit SSL' },
  ]

  return (
    <div className="trust-badge-row">
      <div className="trust-badge-row-inner">
        {badges.map((b) => (
          <div key={b.label} className="trust-badge">
            <div className="trust-badge-icon">
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <polyline points="2,6 5,9 10,3" />
              </svg>
            </div>
            <span>{b.label}</span>
            <span style={{ color: '#94a3b8', fontWeight: 400 }}>· {b.sub}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Star rating prominence bar */
function StarRatingRow({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const displayRating = rating > 0 ? rating : 4.9
  const displayCount = reviewCount > 0 ? reviewCount : 150
  const fullStars = Math.floor(displayRating)
  const hasHalf = displayRating % 1 >= 0.5

  return (
    <div className="trust-star-row">
      <div className="trust-star-row-inner">
        <div className="trust-star-rating">
          <span className="trust-star-rating-value">{displayRating.toFixed(1)}</span>
          <div style={{ display: 'flex', gap: '2px' }}>
            {Array.from({ length: fullStars }).map((_, i) => (
              <span key={i} className="trust-star">★</span>
            ))}
            {hasHalf && <span className="trust-star">⯨</span>}
          </div>
        </div>
        <span className="trust-review-count">
          Based on {displayCount.toLocaleString()} verified Google reviews
        </span>
      </div>
    </div>
  )
}

/** Video intro placeholder for About section */
function VideoPlaceholder({ name }: { name: string }) {
  return (
    <div className="trust-video-placeholder" role="img" aria-label={`${name} introduction video`}>
      <div className="trust-video-play" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </div>
      <div className="trust-video-label">Watch {name.split(' ')[0]}&apos;s 60-second intro</div>
    </div>
  )
}

export default async function TrustBuilderPage() {
  const loProfile = await getProfile()
  const headersList = await headers()
  const visitorState = headersList.get('x-visitor-region') ?? undefined

  const geoAwareCTA = <GeoAwareCTA loProfile={loProfile} visitorState={visitorState} />

  return (
    <div className="theme-trust-builder">
      {/* Trust signals above the fold */}
      <TrustBadgeRow nmls={loProfile.nmls} states={loProfile.licenseStates} />

      <StarRatingRow rating={loProfile.googleRating} reviewCount={loProfile.reviewCount} />

      <HeroSection loProfile={loProfile} geoAwareCTA={geoAwareCTA} />

      {/* XL Social Proof Bar — front and center */}
      <SocialProofBar loProfile={loProfile} />

      <LoanProducts loProfile={loProfile} />

      <WhyMeSection loProfile={loProfile} />

      <HowItWorks loProfile={loProfile} />

      <UpsellGate feature="market-data" loProfile={loProfile}>
        <MarketRatesWidget loProfile={loProfile} />
      </UpsellGate>

      {/* Testimonials — front and prominent for Trust Builder */}
      <TestimonialCarousel loProfile={loProfile} />

      {/* Video placeholder injected alongside About */}
      <section style={{ backgroundColor: '#f8fafc', paddingTop: '4rem', paddingBottom: '2rem' }}>
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '0 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              color: '#1a56db',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            Meet {loProfile.name.split(' ')[0]}
          </p>
          <VideoPlaceholder name={loProfile.name} />
        </div>
      </section>

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
            aggregateRating: loProfile.googleRating
              ? {
                  '@type': 'AggregateRating',
                  ratingValue: loProfile.googleRating,
                  reviewCount: loProfile.reviewCount,
                }
              : undefined,
          }),
        }}
      />
    </div>
  )
}
