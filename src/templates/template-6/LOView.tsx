import Image from 'next/image'
import type { TemplateProps } from '../types'

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf9f6' }}>
      <nav className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between border-b" style={{ borderColor: '#e8e4dd' }}>
        <span className="text-lg" style={{ fontFamily: 'Georgia, serif' }}>{lo.name}</span>
        <div className="hidden md:flex gap-8 text-sm" style={{ color: '#8a8278' }}>
          <a href="#about" className="hover:opacity-70">About</a>
          <a href="#services" className="hover:opacity-70">Services</a>
          <a href="#reviews" className="hover:opacity-70">Reviews</a>
          <a href="#contact" className="hover:opacity-70">Contact</a>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#b8a88a' }}>{lo.title}</p>
          <h1 className="text-5xl mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif', color: '#2c2420' }}>{lo.name}</h1>
          <p className="leading-relaxed mb-8" style={{ color: '#6b5e50' }}>{lo.bio}</p>
          <div className="flex gap-4">
            <a href={`mailto:${lo.email}`} className="px-6 py-3 rounded text-white font-medium transition hover:opacity-90" style={{ backgroundColor: '#2c2420' }}>Schedule Consultation</a>
            <a href={`tel:${lo.phone}`} className="px-6 py-3 rounded font-medium transition hover:opacity-70" style={{ border: '1px solid #d4cdc3', color: '#2c2420' }}>{lo.phone}</a>
          </div>
        </div>
        <Image src={lo.photo} alt={lo.name} width={400} height={480} className="rounded-lg shadow-lg" style={{ objectFit: 'cover' }} />
      </section>

      <section className="py-16" style={{ backgroundColor: '#f0ece4' }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          <div><div className="text-3xl" style={{ fontFamily: 'Georgia, serif', color: '#2c2420' }}>{lo.yearsInIndustry}</div><p className="text-sm mt-1" style={{ color: '#8a8278' }}>Years Experience</p></div>
          <div><div className="text-3xl" style={{ fontFamily: 'Georgia, serif', color: '#2c2420' }}>{lo.licensedStates.length}</div><p className="text-sm mt-1" style={{ color: '#8a8278' }}>Licensed States</p></div>
          <div><div className="text-3xl" style={{ fontFamily: 'Georgia, serif', color: '#2c2420' }}>{lo.loanTypes.length}</div><p className="text-sm mt-1" style={{ color: '#8a8278' }}>Loan Programs</p></div>
        </div>
      </section>

      <section id="services" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl mb-12" style={{ fontFamily: 'Georgia, serif', color: '#2c2420' }}>Services</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {lo.loanTypes.map((type, i) => (
            <div key={i} className="p-6 rounded-lg border" style={{ borderColor: '#e8e4dd', backgroundColor: '#fff' }}>
              <h3 className="font-medium mb-1" style={{ color: '#2c2420' }}>{type}</h3>
              <p className="text-sm" style={{ color: '#8a8278' }}>Tailored solutions for your needs.</p>
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="py-20" style={{ backgroundColor: '#f0ece4' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl mb-12" style={{ fontFamily: 'Georgia, serif', color: '#2c2420' }}>Client Testimonials</h2>
          <div className="space-y-8">
            {lo.testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-lg" style={{ borderLeft: '3px solid #b8a88a' }}>
                <p className="text-lg italic mb-4" style={{ color: '#4a3f35', fontFamily: 'Georgia, serif' }}>&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-medium" style={{ color: '#8a8278' }}>— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl mb-12" style={{ fontFamily: 'Georgia, serif', color: '#2c2420' }}>Insights</h2>
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
      </section>

      <section id="contact" className="py-16 text-center" style={{ backgroundColor: '#2c2420' }}>
        <h2 className="text-3xl text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>Let&apos;s Connect</h2>
        <p className="mb-8" style={{ color: '#b8a88a' }}>{lo.email} · {lo.phone}</p>
        <a href={`mailto:${lo.email}`} className="px-8 py-3 rounded text-sm font-medium" style={{ backgroundColor: '#b8a88a', color: '#2c2420' }}>Get in Touch</a>
      </section>

      <footer className="py-6 px-6 text-center text-xs" style={{ color: '#b8a88a', backgroundColor: '#2c2420' }}>
        <p>NMLS #{lo.nmls} · {lo.licensedStates.join(', ')}</p>
        <p className="mt-1">&copy; {new Date().getFullYear()} {lo.name}</p>
      </footer>
    </div>
  )
}
