'use client';

import React, { useState, useMemo } from 'react';
import { templatesMeta } from '@/data/templates-meta';
import OptionGrid from './OptionGrid';
import type { OptionGridOption } from './OptionGrid';
import PreviewPane from './PreviewPane';

/* ── SVG icon helpers ── */
const I = {
  hero: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="14" height="12" rx="2"/><line x1="5" y1="7" x2="10" y2="7"/><line x1="5" y1="10" x2="13" y2="10"/><line x1="5" y1="13" x2="8" y2="13"/></svg>,
  about: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z"/></svg>,
  rates: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="14" height="14" rx="2"/><line x1="2" y1="6" x2="16" y2="6"/><line x1="2" y1="10" x2="16" y2="10"/><line x1="9" y1="6" x2="9" y2="16"/></svg>,
  testimonials: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h12v9H7l-4 3V3z" rx="2"/><line x1="6" y1="7" x2="12" y2="7"/><line x1="6" y1="10" x2="10" y2="10"/></svg>,
  contact: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="14" height="10" rx="2"/><polyline points="2,4 9,10 16,4"/></svg>,
  loanTypes: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="6" height="6" rx="1"/><rect x="10" y="2" width="6" height="6" rx="1"/><rect x="2" y="10" width="6" height="6" rx="1"/><rect x="10" y="10" width="6" height="6" rx="1"/></svg>,
  singleCol: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="10" height="14" rx="1"/><line x1="6" y1="5" x2="12" y2="5"/><line x1="6" y1="8" x2="12" y2="8"/><line x1="6" y1="11" x2="12" y2="11"/></svg>,
  twoCol: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="6" height="14" rx="1"/><rect x="10" y="2" width="6" height="14" rx="1"/></svg>,
  cardGrid: <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><circle cx="5" cy="5" r="2"/><circle cx="13" cy="5" r="2"/><circle cx="5" cy="13" r="2"/><circle cx="13" cy="13" r="2"/></svg>,
  timeline: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="2" x2="5" y2="16"/><circle cx="5" cy="4" r="1.5" fill="currentColor"/><circle cx="5" cy="9" r="1.5" fill="currentColor"/><circle cx="5" cy="14" r="1.5" fill="currentColor"/><line x1="8" y1="4" x2="14" y2="4"/><line x1="8" y1="9" x2="14" y2="9"/><line x1="8" y1="14" x2="14" y2="14"/></svg>,
  sidebar: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="14" height="14" rx="1"/><line x1="12" y1="2" x2="12" y2="16"/></svg>,
  centered: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="5" x2="13" y2="5"/><line x1="4" y1="9" x2="14" y2="9"/><line x1="6" y1="13" x2="12" y2="13"/></svg>,
  sun: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  moon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>,
  doc: <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="1" width="12" height="16" rx="2"/><line x1="6" y1="5" x2="12" y2="5"/><line x1="6" y1="8" x2="12" y2="8"/><line x1="6" y1="11" x2="9" y2="11"/></svg>,
  code: <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="5,4 1,9 5,14"/><polyline points="13,4 17,9 13,14"/><line x1="10" y1="2" x2="8" y2="16"/></svg>,
};

/* ── Option definitions ── */
const sectionTypeOptions: OptionGridOption[] = [
  { id: 'Hero', label: 'Hero', icon: I.hero },
  { id: 'About', label: 'About', icon: I.about },
  { id: 'Rates', label: 'Rates', icon: I.rates },
  { id: 'Testimonials', label: 'Testimonials', icon: I.testimonials },
  { id: 'Contact', label: 'Contact', icon: I.contact },
  { id: 'Loan Types', label: 'Loan Types', icon: I.loanTypes },
];

const layoutOptions: OptionGridOption[] = [
  { id: 'Single', label: 'Single', icon: I.singleCol },
  { id: 'Two Column', label: 'Two Column', icon: I.twoCol },
  { id: 'Card Grid', label: 'Card Grid', icon: I.cardGrid },
  { id: 'Timeline', label: 'Timeline', icon: I.timeline },
  { id: 'Sidebar', label: 'Sidebar', icon: I.sidebar },
  { id: 'Centered', label: 'Centered', icon: I.centered },
];

