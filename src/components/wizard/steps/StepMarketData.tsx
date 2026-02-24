'use client'

import type { WizardState } from '@/lib/wizard'

interface Props {
  state: WizardState
  onChange: (u: Partial<WizardState>) => void
}

const SAMPLE_PAGES = [
  'Mortgage Rates in Phoenix, AZ Today',
  'FHA Loan Limits Maricopa County 2026',
  'VA Loan Requirements Scottsdale, AZ',
  'How Much House Can I Afford in Tucson',
  'Austin TX Home Price Trends 2026',
  'Denver CO First-Time Buyer Guide',
]

export default function StepMarketData({ state, onChange }: Props) {
  const stateCount = state.licenseStates.length || 3
  const estimatedPages = Math.min(stateCount * 3_200 * 8, 50_000)
  const formattedPages = estimatedPages.toLocaleString()

  return (
    <div>
      {/* "Upsell" badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span
          style={{
            backgroundColor: '#fef3c7',
            color: '#92400e',
            padding: '2px 8px',
            borderRadius: '999px',
            fontSize: '0.7rem',
            fontWeight: 700,
          }}
        >
          UPSELL — $399/year
        </span>
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
        Market Data SEO Pages
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Automatically generate <strong>up to {formattedPages} hyperlocal SEO pages</strong> from live LoanGraphs market data — one for every city, county, and loan topic in your licensed states.
      </p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {[
          { value: formattedPages, label: 'Estimated Pages', sub: `for ${stateCount} state${stateCount !== 1 ? 's' : ''}` },
          { value: '24hr', label: 'Revalidation', sub: 'Always fresh data' },
          { value: '$399/yr', label: 'Billed Annually', sub: 'No free trial — charged immediately' },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              padding: '0.75rem',
              textAlign: 'center',
              backgroundColor: '#f8fafc',
            }}
          >
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{s.value}</div>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#374151' }}>{s.label}</div>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '2px' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Sample pages */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>
          Sample pages generated for your states:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {SAMPLE_PAGES.map((p) => (
            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#64748b' }}>
              <span style={{ color: '#1a56db' }}>→</span> {p}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <button
          onClick={() => onChange({ marketDataSelected: true })}
          style={{
            padding: '0.875rem',
            backgroundColor: state.marketDataSelected ? '#166534' : '#1a56db',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {state.marketDataSelected ? '✓ Added — Market Data Pages ($399/yr)' : 'Add Market Data Pages — $399/yr →'}
        </button>

        {state.marketDataSelected && (
          <button
            onClick={() => onChange({ marketDataSelected: false })}
            style={{
              backgroundColor: 'transparent',
              color: '#64748b',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.78rem',
              textDecoration: 'underline',
              padding: 0,
              textAlign: 'left',
            }}
          >
            Remove Market Data from my plan
          </button>
        )}

        {!state.marketDataSelected && (
          <button
            onClick={() => onChange({ marketDataSelected: false })}
            style={{
              backgroundColor: 'transparent',
              color: '#94a3b8',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.78rem',
              padding: 0,
              textAlign: 'left',
            }}
          >
            Skip for now — I can add this from my dashboard later
          </button>
        )}
      </div>
    </div>
  )
}
