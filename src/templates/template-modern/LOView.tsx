import Image from 'next/image'
import type { TemplateProps } from '../types'

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  const firstName = lo.name.split(' ')[0]
  const states = lo.licensedStates || []

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Nav */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              {lo.name[0]}
            </div>
            <span className="font-semibold text-slate-900">{lo.name}</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#programs" className="hover:text-blue-600 transition">Programs</a>
            <a href="#reviews" className="hover:text-blue-600 transition">Reviews</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          </div>
          <a
            href="https://loangraphs.com/signup"
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition"
          >
            Use This Template
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-6 tracking-wide">
              NMLS #{lo.nmls} · {lo.company}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              {lo.headline || `${firstName} Can Help You Buy or Refi.`}
            </h1>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-xl">
              {lo.subheadline || lo.bio}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-blue-200 transition">
                Get Pre-Approved →
              </a>
              <a href={`tel:${lo.phone}`}
                className="px-8 py-4 bg-white text-slate-800 font-semibold rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition">
                📞 {lo.phone}
              </a>
            </div>
          </div>
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl blur-3xl opacity-20 scale-110" />
            <Image src={lo.photo} alt={lo.name} width={320} height={380}
              className="relative z-10 rounded-3xl shadow-2xl object-cover" />
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4 z-20">
              <div className="text-2xl font-bold text-slate-900">{lo.googleRating || 5.0}★</div>
              <div className="text-xs text-slate-500">{lo.reviewCount}+ Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: `${lo.yearsExperience || lo.yearsInIndustry || 10}+`, label: 'Years Experience' },
            { value: `${lo.googleRating || 5.0}★`, label: 'Google Rating' },
            { value: `${lo.reviewCount || 100}+`, label: '5-Star Reviews' },
            { value: `${states.length || 4}`, label: 'States Licensed' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Loan Programs */}
      <section id="programs" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Programs</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Find Your Perfect Loan</h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto">
              From your first home to investment properties, {firstName} has the right solution.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {lo.loanProducts.map((product) => (
              <div key={product.id}
                className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">
                  🏠
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Me */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-400 font-semibold text-sm tracking-wide uppercase">Why {firstName}</span>
            <h2 className="text-4xl font-bold mt-2 mb-8">The Advantage of Working With a Pro</h2>
            <ul className="space-y-4">
              {lo.differentiators.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-3xl border border-white/10 p-10">
            <h3 className="text-2xl font-bold mb-6">Quick Contact</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:border-blue-400 outline-none transition" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:border-blue-400 outline-none transition" />
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-slate-400">
                <option>Loan Purpose</option>
                <option>Purchase</option>
                <option>Refinance</option>
                <option>Investment</option>
              </select>
              <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl hover:opacity-90 transition shadow-lg">
                Get Free Consultation
              </button>
            </div>
            <p className="text-slate-500 text-xs mt-4 text-center">{lo.company} · NMLS# {lo.nmls}</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Simple Process</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">From Application to Keys</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: 1, title: 'Apply Online', desc: 'Quick and secure application from any device.' },
              { n: 2, title: 'Get Pre-Approved', desc: 'Receive your pre-approval letter in 24 hours or less.' },
              { n: 3, title: 'Find Your Home', desc: 'Shop with confidence and a strong offer ready.' },
              { n: 4, title: 'Close & Move In', desc: 'We handle the details while you plan the move.' },
            ].map((step) => (
              <div key={step.n} className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg mb-4">
                  {step.n}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rates */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Current Rates</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-10">Today&apos;s Mortgage Rates</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '30-Yr Fixed', rate: '6.875%' },
              { label: '15-Yr Fixed', rate: '6.125%' },
              { label: 'FHA 30-Yr', rate: '6.500%' },
              { label: 'VA 30-Yr', rate: '6.250%' },
            ].map((r) => (
              <div key={r.label} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="text-slate-500 text-xs font-semibold mb-2">{r.label}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {r.rate}
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-xs mt-6">Rates shown for illustration only. Contact {firstName} for your personalized quote.</p>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Reviews</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">What Clients Are Saying</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {lo.testimonials.map((t) => (
              <div key={t.id} className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.author}</p>
                    {t.date && <p className="text-slate-400 text-xs">{t.date}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-3xl opacity-30 blur-2xl" />
            <Image src={lo.photo} alt={lo.name} width={420} height={500}
              className="relative z-10 rounded-3xl shadow-2xl object-cover w-full" />
          </div>
          <div>
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">About</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-2">{lo.name}</h2>
            <p className="text-blue-600 font-medium mb-6">{lo.title} · NMLS# {lo.nmls}</p>
            <p className="text-slate-600 leading-relaxed mb-6">{lo.bio}</p>
            <div className="flex flex-wrap gap-2">
              {states.map(s => (
                <span key={s} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">{s}</span>
              ))}
            </div>
            {lo.company && <p className="text-slate-400 text-sm mt-4">{lo.company}</p>}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Make a Move?</h2>
          <p className="text-blue-100 mb-10 text-lg">Get your free mortgage consultation with {firstName} today.</p>
          <div className="bg-white/10 backdrop-blur rounded-3xl p-10 max-w-lg mx-auto">
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 outline-none focus:border-white transition" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 outline-none focus:border-white transition" />
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 outline-none focus:border-white transition" />
              <button className="w-full py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition shadow-xl">
                Start My Pre-Approval
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Resources</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Mortgage Tips & Guides</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="group">
                <div className="relative h-52 rounded-2xl overflow-hidden mb-5">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <p className="text-blue-600 text-xs font-semibold mb-2">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition">{post.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use This Template */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-3">Love this template?</h2>
        <p className="text-blue-100 mb-8">Get your own professional mortgage website free with LoanGraphs.</p>
        <a
          href="https://loangraphs.com/signup"
          className="inline-block px-10 py-4 bg-white text-blue-700 font-bold rounded-full hover:shadow-xl hover:shadow-blue-500/30 transition"
        >
          Use This Template Free →
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-bold text-white mb-1">{lo.name}</div>
            <div className="text-sm">{lo.title}</div>
            {lo.company && <div className="text-sm">{lo.company}</div>}
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
        <div className="border-t border-slate-800 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} {lo.name}. Equal Housing Lender. Not a commitment to lend.</p>
        </div>
      </footer>
    </div>
  )
}
