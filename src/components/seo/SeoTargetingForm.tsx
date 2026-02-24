'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

const TOPIC_OPTIONS = [
  { value: 'first-time-homebuyer', label: 'First-time homebuyer tips' },
  { value: 'va-loans', label: 'VA loans and military housing' },
  { value: 'fha-loans', label: 'FHA loan education' },
  { value: 'jumbo-loans', label: 'Jumbo loans / luxury real estate' },
  { value: 'investment-property', label: 'Investment property / DSCR loans' },
  { value: 'refinance', label: 'Refinance strategies' },
  { value: 'local-market-updates', label: 'Local market updates' },
  { value: 'down-payment-assistance', label: 'Down payment assistance programs' },
  { value: 'credit-repair', label: 'Credit repair / mortgage readiness' },
  { value: 'self-employed', label: 'Self-employed / bank statement loans' },
] as const

interface SeoTargetingFormProps {
  loSlug: string
}

export default function SeoTargetingForm({ loSlug }: SeoTargetingFormProps) {
  const [primaryCity, setPrimaryCity] = useState('')
  const [primaryState, setPrimaryState] = useState('')
  const [secondaryCities, setSecondaryCities] = useState('')
  const [topics, setTopics] = useState<string[]>([])
  const [customTopic, setCustomTopic] = useState('')
  const [articleLength, setArticleLength] = useState<'standard' | 'long-form'>('standard')
  const [brandVoice, setBrandVoice] = useState<'professional' | 'friendly' | 'educational'>('professional')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  function toggleTopic(value: string) {
    setTopics((prev) => (prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')

    const allTopics = [...topics]
    if (customTopic.trim()) allTopics.push(customTopic.trim())

    try {
      const res = await fetch('/api/seo/targeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loSlug,
          primaryCity,
          primaryState,
          secondaryCities: secondaryCities
            .split(',')
            .map((c) => c.trim())
            .filter(Boolean)
            .slice(0, 5),
          topics: allTopics,
          articleLength,
          brandVoice,
        }),
      })

      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
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
              backgroundColor: 'var(--section-bg-alt, #f8fafc)',
              border: '1px solid var(--color-border, #e2e8f0)',
              borderRadius: 'var(--radius-lg, 1rem)',
              padding: '3rem 2rem',
            }}
          >
            <div style={{ color: 'var(--color-primary, #0ea5e9)', fontSize: '2rem', marginBottom: '1rem' }}>
              &#10003;
            </div>
            <h3
              style={{
                color: 'var(--color-foreground, #0f172a)',
                fontSize: '1.25rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
              }}
            >
              Targeting Saved
            </h3>
            <p style={{ color: 'var(--color-muted, #64748b)', fontSize: '0.9rem' }}>
              Your SEO article targeting has been saved. Your first article will be ready in 3 business days.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const inputStyle: React.CSSProperties = {
    border: '1px solid var(--color-border, #e2e8f0)',
    borderRadius: 'var(--radius-sm, 0.5rem)',
    padding: '0.625rem 0.875rem',
    fontSize: '0.9rem',
    color: 'var(--color-foreground, #0f172a)',
    width: '100%',
  }

  const labelStyle: React.CSSProperties = {
    color: 'var(--color-foreground, #0f172a)',
    fontSize: '0.875rem',
    fontWeight: 600,
  }

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2
            style={{
              color: 'var(--color-foreground, #0f172a)',
              fontSize: '1.875rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
            }}
            className="mb-3"
          >
            SEO Article Targeting
          </h2>
          <p
            style={{
              color: 'var(--color-muted, #64748b)',
              fontSize: '0.95rem',
              maxWidth: '480px',
              margin: '0 auto',
            }}
          >
            Tell us about your target markets and preferred topics so we can create articles that drive local traffic.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg, 1rem)',
            padding: '2rem',
            border: '1px solid var(--color-border, #e2e8f0)',
          }}
        >
          <div className="space-y-5">
            {/* Geographic Targeting */}
            <div>
              <h3
                style={{
                  color: 'var(--color-foreground, #0f172a)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                }}
              >
                Geographic Areas to Target
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label htmlFor="seo-city" style={labelStyle} className="block mb-1.5">
                    Primary City *
                  </label>
                  <input
                    id="seo-city"
                    type="text"
                    required
                    value={primaryCity}
                    onChange={(e) => setPrimaryCity(e.target.value)}
                    placeholder="e.g. Austin"
                    style={inputStyle}
                    className="focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label htmlFor="seo-state" style={labelStyle} className="block mb-1.5">
                    Primary State *
                  </label>
                  <input
                    id="seo-state"
                    type="text"
                    required
                    value={primaryState}
                    onChange={(e) => setPrimaryState(e.target.value)}
                    placeholder="e.g. TX"
                    style={inputStyle}
                    className="focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <label htmlFor="seo-secondary" style={labelStyle} className="block mb-1.5">
                  Secondary Cities (up to 5, comma-separated)
                </label>
                <input
                  id="seo-secondary"
                  type="text"
                  value={secondaryCities}
                  onChange={(e) => setSecondaryCities(e.target.value)}
                  placeholder="e.g. Round Rock, Cedar Park, Georgetown, Pflugerville"
                  style={inputStyle}
                  className="focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Topic Selection */}
            <div>
              <h3
                style={{
                  color: 'var(--color-foreground, #0f172a)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                }}
              >
                Topics to Target
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {TOPIC_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: 'var(--color-foreground, #0f172a)',
                      cursor: 'pointer',
                      padding: '0.375rem 0',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={topics.includes(opt.value)}
                      onChange={() => toggleTopic(opt.value)}
                      style={{ accentColor: 'var(--color-primary, #0ea5e9)' }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <label htmlFor="seo-custom-topic" style={labelStyle} className="block mb-1.5">
                  Custom Topic
                </label>
                <input
                  id="seo-custom-topic"
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Enter a custom topic..."
                  style={inputStyle}
                  className="focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Article Length */}
            <div>
              <h3
                style={{
                  color: 'var(--color-foreground, #0f172a)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                }}
              >
                Article Length Preference
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--color-foreground, #0f172a)',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="articleLength"
                    value="standard"
                    checked={articleLength === 'standard'}
                    onChange={() => setArticleLength('standard')}
                    style={{ accentColor: 'var(--color-primary, #0ea5e9)' }}
                  />
                  Standard (1,200-1,500 words) — recommended
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--color-foreground, #0f172a)',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="articleLength"
                    value="long-form"
                    checked={articleLength === 'long-form'}
                    onChange={() => setArticleLength('long-form')}
                    style={{ accentColor: 'var(--color-primary, #0ea5e9)' }}
                  />
                  Long-form (2,000-2,500 words) — authority builder
                </label>
              </div>
            </div>

            {/* Brand Voice */}
            <div>
              <h3
                style={{
                  color: 'var(--color-foreground, #0f172a)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                }}
              >
                Brand Voice
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { value: 'professional' as const, label: 'Professional & formal' },
                  { value: 'friendly' as const, label: 'Friendly & conversational' },
                  { value: 'educational' as const, label: 'Educational & detailed' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: 'var(--color-foreground, #0f172a)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="brandVoice"
                      value={opt.value}
                      checked={brandVoice === opt.value}
                      onChange={() => setBrandVoice(opt.value)}
                      style={{ accentColor: 'var(--color-primary, #0ea5e9)' }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
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
              backgroundColor: 'var(--color-primary, #0ea5e9)',
              borderRadius: 'var(--radius-md, 0.75rem)',
              marginTop: '1.5rem',
              opacity: status === 'submitting' ? 0.7 : 1,
            }}
            className="w-full px-6 py-3 text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Send size={16} />
            {status === 'submitting' ? 'Saving...' : 'Save Targeting'}
          </button>
        </form>
      </div>
    </section>
  )
}
