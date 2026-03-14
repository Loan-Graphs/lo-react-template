import Image from 'next/image'
import type { TemplateProps } from '../types'

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-bold text-lg text-green-800">{lo.name}</span>
            <div className="hidden lg:flex gap-6 text-sm text-gray-600">
              <a href="#about" className="hover:text-green-700">About</a>
              <a href="#programs" className="hover:text-green-700">Loan Programs</a>
              <a href="#reviews" className="hover:text-green-700">Reviews</a>
              <a href="#resources" className="hover:text-green-700">Resources</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden md:inline">NMLS #{lo.nmls}</span>
            <a href={`tel:${lo.phone}`} className="px-4 py-2 bg-green-700 text-white rounded text-sm font-medium hover:bg-green-600">Call Now</a>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-green-800 to-green-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-green-700/50 rounded text-sm mb-4">{lo.title}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{lo.name}</h1>
            <p className="text-green-100 text-lg mb-8">{lo.bio}</p>
            <div className="grid grid-cols-2 gap-4">
              <a href={`mailto:${lo.email}`} className="px-5 py-3 bg-white text-green-800 rounded font-semibold text-center hover:bg-green-50 transition">Email Me</a>
              <a href={`tel:${lo.phone}`} className="px-5 py-3 border border-white/30 rounded font-semibold text-center hover:bg-white/10 transition">Call Me</a>
            </div>
          </div>
          <div className="flex justify-center">
            <Image src={lo.photo} alt={lo.name} width={320} height={320} className="rounded-xl shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center"><div className="text-2xl font-bold text-green-800">{lo.yearsInIndustry}+</div><p className="text-sm text-gray-500">Years</p></div>
          <div className="text-center"><div className="text-2xl font-bold text-green-800">{lo.licensedStates.length}</div><p className="text-sm text-gray-500">States</p></div>
          <div className="text-center"><div className="text-2xl font-bold text-green-800">{lo.loanTypes.length}</div><p className="text-sm text-gray-500">Programs</p></div>
          <div className="text-center"><div className="text-2xl font-bold text-green-800">5.0</div><p className="text-sm text-gray-500">Rating</p></div>
        </div>
      </section>

      <section id="programs" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Loan Programs</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {lo.loanTypes.map((type, i) => (
            <div key={i} className="bg-white border rounded-lg p-5 hover:shadow-md hover:border-green-300 transition">
              <h3 className="font-semibold text-gray-900 mb-1">{type}</h3>
              <p className="text-sm text-gray-500">Competitive rates and terms.</p>
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Client Reviews</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {lo.testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 border rounded-lg p-6">
                <div className="flex gap-1 mb-3">{[...Array(t.rating)].map((_, j) => <span key={j} className="text-green-600">★</span>)}</div>
                <p className="text-gray-600 mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="font-semibold text-sm text-gray-900">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="resources" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition">
              <div className="relative h-40"><Image src={post.image} alt={post.title} fill className="object-cover" /></div>
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-2">{new Date(post.date).toLocaleDateString()}</p>
                <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-green-950 text-green-200 py-8 px-6 text-center text-sm">
        <p>NMLS #{lo.nmls} | {lo.licensedStates.join(', ')}</p>
        <p className="mt-2">&copy; {new Date().getFullYear()} {lo.name}</p>
      </footer>
    </div>
  )
}
