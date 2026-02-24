'use client'

import { useState } from 'react'
import type { WizardState, WizardTestimonial } from '@/lib/wizard'

interface Props {
  state: WizardState
  onChange: (u: Partial<WizardState>) => void
}

const EMPTY_TESTIMONIAL: Omit<WizardTestimonial, 'id'> = {
  author: '',
  rating: 5,
  text: '',
  date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
}

export default function StepTestimonials({ state, onChange }: Props) {
  const [newT, setNewT] = useState({ ...EMPTY_TESTIMONIAL })
  const [adding, setAdding] = useState(false)

  const add = () => {
    if (!newT.author || !newT.text) return
    onChange({
      testimonials: [
        ...state.testimonials,
        { ...newT, id: `t-${Date.now()}` },
      ],
    })
    setNewT({ ...EMPTY_TESTIMONIAL })
    setAdding(false)
  }

  const remove = (id: string) => {
    onChange({ testimonials: state.testimonials.filter((t) => t.id !== id) })
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
        Client Testimonials
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Add 3–6 real reviews to show on your site. You can import more from Google later.
      </p>

      {/* Existing testimonials */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
        {state.testimonials.map((t) => (
          <div
            key={t.id}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              padding: '0.75rem',
              backgroundColor: '#f8fafc',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>{t.author}</span>
                <span style={{ color: '#fbbf24', marginLeft: '0.5rem', fontSize: '0.85rem' }}>
                  {'★'.repeat(t.rating)}
                </span>
              </div>
              <button
                onClick={() => remove(t.id)}
                style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', lineHeight: 1 }}
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.5 }}>&quot;{t.text}&quot;</p>
            <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.35rem' }}>{t.date}</p>
          </div>
        ))}
      </div>

      {/* Add form */}
      {adding ? (
        <div
          style={{
            border: '1px solid #bfdbfe',
            borderRadius: '0.75rem',
            padding: '1rem',
            backgroundColor: '#eff6ff',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                Client Name
              </label>
              <input
                type="text"
                value={newT.author}
                onChange={(e) => setNewT({ ...newT, author: e.target.value })}
                placeholder="Jane D."
                style={{
                  width: '100%',
                  padding: '0.5rem 0.6rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                Rating
              </label>
              <select
                value={newT.rating}
                onChange={(e) => setNewT({ ...newT, rating: Number(e.target.value) })}
                style={{
                  padding: '0.5rem 0.6rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.85rem',
                  outline: 'none',
                  backgroundColor: '#fff',
                }}
              >
                {[5, 4, 3].map((n) => (
                  <option key={n} value={n}>{'★'.repeat(n)} ({n}/5)</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
              Review Text
            </label>
            <textarea
              value={newT.text}
              onChange={(e) => setNewT({ ...newT, text: e.target.value })}
              placeholder="Jane helped us close on our dream home in under 3 weeks..."
              rows={3}
              style={{
                width: '100%',
                padding: '0.5rem 0.6rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.85rem',
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={add}
              disabled={!newT.author || !newT.text}
              style={{
                backgroundColor: '#1a56db',
                color: '#fff',
                border: 'none',
                borderRadius: '0.375rem',
                padding: '0.5rem 1rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: !newT.author || !newT.text ? 'not-allowed' : 'pointer',
                opacity: !newT.author || !newT.text ? 0.6 : 1,
              }}
            >
              Add Review
            </button>
            <button
              onClick={() => setAdding(false)}
              style={{ backgroundColor: 'transparent', color: '#64748b', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem 1rem', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px dashed #d1d5db',
            borderRadius: '0.5rem',
            backgroundColor: 'transparent',
            color: '#64748b',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          + Add a Review
        </button>
      )}

      <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '1rem' }}>
        Don&apos;t have reviews yet? Skip this step — your testimonials section will be hidden until you add some.
      </p>
    </div>
  )
}
