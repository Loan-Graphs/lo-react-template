import Image from 'next/image'
import type { TemplateProps } from '../types'

export function CompanyView({ company, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-amber-50">

      {/* Nav */}
      <nav className="bg-white px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
              {company.name[0]}
            </div>
            <div className="font-bold text-gray-900">{company.name}</div>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-gray-600">
            <a href="#about" className="hover:text-amber-600 transition">About Us</a>
            <a href="#team" className="hover:text-amber-600 transition">Team</a>
            <a href="#offices" className="hover:text-amber-600 transition">Locations</a>
          </div>
          <a
            href="https://loangraphs.com/signup"
            className="px-5 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-full hover:bg-amber-400 transition"
          >
            Use This Template
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-6">🏠❤️</div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            {company.name}
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">{company.about}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#team"
              className="px-8 py-4 bg-amber-500 text-white font-bold rounded-2xl hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-200 transition">
              Meet Our Team 👋
            </a>
            <a href={company.website}
              className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl shadow-md hover:shadow-lg transition">
              Visit Our Website
            </a>
          </div>
          <p className="text-gray-400 text-sm mt-6">Est. {company.foundedYear} · Serving families across the nation</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-6 bg-white shadow-inner">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-10">
          {[
            { emoji: '🎂', v: `Est. ${company.foundedYear}`, l: `${new Date().getFullYear() - company.foundedYear} Years Strong` },
            { emoji: '👥', v: `${company.loanOfficers.length}+`, l: 'Loan Officers' },
            { emoji: '📍', v: `${company.offices.length}`, l: 'Office Locations' },
            { emoji: '🏆', v: '500+', l: 'Families Helped' },
          ].map((s) => (
            <div key={s.l} className="flex items-center gap-3">
              <span className="text-3xl">{s.emoji}</span>
              <div>
                <div className="font-bold text-gray-900">{s.v}</div>
                <div className="text-xs text-gray-500">{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-3xl">💛</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{company.about}</p>
            <p className="text-gray-600 leading-relaxed">
              Since {company.foundedYear}, we&apos;ve built our reputation on genuine relationships, honest advice, and results that make families happy. We&apos;re not just a lender — we&apos;re your neighbors.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji: '🤝', t: 'Personal Service', d: 'Real people who pick up the phone.' },
              { emoji: '💰', t: 'Great Rates', d: 'Competitive options for every budget.' },
              { emoji: '⚡', t: 'Fast Process', d: 'Pre-approvals done in 24 hours.' },
              { emoji: '🔒', t: 'Trustworthy', d: 'Licensed, insured, and 5-star rated.' },
            ].map((v) => (
              <div key={v.t} className="bg-white rounded-3xl p-6 shadow-sm border-2 border-transparent hover:border-amber-200 transition">
                <div className="text-2xl mb-3">{v.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-1">{v.t}</h3>
                <p className="text-gray-500 text-xs">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 px-6 bg-gradient-to-br from-amber-500 to-orange-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-4xl">👥</span>
            <h2 className="text-4xl font-bold mt-3">Meet the People Who Care</h2>
            <p className="text-amber-100 mt-3">We&apos;re real people with real mortgages. We get it.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {company.loanOfficers.map((officer, i) => (
              <div key={i} className="bg-white/15 backdrop-blur rounded-3xl p-8 text-center border-2 border-white/20 hover:border-white/40 transition">
                <div className="relative inline-block mb-5">
                  <div className="absolute -inset-2 bg-white rounded-full opacity-30" />
                  <Image src={officer.photo} alt={officer.name} width={100} height={100}
                    className="relative z-10 rounded-full object-cover" />
                </div>
                <h3 className="text-xl font-bold">{officer.name}</h3>
                <p className="text-amber-200 text-sm mt-1">{officer.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section id="offices" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-3xl">📍</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Find Us Near You</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {company.offices.map((office, i) => (
              <div key={i} className="bg-amber-50 rounded-3xl p-8 border-2 border-amber-100 hover:border-amber-300 transition">
                <div className="text-3xl mb-4">🏢</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{office.city}, {office.state}</h3>
                <p className="text-gray-500 text-sm mb-4">{office.address}</p>
                <a href={`tel:${office.phone}`} className="text-amber-600 font-semibold text-sm hover:text-amber-500 transition">
                  📞 {office.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-3xl">📚</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Helpful Articles</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white rounded-3xl overflow-hidden group hover:shadow-xl transition border-2 border-transparent hover:border-amber-200">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-amber-600 text-xs font-semibold mb-2">
                    📅 {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
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
      <section className="py-20 px-6 bg-gradient-to-br from-amber-500 to-orange-500 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <span className="text-5xl">🏡</span>
          <h2 className="text-4xl font-bold mt-4 mb-3">Ready to find your home?</h2>
          <p className="text-amber-100 mb-8 text-lg">Call us at {company.phone} or click below to get started.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${company.phone}`}
              className="px-8 py-4 bg-white text-amber-700 font-bold rounded-2xl hover:shadow-xl transition">
              📞 Call Us Now
            </a>
            <a href="https://loangraphs.com/signup"
              className="px-8 py-4 bg-white/20 text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-white/30 transition">
              Use This Template ✨
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 text-center">
        <p className="text-white font-bold text-lg mb-2">{company.name}</p>
        <p className="text-sm">{company.phone} · {company.email}</p>
        <p className="text-xs mt-4">&copy; {new Date().getFullYear()} {company.name}. Equal Housing Lender. Not a commitment to lend.</p>
      </footer>
    </div>
  )
}
