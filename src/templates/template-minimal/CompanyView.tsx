import Image from 'next/image'
import type { TemplateProps } from '../types'

export function CompanyView({ company, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: '"Inter", system-ui, sans-serif' }}>

      {/* Nav */}
      <nav className="px-8 md:px-16 py-6 flex items-center justify-between border-b border-gray-100">
        <span className="text-sm font-medium tracking-widest text-gray-900">{company.name.toUpperCase()}</span>
        <div className="hidden md:flex gap-10 text-sm text-gray-400">
          <a href="#about" className="hover:text-gray-900 transition">About</a>
          <a href="#team" className="hover:text-gray-900 transition">Team</a>
          <a href="#offices" className="hover:text-gray-900 transition">Locations</a>
        </div>
        <a href="https://loangraphs.com/signup"
          className="text-sm text-gray-400 hover:text-gray-900 transition underline underline-offset-4">
          Use This Template
        </a>
      </nav>

      {/* Hero */}
      <section className="px-8 md:px-16 py-32">
        <p className="text-xs tracking-[0.3em] text-gray-400 mb-6 uppercase">Est. {company.foundedYear}</p>
        <h1 className="text-6xl md:text-8xl font-light text-gray-900 mb-8 leading-tight tracking-tight">
          {company.name}
        </h1>
        <p className="text-xl text-gray-500 mb-12 max-w-xl leading-relaxed font-light">{company.about}</p>
        <div className="flex gap-6">
          <a href="#team"
            className="text-sm tracking-widest border-b-2 border-gray-900 pb-1 font-medium hover:border-gray-400 hover:text-gray-400 transition">
            MEET THE TEAM →
          </a>
          <a href={company.website}
            className="text-sm tracking-widest text-gray-400 border-b-2 border-gray-200 pb-1 hover:border-gray-400 transition">
            VISIT WEBSITE
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-gray-100 px-8 md:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100">
          {[
            { v: `${new Date().getFullYear() - company.foundedYear}+`, l: 'Years' },
            { v: `${company.loanOfficers.length}+`, l: 'Loan Officers' },
            { v: `${company.offices.length}`, l: 'Locations' },
            { v: '500+', l: 'Happy Clients' },
          ].map((s) => (
            <div key={s.l} className="bg-white p-10">
              <div className="text-4xl font-light mb-1">{s.v}</div>
              <p className="text-xs tracking-widest text-gray-400 uppercase">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-gray-100 px-8 md:px-16 py-24">
        <div className="max-w-5xl grid md:grid-cols-2 gap-24">
          <div>
            <p className="text-xs tracking-[0.3em] text-gray-400 mb-8 uppercase">Our Story</p>
            <p className="text-gray-600 leading-relaxed mb-6">{company.about}</p>
            <p className="text-gray-600 leading-relaxed">
              Since {company.foundedYear}, we have helped hundreds of families and investors navigate the mortgage process with clarity and confidence.
            </p>
          </div>
          <div className="space-y-8">
            {[
              { t: 'Transparent', d: 'No hidden fees. Clear terms from day one.' },
              { t: 'Fast', d: 'Pre-approvals in 24 hours or less.' },
              { t: 'Personal', d: 'Your loan officer — not a call center.' },
              { t: 'Expert', d: 'Decades of combined lending experience.' },
            ].map((v) => (
              <div key={v.t} className="pb-8 border-b border-gray-100">
                <h3 className="font-medium text-gray-900 mb-1">{v.t}</h3>
                <p className="text-sm text-gray-400">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="border-t border-gray-100 px-8 md:px-16 py-24 bg-gray-50">
        <div className="max-w-5xl">
          <p className="text-xs tracking-[0.3em] text-gray-400 mb-12 uppercase">The Team</p>
          <div className="grid md:grid-cols-3 gap-12">
            {company.loanOfficers.map((officer, i) => (
              <div key={i}>
                <Image src={officer.photo} alt={officer.name} width={280} height={320}
                  className="object-cover w-full mb-5" />
                <h3 className="font-medium text-gray-900">{officer.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{officer.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section id="offices" className="border-t border-gray-100 px-8 md:px-16 py-24">
        <div className="max-w-5xl">
          <p className="text-xs tracking-[0.3em] text-gray-400 mb-12 uppercase">Locations</p>
          <div className="grid md:grid-cols-3 gap-px bg-gray-100">
            {company.offices.map((office, i) => (
              <div key={i} className="bg-white p-10">
                <p className="text-xs text-gray-300 mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-medium text-gray-900 mb-2">{office.city}, {office.state}</h3>
                <p className="text-sm text-gray-400 mb-4">{office.address}</p>
                <a href={`tel:${office.phone}`} className="text-sm hover:text-gray-700 text-gray-500 transition">{office.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="border-t border-gray-100 px-8 md:px-16 py-24 bg-gray-50">
        <div className="max-w-5xl">
          <p className="text-xs tracking-[0.3em] text-gray-400 mb-12 uppercase">Insights</p>
          <div className="grid md:grid-cols-3 gap-12">
            {blogPosts.map(post => (
              <div key={post.id}>
                <div className="relative h-44 mb-5 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
                <p className="text-xs text-gray-300 mb-2">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
                <h3 className="font-medium text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-400">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 px-8 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-2">Powered by LoanGraphs</p>
          <h3 className="text-2xl font-light">Want a website like this?</h3>
        </div>
        <a
          href="https://loangraphs.com/signup"
          className="text-sm tracking-widest border-b-2 border-gray-900 pb-1 font-medium hover:border-gray-400 hover:text-gray-400 transition whitespace-nowrap"
        >
          USE THIS TEMPLATE FREE →
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-8 md:px-16 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-4 text-xs text-gray-300">
          <span className="text-gray-900 font-medium">{company.name}</span>
          <span>{company.phone} · {company.email}</span>
          <span>&copy; {new Date().getFullYear()} · Equal Housing Lender</span>
        </div>
      </footer>
    </div>
  )
}
