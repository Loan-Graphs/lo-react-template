import './theme.css'
import { headers } from 'next/headers'
import Image from 'next/image'
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

export default async function PrestigePage() {
  const loProfile = await getProfile()
  const headersList = await headers()
  const visitorState = headersList.get('x-visitor-region') ?? undefined

  const geoAwareCTA = <GeoAwareCTA loProfile={loProfile} visitorState={visitorState} />

  return (
    <div className="theme-prestige">
      {/* Portrait header — Prestige editorial touch */}
      {loProfile.photo && (
        <div className="prestige-portrait-wrap">
          <div className="prestige-portrait">
            <Image
              src={loProfile.photo}
              alt={loProfile.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="160px"
              priority
            />
          </div>
          <div className="prestige-portrait-name">{loProfile.name}</div>
          <div className="prestige-portrait-nmls">
            {loProfile.title}
            {loProfile.nmls && ` · NMLS# ${loProfile.nmls}`}
          </div>
        </div>
      )}

      <div className="prestige-gold-divider" />

      <HeroSection loProfile={loProfile} geoAwareCTA={geoAwareCTA} />

      <div className="prestige-gold-divider" />

      <SocialProofBar loProfile={loProfile} />

      <div className="prestige-gold-divider" />

      <LoanProducts loProfile={loProfile} />

      <div className="prestige-gold-divider" />

      <WhyMeSection loProfile={loProfile} />

      <div className="prestige-gold-divider" />

      <HowItWorks loProfile={loProfile} />

      <div className="prestige-gold-divider" />

      <UpsellGate feature="market-data" loProfile={loProfile}>
        <MarketRatesWidget loProfile={loProfile} />
        <div className="prestige-gold-divider" />
      </UpsellGate>

      <TestimonialCarousel loProfile={loProfile} />

      <div className="prestige-gold-divider" />

      <AboutSection loProfile={loProfile} />

      <div className="prestige-gold-divider" />

      <LeadCaptureForm loProfile={loProfile} geoAwareCTA={geoAwareCTA} />

      <UpsellGate feature="seo-articles" loProfile={loProfile}>
        <div className="prestige-gold-divider" />
        <BlogResources loProfile={loProfile} />
      </UpsellGate>

      <div className="prestige-gold-divider" />

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
