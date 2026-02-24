import { readdir, readFile } from 'fs/promises'
import path from 'path'
import type { ArticleDraft } from '@/lib/seo/pipeline'
import ArticleActions from './ArticleActions'

async function getAllDrafts(): Promise<ArticleDraft[]> {
  const draftsDir = path.join(process.cwd(), 'data', 'articles', 'drafts')
  const drafts: ArticleDraft[] = []

  try {
    const loSlugs = await readdir(draftsDir)
    for (const slug of loSlugs) {
      const slugDir = path.join(draftsDir, slug)
      try {
        const files = await readdir(slugDir)
        for (const file of files) {
          if (!file.endsWith('.json')) continue
          try {
            const raw = await readFile(path.join(slugDir, file), 'utf-8')
            drafts.push(JSON.parse(raw))
          } catch {
            // skip malformed files
          }
        }
      } catch {
        // skip if not a directory
      }
    }
  } catch {
    // drafts directory doesn't exist yet
  }

  return drafts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export const dynamic = 'force-dynamic'

export default async function AdminArticlesPage() {
  const drafts = await getAllDrafts()
  const pending = drafts.filter((d) => d.status === 'draft')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
          SEO Article Drafts
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>
          {pending.length} pending draft{pending.length !== 1 ? 's' : ''} &middot; {drafts.length} total article
          {drafts.length !== 1 ? 's' : ''}
        </p>

        {drafts.length === 0 ? (
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.75rem',
              padding: '3rem 2rem',
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#64748b' }}>No article drafts yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.75rem',
                borderCollapse: 'collapse',
                fontSize: '0.875rem',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                    LO Slug
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                    Article Title
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                    Topic
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                    Scheduled Publish
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                    Status
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {drafts.map((draft) => (
                  <tr key={draft.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem 1rem', color: '#0f172a', fontWeight: 500 }}>{draft.loSlug}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#374151', maxWidth: '300px' }}>{draft.title}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#374151' }}>{draft.topic}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                      {new Date(draft.scheduledPublish).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor:
                            draft.status === 'draft'
                              ? '#fef3c7'
                              : draft.status === 'approved'
                                ? '#dbeafe'
                                : '#d1fae5',
                          color:
                            draft.status === 'draft'
                              ? '#92400e'
                              : draft.status === 'approved'
                                ? '#1e40af'
                                : '#065f46',
                        }}
                      >
                        {draft.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <ArticleActions articleId={draft.id} status={draft.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
