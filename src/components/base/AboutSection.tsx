import Image from 'next/image'
import type { LOProfile } from '@/types/lo-profile'

interface AboutSectionProps {
  loProfile: LOProfile
}

export default function AboutSection({ loProfile }: AboutSectionProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {loProfile.photo && (
            <div className="flex justify-center lg:justify-start">
              <div
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  width: '320px',
                  height: '400px',
                  position: 'relative',
                }}
              >
                <Image
                  src={loProfile.photo}
                  alt={`${loProfile.name} — ${loProfile.title}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="320px"
                />
              </div>
            </div>
          )}

          <div>
            <h2
              style={{ color: 'var(--color-foreground)', fontSize: '1.875rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}
              className="mb-2"
            >
              About {loProfile.name}
            </h2>
            <p style={{ color: 'var(--color-primary)', fontWeight: 600, marginBottom: '1rem' }}>
              {loProfile.title} {loProfile.nmls && `· NMLS# ${loProfile.nmls}`}
            </p>
            <div
              style={{ color: '#374151', fontSize: '0.95rem', lineHeight: 1.8 }}
              className="space-y-4"
            >
              {loProfile.bio.split('\n').filter(Boolean).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            {loProfile.company && (
              <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginTop: '1.5rem' }}>
                {loProfile.company}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
