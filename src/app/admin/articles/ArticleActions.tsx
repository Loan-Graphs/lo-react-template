'use client'

import { useState } from 'react'

interface ArticleActionsProps {
  articleId: string
  status: string
}

export default function ArticleActions({ articleId, status }: ArticleActionsProps) {
  const [actionStatus, setActionStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  async function handleApprove() {
    setActionStatus('loading')
    try {
      await fetch(`/api/seo/articles/${articleId}/approve`, { method: 'POST' })
      setActionStatus('done')
    } catch {
      setActionStatus('idle')
    }
  }

  async function handleRequestEdits() {
    setActionStatus('loading')
    try {
      await fetch(`/api/seo/articles/${articleId}/request-edits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: '' }),
      })
      setActionStatus('done')
    } catch {
      setActionStatus('idle')
    }
  }

  if (actionStatus === 'done') {
    return <span style={{ color: '#065f46', fontSize: '0.8rem', fontWeight: 600 }}>Action sent</span>
  }

  if (status !== 'draft') {
    return <span style={{ color: '#64748b', fontSize: '0.8rem' }}>&mdash;</span>
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button
        onClick={handleApprove}
        disabled={actionStatus === 'loading'}
        style={{
          padding: '0.25rem 0.75rem',
          fontSize: '0.75rem',
          fontWeight: 600,
          backgroundColor: '#059669',
          color: 'white',
          borderRadius: '0.375rem',
          border: 'none',
          cursor: 'pointer',
          opacity: actionStatus === 'loading' ? 0.7 : 1,
        }}
      >
        Approve
      </button>
      <button
        onClick={handleRequestEdits}
        disabled={actionStatus === 'loading'}
        style={{
          padding: '0.25rem 0.75rem',
          fontSize: '0.75rem',
          fontWeight: 600,
          backgroundColor: '#f59e0b',
          color: 'white',
          borderRadius: '0.375rem',
          border: 'none',
          cursor: 'pointer',
          opacity: actionStatus === 'loading' ? 0.7 : 1,
        }}
      >
        Request Edits
      </button>
    </div>
  )
}
