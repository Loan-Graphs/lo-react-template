import Image from 'next/image'
import type { TemplateProps } from '../types'

export function CompanyView({ company, blogPosts }: TemplateProps) {
  const gold = '#b8965a'
  const navy = '#1a2744'

  return (
    <div className="min-h-screen bg-white" style={{ color: navy }}>
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight uppercase" style={{ letterSpacing: '-0.02em' }}>
            {company.name.split(' ')[0]}<span style={{ color: gold }}>.</span>
          </span>
          <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase" style={{ opacity: 0.6 }}>
            <a href="#about" className="hover:opacity-100 transition-opacity">About</a>
            <a href="#team" className="hover:opacity-100 transition-opacity">Team</a>
            <a href="#locations" className="hover:opacity-100 transition-opacity">Locations</a>
          </nav>
          <a href={`tel:${company.phone}`} className="px-5 py-2 text-sm font-semibold border-2 transition hover:opacity-80" style={{ borderColor: gold, color: gold }}>{company.phone}</a>
        </div>
      </header>

      {/* Hero */}
      <section className="py-28 px-8" style={{ background: '#f5f0eb' }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-6 inline-flex items-center gap-3" style={{ color: gold }}>
            <span className="w-8 h-px inline-block" style={{ background: gold }} />
            Est. {company.foundedYear}
            <span className="w-8 h-px inline-block" style={{ background: gold }} />
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>{company.name}</h1>
          <p className="text-lg max-w-2xl mx-auto mb-12" style={{ opacity: 0.55 }}>{company.about}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`mailto:${company.email}`} className="px-8 py-4 text-sm font-bold uppercase tracking-wide text-white" style={{ background: gold }}>Contact Us</a>
            <a href={`tel:${company.phone}`} className="px-8 py-4 text-sm font-bold uppercase tracking-wide border-2" style={{ borderColor: navy, color: navy }}>Call Us</a>
          </div>
        </div>
        {/* Stats */}
        <div className="max-w-2xl mx-auto mt-16">
          <div className="grid grid-cols-3 bg-white shadow-lg">
            {[
              { val: `${company.loanOfficers.length}`, label: 'Team Members' },
              { val: `${company.offices.length}`, label: 'Offices' },
              { val: `${new Date().getFullYear() - company.foundedYear}+`, label: 'Years' },
            ].map((s, i) => (
              <div key={i} className="text-center py-6 px-4" style={{ borderRight: i < 2 ? '1px solid #e8e2db' : 'none' }}>
                <div className="text-2xl font-bold" style={{ color: gold }}>{s.val}</div>
                <p className="text-xs uppercase tracking-wider mt-1" style={{ opacity: 0.5 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-3" style={{ color: gold }}>
            <span className="w-8 h-px inline-block" style={{ background: gold }} />
            Our People
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-16" style={{ letterSpacing: '-0.02em' }}>Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {company.loanOfficers.map((o, i) => (
              <div key={i} className="bg-white shadow-sm hover:shadow-md transition p-8 text-center">
                <Image src={o.photo} alt={o.name} width={100} height={100} className="rounded-full mx-auto mb-5" />
                <h3 className="font-bold text-lg">{o.name}</h3>
                <p className="text-sm mt-1" style={{ opacity: 0.5 }}>{o.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="py-24" style={{ background: '#f5f0eb' }}>
        <div className="max-w-6xl mx-auto px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-3" style={{ color: gold }}>
            <span className="w-8 h-px inline-block" style={{ background: gold }} />
            Locations
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-16" style={{ letterSpacing: '-0.02em' }}>Our Offices</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {company.offices.map((o, i) => (
              <div key={i} className="bg-white p-8 shadow-sm">
                <h3 className="font-bold text-lg mb-2">{o.city}, {o.state}</h3>
                <p className="text-sm mb-3" style={{ opacity: 0.55 }}>{o.address}</p>
                <a href={`tel:${o.phone}`} className="text-sm font-semibold" style={{ color: gold }}>{o.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-3" style={{ color: gold }}>
            <span className="w-8 h-px inline-block" style={{ background: gold }} />
            Resources
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-16" style={{ letterSpacing: '-0.02em' }}>Latest Articles</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white shadow-sm hover:shadow-md transition group">
                <div className="relative h-56 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white" style={{ background: gold }}>Resource</span>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-xs uppercase tracking-wider mb-3" style={{ opacity: 0.4 }}>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  <h3 className="text-xl font-bold mb-3 leading-snug">{post.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ opacity: 0.55 }}>{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#ebe5dc', color: navy }}>
        <div className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-3 gap-12">
          <div>
            <span className="text-xl font-bold tracking-tight uppercase">{company.name.split(' ')[0]}<span style={{ color: gold }}>.</span></span>
            <p className="text-sm mt-4 leading-relaxed" style={{ opacity: 0.55 }}>{company.about.slice(0, 120)}...</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: gold }}>Navigation</h4>
            <div className="space-y-2 text-sm" style={{ opacity: 0.6 }}>
              <p><a href="#team">Team</a></p>
              <p><a href="#locations">Locations</a></p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: gold }}>Contact</h4>
            <div className="space-y-2 text-sm" style={{ opacity: 0.6 }}>
              <p>{company.phone}</p>
              <p>{company.email}</p>
            </div>
          </div>
        </div>
        <div className="border-t px-8 py-6 text-center text-xs" style={{ borderColor: 'rgba(26,39,68,0.1)', opacity: 0.4 }}>
          &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
