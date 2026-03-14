import Image from 'next/image'
import type { TemplateProps } from '../types'

/**
 * Template 10 — "Revolve Pro" — Company View
 * Company-level variant: features the team, offices, and company CTA.
 */

export function CompanyView({ company }: TemplateProps) {
  const sky = '#0ea5e9'
  const navy = '#0f172a'
  const slateLight = '#f8fafc'

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero ─── */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)', borderRadius: '999px', padding: '0.35rem 0.9rem', marginBottom: '1.5rem' }}>
              <span style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: 600 }}>📍 Est. {company.foundedYear}</span>
            </div>
            <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }}>
              {company.name}
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 2rem' }}>
              {company.about}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <a href={`tel:${company.phone.replace(/\D/g, '')}`}
                style={{ backgroundColor: sky, color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: 700, textDecoration: 'none' }}>
                📞 {company.phone}
              </a>
              <a href={`mailto:${company.email}`}
                style={{ border: '2px solid rgba(14,165,233,0.5)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: 600, textDecoration: 'none' }}>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section style={{ backgroundColor: sky }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: `${company.loanOfficers.length}+`, label: 'Loan Officers' },
              { value: `${company.offices.length}`, label: 'Offices' },
              { value: `Est. ${company.foundedYear}`, label: 'In Business' },
              { value: '5★', label: 'Client Rating' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section style={{ backgroundColor: slateLight }} className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ color: navy, fontSize: '1.875rem', fontWeight: 800, marginBottom: '0.75rem' }}>Our Loan Officers</h2>
            <p style={{ color: '#64748b' }}>Experienced professionals ready to help you close.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.loanOfficers.map((officer, i) => (
              <div key={i} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '0.875rem', padding: '1.5rem', textAlign: 'center' }} className="hover:shadow-lg transition-shadow">
                <Image src={officer.photo} alt={officer.name} width={80} height={80} className="rounded-full mx-auto mb-3 object-cover" />
                <div style={{ fontWeight: 700, color: navy }}>{officer.name}</div>
                <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem' }}>{officer.title}</div>
                <a href={`mailto:${company.email}`}
                  style={{ backgroundColor: sky, color: 'white', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                  Contact
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Offices ─── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ color: navy, fontSize: '1.875rem', fontWeight: 800, marginBottom: '0.75rem' }}>Our Locations</h2>
            <p style={{ color: '#64748b' }}>Visit us in-person or reach us by phone.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.offices.map((office, i) => (
              <div key={i} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '0.875rem', padding: '1.5rem' }}>
                <div style={{ fontWeight: 700, color: navy, marginBottom: '0.35rem' }}>{office.city}, {office.state}</div>
                <div style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{office.address}</div>
                <a href={`tel:${office.phone.replace(/\D/g, '')}`} style={{ color: sky, fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                  📞 {office.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA banner ─── */}
      <section style={{ backgroundColor: navy }} className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Ready to Get Started?
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Our loan officers are standing by to help you close with confidence.
          </p>
          <a href={`tel:${company.phone.replace(/\D/g, '')}`}
            style={{ backgroundColor: sky, color: 'white', padding: '0.75rem 2rem', borderRadius: '0.625rem', fontWeight: 700, textDecoration: 'none' }}>
            Call Now: {company.phone}
          </a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ backgroundColor: '#020617', color: '#475569' }} className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p style={{ fontSize: '0.8rem' }}>
            {company.name} · {company.email} · {company.phone}
          </p>
          <p style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>
            Not a commitment to lend. Rates and terms subject to change.
          </p>
        </div>
      </footer>
    </div>
  )
}
