import Image from 'next/image'
import type { TemplateProps } from '../types'

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  const firstName = lo.name.split(' ')[0]
  const statesLabel = lo.licenseStates?.join(', ') || lo.licenseStates?.join(', ')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header style={{ backgroundColor: '#1a2744' }} className="text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src={lo.photo} alt={lo.name} width={40} height={40} className="rounded-full" />
            <div>
              <div className="font-semibold">{lo.name}</div>
              <div className="text-xs text-gray-300">NMLS #{lo.nmls}</div>
            </div>
          </div>
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#about" className="hover:text-blue-300 transition">About</a>
            <a href="#services" className="hover:text-blue-300 transition">Services</a>
            <a href="#reviews" className="hover:text-blue-300 transition">Reviews</a>
            <a href="#contact" className="hover:text-blue-300 transition">Contact</a>
          </div>
          <a href={`tel:${lo.phone}`} className="text-sm font-medium hover:text-blue-300">{lo.phone}</a>
        </div>
      </header>

      {/* 1. Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{lo.headline || 'Your Trusted Mortgage Professional'}</h1>
          <p className="text-lg text-gray-600 mb-6">{lo.subheadline || lo.bio}</p>
          <div className="flex gap-4">
            <a href="#contact" className="px-6 py-3 text-white rounded-lg font-semibold transition" style={{ backgroundColor: '#1a2744' }}>Get Pre-Approved &rarr;</a>
            <a href={`tel:${lo.phone}`} className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-gray-500 transition">Call Now</a>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 border">
          <Image src={lo.photo} alt={lo.name} width={200} height={200} className="rounded-xl mx-auto mb-4" />
          <h3 className="text-lg font-bold text-center text-gray-900">{lo.name}</h3>
          <p className="text-sm text-center text-gray-500 mb-4">{lo.title}</p>
          <div className="space-y-3 text-sm">
            <a href={`mailto:${lo.email}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-800">📧 {lo.email}</a>
            <a href={`tel:${lo.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-800">📞 {lo.phone}</a>
            {statesLabel && <p className="text-gray-600">📍 {statesLabel}</p>}
          </div>
        </div>
      </section>

      {/* 2. Social Proof Bar */}
      <section style={{ backgroundColor: '#1a2744' }} className="text-white">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><div className="text-3xl font-bold">{lo.googleRating || 5}★</div><p className="text-gray-300 text-sm mt-1">Google Rating</p></div>
          <div><div className="text-3xl font-bold">{lo.reviewCount || '100'}+</div><p className="text-gray-300 text-sm mt-1">Reviews</p></div>
          <div><div className="text-3xl font-bold">{lo.yearsExperience || lo.yearsInIndustry}+</div><p className="text-gray-300 text-sm mt-1">Years Experience</p></div>
          <div><div className="text-3xl font-bold">24hr</div><p className="text-gray-300 text-sm mt-1">Pre-Approval</p></div>
        </div>
      </section>

      {/* 3. Loan Products */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Loan Programs</h2>
        <p className="text-gray-500 mb-8">From first-time buyers to investors, {firstName} has the right loan.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {lo.loanProducts.map((product) => (
            <div key={product.id} className="border rounded-xl p-6 hover:shadow-md transition">
              <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Me */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Work With {firstName}?</h2>
            <ul className="space-y-3">
              {lo.differentiators.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-blue-700 mt-1">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border rounded-xl p-8">
            <h3 className="font-bold text-gray-900 text-xl mb-2">Ready to get started?</h3>
            <p className="text-gray-500 text-sm mb-6">{firstName} answers the phone and replies promptly.</p>
            <a href={`tel:${lo.phone}`} className="block w-full text-center px-6 py-3 text-white rounded-lg font-semibold transition mb-3" style={{ backgroundColor: '#1a2744' }}>Call {lo.phone}</a>
            <a href={`mailto:${lo.email}`} className="block w-full text-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:border-gray-500 transition">{lo.email}</a>
            <p className="text-gray-400 text-xs mt-4">{lo.company} · NMLS# {lo.nmls}</p>
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Free Consultation', desc: 'Tell us about your goals. We\'ll review your situation and recommend the best options.' },
            { step: '02', title: 'Get Pre-Approved', desc: 'Submit your application and get a pre-approval letter — often within 24 hours.' },
            { step: '03', title: 'Close & Celebrate', desc: 'We handle paperwork, coordinate with title, and get you to the closing table.' },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4 text-white" style={{ backgroundColor: '#1a2744' }}>{s.step}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Market Rates Widget */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Today&apos;s Rates</h2>
          <p className="text-gray-500 text-center mb-12">Contact {firstName} for a personalized quote.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '30-Year Fixed', rate: '6.875%' },
              { label: '15-Year Fixed', rate: '6.125%' },
              { label: 'FHA 30-Year', rate: '6.500%' },
              { label: 'VA 30-Year', rate: '6.250%' },
            ].map((r) => (
              <div key={r.label} className="bg-white border rounded-xl p-4 text-center">
                <div className="text-gray-500 text-xs font-semibold mb-1">{r.label}</div>
                <div className="text-2xl font-bold text-gray-900">{r.rate}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs text-center mt-4">Rates for illustration only.</p>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section id="reviews" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What Clients Say</h2>
        <p className="text-gray-500 mb-8">Families and investors trust {firstName} with their mortgage.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {lo.testimonials.map((t) => (
            <div key={t.id} className="border rounded-xl p-6">
              <div className="flex gap-1 mb-3">{[...Array(t.rating)].map((_, j) => <span key={j} className="text-yellow-500">★</span>)}</div>
              <p className="text-gray-600 mb-4">&ldquo;{t.text}&rdquo;</p>
              <p className="font-semibold text-gray-900 text-sm">— {t.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. About */}
      <section id="about" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <Image src={lo.photo} alt={lo.name} width={320} height={400} className="rounded-xl mx-auto" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">About {lo.name}</h2>
            <p className="text-blue-800 font-medium mb-4">{lo.title} · NMLS# {lo.nmls}</p>
            <p className="text-gray-600 leading-relaxed">{lo.bio}</p>
            {lo.company && <p className="text-gray-400 text-sm mt-4">{lo.company}</p>}
          </div>
        </div>
      </section>

      {/* 9. Lead Capture Form */}
      <section id="contact" className="py-16" style={{ backgroundColor: '#1a2744' }}>
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8">Contact {lo.name} today. No obligation.</p>
          <div className="bg-white/10 rounded-xl p-8 max-w-md mx-auto text-left">
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" />
              <input type="tel" placeholder="Phone" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" />
              <button className="w-full px-6 py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition">Get Free Consultation</button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Blog Resources */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Mortgage Tips & Insights</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition">
              <div className="relative h-40"><Image src={post.image} alt={post.title} fill className="object-cover" /></div>
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-2">{new Date(post.date).toLocaleDateString()}</p>
                <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-500 text-sm">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Footer */}
      <footer style={{ backgroundColor: '#1a2744', color: '#94a3b8' }} className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="text-white font-bold">{lo.name}</div>
              <div className="text-sm">{lo.title}</div>
              {lo.company && <div className="text-sm">{lo.company}</div>}
            </div>
            <div className="text-sm space-y-1">
              <div>📞 {lo.phone}</div>
              <div>📧 {lo.email}</div>
            </div>
            <div className="text-sm">
              <div>NMLS# {lo.nmls}</div>
              <div>Licensed in: {statesLabel}</div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} {lo.name}. All rights reserved. Equal Housing Lender.</p>
            <p className="mt-1">Not a commitment to lend. All loans subject to credit approval.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
