import Image from 'next/image'
import type { TemplateProps } from '../types'

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  const firstName = lo.name.split(' ')[0]
  const statesLabel = lo.licenseStates?.length > 0
    ? lo.licenseStates.slice(0, 3).join(', ') + (lo.licenseStates.length > 3 ? ' & more' : '')
    : ''

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold">{lo.name}</span>
        <div className="hidden md:flex gap-6 text-sm text-gray-400">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#services" className="hover:text-white transition">Services</a>
          <a href="#reviews" className="hover:text-white transition">Reviews</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
        <a href={`tel:${lo.phone}`} className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-500 transition">{lo.phone}</a>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="text-blue-400 font-medium mb-3">NMLS #{lo.nmls} {statesLabel && `· Licensed in ${statesLabel}`}</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{lo.headline || 'Your Mortgage, Done Right.'}</h1>
            <p className="text-gray-300 mb-8 max-w-lg">{lo.subheadline || lo.bio}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-500 transition">Get Pre-Approved &rarr;</a>
              <a href={`tel:${lo.phone}`} className="px-6 py-3 border border-gray-600 rounded-lg font-semibold hover:border-white transition">Call Now</a>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Image src={lo.photo} alt={lo.name} width={280} height={280} className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* 2. Social Proof Bar */}
      <section className="border-y border-gray-800 bg-blue-600">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><div className="text-3xl font-bold">{lo.googleRating || 5}★</div><p className="text-blue-100 text-sm mt-1">Google Rating</p></div>
          <div><div className="text-3xl font-bold">{lo.reviewCount || '100'}+</div><p className="text-blue-100 text-sm mt-1">Reviews</p></div>
          <div><div className="text-3xl font-bold">{lo.yearsExperience || lo.yearsInIndustry}+</div><p className="text-blue-100 text-sm mt-1">Years Experience</p></div>
          <div><div className="text-3xl font-bold">24hr</div><p className="text-blue-100 text-sm mt-1">Pre-Approval</p></div>
        </div>
      </section>

      {/* 3. Loan Products */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-4 text-center">Loan Programs</h2>
        <p className="text-gray-400 text-center mb-12 max-w-lg mx-auto">From first-time buyers to experienced investors, {firstName} has the right loan program for you.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {lo.loanProducts.map((product) => (
            <div key={product.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-400 text-sm">{product.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Me */}
      <section className="bg-gray-900/50 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Work With {firstName}?</h2>
            <ul className="space-y-3">
              {lo.differentiators.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-2">Ready to get started?</h3>
            <p className="text-gray-400 mb-6 text-sm">Reach out directly. {firstName} answers the phone.</p>
            <a href={`tel:${lo.phone}`} className="block w-full text-center px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-500 transition mb-3">Call {lo.phone}</a>
            <a href={`mailto:${lo.email}`} className="block w-full text-center px-6 py-3 border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500 transition">{lo.email}</a>
            <p className="text-gray-600 text-xs mt-4">{lo.company} · NMLS# {lo.nmls}</p>
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Free Consultation', desc: 'Tell us about your goals and we\'ll recommend the best loan options.' },
            { step: '2', title: 'Get Pre-Approved', desc: 'Submit your application and get a pre-approval letter — often within 24 hours.' },
            { step: '3', title: 'Close & Celebrate', desc: 'We handle paperwork, coordinate with title, and get you to the closing table.' },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">{s.step}</div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Market Rates Widget */}
      <section className="bg-gray-900/50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">Today&apos;s Rates</h2>
          <p className="text-gray-400 text-center mb-12">Contact {firstName} for a personalized rate quote.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '30-Year Fixed', rate: '6.875%' },
              { label: '15-Year Fixed', rate: '6.125%' },
              { label: 'FHA 30-Year', rate: '6.500%' },
              { label: 'VA 30-Year', rate: '6.250%' },
            ].map((r) => (
              <div key={r.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
                <div className="text-gray-500 text-xs font-semibold mb-1">{r.label}</div>
                <div className="text-2xl font-bold">{r.rate}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-xs text-center mt-4">Rates shown for illustration only. Actual rate depends on credit, loan amount, and other factors.</p>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section id="reviews" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-4 text-center">What Clients Say</h2>
        <p className="text-gray-400 text-center mb-12">Families and investors have trusted {firstName} with their mortgage.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {lo.testimonials.map((t) => (
            <div key={t.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex gap-1 mb-3">{[...Array(t.rating)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}</div>
              <p className="text-gray-300 italic mb-4">&ldquo;{t.text}&rdquo;</p>
              <p className="font-semibold text-sm">— {t.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. About Section */}
      <section id="about" className="bg-gray-900/50 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image src={lo.photo} alt={lo.name} width={320} height={400} className="rounded-2xl shadow-2xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">About {lo.name}</h2>
            <p className="text-blue-400 font-medium mb-4">{lo.title} · NMLS# {lo.nmls}</p>
            <p className="text-gray-300 leading-relaxed">{lo.bio}</p>
            {lo.company && <p className="text-gray-500 text-sm mt-4">{lo.company}</p>}
          </div>
        </div>
      </section>

      {/* 9. Lead Capture Form */}
      <section id="contact" className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8">Contact {lo.name} today for a free consultation. No obligation.</p>
          <div className="bg-white/10 backdrop-blur rounded-xl p-8 max-w-md mx-auto text-left">
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200/60" />
              <input type="tel" placeholder="Phone" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200/60" />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200/60" />
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-blue-200/60">
                <option>Loan Purpose</option>
                <option>Purchase</option>
                <option>Refinance</option>
                <option>Investment</option>
              </select>
              <button className="w-full px-6 py-3 bg-white text-blue-700 rounded-lg font-bold hover:bg-blue-50 transition">Get Free Consultation</button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Blog Resources */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Mortgage Tips & Insights</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition">
              <div className="relative h-44"><Image src={post.image} alt={post.title} fill className="object-cover" /></div>
              <div className="p-5">
                <p className="text-xs text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>
                <h3 className="font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-400 text-sm">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="font-bold mb-2">{lo.name}</div>
              <div className="text-gray-500 text-sm">{lo.title}</div>
              {lo.company && <div className="text-gray-500 text-sm">{lo.company}</div>}
            </div>
            <div className="text-sm text-gray-400 space-y-1">
              <div>📞 {lo.phone}</div>
              <div>📧 {lo.email}</div>
            </div>
            <div className="text-sm text-gray-500">
              <div>NMLS# {lo.nmls}</div>
              <div>Licensed in: {(lo.licenseStates || lo.licensedStates)?.join(', ')}</div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-600 text-xs">
            <p>&copy; {new Date().getFullYear()} {lo.name}. All rights reserved. Equal Housing Lender.</p>
            <p className="mt-1">Not a commitment to lend. All loans subject to credit approval.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
