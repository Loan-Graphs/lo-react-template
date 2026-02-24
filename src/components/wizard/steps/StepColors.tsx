'use client'

import type { WizardState } from '@/lib/wizard'

interface Props {
  state: WizardState
  onChange: (u: Partial<WizardState>) => void
}

const PRIMARY_SWATCHES = [
  '#0ea5e9', '#1a56db', '#7c3aed', '#0f172a', '#059669',
  '#c4622d', '#0a1628', '#c9a227', '#1e3a5f', '#dc2626',
]

const ACCENT_SWATCHES = [
  '#f97316', '#00ff88', '#fbbf24', '#c9a227', '#5a7a4e',
  '#0ea5e9', '#ec4899', '#10b981', '#a78bfa', '#ef4444',
]

function ColorPicker({
  label,
  value,
  onChange,
  swatches,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  swatches: string[]
  hint: string
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '48px',
            height: '48px',
            padding: '2px',
            border: '2px solid #e2e8f0',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            backgroundColor: '#fff',
          }}
        />
        <div>
          <div
            style={{
              width: '120px',
              height: '32px',
              backgroundColor: value,
              borderRadius: '0.375rem',
              border: '1px solid rgba(0,0,0,0.1)',
              marginBottom: '0.25rem',
            }}
          />
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>{value}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.5rem' }}>
        {swatches.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            title={s}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: s,
              border: value === s ? '3px solid #1a56db' : '2px solid rgba(0,0,0,0.12)',
              cursor: 'pointer',
              padding: 0,
              transition: 'transform 0.1s',
              transform: value === s ? 'scale(1.2)' : 'scale(1)',
            }}
          />
        ))}
      </div>
      <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{hint}</p>
    </div>
  )
}

export default function StepColors({ state, onChange }: Props) {
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
        Brand colors
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        These colors drive your CTA buttons, section accents, and link colors. See the preview update live.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <ColorPicker
          label="Primary Color"
          value={state.primaryColor}
          onChange={(v) => onChange({ primaryColor: v })}
          swatches={PRIMARY_SWATCHES}
          hint="Used for buttons, navigation highlights, and key section backgrounds."
        />
        <ColorPicker
          label="Accent Color"
          value={state.accentColor}
          onChange={(v) => onChange({ accentColor: v })}
          swatches={ACCENT_SWATCHES}
          hint="Used for badges, icon accents, and secondary CTAs."
        />
      </div>

      {/* Live color preview */}
      <div style={{ marginTop: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
          Preview
        </label>
        <div
          style={{
            borderRadius: '0.75rem',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ backgroundColor: state.primaryColor, padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem' }}>Get Pre-Approved</span>
            <span style={{ backgroundColor: state.accentColor, color: '#0f172a', padding: '0.3rem 0.75rem', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: 700 }}>
              Apply Now
            </span>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '0.75rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: `${state.primaryColor}22`, borderRadius: '0.375rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: state.primaryColor, fontSize: '1rem' }}>$</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>Loan Products</div>
              <div style={{ color: state.primaryColor, fontSize: '0.7rem', fontWeight: 600 }}>View all programs →</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
