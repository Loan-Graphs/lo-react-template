import Image from 'next/image'
import type { TemplateProps } from '../types'

export function CompanyView({ company, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Top Bar */}
      <div className="bg-green-900 text-green-100 text-xs py-2 px-8 flex justify-between items-center">
        <span>Equal Housing Lender · NMLS Licensed</span>
        <span className="hidden md:flex gap-6">
          <span>📞 {company.phone}</span>
          <span>📧 {company.email}</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-800 flex items-center justify-center text-white font-bold text-sm">
              {company.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
            </div>
            <div className="font-bold text-gray-900">{company.name}</div>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-gray-600 font-medium">
            <a href="#about" className="hover:text-green-700 transition">About</a>
            <a href="#team" className="hover:text-green-700 transition">Team</a>
            <a href="#offices" className="hover:text-green-700 transition">Locations</a>
          </div>
          <a
            href="https://loangraphs.com/signup"
            className="px-6 py-2.5 bg-green-800 text-white text-sm font-semibold hover:bg-green-700 transition"
          >
            Use This Template
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-green-800 text-white py-28 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="h-px w-12 bg-green-400" />
            <span className="text-green-300 text-sm font-semibold tracking-widest uppercase">Est. {company.foundedYear}</span>
            <div className="h-px w-12 bg-green-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{company.name}</h1>
          <p className="text-green-100 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">{company.about}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#team" className="px-8 py-4 bg-white text-green-900 font-bold hover:bg-green-50 transition">Meet the Team</a>
            <a href={company.website} className="px-8 py-4 border border-green-400 text-white font-semibold hover:bg-white/10 transition">Visit Website</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 border-y border-gray-200 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: `${new Date().getFullYear() - company.foundedYear}+`, l: 'Years in Business' },
            { n: `${company.loanOfficers.length}+`, l: 'Loan Officers' },
            { n: `${company.offices.length}`, l: 'Office Locations' },
            { n: '500+', l: 'Clients Helped' },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl font-bold text-green-800">{s.n}</div>
              <p className="text-gray-500 text-sm mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-green-700" />
              <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">Our Mission</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Professional Lending. Personal Service.</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{company.about}</p>
            <p className="text-gray-600 leading-relaxed">
              Every client deserves a trusted advisor who puts their best interests first. That&apos;s the standard we hold ourselves to every day.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: '🔒', t: 'Licensed & Insured', d: 'Fully licensed in all operating states.' },
              { icon: '📊', t: 'Competitive Rates', d: 'Access to hundreds of lender programs.' },
              { icon: '⚡', t: 'Fast Closings', d: 'Average close time under 21 days.' },
              { icon: '🤝', t: 'Personal Touch', d: 'Dedicated loan officers, not call queues.' },
            ].map((v) => (
              <div key={v.t} className="bg-green-50 p-6 border border-green-100">
                <div className="text-2xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{v.t}</h3>
                <p className="text-gray-500 text-xs">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 px-6 bg-green-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-green-400" />
              <span className="text-green-300 text-sm font-semibold tracking-widest uppercase">Our Team</span>
            </div>
            <h2 className="text-4xl font-bold">Meet the Professionals</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {company.loanOfficers.map((officer, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 hover:border-green-400/30 transition text-center">
                <Image src={officer.photo} alt={officer.name} width={120} height={120}
                  className="rounded-full object-cover mx-auto mb-4" />
                <h3 className="font-bold text-lg">{officer.name}</h3>
                <p className="text-green-300 text-sm mt-1">{officer.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section id="offices" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-green-700" />
              <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">Locations</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Office Locations</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {company.offices.map((office, i) => (
              <div key={i} className="bg-white p-8 border border-gray-200 hover:border-green-700 transition">
                <div className="text-3xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{office.city}, {office.state}</h3>
                <p className="text-gray-500 text-sm mb-4">{office.address}</p>
                <a href={`tel:${office.phone}`} className="text-green-700 font-semibold text-sm hover:text-green-600 transition">
                  {office.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-green-700" />
              <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">Knowledge Base</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Mortgage Insights</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map(post => (
              <div key={post.id} className="group border border-gray-200 hover:border-green-700 transition">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-xs text-green-700 font-semibold mb-2 uppercase tracking-widest">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                  <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-900 text-center text-white">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-green-300 text-xs font-semibold tracking-widest uppercase mb-3">Powered by LoanGraphs</p>
          <h2 className="text-3xl font-bold mb-4">Want a website like this?</h2>
          <p className="text-green-100 mb-8">Professional templates for mortgage teams. Free to start.</p>
          <a
            href="https://loangraphs.com/signup"
            className="inline-block px-10 py-4 bg-white text-green-900 font-bold hover:bg-green-50 transition"
          >
            Use This Template Free →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-green-300 py-10 px-6 text-center text-xs border-t border-green-800">
        <p className="text-white font-bold mb-2">{company.name}</p>
        <p>&copy; {new Date().getFullYear()} {company.name}. All rights reserved. Equal Housing Lender.</p>
      </footer>
    </div>
  )
}