const styleOptions: OptionGridOption[] = [
  { id: 'Modern', label: 'Modern', icon: <span className="text-sm font-bold">M</span> },
  { id: 'Classic', label: 'Classic', icon: <span className="text-sm font-serif">C</span> },
  { id: 'Minimal', label: 'Minimal', icon: <span className="text-sm font-light">—</span> },
  { id: 'Bold', label: 'Bold', icon: <span className="text-sm font-black">B</span> },
  { id: 'Elegant', label: 'Elegant', icon: <span className="text-sm italic font-light">E</span> },
  { id: 'Corporate', label: 'Corporate', icon: <span className="text-sm">▣</span> },
];

const themeOptions: OptionGridOption[] = [
  { id: 'Light', label: 'Light Mode', icon: I.sun },
  { id: 'Dark', label: 'Dark Mode', icon: I.moon },
];

const accentColors = [
  { label: 'Primary', value: '#000000' },
  { label: 'Blue', value: '#3B82F6' },
  { label: 'Navy', value: '#1E3A5F' },
  { label: 'Teal', value: '#14B8A6' },
  { label: 'Green', value: '#22C55E' },
  { label: 'Gold', value: '#F59E0B' },
];

const bgColors = ['White', 'Light Gray', 'Slate', 'Navy', 'Charcoal'];
const bgColorHex: Record<string, string> = {
  White: '#ffffff',
  'Light Gray': '#f3f4f6',
  Slate: '#475569',
  Navy: '#1e3a5f',
  Charcoal: '#1f2937',
};

const fontOptions: OptionGridOption[] = [
  { id: 'Sans-serif', label: 'Sans-serif', icon: <span className="text-xs font-medium">Aa</span> },
  { id: 'Serif', label: 'Serif', icon: <span className="text-xs font-serif">Aa</span> },
  { id: 'Mixed', label: 'Mixed', icon: <span className="text-xs"><span className="font-serif">A</span>a</span> },
];

const suggestions = [
  'Include NMLS# and Equal Housing Lender disclosure in footer.',
  'Add a Google Reviews widget showing star rating and review count.',
  'Show a Zillow Premier Agent badge if available.',
  'Add a mortgage calculator widget above the CTA section.',
  'Include a rate comparison table with current market rates.',
  'Add a "First-Time Buyer?" FAQ accordion section.',
  'Show loan officer license state badges (NMLS state licenses).',
  'Add a pre-approval checklist download CTA.',
  'Include a refinance savings calculator.',
  'Add client success story with loan amount and closing timeline.',
  'Show a "Compare Your Options" side-by-side loan type chart.',
  'Add a sticky header with your phone number on mobile.',
  'Include a "Why Work With Me" 3-column feature grid.',
  'Add social proof bar: X loans closed | Y 5-star reviews | Z years experience.',
  'Show recent closings feed (anonymized: "Just closed a $485K VA loan in Houston").',
];

/* ── Filter categories for template gallery ── */
const galleryFilters = ['All', 'Hero', 'Rates', 'Testimonials', 'Contact', 'Bio', 'Loan Types'] as const;

