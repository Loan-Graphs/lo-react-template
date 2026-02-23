import { Star } from 'lucide-react'
import type { LOProfile } from '@/types/lo-profile'

interface TestimonialCarouselProps {
  loProfile: LOProfile
}

export default function TestimonialCarousel({ loProfile }: TestimonialCarouselProps) {
  const firstName = loProfile.name.split(' ')[0]
  const testimonials = loProfile.testimonials.slice(0, 6)

  if (testimonials.length === 0) return null

  return (
    <section style={{ backgroundColor: 'var(--section-bg-alt)' }} className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            style={{ color: 'var(--color-foreground)', fontSize: '1.875rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}
            className="mb-3"
          >
            What Clients Say
          </h2>
          <p style={{ color: 'var(--color-muted)' }}>
            Families and investors have trusted {firstName} with their mortgage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
              }}
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                ))}
              </div>
              <p style={{ color: '#374151', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                &quot;{t.text}&quot;
              </p>
              <div>
                <div style={{ color: 'var(--color-foreground)', fontWeight: 700, fontSize: '0.875rem' }}>
                  {t.author}
                </div>
                {t.date && (
                  <div style={{ color: 'var(--color-muted-light)', fontSize: '0.75rem' }}>{t.date}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
