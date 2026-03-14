'use client';

interface PreviewPaneProps {
  sectionType: string;
  layout: string;
  style: string;
  theme: string;
  accentColor: { label: string; value: string };
  backgroundColor: string;
  fontStyle: string;
  templateName: string;
}

const bgMap: Record<string, string> = {
  White: '#ffffff',
  'Light Gray': '#f3f4f6',
  Slate: '#475569',
  Navy: '#1e3a5f',
  Charcoal: '#1f2937',
};

const fontMap: Record<string, string> = {
  'Sans-serif': "'Inter', -apple-system, sans-serif",
  Serif: "'Georgia', 'Times New Roman', serif",
  Mixed: "'Georgia', serif",
};

function isDark(bg: string): boolean {
  return ['Slate', 'Navy', 'Charcoal'].includes(bg);
}

export default function PreviewPane({
  sectionType,
  layout,
  style,
  theme,
  accentColor,
  backgroundColor,
  fontStyle,
  templateName,
}: PreviewPaneProps) {
  const dark = theme === 'Dark' || isDark(backgroundColor);
  const bg = theme === 'Dark' ? '#111827' : (bgMap[backgroundColor] || '#ffffff');
  const textColor = dark ? '#f9fafb' : '#111827';
  const mutedText = dark ? '#9ca3af' : '#6b7280';
  const cardBg = dark ? '#1f2937' : '#ffffff';
  const cardBorder = dark ? '#374151' : '#e5e7eb';
  const accent = accentColor.value;
  const font = fontMap[fontStyle] || fontMap['Sans-serif'];

  const isMinimal = style === 'Minimal';
  const isBold = style === 'Bold';
  const borderRadius = isMinimal ? '4px' : '8px';
  const headingWeight = isBold ? 800 : style === 'Elegant' ? 300 : 600;
  const headingSize = isBold ? '22px' : '20px';

  const isTwoCol = layout === 'Two Column' || layout === 'Sidebar';
  const isGrid = layout === 'Card Grid';

  return (
    <div
      className="rounded-xl border shadow-sm overflow-hidden"
      style={{
        background: bg,
        color: textColor,
        fontFamily: font,
        minHeight: '400px',
      }}
    >
      {/* Mini browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ borderBottom: `1px solid ${cardBorder}` }}>
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <div className="flex-1 mx-3">
          <div className="bg-gray-100 rounded-full px-3 py-0.5 text-[10px] text-gray-400 text-center" style={{ maxWidth: '200px', margin: '0 auto' }}>
            loangraphs.com/preview
          </div>
        </div>
      </div>

      {/* Preview content */}
      <div className="p-6">
        {/* Template name badge */}
        <div className="mb-4 flex items-center gap-2">
          <span
            className="text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded"
            style={{ background: accent + '20', color: accent }}
          >
            {templateName || 'Template'}
          </span>
          <span className="text-[9px] uppercase tracking-widest" style={{ color: mutedText }}>
            {sectionType} Section
          </span>
        </div>

        {sectionType === 'Hero' && (
          <div className={isTwoCol ? 'flex gap-6 items-center' : ''}>
            <div className={isTwoCol ? 'flex-1' : ''}>
              <h2 style={{ fontSize: headingSize, fontWeight: headingWeight, color: accent, lineHeight: 1.2, marginBottom: '8px' }}>
                Houston&apos;s #1 VA Loan Specialist
              </h2>
              <p style={{ color: mutedText, fontSize: '13px', marginBottom: '4px' }}>
                John Martinez | NMLS# 123456
              </p>
              <p style={{ color: mutedText, fontSize: '11px', marginBottom: '16px' }}>
                Revolve Mortgage — Helping veterans achieve homeownership since 2015
              </p>
              <button
                style={{
                  background: accent,
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '8px 20px',
                  borderRadius,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Get Pre-Approved →
              </button>
              <div className="flex gap-3 mt-4">
                {['📞', '✉️', '💬'].map((icon, i) => (
                  <span key={i} className="text-sm" style={{ opacity: 0.6 }}>{icon}</span>
                ))}
              </div>
            </div>
            {isTwoCol && (
              <div
                className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: accent + '15', border: `2px solid ${accent}` }}
              >
                <svg width="32" height="32" fill={accent} viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" /></svg>
              </div>
            )}
          </div>
        )}

        {sectionType === 'Testimonials' && (
          <div>
            <h2 style={{ fontSize: headingSize, fontWeight: headingWeight, color: accent, marginBottom: '16px' }}>
              What Our Clients Say
            </h2>
            <div className={isGrid || isTwoCol ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
              {[
                { name: 'Sarah M.', text: 'Closed on my first home in 21 days! John made the VA loan process seamless.', stars: 5 },
                { name: 'James R.', text: 'Refinanced and saved $380/mo. Best decision we made this year.', stars: 5 },
                { name: 'Maria L.', text: 'As a first-time buyer, I had so many questions. John was incredibly patient.', stars: 5 },
              ].map((t, i) => (
                <div
                  key={i}
                  className="rounded-lg p-3"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                >
                  <div className="text-yellow-400 text-xs mb-1">{'★'.repeat(t.stars)}</div>
                  <p style={{ fontSize: '11px', color: mutedText, marginBottom: '6px' }}>&ldquo;{t.text}&rdquo;</p>
                  <p style={{ fontSize: '10px', fontWeight: 600, color: textColor }}>— {t.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {sectionType === 'Rates' && (
          <div>
            <h2 style={{ fontSize: headingSize, fontWeight: headingWeight, color: accent, marginBottom: '16px' }}>
              Today&apos;s Rates
            </h2>
            <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: accent + '10' }}>
                    <th className="text-left p-2 font-semibold" style={{ color: accent }}>Product</th>
                    <th className="text-center p-2 font-semibold" style={{ color: accent }}>Rate</th>
                    <th className="text-center p-2 font-semibold" style={{ color: accent }}>APR</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { product: '30-Year Fixed', rate: '6.625%', apr: '6.81%' },
                    { product: '15-Year Fixed', rate: '5.875%', apr: '6.12%' },
                    { product: 'FHA 30-Year', rate: '6.250%', apr: '7.10%' },
                    { product: 'VA 30-Year', rate: '6.000%', apr: '6.35%' },
                  ].map((r, i) => (
                    <tr key={i} style={{ borderTop: `1px solid ${cardBorder}` }}>
                      <td className="p-2" style={{ color: textColor, fontWeight: 500 }}>{r.product}</td>
                      <td className="p-2 text-center" style={{ color: textColor }}>{r.rate}</td>
                      <td className="p-2 text-center" style={{ color: mutedText }}>{r.apr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2" style={{ fontSize: '9px', color: mutedText }}>
              Rates as of today. Subject to change. Contact for personalized quote.
            </p>
          </div>
        )}

        {sectionType === 'About' && (
          <div className={isTwoCol ? 'flex gap-6 items-start' : ''}>
            {isTwoCol && (
              <div
                className="w-24 h-28 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ background: accent + '10', border: `1px solid ${cardBorder}` }}
              >
                <svg width="40" height="40" fill={accent} opacity={0.5} viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" /></svg>
              </div>
            )}
            <div className="flex-1">
              <h2 style={{ fontSize: headingSize, fontWeight: headingWeight, color: accent, marginBottom: '12px' }}>
                About John
              </h2>
              <p style={{ fontSize: '12px', color: mutedText, lineHeight: 1.6, marginBottom: '8px' }}>
                With over 10 years of experience in the mortgage industry, I specialize in helping veterans and first-time homebuyers navigate the loan process with confidence.
              </p>
              <p style={{ fontSize: '12px', color: mutedText, lineHeight: 1.6, marginBottom: '12px' }}>
                Licensed in Texas, Arizona, and Colorado. Proud member of the National Association of Mortgage Brokers.
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="text-[9px] font-semibold px-2 py-1 rounded"
                  style={{ background: accent + '15', color: accent }}
                >
                  NMLS# 123456
                </span>
                <span className="text-[9px]" style={{ color: mutedText }}>Equal Housing Lender</span>
              </div>
            </div>
          </div>
        )}

        {sectionType === 'Contact' && (
          <div>
            <h2 style={{ fontSize: headingSize, fontWeight: headingWeight, color: accent, marginBottom: '16px' }}>
              Ready to Get Started?
            </h2>
            <div className={isTwoCol ? 'grid grid-cols-2 gap-3' : 'space-y-2'}>
              {['Full Name', 'Email Address', 'Phone Number', 'Loan Amount (est.)'].map((field) => (
                <div key={field}>
                  <label className="block mb-0.5" style={{ fontSize: '10px', color: mutedText }}>{field}</label>
                  <div
                    className="rounded px-2 py-1.5"
                    style={{ background: dark ? '#374151' : '#f9fafb', border: `1px solid ${cardBorder}`, fontSize: '11px', color: mutedText }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2">
              <label className="block mb-0.5" style={{ fontSize: '10px', color: mutedText }}>Message</label>
              <div
                className="rounded px-2 py-3"
                style={{ background: dark ? '#374151' : '#f9fafb', border: `1px solid ${cardBorder}` }}
              />
            </div>
            <button
              className="mt-3"
              style={{
                background: accent,
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600,
                padding: '8px 20px',
                borderRadius,
                border: 'none',
                width: '100%',
              }}
            >
              Submit Application
            </button>
          </div>
        )}

        {sectionType === 'Loan Types' && (
          <div>
            <h2 style={{ fontSize: headingSize, fontWeight: headingWeight, color: accent, marginBottom: '16px' }}>
              Loan Programs
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'FHA', desc: 'Low down payment options for qualifying buyers', icon: '🏠' },
                { name: 'VA', desc: 'Zero-down loans for veterans & active military', icon: '🎖️' },
                { name: 'Conventional', desc: 'Traditional financing with competitive rates', icon: '🏦' },
                { name: 'Jumbo', desc: 'High-value loans above conforming limits', icon: '💎' },
              ].map((loan) => (
                <div
                  key={loan.name}
                  className="rounded-lg p-3"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                >
                  <div className="text-lg mb-1">{loan.icon}</div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: textColor, marginBottom: '2px' }}>{loan.name}</p>
                  <p style={{ fontSize: '10px', color: mutedText }}>{loan.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
