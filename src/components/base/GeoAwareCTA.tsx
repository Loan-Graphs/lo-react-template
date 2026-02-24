'use client'

/**
 * GeoAwareCTA.tsx
 * Geo-aware call-to-action button that opens the LeadForm in a modal overlay.
 *
 * - When the visitor's state is licensed: personalised "Get your {state} pre-approval" CTA
 * - When state is unknown: generic "Get pre-approved today" CTA
 * - When not licensed in visitor's state: referral link (no modal)
 */

import { useState } from 'react'
import { MapPin, X } from 'lucide-react'
import Link from 'next/link'
import type { LOProfile } from '@/types/lo-profile'
import LeadForm from '@/components/lead-form/LeadForm'

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

// ---------------------------------------------------------------------------
// Modal wrapper
// ---------------------------------------------------------------------------

function LeadFormModal({
  isOpen,
  onClose,
  primaryColor,
}: {
  isOpen: boolean
  onClose: () => void
  primaryColor?: string
}) {
  if (!isOpen) return null

  return (
    /* Backdrop */
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contact form"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: 'rgba(0,0,0,0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '0.875rem',
          padding: '1.75rem',
          width: '100%',
          maxWidth: '440px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '0.875rem',
            right: '0.875rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6b7280',
            padding: '0.25rem',
            lineHeight: 1,
          }}
        >
          <X size={20} />
        </button>

        <LeadForm primaryColor={primaryColor} onSuccess={onClose} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function GeoAwareCTA({ loProfile, visitorState }: GeoAwareCTAProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const primaryColor = loProfile.primaryColor ?? 'var(--color-primary, #0ea5e9)'

  // Not licensed in visitor's state — referral link only, no lead form
  if (visitorState && !loProfile.licenseStates.includes(visitorState)) {
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

  const stateName = visitorState ? (STATE_NAMES[visitorState] ?? visitorState) : null
  const label = stateName
    ? `Get your ${stateName} pre-approval now →`
    : 'Get pre-approved today →'

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: primaryColor,
          fontWeight: 600,
          fontSize: '0.9rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
        }}
        className="hover:underline"
        aria-haspopup="dialog"
      >
        <MapPin size={14} />
        {label}
      </button>

      <LeadFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        primaryColor={primaryColor}
      />
    </>
  )
}
