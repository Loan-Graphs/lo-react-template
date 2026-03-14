import Image from 'next/image'
import type { TemplateProps } from '../types'

export function LOView({ loanOfficer: lo, blogPosts }: TemplateProps) {
  const firstName = lo.name.split(' ')[0]
  const states = lo.licensedStates || []

  return (
    <div className="min-h-screen bg-amber-50">

      {/* Nav */}
      <nav className="bg-white px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
              {lo.name[0]}
            </div>
            <div>
              <div className="font-bold text-gray-900">{lo.name}</div>
              <div className="text-xs text-amber-600">{lo.title}</div>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-gray-600">
            <a href="#about" className="hover:text-amber-600 transition">My Story</a>
            <a href="#programs" className="hover:text-amber-600 transition">Programs</a>
            <a href="#reviews" className="hover:text-amber-600 transition">Reviews</a>
            <a href="#contact" className="hover:text-amber-600 transition">Let&apos;s Talk</a>
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
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">👋</span>
              <span className="text-amber-700 font-semibold">Hi, I&apos;m {firstName}!</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {lo.headline || `Let's find you the perfect mortgage.`}
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-xl leading-relaxed">
              {lo.subheadline || lo.bio}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact"
                className="px-8 py-4 bg-amber-500 text-white font-bold rounded-2xl hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-200 transition text-lg">
                Let&apos;s Chat 😊
              </a>
              <a href={`tel:${lo.phone}`}
                className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl shadow-md hover:shadow-lg transition">
                📞 {lo.phone}
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              ✅ No pressure · ✅ Free consultation · ✅ Fast pre-approvals
            </p>
          </div>
          <div className="flex-shrink-0 relative">
            <div className="absolute -inset-4 bg-amber-200 rounded-full blur-3xl opacity-50" />
            <div className="absolute -inset-2 bg-amber-100 rounded-[2rem] rotate-3" />
            <Image src={lo.photo} alt={lo.name} width={320} height={380}
              className="relative z-10 rounded-[2rem] shadow-2xl object-cover" />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 z-20 text-center">
              <div className="text-2xl">⭐</div>
              <div className="font-bold text-gray-900">{lo.googleRating || 5.0}/5</div>
              <div className="text-xs text-gray-400">{lo.reviewCount}+ Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-10 px-6 bg-white shadow-inner">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { emoji: '🏆', v: `${lo.yearsExperience || lo.yearsInIndustry || 10}+ Years`, l: 'Helping Families' },
              { emoji: '❤️', v: `${lo.reviewCount || 100}+`, l: 'Happy Clients' },
              { emoji: '🗺️', v: `${states.length || 4} States`, l: 'Licensed In' },
              { emoji: '⚡', v: '24hr', l: 'Pre-Approvals' },
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
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-2xl">🏠</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">How I Can Help You</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              Whether you&apos;re buying your first home or your fifth investment property, I have a loan for you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {lo.loanProducts.map((product) => (
              <div key={product.id}
                className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition group border-2 border-transparent hover:border-amber-200">
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:bg-amber-500 group-hover:scale-110 transition">
                  🏠
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Me */}
      <section className="py-20 px-6 bg-gradient-to-br from-amber-500 to-orange-500 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-3">Why families choose {firstName}</h2>
            <p className="text-amber-100 mb-8">I&apos;m not a big bank or a call center. I&apos;m a real person who picks up the phone.</p>
            <ul className="space-y-4">
              {lo.differentiators.map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
                  <span className="text-xl flex-shrink-0">✅</span>
                  <span className="text-amber-50 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-3xl p-10 text-gray-900 shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Ready to get started? 🚀</h3>
            <p className="text-gray-500 mb-6 text-sm">Fill out this quick form and I&apos;ll reach out within a few hours.</p>
            <div className="space-y-4">
              <input type="text" placeholder="Your Name 👤" className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-amber-400 outline-none transition text-sm" />
              <input type="tel" placeholder="Your Phone 📱" className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-amber-400 outline-none transition text-sm" />
              <select className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-amber-400 outline-none transition text-sm bg-white text-gray-500">
                <option>What are you looking for?</option>
                <option>Buy a Home 🏡</option>
                <option>Refinance 💰</option>
                <option>Investment Property 📈</option>
              </select>
              <button className="w-full py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-400 transition shadow-lg text-lg">
                Yes, Let&apos;s Talk! 🎉
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-3xl">🗺️</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">The Journey to Your New Home</h2>
            <p className="text-gray-500 mt-3">Simple steps, no surprises.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { emoji: '☕', n: 1, t: 'Chat With Me', d: 'A friendly, no-pressure conversation about your goals.' },
              { emoji: '📋', n: 2, t: 'Quick Application', d: 'Takes about 15 minutes. I\'ll walk you through it.' },
              { emoji: '🎉', n: 3, t: 'Pre-Approved!', d: 'Get your letter fast — often the same day.' },
              { emoji: '🏡', n: 4, t: 'Get the Keys', d: 'Close on your dream home. I\'ll be there every step.' },
            ].map((step) => (
              <div key={step.n} className="text-center bg-amber-50 rounded-3xl p-8">
                <div className="text-4xl mb-4">{step.emoji}</div>
                <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3 text-sm">
                  {step.n}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.t}</h3>
                <p className="text-gray-500 text-sm">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rates */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-3xl">📊</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-3">Today&apos;s Rates</h2>
          <p className="text-gray-500 mb-10">Remember: your actual rate depends on your credit and situation. Let me get you a real quote!</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { l: '30-Yr Fixed', r: '6.875%' },
              { l: '15-Yr Fixed', r: '6.125%' },
              { l: 'FHA 30-Yr', r: '6.500%' },
              { l: 'VA 30-Yr', r: '6.250%' },
            ].map((rate) => (
              <div key={rate.l} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-gray-400 text-xs font-semibold mb-2">{rate.l}</div>
                <div className="text-3xl font-bold text-amber-600">{rate.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-3xl">💬</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Real Stories From Real People</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {lo.testimonials.map((t) => (
              <div key={t.id} className="bg-amber-50 rounded-3xl p-8 border-2 border-amber-100">
                <div className="flex gap-1 mb-4 text-xl">
                  {[...Array(t.rating)].map((_, j) => <span key={j}>⭐</span>)}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.author}</p>
                    {t.date && <p className="text-gray-400 text-xs">{t.date}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 bg-amber-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-amber-200 rounded-3xl rotate-2 opacity-50" />
            <Image src={lo.photo} alt={lo.name} width={420} height={500}
              className="relative z-10 rounded-3xl shadow-2xl object-cover w-full" />
          </div>
          <div>
            <span className="text-3xl">👋</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-2">A Little About Me</h2>
            <p className="text-amber-600 font-semibold mb-6">{lo.title} · NMLS# {lo.nmls}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{lo.bio}</p>
            <div className="flex flex-wrap gap-2">
              {states.map(s => (
                <span key={s} className="px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">{s}</span>
              ))}
            </div>
            {lo.company && <p className="text-gray-400 text-sm mt-4">{lo.company}</p>}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-amber-500 to-orange-500">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-4xl">🏠</span>
          <h2 className="text-4xl font-bold text-white mt-4 mb-3">Let&apos;s Make It Happen!</h2>
          <p className="text-amber-100 mb-10">Drop me a line and I&apos;ll get back to you super fast — usually within a couple hours.</p>
          <div className="bg-white rounded-3xl p-10 text-left shadow-2xl">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name 😊" className="px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-amber-400 outline-none transition text-sm w-full" />
              <input type="tel" placeholder="Your Phone 📱" className="px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-amber-400 outline-none transition text-sm w-full" />
              <input type="email" placeholder="Your Email 📧" className="px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-amber-400 outline-none transition text-sm w-full" />
              <select className="px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-amber-400 outline-none transition text-sm bg-white text-gray-500 w-full">
                <option>What&apos;s the goal? 🎯</option>
                <option>Buy a Home 🏡</option>
                <option>Refinance 💰</option>
                <option>Investment 📈</option>
              </select>
            </div>
            <button className="mt-6 w-full py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-400 transition text-lg shadow-lg">
              Send It! 🚀
            </button>
            <p className="text-xs text-gray-400 text-center mt-4">
              {lo.company} · NMLS# {lo.nmls} · I&apos;ll never share your info.
            </p>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-3xl">📖</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Helpful Tips & Guides</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-amber-50 rounded-3xl overflow-hidden group hover:shadow-xl transition border-2 border-transparent hover:border-amber-200">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-amber-600 text-xs font-semibold mb-2">
                    📅 {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use This Template */}
      <section className="py-16 bg-amber-50 text-center border-t-2 border-amber-100">
        <span className="text-4xl">✨</span>
        <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-3">Love this website?</h2>
        <p className="text-gray-500 mb-8">You can have one just like it — powered by LoanGraphs. Free to start!</p>
        <a
          href="https://loangraphs.com/signup"
          className="inline-block px-10 py-4 bg-amber-500 text-white font-bold rounded-full hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-200 transition text-lg"
        >
          Use This Template Free 🎉
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-bold text-white mb-1">{lo.name}</div>
            <div className="text-sm">{lo.title}</div>
            {lo.company && <div className="text-sm">{lo.company}</div>}
          </div>
          <div className="text-sm space-y-1">
            <div>📞 {lo.phone}</div>
            <div>📧 {lo.email}</div>
          </div>
          <div className="text-sm">
            <div>NMLS# {lo.nmls}</div>
            {states.length > 0 && <div>{states.join(', ')}</div>}
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs">
          &copy; {new Date().getFullYear()} {lo.name}. Equal Housing Lender. Not a commitment to lend.
        </div>
      </footer>
    </div>
  )
}
