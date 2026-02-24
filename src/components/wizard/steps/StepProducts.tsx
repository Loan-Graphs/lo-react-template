'use client'

import type { WizardState, WizardLoanProduct } from '@/lib/wizard'

interface Props {
  state: WizardState
  onChange: (u: Partial<WizardState>) => void
}

function ProductCard({
  product,
  onToggle,
  onEdit,
}: {
  product: WizardLoanProduct
  onToggle: () => void
  onEdit: (field: keyof WizardLoanProduct, value: string) => void
}) {
  return (
    <div
      style={{
        border: `2px solid ${product.selected ? '#1a56db' : '#e2e8f0'}`,
        borderRadius: '0.75rem',
        padding: '1rem',
        backgroundColor: product.selected ? '#eff6ff' : '#fff',
        transition: 'all 0.15s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <input
          type="text"
          value={product.name}
          onChange={(e) => onEdit('name', e.target.value)}
          style={{
            fontWeight: 700,
            fontSize: '0.9rem',
            color: '#0f172a',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            flex: 1,
            marginRight: '0.5rem',
          }}
        />
        <button
          onClick={onToggle}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: `2px solid ${product.selected ? '#1a56db' : '#d1d5db'}`,
            backgroundColor: product.selected ? '#1a56db' : '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            padding: 0,
            fontSize: '0.7rem',
            color: '#fff',
          }}
        >
          {product.selected ? '✓' : ''}
        </button>
      </div>
      <textarea
        value={product.description}
        onChange={(e) => onEdit('description', e.target.value)}
        rows={2}
        style={{
          width: '100%',
          fontSize: '0.78rem',
          color: '#64748b',
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          resize: 'none',
          lineHeight: 1.5,
          boxSizing: 'border-box',
        }}
      />
    </div>
  )
}

export default function StepProducts({ state, onChange }: Props) {
  const toggle = (id: string) => {
    onChange({
      loanProducts: state.loanProducts.map((p) =>
        p.id === id ? { ...p, selected: !p.selected } : p
      ),
    })
  }

  const edit = (id: string, field: keyof WizardLoanProduct, value: string) => {
    onChange({
      loanProducts: state.loanProducts.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    })
  }

  const selected = state.loanProducts.filter((p) => p.selected)

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
        Loan Products
      </h2>
      <p style={{ color: '#64748b', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
        Select the loan products you offer. Click any name or description to edit the text.
      </p>
      <p style={{ color: '#94a3b8', fontSize: '0.78rem', marginBottom: '1.5rem' }}>
        {selected.length} products selected — these appear in your Loan Programs section.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {state.loanProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onToggle={() => toggle(p.id)}
            onEdit={(field, value) => edit(p.id, field, value)}
          />
        ))}
      </div>

      {selected.length === 0 && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '0.5rem',
            fontSize: '0.78rem',
            color: '#dc2626',
          }}
        >
          Select at least one product to show the Loan Programs section on your site.
        </div>
      )}
    </div>
  )
}
