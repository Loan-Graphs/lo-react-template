import Image from 'next/image'
import type { TemplateProps } from '../types'

export function CompanyView({ company, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-white font-serif" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>

      {/* Top bar */}
      <div className="bg-yellow-700 text-yellow-100 text-xs py-2 px-6 text-center tracking-wider">
        EQUAL HOUSING LENDER &nbsp;|&nbsp; NMLS LICENSED &nbsp;|&nbsp; {company.phone}
      </div>

      {/* Nav */}
      <nav className="bg-[#0a1628] text-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-xl font-bold tracking-wide" style={{ color: '#c8a94e' }}>{company.name}</span>
          <div className="hidden md:flex gap-8 text-sm text-gray-300">
            <a href="#about" className="hover:text-yellow-400 transition tracking-wide">ABOUT</a>
            <a href="#team" className="hover:text-yellow-400 transition tracking-wide">TEAM</a>
            <a href="#offices" className="hover:text-yellow-400 transition tracking-wide">LOCATIONS</a>
            <a href="#contact" className="hover:text-yellow-400 transition tracking-wide">CONTACT</a>
          </div>
          <a
            href="https://loangraphs.com/signup"
            className="px-5 py-2 bg-yellow-600 text-white text-sm font-semibold hover:bg-yellow-500 transition tracking-wide"
          >
            USE THIS TEMPLATE
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#0a1628] text-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="w-16 h-1 bg-yellow-500 mx-auto mb-6" />
          <p className="text-yellow-400 tracking-[0.2em] text-sm font-medium mb-4">EST. {company.foundedYear}</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            {company.name}
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">{company.about}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact"
              className="px-10 py-4 bg-yellow-600 text-white font-semibold hover:bg-yellow-500 transition tracking-widest text-sm">
              CONTACT US
            </a>
            <a href={company.website}
              className="px-10 py-4 border border-yellow-600 text-yellow-400 font-semibold hover:bg-yellow-600/10 transition tracking-widest text-sm">
              VISIT WEBSITE
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-yellow-600 text-white py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: `${new Date().getFullYear() - company.foundedYear}+`, label: 'YEARS IN BUSINESS' },
            { num: `${company.loanOfficers.length}+`, label: 'LOAN OFFICERS' },
            { num: `${company.offices.length}`, label: 'OFFICE LOCATIONS' },
            { num: '50+', label: 'STATES LICENSED' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold">{s.num}</div>
              <p className="text-yellow-100 text-xs tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-12 h-1 bg-yellow-600 mb-6" />
            <h2 className="text-4xl font-bold text-[#0a1628] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              About {company.name}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">{company.about}</p>
            <p className="text-gray-600 leading-relaxed">
              Founded in {company.foundedYear}, we have built a reputation for transparency, competitive rates, and
              personalized service that puts clients first. Our team of experienced professionals is here to guide
              you through every step of the mortgage process.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Transparent Process', desc: 'No hidden fees. Clear communication at every step.' },
              { title: 'Competitive Rates', desc: 'Access to a wide network of lenders for the best terms.' },
              { title: 'Expert Team', desc: 'Licensed professionals with decades of combined experience.' },
              { title: 'Personal Service', desc: 'Your dedicated loan officer answers directly.' },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 p-6 hover:border-yellow-500 transition">
                <div className="w-6 h-0.5 bg-yellow-600 mb-3" />
                <h3 className="font-bold text-[#0a1628] mb-2 text-sm">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-[#0a1628] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="w-12 h-1 bg-yellow-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>Our Team</h2>
            <p className="text-gray-400 mt-3">Dedicated professionals committed to your success.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {company.loanOfficers.map((officer, i) => (
              <div key={i} className="text-center group">
                <div className="relative inline-block mb-5">
                  <div className="absolute -inset-1 border border-yellow-600/30 group-hover:border-yellow-500 transition"
                    style={{ transform: 'translate(5px, 5px)' }} />
                  <Image src={officer.photo} alt={officer.name} width={140} height={140}
                    className="relative z-10 rounded-full object-cover" />
                </div>
                <h3 className="text-lg font-bold">{officer.name}</h3>
                <p className="text-yellow-400 text-sm mt-1">{officer.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section id="offices" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-yellow-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-[#0a1628]" style={{ fontFamily: 'Georgia, serif' }}>Office Locations</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {company.offices.map((office, i) => (
              <div key={i} className="bg-gray-50 border-l-4 border-yellow-600 p-8">
                <h3 className="text-xl font-bold text-[#0a1628] mb-2">{office.city}, {office.state}</h3>
                <p className="text-gray-600 text-sm mb-4">{office.address}</p>
                <a href={`tel:${office.phone}`} className="text-yellow-600 font-medium hover:text-yellow-700 transition">
                  {office.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-yellow-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-[#0a1628]" style={{ fontFamily: 'Georgia, serif' }}>Latest News</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white group">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6 border border-t-0 border-gray-200 group-hover:border-yellow-500 transition">
                  <p className="text-xs text-yellow-600 tracking-widest mb-2 uppercase">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                  <h3 className="font-bold text-[#0a1628] mb-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-[#0a1628] text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-12 h-1 bg-yellow-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>Get In Touch</h2>
          <p className="text-gray-300 mb-10">Ready to get started? Contact {company.name} today.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/5 border border-white/10 p-6">
              <div className="text-yellow-400 text-2xl mb-2">📞</div>
              <div className="font-semibold">{company.phone}</div>
              <p className="text-gray-400 text-sm">Call anytime</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6">
              <div className="text-yellow-400 text-2xl mb-2">📧</div>
              <div className="font-semibold text-sm">{company.email}</div>
              <p className="text-gray-400 text-sm">Email us</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6">
              <div className="text-yellow-400 text-2xl mb-2">🌐</div>
              <div className="font-semibold text-sm">Website</div>
              <a href={company.website} className="text-yellow-400 text-sm hover:text-yellow-300">Visit us online</a>
            </div>
          </div>
          <a
            href="https://loangraphs.com/signup"
            className="inline-block px-10 py-4 bg-yellow-600 text-white font-semibold hover:bg-yellow-500 transition tracking-wide"
          >
            USE THIS TEMPLATE FREE →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#060d1a] text-gray-500 py-10 px-6 text-center text-xs">
        <p className="text-yellow-500 font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>{company.name}</p>
        <p>&copy; {new Date().getFullYear()} {company.name}. All rights reserved. Equal Housing Lender.</p>
        <p className="mt-1 text-gray-600">Not a commitment to lend. All loans subject to credit approval.</p>
      </footer>
    </div>
  )
}
