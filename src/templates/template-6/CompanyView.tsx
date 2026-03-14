import Image from 'next/image'
import type { TemplateProps } from '../types'

export function CompanyView({ company, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf9f6' }}>
      <nav className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between border-b" style={{ borderColor: '#e8e4dd' }}>
        <span className="text-lg" style={{ fontFamily: 'Georgia, serif' }}>{company.name}</span>
        <div className="hidden md:flex gap-8 text-sm" style={{ color: '#8a8278' }}>
          <a href="#team" className="hover:opacity-70">Team</a>
          <a href="#locations" className="hover:opacity-70">Locations</a>
          <a href="#contact" className="hover:opacity-70">Contact</a>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#b8a88a' }}>Est. {company.foundedYear}</p>
        <h1 className="text-5xl mb-6" style={{ fontFamily: 'Georgia, serif', color: '#2c2420' }}>{company.name}</h1>
        <p className="max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: '#6b5e50' }}>{company.about}</p>
        <a href={`mailto:${company.email}`} className="px-6 py-3 rounded text-white font-medium" style={{ backgroundColor: '#2c2420' }}>Contact Us</a>
      </section>

      <section id="team" className="py-20" style={{ backgroundColor: '#f0ece4' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl mb-12 text-center" style={{ fontFamily: 'Georgia, serif', color: '#2c2420' }}>Our Team</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {company.loanOfficers.map((o, i) => (
              <div key={i} className="text-center">
                <Image src={o.photo} alt={o.name} width={120} height={120} className="rounded-full mx-auto mb-4" />
                <h3 style={{ fontFamily: 'Georgia, serif', color: '#2c2420' }}>{o.name}</h3>
                <p className="text-sm" style={{ color: '#8a8278' }}>{o.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="locations" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl mb-12 text-center" style={{ fontFamily: 'Georgia, serif', color: '#2c2420' }}>Locations</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {company.offices.map((o, i) => (
            <div key={i} className="p-6 rounded-lg border" style={{ borderColor: '#e8e4dd' }}>
              <h3 className="font-medium mb-2" style={{ color: '#2c2420' }}>{o.city}, {o.state}</h3>
              <p className="text-sm mb-2" style={{ color: '#8a8278' }}>{o.address}</p>
              <a href={`tel:${o.phone}`} className="text-sm font-medium" style={{ color: '#b8a88a' }}>{o.phone}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#f0ece4' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl mb-12 text-center" style={{ fontFamily: 'Georgia, serif', color: '#2c2420' }}>Insights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id}>
                <div className="relative h-48 rounded-lg overflow-hidden mb-4"><Image src={post.image} alt={post.title} fill className="object-cover" /></div>
                <p className="text-xs mb-2" style={{ color: '#b8a88a' }}>{new Date(post.date).toLocaleDateString()}</p>
                <h3 className="text-lg mb-2" style={{ fontFamily: 'Georgia, serif', color: '#2c2420' }}>{post.title}</h3>
                <p className="text-sm" style={{ color: '#8a8278' }}>{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-6 px-6 text-center text-xs" style={{ color: '#b8a88a', backgroundColor: '#2c2420' }}>
        <p>&copy; {new Date().getFullYear()} {company.name}</p>
      </footer>
    </div>
  )
}
