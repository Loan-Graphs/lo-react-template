import Image from 'next/image'
import type { TemplateProps } from '../types'

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Nav */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src={lo.photo} alt={lo.name} width={36} height={36} className="rounded-full" />
            <div className="text-sm"><span className="font-bold text-gray-900">{lo.name}</span><span className="text-gray-400 ml-2">NMLS #{lo.nmls}</span></div>
          </div>
          <div className="hidden md:flex gap-6 text-sm text-gray-600">
            <a href="#services" className="hover:text-gray-900">Services</a>
            <a href="#why" className="hover:text-gray-900">Why Choose Me</a>
            <a href="#reviews" className="hover:text-gray-900">Reviews</a>
            <a href="#blog" className="hover:text-gray-900">Blog</a>
          </div>
          <a href={`tel:${lo.phone}`} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">{lo.phone}</a>
        </div>
      </header>

      {/* Dark Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Your Trusted Mortgage Expert</h1>
            <p className="text-xl text-slate-300 mb-2">{lo.name} · {lo.title}</p>
            <p className="text-slate-400 mb-8">{lo.bio}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="text-center"><div className="text-2xl font-bold">{lo.yearsInIndustry}+</div><p className="text-xs text-slate-400">Years</p></div>
              <div className="text-center"><div className="text-2xl font-bold">24hr</div><p className="text-xs text-slate-400">Pre-Approval</p></div>
              <div className="text-center"><div className="text-2xl font-bold">{lo.licensedStates.length}</div><p className="text-xs text-slate-400">States</p></div>
              <div className="text-center"><div className="text-2xl font-bold">5★</div><p className="text-xs text-slate-400">Rating</p></div>
            </div>
            <div className="flex gap-4">
              <a href={`mailto:${lo.email}`} className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-500 transition">Get Pre-Approved</a>
              <a href={`tel:${lo.phone}`} className="px-6 py-3 border border-slate-500 rounded-lg font-semibold hover:bg-white/5 transition">Call Me</a>
            </div>
          </div>
          <div className="flex justify-center">
            <Image src={lo.photo} alt={lo.name} width={350} height={350} className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">How I Can Help</h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">Whether you&apos;re buying your first home or growing your investment portfolio.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lo.loanTypes.slice(0, 4).map((type, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-6 hover:bg-slate-100 transition">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold mb-4">{i + 1}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{type}</h3>
              <p className="text-sm text-gray-500">Expert guidance and competitive rates.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose */}
      <section id="why" className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose {lo.name}?</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {lo.certifications.concat([
              `${lo.yearsInIndustry}+ years of experience`,
              `Licensed in ${lo.licensedStates.join(', ')}`,
              'Direct access — not a call center',
              'Fast closings in 21-30 days',
            ]).map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-4">
                <span className="text-green-500 font-bold mt-0.5">✓</span>
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Client Reviews</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {lo.testimonials.map((t, i) => (
            <div key={i} className="bg-white border rounded-xl p-6 shadow-sm">
              <div className="flex gap-1 mb-3">{[...Array(t.rating)].map((_, j) => <span key={j} className="text-yellow-500">★</span>)}</div>
              <p className="text-gray-600 mb-4">&ldquo;{t.text}&rdquo;</p>
              <p className="font-semibold text-sm text-gray-900">— {t.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="relative h-44"><Image src={post.image} alt={post.title} fill className="object-cover" /></div>
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-2">{new Date(post.date).toLocaleDateString()}</p>
                  <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-500">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Pre-Approved?</h2>
          <p className="text-slate-300 mb-8">Get started in minutes. No obligation, no credit impact for pre-qualification.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`mailto:${lo.email}`} className="px-8 py-4 bg-blue-600 rounded-lg font-bold text-lg hover:bg-blue-500 transition shadow-lg">Start Application</a>
            <a href={`tel:${lo.phone}`} className="px-8 py-4 border border-slate-500 rounded-lg font-bold text-lg hover:bg-white/5 transition">Call {lo.phone}</a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-500 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-sm">
          <p>{lo.name} · NMLS #{lo.nmls} · Licensed in {lo.licensedStates.join(', ')}</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} {lo.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
