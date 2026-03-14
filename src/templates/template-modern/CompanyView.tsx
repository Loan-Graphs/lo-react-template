import Image from 'next/image'
import type { TemplateProps } from '../types'

export function CompanyView({ company, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Nav */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              {company.name[0]}
            </div>
            <span className="font-semibold text-slate-900">{company.name}</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#team" className="hover:text-blue-600 transition">Team</a>
            <a href="#offices" className="hover:text-blue-600 transition">Locations</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          </div>
          <a
            href="https://loangraphs.com/signup"
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition"
          >
            Use This Template
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-6 tracking-wide">
            EST. {company.foundedYear}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            {company.name}
          </h1>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">{company.about}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-blue-200 transition">
              Contact Us
            </a>
            <a href={company.website}
              className="px-8 py-4 bg-white text-slate-800 font-semibold rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition">
              Visit Website
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-14 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: `${new Date().getFullYear() - company.foundedYear}+`, label: 'Years in Business' },
            { value: `${company.loanOfficers.length}+`, label: 'Loan Officers' },
            { value: `${company.offices.length}`, label: 'Office Locations' },
            { value: '500+', label: 'Happy Clients' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {s.value}
              </div>
              <p className="text-slate-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Our Story</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-6">Trusted Since {company.foundedYear}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">{company.about}</p>
            <p className="text-slate-600 leading-relaxed">
              Our mission is simple: help every client achieve their homeownership goals with speed, transparency, and the personal touch you won&apos;t find at a big bank.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji: '🏆', title: 'Award Winning', desc: 'Recognized for excellence in client service.' },
              { emoji: '🔒', title: 'Secure & Compliant', desc: 'Bank-grade security for your data.' },
              { emoji: '⚡', title: 'Fast Approvals', desc: 'Pre-approvals often within 24 hours.' },
              { emoji: '🤝', title: 'Personal Service', desc: 'You talk to your loan officer, not a bot.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-400 font-semibold text-sm tracking-wide uppercase">Our Team</span>
            <h2 className="text-4xl font-bold mt-2">Meet the Professionals</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {company.loanOfficers.map((officer, i) => (
              <div key={i} className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-blue-400/30 transition text-center">
                <div className="relative inline-block mb-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full blur-lg opacity-40 scale-110" />
                  <Image src={officer.photo} alt={officer.name} width={120} height={120}
                    className="relative z-10 rounded-full object-cover" />
                </div>
                <h3 className="text-lg font-bold">{officer.name}</h3>
                <p className="text-blue-400 text-sm mt-1">{officer.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section id="offices" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Locations</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Find a Location Near You</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {company.offices.map((office, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition">
                <div className="text-3xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{office.city}, {office.state}</h3>
                <p className="text-slate-500 text-sm mb-4">{office.address}</p>
                <a href={`tel:${office.phone}`} className="text-blue-600 font-semibold hover:text-indigo-600 transition">
                  {office.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Resources</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Mortgage Insights</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition group">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-blue-600 text-xs font-semibold mb-2">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <h3 className="font-bold text-slate-900 mb-2">{post.title}</h3>
                  <p className="text-slate-500 text-sm">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 text-lg">{company.name} is here to help you finance your next home.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${company.phone}`}
              className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:shadow-xl transition">
              Call {company.phone}
            </a>
            <a href="https://loangraphs.com/signup"
              className="px-8 py-4 bg-white/20 text-white font-bold rounded-2xl border border-white/30 hover:bg-white/30 transition">
              Use This Template →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 text-center text-sm">
        <p className="text-white font-bold mb-2">{company.name}</p>
        <p>&copy; {new Date().getFullYear()} {company.name}. All rights reserved. Equal Housing Lender.</p>
      </footer>
    </div>
  )
}
