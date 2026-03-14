import Image from 'next/image'
import type { TemplateProps } from '../types'

export function CompanyView({ company, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-blue-900">{company.name}</span>
          <div className="hidden md:flex gap-6 text-sm text-blue-700">
            <a href="#team" className="hover:text-blue-500">Team</a>
            <a href="#locations" className="hover:text-blue-500">Locations</a>
          </div>
          <a href={`tel:${company.phone}`} className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium shadow-lg shadow-blue-200">{company.phone}</a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-12 md:p-16 text-white shadow-xl shadow-blue-200 text-center">
          <p className="text-blue-200 text-sm mb-2">Est. {company.foundedYear}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{company.name}</h1>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">{company.about}</p>
          <a href={`mailto:${company.email}`} className="px-6 py-3 bg-white text-blue-700 rounded-full font-semibold shadow hover:bg-blue-50 transition">Contact Us</a>
        </div>
      </section>

      <section id="team" className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-blue-900 mb-8">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {company.loanOfficers.map((o, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 text-center border border-blue-100 hover:shadow-md transition">
              <Image src={o.photo} alt={o.name} width={100} height={100} className="rounded-full mx-auto mb-4" />
              <h3 className="font-semibold text-blue-900">{o.name}</h3>
              <p className="text-sm text-gray-500">{o.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="locations" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-8">Locations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {company.offices.map((o, i) => (
              <div key={i} className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-2">{o.city}, {o.state}</h3>
                <p className="text-sm text-gray-500 mb-2">{o.address}</p>
                <a href={`tel:${o.phone}`} className="text-blue-600 font-medium text-sm">{o.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-blue-900 mb-8">Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-white rounded-2xl overflow-hidden border border-blue-100 hover:shadow-md transition">
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

      <footer className="bg-blue-950 text-blue-300 py-8 px-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {company.name}</p>
      </footer>
    </div>
  )
}
