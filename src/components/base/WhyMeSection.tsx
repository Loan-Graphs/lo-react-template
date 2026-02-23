import { CheckCircle, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import type { LOProfile } from '@/types/lo-profile'

interface WhyMeSectionProps {
  loProfile: LOProfile
}

export default function WhyMeSection({ loProfile }: WhyMeSectionProps) {
  const firstName = loProfile.name.split(' ')[0]
  const telHref = `tel:${loProfile.phone.replace(/\D/g, '')}`

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              style={{ color: 'var(--color-foreground)', fontSize: '1.875rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}
              className="mb-3"
            >
              Why Work With {firstName}?
            </h2>
            <p style={{ color: 'var(--color-muted)' }} className="mb-8">
              Here&apos;s why borrowers choose {loProfile.name} and keep coming back.
            </p>
            <ul className="space-y-3">
              {loProfile.differentiators.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#374151' }}>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-4">
              <Link
                href="/about"
                style={{ backgroundColor: 'var(--hero-bg)' }}
                className="px-5 py-2.5 text-white font-semibold rounded-lg text-sm hover:opacity-80 transition-opacity"
              >
                About {firstName}
              </Link>
              <Link
                href="/contact"
                style={{ border: '2px solid var(--color-primary)', color: 'var(--color-primary)' }}
                className="px-5 py-2.5 font-semibold rounded-lg text-sm hover:opacity-80 transition-opacity"
              >
                Schedule a Call
              </Link>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--hero-bg)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              color: 'white',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Ready to get started?
            </h3>
            <p style={{ color: 'var(--color-muted-light)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Reach out directly. {firstName} answers the phone and replies promptly.
            </p>
            <div className="space-y-4">
              {loProfile.phone && (
                <a
                  href={telHref}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1rem',
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  <Phone size={18} />
                  Call: {loProfile.phone}
                </a>
              )}
              {loProfile.email && (
                <a
                  href={`mailto:${loProfile.email}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#cbd5e1',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  <Mail size={16} />
                  {loProfile.email}
                </a>
              )}
            </div>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem', marginTop: '1.25rem' }}>
              {loProfile.company || 'Licensed Mortgage Professional'}
              {loProfile.nmls ? ` · NMLS# ${loProfile.nmls}` : ''}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
