import Image from 'next/image'
import type { TemplateProps } from '../types'

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  const firstName = lo.name.split(' ')[0]
  const states = lo.licensedStates || []

  return (
    <div className="min-h-screen bg-white font-serif" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>

      {/* Top bar */}
      <div className="bg-yellow-700 text-yellow-100 text-xs py-2 px-6 text-center tracking-wider">
        EQUAL HOUSING LENDER &nbsp;|&nbsp; NMLS #{lo.nmls} &nbsp;|&nbsp; {lo.phone}
      </div>

      {/* Nav */}
      <nav className="bg-[#0a1628] text-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold tracking-wide" style={{ color: '#c8a94e' }}>{lo.name}</span>
            <span className="text-gray-400 text-sm ml-3 hidden md:inline">{lo.title}</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-gray-300">
            <a href="#about" className="hover:text-yellow-400 transition tracking-wide">ABOUT</a>
            <a href="#programs" className="hover:text-yellow-400 transition tracking-wide">PROGRAMS</a>
            <a href="#reviews" className="hover:text-yellow-400 transition tracking-wide">REVIEWS</a>
            <a href="#contact" className="hover:text-yellow-400 transition tracking-wide">CONTACT</a>
          </div>
          <a
            href="https://loangraphs.com/signup"
            className="px-5 py-2 bg-yellow-600 text-white text-sm font-semibold hover:bg-yellow-500 transition tracking-wide"
          >
            USE THIS TEMPLATE
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#0a1628] text-white pb-20 pt-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="w-16 h-1 bg-yellow-500 mb-6" />
            <p className="text-yellow-400 tracking-[0.2em] text-sm font-medium mb-3">TRUSTED MORTGAGE PROFESSIONAL</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}>
              {lo.headline || 'Your Mortgage, Done Right.'}
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-xl leading-relaxed">
              {lo.subheadline || lo.bio}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact"
                className="px-8 py-4 bg-yellow-600 text-white font-semibold hover:bg-yellow-500 transition tracking-wide">
                GET PRE-QUALIFIED
              </a>
              <a href={`tel:${lo.phone}`}
                className="px-8 py-4 border border-yellow-600 text-yellow-400 font-semibold hover:bg-yellow-600/10 transition tracking-wide">
                CALL {lo.phone}
              </a>
            </div>
          </div>
          <div className="flex-shrink-0 relative">
            <div className="absolute -inset-2 border-2 border-yellow-600/40" style={{ transform: 'translate(8px, 8px)' }} />
            <Image src={lo.photo} alt={lo.name} width={300} height={340} className="relative z-10 object-cover" />
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-yellow-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold">{lo.yearsExperience || lo.yearsInIndustry || 10}+</div>
            <p className="text-yellow-100 text-sm mt-1 tracking-wide">YEARS EXPERIENCE</p>
          </div>
          <div>
            <div className="text-3xl font-bold">{lo.googleRating || 5.0}★</div>
            <p className="text-yellow-100 text-sm mt-1 tracking-wide">GOOGLE RATING</p>
          </div>
          <div>
            <div className="text-3xl font-bold">{lo.reviewCount || 100}+</div>
            <p className="text-yellow-100 text-sm mt-1 tracking-wide">5-STAR REVIEWS</p>
          </div>
          <div>
            <div className="text-3xl font-bold">{states.length || 4}</div>
            <p className="text-yellow-100 text-sm mt-1 tracking-wide">STATES LICENSED</p>
          </div>
        </div>
      </section>

      {/* Loan Programs */}
      <section id="programs" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-yellow-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-[#0a1628]" style={{ fontFamily: 'Georgia, serif' }}>Loan Programs</h2>
            <p className="text-gray-600 mt-3 max-w-lg mx-auto">
              Comprehensive financing solutions tailored to your unique needs and financial goals.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {lo.loanProducts.map((product) => (
              <div key={product.id}
                className="bg-white border border-gray-200 p-8 hover:border-yellow-500 hover:shadow-lg transition group">
                <div className="w-10 h-1 bg-yellow-600 mb-4 group-hover:w-full transition-all duration-500" />
                <h3 className="text-xl font-bold text-[#0a1628] mb-3">{product.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Me */}
      <section className="py-20 bg-[#0a1628] text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-12 h-1 bg-yellow-600 mb-6" />
            <h2 className="text-4xl font-bold mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              Why Work With {firstName}?
            </h2>
            <ul className="space-y-4">
              {lo.differentiators.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-yellow-500 font-bold mt-0.5 flex-shrink-0">✦</span>
                  <span className="text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 p-10">
            <h3 className="text-2xl font-bold mb-2">Start Today</h3>
            <div className="w-8 h-0.5 bg-yellow-600 mb-6" />
            <p className="text-gray-300 mb-8 leading-relaxed">
              Reach out for a confidential consultation. {firstName} provides personal, responsive service — no call centers.
            </p>
            <a href={`tel:${lo.phone}`}
              className="block w-full text-center px-6 py-4 bg-yellow-600 text-white font-semibold hover:bg-yellow-500 transition mb-4 tracking-wide">
              CALL {lo.phone}
            </a>
            <a href={`mailto:${lo.email}`}
              className="block w-full text-center px-6 py-4 border border-white/20 text-gray-300 hover:border-yellow-500 hover:text-yellow-400 transition tracking-wide">
              EMAIL {lo.email}
            </a>
            <p className="text-gray-600 text-xs mt-6">{lo.company} · NMLS# {lo.nmls}</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="w-12 h-1 bg-yellow-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-[#0a1628]" style={{ fontFamily: 'Georgia, serif' }}>The Process</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Consultation', desc: 'Discuss your goals, timeline, and financial situation in a no-pressure meeting.' },
              { num: '02', title: 'Pre-Approval', desc: 'Submit your application and receive a formal pre-approval letter.' },
              { num: '03', title: 'Home Search', desc: 'Shop with confidence knowing your financing is secured.' },
              { num: '04', title: 'Closing Day', desc: 'Sign the paperwork and get the keys to your new home.' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="text-5xl font-bold text-yellow-600/30 mb-3">{step.num}</div>
                <h3 className="text-lg font-bold text-[#0a1628] mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rates Widget */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-yellow-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-[#0a1628]" style={{ fontFamily: 'Georgia, serif' }}>Today&apos;s Rates</h2>
            <p className="text-gray-600 mt-2">Contact {firstName} for a personalized quote.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '30-Year Fixed', rate: '6.875%' },
              { label: '15-Year Fixed', rate: '6.125%' },
              { label: 'FHA 30-Year', rate: '6.500%' },
              { label: 'VA 30-Year', rate: '6.250%' },
            ].map((r) => (
              <div key={r.label} className="bg-white border border-gray-200 p-6 text-center hover:border-yellow-500 transition">
                <div className="text-gray-500 text-xs tracking-widest mb-2 uppercase">{r.label}</div>
                <div className="text-3xl font-bold text-[#0a1628]">{r.rate}</div>
                <div className="text-xs text-gray-400 mt-1">As low as</div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs text-center mt-6">
            Rates shown for illustrative purposes. Actual rates vary based on credit, LTV, and other factors. Contact {lo.name} for a personalized quote.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-yellow-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-[#0a1628]" style={{ fontFamily: 'Georgia, serif' }}>Client Testimonials</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {lo.testimonials.map((t) => (
              <div key={t.id} className="bg-gray-50 border-l-4 border-yellow-600 p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-[#0a1628]">{t.author}</p>
                  {t.date && <p className="text-gray-500 text-sm">{t.date}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-[#0a1628] text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-2 border border-yellow-600/30" style={{ transform: 'translate(10px, 10px)' }} />
            <Image src={lo.photo} alt={lo.name} width={400} height={480} className="relative z-10 object-cover w-full" />
          </div>
          <div>
            <div className="w-12 h-1 bg-yellow-600 mb-6" />
            <p className="text-yellow-400 tracking-[0.2em] text-sm font-medium mb-2">ABOUT</p>
            <h2 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>{lo.name}</h2>
            <p className="text-yellow-500 mb-6">{lo.title} · NMLS# {lo.nmls}</p>
            <p className="text-gray-300 leading-relaxed mb-6">{lo.bio}</p>
            {states.length > 0 && (
              <p className="text-gray-400 text-sm">Licensed in: {states.join(', ')}</p>
            )}
            {lo.company && <p className="text-gray-500 text-sm mt-2">{lo.company}</p>}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-yellow-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-[#0a1628]" style={{ fontFamily: 'Georgia, serif' }}>Get In Touch</h2>
            <p className="text-gray-600 mt-3">Ready to take the next step? {firstName} will respond within one business day.</p>
          </div>
          <div className="bg-white border border-gray-200 p-10 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">Full Name</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-500 outline-none transition" placeholder="John Smith" />
              </div>
              <div>
                <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">Phone</label>
                <input type="tel" className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-500 outline-none transition" placeholder="(555) 000-0000" />
              </div>
              <div>
                <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">Email</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-500 outline-none transition" placeholder="john@email.com" />
              </div>
              <div>
                <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">Loan Purpose</label>
                <select className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-500 outline-none transition bg-white text-gray-700">
                  <option>Select one...</option>
                  <option>Purchase</option>
                  <option>Refinance</option>
                  <option>Investment Property</option>
                  <option>VA Loan</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">Message (Optional)</label>
              <textarea rows={3} className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-500 outline-none transition resize-none" placeholder="Tell us about your situation..." />
            </div>
            <button className="mt-6 w-full py-4 bg-[#0a1628] text-white font-semibold hover:bg-yellow-700 transition tracking-widest text-sm">
              SUBMIT REQUEST
            </button>
            <p className="text-xs text-gray-400 text-center mt-4">
              By submitting, you agree to be contacted by {lo.name}. Your information is secure and never shared.
            </p>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-yellow-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-[#0a1628]" style={{ fontFamily: 'Georgia, serif' }}>Mortgage Insights</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="group">
                <div className="relative h-52 overflow-hidden mb-4">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <p className="text-xs text-yellow-600 tracking-widest mb-2 uppercase">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <h3 className="font-bold text-[#0a1628] text-lg mb-2 group-hover:text-yellow-700 transition">{post.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use This Template CTA */}
      <section className="bg-yellow-600 py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-yellow-100 tracking-[0.2em] text-sm mb-3">POWERED BY LOANGRAPHS</p>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>Want a website like this?</h2>
          <p className="text-yellow-100 mb-8">Get your own professional mortgage website — free to start. No credit card required.</p>
          <a
            href="https://loangraphs.com/signup"
            className="inline-block px-10 py-4 bg-white text-yellow-700 font-bold hover:bg-yellow-50 transition tracking-wide"
          >
            USE THIS TEMPLATE FREE
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#060d1a] text-gray-500 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-bold text-yellow-500 mb-2" style={{ fontFamily: 'Georgia, serif' }}>{lo.name}</div>
            <div className="text-sm">{lo.title}</div>
            {lo.company && <div className="text-sm">{lo.company}</div>}
          </div>
          <div className="text-sm space-y-1">
            <div>📞 {lo.phone}</div>
            <div>📧 {lo.email}</div>
          </div>
          <div className="text-sm space-y-1">
            <div>NMLS# {lo.nmls}</div>
            {states.length > 0 && <div>Licensed: {states.join(', ')}</div>}
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} {lo.name}. All rights reserved. Equal Housing Lender.</p>
          <p className="mt-1 text-gray-600">Not a commitment to lend. All loans subject to credit approval.</p>
        </div>
      </footer>
    </div>
  )
}
