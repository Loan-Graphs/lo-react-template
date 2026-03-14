import Image from 'next/image'
import type { TemplateProps } from '../types'

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  const gold = '#b8965a'
  const navy = '#1a2744'

  return (
    <div className="min-h-screen bg-white" style={{ color: navy }}>
      {/* Nav — transparent over hero, sticky solid on scroll */}
      <header className="sticky top-0 z-50 transition-colors duration-300 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight uppercase" style={{ color: navy, letterSpacing: '-0.02em' }}>
            {lo.name.split(' ')[0]}<span style={{ color: gold }}>.</span>
          </span>
          <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase" style={{ color: navy, opacity: 0.6 }}>
            <a href="#services" className="hover:opacity-100 transition-opacity">Services</a>
            <a href="#why" className="hover:opacity-100 transition-opacity">About</a>
            <a href="#reviews" className="hover:opacity-100 transition-opacity">Reviews</a>
            <a href="#blog" className="hover:opacity-100 transition-opacity">Insights</a>
          </nav>
          <a href={`tel:${lo.phone}`} className="px-5 py-2 text-sm font-semibold rounded-none border-2 transition hover:opacity-80" style={{ borderColor: gold, color: gold }}>{lo.phone}</a>
        </div>
      </header>

      {/* Hero — side-by-side split, photo right 45% */}
      <section className="relative" style={{ background: '#f5f0eb' }}>
        <div className="flex flex-col md:flex-row min-h-[85vh]">
          {/* Left content — 55% */}
          <div className="flex-1 md:w-[55%] flex items-center px-8 md:px-16 lg:px-24 py-20">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-3" style={{ color: gold }}>
                <span className="w-8 h-px inline-block" style={{ background: gold }} />
                Mortgage Professional
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6" style={{ letterSpacing: '-0.02em', color: navy }}>
                {lo.name}
              </h1>
              <p className="text-lg mb-2 font-medium" style={{ color: navy, opacity: 0.7 }}>{lo.title}</p>
              <p className="text-base leading-relaxed mb-10" style={{ color: navy, opacity: 0.55 }}>{lo.bio}</p>
              <div className="flex flex-wrap gap-4">
                <a href={`mailto:${lo.email}`} className="px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90" style={{ background: gold }}>
                  Get Pre-Approved
                </a>
                <a href={`tel:${lo.phone}`} className="px-8 py-4 text-sm font-bold uppercase tracking-wide border-2 transition hover:opacity-70" style={{ borderColor: navy, color: navy }}>
                  Call Me
                </a>
              </div>
            </div>
          </div>
          {/* Right photo — 45% bleed */}
          <div className="md:w-[45%] relative min-h-[400px] md:min-h-0">
            <Image src={lo.photo} alt={lo.name} fill className="object-cover object-top" />
          </div>
        </div>
        {/* Floating stats bar */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10 w-[90%] max-w-3xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 bg-white shadow-lg">
            {[
              { val: `${lo.yearsInIndustry}+`, label: 'Years Experience' },
              { val: '24hr', label: 'Pre-Approval' },
              { val: `${lo.licensedStates.length}`, label: 'States Licensed' },
              { val: '5.0★', label: 'Client Rating' },
            ].map((s, i) => (
              <div key={i} className="text-center py-6 px-4" style={{ borderRight: i < 3 ? '1px solid #e8e2db' : 'none' }}>
                <div className="text-2xl font-bold" style={{ color: gold }}>{s.val}</div>
                <p className="text-xs uppercase tracking-wider mt-1" style={{ color: navy, opacity: 0.5 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer for floating bar */}
      <div className="h-16" />

      {/* Services — horizontal cards */}
      <section id="services" className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-3" style={{ color: gold }}>
            <span className="w-8 h-px inline-block" style={{ background: gold }} />
            What I Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-16" style={{ letterSpacing: '-0.02em' }}>Lending Solutions</h2>
          <div className="space-y-6">
            {lo.loanTypes.slice(0, 4).map((type, i) => (
              <div key={i} className="flex items-start gap-8 p-8 shadow-sm hover:shadow-md transition bg-white">
                <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center text-xl font-bold text-white" style={{ background: gold }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{type}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: navy, opacity: 0.55 }}>Tailored guidance with competitive rates and a streamlined process designed around your goals.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose — asymmetric 40/60 */}
      <section id="why" className="py-24" style={{ background: '#f5f0eb' }}>
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-[40%]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-3" style={{ color: gold }}>
              <span className="w-8 h-px inline-block" style={{ background: gold }} />
              The Difference
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>Why Choose {lo.name.split(' ')[0]}?</h2>
            <p className="text-sm leading-relaxed" style={{ color: navy, opacity: 0.55 }}>A combination of deep industry knowledge, personal attention, and an unwavering commitment to your financial success.</p>
          </div>
          <div className="md:w-[60%] grid sm:grid-cols-2 gap-5">
            {lo.certifications.concat([
              `${lo.yearsInIndustry}+ years of industry expertise`,
              `Licensed in ${lo.licensedStates.join(', ')}`,
              'Direct access — never a call center',
              'Closings in 21–30 days',
            ]).map((item, i) => (
              <div key={i} className="bg-white p-6 shadow-sm">
                <span className="text-lg font-bold mr-3" style={{ color: gold }}>✓</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews — single large testimonial carousel-style */}
      <section id="reviews" className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 inline-flex items-center gap-3" style={{ color: gold }}>
            <span className="w-8 h-px inline-block" style={{ background: gold }} />
            Testimonials
            <span className="w-8 h-px inline-block" style={{ background: gold }} />
          </p>
          <div className="mt-12 space-y-16">
            {lo.testimonials.map((t, i) => (
              <div key={i} className={i > 0 ? 'hidden' : ''}>
                <div className="text-7xl font-serif leading-none mb-4" style={{ color: gold }}>&ldquo;</div>
                <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8" style={{ letterSpacing: '-0.01em', color: navy }}>
                  {t.text}
                </p>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => <span key={j} className="text-lg" style={{ color: gold }}>★</span>)}
                </div>
                <p className="text-sm font-bold uppercase tracking-wider" style={{ color: navy, opacity: 0.6 }}>— {t.author}</p>
              </div>
            ))}
          </div>
          {lo.testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {lo.testimonials.map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full" style={{ background: i === 0 ? gold : '#d4cdc4' }} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog — magazine-style 2-column */}
      <section id="blog" className="py-24" style={{ background: '#f5f0eb' }}>
        <div className="max-w-6xl mx-auto px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-3" style={{ color: gold }}>
            <span className="w-8 h-px inline-block" style={{ background: gold }} />
            Insights
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-16" style={{ letterSpacing: '-0.02em' }}>Latest Articles</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white shadow-sm hover:shadow-md transition group">
                <div className="relative h-56 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white" style={{ background: gold }}>Mortgage</span>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-xs uppercase tracking-wider mb-3" style={{ color: navy, opacity: 0.4 }}>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  <h3 className="text-xl font-bold mb-3 leading-snug">{post.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: navy, opacity: 0.55 }}>{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8" style={{ background: navy }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-6 inline-flex items-center gap-3" style={{ color: gold }}>
            <span className="w-8 h-px inline-block" style={{ background: gold }} />
            Get Started
            <span className="w-8 h-px inline-block" style={{ background: gold }} />
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>Ready to Begin?</h2>
          <p className="text-lg mb-10" style={{ opacity: 0.6 }}>Get pre-approved in minutes. No obligation, no credit impact for pre-qualification.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`mailto:${lo.email}`} className="px-10 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90" style={{ background: gold }}>
              Start Application
            </a>
            <a href={`tel:${lo.phone}`} className="px-10 py-4 text-sm font-bold uppercase tracking-wide border-2 transition hover:bg-white/10" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
              Call {lo.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Footer — multi-column stone bg */}
      <footer style={{ background: '#ebe5dc', color: navy }}>
        <div className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-3 gap-12">
          <div>
            <span className="text-xl font-bold tracking-tight uppercase">
              {lo.name.split(' ')[0]}<span style={{ color: gold }}>.</span>
            </span>
            <p className="text-sm mt-4 leading-relaxed" style={{ opacity: 0.55 }}>
              NMLS #{lo.nmls} · {lo.title}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: gold }}>Quick Links</h4>
            <div className="space-y-2 text-sm" style={{ opacity: 0.6 }}>
              <p><a href="#services" className="hover:opacity-100">Services</a></p>
              <p><a href="#reviews" className="hover:opacity-100">Reviews</a></p>
              <p><a href="#blog" className="hover:opacity-100">Blog</a></p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: gold }}>Contact</h4>
            <div className="space-y-2 text-sm" style={{ opacity: 0.6 }}>
              <p>{lo.phone}</p>
              <p>{lo.email}</p>
              <p>Licensed in {lo.licensedStates.join(', ')}</p>
            </div>
          </div>
        </div>
        <div className="border-t px-8 py-6 text-center text-xs" style={{ borderColor: 'rgba(26,39,68,0.1)', opacity: 0.4 }}>
          &copy; {new Date().getFullYear()} {lo.name}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
