import './theme.css'
import { getProfile } from '@/lib/profileContext'
import { TestimonialCarousel, LOFooter } from '@/components/base'
import TeamMemberCard from './TeamMemberCard'
import LeadForm from '@/components/LeadForm'

export default async function TeamPage() {
  const loProfile = await getProfile()
  const teamMembers = loProfile.teamMembers ?? []

  // Collect all unique NMLS numbers for the footer disclaimer
  const allNmls = [
    loProfile.nmls && `${loProfile.name}: NMLS# ${loProfile.nmls}`,
    ...teamMembers.map((m) => m.nmls && `${m.name}: NMLS# ${m.nmls}`),
  ].filter(Boolean) as string[]

  return (
    <div className="theme-team-page">
      {/* Company hero */}
      <div className="team-hero">
        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          <h1 className="team-hero-company">{loProfile.company || loProfile.name}</h1>
          <p className="team-hero-tagline">
            {loProfile.subheadline ||
              'Our team of licensed mortgage professionals is here to help you find the right loan — fast.'}
          </p>
          <a href="#connect" className="team-hero-cta">
            Connect with Our Team
          </a>
        </div>
      </div>

      {/* Team member grid */}
      {teamMembers.length > 0 && (
        <div className="team-grid-section">
          <div className="team-grid-section-inner">
            <h2 className="team-grid-heading">Meet the Team</h2>
            <p className="team-grid-subheading">
              {teamMembers.length} licensed professionals ready to serve you
            </p>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.slug} member={member} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shared testimonials */}
      {loProfile.testimonials.length > 0 && (
        <TestimonialCarousel loProfile={loProfile} />
      )}

      {/* Connect with our team form */}
      <div id="connect" className="team-contact-section">
        <div className="team-contact-inner">
          <h2 className="team-contact-heading">Connect with Our Team</h2>
          <p className="team-contact-sub">
            Tell us about your goals and we&apos;ll match you with the right loan officer.
          </p>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '2rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 16px rgba(30, 58, 95, 0.06)',
            }}
          >
            <LeadForm
              title=""
              subtitle=""
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <LOFooter loProfile={loProfile} />

      {/* NMLS disclaimer footer */}
      {allNmls.length > 0 && (
        <div className="team-nmls-footer">
          <div className="team-nmls-footer-inner">
            <strong style={{ color: '#64748b' }}>Licensed Team Members:</strong>{' '}
            {allNmls.join(' · ')}
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['LocalBusiness', 'FinancialService'],
            name: loProfile.company || `${loProfile.name} Mortgage Team`,
            employee: [
              {
                '@type': 'Person',
                name: loProfile.name,
                jobTitle: loProfile.title,
              },
              ...teamMembers.map((m) => ({
                '@type': 'Person',
                name: m.name,
                jobTitle: m.title,
              })),
            ],
          }),
        }}
      />
    </div>
  )
}
