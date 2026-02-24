import { readFile } from 'fs/promises'
import path from 'path'

interface CustomizationRequest {
  id: string
  timestamp: string
  loSlug: string
  name: string
  email: string
  request: string
  status: string
}

async function getRequests(): Promise<CustomizationRequest[]> {
  try {
    const raw = await readFile(path.join(process.cwd(), 'data', 'customization-requests.json'), 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export const dynamic = 'force-dynamic'

export default async function AdminRequestsPage() {
  const requests = await getRequests()
  const pending = requests.filter((r) => r.status === 'pending')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
          Customization Requests
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>
          {pending.length} pending request{pending.length !== 1 ? 's' : ''}
        </p>

        {requests.length === 0 ? (
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.75rem',
              padding: '3rem 2rem',
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#64748b' }}>No customization requests yet.</p>
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
                    Name
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                    Email
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                    Request
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                    Timestamp
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem 1rem', color: '#0f172a', fontWeight: 500 }}>
                      {req.loSlug}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#374151' }}>{req.name}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#374151' }}>{req.email}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#374151', maxWidth: '300px' }}>
                      {req.request}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                      {new Date(req.timestamp).toLocaleString()}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: req.status === 'pending' ? '#fef3c7' : '#d1fae5',
                          color: req.status === 'pending' ? '#92400e' : '#065f46',
                        }}
                      >
                        {req.status}
                      </span>
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
