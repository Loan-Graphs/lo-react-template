'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import type { LOProfile } from '@/types/lo-profile'

interface CustomizationRequestFormProps {
  loProfile: LOProfile
  loSlug: string
}

export default function CustomizationRequestForm({ loProfile, loSlug }: CustomizationRequestFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [request, setRequest] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  if (loProfile.plan !== 'free') return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/customization-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, request, loSlug }),
      })

      if (!res.ok) throw new Error('Request failed')

      setStatus('success')
      setName('')
      setEmail('')
      setRequest('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section className="py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            style={{
              backgroundColor: 'var(--section-bg-alt)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '3rem 2rem',
            }}
          >
            <div style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '1rem' }}>&#10003;</div>
            <h3 style={{ color: 'var(--color-foreground)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Request Submitted
            </h3>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
              We&apos;ll review your customization request and get back to you soon.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2
            style={{
              color: 'var(--color-foreground)',
              fontSize: '1.875rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
            }}
            className="mb-3"
          >
            Request a Customization
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto' }}>
            Want something beyond the standard options? Tell us what you need and we&apos;ll make it happen.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="crf-name"
                style={{ color: 'var(--color-foreground)', fontSize: '0.875rem', fontWeight: 600 }}
                className="block mb-1.5"
              >
                Name
              </label>
              <input
                id="crf-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.625rem 0.875rem',
                  fontSize: '0.9rem',
                  color: 'var(--color-foreground)',
                  width: '100%',
                }}
                className="focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label
                htmlFor="crf-email"
                style={{ color: 'var(--color-foreground)', fontSize: '0.875rem', fontWeight: 600 }}
                className="block mb-1.5"
              >
                Email
              </label>
              <input
                id="crf-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.625rem 0.875rem',
                  fontSize: '0.9rem',
                  color: 'var(--color-foreground)',
                  width: '100%',
                }}
                className="focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label
                htmlFor="crf-request"
                style={{ color: 'var(--color-foreground)', fontSize: '0.875rem', fontWeight: 600 }}
                className="block mb-1.5"
              >
                What would you like customized?
              </label>
              <textarea
                id="crf-request"
                required
                rows={4}
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder="Describe the change you'd like — e.g., 'Make the hero background darker' or 'Add a VA loans landing page'"
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.625rem 0.875rem',
                  fontSize: '0.9rem',
                  color: 'var(--color-foreground)',
                  width: '100%',
                  resize: 'vertical',
                }}
                className="focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {status === 'error' && (
            <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.75rem' }}>
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            style={{
              backgroundColor: 'var(--color-primary)',
              borderRadius: 'var(--radius-md)',
              marginTop: '1.5rem',
              opacity: status === 'submitting' ? 0.7 : 1,
            }}
            className="w-full px-6 py-3 text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Send size={16} />
            {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </section>
  )
}
