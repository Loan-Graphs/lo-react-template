import { notFound } from 'next/navigation'
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
import type { LOProfile, TeamMember } from '@/types/lo-profile'
import { headers } from 'next/headers'

interface TeamMemberPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Build a per-member LOProfile by merging team-level defaults
 * with the individual TeamMember's data.
 */
function buildMemberProfile(member: TeamMember, teamProfile: LOProfile): LOProfile {
  return {
    ...teamProfile,
    name: member.name,
    title: member.title,
    nmls: member.nmls,
    photo: member.photo,
    bio: member.bio,
    phone: member.phone ?? teamProfile.phone,
    email: member.email ?? teamProfile.email,
    loanProducts: member.loanProducts ?? teamProfile.loanProducts,
    testimonials: member.testimonials ?? teamProfile.testimonials,
    differentiators: member.differentiators ?? teamProfile.differentiators,
    headline: `Work With ${member.name}`,
    subheadline: member.specialty
      ? `${member.title} specializing in ${member.specialty}`
      : member.title,
  }
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug } = await params
  const teamProfile = await getProfile()
  const teamMembers = teamProfile.teamMembers ?? []

  const member = teamMembers.find((m) => m.slug === slug)
  if (!member) notFound()

  const loProfile = buildMemberProfile(member, teamProfile)

  const headersList = await headers()
  const visitorState = headersList.get('x-visitor-region') ?? undefined
  const geoAwareCTA = <GeoAwareCTA loProfile={loProfile} visitorState={visitorState} />

  return (
    <div
      style={{
        '--color-primary': teamProfile.primaryColor,
        '--color-accent': teamProfile.accentColor,
      } as React.CSSProperties}
    >
      {/* Back to team link */}
      <div
        style={{
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          padding: '0.6rem 1rem',
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <a
            href="/team"
            style={{
              fontSize: '0.8rem',
              color: '#64748b',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            ← Back to {teamProfile.company || 'the team'}
          </a>
        </div>
      </div>

      <HeroSection loProfile={loProfile} geoAwareCTA={geoAwareCTA} />

      <SocialProofBar loProfile={loProfile} />

      <LoanProducts loProfile={loProfile} />

      <WhyMeSection loProfile={loProfile} />

      <HowItWorks loProfile={loProfile} />

      <UpsellGate feature="market-data" loProfile={teamProfile}>
        <MarketRatesWidget loProfile={loProfile} />
      </UpsellGate>

      <TestimonialCarousel loProfile={loProfile} />

      <AboutSection loProfile={loProfile} />

      <LeadCaptureForm loProfile={loProfile} geoAwareCTA={geoAwareCTA} />

      <UpsellGate feature="seo-articles" loProfile={teamProfile}>
        <BlogResources loProfile={loProfile} />
      </UpsellGate>

      <LOFooter loProfile={loProfile} geoAwareCTA={geoAwareCTA} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: member.name,
            jobTitle: member.title,
            telephone: member.phone ? `+1${member.phone.replace(/\D/g, '')}` : undefined,
            email: member.email || undefined,
            worksFor: {
              '@type': 'Organization',
              name: teamProfile.company || teamProfile.name,
            },
          }),
        }}
      />
    </div>
  )
}

export async function generateMetadata({ params }: TeamMemberPageProps) {
  const { slug } = await params
  const teamProfile = await getProfile()
  const member = teamProfile.teamMembers?.find((m) => m.slug === slug)

  if (!member) return {}

  return {
    title: `${member.name} | ${member.title}`,
    description: `Work with ${member.name}, ${member.title}${member.nmls ? ` NMLS# ${member.nmls}` : ''}.${member.specialty ? ` Specializing in ${member.specialty}.` : ''}`,
  }
}
