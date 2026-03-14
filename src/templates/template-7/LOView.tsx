import Image from 'next/image'
import type { TemplateProps } from '../types'

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-extrabold text-xl">{lo.name}</span>
          <div className="hidden md:flex gap-6 text-sm text-gray-300">
            <a href="#about" className="hover:text-orange-400">About</a>
            <a href="#programs" className="hover:text-orange-400">Programs</a>
            <a href="#reviews" className="hover:text-orange-400">Reviews</a>
          </div>
          <a href={`tel:${lo.phone}`} className="px-5 py-2 bg-orange-500 rounded-lg text-sm font-bold hover:bg-orange-400 transition">{lo.phone}</a>
        </div>
      </header>

      <section className="bg-gray-900 text-white pb-20 pt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 rounded text-sm font-bold mb-4">NMLS #{lo.nmls}</div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">{lo.name}</h1>
            <p className="text-xl text-gray-300 mb-2">{lo.title}</p>
            <p className="text-gray-400 mb-8">{lo.bio}</p>
            <div className="flex gap-4">
              <a href={`mailto:${lo.email}`} className="px-8 py-4 bg-orange-500 rounded-lg font-bold text-lg hover:bg-orange-400 transition shadow-lg shadow-orange-500/25">Apply Now</a>
              <a href={`tel:${lo.phone}`} className="px-8 py-4 border-2 border-gray-600 rounded-lg font-bold text-lg hover:border-orange-400 transition">Call Me</a>
            </div>
          </div>
          <Image src={lo.photo} alt={lo.name} width={300} height={300} className="rounded-2xl shadow-2xl flex-shrink-0" />
        </div>
      </section>

      <section className="bg-orange-500 text-white py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><div className="text-3xl font-extrabold">{lo.yearsInIndustry}+</div><p className="text-sm opacity-80">Years</p></div>
          <div><div className="text-3xl font-extrabold">{lo.licensedStates.length}</div><p className="text-sm opacity-80">States</p></div>
          <div><div className="text-3xl font-extrabold">{lo.loanTypes.length}</div><p className="text-sm opacity-80">Programs</p></div>
          <div><div className="text-3xl font-extrabold">5.0★</div><p className="text-sm opacity-80">Rating</p></div>
        </div>
      </section>

      <section id="programs" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Loan Programs</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {lo.loanTypes.map((type, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6 border-2 border-transparent hover:border-orange-400 transition">
              <h3 className="font-bold text-gray-900">{type}</h3>
              <p className="text-sm text-gray-500 mt-1">Competitive rates and terms available.</p>
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">What Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {lo.testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-orange-500">
                <div className="flex gap-1 mb-3">{[...Array(t.rating)].map((_, j) => <span key={j} className="text-orange-500">★</span>)}</div>
                <p className="text-gray-600 mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="font-bold text-sm text-gray-900">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="relative h-44"><Image src={post.image} alt={post.title} fill className="object-cover" /></div>
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-2">{new Date(post.date).toLocaleDateString()}</p>
                <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Make a Move?</h2>
          <p className="text-gray-400 mb-8">Get pre-approved in minutes with {lo.name}.</p>
          <a href={`mailto:${lo.email}`} className="px-10 py-4 bg-orange-500 rounded-lg font-bold text-lg shadow-lg shadow-orange-500/25 hover:bg-orange-400 transition">Apply Now</a>
        </div>
      </section>

      <footer className="bg-gray-950 text-gray-500 py-8 px-6 text-center text-sm">
        <p>NMLS #{lo.nmls} | {lo.licensedStates.join(', ')}</p>
        <p className="mt-2">&copy; {new Date().getFullYear()} {lo.name}</p>
      </footer>
    </div>
  )
}
