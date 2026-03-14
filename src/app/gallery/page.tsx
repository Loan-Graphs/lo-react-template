'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  templatesMeta,
  trending,
  freeTemplates,
  proTemplates,
  newTemplates,
  type TemplateMeta,
} from '@/data/templates-meta'

/* ─── Navbar ──────────────────────────────────────────────────────────────── */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 md:px-12 h-12 max-w-[1400px] mx-auto">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-[9px] font-bold text-white">
            LG
          </div>
          <span className="text-sm font-semibold text-gray-900 tracking-tight hidden sm:inline">
            LoanGraphs
          </span>
        </Link>

        {/* Center: Nav links */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-[0.08em] text-gray-500 uppercase">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Templates
          </Link>
          <a
            href="https://loangraphs.com/pricing"
            className="hover:text-gray-900 transition-colors"
          >
            Pricing
          </a>
          <a
            href="https://loangraphs.com/docs"
            className="hover:text-gray-900 transition-colors"
          >
            Docs
          </a>
        </div>

        {/* Right: Sign in */}
        <div className="flex items-center gap-4">
          <a
            href="https://loangraphs.com/login"
            className="text-[11px] font-medium tracking-[0.08em] text-gray-500 uppercase hover:text-gray-900 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ─── Hero ─────────────────────────────────────────────────────────────────── */
function Hero({
  search,
  setSearch,
}: {
  search: string
  setSearch: (v: string) => void
}) {
  return (
    <section className="pt-28 pb-14 px-6 text-center">
      {/* Pill badge */}
      <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-xs text-gray-600 mb-6 bg-white">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
        9 mortgage-focused templates — built for LOs
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 mb-4 leading-[1.1] tracking-tight">
        Professional LO websites, instantly
      </h1>

      {/* Subtext */}
      <p className="text-gray-400 text-sm md:text-base mb-8 max-w-lg mx-auto">
        Browse 9 mortgage-focused templates. Pick one and go live with LoanGraphs.
      </p>

      {/* Prompt input bar (Aura style) */}
      <div className="max-w-2xl mx-auto">
        <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
          {/* Input area */}
          <div className="px-4 pt-4 pb-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Describe your ideal LO website..."
              className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>
          {/* Bottom toolbar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
                AI Builder
              </span>
              <span className="text-[11px] text-gray-400 bg-gray-50 border border-gray-200 rounded px-2 py-0.5 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                GPT-5 ▾
              </span>
              {/* Icon buttons */}
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5"
                  />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                  />
                </svg>
              </button>
            </div>
            {/* Submit arrow */}
            <button className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Template Card (Aura style) ──────────────────────────────────────────── */
function TemplateCard({ template }: { template: TemplateMeta }) {
  return (
    <Link href={`/${template.id}/loan-officer`} className="group block">
      {/* Tall portrait image */}
      <div className="relative overflow-hidden rounded-sm bg-gray-50 aspect-[3/4] mb-3">
        <Image
          src={template.thumbnail}
          alt={template.name}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
        />
        {/* Price badge (top-right corner) */}
        <div className="absolute top-2.5 right-2.5 text-[10px] font-semibold bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-0.5 rounded">
          {template.tier === 'free' ? 'Free' : '$29/mo'}
        </div>
      </div>

      {/* Template name */}
      <h3 className="text-[13px] font-medium text-gray-900 mb-1.5 truncate">
        {template.name}
      </h3>

      {/* Author row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {/* LG avatar */}
          <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
            <span className="text-[6px] font-bold text-white leading-none">LG</span>
          </div>
          <span className="text-[11px] text-gray-400">LoanGraphs</span>
        </div>

        {/* Stats: remixes + views */}
        <div className="flex items-center gap-2.5 text-[11px] text-gray-400">
          <span className="flex items-center gap-0.5">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {template.remixes.toLocaleString()}
          </span>
          <span className="flex items-center gap-0.5">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            {template.views.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ─── Section (3-col grid) ─────────────────────────────────────────────────── */
function TemplateSection({
  title,
  templates,
}: {
  title: string
  templates: TemplateMeta[]
}) {
  return (
    <section className="mb-16 max-w-[1200px] mx-auto px-6 md:px-12">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6 border-t border-gray-100 pt-8">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        <span className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          Browse {title} →
        </span>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t) => (
          <TemplateCard key={t.id} template={t} />
        ))}
      </div>
    </section>
  )
}

/* ─── Footer (Aura style — 4-column links) ─────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-[9px] font-bold text-white">
                LG
              </div>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed max-w-[200px]">
              Professional LO website templates. No design skills needed. Go live instantly with LoanGraphs.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.08em] mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-[12px] text-gray-400">
              <li>
                <Link href="/" className="hover:text-gray-600 transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <a
                  href="https://loangraphs.com/pricing"
                  className="hover:text-gray-600 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="https://loangraphs.com/docs"
                  className="hover:text-gray-600 transition-colors"
                >
                  Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.08em] mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-[12px] text-gray-400">
              <li>
                <a href="#" className="hover:text-gray-600 transition-colors">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-600 transition-colors">
                  Customization
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-600 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* What We Use */}
          <div>
            <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.08em] mb-4">
              Built With
            </h4>
            <ul className="space-y-2.5 text-[12px] text-gray-400">
              <li>
                <span>Next.js</span>
              </li>
              <li>
                <span>Tailwind CSS</span>
              </li>
              <li>
                <span>Vercel</span>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.08em] mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-[12px] text-gray-400">
              <li>
                <a href="#" className="hover:text-gray-600 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-600 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-600 transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 mt-10 pt-6 flex items-center justify-between">
          <p className="text-[11px] text-gray-400">
            © {new Date().getFullYear()} LoanGraphs. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://loangraphs.com"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 17.93A8.005 8.005 0 014 12c0-.34.028-.674.07-1.003L8 14.93V16a2 2 0 002 2v1.93zm6.54-2.47A1.994 1.994 0 0016 16h-1v-3a1 1 0 00-1-1H8v-2h2a1 1 0 001-1V7h2a2 2 0 002-2v-.41A7.997 7.997 0 0120 12a7.98 7.98 0 01-2.46 5.46z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Main Page ────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const [search, setSearch] = useState('')

  const filtered = search
    ? templatesMeta.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase()) ||
          t.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          )
      )
    : null

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero search={search} setSearch={setSearch} />

      {/* Search results */}
      {filtered !== null && (
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <p className="text-xs text-gray-400 mb-6">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for
            &ldquo;{search}&rdquo;
          </p>
          {filtered.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No templates match that search. Try &ldquo;dark&rdquo;,
              &ldquo;bold&rdquo;, or &ldquo;minimal&rdquo;.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t) => (
                <TemplateCard key={t.id} template={t} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Sections (hidden when searching) */}
      {filtered === null && (
        <>
          <TemplateSection title="Trending" templates={trending} />
          <TemplateSection title="Free Templates" templates={freeTemplates} />
          <TemplateSection title="Pro Templates" templates={proTemplates} />
          {newTemplates.length > 0 && (
            <TemplateSection title="New" templates={newTemplates} />
          )}
        </>
      )}

      <Footer />
    </div>
  )
}
