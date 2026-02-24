'use client'

import type { ArticleDraft } from '@/lib/seo/pipeline'

interface ContentCalendarProps {
  articles: ArticleDraft[]
}

const statusColors: Record<string, { bg: string; color: string }> = {
  draft: { bg: '#fef3c7', color: '#92400e' },
  approved: { bg: '#dbeafe', color: '#1e40af' },
  published: { bg: '#d1fae5', color: '#065f46' },
}

export default function ContentCalendar({ articles }: ContentCalendarProps) {
  const sorted = [...articles].sort(
    (a, b) => new Date(a.scheduledPublish).getTime() - new Date(b.scheduledPublish).getTime()
  )

  return (
    <div>
      <h3
        style={{
          color: 'var(--color-foreground, #0f172a)',
          fontSize: '1.125rem',
          fontWeight: 700,
          marginBottom: '1rem',
        }}
      >
        Content Calendar
      </h3>

      {sorted.length === 0 ? (
        <div
          style={{
            backgroundColor: 'var(--section-bg-alt, #f8fafc)',
            border: '1px solid var(--color-border, #e2e8f0)',
            borderRadius: '0.75rem',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--color-muted, #64748b)', fontSize: '0.9rem' }}>
            No articles scheduled yet.
          </p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              backgroundColor: 'white',
              border: '1px solid var(--color-border, #e2e8f0)',
              borderRadius: '0.75rem',
              borderCollapse: 'collapse',
              fontSize: '0.875rem',
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: '1px solid var(--color-border, #e2e8f0)',
                  backgroundColor: 'var(--section-bg-alt, #f8fafc)',
                }}
              >
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                  Draft
                </th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                  Scheduled Publish
                </th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                  Topic
                </th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((article) => {
                const colors = statusColors[article.status] || statusColors.draft
                return (
                  <tr key={article.id} style={{ borderBottom: '1px solid var(--color-border, #e2e8f0)' }}>
                    <td
                      style={{
                        padding: '0.75rem 1rem',
                        color: 'var(--color-foreground, #0f172a)',
                        fontWeight: 500,
                        maxWidth: '300px',
                      }}
                    >
                      {article.title}
                    </td>
                    <td
                      style={{
                        padding: '0.75rem 1rem',
                        color: 'var(--color-muted, #64748b)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {new Date(article.scheduledPublish).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#374151' }}>{article.topic}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: colors.bg,
                          color: colors.color,
                        }}
                      >
                        {article.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
