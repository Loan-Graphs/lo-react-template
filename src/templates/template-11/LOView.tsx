'use client'

import { useEffect, useRef } from 'react'
import type { TemplateProps } from '../types'

/**
 * Template 11 — "Liquid Glass"
 * Glass morphism throughout, animated liquid/mesh gradient background,
 * floating iOS phone mockup, glass pill navbar, bento grid feature cards,
 * integrations orbit, platform scatter, timeline, giant marquee, three pillars.
 */

/* ────────────────────────────────────────────────────────────
   CSS keyframes injected via <style> tag
   ──────────────────────────────────────────────────────────── */
const keyframes = `
@keyframes blob1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-50px) scale(1.1)}66%{transform:translate(-20px,20px) scale(0.9)}}
@keyframes blob2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-40px,30px) scale(1.05)}66%{transform:translate(20px,-20px) scale(0.95)}}
@keyframes blob3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(25px,35px) scale(1.08)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes marquee-reverse{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
@keyframes orbit-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes orbit-counter{0%{transform:rotate(0deg)}100%{transform:rotate(-360deg)}}
@keyframes pulse-glow{0%,100%{box-shadow:0 0 20px rgba(99,102,241,0.15)}50%{box-shadow:0 0 40px rgba(99,102,241,0.35)}}
@keyframes progress-ring{0%{stroke-dashoffset:251}100%{stroke-dashoffset:15}}
@keyframes bar-grow{0%{transform:scaleY(0)}100%{transform:scaleY(1)}}
@keyframes node-breathe{0%,100%{transform:scale(1);opacity:0.7}50%{transform:scale(1.15);opacity:1}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
`

/* ─── Glass utility ─── */
const glassPanel = 'backdrop-blur-xl bg-white/70 border border-white/60 shadow-[0_20px_80px_rgba(15,23,42,0.06)]'

