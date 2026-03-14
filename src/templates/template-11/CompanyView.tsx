'use client'

import { useEffect, useRef } from 'react'
import type { TemplateProps } from '../types'

/**
 * Template 11 — "Liquid Glass" — Company/Brokerage View
 * Same glass morphism design as LOView but adapted for company/broker pitch.
 */

const keyframes = `
@keyframes blob1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-50px) scale(1.1)}66%{transform:translate(-20px,20px) scale(0.9)}}
@keyframes blob2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-40px,30px) scale(1.05)}66%{transform:translate(20px,-20px) scale(0.95)}}
@keyframes blob3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(25px,35px) scale(1.08)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes orbit-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes orbit-counter{0%{transform:rotate(0deg)}100%{transform:rotate(-360deg)}}
@keyframes pulse-glow{0%,100%{box-shadow:0 0 20px rgba(99,102,241,0.15)}50%{box-shadow:0 0 40px rgba(99,102,241,0.35)}}
@keyframes bar-grow{0%{transform:scaleY(0)}100%{transform:scaleY(1)}}
@keyframes node-breathe{0%,100%{transform:scale(1);opacity:0.7}50%{transform:scale(1.15);opacity:1}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
`

const glassPanel = 'backdrop-blur-xl bg-white/70 border border-white/60 shadow-[0_20px_80px_rgba(15,23,42,0.06)]'

