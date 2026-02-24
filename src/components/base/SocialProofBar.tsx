import { Star } from 'lucide-react'
import type { LOProfile } from '@/types/lo-profile'

interface SocialProofBarProps {
  loProfile: LOProfile
}

export default function SocialProofBar({ loProfile }: SocialProofBarProps) {
  const stats = [
    {
      value: loProfile.googleRating > 0 ? `${loProfile.googleRating}★` : '5★',
      label: 'Google Rating',
    },
    {
      value: loProfile.reviewCount > 0 ? `${loProfile.reviewCount}+` : '100+',
      label: 'Client Reviews',
    },
    {
      value: loProfile.yearsExperience > 0 ? `${loProfile.yearsExperience}+` : '8+',
      label: 'Years Experience',
    },
    { value: '24hr', label: 'Pre-Approval' },
  ]

  return (
    <section style={{ backgroundColor: 'var(--color-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div style={{ color: 'white', fontSize: '2.25rem', fontWeight: 800, lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
