'use client'

import type { WizardState } from '@/lib/wizard'

interface Props {
  state: WizardState
  onChange: (u: Partial<WizardState>) => void
}

const TEMPLATES = [
  {
    key: 'nathan',
    name: 'Nathan (Base)',
    description: 'Clean, professional blue/white. The reference implementation.',
    target: 'Any LO — safe default',
    heroColor: '#0f172a',
    accent: '#0ea5e9',
    textColor: '#fff',
  },
  {
    key: 'prestige',
    name: 'Prestige',
    description: 'Dark navy + gold luxury. Serif fonts. Editorial layout.',
    target: 'Jumbo / high-net-worth LOs',
    heroColor: '#0a1628',
    accent: '#c9a227',
    textColor: '#f8f4eb',
  },
  {
    key: 'local-hero',
    name: 'Local Hero',
    description: 'Warm terracotta + sage + cream. Community-focused.',
    target: 'Purchase-heavy, community lenders',
    heroColor: '#faf5ef',
    accent: '#c4622d',
    textColor: '#2d1f14',
  },
  {
    key: 'modern-edge',
    name: 'Modern Edge',
    description: 'Bold black + electric accent. Conversion-optimized.',
    target: 'High-volume, DTC LOs',
    heroColor: '#0a0a0a',
    accent: '#00ff88',
    textColor: '#f0f0f0',
  },
  {
    key: 'trust-builder',
    name: 'Trust Builder',
    description: 'Ultra-clean white. Heavy social proof + trust badges.',
    target: 'Newer LOs building credibility',
    heroColor: '#ffffff',
    accent: '#1a56db',
    textColor: '#0f172a',
  },
  {
    key: 'team-page',
    name: 'Team Page',
    description: 'Multi-LO layout. Team grid + individual profile pages.',
    target: 'Branch managers, team leads',
    heroColor: '#1e3a5f',
    accent: '#2563eb',
    textColor: '#ffffff',
  },
]

export default function StepTemplate({ state, onChange }: Props) {
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
        Choose your template
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        All templates share the same structure — they differ only in visual design. You can switch anytime.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        {TEMPLATES.map((t) => {
          const selected = state.templateKey === t.key
          return (
            <button
              key={t.key}
              onClick={() => onChange({ templateKey: t.key })}
              style={{
                textAlign: 'left',
                border: `2px solid ${selected ? '#1a56db' : '#e2e8f0'}`,
                borderRadius: '0.75rem',
                overflow: 'hidden',
                backgroundColor: selected ? '#eff6ff' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.15s',
                boxShadow: selected ? '0 0 0 3px rgba(26,86,219,0.15)' : 'none',
              }}
            >
              {/* Mini color swatch */}
              <div
                style={{
                  height: '80px',
                  background: `linear-gradient(135deg, ${t.heroColor} 60%, ${t.accent} 100%)`,
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '0.5rem 0.75rem',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    color: t.textColor,
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    lineHeight: 1.2,
                  }}
                >
                  {t.name}
                </span>
                {selected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      width: '20px',
                      height: '20px',
                      backgroundColor: '#1a56db',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ color: '#fff', fontSize: '0.65rem' }}>✓</span>
                  </div>
                )}
              </div>
              <div style={{ padding: '0.75rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#0f172a', marginBottom: '0.25rem', fontWeight: 500 }}>
                  {t.description}
                </p>
                <p style={{ fontSize: '0.65rem', color: '#1a56db', fontWeight: 600 }}>
                  Best for: {t.target}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
