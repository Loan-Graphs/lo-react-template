import { Phone, CheckCircle } from 'lucide-react'
import type { LOProfile } from '@/types/lo-profile'
import LeadForm from '@/components/LeadForm'

interface HeroSectionProps {
  loProfile: LOProfile
  geoAwareCTA?: React.ReactNode
}

export default function HeroSection({ loProfile, geoAwareCTA }: HeroSectionProps) {
  const telHref = `tel:${loProfile.phone.replace(/\D/g, '')}`
  const applyHref = loProfile.calendlyUrl || '/apply'
  const statesLabel =
    loProfile.licenseStates.length > 0
      ? loProfile.licenseStates.length === 1
        ? `Serving ${loProfile.licenseStates[0]}`
        : `Licensed in ${loProfile.licenseStates.slice(0, 3).join(', ')}${loProfile.licenseStates.length > 3 ? ' & more' : ''}`
      : 'Licensed Mortgage Professional'

  return (
    <section
      style={{
        background: `linear-gradient(135deg, var(--hero-bg) 0%, var(--hero-bg-end) 50%, var(--hero-bg) 100%)`,
      }}
      className="relative overflow-hidden"
    >
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, color-mix(in srgb, var(--color-primary) 15%, transparent) 0%, transparent 70%)`,
          borderRadius: '50%',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: `color-mix(in srgb, var(--color-primary) 15%, transparent)`,
                border: `1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)`,
                borderRadius: '999px',
                padding: '0.35rem 0.9rem',
                marginBottom: '1.25rem',
              }}
            >
              <span style={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600 }}>
                {statesLabel}
              </span>
            </div>

            <h1
              style={{
                color: 'white',
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                fontFamily: 'var(--font-heading)',
              }}
              className="mb-5"
            >
              {loProfile.headline}
            </h1>

            <p
              style={{ color: 'var(--color-muted-light)', fontSize: '1.1rem', lineHeight: 1.7 }}
              className="mb-8 max-w-xl"
            >
              {loProfile.subheadline}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href={applyHref}
                target={applyHref.startsWith('http') ? '_blank' : undefined}
                rel={applyHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-md)' }}
                className="px-6 py-3 text-white font-bold text-base hover:opacity-90 transition-opacity"
              >
                Get Pre-Approved &rarr;
              </a>
              {loProfile.phone && (
                <a
                  href={telHref}
                  style={{
                    border: `2px solid color-mix(in srgb, var(--color-primary) 50%, transparent)`,
                    color: 'white',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 1.5rem',
                    fontWeight: 600,
                    fontSize: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  <Phone size={16} />
                  {loProfile.phone}
                </a>
              )}
            </div>

            {geoAwareCTA}

            <div className="flex flex-wrap gap-3 mt-4">
              {['No Application Fees', 'Fast 24hr Pre-Approval', 'Dedicated Loan Officer'].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle size={15} style={{ color: 'var(--color-primary)' }} />
                  <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
            }}
          >
            <LeadForm
              title="Get Your Free Quote"
              subtitle="Takes 2 minutes. No credit check until you're ready."
            />
          </div>
        </div>
      </div>
    </section>
  )
}
