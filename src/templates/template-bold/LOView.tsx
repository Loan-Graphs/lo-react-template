import Image from 'next/image'
import type { TemplateProps } from '../types'

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  const firstName = lo.name.split(' ')[0]
  const states = lo.licensedStates || []

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Nav */}
      <nav className="bg-black border-b border-white/10 px-6 py-5 flex items-center justify-between sticky top-0 z-50">
        <span className="text-xl font-black tracking-tight text-white">{lo.name.toUpperCase()}</span>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-400 tracking-wide">
          <a href="#programs" className="hover:text-red-400 transition">PROGRAMS</a>
          <a href="#reviews" className="hover:text-red-400 transition">REVIEWS</a>
          <a href="#about" className="hover:text-red-400 transition">ABOUT</a>
        </div>
        <a
          href="https://loangraphs.com/signup"
          className="px-6 py-3 bg-red-600 text-white font-black text-sm tracking-widest hover:bg-red-500 transition"
        >
          USE TEMPLATE
        </a>
      </nav>

      {/* Hero — OVERSIZED */}
      <section className="bg-black min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-red-400 text-sm font-black tracking-[0.3em] mb-4">
              NMLS #{lo.nmls} · {states.join(' · ')}
            </p>
            <h1 className="text-6xl md:text-8xl font-black leading-none mb-6 uppercase tracking-tight">
              {lo.headline || 'Mortgages. Done Fast.'}
            </h1>
            <div className="w-24 h-2 bg-red-600 mb-8" />
            <p className="text-gray-300 text-xl leading-relaxed max-w-md mb-10">
              {lo.subheadline || lo.bio}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact"
                className="px-10 py-5 bg-red-600 text-white font-black text-lg hover:bg-red-500 transition tracking-widest">
                APPLY NOW
              </a>
              <a href={`tel:${lo.phone}`}
                className="px-10 py-5 border-2 border-white text-white font-black text-lg hover:bg-white hover:text-black transition tracking-widest">
                CALL NOW
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 transform translate-x-4 translate-y-4" />
              <Image src={lo.photo} alt={lo.name} width={380} height={460}
                className="relative z-10 object-cover grayscale contrast-125" />
              <div className="absolute bottom-0 left-0 right-4 bg-red-600 p-5 z-20">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-black text-xl">{lo.googleRating || 5.0}★</div>
                    <div className="text-red-200 text-xs">{lo.reviewCount}+ Reviews</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-xl">{lo.yearsExperience || lo.yearsInIndustry || 10}+</div>
                    <div className="text-red-200 text-xs">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-red-600 py-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: `${lo.yearsExperience || lo.yearsInIndustry || 10}+`, l: 'YEARS' },
            { v: `${lo.reviewCount || 100}+`, l: 'REVIEWS' },
            { v: `${lo.googleRating || 5.0}★`, l: 'RATING' },
            { v: '24hr', l: 'PRE-APPROVAL' },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-4xl font-black">{s.v}</div>
              <p className="text-red-200 text-xs tracking-widest mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-2 uppercase">LOAN PROGRAMS</h2>
          <div className="w-16 h-1.5 bg-red-600 mb-14" />
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {lo.loanProducts.map((product) => (
              <div key={product.id} className="bg-black p-10 hover:bg-red-950/50 transition group">
                <h3 className="text-2xl font-black mb-3 group-hover:text-red-400 transition">{product.name.toUpperCase()}</h3>
                <p className="text-gray-400 leading-relaxed">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Me */}
      <section className="py-24 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-black mb-2 uppercase leading-none">
              WHY WORK WITH {firstName.toUpperCase()}?
            </h2>
            <div className="w-16 h-1.5 bg-red-600 mb-10" />
            <ul className="space-y-5">
              {lo.differentiators.map((item, i) => (
                <li key={i} className="flex items-start gap-4 border-b border-gray-100 pb-5">
                  <span className="text-red-600 font-black text-xl leading-none mt-1">→</span>
                  <span className="font-semibold text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black text-white p-10">
            <h3 className="text-3xl font-black mb-2">READY TO START?</h3>
            <div className="w-10 h-1 bg-red-600 mb-8" />
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 py-4 border-b border-white/10">
                <span className="text-red-400 text-xl">📞</span>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">Call Direct</div>
                  <a href={`tel:${lo.phone}`} className="font-black hover:text-red-400 transition">{lo.phone}</a>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4 border-b border-white/10">
                <span className="text-red-400 text-xl">📧</span>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">Email</div>
                  <a href={`mailto:${lo.email}`} className="font-black text-sm hover:text-red-400 transition">{lo.email}</a>
                </div>
              </div>
            </div>
            <a href="#contact"
              className="block w-full text-center py-4 bg-red-600 text-white font-black tracking-widest hover:bg-red-500 transition">
              APPLY NOW →
            </a>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black uppercase mb-2">THE PROCESS</h2>
          <div className="w-16 h-1.5 bg-red-600 mb-14" />
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { n: '01', t: 'CONSULT', d: 'Free strategy session — no pressure, no fluff.' },
              { n: '02', t: 'PRE-APPROVE', d: 'Solid pre-approval letter, often same day.' },
              { n: '03', t: 'SHOP', d: 'Make offers with confidence and full financing.' },
              { n: '04', t: 'CLOSE', d: 'We handle every detail to the finish line.' },
            ].map((s) => (
              <div key={s.n} className="relative pl-6 border-l-2 border-red-600">
                <div className="text-6xl font-black text-red-600/20 leading-none mb-2">{s.n}</div>
                <h3 className="font-black text-xl mb-2">{s.t}</h3>
                <p className="text-gray-400 text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rates */}
      <section className="py-24 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black uppercase mb-2">TODAY&apos;S RATES</h2>
          <div className="w-16 h-1.5 bg-red-600 mb-14" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-2 border-black">
            {[
              { l: '30-YR FIXED', r: '6.875%' },
              { l: '15-YR FIXED', r: '6.125%' },
              { l: 'FHA 30-YR', r: '6.500%' },
              { l: 'VA 30-YR', r: '6.250%' },
            ].map((r, i) => (
              <div key={r.l} className={`p-8 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border border-black`}>
                <div className="text-xs font-black tracking-widest text-gray-500 mb-2">{r.l}</div>
                <div className="text-4xl font-black">{r.r}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-4">Rates for illustration only. Contact {firstName} for your rate.</p>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black uppercase mb-2">WHAT CLIENTS SAY</h2>
          <div className="w-16 h-1.5 bg-red-600 mb-14" />
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {lo.testimonials.map((t) => (
              <div key={t.id} className="bg-black p-10">
                <div className="text-red-400 text-2xl mb-4">{[...Array(t.rating)].map(() => '★').join('')}</div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <p className="font-black text-white">— {t.author}</p>
                {t.date && <p className="text-gray-600 text-sm">{t.date}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-red-600 transform translate-x-3 translate-y-3" />
              <Image src={lo.photo} alt={lo.name} width={420} height={520}
                className="relative z-10 object-cover" />
            </div>
          </div>
          <div>
            <h2 className="text-5xl font-black uppercase leading-none mb-2">{lo.name.toUpperCase()}</h2>
            <div className="w-16 h-1.5 bg-red-600 mb-4" />
            <p className="text-red-600 font-black tracking-widest text-sm mb-6">{lo.title.toUpperCase()} · NMLS #{lo.nmls}</p>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">{lo.bio}</p>
            {states.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {states.map(s => (
                  <span key={s} className="px-3 py-1 bg-black text-white text-xs font-black tracking-widest">{s}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="contact" className="py-24 px-6 bg-red-600">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black uppercase leading-none">GET STARTED NOW</h2>
            <div className="w-16 h-1.5 bg-white mx-auto mt-4" />
          </div>
          <div className="bg-black p-10 max-w-lg mx-auto">
            <div className="space-y-4">
              <input type="text" placeholder="FULL NAME" className="w-full px-5 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-500 font-semibold tracking-wide focus:border-red-400 outline-none transition" />
              <input type="tel" placeholder="PHONE NUMBER" className="w-full px-5 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-500 font-semibold tracking-wide focus:border-red-400 outline-none transition" />
              <input type="email" placeholder="EMAIL" className="w-full px-5 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-500 font-semibold tracking-wide focus:border-red-400 outline-none transition" />
              <select className="w-full px-5 py-4 bg-white/10 border border-white/20 text-gray-400 font-semibold tracking-wide">
                <option>LOAN PURPOSE</option>
                <option>PURCHASE</option>
                <option>REFINANCE</option>
                <option>INVESTMENT</option>
              </select>
              <button className="w-full py-5 bg-red-600 text-white font-black text-lg tracking-widest hover:bg-red-500 transition">
                APPLY NOW →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black uppercase mb-2">RESOURCES</h2>
          <div className="w-16 h-1.5 bg-red-600 mb-14" />
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="group">
                <div className="relative h-56 overflow-hidden mb-4">
                  <Image src={post.image} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                </div>
                <p className="text-red-400 text-xs font-black tracking-widest mb-2 uppercase">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
                <h3 className="font-black text-xl mb-2 group-hover:text-red-400 transition">{post.title}</h3>
                <p className="text-gray-400 text-sm">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use This Template */}
      <section className="py-16 bg-white text-black text-center">
        <h2 className="text-4xl font-black uppercase mb-3">WANT A SITE LIKE THIS?</h2>
        <p className="text-gray-500 mb-8 text-lg">Powered by LoanGraphs. Free to start. No credit card.</p>
        <a
          href="https://loangraphs.com/signup"
          className="inline-block px-12 py-5 bg-red-600 text-white font-black text-lg tracking-widest hover:bg-red-500 transition"
        >
          USE THIS TEMPLATE FREE →
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-10 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <div className="font-black text-lg mb-1">{lo.name.toUpperCase()}</div>
            <div className="text-gray-500 text-sm">{lo.title}</div>
          </div>
          <div className="text-sm text-gray-500 space-y-1">
            <div>{lo.phone}</div>
            <div>{lo.email}</div>
          </div>
          <div className="text-sm text-gray-500">
            <div>NMLS# {lo.nmls}</div>
            {states.length > 0 && <div>{states.join(', ')}</div>}
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} {lo.name}. Equal Housing Lender. Not a commitment to lend.
        </div>
      </footer>
    </div>
  )
}
