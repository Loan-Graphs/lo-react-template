import Link from 'next/link'
import { MapPin } from 'lucide-react'
import type { LOProfile } from '@/types/lo-profile'

interface GeoAwareCTAProps {
  loProfile: LOProfile
  visitorState?: string
}

const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  DC: 'District of Columbia',
}

export default function GeoAwareCTA({ loProfile, visitorState }: GeoAwareCTAProps) {
  if (!visitorState) {
    // Unknown state — generic fallback
    return (
      <Link
        href={loProfile.calendlyUrl || '/apply'}
        style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}
        className="inline-flex items-center gap-1.5 hover:underline"
      >
        <MapPin size={14} />
        Get pre-approved today &rarr;
      </Link>
    )
  }

  const isLicensed = loProfile.licenseStates.includes(visitorState)
  const stateName = STATE_NAMES[visitorState] || visitorState

  if (isLicensed) {
    return (
      <Link
        href={loProfile.calendlyUrl || '/apply'}
        style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}
        className="inline-flex items-center gap-1.5 hover:underline"
      >
        <MapPin size={14} />
        Get your {stateName} pre-approval now &rarr;
      </Link>
    )
  }

  // Not licensed in visitor's state
  return (
    <Link
      href="/referral"
      style={{ color: 'var(--color-muted-light)', fontWeight: 600, fontSize: '0.9rem' }}
      className="inline-flex items-center gap-1.5 hover:underline"
    >
      <MapPin size={14} />
      We&apos;re happy to refer you to a licensed loan officer in your state
    </Link>
  )
}
