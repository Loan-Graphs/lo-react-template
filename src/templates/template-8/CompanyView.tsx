import Image from 'next/image'
import type { TemplateProps } from '../types'

export function CompanyView({ company, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-bold text-gray-900">{company.name}</span>
          <div className="hidden md:flex gap-6 text-sm text-gray-600">
            <a href="#about" className="hover:text-gray-900">About</a>
            <a href="#team" className="hover:text-gray-900">Team</a>
            <a href="#locations" className="hover:text-gray-900">Locations</a>
          </div>
          <a href={`tel:${company.phone}`} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium">{company.phone}</a>
        </div>
      </header>

      <section className="relative" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
        <div className="max-w-6xl mx-auto px-6 py-24 text-white text-center">
          <p className="text-slate-400 text-sm mb-2">Est. {company.foundedYear}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{company.name}</h1>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">{company.about}</p>
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-8">
            <div><div className="text-2xl font-bold">{company.loanOfficers.length}</div><p className="text-xs text-slate-400">Team</p></div>
            <div><div className="text-2xl font-bold">{company.offices.length}</div><p className="text-xs text-slate-400">Offices</p></div>
            <div><div className="text-2xl font-bold">{new Date().getFullYear() - company.foundedYear}+</div><p className="text-xs text-slate-400">Years</p></div>
          </div>
          <a href={`mailto:${company.email}`} className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-500 transition">Contact Us</a>
        </div>
      </section>

      <section id="team" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {company.loanOfficers.map((o, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-8 text-center hover:bg-slate-100 transition">
              <Image src={o.photo} alt={o.name} width={100} height={100} className="rounded-full mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">{o.name}</h3>
              <p className="text-sm text-gray-500">{o.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="locations" className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Locations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {company.offices.map((o, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{o.city}, {o.state}</h3>
                <p className="text-sm text-gray-500 mb-2">{o.address}</p>
                <a href={`tel:${o.phone}`} className="text-blue-600 font-medium text-sm">{o.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Resources</h2>
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
      </section>

      <footer className="bg-gray-900 text-gray-500 py-8 px-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {company.name}. All rights reserved.</p>
      </footer>
    </div>
  )
}
