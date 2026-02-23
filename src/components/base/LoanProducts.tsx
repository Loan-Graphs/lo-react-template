import { Home, RefreshCw, TrendingUp, DollarSign } from 'lucide-react'
import Link from 'next/link'
import type { LOProfile } from '@/types/lo-profile'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  home: Home,
  refinance: RefreshCw,
  investment: TrendingUp,
  dollar: DollarSign,
}

interface LoanProductsProps {
  loProfile: LOProfile
}

export default function LoanProducts({ loProfile }: LoanProductsProps) {
  const firstName = loProfile.name.split(' ')[0]

  return (
    <section style={{ backgroundColor: 'var(--section-bg-alt)' }} className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            style={{ color: 'var(--color-foreground)', fontSize: '1.875rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}
            className="mb-3"
          >
            Loan Programs for Every Situation
          </h2>
          <p style={{ color: 'var(--color-muted)', maxWidth: '600px' }} className="mx-auto">
            From first-time buyers to experienced investors, {firstName} has the right loan program for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loProfile.loanProducts.map((product) => {
            const IconComponent = ICON_MAP[product.icon ?? ''] ?? Home
            return (
              <div
                key={product.id}
                style={{
                  backgroundColor: 'white',
                  border: `1px solid var(--color-border)`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                className="hover:shadow-lg transition-shadow"
              >
                <div
                  style={{
                    backgroundColor: 'var(--color-primary-light)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.75rem',
                    width: 'fit-content',
                    marginBottom: '1rem',
                  }}
                >
                  <IconComponent size={22} style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 style={{ color: 'var(--color-foreground)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {product.name}
                </h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.6, flex: 1 }}>
                  {product.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