export function CompanyView({ company, loanOfficer: lo }: TemplateProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = timelineRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).style.opacity = '1'
            ;(e.target as HTMLElement).style.transform = 'translateY(0)'
            ;(e.target as HTMLElement).style.filter = 'blur(0)'
          }
        })
      },
      { threshold: 0.15 },
    )
    el.querySelectorAll('[data-timeline-card]').forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  const companyName = company?.name || 'Apex Lending Group'
  const companyPhone = company?.phone || '(713) 555-0200'
  const companyEmail = company?.email || 'info@apexlending.com'
  const loNmls = lo.nmls || '987654'

  const lenders = [
    'UWM', 'Rocket Pro TPO', 'loanDepot Wholesale', 'PennyMac', 'NewRez',
    'AmeriHome', 'Flagstar', 'Caliber Home Loans', 'Guaranteed Rate Affinity', 'Planet Home Lending',
  ]

  return (
    <div className="min-h-screen relative" style={{ background: '#f0f4ff' }}>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      {/* ─── Background blobs ─── */}
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: '#f0f4ff' }}>
        <div style={{ position: 'absolute', width: '800px', height: '800px', top: '-10%', left: '-10%', background: 'radial-gradient(circle at 20% 20%, rgba(147,197,253,0.4) 0%, transparent 60%)', animation: 'blob1 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: '700px', height: '700px', top: '30%', right: '-5%', background: 'radial-gradient(circle at 80% 60%, rgba(196,181,253,0.3) 0%, transparent 60%)', animation: 'blob2 12s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: '600px', height: '600px', bottom: '-5%', left: '30%', background: 'radial-gradient(circle at 50% 80%, rgba(167,243,208,0.25) 0%, transparent 50%)', animation: 'blob3 10s ease-in-out infinite' }} />
      </div>

      {/* ─── Navbar ─── */}
      <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-sm rounded-full px-6 py-2 max-w-6xl w-full flex items-center justify-between">
          <span className="font-medium tracking-tight text-slate-800 text-sm uppercase">{companyName}</span>
          <div className="hidden md:flex items-center gap-8">
            {['Products', 'Services', 'Team', 'Contact'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-xs font-medium text-slate-500 uppercase tracking-wider hover:text-slate-900 transition-colors">{l}</a>
            ))}
          </div>
          <a href={`mailto:${companyEmail}`} className="bg-slate-900 text-white text-xs uppercase tracking-widest rounded-full px-6 py-2.5 hover:bg-slate-800 transition-colors">
            Partner With Us
          </a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="min-h-screen flex items-center pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-xs text-slate-400 tracking-widest uppercase mb-6">
                NMLS# {loNmls} · Wholesale Mortgage Brokerage
              </p>
              <h1 className="font-semibold tracking-tight text-slate-900 mb-6" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1.05 }}>
                Close More Deals.<br />Grow Your Book.
              </h1>
              <p className="text-lg text-slate-500 font-light max-w-lg mb-8 leading-relaxed">
                {companyName} provides your team with 40+ wholesale lender channels, AI rate matching, and streamlined ops to close faster and earn more.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={`mailto:${companyEmail}`} className="relative inline-flex items-center bg-slate-900 text-white text-sm uppercase tracking-widest rounded-full px-8 py-3.5 hover:bg-slate-800 transition-colors overflow-hidden"
                  style={{ backgroundImage: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.15) 50%, transparent 75%)', backgroundSize: '200% 100%', animation: 'shimmer 3s ease-in-out infinite' }}>
                  Partner With Us
                </a>
                <a href="#demo" className="inline-flex items-center border border-slate-300 text-slate-600 text-sm uppercase tracking-widest rounded-full px-8 py-3.5 hover:border-slate-400 hover:text-slate-900 transition-colors">
                  Schedule a Demo
                </a>
              </div>
            </div>

            {/* Floating phone — team metrics */}
            <div className="flex justify-center" style={{ animation: 'float 6s ease-in-out infinite' }}>
              <div className="relative" style={{ width: '320px' }}>
                <div className="relative rounded-[3.9rem] overflow-hidden" style={{ backgroundColor: '#e2e8f0', padding: '12px', boxShadow: '25px 35px 65px rgba(15,23,42,0.15)' }}>
                  <div style={{ position: 'absolute', left: '-3px', top: '120px', width: '3px', height: '30px', backgroundColor: '#cbd5e1', borderRadius: '2px' }} />
                  <div style={{ position: 'absolute', left: '-3px', top: '170px', width: '3px', height: '55px', backgroundColor: '#cbd5e1', borderRadius: '2px' }} />
                  <div style={{ position: 'absolute', left: '-3px', top: '240px', width: '3px', height: '55px', backgroundColor: '#cbd5e1', borderRadius: '2px' }} />
                  <div style={{ position: 'absolute', right: '-3px', top: '190px', width: '3px', height: '70px', backgroundColor: '#cbd5e1', borderRadius: '2px' }} />

                  <div className="rounded-[3.2rem] overflow-hidden bg-white" style={{ minHeight: '580px' }}>
                    <div className="flex justify-center pt-3 pb-2">
                      <div className="bg-[#0f172a] rounded-full" style={{ width: '120px', height: '34px' }} />
                    </div>
                    <div className="flex justify-between items-center px-8 py-1 text-xs text-slate-500">
                      <span className="font-semibold text-slate-800">9:41</span>
                      <div className="flex items-center gap-1.5">
                        <div style={{ width: '22px', height: '10px', border: '1.5px solid #0f172a', borderRadius: '3px', padding: '1px' }}>
                          <div style={{ width: '70%', height: '100%', backgroundColor: '#0f172a', borderRadius: '1px' }} />
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pt-4 pb-6">
                      <p className="text-lg font-semibold text-slate-800 mb-0.5">Team Dashboard</p>
                      <p className="text-xs text-slate-400 mb-4">Performance overview</p>

                      <div className="bg-slate-50 rounded-2xl p-4 mb-3">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Loans Closed This Month</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-slate-800">47</span>
                          <span className="text-xs text-emerald-500 font-medium">↑ 12%</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 mb-3">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Team Conversion Rate</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-slate-800">68%</span>
                          <span className="text-xs text-emerald-500 font-medium">↑ 4%</span>
                        </div>
                        <div className="mt-2 w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-900 rounded-full" style={{ width: '68%' }} />
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" style={{ animation: 'node-breathe 2s ease-in-out infinite' }} />
                            <p className="text-sm font-semibold text-slate-700">Pipeline Active</p>
                          </div>
                          <span className="text-sm font-bold text-slate-800">$14.2M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Lender Marquee ─── */}
      <section className="py-16 overflow-hidden">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-slate-400 mb-10">Approved by 40+ Wholesale Lenders</p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f0f4ff] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f0f4ff] to-transparent z-10" />
          <div className="flex" style={{ animation: 'marquee 30s linear infinite' }}>
            {[...lenders, ...lenders].map((name, i) => (
              <div key={i} className="flex-shrink-0 px-8 flex items-center gap-2 opacity-60 hover:opacity-100 hover:text-slate-800 transition-opacity text-slate-500">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" opacity="0.5"><rect width="20" height="20" rx="4" /></svg>
                <span className="text-sm font-medium whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bento Grid ─── */}
      <section id="products" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${glassPanel} rounded-3xl p-10 md:col-span-2`}>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><path d="M3 20h18M5 20V10l3-4 3 6 3-8 3 4v12" /></svg>
              </div>
              <h3 className="text-3xl font-medium text-slate-900 mb-3">AI Rate Engine</h3>
              <p className="text-slate-500 font-light leading-relaxed mb-8">Compare rates across every lender in your panel in seconds. Your team quotes faster and wins more deals.</p>
              <div className="bg-white/50 border border-white/60 rounded-2xl p-6">
                <div className="flex items-end gap-3" style={{ height: '80px' }}>
                  {[{ l: 'UWM', r: '6.50%', h: 65 }, { l: 'Rocket', r: '6.75%', h: 75 }, { l: 'PennyMac', r: '6.25%', h: 55, best: true }, { l: 'NewRez', r: '7.00%', h: 85 }].map((b) => (
                    <div key={b.l} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[9px] text-slate-400">{b.r}</span>
                      <div className="w-full rounded-t" style={{ height: `${b.h}%`, backgroundColor: b.best ? '#22c55e' : '#cbd5e1' }} />
                      <span className="text-[9px] text-slate-500">{b.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${glassPanel} rounded-3xl p-10`}>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
              </div>
              <h3 className="text-2xl font-medium text-slate-900 mb-3">Team Management</h3>
              <p className="text-slate-500 font-light leading-relaxed mb-8">Onboard LOs, track performance, and manage pipelines from one dashboard.</p>
              <div className="space-y-2">
                {['Sarah K. — 12 closed', 'Mike J. — 9 closed', 'Lisa R. — 15 closed'].map((lo) => (
                  <div key={lo} className="bg-white/50 border border-white/60 rounded-xl px-4 py-2.5 text-xs text-slate-600 font-medium">{lo}</div>
                ))}
              </div>
            </div>

            <div className={`${glassPanel} rounded-3xl p-10`}>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <h3 className="text-2xl font-medium text-slate-900 mb-3">Broker Tools</h3>
              <p className="text-slate-500 font-light leading-relaxed mb-8">Compliance, disclosures, and licensing handled automatically.</p>
              <div className="space-y-3">
                {[{ l: 'Auto-Disclosures', on: true }, { l: 'Team Alerts', on: true }].map((t) => (
                  <div key={t.l} className="flex justify-between items-center bg-white/50 border border-white/60 rounded-xl px-4 py-3">
                    <span className="text-xs font-medium text-slate-600">{t.l}</span>
                    <div className={`w-10 h-6 rounded-full flex items-center px-0.5 ${t.on ? 'bg-slate-900' : 'bg-slate-300'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm ${t.on ? 'ml-auto' : ''}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${glassPanel} rounded-3xl p-10 md:col-span-2`}>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" /></svg>
              </div>
              <h3 className="text-3xl font-medium text-slate-900 mb-3">Multi-State Operations</h3>
              <p className="text-slate-500 font-light leading-relaxed mb-8">Run your brokerage across multiple states with centralized licensing and compliance.</p>
              <div className="flex flex-wrap gap-2">
                {['TX', 'CA', 'FL', 'AZ', 'CO', 'GA', 'NC', 'TN', 'VA', 'OH', 'IL', 'WA'].map((st) => (
                  <span key={st} className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100">{st}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section className="py-24" ref={timelineRef}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-900 mb-4">Partner Onboarding.<br />In Days, Not Months.</h2>
            <p className="text-slate-500 font-light text-lg max-w-xl mx-auto">Our streamlined partner integration gets your team producing fast.</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block" style={{ background: 'rgba(226,232,240,0.35)' }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative">
              <div className="hidden md:block" />
              <div className="absolute left-1/2 top-8 -translate-x-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm z-10 hidden md:flex" style={{ animation: 'node-breathe 3s ease-in-out infinite' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
              </div>
              <div data-timeline-card className="bg-white rounded-2xl p-8 md:p-10 border border-slate-100/80" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03), 0 12px 40px rgba(0,0,0,0.04)', opacity: 0, transform: 'translateY(14px)', filter: 'blur(6px)', transition: 'all 0.7s ease-out' }}>
                <span className="text-xs text-slate-400 uppercase tracking-widest">Phase 01</span>
                <h3 className="text-xl font-medium text-slate-900 mt-2 mb-3">Discovery &amp; Agreement</h3>
                <p className="text-slate-500 font-light leading-relaxed">We learn your team structure, lender panel, and growth goals. Partnership agreement signed within 48 hours.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative">
              <div data-timeline-card className="bg-white rounded-2xl p-8 md:p-10 border border-slate-100/80" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03), 0 12px 40px rgba(0,0,0,0.04)', opacity: 0, transform: 'translateY(14px)', filter: 'blur(6px)', transition: 'all 0.7s ease-out' }}>
                <span className="text-xs text-slate-400 uppercase tracking-widest">Phase 02</span>
                <h3 className="text-xl font-medium text-slate-900 mt-2 mb-3">Platform Setup</h3>
                <p className="text-slate-500 font-light leading-relaxed">Your team gets access to the full LoanGraphs dashboard, lender integrations, and AI rate engine.</p>
              </div>
              <div className="absolute left-1/2 top-8 -translate-x-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm z-10 hidden md:flex" style={{ animation: 'node-breathe 3s ease-in-out infinite 0.5s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6M9 13h4" /></svg>
              </div>
              <div className="hidden md:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              <div className="hidden md:block" />
              <div className="absolute left-1/2 top-8 -translate-x-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm z-10 hidden md:flex" style={{ animation: 'node-breathe 3s ease-in-out infinite 1s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
              </div>
              <div data-timeline-card className="bg-white rounded-2xl p-8 md:p-10 border border-slate-100/80" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03), 0 12px 40px rgba(0,0,0,0.04)', opacity: 0, transform: 'translateY(14px)', filter: 'blur(6px)', transition: 'all 0.7s ease-out' }}>
                <span className="text-xs text-slate-400 uppercase tracking-widest">Phase 03</span>
                <h3 className="text-xl font-medium text-slate-900 mt-2 mb-3">Launch &amp; Scale</h3>
                <p className="text-slate-500 font-light leading-relaxed">Go live within a week. Dedicated support, training, and ongoing optimization for your entire team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Integrations Orbit ─── */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-900 mb-4">Integrates With Your Entire Workflow</h2>
          <p className="text-slate-500 font-light text-lg mb-20">LoanGraphs connects with the tools your team already uses.</p>
          <div className="relative mx-auto" style={{ width: '420px', height: '420px' }}>
            <div className="absolute inset-8 rounded-full border border-slate-200/30" />
            <div className="absolute inset-16 rounded-full border border-slate-200/20" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center z-20" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
              <span className="text-white font-bold text-lg tracking-tight">LG</span>
            </div>
            <div className="absolute inset-0" style={{ animation: 'orbit-spin 28s linear infinite' }}>
              {[
                { pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2', title: 'Point of Sale', sub: 'Encompass · Byte · Maxwell' },
                { pos: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2', title: 'CRM', sub: 'Salesforce · HubSpot · Velocify' },
                { pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2', title: 'Document Storage', sub: 'DocuSign · Dropbox · Drive' },
                { pos: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2', title: 'Communication', sub: 'Outlook · Gmail · Calendly' },
              ].map((card) => (
                <div key={card.title} className={`absolute ${card.pos} bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-sm`} style={{ animation: 'orbit-counter 28s linear infinite', width: '160px' }}>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-2 mx-auto"><div className="w-3 h-3 rounded-full bg-slate-400" /></div>
                  <p className="text-xs font-semibold text-slate-800 text-center">{card.title}</p>
                  <p className="text-[10px] text-slate-400 text-center mt-0.5">{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Platform Scatter Gallery ─── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-900 mb-4">Everything You Need. One Dashboard.</h2>
          <p className="text-slate-500 font-light text-lg mb-20">Explore the tools inside your team&apos;s LoanGraphs account.</p>
          <div className="relative group mx-auto" style={{ width: '100%', maxWidth: '700px', height: '500px' }}>
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${glassPanel} rounded-3xl p-10 w-72 text-center transition-transform duration-700 group-hover:scale-105 z-20`}>
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Team Pipeline</h3>
              <p className="text-sm text-slate-500 font-light">Full view of every LO&apos;s active loans, rates, and client status.</p>
            </div>
            {[
              { title: 'Rate Engine', desc: 'Real-time rate comparison across 40+ lenders', pos: 'top-0 left-0', hover: 'group-hover:-translate-x-4 group-hover:-translate-y-4' },
              { title: 'Lead Routing', desc: 'Auto-assign leads to the right LO', pos: 'top-0 right-0', hover: 'group-hover:translate-x-4 group-hover:-translate-y-4' },
              { title: 'Analytics', desc: 'Team performance, volume, and conversion', pos: 'bottom-0 left-0', hover: 'group-hover:-translate-x-4 group-hover:translate-y-4' },
              { title: 'Compliance', desc: 'Licensing, disclosures, and audit trails', pos: 'bottom-0 right-0', hover: 'group-hover:translate-x-4 group-hover:translate-y-4' },
            ].map((card) => (
              <div key={card.title} className={`absolute ${card.pos} ${card.hover} ${glassPanel} rounded-2xl p-6 w-48 text-left transition-all duration-700 z-10`}>
                <h4 className="text-sm font-medium text-slate-800 mb-1">{card.title}</h4>
                <p className="text-[11px] text-slate-400 font-light leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Giant Text Marquee ─── */}
      <section className="py-24 border-y border-white/30 bg-white/5 overflow-hidden">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f0f4ff] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f0f4ff] to-transparent z-10" />
          <div className="flex whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite', fontSize: '8rem', fontWeight: 700, opacity: 0.05, lineHeight: 1 }}>
            <span className="px-8">CLOSE MORE DEALS</span><span className="px-8">·</span>
            <span className="px-8">GROW YOUR TEAM</span><span className="px-8">·</span>
            <span className="px-8">SCALE YOUR BROKERAGE</span><span className="px-8">·</span>
            <span className="px-8">WIN EVERY DAY</span><span className="px-8">·</span>
            <span className="px-8">CLOSE MORE DEALS</span><span className="px-8">·</span>
            <span className="px-8">GROW YOUR TEAM</span><span className="px-8">·</span>
            <span className="px-8">SCALE YOUR BROKERAGE</span><span className="px-8">·</span>
            <span className="px-8">WIN EVERY DAY</span><span className="px-8">·</span>
          </div>
        </div>
      </section>

      {/* ─── Three Pillars ─── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-900 mb-4">Built for Modern Brokerages</h2>
            <p className="text-slate-500 font-light text-lg">Everything your team needs to compete and win.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${glassPanel} rounded-[2.5rem] p-10 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-700`} style={{ minHeight: '600px' }}>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-3">Team Intelligence</h3>
                <p className="text-slate-500 font-light leading-relaxed">See every LO, loan, and lead in one place. Real-time visibility across your entire operation.</p>
              </div>
              <div className="bg-white/50 border border-white/60 rounded-2xl mt-12 p-8 shadow-inner aspect-[4/3] flex flex-col items-center justify-center">
                <div className="relative w-full h-24 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-slate-900 z-10" style={{ animation: 'node-breathe 2s ease-in-out infinite' }} />
                  <div className="absolute w-3 h-3 rounded-full bg-slate-300 border border-slate-200" style={{ top: '10%', left: '20%' }} />
                  <div className="absolute w-3 h-3 rounded-full bg-slate-300 border border-slate-200" style={{ top: '15%', right: '25%' }} />
                  <div className="absolute w-3 h-3 rounded-full bg-slate-300 border border-slate-200" style={{ bottom: '10%', left: '30%' }} />
                  <div className="absolute w-3 h-3 rounded-full bg-slate-300 border border-slate-200" style={{ bottom: '15%', right: '20%' }} />
                  <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                    <line x1="50%" y1="50%" x2="20%" y2="10%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="50%" y1="50%" x2="75%" y2="15%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="50%" y1="50%" x2="30%" y2="90%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="50%" y1="50%" x2="80%" y2="85%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
                  </svg>
                </div>
                <div className="flex gap-3 mt-4">
                  <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">Active LOs: 12</span>
                  <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">Pipeline: $14.2M</span>
                </div>
              </div>
            </div>

            <div className={`${glassPanel} rounded-[2.5rem] p-10 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-700`} style={{ minHeight: '600px' }}>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-3">Speed &amp; Scale</h3>
                <p className="text-slate-500 font-light leading-relaxed">AI-powered rate matching and automated workflows let your team close faster at higher volume.</p>
              </div>
              <div className="bg-white/50 border border-white/60 rounded-2xl mt-12 p-8 shadow-inner aspect-[4/3] flex flex-col items-center justify-center">
                <div className="w-full h-2 bg-slate-200 rounded-full mb-8 overflow-hidden"><div className="h-full bg-slate-900/80 rounded-full" style={{ width: '33%' }} /></div>
                <div className="relative flex items-center justify-between w-full">
                  <div className="absolute top-1/2 left-[10%] right-[10%] h-px bg-slate-200 -translate-y-1/2" />
                  <div className="flex flex-col items-center z-10"><div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center"><div className="w-3 h-3 rounded-full bg-slate-300" /></div><span className="text-[9px] text-slate-400 mt-2">Submitted</span></div>
                  <div className="flex flex-col items-center z-10"><div className="w-10 h-10 rounded-full bg-slate-900 shadow-lg ring-4 ring-white/60 flex items-center justify-center scale-110"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></div><span className="text-[9px] text-slate-800 font-semibold mt-2">Processing</span></div>
                  <div className="flex flex-col items-center z-10"><div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center"><div className="w-3 h-3 rounded-full bg-slate-200" /></div><span className="text-[9px] text-slate-400 mt-2">Funded</span></div>
                </div>
              </div>
            </div>

            <div className={`${glassPanel} rounded-[2.5rem] p-10 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-700`} style={{ minHeight: '600px' }}>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-3">Compliance Ready</h3>
                <p className="text-slate-500 font-light leading-relaxed">NMLS, Equal Housing, state licensing — all built in. Audit-ready at all times.</p>
              </div>
              <div className="bg-white/50 border border-white/60 rounded-2xl mt-12 shadow-inner aspect-[4/3] flex items-center justify-center overflow-hidden">
                <div className="relative w-28 h-20">
                  <div className="absolute inset-0 bg-white/40 border border-white/60 rounded-xl shadow-sm transition-transform duration-700" style={{ transform: 'rotate(-12deg) translateY(8px) translateX(8px)', zIndex: 10 }} />
                  <div className="absolute inset-0 bg-white/60 border border-white/60 rounded-xl shadow-md transition-transform duration-700 group-hover:rotate-[10deg] group-hover:-translate-y-4" style={{ transform: 'rotate(6deg) translateX(-16px) translateY(-8px)', zIndex: 20 }}>
                    <div className="p-2"><div className="w-8 h-1 bg-slate-300 rounded mb-1" /><div className="w-12 h-1 bg-slate-200 rounded mb-1" /><div className="w-6 h-1 bg-slate-200 rounded" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials (B2B) ─── */}
      <section id="reviews" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-200 bg-white/70 text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-6">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-900">Trusted by Partners</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              { quote: `${companyName} transformed how our agents refer mortgages. Clients close faster and our referral pipeline has never been stronger.`, name: 'Jennifer L.', loc: 'RE/MAX Broker, Dallas TX', initial: 'J' },
              { quote: 'The AI rate engine alone saves our LOs 3 hours per deal. We went from 30 to 47 closings per month within 90 days.', name: 'David K.', loc: 'Branch Manager, Houston TX', initial: 'D' },
              { quote: 'Compliance used to keep me up at night. Now everything is automated — disclosures, licensing, audits. Total game changer.', name: 'Rachel M.', loc: 'VP Operations, Phoenix AZ', initial: 'R' },
            ].map((t) => (
              <div key={t.name} className={`${glassPanel} p-8 rounded-[2rem] border border-white/60 hover:-translate-y-1 transition-all duration-500 min-h-[320px] flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>))}</div>
                    <span className="text-[11px] uppercase tracking-widest text-slate-400">5.0 Rating</span>
                  </div>
                  <p className="text-slate-700 text-[17px] leading-8 font-light mb-10">&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-600">{t.initial}</div>
                  <div><p className="text-sm font-medium text-slate-800">{t.name}</p><p className="text-xs text-slate-400">{t.loc}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="contact" className="h-[60vh] flex flex-col items-center justify-center relative">
        <div className="absolute w-64 h-64 rounded-full bg-blue-400/20 blur-[100px]" />
        <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-slate-900 text-center mb-6 relative z-10">Stop reacting.<br />Start scaling.</h2>
        <p className="text-slate-500 font-light text-lg text-center max-w-lg mb-10 relative z-10">Join brokerages that close more deals, retain more LOs, and grow faster with LoanGraphs.</p>
        <div className="flex flex-wrap gap-4 relative z-10">
          <a href={`mailto:${companyEmail}`} className="bg-slate-900 text-white text-sm uppercase tracking-widest rounded-full px-10 py-4 hover:bg-slate-800 transition-colors">Partner With Us</a>
          <a href="#demo" className="border border-slate-300 text-slate-600 text-sm uppercase tracking-widest rounded-full px-10 py-4 hover:border-slate-400 hover:text-slate-900 transition-colors">Schedule a Demo</a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            <div className="md:col-span-4">
              <p className="font-semibold text-slate-900 text-lg mb-1">{companyName}</p>
              <p className="text-xs text-slate-400 mb-4">NMLS# {loNmls}</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed mb-6">Wholesale mortgage brokerage empowering loan officers with technology, rates, and support.</p>
              <div className="flex items-center gap-2 text-slate-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L2 10h3v9h14v-9h3L12 3zm0 2.5L18 10v8H6v-8l6-4.5z" /><rect x="8" y="13" width="3" height="4" /><rect x="13" y="13" width="3" height="4" /></svg>
                <span className="text-xs">Equal Housing Lender</span>
              </div>
            </div>
            <div className="md:col-start-7 md:col-span-6">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-800 mb-4">Services</p>
                  {['Wholesale Lending', 'Broker Tools', 'Rate Engine', 'Compliance', 'Training'].map((l) => (<a key={l} href="#" className="block text-sm text-slate-400 hover:text-slate-700 transition-colors mb-2">{l}</a>))}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-800 mb-4">Resources</p>
                  {['Partner Portal', 'API Docs', 'Webinars', 'FAQ'].map((l) => (<a key={l} href="#" className="block text-sm text-slate-400 hover:text-slate-700 transition-colors mb-2">{l}</a>))}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-800 mb-4">Company</p>
                  {['About', 'Careers', 'Contact', 'NMLS Consumer Access'].map((l) => (<a key={l} href="#" className="block text-sm text-slate-400 hover:text-slate-700 transition-colors mb-2">{l}</a>))}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 font-light text-center md:text-left">
              NMLS# {loNmls} | Broker License | © {new Date().getFullYear()} {companyName}. All rights reserved. | This is not a commitment to lend.
            </p>
            <div className="flex items-center gap-4">
              <a href={`tel:${companyPhone.replace(/\D/g, '')}`} className="text-slate-400 hover:text-slate-700 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              </a>
              <a href={`mailto:${companyEmail}`} className="text-slate-400 hover:text-slate-700 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-700 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M13 10l5-5M18 5h-4M18 5v4" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
