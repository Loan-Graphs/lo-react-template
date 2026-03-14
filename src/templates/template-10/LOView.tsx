import Image from 'next/image'
import type { TemplateProps } from '../types'

/**
 * Template 10 — "Revolve Pro"
 * Ported from Loan-Graphs/nathanloanteam (Nathan Tschappler's production site).
 * Dark navy hero with inline lead form, sky-blue stats bar, service cards,
 * social proof, testimonials, and blog teasers.
 */

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  const sky = '#0ea5e9'
  const navy = '#0f172a'
  const slateLight = '#f8fafc'

  const services = [
    { icon: '🏠', title: 'Home Purchase', description: "Buying your first home or upgrading? We'll find the right loan program — conventional, FHA, VA — and get you to closing fast." },
    { icon: '🔄', title: 'Refinance', description: 'Lower your rate, shorten your term, or pull cash out for renovations or debt consolidation.' },
    { icon: '📈', title: 'DSCR Investment Loans', description: 'Grow your rental portfolio without W2 income requirements. Qualify on your property\'s cash flow.' },
    { icon: '💵', title: 'FHA & Low Down Payment', description: '3–3.5% down payment options for eligible buyers. Down payment assistance programs available.' },
  ]

  const whyChoose = [
    `Local market expertise — ${lo.yearsInIndustry}+ years in the industry`,
    'Investor-friendly: DSCR, LLC lending, portfolio strategies',
    'Direct access to your loan officer — not a call center',
    'Fast closings: 21–30 days for most purchases',
    'Competitive rates across 50+ loan programs',
    'Clear communication throughout the entire process',
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero ─── */}
      <section
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', position: 'relative', overflow: 'hidden' }}
      >
        {/* Decorative orb */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                backgroundColor: 'rgba(14,165,233,0.15)',
                border: '1px solid rgba(14,165,233,0.3)',
                borderRadius: '999px', padding: '0.35rem 0.9rem', marginBottom: '1.25rem',
              }}>
                <span style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: 600 }}>
                  📍 Licensed in {lo.licensedStates.join(', ')}
                </span>
              </div>

              <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }}>
                Your Mortgage,{' '}
                <span style={{ color: sky }}>Done Right.</span>
              </h1>

              <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '520px' }}>
                {lo.name} is a licensed mortgage professional with {lo.yearsInIndustry}+ years of experience.
                Whether you&apos;re buying your first home or growing a rental portfolio, we&apos;ll get you to the
                closing table with the best loan for your situation.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <a href={`mailto:${lo.email}`}
                  style={{ backgroundColor: sky, color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
                  Get Pre-Approved →
                </a>
                <a href={`tel:${lo.phone.replace(/\D/g, '')}`}
                  style={{ border: '2px solid rgba(14,165,233,0.5)', color: 'white', borderRadius: '0.75rem', padding: '0.75rem 1.5rem', fontWeight: 600, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                  📞 {lo.phone}
                </a>
              </div>

              {/* Trust signals */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {['No Application Fees', 'Fast 24hr Pre-Approval', 'Direct LO Access'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ color: sky }}>✓</span>
                    <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — LO card (acts as lead form placeholder in template preview) */}
            <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.75rem', boxShadow: '0 25px 50px rgba(0,0,0,0.4)' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <Image src={lo.photo} alt={lo.name} width={100} height={100} className="rounded-full mx-auto mb-3 object-cover" />
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: navy }}>{lo.name}</div>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{lo.title} · NMLS #{lo.nmls}</div>
              </div>
              <a href={`mailto:${lo.email}`}
                style={{
                  display: 'block', textAlign: 'center', backgroundColor: sky, color: 'white',
                  padding: '0.875rem', borderRadius: '0.625rem', fontWeight: 700, fontSize: '1rem',
                  textDecoration: 'none', marginBottom: '0.75rem',
                }}>
                Get Your Free Quote →
              </a>
              <a href={`tel:${lo.phone.replace(/\D/g, '')}`}
                style={{
                  display: 'block', textAlign: 'center', border: '2px solid #e2e8f0',
                  color: navy, padding: '0.75rem', borderRadius: '0.625rem', fontWeight: 600,
                  textDecoration: 'none',
                }}>
                📞 {lo.phone}
              </a>
              <p style={{ color: '#94a3b8', fontSize: '0.72rem', textAlign: 'center', marginTop: '0.75rem' }}>
                Takes 2 minutes · No credit check until you&apos;re ready
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats bar ─── */}
      <section style={{ backgroundColor: sky }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '500+', label: 'Loans Closed' },
              { value: `${lo.yearsInIndustry}+`, label: 'Years Experience' },
              { value: '24hr', label: 'Pre-Approval' },
              { value: '5★', label: 'Client Rating' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', fontSize: '2.25rem', fontWeight: 800, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section style={{ backgroundColor: slateLight }} className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ color: navy, fontSize: '1.875rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Loan Programs for Every Situation
            </h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              From first-time buyers to experienced investors, we have the right loan program for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => (
              <div key={service.title}
                style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '0.875rem', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}
                className="hover:shadow-lg transition-shadow">
                <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{service.icon}</div>
                <h3 style={{ color: navy, fontWeight: 700, marginBottom: '0.5rem' }}>{service.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6, flex: 1 }}>{service.description}</p>
                <a href={`mailto:${lo.email}`}
                  style={{ color: sky, fontSize: '0.875rem', fontWeight: 600, marginTop: '1rem', textDecoration: 'none' }}>
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose ─── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 style={{ color: navy, fontSize: '1.875rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Why Work With {lo.name.split(' ')[0]}?
              </h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                There are a lot of loan officers out there. Here&apos;s what makes working with us different.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {whyChoose.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ color: sky, flexShrink: 0, marginTop: '2px' }}>✓</span>
                    <span style={{ color: '#374151' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <a href={`mailto:${lo.email}`}
                  style={{ backgroundColor: navy, color: 'white', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                  About {lo.name.split(' ')[0]}
                </a>
                <a href={`tel:${lo.phone.replace(/\D/g, '')}`}
                  style={{ border: `2px solid ${sky}`, color: sky, padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                  Schedule a Call
                </a>
              </div>
            </div>

            {/* Contact card */}
            <div style={{ backgroundColor: navy, borderRadius: '1rem', padding: '2rem', color: 'white' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Ready to get started?
              </h3>
              <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Reach out directly. We answer calls and reply to emails promptly.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href={`tel:${lo.phone.replace(/\D/g, '')}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', backgroundColor: sky, borderRadius: '0.625rem', color: 'white', fontWeight: 700, textDecoration: 'none' }}>
                  📞 Call: {lo.phone}
                </a>
                <a href={`mailto:${lo.email}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', border: '1px solid #334155', borderRadius: '0.625rem', color: '#cbd5e1', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                  ✉️ {lo.email}
                </a>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '1.25rem' }}>
                NMLS #{lo.nmls} · Licensed in {lo.licensedStates.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section style={{ backgroundColor: slateLight }} className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ color: navy, fontSize: '1.875rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              What Clients Say
            </h2>
            <p style={{ color: '#64748b' }}>Families and investors trust us with their most important financial decisions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lo.testimonials.map((t, i) => (
              <div key={i}
                style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '0.875rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '0.75rem' }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} style={{ color: '#f59e0b', fontSize: '0.9rem' }}>★</span>
                  ))}
                </div>
                <p style={{ color: '#374151', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: navy }}>{t.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Blog Teasers ─── */}
      {blogPosts.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
              <div>
                <h2 style={{ color: navy, fontSize: '1.875rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Mortgage Tips &amp; Insights
                </h2>
                <p style={{ color: '#64748b' }}>Learn before you borrow.</p>
              </div>
              <a href="/blog" style={{ color: sky, fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                All Articles →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.slice(0, 3).map((post) => (
                <div key={post.id}
                  style={{ border: '1px solid #e2e8f0', borderRadius: '0.875rem', overflow: 'hidden' }}>
                  <Image src={post.image} alt={post.title} width={400} height={200} className="w-full object-cover" style={{ height: '180px' }} />
                  <div style={{ padding: '1.25rem' }}>
                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{post.date} · {post.author}</p>
                    <h3 style={{ color: navy, fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{post.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5 }}>{post.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Email capture banner ─── */}
      <section style={{ backgroundColor: navy }} className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Get Weekly Mortgage Tips
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Rate updates, buying tips, and market insights — delivered free to your inbox.
          </p>
          <a href={`mailto:${lo.email}?subject=Subscribe+to+Mortgage+Tips`}
            style={{ backgroundColor: sky, color: 'white', padding: '0.75rem 2rem', borderRadius: '0.625rem', fontWeight: 700, textDecoration: 'none' }}>
            Subscribe Free →
          </a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ backgroundColor: '#020617', color: '#475569' }} className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p style={{ fontSize: '0.8rem' }}>
            {lo.name} · NMLS #{lo.nmls} · {lo.email} · {lo.phone}
          </p>
          <p style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>
            Licensed in {lo.licensedStates.join(', ')}. Not a commitment to lend. Rates and terms subject to change.
          </p>
        </div>
      </footer>
    </div>
  )
}
