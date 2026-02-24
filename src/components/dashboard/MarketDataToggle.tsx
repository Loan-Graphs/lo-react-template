'use client'

interface MarketDataToggleProps {
  enabled: boolean
  onToggle: () => void
}

export default function MarketDataToggle({ enabled, onToggle }: MarketDataToggleProps) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <h3 style={{ color: 'var(--color-foreground)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          Market Data Pages
        </h3>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>
          {enabled ? 'Market Data: Active \u2705' : 'Market Data: Inactive'}
        </p>
      </div>
      <button
        onClick={onToggle}
        style={{
          backgroundColor: enabled ? 'var(--color-primary)' : 'var(--color-border)',
          borderRadius: '9999px',
          width: '44px',
          height: '24px',
          position: 'relative',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        aria-label={enabled ? 'Disable market data' : 'Enable market data'}
      >
        <span
          style={{
            position: 'absolute',
            top: '2px',
            left: enabled ? '22px' : '2px',
            width: '20px',
            height: '20px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transition: 'left 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
      </button>
    </div>
  )
}
