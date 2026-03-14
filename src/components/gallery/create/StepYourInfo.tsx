'use client'

import { FormData } from './CreateWizard'

interface StepYourInfoProps {
  formData: FormData
  setFormData: (data: FormData) => void
  isSubmitting: boolean
  onBack: () => void
  onSubmit: () => void
}

const QUICK_STATES = ['TX', 'CA', 'FL', 'AZ', 'CO', 'GA', 'NC', 'TN', 'WA', 'NY']

export default function StepYourInfo({
  formData,
  setFormData,
  isSubmitting,
  onBack,
  onSubmit,
}: StepYourInfoProps) {
  const updateField = (field: keyof FormData, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const toggleState = (state: string) => {
    const current = formData.licenseStates
    if (current.includes(state)) {
      updateField(
        'licenseStates',
        current.filter((s) => s !== state)
      )
    } else {
      updateField('licenseStates', [...current, state])
    }
  }

  const removeState = (state: string) => {
    updateField(
      'licenseStates',
      formData.licenseStates.filter((s) => s !== state)
    )
  }

  // Auto-generate subdomain on blur
  const handleNameBlur = () => {
    if (!formData.subdomain && formData.firstName && formData.lastName) {
      const generated = `${formData.firstName.toLowerCase()}-${formData.lastName.toLowerCase()}`
        .replace(/[^a-z0-9-]/g, '')
      updateField('subdomain', generated)
    }
  }

  const canSubmit =
    formData.firstName &&
    formData.lastName &&
    formData.nmls &&
    formData.phone &&
    formData.email &&
    formData.subdomain &&
    formData.agreedToTerms

  return (
    <div className="text-center">
      {/* Header */}
      <h1 className="text-4xl font-medium tracking-tight text-slate-900 mb-3">
        Set Up Your Site
      </h1>
      <p className="text-slate-500 text-lg font-light mb-12">
        Your info. Your site. Live in seconds.
      </p>

      {/* Form */}
      <form
        className="max-w-lg mx-auto space-y-5 text-left"
        onSubmit={(e) => {
          e.preventDefault()
          if (canSubmit && !isSubmitting) onSubmit()
        }}
      >
        {/* Row 1: First + Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
              onBlur={handleNameBlur}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
              onBlur={handleNameBlur}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
              placeholder="Martinez"
            />
          </div>
        </div>

        {/* Row 2: NMLS# */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            NMLS#
          </label>
          <input
            type="text"
            value={formData.nmls}
            onChange={(e) => updateField('nmls', e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
            placeholder="123456"
          />
          <p className="text-xs text-slate-500 mt-1.5">Your NMLS license number</p>
        </div>

        {/* Row 3: Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
            placeholder="(555) 555-5555"
          />
        </div>

        {/* Row 4: Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
            placeholder="john@example.com"
          />
        </div>

        {/* Row 5: Subdomain */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Your Website URL
          </label>
          <div className="flex items-stretch">
            <input
              type="text"
              value={formData.subdomain}
              onChange={(e) => updateField('subdomain', e.target.value)}
              className="flex-1 rounded-l-xl border border-r-0 border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
              placeholder="john-martinez"
            />
            <span className="flex items-center px-4 bg-slate-50 border border-slate-200 rounded-r-xl text-slate-500 text-sm">
.loangraphs.me
            </span>
          </div>
          {formData.subdomain && (
            <p className="text-sm text-green-600 mt-1.5">
              ✓ {formData.subdomain}.loangraphs.me is available
            </p>
          )}
        </div>

        {/* Row 6: Licensed States */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Licensed States
          </label>
          <p className="text-xs text-slate-500 mb-3">
            States where you&apos;re licensed to originate loans
          </p>

          {/* Quick-add pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {QUICK_STATES.map((state) => {
              const isSelected = formData.licenseStates.includes(state)
              return (
                <button
                  key={state}
                  type="button"
                  onClick={() => toggleState(state)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {state}
                </button>
              )
            })}
          </div>

          {/* Selected states tags */}
          {formData.licenseStates.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.licenseStates.map((state) => (
                <span
                  key={state}
                  className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-xs"
                >
                  {state}
                  <button
                    type="button"
                    onClick={() => removeState(state)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Row 7: Terms checkbox */}
        <div className="flex items-start gap-3 pt-2">
          <input
            type="checkbox"
            checked={formData.agreedToTerms}
            onChange={(e) => updateField('agreedToTerms', e.target.checked)}
            className="mt-0.5 w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900"
          />
          <label className="text-sm text-slate-600">
            I agree to the{' '}
            <a href="#" className="text-slate-900 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-slate-900 underline">
              Privacy Policy
            </a>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="border border-slate-200 text-slate-600 rounded-full px-8 py-3 text-sm hover:bg-slate-50 transition-colors"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="flex-1 bg-slate-900 text-white rounded-full px-8 py-3 text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating...
              </>
            ) : (
              'Create My Website →'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
