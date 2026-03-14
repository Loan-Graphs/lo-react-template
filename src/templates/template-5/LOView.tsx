import Image from 'next/image'
import type { TemplateProps } from '../types'

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-blue-900">{lo.name}</span>
          <div className="hidden md:flex gap-6 text-sm text-blue-700">
            <a href="#about" className="hover:text-blue-500">About</a>
            <a href="#services" className="hover:text-blue-500">Services</a>
            <a href="#reviews" className="hover:text-blue-500">Reviews</a>
          </div>
          <a href={`tel:${lo.phone}`} className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-500 transition shadow-lg shadow-blue-200">{lo.phone}</a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-12 md:p-16 text-white shadow-xl shadow-blue-200 flex flex-col md:flex-row items-center gap-10">
          <Image src={lo.photo} alt={lo.name} width={200} height={200} className="rounded-2xl shadow-lg flex-shrink-0" />
          <div>
            <p className="text-blue-200 text-sm mb-2">NMLS #{lo.nmls}</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{lo.name}</h1>
            <p className="text-blue-100 mb-6">{lo.bio}</p>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${lo.email}`} className="px-6 py-3 bg-white text-blue-700 rounded-full font-semibold hover:bg-blue-50 transition shadow">Get Pre-Approved</a>
              <a href={`tel:${lo.phone}`} className="px-6 py-3 border-2 border-white/40 rounded-full font-semibold hover:bg-white/10 transition">Call Now</a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { v: `${lo.yearsInIndustry}+`, l: 'Years' },
          { v: lo.licensedStates.length, l: 'States' },
          { v: lo.loanTypes.length, l: 'Programs' },
          { v: '5★', l: 'Rating' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-blue-100 hover:shadow-md transition">
            <div className="text-2xl font-bold text-blue-700">{s.v}</div>
            <p className="text-sm text-gray-500 mt-1">{s.l}</p>
          </div>
        ))}
      </section>

      <section id="services" className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-blue-900 mb-8">Loan Programs</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {lo.loanTypes.map((type, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-blue-100 hover:shadow-md hover:border-blue-300 transition">
              <h3 className="font-semibold text-blue-900 mb-1">{type}</h3>
              <p className="text-sm text-gray-500">Expert guidance available.</p>
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-8">Client Reviews</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {lo.testimonials.map((t, i) => (
              <div key={i} className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex gap-1 mb-3">{[...Array(t.rating)].map((_, j) => <span key={j} className="text-yellow-500">★</span>)}</div>
                <p className="text-gray-700 mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="font-semibold text-sm text-blue-900">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-blue-900 mb-8">Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-blue-100 hover:shadow-md transition">
              <div className="relative h-40"><Image src={post.image} alt={post.title} fill className="object-cover" /></div>
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-2">{new Date(post.date).toLocaleDateString()}</p>
                <h3 className="font-semibold text-blue-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8">Contact {lo.name} for a free consultation today.</p>
          <a href={`mailto:${lo.email}`} className="px-8 py-3 bg-white text-blue-700 rounded-full font-semibold shadow-lg hover:bg-blue-50 transition">Contact Me</a>
        </div>
      </section>

      <footer className="bg-blue-950 text-blue-300 py-8 px-6 text-center text-sm">
        <p>NMLS #{lo.nmls} | {lo.licensedStates.join(', ')}</p>
        <p className="mt-2">&copy; {new Date().getFullYear()} {lo.name}</p>
      </footer>
    </div>
  )
}
