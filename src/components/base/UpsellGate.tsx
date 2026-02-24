import { Lock } from 'lucide-react'
import type { LOProfile } from '@/types/lo-profile'

interface UpsellGateProps {
  feature: 'market-data' | 'seo-articles'
  loProfile: LOProfile
  children: React.ReactNode
}

const FEATURE_LABELS: Record<UpsellGateProps['feature'], string> = {
  'market-data': 'Live Market Data',
  'seo-articles': 'SEO Blog Articles',
}

export default function UpsellGate({ feature, loProfile, children }: UpsellGateProps) {
  const isEnabled =
    (feature === 'market-data' && loProfile.marketDataEnabled) ||
    (feature === 'seo-articles' && loProfile.seoArticlesEnabled)

  if (loProfile.plan !== 'free' || isEnabled) {
    return <>{children}</>
  }

  const label = FEATURE_LABELS[feature]

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          style={{
            backgroundColor: 'var(--section-bg-alt)',
            border: '2px dashed var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2rem',
          }}
        >
          <Lock size={32} style={{ color: 'var(--color-muted)', margin: '0 auto 1rem' }} />
          <h3
            style={{ color: 'var(--color-foreground)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}
          >
            Upgrade to unlock {label}
          </h3>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            {feature === 'market-data'
              ? 'Display live mortgage rates on your website to build trust and capture leads.'
              : 'Auto-generated SEO articles tailored to your target markets and topics.'}
          </p>
          <a
            href="/upgrade"
            style={{ backgroundColor: 'var(--color-accent)', borderRadius: 'var(--radius-md)' }}
            className="inline-block px-6 py-3 text-white font-bold hover:opacity-90 transition-opacity"
          >
            Upgrade Now
          </a>
        </div>
      </div>
    </section>
  )
}
