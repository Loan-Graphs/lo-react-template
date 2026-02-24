'use client'

import type { WizardState } from '@/lib/wizard'

interface Props {
  state: WizardState
  onChange: (u: Partial<WizardState>) => void
}

const TIERS = [
  { key: 'minimum' as const, name: 'Minimum', price: '$499/yr', cadence: 'Every 2 weeks', count: '26 articles/year', perArticle: '~$19 each', highlight: false },
  { key: 'standard' as const, name: 'Standard', price: '$799/yr', cadence: 'Weekly', count: '52 articles/year', perArticle: '~$15 each', highlight: true },
  { key: 'elite' as const, name: 'Elite', price: '$1,299/yr', cadence: '2× per week', count: '104 articles/year', perArticle: '~$12.50 each', highlight: false },
]

export default function StepSEO({ state, onChange }: Props) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700 }}>
          UPSELL — from $499/year
        </span>
      </div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
        Done-For-You SEO Articles
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        AI-researched + written articles published to your blog on a set schedule. Every article is geo-targeted to your markets and includes your CTA.
      </p>

      {/* Sample article preview */}
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#f8fafc' }}>
        <p style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>Sample Article</p>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
          First-Time Buyer Guide: Getting Pre-Approved in {state.licenseStates[0] ? `${state.licenseStates[0]}` : 'Your Market'} (2026)
        </h3>
        <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5 }}>
          1,400-word guide covering local rates, down payment programs, and step-by-step pre-approval. Ends with a CTA to contact {state.name || 'you'} directly.
        </p>
        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['Geo-targeted', 'Internal links', 'Hero image', 'Schema markup', '14-day review window'].map((tag) => (
            <span key={tag} style={{ fontSize: '0.65rem', backgroundColor: '#eff6ff', color: '#1a56db', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Tier cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {TIERS.map((t) => {
          const selected = state.seoTier === t.key
          return (
            <button
              key={t.key}
              onClick={() => onChange({ seoTier: selected ? 'none' : t.key })}
              style={{
                textAlign: 'left',
                padding: '0.875rem',
                border: `2px solid ${selected ? '#1a56db' : t.highlight ? '#93c5fd' : '#e2e8f0'}`,
                borderRadius: '0.75rem',
                backgroundColor: selected ? '#eff6ff' : t.highlight ? '#f0f9ff' : '#fff',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {t.highlight && (
                <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1a56db', color: '#fff', fontSize: '0.6rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                  Most Popular
                </div>
              )}
              {selected && <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', width: '18px', height: '18px', backgroundColor: '#1a56db', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#fff' }}>✓</div>}
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.25rem' }}>{t.name}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a56db', marginBottom: '0.35rem' }}>{t.price}</div>
              <div style={{ fontSize: '0.7rem', color: '#374151', marginBottom: '0.15rem' }}>{t.cadence}</div>
              <div style={{ fontSize: '0.7rem', color: '#374151', marginBottom: '0.15rem' }}>{t.count}</div>
              <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{t.perArticle}</div>
            </button>
          )
        })}
      </div>

      {!state.seoTier || state.seoTier === 'none' ? (
        <button
          onClick={() => {}}
          style={{ backgroundColor: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer', fontSize: '0.78rem', padding: 0 }}
        >
          Skip for now — I can add SEO articles from my dashboard later
        </button>
      ) : (
        <button
          onClick={() => onChange({ seoTier: 'none' })}
          style={{ backgroundColor: 'transparent', color: '#64748b', border: 'none', cursor: 'pointer', fontSize: '0.78rem', textDecoration: 'underline', padding: 0 }}
        >
          Remove SEO Articles from my plan
        </button>
      )}
    </div>
  )
}
