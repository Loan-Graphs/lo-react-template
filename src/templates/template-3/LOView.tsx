import Image from 'next/image'
import type { TemplateProps } from '../types'

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  const firstName = lo.name.split(' ')[0]
  const statesLabel = lo.licenseStates?.join(', ') || lo.licenseStates?.join(', ')

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between">
        <span className="text-sm tracking-widest uppercase font-light">{lo.name}</span>
        <div className="hidden md:flex gap-8 text-sm text-gray-500">
          <a href="#about" className="hover:text-gray-900">About</a>
          <a href="#services" className="hover:text-gray-900">Services</a>
          <a href="#reviews" className="hover:text-gray-900">Reviews</a>
          <a href="#contact" className="hover:text-gray-900">Contact</a>
        </div>
      </nav>

      {/* 1. Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm text-gray-400 tracking-widest uppercase mb-4">{lo.title}</p>
            <h1 className="text-5xl font-light mb-6 leading-tight">{lo.headline || lo.name}</h1>
            <p className="text-gray-500 leading-relaxed mb-8">{lo.subheadline || lo.bio}</p>
            <a href="#contact" className="inline-block text-sm tracking-widest uppercase border-b-2 border-gray-900 pb-1 hover:border-gray-400 transition">Get in touch &rarr;</a>
          </div>
          <div>
            <Image src={lo.photo} alt={lo.name} width={400} height={400} className="rounded-lg grayscale hover:grayscale-0 transition duration-700" />
          </div>
        </div>
      </section>

      {/* 2. Social Proof Bar */}
      <section className="border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><div className="text-2xl font-light">{lo.googleRating || 5}★</div><p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Rating</p></div>
          <div><div className="text-2xl font-light">{lo.reviewCount || '100'}+</div><p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Reviews</p></div>
          <div><div className="text-2xl font-light">{lo.yearsExperience || lo.yearsInIndustry}</div><p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Years</p></div>
          <div><div className="text-2xl font-light">{lo.licenseStates?.length || lo.licenseStates?.length}</div><p className="text-xs text-gray-400 uppercase tracking-widest mt-1">States</p></div>
        </div>
      </section>

      {/* 3. Loan Products */}
      <section id="services" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-sm tracking-widest uppercase text-gray-400 mb-12">Loan Programs</h2>
          <div className="space-y-6">
            {lo.loanProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between py-4 border-b border-gray-200">
                <div>
                  <span className="text-lg font-light">{product.name}</span>
                  <p className="text-sm text-gray-400 mt-1">{product.description}</p>
                </div>
                <span className="text-sm text-gray-400">&rarr;</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Me */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-sm tracking-widest uppercase text-gray-400 mb-12">Why {firstName}</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            {lo.differentiators.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-100">
                <span className="text-gray-300 text-sm mt-0.5">0{i + 1}</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="font-light text-xl mb-4">Get in touch</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <a href={`tel:${lo.phone}`} className="block hover:text-gray-900">{lo.phone}</a>
              <a href={`mailto:${lo.email}`} className="block hover:text-gray-900">{lo.email}</a>
            </div>
            <p className="text-xs text-gray-400 mt-4">{lo.company} · NMLS# {lo.nmls}</p>
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-sm tracking-widest uppercase text-gray-400 mb-12">The Process</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Consultation', desc: 'Review your goals and recommend loan options.' },
              { step: '02', title: 'Pre-Approval', desc: 'Submit application. Pre-approval often within 24 hours.' },
              { step: '03', title: 'Closing', desc: 'We handle paperwork and get you to the closing table.' },
            ].map((s) => (
              <div key={s.step}>
                <div className="text-2xl font-light text-gray-300 mb-3">{s.step}</div>
                <h3 className="font-medium mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Market Rates Widget */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-sm tracking-widest uppercase text-gray-400 mb-12">Today&apos;s Rates</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: '30-Year', rate: '6.875%' },
            { label: '15-Year', rate: '6.125%' },
            { label: 'FHA', rate: '6.500%' },
            { label: 'VA', rate: '6.250%' },
          ].map((r) => (
            <div key={r.label} className="text-center">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">{r.label}</div>
              <div className="text-2xl font-light">{r.rate}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 text-center mt-6">Rates for illustration only. Contact {firstName} for a personalized quote.</p>
      </section>

      {/* 7. Testimonials */}
      <section id="reviews" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-sm tracking-widest uppercase text-gray-400 mb-12">Testimonials</h2>
          <div className="space-y-12">
            {lo.testimonials.map((t) => (
              <div key={t.id} className="border-l-2 border-gray-200 pl-8">
                <p className="text-xl font-light text-gray-700 italic mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm text-gray-400">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. About */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Image src={lo.photo} alt={lo.name} width={360} height={360} className="rounded-lg" />
          <div>
            <h2 className="text-sm tracking-widest uppercase text-gray-400 mb-4">About</h2>
            <h3 className="text-3xl font-light mb-2">{lo.name}</h3>
            <p className="text-gray-400 mb-6">{lo.title} · NMLS# {lo.nmls}</p>
            <p className="text-gray-600 leading-relaxed">{lo.bio}</p>
            {lo.company && <p className="text-gray-400 text-sm mt-4">{lo.company}</p>}
          </div>
        </div>
      </section>

      {/* 9. Lead Capture Form */}
      <section id="contact" className="bg-gray-50 py-20">
        <div className="max-w-md mx-auto px-6 text-center">
          <h2 className="text-3xl font-light mb-4">Let&apos;s talk</h2>
          <p className="text-gray-400 mb-8">Fill out the form and {firstName} will be in touch within 24 hours.</p>
          <div className="space-y-4 text-left">
            <input type="text" placeholder="Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-gray-400 outline-none transition" />
            <input type="tel" placeholder="Phone" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-gray-400 outline-none transition" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-gray-400 outline-none transition" />
            <button className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg text-sm tracking-widest uppercase hover:bg-gray-800 transition">Send Message</button>
          </div>
        </div>
      </section>

      {/* 10. Blog Resources */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-sm tracking-widest uppercase text-gray-400 mb-12">Journal</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <div key={post.id}>
              <div className="relative h-48 mb-4"><Image src={post.image} alt={post.title} fill className="object-cover rounded-lg grayscale" /></div>
              <p className="text-xs text-gray-400 mb-2">{new Date(post.date).toLocaleDateString()}</p>
              <h3 className="font-light text-lg">{post.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-6 text-sm text-gray-400">
            <div>
              <div className="text-gray-900 font-medium">{lo.name}</div>
              <div>{lo.title}</div>
              {lo.company && <div>{lo.company}</div>}
            </div>
            <div className="space-y-1">
              <div>{lo.phone}</div>
              <div>{lo.email}</div>
            </div>
            <div>
              <div>NMLS# {lo.nmls}</div>
              {statesLabel && <div>Licensed in: {statesLabel}</div>}
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
            <p>&copy; {new Date().getFullYear()} {lo.name}. Equal Housing Lender.</p>
            <p className="mt-1">Not a commitment to lend. All loans subject to credit approval.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