export function LOView({ loanOfficer: lo }: TemplateProps) {
  /* ── IntersectionObserver for timeline scroll-in ── */
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

  const loName = lo.name || 'John Martinez'
  const loNmls = lo.nmls || '123456'
  const loPhone = lo.phone || '(713) 555-0100'
  const loEmail = lo.email || 'john@example.com'
  const loStates = lo.licensedStates?.length ? lo.licensedStates.join(', ') : 'TX, CA, FL'

  const lenders = [
    'UWM', 'Rocket Pro TPO', 'loanDepot Wholesale', 'PennyMac', 'NewRez',
    'AmeriHome', 'Flagstar', 'Caliber Home Loans', 'Guaranteed Rate Affinity', 'Planet Home Lending',
  ]

  return (
    <div className="min-h-screen relative" style={{ background: '#f0f4ff' }}>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      {/* ═══════════════════════════════════════════
          ANIMATED BACKGROUND BLOBS
          ═══════════════════════════════════════════ */}
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: '#f0f4ff' }}>
        <div
          style={{
            position: 'absolute', width: '800px', height: '800px', top: '-10%', left: '-10%',
            background: 'radial-gradient(circle at 20% 20%, rgba(147,197,253,0.4) 0%, transparent 60%)',
            animation: 'blob1 8s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute', width: '700px', height: '700px', top: '30%', right: '-5%',
            background: 'radial-gradient(circle at 80% 60%, rgba(196,181,253,0.3) 0%, transparent 60%)',
            animation: 'blob2 12s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute', width: '600px', height: '600px', bottom: '-5%', left: '30%',
            background: 'radial-gradient(circle at 50% 80%, rgba(167,243,208,0.25) 0%, transparent 50%)',
            animation: 'blob3 10s ease-in-out infinite',
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════
          1 · NAVBAR (glass pill, fixed)
          ═══════════════════════════════════════════ */}
      <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-sm rounded-full px-6 py-2 max-w-6xl w-full flex items-center justify-between">
          <span className="font-medium tracking-tight text-slate-800 text-sm uppercase">
            {loName}
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Products', 'Services', 'Reviews', 'Contact'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-xs font-medium text-slate-500 uppercase tracking-wider hover:text-slate-900 transition-colors">
                {l}
              </a>
            ))}
          </div>
          <a
            href={`mailto:${loEmail}`}
            className="bg-slate-900 text-white text-xs uppercase tracking-widest rounded-full px-6 py-2.5 hover:bg-slate-800 transition-colors"
          >
            Get Pre-Approved
          </a>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          2 · HERO (2-column, full-screen)
          ═══════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — text */}
            <div>
              <p className="text-xs text-slate-400 tracking-widest uppercase mb-6">
                NMLS# {loNmls} · Licensed in {loStates}
              </p>
              <h1
                className="font-semibold tracking-tight text-slate-900 mb-6"
                style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1.05 }}
              >
                Close Your<br />Dream Home.
              </h1>
              <p className="text-lg text-slate-500 font-light max-w-lg mb-8 leading-relaxed">
                Expert mortgage guidance, 40+ wholesale lenders, and pre-approvals in as little as 24 hours.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${loEmail}`}
                  className="relative inline-flex items-center bg-slate-900 text-white text-sm uppercase tracking-widest rounded-full px-8 py-3.5 hover:bg-slate-800 transition-colors overflow-hidden"
                  style={{
                    backgroundImage: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.15) 50%, transparent 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s ease-in-out infinite',
                  }}
                >
                  Get Pre-Approved
                </a>
                <a
                  href="#rates"
                  className="inline-flex items-center border border-slate-300 text-slate-600 text-sm uppercase tracking-widest rounded-full px-8 py-3.5 hover:border-slate-400 hover:text-slate-900 transition-colors"
                >
                  View Rates
                </a>
              </div>
            </div>

            {/* Right — floating phone mockup */}
            <div className="flex justify-center" style={{ animation: 'float 6s ease-in-out infinite' }}>
              <div className="relative" style={{ width: '320px' }}>
                {/* Phone body */}
                <div
                  className="relative rounded-[3.9rem] overflow-hidden"
                  style={{
                    backgroundColor: '#e2e8f0',
                    padding: '12px',
                    boxShadow: '25px 35px 65px rgba(15,23,42,0.15)',
                  }}
                >
                  {/* Side buttons — left */}
                  <div style={{ position: 'absolute', left: '-3px', top: '120px', width: '3px', height: '30px', backgroundColor: '#cbd5e1', borderRadius: '2px' }} />
                  <div style={{ position: 'absolute', left: '-3px', top: '170px', width: '3px', height: '55px', backgroundColor: '#cbd5e1', borderRadius: '2px' }} />
                  <div style={{ position: 'absolute', left: '-3px', top: '240px', width: '3px', height: '55px', backgroundColor: '#cbd5e1', borderRadius: '2px' }} />
                  {/* Side button — right */}
                  <div style={{ position: 'absolute', right: '-3px', top: '190px', width: '3px', height: '70px', backgroundColor: '#cbd5e1', borderRadius: '2px' }} />

                  {/* Screen */}
                  <div className="rounded-[3.2rem] overflow-hidden bg-white" style={{ minHeight: '580px' }}>
                    {/* Dynamic Island */}
                    <div className="flex justify-center pt-3 pb-2">
                      <div className="bg-[#0f172a] rounded-full" style={{ width: '120px', height: '34px' }} />
                    </div>

                    {/* Status bar */}
                    <div className="flex justify-between items-center px-8 py-1 text-xs text-slate-500">
                      <span className="font-semibold text-slate-800">9:41</span>
                      <div className="flex items-center gap-1.5">
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><rect x="0" y="8" width="3" height="4" rx="0.5" fill="#0f172a"/><rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="#0f172a"/><rect x="9" y="2" width="3" height="10" rx="0.5" fill="#0f172a"/><rect x="13" y="0" width="3" height="12" rx="0.5" fill="#0f172a" opacity="0.3"/></svg>
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 3C10.7 3 13.1 4.1 14.8 5.9L16 4.7C14 2.6 11.2 1.3 8 1.3S2 2.6 0 4.7L1.2 5.9C2.9 4.1 5.3 3 8 3Z" fill="#0f172a"/><circle cx="8" cy="10" r="1.5" fill="#0f172a"/></svg>
                        <div className="flex items-center">
                          <div style={{ width: '22px', height: '10px', border: '1.5px solid #0f172a', borderRadius: '3px', padding: '1px' }}>
                            <div style={{ width: '70%', height: '100%', backgroundColor: '#0f172a', borderRadius: '1px' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Screen content */}
                    <div className="px-5 pt-4 pb-6">
                      <p className="text-lg font-semibold text-slate-800 mb-0.5">My Loan</p>
                      <p className="text-xs text-slate-400 mb-4">All systems ready</p>

                      {/* Card 1 — Pre-Approval Score */}
                      <div className="bg-slate-50 rounded-2xl p-4 mb-3">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Pre-Approval Score</p>
                        <div className="flex items-center gap-4">
                          <div className="relative" style={{ width: '56px', height: '56px' }}>
                            <svg width="56" height="56" viewBox="0 0 56 56">
                              <circle cx="28" cy="28" r="24" stroke="#e2e8f0" strokeWidth="4" fill="none" />
                              <circle
                                cx="28" cy="28" r="24" stroke="#3b82f6" strokeWidth="4" fill="none"
                                strokeLinecap="round"
                                strokeDasharray="150.8"
                                strokeDashoffset="9"
                                transform="rotate(-90 28 28)"
                                style={{ animation: 'progress-ring 1.5s ease-out forwards' }}
                              />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-800">94</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-700">Excellent</p>
                            <p className="text-[10px] text-slate-400">Top 6% of applicants</p>
                          </div>
                        </div>
                      </div>

                      {/* Card 2 — Rate Chart */}
                      <div className="bg-slate-50 rounded-2xl p-4 mb-3">
                        <div className="flex justify-between items-baseline mb-3">
                          <p className="text-[10px] uppercase tracking-wider text-slate-400">Current Rate</p>
                          <p className="text-lg font-bold text-slate-800">6.875%</p>
                        </div>
                        <div className="flex items-end gap-1.5" style={{ height: '40px' }}>
                          {[65, 80, 55, 90, 72, 85, 60].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t transition-all hover:bg-blue-400"
                              style={{
                                height: `${h}%`,
                                backgroundColor: i === 3 ? '#3b82f6' : '#cbd5e1',
                                transformOrigin: 'bottom',
                                animation: `bar-grow 0.8s ease-out ${i * 0.1}s both`,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Card 3 — Loan Status */}
                      <div className="bg-slate-50 rounded-2xl p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" style={{ animation: 'node-breathe 2s ease-in-out infinite' }} />
                            <p className="text-sm font-semibold text-slate-700">Pre-Approved ✓</p>
                          </div>
                          {/* Toggle switch (on) */}
                          <div className="w-10 h-6 bg-slate-900 rounded-full flex items-center px-0.5">
                            <div className="w-5 h-5 bg-white rounded-full ml-auto shadow-sm" />
                          </div>
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

      {/* ═══════════════════════════════════════════
          3 · LENDER MARQUEE (scrolling logos)
          ═══════════════════════════════════════════ */}
      <section className="py-16 overflow-hidden">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-slate-400 mb-10">
          Approved by 40+ Wholesale Lenders
        </p>
        <div className="relative">
          {/* Fade masks */}
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

      {/* ═══════════════════════════════════════════
          4 · BENTO GRID (glass feature cards)
          ═══════════════════════════════════════════ */}
      <section id="products" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 — AI Rate Analysis (col-span-2) */}
            <div className={`${glassPanel} rounded-3xl p-10 md:col-span-2`}>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><path d="M3 20h18M5 20V10l3-4 3 6 3-8 3 4v12" /></svg>
              </div>
              <h3 className="text-3xl font-medium text-slate-900 mb-3">AI Rate Analysis</h3>
              <p className="text-slate-500 font-light leading-relaxed mb-8">
                Automatically compare rates across 40+ wholesale lenders to find your client the lowest available rate in real-time.
              </p>
              {/* Mini bar chart preview */}
              <div className="bg-white/50 border border-white/60 rounded-2xl p-6">
                <div className="flex items-end gap-3" style={{ height: '80px' }}>
                  {[
                    { label: 'UWM', rate: '6.50%', h: 65, best: false },
                    { label: 'Rocket', rate: '6.75%', h: 75, best: false },
                    { label: 'PennyMac', rate: '6.25%', h: 55, best: true },
                    { label: 'NewRez', rate: '7.00%', h: 85, best: false },
                  ].map((bar) => (
                    <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[9px] text-slate-400">{bar.rate}</span>
                      <div
                        className="w-full rounded-t"
                        style={{
                          height: `${bar.h}%`,
                          backgroundColor: bar.best ? '#22c55e' : '#cbd5e1',
                        }}
                      />
                      <span className="text-[9px] text-slate-500">{bar.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-emerald-600 font-medium">Best Rate: PennyMac 6.25%</span>
                </div>
              </div>
            </div>

            {/* Card 2 — Multi-Lender Access */}
            <div className={`${glassPanel} rounded-3xl p-10`}>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><rect x="4" y="4" width="16" height="6" rx="2" /><rect x="4" y="14" width="16" height="6" rx="2" /><rect x="6" y="9" width="12" height="6" rx="2" opacity="0.4" /></svg>
              </div>
              <h3 className="text-2xl font-medium text-slate-900 mb-3">Multi-Lender Access</h3>
              <p className="text-slate-500 font-light leading-relaxed mb-8">
                Unified access to your entire lender panel from one dashboard.
              </p>
              {/* Stacked lender cards */}
              <div className="relative h-32">
                {[
                  { name: 'UWM', rate: '6.50%', y: 0, z: 30 },
                  { name: 'Rocket Pro', rate: '6.75%', y: 20, z: 20 },
                  { name: 'PennyMac', rate: '6.25%', y: 40, z: 10 },
                ].map((card) => (
                  <div
                    key={card.name}
                    className="absolute left-4 right-4 bg-white/80 border border-white/60 rounded-xl p-3 flex justify-between items-center shadow-sm"
                    style={{ top: `${card.y}px`, zIndex: card.z }}
                  >
                    <span className="text-xs font-medium text-slate-700">{card.name}</span>
                    <span className="text-xs font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full">{card.rate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3 — 24-Hour Pre-Approval */}
            <div className={`${glassPanel} rounded-3xl p-10`}>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <h3 className="text-2xl font-medium text-slate-900 mb-3">24-Hour Pre-Approval</h3>
              <p className="text-slate-500 font-light leading-relaxed mb-8">
                Fast-track approvals without sacrificing accuracy.
              </p>
              {/* Toggle rows */}
              <div className="space-y-3">
                {[
                  { label: 'Automated Docs', on: true },
                  { label: 'Rate Lock Alert', on: false },
                ].map((toggle) => (
                  <div key={toggle.label} className="flex justify-between items-center bg-white/50 border border-white/60 rounded-xl px-4 py-3">
                    <span className="text-xs font-medium text-slate-600">{toggle.label}</span>
                    <div className={`w-10 h-6 rounded-full flex items-center px-0.5 ${toggle.on ? 'bg-slate-900' : 'bg-slate-300'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm ${toggle.on ? 'ml-auto' : ''}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4 — State Licensing Coverage (col-span-2) */}
            <div className={`${glassPanel} rounded-3xl p-10 md:col-span-2`}>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" /></svg>
              </div>
              <h3 className="text-3xl font-medium text-slate-900 mb-3">State Licensing Coverage</h3>
              <p className="text-slate-500 font-light leading-relaxed mb-8">
                Licensed in 12 states and expanding. Serving clients nationwide with local expertise.
              </p>
              <div className="flex flex-wrap gap-2">
                {['TX', 'CA', 'FL', 'AZ', 'CO', 'GA', 'NC', 'TN', 'VA', 'OH', 'IL', 'WA'].map((st) => (
                  <span key={st} className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100">
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5 · TIMELINE — "How Your Loan Closes"
          ═══════════════════════════════════════════ */}
      <section className="py-24" ref={timelineRef}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-900 mb-4">
              From Application to Keys.<br />In Record Time.
            </h2>
            <p className="text-slate-500 font-light text-lg max-w-xl mx-auto">
              Our streamlined process means less waiting and more clarity at every step.
            </p>
          </div>

          <div className="relative">
            {/* Center spine */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block" style={{ background: 'rgba(226,232,240,0.35)' }} />

            {/* Phase 01 — right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative">
              <div className="hidden md:block" />
              {/* Center node */}
              <div className="absolute left-1/2 top-8 -translate-x-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm z-10 hidden md:flex"
                style={{ animation: 'node-breathe 3s ease-in-out infinite' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
              </div>
              <div
                data-timeline-card
                className="bg-white rounded-2xl p-8 md:p-10 border border-slate-100/80 hover:-translate-y-1 transition-all duration-500"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03), 0 12px 40px rgba(0,0,0,0.04)', opacity: 0, transform: 'translateY(14px)', filter: 'blur(6px)', transition: 'all 0.7s ease-out' }}
              >
                <span className="text-xs text-slate-400 uppercase tracking-widest">Phase 01</span>
                <h3 className="text-xl font-medium text-slate-900 mt-2 mb-3">Application &amp; Discovery</h3>
                <p className="text-slate-500 font-light leading-relaxed">
                  You share your goals. We analyze your full financial picture and immediately identify the loan programs you qualify for.
                </p>
              </div>
            </div>

            {/* Phase 02 — left */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative">
              <div
                data-timeline-card
                className="bg-white rounded-2xl p-8 md:p-10 border border-slate-100/80 hover:-translate-y-1 transition-all duration-500"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03), 0 12px 40px rgba(0,0,0,0.04)', opacity: 0, transform: 'translateY(14px)', filter: 'blur(6px)', transition: 'all 0.7s ease-out' }}
              >
                <span className="text-xs text-slate-400 uppercase tracking-widest">Phase 02</span>
                <h3 className="text-xl font-medium text-slate-900 mt-2 mb-3">AI Rate Matching</h3>
                <p className="text-slate-500 font-light leading-relaxed">
                  Our AI engine compares rates across 40+ wholesale lenders in real-time, surfacing your best options with zero bias.
                </p>
              </div>
              {/* Center node */}
              <div className="absolute left-1/2 top-8 -translate-x-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm z-10 hidden md:flex"
                style={{ animation: 'node-breathe 3s ease-in-out infinite 0.5s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6M9 13h4" /></svg>
              </div>
              <div className="hidden md:block" />
            </div>

            {/* Phase 03 — right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              <div className="hidden md:block" />
              {/* Center node */}
              <div className="absolute left-1/2 top-8 -translate-x-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm z-10 hidden md:flex"
                style={{ animation: 'node-breathe 3s ease-in-out infinite 1s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
              </div>
              <div
                data-timeline-card
                className="bg-white rounded-2xl p-8 md:p-10 border border-slate-100/80 hover:-translate-y-1 transition-all duration-500"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03), 0 12px 40px rgba(0,0,0,0.04)', opacity: 0, transform: 'translateY(14px)', filter: 'blur(6px)', transition: 'all 0.7s ease-out' }}
              >
                <span className="text-xs text-slate-400 uppercase tracking-widest">Phase 03</span>
                <h3 className="text-xl font-medium text-slate-900 mt-2 mb-3">Fast Approval &amp; Close</h3>
                <p className="text-slate-500 font-light leading-relaxed">
                  Pre-approval in as little as 24 hours. Clear-to-close with proactive updates at every milestone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6 · INTEGRATIONS ORBIT
          ═══════════════════════════════════════════ */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-900 mb-4">
            Integrates With Your Entire Workflow
          </h2>
          <p className="text-slate-500 font-light text-lg mb-20">
            LoanGraphs connects with the tools loan officers already use.
          </p>

          {/* Orbit container */}
          <div className="relative mx-auto" style={{ width: '420px', height: '420px' }}>
            {/* Orbit rings */}
            <div className="absolute inset-8 rounded-full border border-slate-200/30" />
            <div className="absolute inset-16 rounded-full border border-slate-200/20" />

            {/* Center sphere */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center z-20"
              style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
            >
              <span className="text-white font-bold text-lg tracking-tight">LG</span>
            </div>

            {/* Orbiting cards container */}
            <div className="absolute inset-0" style={{ animation: 'orbit-spin 28s linear infinite' }}>
              {[
                { pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2', title: 'Point of Sale', sub: 'Encompass · Byte · Maxwell' },
                { pos: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2', title: 'CRM', sub: 'Salesforce · HubSpot · Velocify' },
                { pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2', title: 'Document Storage', sub: 'DocuSign · Dropbox · Drive' },
                { pos: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2', title: 'Communication', sub: 'Outlook · Gmail · Calendly' },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`absolute ${card.pos} bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-sm`}
                  style={{ animation: 'orbit-counter 28s linear infinite', width: '160px' }}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-2 mx-auto">
                    <div className="w-3 h-3 rounded-full bg-slate-400" />
                  </div>
                  <p className="text-xs font-semibold text-slate-800 text-center">{card.title}</p>
                  <p className="text-[10px] text-slate-400 text-center mt-0.5">{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7 · PLATFORM SCATTER GALLERY
          ═══════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-900 mb-4">
            Everything You Need. One Dashboard.
          </h2>
          <p className="text-slate-500 font-light text-lg mb-20">
            Click to explore the tools inside your LoanGraphs account.
          </p>

          <div className="relative group mx-auto" style={{ width: '100%', maxWidth: '700px', height: '500px' }}>
            {/* Center card */}
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${glassPanel} rounded-3xl p-10 w-72 text-center transition-transform duration-700 group-hover:scale-105 z-20`}>
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Loan Pipeline</h3>
              <p className="text-sm text-slate-500 font-light">Your single view of all active loans, rates, and client status.</p>
            </div>

            {/* Scatter cards */}
            {[
              { title: 'Rate Engine', desc: 'Real-time rate comparison across 40+ lenders', pos: 'top-0 left-0', hover: 'group-hover:-translate-x-4 group-hover:-translate-y-4' },
              { title: 'Lead Capture', desc: 'Forms, landing pages, and lead routing', pos: 'top-0 right-0', hover: 'group-hover:translate-x-4 group-hover:-translate-y-4' },
              { title: 'Analytics', desc: 'Conversion rates, referral sources, monthly volume', pos: 'bottom-0 left-0', hover: 'group-hover:-translate-x-4 group-hover:translate-y-4' },
              { title: 'Document Vault', desc: 'Secure storage for all loan documents', pos: 'bottom-0 right-0', hover: 'group-hover:translate-x-4 group-hover:translate-y-4' },
            ].map((card) => (
              <div
                key={card.title}
                className={`absolute ${card.pos} ${card.hover} ${glassPanel} rounded-2xl p-6 w-48 text-left transition-all duration-700 z-10`}
              >
                <h4 className="text-sm font-medium text-slate-800 mb-1">{card.title}</h4>
                <p className="text-[11px] text-slate-400 font-light leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8 · GIANT TEXT MARQUEE
          ═══════════════════════════════════════════ */}
      <section className="py-24 border-y border-white/30 bg-white/5 overflow-hidden">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f0f4ff] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f0f4ff] to-transparent z-10" />
          <div className="flex whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite', fontSize: '8rem', fontWeight: 700, opacity: 0.05, lineHeight: 1 }}>
            <span className="px-8">CLOSE YOUR LOAN</span>
            <span className="px-8">·</span>
            <span className="px-8">RATE LOCK TODAY</span>
            <span className="px-8">·</span>
            <span className="px-8">GROW YOUR PIPELINE</span>
            <span className="px-8">·</span>
            <span className="px-8">PROTECT YOUR CLIENTS</span>
            <span className="px-8">·</span>
            <span className="px-8">CLOSE YOUR LOAN</span>
            <span className="px-8">·</span>
            <span className="px-8">RATE LOCK TODAY</span>
            <span className="px-8">·</span>
            <span className="px-8">GROW YOUR PIPELINE</span>
            <span className="px-8">·</span>
            <span className="px-8">PROTECT YOUR CLIENTS</span>
            <span className="px-8">·</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9 · THREE PILLARS (glass panel 3-col)
          ═══════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-900 mb-4">
              Built for Today&apos;s Loan Officer
            </h2>
            <p className="text-slate-500 font-light text-lg">
              Everything you need to serve clients faster, with less friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 — Client Intelligence */}
            <div className={`${glassPanel} rounded-[2.5rem] p-10 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-700`} style={{ minHeight: '600px' }}>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-3">Client Intelligence</h3>
                <p className="text-slate-500 font-light leading-relaxed">
                  See every client, loan, and rate in one place. Powerful search instantly surfaces what you need.
                </p>
              </div>
              {/* UI schema: node map */}
              <div className="bg-white/50 border border-white/60 rounded-2xl mt-12 p-8 shadow-inner aspect-[4/3] flex flex-col items-center justify-center">
                <div className="relative w-full h-24 flex items-center justify-center">
                  {/* Center ping node */}
                  <div className="w-4 h-4 rounded-full bg-slate-900 z-10" style={{ animation: 'node-breathe 2s ease-in-out infinite' }} />
                  {/* Connected dots */}
                  <div className="absolute w-3 h-3 rounded-full bg-slate-300 border border-slate-200" style={{ top: '10%', left: '20%' }} />
                  <div className="absolute w-3 h-3 rounded-full bg-slate-300 border border-slate-200" style={{ top: '15%', right: '25%' }} />
                  <div className="absolute w-3 h-3 rounded-full bg-slate-300 border border-slate-200" style={{ bottom: '10%', left: '30%' }} />
                  <div className="absolute w-3 h-3 rounded-full bg-slate-300 border border-slate-200" style={{ bottom: '15%', right: '20%' }} />
                  {/* Dashed lines (via SVG) */}
                  <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                    <line x1="50%" y1="50%" x2="20%" y2="10%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="50%" y1="50%" x2="75%" y2="15%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="50%" y1="50%" x2="30%" y2="90%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="50%" y1="50%" x2="80%" y2="85%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
                  </svg>
                </div>
                <div className="flex gap-3 mt-4">
                  <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">Global Pipeline: 14 Loans</span>
                  <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">Active Leads: 3,492</span>
                </div>
              </div>
            </div>

            {/* Pillar 2 — Speed & Accuracy */}
            <div className={`${glassPanel} rounded-[2.5rem] p-10 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-700`} style={{ minHeight: '600px' }}>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-3">Speed &amp; Accuracy</h3>
                <p className="text-slate-500 font-light leading-relaxed">
                  AI strips away rate noise and surfaces your best options. Close faster with confidence.
                </p>
              </div>
              {/* UI schema: pipeline steps */}
              <div className="bg-white/50 border border-white/60 rounded-2xl mt-12 p-8 shadow-inner aspect-[4/3] flex flex-col items-center justify-center">
                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full mb-8 overflow-hidden">
                  <div className="h-full bg-slate-900/80 rounded-full" style={{ width: '33%' }} />
                </div>
                {/* Pipeline steps */}
                <div className="relative flex items-center justify-between w-full">
                  {/* Connecting line */}
                  <div className="absolute top-1/2 left-[10%] right-[10%] h-px bg-slate-200 -translate-y-1/2" />
                  {/* Left node */}
                  <div className="flex flex-col items-center z-10">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-2">Applied</span>
                  </div>
                  {/* Center node — active */}
                  <div className="flex flex-col items-center z-10">
                    <div className="w-10 h-10 rounded-full bg-slate-900 shadow-lg ring-4 ring-white/60 flex items-center justify-center scale-110">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    </div>
                    <span className="text-[9px] text-slate-800 font-semibold mt-2">Approved ✓</span>
                  </div>
                  {/* Right node */}
                  <div className="flex flex-col items-center z-10">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-2">Closing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 3 — Compliance Ready */}
            <div className={`${glassPanel} rounded-[2.5rem] p-10 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-700`} style={{ minHeight: '600px' }}>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-3">Compliance Ready</h3>
                <p className="text-slate-500 font-light leading-relaxed">
                  NMLS disclosures, Equal Housing, state licensing — all built in. Nothing falls through the cracks.
                </p>
              </div>
              {/* UI schema: floating stacked documents */}
              <div className="bg-white/50 border border-white/60 rounded-2xl mt-12 shadow-inner aspect-[4/3] flex items-center justify-center overflow-hidden">
                <div className="relative w-28 h-20">
                  <div
                    className="absolute inset-0 bg-white/40 border border-white/60 rounded-xl shadow-sm transition-transform duration-700"
                    style={{ transform: 'rotate(-12deg) translateY(8px) translateX(8px)', zIndex: 10 }}
                  />
                  <div
                    className="absolute inset-0 bg-white/60 border border-white/60 rounded-xl shadow-md transition-transform duration-700 group-hover:rotate-[10deg] group-hover:-translate-y-4"
                    style={{ transform: 'rotate(6deg) translateX(-16px) translateY(-8px)', zIndex: 20 }}
                  >
                    <div className="p-2">
                      <div className="w-8 h-1 bg-slate-300 rounded mb-1" />
                      <div className="w-12 h-1 bg-slate-200 rounded mb-1" />
                      <div className="w-6 h-1 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          10 · TESTIMONIALS
          ═══════════════════════════════════════════ */}
      <section id="reviews" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-200 bg-white/70 text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-6">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-900">
              Loved by Homeowners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              { quote: `${loName.split(' ')[0]} helped us close our first home in just 21 days. Every step was clear and we never felt lost. Couldn't recommend him more.`, name: 'Sarah M.', loc: 'Austin, TX', initial: 'S' },
              { quote: `We compared rates at 3 banks and ${loName.split(' ')[0]} beat them all. Saved us $240/month. He knows every lender and every program.`, name: 'Marcus T.', loc: 'Houston, TX', initial: 'M' },
              { quote: `${loName.split(' ')[0]} is the only person I'll ever use for a VA loan. Zero down, no drama, closed in 18 days. Absolute pro.`, name: 'James R.', loc: 'San Antonio, TX', initial: 'J' },
            ].map((t) => (
              <div
                key={t.name}
                className={`${glassPanel} p-8 rounded-[2rem] border border-white/60 hover:-translate-y-1 transition-all duration-500 min-h-[320px] flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      ))}
                    </div>
                    <span className="text-[11px] uppercase tracking-widest text-slate-400">5.0 Rating</span>
                  </div>
                  <p className="text-slate-700 text-[17px] leading-8 font-light mb-10">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-600">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          11 · CTA — Immersive
          ═══════════════════════════════════════════ */}
      <section id="contact" className="h-[60vh] flex flex-col items-center justify-center relative">
        {/* Blue glow */}
        <div className="absolute w-64 h-64 rounded-full bg-blue-400/20 blur-[100px]" />
        <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-slate-900 text-center mb-6 relative z-10">
          Stop waiting.<br />Start closing.
        </h2>
        <p className="text-slate-500 font-light text-lg text-center max-w-lg mb-10 relative z-10">
          Join hundreds of loan officers who close faster, quote better, and win more clients.
        </p>
        <a
          href={`mailto:${loEmail}`}
          className="relative z-10 bg-slate-900 text-white text-sm uppercase tracking-widest rounded-full px-10 py-4 hover:bg-slate-800 transition-colors"
        >
          Get Pre-Approved Today
        </a>
      </section>

      {/* ═══════════════════════════════════════════
          12 · FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            {/* Brand column */}
            <div className="md:col-span-4">
              <p className="font-semibold text-slate-900 text-lg mb-1">{loName}</p>
              <p className="text-xs text-slate-400 mb-4">NMLS# {loNmls}</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed mb-6">
                Expert mortgage guidance for homebuyers across {loStates.replace(/,([^,]*)$/, ' and$1')}.
              </p>
              {/* Equal Housing icon */}
              <div className="flex items-center gap-2 text-slate-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L2 10h3v9h14v-9h3L12 3zm0 2.5L18 10v8H6v-8l6-4.5z" /><rect x="8" y="13" width="3" height="4" /><rect x="13" y="13" width="3" height="4" /></svg>
                <span className="text-xs">Equal Housing Lender</span>
              </div>
            </div>

            {/* Link columns */}
            <div className="md:col-start-7 md:col-span-6">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-800 mb-4">Services</p>
                  {['Purchase', 'Refinance', 'VA Loans', 'FHA Loans', 'Jumbo'].map((l) => (
                    <a key={l} href="#" className="block text-sm text-slate-400 hover:text-slate-700 transition-colors mb-2">{l}</a>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-800 mb-4">Resources</p>
                  {['Mortgage Calculator', 'Rate Alerts', 'First-Time Buyer Guide', 'FAQ'].map((l) => (
                    <a key={l} href="#" className="block text-sm text-slate-400 hover:text-slate-700 transition-colors mb-2">{l}</a>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-800 mb-4">Company</p>
                  {['About', 'Reviews', 'Contact', 'NMLS Consumer Access'].map((l) => (
                    <a key={l} href="#" className="block text-sm text-slate-400 hover:text-slate-700 transition-colors mb-2">{l}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 font-light text-center md:text-left">
              NMLS# {loNmls} | Licensed in {loStates} | © {new Date().getFullYear()} {loName}. All rights reserved. | This is not a commitment to lend.
            </p>
            <div className="flex items-center gap-4">
              {/* Phone */}
              <a href={`tel:${loPhone.replace(/\D/g, '')}`} className="text-slate-400 hover:text-slate-700 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              </a>
              {/* Email */}
              <a href={`mailto:${loEmail}`} className="text-slate-400 hover:text-slate-700 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>
              </a>
              {/* LinkedIn */}
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
