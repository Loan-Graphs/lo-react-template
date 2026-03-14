import Image from 'next/image'
import type { TemplateProps } from '../types'

export function CompanyView({ company, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between">
        <span className="text-sm tracking-widest uppercase font-light">{company.name}</span>
        <div className="hidden md:flex gap-8 text-sm text-gray-500">
          <a href="#team" className="hover:text-gray-900">Team</a>
          <a href="#locations" className="hover:text-gray-900">Locations</a>
          <a href="#contact" className="hover:text-gray-900">Contact</a>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-20 md:py-32 text-center">
        <p className="text-sm text-gray-400 tracking-widest uppercase mb-4">Est. {company.foundedYear}</p>
        <h1 className="text-5xl font-light mb-6">{company.name}</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto mb-8">{company.about}</p>
        <a href={`mailto:${company.email}`} className="inline-block text-sm tracking-widest uppercase border-b-2 border-gray-900 pb-1">Get in touch →</a>
      </section>

      <section id="team" className="border-t border-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-sm tracking-widest uppercase text-gray-400 mb-12">Team</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {company.loanOfficers.map((o, i) => (
              <div key={i} className="text-center">
                <Image src={o.photo} alt={o.name} width={120} height={120} className="rounded-full mx-auto mb-4 grayscale hover:grayscale-0 transition duration-700" />
                <h3 className="font-light text-lg">{o.name}</h3>
                <p className="text-sm text-gray-400">{o.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="locations" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-sm tracking-widest uppercase text-gray-400 mb-12">Locations</h2>
          <div className="space-y-6">
            {company.offices.map((o, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-gray-200">
                <div>
                  <span className="text-lg font-light">{o.city}, {o.state}</span>
                  <span className="text-sm text-gray-400 ml-4">{o.address}</span>
                </div>
                <a href={`tel:${o.phone}`} className="text-sm text-gray-500">{o.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-sm tracking-widest uppercase text-gray-400 mb-12">Journal</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <div key={post.id}>
              <div className="relative h-48 mb-4"><Image src={post.image} alt={post.title} fill className="object-cover rounded-lg grayscale" /></div>
              <p className="text-xs text-gray-400 mb-2">{new Date(post.date).toLocaleDateString()}</p>
              <h3 className="font-light text-lg">{post.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 px-6 text-center text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} {company.name}</p>
      </footer>
    </div>
  )
}
