'use client'

import { useEffect } from 'react'
import { computeSubdomain } from '@/lib/wizard'
import type { WizardState } from '@/lib/wizard'

interface Props {
  state: WizardState
  onChange: (u: Partial<WizardState>) => void
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {})
}

function DnsRecord({ type, name, value }: { type: string; name: string; value: string }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '60px 60px 1fr auto',
        gap: '0.5rem',
        alignItems: 'center',
        padding: '0.5rem 0.75rem',
        borderBottom: '1px solid #e2e8f0',
        fontSize: '0.8rem',
      }}
    >
      <span
        style={{
          backgroundColor: '#eff6ff',
          color: '#1a56db',
          padding: '2px 6px',
          borderRadius: '4px',
          fontWeight: 700,
          fontSize: '0.7rem',
        }}
      >
        {type}
      </span>
      <code style={{ color: '#374151', fontFamily: 'monospace' }}>{name}</code>
      <code style={{ color: '#0f172a', fontFamily: 'monospace', wordBreak: 'break-all' }}>{value}</code>
      <button
        onClick={() => copyToClipboard(value)}
        title="Copy to clipboard"
        style={{
          padding: '2px 6px',
          border: '1px solid #e2e8f0',
          borderRadius: '4px',
          backgroundColor: '#fff',
          cursor: 'pointer',
          fontSize: '0.7rem',
          color: '#64748b',
          flexShrink: 0,
        }}
      >
        Copy
      </button>
    </div>
  )
}

export default function StepDomain({ state, onChange }: Props) {
  // Auto-compute subdomain from name on mount / when name changes
  useEffect(() => {
    if (state.name && !state.subdomain) {
      onChange({ subdomain: computeSubdomain(state.name) })
    }
  }, [state.name, state.subdomain, onChange])

  const checkDns = async () => {
    onChange({ dnsStatus: 'checking' })
    try {
      const res = await fetch('/api/wizard/check-dns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: state.customDomain }),
      })
      const data = await res.json()
      onChange({ dnsStatus: data.verified ? 'verified' : 'failed' })
    } catch {
      onChange({ dnsStatus: 'failed' })
    }
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
        Domain Setup
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Your site launches on a free subdomain instantly. You can connect a custom domain anytime.
      </p>

      {/* Subdomain */}
      <div
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: '0.75rem',
          padding: '1.25rem',
          marginBottom: '1.25rem',
          backgroundColor: '#f8fafc',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
            Free Subdomain
          </label>
          <span
            style={{
              backgroundColor: '#dcfce7',
              color: '#15803d',
              padding: '2px 8px',
              borderRadius: '999px',
              fontSize: '0.65rem',
              fontWeight: 700,
            }}
          >
            ✓ Active Immediately
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid #d1d5db', borderRadius: '0.5rem', overflow: 'hidden', backgroundColor: '#fff' }}>
          <input
            type="text"
            value={state.subdomain}
            onChange={(e) => onChange({ subdomain: computeSubdomain(e.target.value) })}
            style={{
              flex: 1,
              padding: '0.6rem 0.75rem',
              border: 'none',
              outline: 'none',
              fontSize: '0.9rem',
              color: '#0f172a',
              fontFamily: 'monospace',
            }}
          />
          <span
            style={{
              padding: '0.6rem 0.75rem',
              backgroundColor: '#f1f5f9',
              color: '#64748b',
              fontSize: '0.85rem',
              borderLeft: '1px solid #e2e8f0',
              whiteSpace: 'nowrap',
            }}
          >
            .loangraphs.com
          </span>
        </div>
        <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.35rem' }}>
          Your site will be live at <strong>https://{state.subdomain || 'yourname'}.loangraphs.com</strong>
        </p>
      </div>

      {/* Custom domain toggle */}
      <div
        style={{
          border: `2px solid ${state.useCustomDomain ? '#1a56db' : '#e2e8f0'}`,
          borderRadius: '0.75rem',
          padding: '1.25rem',
          backgroundColor: state.useCustomDomain ? '#eff6ff' : '#fff',
        }}
      >
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => onChange({ useCustomDomain: !state.useCustomDomain })}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.1rem' }}>
              Use a Custom Domain
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Connect yourdomain.com to your LoanGraphs site
            </div>
          </div>
          <div
            style={{
              width: '44px',
              height: '24px',
              borderRadius: '999px',
              backgroundColor: state.useCustomDomain ? '#1a56db' : '#d1d5db',
              position: 'relative',
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                position: 'absolute',
                top: '3px',
                left: state.useCustomDomain ? '23px' : '3px',
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}
            />
          </div>
        </div>

        {state.useCustomDomain && (
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
              Your Domain
            </label>
            <input
              type="text"
              value={state.customDomain}
              onChange={(e) => onChange({ customDomain: e.target.value.toLowerCase(), dnsStatus: 'idle' })}
              placeholder="yourdomain.com"
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'monospace',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#1a56db')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
            />

            {state.customDomain && (
              <>
                {/* DNS Records */}
                <div style={{ marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                    Add these DNS records to your domain registrar:
                  </p>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', overflow: 'hidden', backgroundColor: '#fff' }}>
                    <div style={{ padding: '0.4rem 0.75rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '60px 60px 1fr auto', gap: '0.5rem', fontSize: '0.65rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                      <span>Type</span><span>Name</span><span>Value</span><span />
                    </div>
                    <DnsRecord type="A" name="@" value="76.76.21.21" />
                    <DnsRecord type="CNAME" name="www" value="cname.vercel-dns.com" />
                  </div>
                  <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                    TTL: 3600 (1 hour) recommended. Changes can take up to 24 hours to propagate.
                  </p>
                </div>

                {/* DNS check */}
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={checkDns}
                    disabled={state.dnsStatus === 'checking'}
                    style={{
                      backgroundColor: '#1a56db',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '0.375rem',
                      padding: '0.5rem 1rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: state.dnsStatus === 'checking' ? 'not-allowed' : 'pointer',
                      opacity: state.dnsStatus === 'checking' ? 0.7 : 1,
                    }}
                  >
                    {state.dnsStatus === 'checking' ? 'Checking...' : '⟳ Check DNS'}
                  </button>

                  {state.dnsStatus === 'verified' && (
                    <span style={{ color: '#15803d', fontWeight: 700, fontSize: '0.8rem' }}>
                      ✓ DNS verified!
                    </span>
                  )}
                  {state.dnsStatus === 'failed' && (
                    <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>
                      Not propagated yet — it can take up to 24 hours.
                    </span>
                  )}
                </div>

                {/* Proceed anyway */}
                <button
                  onClick={() => onChange({ dnsStatus: 'verified' })}
                  style={{
                    marginTop: '0.75rem',
                    backgroundColor: 'transparent',
                    color: '#64748b',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    textDecoration: 'underline',
                    padding: 0,
                  }}
                >
                  I&apos;ve entered my DNS records — continue anyway →
                </button>

                <div
                  style={{
                    marginTop: '0.75rem',
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fcd34d',
                    borderRadius: '0.375rem',
                    padding: '0.6rem 0.75rem',
                    fontSize: '0.72rem',
                    color: '#78350f',
                  }}
                >
                  <strong>Note:</strong> DNS propagation can take up to 24 hours. Your site will be live on your
                  free subdomain in the meantime. Your dashboard will show a{' '}
                  <strong>Pending / Verified</strong> badge once propagation is confirmed.
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
