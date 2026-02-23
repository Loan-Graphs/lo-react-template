import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { LOProfile } from '@/types/lo-profile'

const PLACEHOLDER_RATES = [
  { label: '30-Year Fixed', rate: '6.875%', trend: 'down' as const },
  { label: '15-Year Fixed', rate: '6.125%', trend: 'down' as const },
  { label: 'FHA 30-Year', rate: '6.500%', trend: 'flat' as const },
  { label: 'VA 30-Year', rate: '6.250%', trend: 'down' as const },
]

const TrendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus,
}

interface MarketRatesWidgetProps {
  loProfile: LOProfile
}

export default function MarketRatesWidget({ loProfile }: MarketRatesWidgetProps) {
  const firstName = loProfile.name.split(' ')[0]

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            style={{ color: 'var(--color-foreground)', fontSize: '1.875rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}
            className="mb-3"
          >
            Today&apos;s Mortgage Rates
          </h2>
          <p style={{ color: 'var(--color-muted)', maxWidth: '600px' }} className="mx-auto">
            Rates update daily. Contact {firstName} for a personalized rate quote.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLACEHOLDER_RATES.map((item) => {
            const Icon = TrendIcon[item.trend]
            const trendColor = item.trend === 'down' ? '#16a34a' : item.trend === 'up' ? '#dc2626' : 'var(--color-muted)'
            return (
              <div
                key={item.label}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ color: 'var(--color-muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {item.label}
                </div>
                <div style={{ color: 'var(--color-foreground)', fontSize: '1.75rem', fontWeight: 800, lineHeight: 1 }}>
                  {item.rate}
                </div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Icon size={14} style={{ color: trendColor }} />
                  <span style={{ color: trendColor, fontSize: '0.75rem', fontWeight: 600 }}>
                    {item.trend === 'down' ? 'Down' : item.trend === 'up' ? 'Up' : 'Flat'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <p style={{ color: 'var(--color-muted-light)', fontSize: '0.7rem', textAlign: 'center', marginTop: '1rem' }}>
          Rates shown are for illustration only. Your actual rate depends on credit score, loan amount, and other factors.
        </p>
      </div>
    </section>
  )
}
