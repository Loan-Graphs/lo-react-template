'use client'

import { useState } from 'react'
import type { WizardState } from '@/lib/wizard'

interface Props {
  state: WizardState
  onChange: (u: Partial<WizardState>) => void
}

export default function StepHeadline({ state, onChange }: Props) {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [error, setError] = useState('')

  const fetchSuggestions = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/wizard/suggest-headline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.name,
          licenseStates: state.licenseStates,
          title: state.title,
          templateKey: state.templateKey,
        }),
      })
      const data = await res.json()
      setSuggestions(data.suggestions ?? [])
    } catch {
      setError('Could not load suggestions. Type your own below.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
        Your headline
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        This is the first thing visitors see. A strong headline states what you do + who you serve.
      </p>

      {/* AI suggestions */}
      <div
        style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '0.75rem',
          padding: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e40af' }}>
            ✨ AI-Generated Suggestions
          </span>
          <button
            onClick={fetchSuggestions}
            disabled={loading}
            style={{
              backgroundColor: '#1a56db',
              color: '#fff',
              border: 'none',
              borderRadius: '0.375rem',
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Generating...' : suggestions.length > 0 ? 'Regenerate' : 'Generate Suggestions'}
          </button>
        </div>
        {error && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{error}</p>}
        {suggestions.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => onChange({ headline: s })}
                style={{
                  textAlign: 'left',
                  padding: '0.6rem 0.75rem',
                  border: `2px solid ${state.headline === s ? '#1a56db' : '#bfdbfe'}`,
                  borderRadius: '0.5rem',
                  backgroundColor: state.headline === s ? '#dbeafe' : '#fff',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  color: '#0f172a',
                  fontWeight: state.headline === s ? 700 : 400,
                  transition: 'all 0.1s',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        ) : (
          <p style={{ color: '#64748b', fontSize: '0.75rem' }}>
            {state.name
              ? `Click "Generate Suggestions" to get 3 personalized headlines for ${state.name}.`
              : 'Complete Step 2 (Basic Info) first to get personalized suggestions.'}
          </p>
        )}
      </div>

      {/* Manual headline input */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
          Main Headline <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <textarea
          value={state.headline}
          onChange={(e) => onChange({ headline: e.target.value })}
          placeholder="e.g. Phoenix's #1 VA Loan Expert — Fast Pre-Approvals"
          rows={2}
          style={{
            width: '100%',
            padding: '0.6rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '0.9rem',
            resize: 'vertical',
            outline: 'none',
            color: '#0f172a',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#1a56db')}
          onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
          <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
            Keep it under 80 characters for best display.
          </p>
          <span style={{ fontSize: '0.7rem', color: state.headline.length > 80 ? '#ef4444' : '#94a3b8' }}>
            {state.headline.length}/80
          </span>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
          Subheadline
        </label>
        <textarea
          value={state.subheadline}
          onChange={(e) => onChange({ subheadline: e.target.value })}
          placeholder="e.g. Helping Arizona families and veterans close on time since 2012. No surprises."
          rows={2}
          style={{
            width: '100%',
            padding: '0.6rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '0.9rem',
            resize: 'vertical',
            outline: 'none',
            color: '#0f172a',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#1a56db')}
          onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
        />
      </div>
    </div>
  )
}
