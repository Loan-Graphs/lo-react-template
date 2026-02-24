'use client'

/**
 * LeadForm.tsx
 * Lead capture form with react-hook-form + zod validation.
 *
 * Fields: name, email, phone, loan type, optional message, consent checkbox.
 * On submit: POST /api/leads → forwarded to LoanGraphs leads API.
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react'

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const LOAN_TYPES = [
  'Purchase',
  'Refinance',
  'VA Loan',
  'FHA Loan',
  'DSCR / Investment',
  'Jumbo',
  'Pre-Approval',
  'Other',
] as const

export const leadSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .regex(/^[\d\s\-()+.]+$/, 'Please enter a valid phone number'),
  loanType: z.enum(LOAN_TYPES, { error: 'Please select a loan type' }),
  message: z.string().max(500, 'Message must be 500 characters or less').optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, 'You must agree to be contacted to submit this form'),
})

export type LeadFormValues = z.infer<typeof leadSchema>

// ---------------------------------------------------------------------------
// Styles (inline to avoid theme coupling)
// ---------------------------------------------------------------------------

const inputBase: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '0.5rem',
  padding: '0.625rem 0.75rem',
  width: '100%',
  fontSize: '0.875rem',
  outline: 'none',
  color: '#0f172a',
  boxSizing: 'border-box',
}

const inputError: React.CSSProperties = {
  ...inputBase,
  border: '1px solid #ef4444',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '0.25rem',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#374151',
}

const errorStyle: React.CSSProperties = {
  color: '#dc2626',
  fontSize: '0.75rem',
  marginTop: '0.25rem',
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface LeadFormProps {
  /** Heading displayed above the form */
  title?: string
  /** Subheading below the title */
  subtitle?: string
  /** Hides title/subtitle for inline/compact embeds */
  compact?: boolean
  /** Override the submit button label */
  submitLabel?: string
  /** Primary color for the submit button (defaults to CSS var or sky blue) */
  primaryColor?: string
  /** Called after a successful submission */
  onSuccess?: () => void
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LeadForm({
  title = 'Get a Free Consultation',
  subtitle = 'Fill out the form and your loan officer will be in touch within 24 hours.',
  compact = false,
  submitLabel = 'Get Free Consultation',
  primaryColor,
  onSuccess,
}: LeadFormProps) {
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      loanType: undefined,
      message: '',
      consent: false,
    },
  })

  const onSubmit = async (data: LeadFormValues) => {
    setServerError(null)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = (await res.json()) as { ok?: boolean; error?: string }

      if (res.ok && json.ok !== false) {
        setIsSuccess(true)
        reset()
        onSuccess?.()
      } else {
        setServerError(
          json.error ?? 'Something went wrong. Please try again or call your loan officer directly.'
        )
      }
    } catch {
      setServerError(
        'Unable to send your request. Please check your connection and try again.'
      )
    }
  }

  // ---- Success state -------------------------------------------------------

  if (isSuccess) {
    return (
      <div
        style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #86efac',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          textAlign: 'center',
        }}
      >
        <CheckCircle
          size={40}
          style={{ color: '#16a34a', margin: '0 auto 0.75rem' }}
        />
        <h3 style={{ color: '#15803d', fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.25rem' }}>
          Got it! Your loan officer will be in touch soon.
        </h3>
        <p style={{ color: '#166534', fontSize: '0.875rem' }}>
          Expect a call or email within 24 hours.
        </p>
      </div>
    )
  }

  // ---- Form ----------------------------------------------------------------

  const btnColor = primaryColor ?? 'var(--color-primary, #0ea5e9)'

  return (
    <div>
      {/* Header */}
      {!compact && (
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', margin: 0 }}>
            {title}
          </h3>
          {subtitle && (
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.375rem' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {/* Full Name */}
        <div>
          <label htmlFor="lf-name" style={labelStyle}>
            Full Name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id="lf-name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            style={errors.name ? inputError : inputBase}
            {...register('name')}
          />
          {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="lf-email" style={labelStyle}>
            Email Address <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id="lf-email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            style={errors.email ? inputError : inputBase}
            {...register('email')}
          />
          {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="lf-phone" style={labelStyle}>
            Phone Number <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id="lf-phone"
            type="tel"
            autoComplete="tel"
            placeholder="(602) 555-0100"
            style={errors.phone ? inputError : inputBase}
            {...register('phone')}
          />
          {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
        </div>

        {/* Loan Type */}
        <div>
          <label htmlFor="lf-loanType" style={labelStyle}>
            Loan Type <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select
            id="lf-loanType"
            style={errors.loanType ? { ...inputError, backgroundColor: '#f8fafc' } : { ...inputBase, backgroundColor: '#f8fafc' }}
            {...register('loanType')}
          >
            <option value="">Select one…</option>
            {LOAN_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.loanType && <p style={errorStyle}>{errors.loanType.message}</p>}
        </div>

        {/* Optional message */}
        {!compact && (
          <div>
            <label htmlFor="lf-message" style={labelStyle}>
              Message <span style={{ color: '#94a3b8', fontWeight: 400 }}>(optional)</span>
            </label>
            <textarea
              id="lf-message"
              rows={3}
              placeholder="Tell me about your situation…"
              style={{ ...inputBase, resize: 'vertical', minHeight: '4.5rem' }}
              {...register('message')}
            />
            {errors.message && <p style={errorStyle}>{errors.message.message}</p>}
          </div>
        )}

        {/* Consent */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
          <input
            id="lf-consent"
            type="checkbox"
            style={{ marginTop: '0.2rem', accentColor: btnColor, flexShrink: 0 }}
            {...register('consent')}
          />
          <label htmlFor="lf-consent" style={{ ...labelStyle, margin: 0, fontWeight: 400, color: '#4b5563', fontSize: '0.75rem', lineHeight: 1.4 }}>
            I agree to be contacted by this loan officer regarding my mortgage inquiry. I
            understand that this is not an application for credit and I may be contacted by
            phone, email, or text.{' '}
            <span style={{ color: '#ef4444' }}>*</span>
          </label>
        </div>
        {errors.consent && <p style={{ ...errorStyle, marginTop: '-0.5rem' }}>{errors.consent.message}</p>}

        {/* Server error */}
        {serverError && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fca5a5',
              borderRadius: '0.5rem',
              padding: '0.625rem 0.75rem',
            }}
          >
            <AlertCircle size={16} style={{ color: '#dc2626', flexShrink: 0 }} />
            <p style={{ color: '#dc2626', fontSize: '0.8rem', margin: 0 }}>{serverError}</p>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: btnColor,
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.9375rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.65 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            width: '100%',
            transition: 'opacity 150ms',
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              Sending…
            </>
          ) : (
            submitLabel
          )}
        </button>

        {/* Privacy note */}
        <p style={{ color: '#94a3b8', fontSize: '0.6875rem', textAlign: 'center', margin: 0 }}>
          No spam. Your information is never sold or shared.
        </p>
      </form>

      {/* Keyframe for spinner (injected once via style tag) */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
