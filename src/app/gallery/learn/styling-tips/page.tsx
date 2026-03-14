import { Metadata } from 'next'
import LearnTOC from '@/components/gallery/LearnTOC'
import Callout from '@/components/gallery/learn/Callout'
import CodeBlock from '@/components/gallery/learn/CodeBlock'

export const metadata: Metadata = {
  title: 'Styling Your LO Website | Learn',
  description: 'Color psychology, themes, and styling best practices for loan officer websites.',
}

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'color-psychology', label: 'Color Psychology' },
  { id: 'light-vs-dark', label: 'Light vs Dark' },
  { id: 'style-approaches', label: 'Style Approaches' },
  { id: 'matching-brand', label: 'Matching Your Brand' },
  { id: 'shadows-depth', label: 'Shadows & Depth' },
  { id: 'best-practices', label: 'Best Practices' },
]

export default function StylingTipsPage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Styling Your LO Website</h1>
        <p className="text-gray-500 text-sm mb-8">Use color, contrast, and design to build trust and convert visitors.</p>

        <h2 id="overview" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Overview</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          The visual style of your website shapes how borrowers perceive you before they read a single word. In mortgage, the right styling choices communicate trust, professionalism, and stability — the qualities borrowers look for in a loan officer.
        </p>

        <h2 id="color-psychology" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Color Psychology</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Colors trigger emotional responses. Here is what works best in the mortgage industry:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong className="text-blue-600">Blue</strong> — Trust, reliability, security. The most popular color in finance and banking for a reason. Navy blue conveys authority.</li>
          <li><strong className="text-green-600">Green</strong> — Approval, growth, money. Great for CTAs and success states. &quot;You&apos;re approved!&quot; messaging.</li>
          <li><strong className="text-gray-800">Navy / Dark Blue</strong> — Authority, sophistication, stability. Excellent for headers and primary brand color.</li>
          <li><strong className="text-orange-500">Orange / Gold</strong> — Energy, warmth, urgency. Use sparingly for CTAs and highlights.</li>
          <li><strong className="text-gray-500">White / Light Gray</strong> — Cleanliness, simplicity, transparency. Ideal for backgrounds.</li>
        </ul>

        <Callout type="tip" title="Color Palette Formula">
          <p>Start with a primary color (navy/blue), add a CTA color (green/orange), and keep backgrounds light. This 3-color approach covers 90% of mortgage websites beautifully.</p>
        </Callout>

        <CodeBlock
          code={`/* Recommended mortgage color palette */
:root {
  --primary: #1e3a5f;     /* Navy - headers, nav */
  --cta: #2d8c4e;         /* Green - buttons, success */
  --accent: #e8913a;      /* Gold - highlights */
  --bg: #ffffff;          /* White - backgrounds */
  --text: #374151;        /* Gray-700 - body text */
  --text-light: #6b7280;  /* Gray-500 - secondary text */
}`}
          language="css"
        />

        <h2 id="light-vs-dark" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Light vs Dark Themes</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          For mortgage websites, <strong>light themes are almost always the better choice</strong>. Here is why:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Light themes</strong> — Clean, transparent, trustworthy. Borrowers associate light backgrounds with openness and honesty. Best for most LOs.</li>
          <li><strong>Dark themes</strong> — Modern, bold, luxury. Can work for high-net-worth lending or jumbo loan specialists, but harder to get right.</li>
        </ul>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          If you go with a dark theme, ensure text contrast is excellent and your headshot has a clean cutout that works on dark backgrounds.
        </p>

        <h2 id="style-approaches" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Style Approaches</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Different style approaches suit different LO personalities:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Clean & Minimal</strong> — White space, simple typography, few colors. Best for building trust quickly.</li>
          <li><strong>Bold & Modern</strong> — Strong colors, large headlines, dynamic layouts. Good for standing out in competitive markets.</li>
          <li><strong>Classic & Traditional</strong> — Serif fonts, muted colors, elegant layouts. Works well for established LOs and luxury lending.</li>
          <li><strong>Warm & Personal</strong> — Earth tones, friendly fonts, personal photos. Great for community-focused LOs.</li>
        </ul>

        <h2 id="matching-brand" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Matching Your Brand</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          If your brokerage or lender has brand guidelines, align your website with them:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Use your company&apos;s primary and secondary colors</li>
          <li>Match the font family if specified in brand guidelines</li>
          <li>Include your company logo in the appropriate size and placement</li>
          <li>Maintain consistency between your website, business cards, and social profiles</li>
        </ul>

        <h2 id="shadows-depth" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Shadows & Depth</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Subtle shadows and depth create a polished, modern feel:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Use soft box shadows on cards and form elements</li>
          <li>Add subtle shadows to your headshot image</li>
          <li>Elevate CTA buttons slightly with shadows on hover</li>
          <li>Keep shadows light and consistent — heavy shadows look dated</li>
        </ul>

        <CodeBlock
          code={`/* Subtle shadow examples */
.card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
.btn-cta {
  box-shadow: 0 2px 8px rgba(45, 140, 78, 0.3);
}`}
          language="css"
        />

        <h2 id="best-practices" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Best Practices</h2>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Stick to 2-3 colors maximum for a cohesive look</li>
          <li>Maintain consistent spacing and padding throughout</li>
          <li>Use high-quality images — pixelated photos destroy credibility</li>
          <li>Ensure sufficient color contrast for accessibility (WCAG 2.1 AA)</li>
          <li>Test your design across browsers (Chrome, Safari, Firefox)</li>
          <li>Print your business card next to your website — they should feel like the same brand</li>
        </ul>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
