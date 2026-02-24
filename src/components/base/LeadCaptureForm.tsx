import type { LOProfile } from '@/types/lo-profile'
import LeadForm from '@/components/LeadForm'

interface LeadCaptureFormProps {
  loProfile: LOProfile
  geoAwareCTA?: React.ReactNode
}

export default function LeadCaptureForm({ loProfile, geoAwareCTA }: LeadCaptureFormProps) {
  const firstName = loProfile.name.split(' ')[0]

  return (
    <section style={{ backgroundColor: 'var(--section-bg-alt)' }} className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              style={{ color: 'var(--color-foreground)', fontSize: '1.875rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}
              className="mb-3"
            >
              Ready to Get Started?
            </h2>
            <p style={{ color: 'var(--color-muted)', lineHeight: 1.7 }} className="mb-6">
              Fill out the form and {firstName} will reach out within 24 hours to discuss your options.
              No obligation, no credit check until you&apos;re ready.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                'Free rate quote — no commitment',
                'Pre-approval in as little as 24 hours',
                'Your information is never sold or shared',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>&#10003;</span>
                  <span style={{ color: '#374151', fontSize: '0.9rem' }}>{item}</span>
                </li>
              ))}
            </ul>
            {geoAwareCTA}
          </div>

          <div
            style={{
              backgroundColor: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              border: '1px solid var(--color-border)',
            }}
          >
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  )
}
