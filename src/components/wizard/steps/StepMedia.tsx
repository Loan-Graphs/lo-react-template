'use client'

import { useRef } from 'react'
import type { WizardState } from '@/lib/wizard'

interface Props {
  state: WizardState
  onChange: (u: Partial<WizardState>) => void
}

function UploadBox({
  label,
  hint,
  value,
  onFile,
  aspectRatio,
  shape,
}: {
  label: string
  hint: string
  value: string
  onFile: (dataUrl: string) => void
  aspectRatio?: string
  shape?: 'circle'
}) {
  const ref = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onFile(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
        {label}
      </label>
      <div
        onClick={() => ref.current?.click()}
        style={{
          border: '2px dashed #d1d5db',
          borderRadius: shape === 'circle' ? '50%' : '0.75rem',
          width: shape === 'circle' ? '160px' : '100%',
          height: shape === 'circle' ? '160px' : aspectRatio ? undefined : '120px',
          aspectRatio: aspectRatio,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#f8fafc',
          transition: 'border-color 0.15s',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = '#1a56db')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = '#d1d5db')}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>📷</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{hint}</div>
            <div style={{ fontSize: '0.65rem', color: '#cbd5e1', marginTop: '0.25rem' }}>JPG, PNG, WEBP</div>
          </div>
        )}
        {value && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(0,0,0,0.4)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(0,0,0,0)')}
          >
            <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 600, opacity: 0 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLSpanElement).style.opacity = '1')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLSpanElement).style.opacity = '0')}
            >
              Change photo
            </span>
          </div>
        )}
      </div>
      <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.35rem' }}>{hint}</p>
      <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
    </div>
  )
}

export default function StepMedia({ state, onChange }: Props) {
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
        Photo & Logo
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        A professional headshot builds trust instantly. Logo is optional but recommended for branded sites.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem', alignItems: 'start' }}>
        <UploadBox
          label="Headshot"
          hint="Professional photo — 400×400px or larger"
          value={state.photo}
          onFile={(v) => onChange({ photo: v })}
          shape="circle"
        />

        <div>
          <UploadBox
            label="Logo (optional)"
            hint="Your company or personal brand logo — PNG with transparent background preferred"
            value={state.logoUrl}
            onFile={(v) => onChange({ logoUrl: v })}
            aspectRatio="3/1"
          />

          <div
            style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fcd34d',
              borderRadius: '0.5rem',
              padding: '0.75rem',
              fontSize: '0.75rem',
              color: '#78350f',
            }}
          >
            <strong>💡 Tip:</strong> Your photo appears in the hero section and About section. Square crops work best.
            LoanGraphs auto-resizes and optimizes all uploads.
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.75rem' }}>
        Don&apos;t have a photo ready?{' '}
        <button
          onClick={() => onChange({ photo: '' })}
          style={{ color: '#1a56db', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline' }}
        >
          Skip for now
        </button>{' '}
        — you can upload later from your dashboard.
      </div>
    </div>
  )
}
