import { MessageSquare, FileText, Home } from 'lucide-react'
import type { LOProfile } from '@/types/lo-profile'

const steps = [
  {
    icon: MessageSquare,
    title: 'Free Consultation',
    description: 'Tell us about your goals. We\'ll review your situation and recommend the best loan options.',
  },
  {
    icon: FileText,
    title: 'Get Pre-Approved',
    description: 'Submit your application and get a pre-approval letter — often within 24 hours.',
  },
  {
    icon: Home,
    title: 'Close & Celebrate',
    description: 'We handle the paperwork, coordinate with title, and get you to the closing table.',
  },
]

interface HowItWorksProps {
  loProfile: LOProfile
}

export default function HowItWorks({ loProfile }: HowItWorksProps) {
  return (
    <section style={{ backgroundColor: 'var(--section-bg-alt)' }} className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            style={{ color: 'var(--color-foreground)', fontSize: '1.875rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}
            className="mb-3"
          >
            How It Works
          </h2>
          <p style={{ color: 'var(--color-muted)', maxWidth: '500px' }} className="mx-auto">
            Three simple steps to your new loan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div
                style={{
                  backgroundColor: 'var(--color-primary-light)',
                  borderRadius: '50%',
                  width: '4rem',
                  height: '4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  position: 'relative',
                }}
              >
                <step.icon size={24} style={{ color: 'var(--color-primary)' }} />
                <span
                  style={{
                    position: 'absolute',
                    top: '-0.25rem',
                    right: '-0.25rem',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  {index + 1}
                </span>
              </div>
              <h3 style={{ color: 'var(--color-foreground)', fontWeight: 700, marginBottom: '0.5rem' }}>
                {step.title}
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
