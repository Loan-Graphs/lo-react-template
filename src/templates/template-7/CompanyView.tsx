import Image from 'next/image'
import type { TemplateProps } from '../types'

export function CompanyView({ company, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-extrabold text-xl">{company.name}</span>
          <div className="hidden md:flex gap-6 text-sm text-gray-300">
            <a href="#team" className="hover:text-orange-400">Team</a>
            <a href="#locations" className="hover:text-orange-400">Locations</a>
          </div>
          <a href={`tel:${company.phone}`} className="px-5 py-2 bg-orange-500 rounded-lg text-sm font-bold hover:bg-orange-400">{company.phone}</a>
        </div>
      </header>

      <section className="bg-gray-900 text-white pb-20 pt-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 rounded text-sm font-bold mb-4">Est. {company.foundedYear}</div>
          <h1 className="text-5xl font-extrabold mb-4">{company.name}</h1>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">{company.about}</p>
          <a href={`mailto:${company.email}`} className="px-8 py-4 bg-orange-500 rounded-lg font-bold text-lg hover:bg-orange-400 transition shadow-lg shadow-orange-500/25">Contact Us</a>
        </div>
      </section>

      <section className="bg-orange-500 text-white py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          <div><div className="text-3xl font-extrabold">{company.loanOfficers.length}</div><p className="text-sm opacity-80">Team Members</p></div>
          <div><div className="text-3xl font-extrabold">{company.offices.length}</div><p className="text-sm opacity-80">Offices</p></div>
          <div><div className="text-3xl font-extrabold">{new Date().getFullYear() - company.foundedYear}+</div><p className="text-sm opacity-80">Years</p></div>
        </div>
      </section>

      <section id="team" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {company.loanOfficers.map((o, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6 text-center border-2 border-transparent hover:border-orange-400 transition">
              <Image src={o.photo} alt={o.name} width={100} height={100} className="rounded-full mx-auto mb-4" />
              <h3 className="font-bold text-gray-900">{o.name}</h3>
              <p className="text-sm text-gray-500">{o.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="locations" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Locations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {company.offices.map((o, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border-l-4 border-orange-500">
                <h3 className="font-bold text-gray-900 mb-2">{o.city}, {o.state}</h3>
                <p className="text-sm text-gray-500 mb-2">{o.address}</p>
                <a href={`tel:${o.phone}`} className="text-orange-500 font-bold text-sm">{o.phone}</a>
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

      <footer className="bg-gray-950 text-gray-500 py-8 px-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {company.name}</p>
      </footer>
    </div>
  )
}
