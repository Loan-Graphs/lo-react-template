import Image from 'next/image'
import type { TemplateProps } from '../types'

export function CompanyView({ company, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold">{company.name}</span>
        <div className="hidden md:flex gap-6 text-sm text-gray-400">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#team" className="hover:text-white transition">Team</a>
          <a href="#locations" className="hover:text-white transition">Locations</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
        <a href={`tel:${company.phone}`} className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-500 transition">{company.phone}</a>
      </nav>

      {/* Hero */}
      <section className="relative" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">
          <p className="text-blue-400 font-medium mb-3">Est. {company.foundedYear}</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{company.name}</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{company.about}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`mailto:${company.email}`} className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-500 transition">Contact Us</a>
            <a href={company.website} className="px-6 py-3 border border-gray-600 rounded-lg font-semibold hover:border-white transition">Visit Website</a>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {company.loanOfficers.map((officer, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center hover:border-blue-500/50 transition">
              <Image src={officer.photo} alt={officer.name} width={120} height={120} className="rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold">{officer.name}</h3>
              <p className="text-gray-400 text-sm">{officer.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="bg-gray-900/50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Office Locations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {company.offices.map((office, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2">{office.city}, {office.state}</h3>
                <p className="text-gray-400 text-sm mb-2">{office.address}</p>
                <a href={`tel:${office.phone}`} className="text-blue-400 font-medium hover:text-blue-300">{office.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Latest Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition">
              <div className="relative h-44"><Image src={post.image} alt={post.title} fill className="object-cover" /></div>
              <div className="p-5">
                <p className="text-xs text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>
                <h3 className="font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-400 text-sm">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Partner With {company.name}</h2>
          <p className="text-blue-100 mb-8">Let us help you find the perfect mortgage solution.</p>
          <a href={`mailto:${company.email}`} className="px-8 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition">Get In Touch</a>
        </div>
      </section>

      <footer className="bg-gray-950 border-t border-gray-800 py-8 px-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {company.name}. All rights reserved.</p>
      </footer>
    </div>
  )
}
