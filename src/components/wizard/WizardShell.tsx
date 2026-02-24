'use client'

import { useState, useEffect, useCallback } from 'react'
import { INITIAL_STATE, TOTAL_STEPS, computeSubdomain } from '@/lib/wizard'
import type { WizardState } from '@/lib/wizard'
import ProgressBar from './ProgressBar'
import PreviewPanel from './PreviewPanel'
import StepTemplate from './steps/StepTemplate'
import StepBasicInfo from './steps/StepBasicInfo'
import StepMedia from './steps/StepMedia'
import StepColors from './steps/StepColors'
import StepHeadline from './steps/StepHeadline'
import StepProducts from './steps/StepProducts'
import StepTestimonials from './steps/StepTestimonials'
import StepDomain from './steps/StepDomain'
import StepMarketData from './steps/StepMarketData'
import StepSEO from './steps/StepSEO'
import StepLaunch from './steps/StepLaunch'

const STORAGE_KEY = 'loangraphs-wizard-draft'

export default function WizardShell() {
  const [state, setState] = useState<WizardState>(INITIAL_STATE)
  const [step, setStep] = useState(1)
  const [launching, setLaunching] = useState(false)
  const [saveEmail, setSaveEmail] = useState('')
  const [saveSent, setSaveSent] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)

  // Restore draft from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const draft = JSON.parse(raw) as { state: WizardState; step: number }
        setState(draft.state)
        setStep(draft.step)
      }
    } catch {}
  }, [])

  // Auto-save every 30s
  useEffect(() => {
    const id = setInterval(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, step }))
    }, 30_000)
    return () => clearInterval(id)
  }, [state, step])

  const onChange = useCallback((updates: Partial<WizardState>) => {
    setState((prev) => {
      const next = { ...prev, ...updates }
      // Auto-update subdomain when name changes
      if (updates.name !== undefined && !prev.subdomain) {
        next.subdomain = computeSubdomain(updates.name)
      }
      return next
    })
  }, [])

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const back = () => setStep((s) => Math.max(s - 1, 1))
  const goToStep = (s: number) => { if (s <= step) setStep(s) }

  const saveAndContinue = async () => {
    if (!saveEmail) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, step }))
    try {
      await fetch('/api/wizard/save-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: saveEmail, state, step }),
      })
    } catch {}
    setSaveSent(true)
  }

  const launch = async () => {
    setLaunching(true)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, step }))
    // Simulate short delay for UX feedback
    await new Promise((r) => setTimeout(r, 1_500))
    localStorage.removeItem(STORAGE_KEY)
    window.location.href = 'https://loangraphs.com/dashboard'
  }

  const stepProps = { state, onChange }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      <ProgressBar currentStep={step} onStepClick={goToStep} />

      <div
        style={{
          flex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          padding: '1.5rem 1rem',
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: '1.5rem',
          alignItems: 'start',
        }}
        className="wizard-grid"
      >
        {/* Left: step content */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '1rem',
            padding: '1.75rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          {step === 1 && <StepTemplate {...stepProps} />}
          {step === 2 && <StepBasicInfo {...stepProps} />}
          {step === 3 && <StepMedia {...stepProps} />}
          {step === 4 && <StepColors {...stepProps} />}
          {step === 5 && <StepHeadline {...stepProps} />}
          {step === 6 && <StepProducts {...stepProps} />}
          {step === 7 && <StepTestimonials {...stepProps} />}
          {step === 8 && <StepDomain {...stepProps} />}
          {step === 9 && <StepMarketData {...stepProps} />}
          {step === 10 && <StepSEO {...stepProps} />}
          {step === 11 && <StepLaunch state={state} onLaunch={launch} launching={launching} />}

          {/* Nav buttons */}
          {step < TOTAL_STEPS && (
            <div
              style={{
                marginTop: '2rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                {step > 1 && (
                  <button
                    onClick={back}
                    style={{
                      padding: '0.6rem 1.25rem',
                      backgroundColor: 'transparent',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      color: '#374151',
                      fontWeight: 600,
                    }}
                  >
                    ← Back
                  </button>
                )}
                <button
                  onClick={() => setShowSaveModal(true)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    backgroundColor: 'transparent',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: '#64748b',
                  }}
                >
                  Save & Continue Later
                </button>
              </div>
              <button
                onClick={next}
                style={{
                  padding: '0.6rem 1.5rem',
                  backgroundColor: '#1a56db',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                }}
              >
                Continue →
              </button>
            </div>
          )}
        </div>

        {/* Right: live preview */}
        <div style={{ position: 'sticky', top: '80px' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Live Preview
          </p>
          <div style={{ height: '560px' }}>
            <PreviewPanel state={state} />
          </div>
        </div>
      </div>

      {/* Save & Continue Later modal */}
      {showSaveModal && (
        <div
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem',
          }}
          onClick={() => setShowSaveModal(false)}
        >
          <div
            style={{ backgroundColor: '#fff', borderRadius: '1rem', padding: '1.5rem', maxWidth: '440px', width: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            {saveSent ? (
              <>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Check your inbox</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
                  We sent a magic link to <strong>{saveEmail}</strong>. Click it to resume exactly where you left off.
                </p>
                <button onClick={() => setShowSaveModal(false)} style={{ width: '100%', padding: '0.7rem', backgroundColor: '#1a56db', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 700, cursor: 'pointer' }}>
                  Done
                </button>
              </>
            ) : (
              <>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>Save your progress</h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>
                  We&apos;ll email you a link to continue from Step {step}.
                </p>
                <input
                  type="email"
                  value={saveEmail}
                  onChange={(e) => setSaveEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.9rem', outline: 'none', marginBottom: '0.75rem', boxSizing: 'border-box' }}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={saveAndContinue} disabled={!saveEmail} style={{ flex: 1, padding: '0.7rem', backgroundColor: '#1a56db', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 700, cursor: 'pointer', opacity: saveEmail ? 1 : 0.5 }}>
                    Send Link
                  </button>
                  <button onClick={() => setShowSaveModal(false)} style={{ padding: '0.7rem 1rem', backgroundColor: 'transparent', border: '1px solid #d1d5db', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: '#64748b' }}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .wizard-grid { grid-template-columns: 1fr !important; }
          .wizard-grid > div:last-child { display: none; }
        }
      `}</style>
    </div>
  )
}