/* ── Section header component ── */
function SectionHeader({
  title,
  open,
  onToggle,
  onRemove,
  extra,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  onRemove: () => void;
  extra?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-2">
      <button onClick={onToggle} className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-700">
        <span className="transition-transform" style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', display: 'inline-block', fontSize: '10px' }}>˅</span>
        {title}
      </button>
      <div className="flex items-center gap-2">
        {extra}
        <button onClick={onRemove} className="text-gray-400 hover:text-gray-600 text-xs">×</button>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function PromptBuilder() {
  /* State */
  const [sectionType, setSectionType] = useState('Hero');
  const [device, setDevice] = useState<'Web' | 'Mobile'>('Web');
  const [layout, setLayout] = useState('Two Column');
  const [style, setStyle] = useState('Modern');
  const [theme, setTheme] = useState('Light');
  const [accentColor, setAccentColor] = useState(accentColors[1]);
  const [backgroundColor, setBackgroundColor] = useState('White');
  const [fontStyle, setFontStyle] = useState('Sans-serif');
  const [addedSuggestions, setAddedSuggestions] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [gallerySearch, setGallerySearch] = useState('');
  const [galleryTab, setGalleryTab] = useState<'template' | 'html'>('template');
  const [galleryPage, setGalleryPage] = useState(1);

  /* Section visibility */
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sectionType: true,
    layout: true,
    style: true,
    theme: true,
    accent: true,
    bg: true,
    font: true,
  });
  const [hiddenSections, setHiddenSections] = useState<Set<string>>(new Set());

  const toggleSection = (key: string) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));
  const removeSection = (key: string) =>
    setHiddenSections((s) => new Set(s).add(key));

  /* Gallery filtering */
  const filteredTemplates = useMemo(() => {
    let list = [...templatesMeta];
    if (gallerySearch) {
      const q = gallerySearch.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    if (galleryFilter !== 'All') {
      // Map filter labels to template tags loosely
      list = list.filter((t) =>
        t.tags.some((tag) => tag.toLowerCase().includes(galleryFilter.toLowerCase())) ||
        t.description.toLowerCase().includes(galleryFilter.toLowerCase())
      );
    }
    return list;
  }, [gallerySearch, galleryFilter]);

  const perPage = 6;
  const totalPages = Math.max(1, Math.ceil(filteredTemplates.length / perPage));
  const pagedTemplates = filteredTemplates.slice(
    (galleryPage - 1) * perPage,
    galleryPage * perPage
  );

  /* Generated prompt */
  const prompt = useMemo(() => {
    const tpl = selectedTemplate
      ? templatesMeta.find((t) => t.id === selectedTemplate)
      : null;
    const lines = [
      `Create a ${sectionType} section for a loan officer website.`,
      tpl ? `Base template: ${tpl.name}.` : null,
      `Device: ${device}. Layout: ${layout}. Style: ${style}. Theme: ${theme} Mode.`,
      `Accent color: ${accentColor.label} (${accentColor.value}). Background: ${backgroundColor}. Font: ${fontStyle}.`,
      ...addedSuggestions,
    ];
    return lines.filter(Boolean).join('\n');
  }, [sectionType, device, layout, style, theme, accentColor, backgroundColor, fontStyle, addedSuggestions, selectedTemplate]);

  const addSuggestion = (s: string) => {
    if (!addedSuggestions.includes(s)) {
      setAddedSuggestions((prev) => [...prev, s]);
    }
  };

  const resetAll = () => {
    setSectionType('Hero');
    setDevice('Web');
    setLayout('Two Column');
    setStyle('Modern');
    setTheme('Light');
    setAccentColor(accentColors[1]);
    setBackgroundColor('White');
    setFontStyle('Sans-serif');
    setAddedSuggestions([]);
    setSelectedTemplate(null);
    setGalleryFilter('All');
    setGallerySearch('');
    setHiddenSections(new Set());
    setOpenSections({
      sectionType: true, layout: true, style: true, theme: true,
      accent: true, bg: true, font: true,
    });
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
  };

  const selectedTemplateMeta = selectedTemplate
    ? templatesMeta.find((t) => t.id === selectedTemplate)
    : null;

  /* ── Render ── */
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* ── Header ── */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <a href="/" className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
            ← Back to Templates
          </a>
          <span className="text-gray-300">|</span>
          <h1 className="text-xs font-mono uppercase tracking-widest text-gray-600 font-semibold">
            Prompt Builder
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={resetAll}
            className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
          >
            ↺ Reset
          </button>
          <a href="/" className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</a>
        </div>
      </header>

      {/* ── Main split ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── LEFT PANEL ── */}
        <div className="w-[520px] flex-shrink-0 border-r border-gray-200 bg-white flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-5">
            {/* ─ ZONE 1: Template Gallery ─ */}
            <div>
              {/* Tabs: Adapt from Template / Adapt from HTML */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setGalleryTab('template')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition-all
                    ${galleryTab === 'template'
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                >
                  {I.doc}
                  Adapt from Template
                </button>
                <button
                  onClick={() => setGalleryTab('html')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition-all
                    ${galleryTab === 'html'
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                >
                  {I.code}
                  Adapt from HTML
                </button>
              </div>

              {galleryTab === 'template' && (
                <>
                  {/* Section title + search */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                      Template Gallery
                    </span>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={gallerySearch}
                      onChange={(e) => { setGallerySearch(e.target.value); setGalleryPage(1); }}
                      className="text-xs border border-gray-200 rounded-md px-2 py-1 w-32 focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  {/* Filter pills */}
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    {galleryFilters.map((f) => (
                      <button
                        key={f}
                        onClick={() => { setGalleryFilter(f); setGalleryPage(1); }}
                        className={`text-[10px] px-2.5 py-1 rounded-full font-medium transition-all
                          ${galleryFilter === f
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  {/* Template cards grid */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {pagedTemplates.map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => setSelectedTemplate(tpl.id === selectedTemplate ? null : tpl.id)}
                        className={`rounded-lg border overflow-hidden text-left transition-all
                          ${selectedTemplate === tpl.id
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        {/* Thumbnail */}
                        <div
                          className="h-20 flex items-center justify-center text-xs text-gray-400"
                          style={{ background: '#1f2937' }}
                        >
                          <div className="text-center px-2">
                            <div className="w-10 h-1.5 rounded-full mx-auto mb-1" style={{ background: tpl.accent }} />
                            <div className="w-14 h-1 rounded-full bg-gray-600 mx-auto mb-0.5" />
                            <div className="w-10 h-1 rounded-full bg-gray-700 mx-auto" />
                          </div>
                        </div>
                        {/* Info */}
                        <div className="p-1.5 bg-white">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-medium text-gray-700 truncate">{tpl.name}</span>
                            <span className={`text-[8px] font-bold uppercase px-1 py-0.5 rounded ${tpl.tier === 'free' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                              {tpl.tier}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-0.5">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 rounded-full" style={{ background: tpl.accent }} />
                              <span className="text-[9px] text-gray-400">LoanGraphs</span>
                            </div>
                            <div className="flex items-center gap-0.5 text-[9px] text-gray-400">
                              <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3C4.5 3 1.7 5.1 0 8c1.7 2.9 4.5 5 8 5s6.3-2.1 8-5c-1.7-2.9-4.5-5-8-5zm0 8a3 3 0 110-6 3 3 0 010 6z"/></svg>
                              {tpl.views.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <button
                        onClick={() => setGalleryPage((p) => Math.max(1, p - 1))}
                        disabled={galleryPage === 1}
                        className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30 px-1"
                      >
                        ‹
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          onClick={() => setGalleryPage(p)}
                          className={`text-xs w-6 h-6 rounded ${galleryPage === p ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        onClick={() => setGalleryPage((p) => Math.min(totalPages, p + 1))}
                        disabled={galleryPage === totalPages}
                        className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30 px-1"
                      >
                        ›
                      </button>
                    </div>
                  )}
                </>
              )}

              {galleryTab === 'html' && (
                <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-xs text-gray-400 mb-2">Paste your HTML code to adapt it</p>
                  <textarea
                    placeholder="<div>Your HTML here...</div>"
                    className="w-full h-24 text-xs font-mono border border-gray-200 rounded-md p-2 resize-none focus:outline-none focus:border-blue-400"
                  />
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* ─ ZONE 2: Option Sections ─ */}

            {/* LAYOUT TYPE (was SECTION TYPE) */}
            {!hiddenSections.has('sectionType') && (
              <div>
                <SectionHeader
                  title="Layout Type"
                  open={openSections.sectionType}
                  onToggle={() => toggleSection('sectionType')}
                  onRemove={() => removeSection('sectionType')}
                  extra={
                    <div className="flex rounded-full bg-gray-100 p-0.5">
                      {(['Web', 'Mobile'] as const).map((d) => (
                        <button
                          key={d}
                          onClick={() => setDevice(d)}
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium transition-all
                            ${device === d ? 'bg-white text-gray-700 shadow-sm' : 'text-gray-400'}`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  }
                />
                {openSections.sectionType && (
                  <OptionGrid
                    options={sectionTypeOptions}
                    selected={sectionType}
                    onSelect={setSectionType}
                  />
                )}
              </div>
            )}

            {/* LAYOUT CONFIGURATION */}
            {!hiddenSections.has('layout') && (
              <div>
                <SectionHeader
                  title="Layout Configuration"
                  open={openSections.layout}
                  onToggle={() => toggleSection('layout')}
                  onRemove={() => removeSection('layout')}
                />
                {openSections.layout && (
                  <OptionGrid
                    options={layoutOptions}
                    selected={layout}
                    onSelect={setLayout}
                  />
                )}
              </div>
            )}

            {/* STYLE */}
            {!hiddenSections.has('style') && (
              <div>
                <SectionHeader
                  title="Style"
                  open={openSections.style}
                  onToggle={() => toggleSection('style')}
                  onRemove={() => removeSection('style')}
                />
                {openSections.style && (
                  <OptionGrid
                    options={styleOptions}
                    selected={style}
                    onSelect={setStyle}
                  />
                )}
              </div>
            )}

            {/* THEME */}
            {!hiddenSections.has('theme') && (
              <div>
                <SectionHeader
                  title="Theme"
                  open={openSections.theme}
                  onToggle={() => toggleSection('theme')}
                  onRemove={() => removeSection('theme')}
                />
                {openSections.theme && (
                  <OptionGrid
                    options={themeOptions}
                    selected={theme}
                    onSelect={setTheme}
                    columns={2}
                  />
                )}
              </div>
            )}

            {/* ACCENT COLOR */}
            {!hiddenSections.has('accent') && (
              <div>
                <SectionHeader
                  title="Accent Color"
                  open={openSections.accent}
                  onToggle={() => toggleSection('accent')}
                  onRemove={() => removeSection('accent')}
                />
                {openSections.accent && (
                  <div className="grid grid-cols-6 gap-2">
                    {accentColors.map((c) => (
                      <button
                        key={c.label}
                        onClick={() => setAccentColor(c)}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all
                          ${accentColor.label === c.label
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div
                          className="w-6 h-6 rounded-full border border-gray-200"
                          style={{ background: c.value }}
                        />
                        <span className={`text-[9px] font-medium ${accentColor.label === c.label ? 'text-blue-600' : 'text-gray-500'}`}>
                          {c.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* BACKGROUND COLOR */}
            {!hiddenSections.has('bg') && (
              <div>
                <SectionHeader
                  title="Background Color"
                  open={openSections.bg}
                  onToggle={() => toggleSection('bg')}
                  onRemove={() => removeSection('bg')}
                />
                {openSections.bg && (
                  <div className="grid grid-cols-5 gap-2">
                    {bgColors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setBackgroundColor(c)}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all
                          ${backgroundColor === c
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div
                          className="w-6 h-6 rounded border"
                          style={{
                            background: bgColorHex[c],
                            borderColor: c === 'White' ? '#e5e7eb' : bgColorHex[c],
                          }}
                        />
                        <span className={`text-[9px] font-medium ${backgroundColor === c ? 'text-blue-600' : 'text-gray-500'}`}>
                          {c}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* FONT STYLE */}
            {!hiddenSections.has('font') && (
              <div>
                <SectionHeader
                  title="Font Style"
                  open={openSections.font}
                  onToggle={() => toggleSection('font')}
                  onRemove={() => removeSection('font')}
                />
                {openSections.font && (
                  <OptionGrid
                    options={fontOptions}
                    selected={fontStyle}
                    onSelect={setFontStyle}
                    columns={3}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
          <div className="flex-1 overflow-y-auto scrollbar-hide p-5 space-y-4">
            {/* Live Preview */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2 block">
                Live Preview
              </span>
              <PreviewPane
                sectionType={sectionType}
                layout={layout}
                style={style}
                theme={theme}
                accentColor={accentColor}
                backgroundColor={backgroundColor}
                fontStyle={fontStyle}
                templateName={selectedTemplateMeta?.name || 'Custom'}
              />
            </div>

            {/* Quick Add Suggestions */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2 block">
                Quick Add Suggestions
              </span>
              <div className="bg-white rounded-lg border border-gray-200">
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-3 py-2 ${i < suggestions.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <span className={`text-xs font-mono ${addedSuggestions.includes(s) ? 'text-green-600' : 'text-gray-500'}`}>
                      {addedSuggestions.includes(s) && '✓ '}{s}
                    </span>
                    <button
                      onClick={() => addSuggestion(s)}
                      disabled={addedSuggestions.includes(s)}
                      className={`text-xs font-medium flex-shrink-0 ml-3 ${addedSuggestions.includes(s) ? 'text-gray-300' : 'text-blue-500 hover:text-blue-700'}`}
                    >
                      {addedSuggestions.includes(s) ? 'Added' : 'Add'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Prompt */}
          <div className="flex-shrink-0 border-t border-gray-200">
            <div className="relative">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                  Generated Prompt
                </span>
                <button
                  onClick={copyPrompt}
                  className="text-[10px] font-medium text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="5" width="9" height="9" rx="1"/><path d="M5 11H3a1 1 0 01-1-1V3a1 1 0 011-1h7a1 1 0 011 1v2"/></svg>
                  Copy Prompt
                </button>
              </div>
              <pre className="bg-gray-950 text-green-400 font-mono text-xs p-4 max-h-32 overflow-y-auto scrollbar-hide whitespace-pre-wrap">
                {prompt}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
