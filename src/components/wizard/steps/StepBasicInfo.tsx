'use client'

import { US_STATES } from '@/lib/wizard'
import type { WizardState } from '@/lib/wizard'

interface Props {
  state: WizardState
  onChange: (u: Partial<WizardState>) => void
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  hint?: string
}) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.6rem 0.75rem',
          border: '1px solid #d1d5db',
          borderRadius: '0.5rem',
          fontSize: '0.9rem',
          outline: 'none',
          backgroundColor: '#fff',
          color: '#0f172a',
          boxSizing: 'border-box',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#1a56db')}
        onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
      />
      {hint && <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.25rem' }}>{hint}</p>}
    </div>
  )
}

export default function StepBasicInfo({ state, onChange }: Props) {
  const toggleState = (s: string) => {
    const cur = state.licenseStates
    onChange({
      licenseStates: cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s],
    })
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
        Your information
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        This populates your site automatically. You can update it anytime from your dashboard.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
        <Field label="Full Name" value={state.name} onChange={(v) => onChange({ name: v })} placeholder="Jane Smith" required />
        <Field label="NMLS Number" value={state.nmls} onChange={(v) => onChange({ nmls: v })} placeholder="1234567" hint="Your federal NMLS ID" />
        <Field label="Title / Role" value={state.title} onChange={(v) => onChange({ title: v })} placeholder="Mortgage Loan Officer" />
        <Field label="Company" value={state.company} onChange={(v) => onChange({ company: v })} placeholder="ABC Mortgage" />
        <Field label="Phone" value={state.phone} onChange={(v) => onChange({ phone: v })} placeholder="(555) 000-0000" type="tel" />
        <Field label="Email" value={state.email} onChange={(v) => onChange({ email: v })} placeholder="jane@example.com" type="email" />
      </div>

      {/* Licensed states */}
      <div style={{ marginTop: '0.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
          Licensed States <span style={{ color: '#ef4444' }}>*</span>
          <span style={{ fontWeight: 400, color: '#94a3b8', marginLeft: '0.5rem' }}>
            ({state.licenseStates.length} selected)
          </span>
        </label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(52px, 1fr))',
            gap: '0.3rem',
            maxHeight: '160px',
            overflowY: 'auto',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            padding: '0.5rem',
          }}
        >
          {US_STATES.map((s) => {
            const active = state.licenseStates.includes(s)
            return (
              <button
                key={s}
                onClick={() => toggleState(s)}
                style={{
                  padding: '0.3rem',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  border: `1px solid ${active ? '#1a56db' : '#e2e8f0'}`,
                  borderRadius: '0.35rem',
                  backgroundColor: active ? '#eff6ff' : '#fff',
                  color: active ? '#1a56db' : '#64748b',
                  cursor: 'pointer',
                  transition: 'all 0.1s',
                }}
              >
                {s}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
