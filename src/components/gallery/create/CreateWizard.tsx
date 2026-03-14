'use client'

import { useState } from 'react'
import Link from 'next/link'
import StepTemplatePicker from './StepTemplatePicker'
import StepYourInfo from './StepYourInfo'
import StepDone from './StepDone'

export interface FormData {
  firstName: string
  lastName: string
  nmls: string
  phone: string
  email: string
  subdomain: string
  licenseStates: string[]
  agreedToTerms: boolean
  primaryColor: string
}

export default function CreateWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedTemplate, setSelectedTemplate] = useState('template-1')
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    nmls: '',
    phone: '',
    email: '',
    subdomain: '',
    licenseStates: [],
    agreedToTerms: false,
    primaryColor: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = () => {
    if (step < 3) setStep((step + 1) as 1 | 2 | 3)
  }

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as 1 | 2 | 3)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Advance to step 3; StepDone will call the API on mount
    setIsSubmitting(false)
    setStep(3)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between py-5 border-b border-slate-100 px-6 max-w-7xl mx-auto">
        <Link href="/" className="text-lg font-semibold text-slate-900 tracking-tight">
          LoanGraphs
        </Link>
        <a
          href="https://app.loangraphs.com/login"
          className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          Sign In
        </a>
      </nav>

      {/* Step Container */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Progress Indicator */}
        {step !== 3 && (
          <div className="flex justify-center mb-12">
            <div className="text-xs tracking-widest uppercase text-slate-400 border border-slate-200 rounded-full px-3 py-1">
              Step {step} of 3
            </div>
          </div>
        )}

        {/* Step Content with transition */}
        <div
          className="transition-all duration-300 ease-in-out"
          style={{
            opacity: 1,
            transform: 'translateY(0)',
          }}
        >
          {step === 1 && (
            <StepTemplatePicker
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              onNext={handleNext}
            />
          )}

          {step === 2 && (
            <StepYourInfo
              formData={formData}
              setFormData={setFormData}
              isSubmitting={isSubmitting}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          )}

          {step === 3 && (
            <StepDone
              subdomain={formData.subdomain}
              templateSlug={selectedTemplate}
              formData={{
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                nmls: formData.nmls,
                phone: formData.phone,
                states: formData.licenseStates,
                primaryColor: formData.primaryColor,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
