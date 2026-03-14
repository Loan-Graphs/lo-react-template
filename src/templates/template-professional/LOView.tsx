import Image from 'next/image'
import type { TemplateProps } from '../types'

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  const firstName = lo.name.split(' ')[0]
  const states = lo.licensedStates || []

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Top Bar */}
      <div className="bg-green-900 text-green-100 text-xs py-2 px-8 flex justify-between items-center">
        <span>NMLS #{lo.nmls} · {lo.company}</span>
        <span className="hidden md:flex gap-6">
          <span>📞 {lo.phone}</span>
          <span>📧 {lo.email}</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-800 flex items-center justify-center text-white font-bold text-sm">
              {lo.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="font-bold text-gray-900">{lo.name}</div>
              <div className="text-xs text-gray-500">{lo.title}</div>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-gray-600 font-medium">
            <a href="#about" className="hover:text-green-700 transition">About</a>
            <a href="#programs" className="hover:text-green-700 transition">Programs</a>
            <a href="#reviews" className="hover:text-green-700 transition">Testimonials</a>
            <a href="#contact" className="hover:text-green-700 transition">Contact</a>
          </div>
          <a
            href="https://loangraphs.com/signup"
            className="px-6 py-2.5 bg-green-800 text-white text-sm font-semibold hover:bg-green-700 transition"
          >
            Use This Template
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-green-400" />
              <span className="text-green-300 text-sm font-semibold tracking-widest uppercase">Licensed Mortgage Professional</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {lo.headline || `Trusted Mortgage Guidance.`}
            </h1>
            <p className="text-green-100 text-lg mb-8 max-w-xl leading-relaxed">{lo.subheadline || lo.bio}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact"
                className="px-8 py-4 bg-white text-green-900 font-bold hover:bg-green-50 transition">
                Schedule a Consultation
              </a>
              <a href={`tel:${lo.phone}`}
                className="px-8 py-4 border border-green-400 text-white font-semibold hover:bg-white/10 transition">
                📞 {lo.phone}
              </a>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute -inset-3 border border-green-400/30" />
              <Image src={lo.photo} alt={lo.name} width={300} height={360}
                className="relative z-10 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 border-y border-gray-200 py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: '🏆', v: `${lo.yearsExperience || lo.yearsInIndustry || 10}+`, l: 'Years Experience' },
            { icon: '⭐', v: `${lo.googleRating || 5.0}/5`, l: 'Google Rating' },
            { icon: '📋', v: `${lo.reviewCount || 100}+`, l: 'Verified Reviews' },
            { icon: '🏠', v: `${states.length || 4}`, l: 'States Licensed' },
          ].map((b) => (
            <div key={b.l} className="flex items-center gap-3 justify-center">
              <span className="text-2xl">{b.icon}</span>
              <div className="text-left">
                <div className="text-xl font-bold text-gray-900">{b.v}</div>
                <div className="text-xs text-gray-500">{b.l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-green-700" />
              <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">Loan Programs</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Financing Solutions for Every Situation</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {lo.loanProducts.map((product) => (
              <div key={product.id}
                className="bg-white border border-gray-200 rounded-none p-8 hover:border-green-700 hover:shadow-lg transition group">
                <div className="w-12 h-12 bg-green-50 border border-green-200 flex items-center justify-center mb-5 group-hover:bg-green-700 transition">
                  <span className="text-green-700 group-hover:text-white transition font-bold text-lg">
                    {product.name[0]}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{product.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Me / CTA */}
      <section className="py-20 px-6 bg-green-900 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-green-400" />
              <span className="text-green-300 text-sm font-semibold tracking-widest uppercase">Why {firstName}</span>
            </div>
            <h2 className="text-4xl font-bold mb-8">The Professional Difference</h2>
            <ul className="space-y-4">
              {lo.differentiators.map((item, i) => (
                <li key={i} className="flex items-start gap-3 pb-4 border-b border-green-800">
                  <span className="text-green-400 font-bold mt-0.5">✓</span>
                  <span className="text-green-100">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white text-gray-900 p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Request a Consultation</h3>
            <div className="h-px w-12 bg-green-700 mb-6" />
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Full Name</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-200 focus:border-green-700 outline-none transition text-sm" placeholder="John Smith" />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Phone</label>
                <input type="tel" className="w-full px-4 py-3 border border-gray-200 focus:border-green-700 outline-none transition text-sm" placeholder="(555) 000-0000" />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Loan Purpose</label>
                <select className="w-full px-4 py-3 border border-gray-200 focus:border-green-700 outline-none transition text-sm bg-white">
                  <option>Select...</option>
                  <option>Purchase</option>
                  <option>Refinance</option>
                  <option>Investment Property</option>
                </select>
              </div>
              <button className="w-full py-4 bg-green-800 text-white font-semibold hover:bg-green-700 transition">
                Schedule Consultation
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4">{lo.company} · NMLS #{lo.nmls}</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-green-700" />
              <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">Simple Process</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">From Application to Closing</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { n: 1, t: 'Initial Consultation', d: 'We review your goals and recommend the optimal loan strategy.' },
              { n: 2, t: 'Document Gathering', d: 'Simple checklist. We guide you every step of the way.' },
              { n: 3, t: 'Pre-Approval', d: 'Strong, verified pre-approval letter within 24 hours.' },
              { n: 4, t: 'Closing', d: 'We coordinate all parties for a smooth, on-time close.' },
            ].map((step) => (
              <div key={step.n} className="bg-white p-8 border border-gray-200 relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-green-700" />
                <div className="text-3xl font-bold text-green-100 mb-3">{String(step.n).padStart(2, '0')}</div>
                <h3 className="font-bold text-gray-900 mb-2">{step.t}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rates */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-green-700" />
              <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">Market Rates</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Today&apos;s Indicative Rates</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-gray-200">
            {[
              { l: '30-Year Fixed', r: '6.875%' },
              { l: '15-Year Fixed', r: '6.125%' },
              { l: 'FHA 30-Year', r: '6.500%' },
              { l: 'VA 30-Year', r: '6.250%' },
            ].map((rate, i) => (
              <div key={rate.l} className={`p-8 text-center border border-gray-200 ${i === 0 ? 'bg-green-800 text-white' : 'bg-white'}`}>
                <div className={`text-xs font-semibold tracking-widest mb-2 uppercase ${i === 0 ? 'text-green-200' : 'text-gray-400'}`}>{rate.l}</div>
                <div className={`text-3xl font-bold ${i === 0 ? 'text-white' : 'text-gray-900'}`}>{rate.r}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">Rates for illustration only. Contact {firstName} for a personalized quote based on your credit profile and property.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-green-700" />
              <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">Testimonials</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {lo.testimonials.map((t) => (
              <div key={t.id} className="bg-white p-8 border border-gray-200 hover:border-green-700 transition">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic text-sm">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-800 flex items-center justify-center text-white font-bold text-xs">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.author}</p>
                    {t.date && <p className="text-gray-400 text-xs">{t.date}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-green-700" />
              <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">About</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">{lo.name}</h2>
            <p className="text-green-700 font-semibold mb-6">{lo.title} · NMLS# {lo.nmls}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{lo.bio}</p>
            <div className="flex flex-wrap gap-2">
              {states.map(s => (
                <span key={s} className="px-3 py-1 bg-green-50 text-green-800 text-xs font-semibold border border-green-200">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <Image src={lo.photo} alt={lo.name} width={420} height={500} className="object-cover w-full" />
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="contact" className="py-20 px-6 bg-green-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="h-px w-10 bg-green-400" />
            <span className="text-green-300 text-sm font-semibold tracking-widest uppercase">Get Started</span>
            <div className="h-px w-10 bg-green-400" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Take the First Step Today</h2>
          <p className="text-green-100 mb-10">Complete the form below and {firstName} will be in touch within one business day.</p>
          <div className="bg-white text-gray-900 p-10 text-left">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="px-4 py-3 border border-gray-200 focus:border-green-700 outline-none transition text-sm w-full" />
              <input type="tel" placeholder="Phone" className="px-4 py-3 border border-gray-200 focus:border-green-700 outline-none transition text-sm w-full" />
              <input type="email" placeholder="Email" className="px-4 py-3 border border-gray-200 focus:border-green-700 outline-none transition text-sm w-full" />
              <select className="px-4 py-3 border border-gray-200 focus:border-green-700 outline-none transition text-sm bg-white text-gray-500 w-full">
                <option>Loan Purpose</option>
                <option>Purchase</option>
                <option>Refinance</option>
                <option>Investment Property</option>
              </select>
            </div>
            <button className="mt-6 w-full py-4 bg-green-800 text-white font-semibold hover:bg-green-700 transition">
              Submit Request
            </button>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-green-700" />
              <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">Resources</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Mortgage Knowledge Center</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="group border border-gray-200 hover:border-green-700 transition">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-xs text-green-700 font-semibold mb-2 uppercase tracking-widest">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                  <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use This Template CTA */}
      <section className="py-16 bg-gray-50 text-center border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-xs text-green-700 font-semibold tracking-widest uppercase mb-3">Powered by LoanGraphs</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Want a professional website like this?</h2>
          <p className="text-gray-500 mb-8">Free to start. Full customization. No credit card required.</p>
          <a
            href="https://loangraphs.com/signup"
            className="inline-block px-10 py-4 bg-green-800 text-white font-semibold hover:bg-green-700 transition"
          >
            Use This Template Free →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-green-300 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-bold text-white mb-1">{lo.name}</div>
            <div className="text-sm">{lo.title}</div>
            <div className="text-sm">{lo.company}</div>
          </div>
          <div className="text-sm space-y-1">
            <div>📞 {lo.phone}</div>
            <div>📧 {lo.email}</div>
          </div>
          <div className="text-sm">
            <div>NMLS# {lo.nmls}</div>
            {states.length > 0 && <div>Licensed: {states.join(', ')}</div>}
          </div>
        </div>
        <div className="border-t border-green-800 pt-6 text-center text-xs text-green-600">
          &copy; {new Date().getFullYear()} {lo.name}. Equal Housing Lender. Not a commitment to lend.
        </div>
      </footer>
    </div>
  )
}
