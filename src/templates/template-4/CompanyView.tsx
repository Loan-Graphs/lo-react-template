import Image from 'next/image'
import type { TemplateProps } from '../types'

export function CompanyView({ company, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-bold text-lg text-green-800">{company.name}</span>
          <div className="hidden md:flex gap-6 text-sm text-gray-600">
            <a href="#about" className="hover:text-green-700">About</a>
            <a href="#team" className="hover:text-green-700">Team</a>
            <a href="#locations" className="hover:text-green-700">Locations</a>
          </div>
          <a href={`tel:${company.phone}`} className="px-4 py-2 bg-green-700 text-white rounded text-sm font-medium hover:bg-green-600">{company.phone}</a>
        </div>
      </header>

      <section className="bg-gradient-to-br from-green-800 to-green-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block px-3 py-1 bg-green-700/50 rounded text-sm mb-4">Est. {company.foundedYear}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{company.name}</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto mb-8">{company.about}</p>
          <a href={`mailto:${company.email}`} className="px-6 py-3 bg-white text-green-800 rounded font-semibold hover:bg-green-50 transition">Contact Us</a>
        </div>
      </section>

      <section id="team" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {company.loanOfficers.map((o, i) => (
            <div key={i} className="bg-white border rounded-lg p-6 text-center hover:shadow-md transition">
              <Image src={o.photo} alt={o.name} width={100} height={100} className="rounded-full mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">{o.name}</h3>
              <p className="text-sm text-gray-500">{o.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="locations" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Office Locations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {company.offices.map((o, i) => (
              <div key={i} className="bg-gray-50 border rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{o.city}, {o.state}</h3>
                <p className="text-sm text-gray-500 mb-2">{o.address}</p>
                <a href={`tel:${o.phone}`} className="text-green-700 font-medium text-sm">{o.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-white border rounded-lg overflow-hidden">
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
        <p>&copy; {new Date().getFullYear()} {company.name}</p>
      </footer>
    </div>
  )
}
