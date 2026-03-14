import { Metadata } from 'next'
import LearnTOC from '@/components/gallery/LearnTOC'
import Callout from '@/components/gallery/learn/Callout'

export const metadata: Metadata = {
  title: 'Typography Tips for LO Websites | Learn',
  description: 'Choose the right fonts and typography for your loan officer website.',
}

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'font-choices', label: 'Font Choices' },
  { id: 'type-hierarchy', label: 'Type Hierarchy' },
  { id: 'readability', label: 'Readability' },
  { id: 'trust', label: 'Typography for Trust' },
  { id: 'mobile-typography', label: 'Mobile Typography' },
  { id: 'dos-and-donts', label: "Do's and Don'ts" },
]

export default function TypographyTipsPage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Typography Tips for LO Websites</h1>
        <p className="text-gray-500 text-sm mb-8">The right fonts build trust and guide visitors through your site.</p>

        <h2 id="overview" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Overview</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Typography is more than just picking a font — it sets the tone for your entire website. In mortgage, where trust and professionalism are everything, the right typography choices can make the difference between a visitor who stays and one who bounces.
        </p>

        <h2 id="font-choices" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Font Choices</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          For loan officer websites, stick with clean, professional fonts. Here are proven pairings:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Inter + Inter</strong> — Clean, modern, highly readable. Great all-around choice.</li>
          <li><strong>Playfair Display + Source Sans Pro</strong> — Elegant headings with readable body text. Luxury feel.</li>
          <li><strong>Montserrat + Open Sans</strong> — Bold, confident headings with friendly body text.</li>
          <li><strong>Lora + Roboto</strong> — Traditional serif headings with modern body text. Trustworthy.</li>
        </ul>

        <Callout type="tip" title="Keep It Simple">
          <p>Use a maximum of 2 fonts — one for headings and one for body text. More than that creates visual chaos and slows down your page.</p>
        </Callout>

        <h2 id="type-hierarchy" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Type Hierarchy</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          A clear type hierarchy guides visitors through your content. Use size, weight, and spacing to create visual levels:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>H1 (Hero headline):</strong> 36-48px, bold. One per page.</li>
          <li><strong>H2 (Section headers):</strong> 24-30px, semibold. Loan products, about, testimonials.</li>
          <li><strong>H3 (Sub-sections):</strong> 18-20px, medium. Individual loan types, FAQ items.</li>
          <li><strong>Body text:</strong> 16px, regular weight. Your bio, descriptions, disclaimers.</li>
          <li><strong>Small text:</strong> 12-14px. Compliance disclaimers, footer text, captions.</li>
        </ul>

        <h2 id="readability" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Readability</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Your visitors are busy. Make your text easy to scan and read:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Line height:</strong> Use 1.5-1.7x the font size for body text</li>
          <li><strong>Line length:</strong> Keep lines to 50-75 characters for comfortable reading</li>
          <li><strong>Contrast:</strong> Dark text on light backgrounds (or vice versa). Minimum 4.5:1 ratio.</li>
          <li><strong>Paragraph length:</strong> Short paragraphs (2-3 sentences). Use bullet points for lists.</li>
          <li><strong>White space:</strong> Do not crowd your text. Generous margins and padding.</li>
        </ul>

        <h2 id="trust" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Typography for Trust</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          In the mortgage industry, trust is everything. Your typography choices signal professionalism:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Serif fonts</strong> (like Lora or Playfair) convey tradition, authority, and trustworthiness</li>
          <li><strong>Sans-serif fonts</strong> (like Inter or Montserrat) convey modernity, clarity, and approachability</li>
          <li>Avoid decorative, script, or novelty fonts — they undermine credibility</li>
          <li>Consistent font usage across all pages signals attention to detail</li>
        </ul>

        <Callout type="warning" title="Avoid These">
          <p>Never use Comic Sans, Papyrus, or heavily stylized fonts for a mortgage website. They instantly reduce perceived professionalism and trustworthiness.</p>
        </Callout>

        <h2 id="mobile-typography" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Mobile Typography</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Font sizes that look great on desktop often need adjustment for mobile:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Body text should be at least 16px on mobile (prevents iOS zoom on input focus)</li>
          <li>Headlines can scale down — 28-36px is usually sufficient on mobile</li>
          <li>Increase line height slightly on mobile for easier reading</li>
          <li>Test text wrapping — long words like &quot;pre-qualification&quot; may break awkwardly</li>
        </ul>

        <h2 id="dos-and-donts" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Do&apos;s and Don&apos;ts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Callout type="success" title="Do">
            <ul className="list-disc list-inside space-y-1">
              <li>Use professional, readable fonts</li>
              <li>Maintain consistent hierarchy</li>
              <li>Ensure high contrast ratios</li>
              <li>Test on multiple devices</li>
              <li>Use font loading optimization</li>
            </ul>
          </Callout>
          <Callout type="warning" title="Don't">
            <ul className="list-disc list-inside space-y-1">
              <li>Use more than 2 font families</li>
              <li>Set body text below 14px</li>
              <li>Use all-caps for long text</li>
              <li>Rely on thin font weights</li>
              <li>Ignore compliance text sizing</li>
            </ul>
          </Callout>
        </div>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
