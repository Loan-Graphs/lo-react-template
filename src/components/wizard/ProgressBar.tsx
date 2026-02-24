'use client'

import { STEP_TITLES, TOTAL_STEPS } from '@/lib/wizard'

interface ProgressBarProps {
  currentStep: number
  onStepClick?: (step: number) => void
}

export default function ProgressBar({ currentStep, onStepClick }: ProgressBarProps) {
  const pct = Math.round(((currentStep - 1) / (TOTAL_STEPS - 1)) * 100)

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.75rem 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {/* Logo / brand */}
        <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a', whiteSpace: 'nowrap' }}>
          LoanGraphs
        </span>

        {/* Progress bar track */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div
            style={{
              fontSize: '0.7rem',
              color: '#64748b',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontWeight: 600, color: '#0f172a' }}>
              Step {currentStep} of {TOTAL_STEPS} — {STEP_TITLES[currentStep]}
            </span>
            <span>{pct}% complete</span>
          </div>
          <div
            style={{
              height: '4px',
              backgroundColor: '#e2e8f0',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${pct}%`,
                backgroundColor: '#1a56db',
                borderRadius: '999px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Step dots (desktop only) */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
          }}
          className="hidden md:flex"
        >
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((step) => (
            <button
              key={step}
              onClick={() => onStepClick?.(step)}
              title={STEP_TITLES[step]}
              style={{
                width: step === currentStep ? '20px' : '8px',
                height: '8px',
                borderRadius: '999px',
                border: 'none',
                cursor: onStepClick ? 'pointer' : 'default',
                transition: 'all 0.2s',
                backgroundColor:
                  step < currentStep
                    ? '#1a56db'
                    : step === currentStep
                    ? '#1a56db'
                    : '#cbd5e1',
                opacity: step > currentStep ? 0.5 : 1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
