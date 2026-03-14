import Image from 'next/image'
import type { TemplateProps } from '../types'

export function CompanyView({ company, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      <header style={{ backgroundColor: '#1a2744' }} className="text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-lg">{company.name}</div>
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#about" className="hover:text-blue-300">About</a>
            <a href="#team" className="hover:text-blue-300">Team</a>
            <a href="#locations" className="hover:text-blue-300">Locations</a>
          </div>
          <a href={`tel:${company.phone}`} className="text-sm">{company.phone}</a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium text-blue-700 mb-2">Est. {company.foundedYear}</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{company.name}</h1>
          <p className="text-lg text-gray-600 mb-8">{company.about}</p>
          <a href={`mailto:${company.email}`} className="px-6 py-3 text-white rounded-lg font-semibold" style={{ backgroundColor: '#1a2744' }}>Contact Us</a>
        </div>
      </section>

      <section id="team" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Loan Officers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {company.loanOfficers.map((officer, i) => (
              <div key={i} className="bg-white border rounded-xl p-8 text-center">
                <Image src={officer.photo} alt={officer.name} width={100} height={100} className="rounded-full mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">{officer.name}</h3>
                <p className="text-gray-500 text-sm">{officer.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="locations" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Offices</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {company.offices.map((office, i) => (
            <div key={i} className="border rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{office.city}, {office.state}</h3>
              <p className="text-gray-500 text-sm mb-2">{office.address}</p>
              <a href={`tel:${office.phone}`} className="text-blue-700 font-medium text-sm">{office.phone}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white border rounded-xl overflow-hidden">
                <div className="relative h-40"><Image src={post.image} alt={post.title} fill className="object-cover" /></div>
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-2">{new Date(post.date).toLocaleDateString()}</p>
                  <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: '#1a2744', color: '#94a3b8' }} className="py-8 px-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {company.name}. All rights reserved.</p>
      </footer>
    </div>
  )
}
