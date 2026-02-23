'use client'

import type { WizardState } from '@/lib/wizard'

interface Props {
  state: WizardState
  onLaunch: () => void
  launching: boolean
}

const SEO_PRICES: Record<string, string> = { minimum: '$499/yr', standard: '$799/yr', elite: '$1,299/yr' }

export default function StepLaunch({ state, onLaunch, launching }: Props) {
  const checks = [
    { label: 'Template selected', done: !!state.templateKey },
    { label: 'Name & NMLS entered', done: !!(state.name && state.nmls) },
    { label: 'Contact info added', done: !!(state.phone && state.email) },
    { label: 'Headline written', done: !!state.headline },
    { label: 'Licensed states set', done: state.licenseStates.length > 0 },
    { label: 'Loan products chosen', done: state.loanProducts.some((p) => p.selected) },
    { label: 'Domain configured', done: !!(state.subdomain) },
  ]

  const totalPrice =
    (state.marketDataSelected ? 399 : 0) +
    (state.seoTier === 'minimum' ? 499 : state.seoTier === 'standard' ? 799 : state.seoTier === 'elite' ? 1299 : 0)

  const siteUrl = state.useCustomDomain && state.dnsStatus === 'verified' && state.customDomain
    ? `https://${state.customDomain}`
    : `https://${state.subdomain || 'yoursite'}.loangraphs.com`

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
        Review & Launch
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Everything looks good? Hit Launch and your site goes live instantly.
      </p>

      {/* Site URL */}
      <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', marginBottom: '0.25rem' }}>Your site will be live at:</p>
        <p style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{siteUrl}</p>
      </div>

      {/* Checklist */}
      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Site Setup Checklist</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {checks.map((c) => (
            <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
              <span style={{ color: c.done ? '#16a34a' : '#f59e0b', fontWeight: 700, width: '16px', textAlign: 'center' }}>
                {c.done ? '✓' : '○'}
              </span>
              <span style={{ color: c.done ? '#374151' : '#94a3b8' }}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Order summary */}
      {totalPrice > 0 && (
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.25rem', backgroundColor: '#f8fafc' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Order Summary</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#374151' }}>LO Website</span>
              <span style={{ color: '#16a34a', fontWeight: 700 }}>FREE</span>
            </div>
            {state.marketDataSelected && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#374151' }}>Market Data Pages</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>$399/yr</span>
              </div>
            )}
            {state.seoTier && state.seoTier !== 'none' && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#374151' }}>SEO Articles ({state.seoTier})</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>{SEO_PRICES[state.seoTier]}</span>
              </div>
            )}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.35rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
              <span>Total</span>
              <span style={{ color: '#1a56db' }}>${totalPrice.toLocaleString()}/yr</span>
            </div>
          </div>
        </div>
      )}

      {/* Launch button */}
      <button
        onClick={onLaunch}
        disabled={launching}
        style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: launching ? '#64748b' : '#1a56db',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1.05rem',
          fontWeight: 800,
          cursor: launching ? 'not-allowed' : 'pointer',
          transition: 'background 0.15s',
          letterSpacing: '0.01em',
        }}
      >
        {launching ? 'Launching your site...' : 'Launch My Site →'}
      </button>
      <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.5rem', textAlign: 'center' }}>
        You&apos;ll be redirected to your dashboard to manage your site and track performance.
      </p>
    </div>
  )
}
