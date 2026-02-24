import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import type { LOProfile } from '@/types/lo-profile'

interface LOFooterProps {
  loProfile: LOProfile
  geoAwareCTA?: React.ReactNode
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export default function LOFooter({ loProfile, geoAwareCTA }: LOFooterProps) {
  const telHref = `tel:${loProfile.phone.replace(/\D/g, '')}`
  const year = new Date().getFullYear()
  const firstName = loProfile.name.split(' ')[0]
  const statesLabel =
    loProfile.licenseStates.length > 0
      ? loProfile.licenseStates.slice(0, 5).join(', ') +
        (loProfile.licenseStates.length > 5 ? ' & more' : '')
      : ''

  return (
    <footer style={{ backgroundColor: 'var(--hero-bg)', color: 'var(--color-muted-light)' }}>
      {geoAwareCTA && (
        <div
          style={{
            backgroundColor: 'var(--color-primary)',
            padding: '0.75rem 0',
            textAlign: 'center',
          }}
        >
          {geoAwareCTA}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                style={{ backgroundColor: 'var(--color-primary)' }}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm">
                  {getInitials(loProfile.name)}
                </span>
              </div>
              <div>
                <div className="text-white font-bold text-sm">{loProfile.name}</div>
                <div style={{ color: 'var(--color-primary)' }} className="text-xs">
                  {loProfile.title}
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              {loProfile.bio
                ? loProfile.bio.slice(0, 120) + (loProfile.bio.length > 120 ? '...' : '')
                : `Helping families and investors achieve their real estate goals.`}
            </p>
            {loProfile.nmls && (
              <p className="text-xs">
                {loProfile.company} | NMLS# {loProfile.nmls}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/blog', label: 'Mortgage Blog' },
                { href: '/resources', label: 'Resources' },
                { href: '/apply', label: 'Apply Now' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Loan Programs */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Loan Programs</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/loans/conventional', label: 'Conventional Loans' },
                { href: '/loans/fha', label: 'FHA Loans' },
                { href: '/loans/va', label: 'VA Loans' },
                { href: '/loans/jumbo', label: 'Jumbo Loans' },
                { href: '/calculators/conventional', label: 'Mortgage Calculator' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Contact {firstName}</h3>
            <ul className="space-y-3 text-sm">
              {loProfile.phone && (
                <li>
                  <a href={telHref} className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone size={14} />
                    {loProfile.phone}
                  </a>
                </li>
              )}
              {loProfile.email && (
                <li>
                  <a href={`mailto:${loProfile.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail size={14} />
                    {loProfile.email}
                  </a>
                </li>
              )}
              {statesLabel && (
                <li className="flex items-center gap-2">
                  <MapPin size={14} className="shrink-0" />
                  Licensed in {statesLabel}
                </li>
              )}
            </ul>
            <a
              href={loProfile.calendlyUrl || '/apply'}
              target={loProfile.calendlyUrl?.startsWith('http') ? '_blank' : undefined}
              rel={loProfile.calendlyUrl?.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{ backgroundColor: 'var(--color-primary)' }}
              className="mt-6 inline-block px-5 py-2.5 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Pre-Approved
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          style={{ borderTopColor: 'var(--color-border)' }}
          className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs"
        >
          <p>
            &copy; {year} {loProfile.name} | {loProfile.company || 'Licensed Mortgage Professional'}.
            All rights reserved.{loProfile.nmls ? ` NMLS# ${loProfile.nmls}.` : ''} Equal Housing Lender.
          </p>
          <p className="max-w-md text-right leading-relaxed">
            This is not a commitment to lend. All loans subject to credit approval. Terms and
            conditions apply. Interest rates subject to change.
          </p>
        </div>
      </div>
    </footer>
  )
}
