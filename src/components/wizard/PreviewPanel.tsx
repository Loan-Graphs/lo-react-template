'use client'

import { useState } from 'react'
import type { WizardState } from '@/lib/wizard'

interface PreviewPanelProps {
  state: WizardState
}

const THEME_BACKGROUNDS: Record<string, { hero: string; heroBg: string; textColor: string; cardBg: string }> = {
  prestige: { hero: 'linear-gradient(135deg, #0a1628, #0d1f3c)', heroBg: '#0a1628', textColor: '#f8f4eb', cardBg: '#0d1f3c' },
  'local-hero': { hero: 'linear-gradient(135deg, #faf5ef, #f0e8dc)', heroBg: '#faf5ef', textColor: '#2d1f14', cardBg: '#fff8f2' },
  'modern-edge': { hero: 'linear-gradient(135deg, #0a0a0a, #111111)', heroBg: '#0a0a0a', textColor: '#f0f0f0', cardBg: '#1a1a1a' },
  'trust-builder': { hero: 'linear-gradient(135deg, #ffffff, #f8fafc)', heroBg: '#ffffff', textColor: '#0f172a', cardBg: '#f8fafc' },
  'team-page': { hero: 'linear-gradient(135deg, #1e3a5f, #152d4a)', heroBg: '#1e3a5f', textColor: '#ffffff', cardBg: '#f8fafc' },
  nathan: { hero: 'linear-gradient(135deg, #0f172a, #1e293b)', heroBg: '#0f172a', textColor: '#ffffff', cardBg: '#f8fafc' },
}

export default function PreviewPanel({ state }: PreviewPanelProps) {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop')

  const theme = THEME_BACKGROUNDS[state.templateKey] ?? THEME_BACKGROUNDS['nathan']
  const primary = state.primaryColor || '#0ea5e9'
  const accent = state.accentColor || '#f97316'
  const displayName = state.name || 'Your Name'
  const headline = state.headline || 'Your Headline Goes Here'
  const isMobile = viewport === 'mobile'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#0f172a',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
      }}
    >
      {/* Preview chrome bar */}
      <div
        style={{
          backgroundColor: '#1e293b',
          padding: '0.5rem 0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: '5px' }}>
          {['#ff5f57', '#ffbd2e', '#28c840'].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: '#0f172a',
            borderRadius: '4px',
            padding: '2px 8px',
            fontSize: '0.65rem',
            color: '#64748b',
            textAlign: 'center',
          }}
        >
          {state.subdomain || 'yourname'}.loangraphs.com
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {(['desktop', 'mobile'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setViewport(v)}
              style={{
                padding: '2px 8px',
                fontSize: '0.65rem',
                fontWeight: 600,
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: viewport === v ? '#1a56db' : 'transparent',
                color: viewport === v ? '#fff' : '#64748b',
                transition: 'all 0.15s',
              }}
            >
              {v === 'desktop' ? '⬛' : '📱'}
            </button>
          ))}
        </div>
      </div>

      {/* Preview viewport */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          padding: isMobile ? '8px' : '0',
          backgroundColor: '#0f172a',
        }}
      >
        <div
          style={{
            width: isMobile ? '375px' : '100%',
            transform: isMobile ? 'none' : 'none',
            transition: 'width 0.3s ease',
            '--preview-primary': primary,
            '--preview-accent': accent,
          } as React.CSSProperties}
        >
          {/* Mock Navbar */}
          <div
            style={{
              backgroundColor: theme.heroBg,
              borderBottom: `1px solid ${theme.textColor === '#ffffff' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
              padding: '0.6rem 1.2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ color: primary, fontWeight: 800, fontSize: '0.85rem' }}>
              {displayName}
            </span>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['Home', 'About', 'Contact'].map((l) => (
                <span key={l} style={{ color: theme.textColor, fontSize: '0.65rem', opacity: 0.7 }}>
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Hero section */}
          <div
            style={{
              background: theme.hero,
              padding: isMobile ? '1.5rem 1rem' : '2.5rem 1.5rem',
            }}
          >
            {/* Licensed badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: `${primary}22`,
                border: `1px solid ${primary}44`,
                borderRadius: '999px',
                padding: '2px 10px',
                marginBottom: '0.6rem',
              }}
            >
              <span style={{ color: primary, fontSize: '0.6rem', fontWeight: 600 }}>
                {state.licenseStates.length > 0
                  ? `Licensed in ${state.licenseStates.slice(0, 3).join(', ')}`
                  : 'Licensed Mortgage Professional'}
              </span>
            </div>

            <h1
              style={{
                color: theme.textColor,
                fontSize: isMobile ? '1.1rem' : '1.4rem',
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: '0.5rem',
                maxWidth: '320px',
              }}
            >
              {headline}
            </h1>
            <p
              style={{
                color: `${theme.textColor}99`,
                fontSize: '0.7rem',
                lineHeight: 1.5,
                marginBottom: '0.75rem',
                maxWidth: '280px',
              }}
            >
              {state.name
                ? `Work with ${state.name} — your trusted local mortgage expert.`
                : 'Your subheadline appears here — personalized to your market.'}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div
                style={{
                  backgroundColor: primary,
                  color: '#fff',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '4px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                }}
              >
                Get Pre-Approved →
              </div>
              {state.phone && (
                <div
                  style={{
                    border: `1px solid ${theme.textColor}44`,
                    color: theme.textColor,
                    padding: '0.4rem 0.8rem',
                    borderRadius: '4px',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                  }}
                >
                  {state.phone}
                </div>
              )}
            </div>
          </div>

          {/* Social proof bar */}
          <div style={{ backgroundColor: primary, padding: '0.6rem 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {['5.0★ Rating', '100+ Reviews', '10+ Yrs Exp', '24hr Approval'].map((s) => (
                <div key={s} style={{ textAlign: 'center' }}>
                  <div style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 800 }}>{s.split(' ')[0]}</div>
                  <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.55rem' }}>{s.split(' ').slice(1).join(' ')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Loan products */}
          <div style={{ backgroundColor: theme.cardBg, padding: '1rem 1rem 0.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: theme.textColor === '#f8f4eb' || theme.textColor === '#f0f0f0' ? theme.textColor : '#0f172a', marginBottom: '0.5rem' }}>
              Loan Programs
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '0.4rem' }}>
              {state.loanProducts
                .filter((p) => p.selected)
                .slice(0, 6)
                .map((p) => (
                  <div
                    key={p.id}
                    style={{
                      backgroundColor: theme.heroBg === '#0a1628' || theme.heroBg === '#0a0a0a'
                        ? 'rgba(255,255,255,0.05)'
                        : '#fff',
                      border: `1px solid ${theme.heroBg === '#0a1628' || theme.heroBg === '#0a0a0a' ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                      borderRadius: '4px',
                      padding: '0.4rem',
                    }}
                  >
                    <div style={{ fontSize: '0.6rem', fontWeight: 700, color: primary }}>{p.name}</div>
                    <div style={{ fontSize: '0.55rem', color: '#64748b', lineHeight: 1.3, marginTop: '2px' }}>
                      {p.description.slice(0, 35)}...
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Footer placeholder */}
          <div
            style={{
              backgroundColor: theme.heroBg,
              padding: '0.75rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '0.25rem',
            }}
          >
            <span style={{ color: `${theme.textColor}99`, fontSize: '0.55rem' }}>
              {state.nmls ? `NMLS# ${state.nmls}` : 'NMLS# xxxxxxxx'}
            </span>
            <span style={{ color: `${theme.textColor}99`, fontSize: '0.55rem' }}>
              {state.company || 'Mortgage Company'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
