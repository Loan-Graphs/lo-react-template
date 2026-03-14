import Image from 'next/image'
import type { TemplateProps } from '../types'

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  const firstName = lo.name.split(' ')[0]
  const states = lo.licensedStates || []

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: '"Inter", system-ui, sans-serif' }}>

      {/* Nav */}
      <nav className="px-8 md:px-16 py-6 flex items-center justify-between border-b border-gray-100">
        <span className="text-sm font-medium tracking-widest text-gray-900">{lo.name.toUpperCase()}</span>
        <div className="hidden md:flex gap-10 text-sm text-gray-400">
          <a href="#about" className="hover:text-gray-900 transition">About</a>
          <a href="#programs" className="hover:text-gray-900 transition">Programs</a>
          <a href="#contact" className="hover:text-gray-900 transition">Contact</a>
        </div>
        <a href="https://loangraphs.com/signup"
          className="text-sm text-gray-400 hover:text-gray-900 transition underline underline-offset-4">
          Use This Template
        </a>
      </nav>

      {/* Hero */}
      <section className="px-8 md:px-16 py-32 max-w-5xl">
        <p className="text-xs tracking-[0.3em] text-gray-400 mb-8 uppercase">
          NMLS #{lo.nmls} · {lo.company}
        </p>
        <h1 className="text-6xl md:text-8xl font-light text-gray-900 mb-8 leading-tight tracking-tight">
          {lo.headline || `Home loans made personal.`}
        </h1>
        <p className="text-xl text-gray-500 mb-12 max-w-xl leading-relaxed font-light">
          {lo.subheadline || lo.bio}
        </p>
        <div className="flex gap-6">
          <a href="#contact"
            className="text-sm tracking-widest border-b-2 border-gray-900 pb-1 font-medium hover:border-gray-400 hover:text-gray-400 transition">
            GET STARTED →
          </a>
          <a href={`tel:${lo.phone}`}
            className="text-sm tracking-widest text-gray-400 border-b-2 border-gray-200 pb-1 hover:border-gray-400 hover:text-gray-600 transition">
            {lo.phone}
          </a>
        </div>
      </section>

      {/* Photo + Stats */}
      <section className="px-8 md:px-16 pb-24 grid md:grid-cols-2 gap-16 items-start max-w-5xl">
        <div>
          <Image src={lo.photo} alt={lo.name} width={480} height={560} className="object-cover w-full" />
        </div>
        <div className="pt-12">
          <div className="grid grid-cols-2 gap-px bg-gray-100 mb-16">
            {[
              { v: `${lo.yearsExperience || lo.yearsInIndustry || 10}+`, l: 'Years' },
              { v: `${lo.googleRating || 5.0}★`, l: 'Rating' },
              { v: `${lo.reviewCount || 100}+`, l: 'Reviews' },
              { v: `${states.length || 4}`, l: 'States' },
            ].map((s) => (
              <div key={s.l} className="bg-white p-8">
                <div className="text-4xl font-light mb-1">{s.v}</div>
                <p className="text-xs tracking-widest text-gray-400 uppercase">{s.l}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-8">{lo.bio}</p>
          <p className="text-xs tracking-widest text-gray-300 uppercase">
            {lo.title} · NMLS #{lo.nmls}
          </p>
          {states.length > 0 && (
            <p className="text-xs text-gray-300 mt-1">{states.join(' · ')}</p>
          )}
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="border-t border-gray-100 px-8 md:px-16 py-24">
        <div className="max-w-5xl">
          <p className="text-xs tracking-[0.3em] text-gray-400 mb-12 uppercase">Loan Programs</p>
          <div className="grid md:grid-cols-3 gap-px bg-gray-100">
            {lo.loanProducts.map((product) => (
              <div key={product.id} className="bg-white p-10 hover:bg-gray-50 transition">
                <h3 className="text-lg font-medium mb-3 text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Me */}
      <section className="border-t border-gray-100 px-8 md:px-16 py-24">
        <div className="max-w-5xl grid md:grid-cols-2 gap-24">
          <div>
            <p className="text-xs tracking-[0.3em] text-gray-400 mb-12 uppercase">Why {firstName}</p>
            <ul className="space-y-6">
              {lo.differentiators.map((item, i) => (
                <li key={i} className="flex items-start gap-4 pb-6 border-b border-gray-100">
                  <span className="text-gray-300 text-sm mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] text-gray-400 mb-12 uppercase">Today&apos;s Rates</p>
            <div className="space-y-4">
              {[
                { l: '30-Year Fixed', r: '6.875%' },
                { l: '15-Year Fixed', r: '6.125%' },
                { l: 'FHA 30-Year', r: '6.500%' },
                { l: 'VA 30-Year', r: '6.250%' },
              ].map((rate) => (
                <div key={rate.l} className="flex justify-between items-center py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-500">{rate.l}</span>
                  <span className="text-xl font-light">{rate.r}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-300 mt-4">Contact {firstName} for your personalized rate.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-gray-100 px-8 md:px-16 py-24 bg-gray-50">
        <div className="max-w-5xl">
          <p className="text-xs tracking-[0.3em] text-gray-400 mb-12 uppercase">Reviews</p>
          <div className="grid md:grid-cols-3 gap-12">
            {lo.testimonials.map((t) => (
              <div key={t.id}>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => <span key={j} className="text-gray-300">★</span>)}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">&ldquo;{t.text}&rdquo;</p>
                <p className="text-xs tracking-widest text-gray-400 uppercase">— {t.author}</p>
                {t.date && <p className="text-xs text-gray-300 mt-1">{t.date}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-gray-100 px-8 md:px-16 py-24">
        <div className="max-w-5xl">
          <p className="text-xs tracking-[0.3em] text-gray-400 mb-12 uppercase">The Process</p>
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { n: '—01', t: 'Consult', d: 'Free, no-pressure conversation about your goals.' },
              { n: '—02', t: 'Apply', d: 'Simple online application. Done in minutes.' },
              { n: '—03', t: 'Pre-Approve', d: 'Formal letter ready in 24 hours or less.' },
              { n: '—04', t: 'Close', d: 'We handle every detail to the closing table.' },
            ].map((s) => (
              <div key={s.n}>
                <p className="text-xs text-gray-300 mb-4">{s.n}</p>
                <h3 className="font-medium text-gray-900 mb-2">{s.t}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-gray-100 px-8 md:px-16 py-24 bg-gray-50">
        <div className="max-w-5xl grid md:grid-cols-2 gap-24">
          <div>
            <p className="text-xs tracking-[0.3em] text-gray-400 mb-8 uppercase">Get In Touch</p>
            <h2 className="text-4xl font-light mb-6 text-gray-900">
              Ready to take the next step?
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              {firstName} will respond within one business day. Direct contact — no call centers, no bots.
            </p>
            <div className="space-y-3 text-sm">
              <div className="text-gray-400">📞 <a href={`tel:${lo.phone}`} className="hover:text-gray-700 transition">{lo.phone}</a></div>
              <div className="text-gray-400">📧 <a href={`mailto:${lo.email}`} className="hover:text-gray-700 transition">{lo.email}</a></div>
            </div>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Full Name"
              className="w-full px-0 py-4 border-0 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-300 focus:border-gray-900 outline-none transition text-sm" />
            <input type="tel" placeholder="Phone"
              className="w-full px-0 py-4 border-0 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-300 focus:border-gray-900 outline-none transition text-sm" />
            <input type="email" placeholder="Email"
              className="w-full px-0 py-4 border-0 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-300 focus:border-gray-900 outline-none transition text-sm" />
            <select className="w-full px-0 py-4 border-0 border-b border-gray-200 bg-transparent text-gray-300 outline-none transition text-sm appearance-none">
              <option>Loan Purpose</option>
              <option>Purchase</option>
              <option>Refinance</option>
              <option>Investment</option>
            </select>
            <button className="mt-4 text-sm tracking-widest border-b-2 border-gray-900 pb-1 font-medium hover:border-gray-400 hover:text-gray-400 transition">
              SEND MESSAGE →
            </button>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="border-t border-gray-100 px-8 md:px-16 py-24">
        <div className="max-w-5xl">
          <p className="text-xs tracking-[0.3em] text-gray-400 mb-12 uppercase">Insights</p>
          <div className="grid md:grid-cols-3 gap-12">
            {blogPosts.map(post => (
              <div key={post.id}>
                <div className="relative h-48 mb-6 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
                <p className="text-xs text-gray-300 mb-2">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
                <h3 className="font-medium text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 px-8 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-2">Powered by LoanGraphs</p>
          <h3 className="text-2xl font-light">Want a website like this?</h3>
        </div>
        <a
          href="https://loangraphs.com/signup"
          className="text-sm tracking-widest border-b-2 border-gray-900 pb-1 font-medium hover:border-gray-400 hover:text-gray-400 transition whitespace-nowrap"
        >
          USE THIS TEMPLATE FREE →
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-8 md:px-16 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-4 text-xs text-gray-300">
          <div>
            <span className="text-gray-900 font-medium">{lo.name}</span> · {lo.title} · NMLS# {lo.nmls}
          </div>
          <div>{lo.phone} · {lo.email}</div>
          <div>&copy; {new Date().getFullYear()} · Equal Housing Lender</div>
        </div>
      </footer>
    </div>
  )
}
