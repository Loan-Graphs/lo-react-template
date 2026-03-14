import Image from 'next/image'
import type { TemplateProps } from '../types'

export function CompanyView({ company, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Nav */}
      <nav className="bg-black border-b border-white/10 px-6 py-5 flex items-center justify-between sticky top-0 z-50">
        <span className="text-xl font-black tracking-tight text-white">{company.name.toUpperCase()}</span>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-400 tracking-wide">
          <a href="#about" className="hover:text-red-400 transition">ABOUT</a>
          <a href="#team" className="hover:text-red-400 transition">TEAM</a>
          <a href="#offices" className="hover:text-red-400 transition">LOCATIONS</a>
        </div>
        <a
          href="https://loangraphs.com/signup"
          className="px-6 py-3 bg-red-600 text-white font-black text-sm tracking-widest hover:bg-red-500 transition"
        >
          USE TEMPLATE
        </a>
      </nav>

      {/* Hero */}
      <section className="bg-black min-h-[80vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <p className="text-red-400 text-sm font-black tracking-[0.3em] mb-4">EST. {company.foundedYear}</p>
          <h1 className="text-7xl md:text-9xl font-black leading-none uppercase mb-6 tracking-tight">
            {company.name}
          </h1>
          <div className="w-24 h-2 bg-red-600 mx-auto mb-8" />
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">{company.about}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#team"
              className="px-10 py-5 bg-red-600 text-white font-black text-lg hover:bg-red-500 transition tracking-widest">
              MEET THE TEAM
            </a>
            <a href={company.website}
              className="px-10 py-5 border-2 border-white text-white font-black text-lg hover:bg-white hover:text-black transition tracking-widest">
              OUR WEBSITE
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-red-600 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: `${new Date().getFullYear() - company.foundedYear}+`, l: 'YEARS' },
            { v: `${company.loanOfficers.length}+`, l: 'LOAN OFFICERS' },
            { v: `${company.offices.length}`, l: 'OFFICES' },
            { v: '500+', l: 'CLIENTS SERVED' },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-4xl font-black">{s.v}</div>
              <p className="text-red-200 text-xs tracking-widest mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black uppercase mb-2">ABOUT US</h2>
          <div className="w-16 h-1.5 bg-red-600 mb-12" />
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-gray-700 text-xl leading-relaxed">{company.about}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: 'TRANSPARENCY', d: 'No hidden fees or surprises.' },
                { n: 'SPEED', d: 'Pre-approvals within 24 hours.' },
                { n: 'EXPERTISE', d: 'Decades of lending experience.' },
                { n: 'RESULTS', d: 'Hundreds of satisfied clients.' },
              ].map((v) => (
                <div key={v.n} className="bg-black text-white p-6">
                  <div className="w-8 h-1 bg-red-600 mb-3" />
                  <h3 className="font-black mb-2">{v.n}</h3>
                  <p className="text-gray-400 text-sm">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black uppercase mb-2">THE TEAM</h2>
          <div className="w-16 h-1.5 bg-red-600 mb-14" />
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {company.loanOfficers.map((officer, i) => (
              <div key={i} className="bg-black p-10 group hover:bg-red-950/30 transition">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-red-600 transform translate-x-2 translate-y-2" />
                  <Image src={officer.photo} alt={officer.name} width={100} height={100}
                    className="relative z-10 object-cover grayscale group-hover:grayscale-0 transition" />
                </div>
                <h3 className="text-xl font-black group-hover:text-red-400 transition">{officer.name.toUpperCase()}</h3>
                <p className="text-gray-500 text-sm mt-1 tracking-widest">{officer.title.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section id="offices" className="py-24 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black uppercase mb-2">LOCATIONS</h2>
          <div className="w-16 h-1.5 bg-red-600 mb-14" />
          <div className="grid md:grid-cols-3 gap-0 border-2 border-black">
            {company.offices.map((office, i) => (
              <div key={i} className="p-10 border border-black hover:bg-red-50 transition">
                <div className="text-red-600 font-black text-4xl mb-4">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-2xl font-black mb-2 uppercase">{office.city}, {office.state}</h3>
                <p className="text-gray-600 mb-4">{office.address}</p>
                <a href={`tel:${office.phone}`} className="font-black text-red-600 hover:underline">{office.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black uppercase mb-2">RESOURCES</h2>
          <div className="w-16 h-1.5 bg-red-600 mb-14" />
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="group">
                <div className="relative h-52 overflow-hidden mb-4">
                  <Image src={post.image} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                </div>
                <p className="text-red-400 text-xs font-black tracking-widest mb-2 uppercase">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
                <h3 className="font-black text-xl mb-2 group-hover:text-red-400 transition">{post.title}</h3>
                <p className="text-gray-400 text-sm">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-red-600 text-center">
        <h2 className="text-5xl font-black uppercase mb-4">READY TO WORK WITH US?</h2>
        <p className="text-red-100 mb-8 text-xl">{company.phone} · {company.email}</p>
        <a
          href="https://loangraphs.com/signup"
          className="inline-block px-12 py-5 bg-black text-white font-black text-lg tracking-widest hover:bg-gray-900 transition"
        >
          USE THIS TEMPLATE FREE →
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-10 px-6 text-center text-xs text-gray-600">
        <p className="font-black text-white mb-2">{company.name.toUpperCase()}</p>
        <p>&copy; {new Date().getFullYear()} {company.name}. Equal Housing Lender. Not a commitment to lend.</p>
      </footer>
    </div>
  )
}
