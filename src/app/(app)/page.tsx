import { headers } from 'next/headers'
import { getProfile } from '@/lib/profileContext'
import { getSlugFromRequest } from '@/lib/subdomain'
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
import CustomizationRequestForm from '@/components/CustomizationRequestForm'
import { getTemplateById } from '@/templates'
import type { LoanOfficer, Company } from '@/templates/types'

export default async function HomePage() {
  const loProfile = await getProfile()
  const loSlug = await getSlugFromRequest()
  const headersList = await headers()
  const visitorState = headersList.get('x-visitor-region') ?? undefined

  // If the LO has a registered template_id, render that template design
  const TemplateComponent = getTemplateById(loProfile.templateId)

  if (TemplateComponent) {
    const loanOfficer: LoanOfficer = {
      ...loProfile,
      licensedStates: loProfile.licenseStates ?? [],
      loanTypes: ['Purchase', 'Refinance', 'DSCR', 'FHA'],
      certifications: [],
      yearsInIndustry: loProfile.yearsExperience ?? 0,
    }
    const company: Company = {
      name: loProfile.company ?? '',
      logo: loProfile.logoUrl ?? '',
      phone: loProfile.phone ?? '',
      email: loProfile.email ?? '',
      website: '',
      about: '',
      foundedYear: 2020,
      loanOfficers: [],
      offices: [],
    }
    return <TemplateComponent loanOfficer={loanOfficer} company={company} blogPosts={[]} />
  }

  // Default base-component layout (fallback when no template_id or unrecognized id)
  return (
    <div
      style={{
        '--color-primary': loProfile.primaryColor,
        '--color-accent': loProfile.accentColor,
      } as React.CSSProperties}
    >
      <HeroSection
        loProfile={loProfile}
        geoAwareCTA={<GeoAwareCTA loProfile={loProfile} visitorState={visitorState} />}
      />
      <SocialProofBar loProfile={loProfile} />
      <LoanProducts loProfile={loProfile} />
      <WhyMeSection loProfile={loProfile} />
      <HowItWorks loProfile={loProfile} />
      <UpsellGate feature="market-data" loProfile={loProfile}>
        <MarketRatesWidget loProfile={loProfile} />
      </UpsellGate>
      <TestimonialCarousel loProfile={loProfile} />
      <AboutSection loProfile={loProfile} />
      <LeadCaptureForm
        loProfile={loProfile}
        geoAwareCTA={<GeoAwareCTA loProfile={loProfile} visitorState={visitorState} />}
      />
      <UpsellGate feature="seo-articles" loProfile={loProfile}>
        <BlogResources loProfile={loProfile} />
      </UpsellGate>
      <CustomizationRequestForm loProfile={loProfile} loSlug={loSlug} />
      <LOFooter
        loProfile={loProfile}
        geoAwareCTA={<GeoAwareCTA loProfile={loProfile} visitorState={visitorState} />}
      />

      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['LocalBusiness', 'FinancialService'],
            name: `${loProfile.name} — Mortgage Loan Officer`,
            description: `Licensed mortgage loan officer specializing in home purchase, refinance, and investment loans.`,
            telephone: loProfile.phone ? `+1${loProfile.phone.replace(/\D/g, '')}` : undefined,
            email: loProfile.email || undefined,
            employee: {
              '@type': 'Person',
              name: loProfile.name,
              jobTitle: loProfile.title || 'Mortgage Loan Officer',
              telephone: loProfile.phone ? `+1${loProfile.phone.replace(/\D/g, '')}` : undefined,
              email: loProfile.email || undefined,
            },
          }),
        }}
      />
    </div>
  )
}
