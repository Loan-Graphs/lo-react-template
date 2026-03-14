import { Metadata } from 'next'
import LearnTOC from '@/components/gallery/LearnTOC'
import Callout from '@/components/gallery/learn/Callout'
import CodeBlock from '@/components/gallery/learn/CodeBlock'

export const metadata: Metadata = {
  title: 'How to Customize Your LO Website | Learn',
  description: 'A complete guide to customizing your LoanGraphs loan officer website template.',
}

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'personal-info', label: 'Personal Info' },
  { id: 'your-bio', label: 'Your Bio' },
  { id: 'rates-loan-products', label: 'Rates & Loan Products' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'lead-capture-form', label: 'Lead Capture Form' },
  { id: 'colors-fonts', label: 'Colors & Fonts' },
  { id: 'best-practices', label: 'Best Practices' },
]

export default function HowToCustomizePage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">How to Customize Your LO Website</h1>
        <p className="text-gray-500 text-sm mb-8">Make the template yours — update every detail to match your brand.</p>

        <h2 id="overview" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Overview</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          After selecting a template, you can customize every section through the LoanGraphs dashboard. This guide walks through each area you should update before publishing your site.
        </p>

        <h2 id="personal-info" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Personal Info</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          The first thing to update is your personal information. This appears in the hero section, header, footer, and contact areas of your site.
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Full name</strong> — As it appears on your license</li>
          <li><strong>Headshot</strong> — Professional photo (at least 400×400px, square crop works best)</li>
          <li><strong>NMLS number</strong> — Required for compliance. Displayed in footer and about section.</li>
          <li><strong>Phone number</strong> — Your direct business line</li>
          <li><strong>Email address</strong> — Professional email (avoid Gmail/Yahoo for credibility)</li>
          <li><strong>Company name</strong> — Your brokerage or lender name</li>
          <li><strong>Company NMLS</strong> — Your company&apos;s NMLS ID</li>
        </ul>

        <Callout type="warning" title="Compliance Note">
          <p>NMLS numbers are required by federal and state regulations. Always display your individual NMLS ID and your company&apos;s NMLS ID on your website.</p>
        </Callout>

        <h2 id="your-bio" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Your Bio</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Your bio tells borrowers why they should work with you. Keep it concise, personal, and focused on the value you bring.
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Lead with years of experience and number of families helped</li>
          <li>Mention your specialties (first-time buyers, VA loans, jumbo, etc.)</li>
          <li>Include a personal touch — family, community involvement, hobbies</li>
          <li>Keep it to 2-3 short paragraphs</li>
        </ul>

        <h2 id="rates-loan-products" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Rates & Loan Products</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          List the loan products you offer so borrowers know their options. Common products to display:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Conventional (Fixed & ARM)</li>
          <li>FHA</li>
          <li>VA</li>
          <li>USDA</li>
          <li>Jumbo</li>
          <li>Non-QM / Bank Statement</li>
          <li>Renovation (203k, HomeStyle)</li>
        </ul>

        <Callout type="warning" title="Rate Display Warning">
          <p>If you display specific rates, you must include APR, assumptions, and disclaimers per TILA/Reg Z. Consider linking to your rate engine or using general messaging like &quot;Competitive rates available&quot; instead.</p>
        </Callout>

        <h2 id="testimonials" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Testimonials</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Social proof is one of the most powerful conversion tools on your website. Add real testimonials from past clients.
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Use real first names and last initials (e.g., &quot;Sarah M.&quot;)</li>
          <li>Include the loan type or situation if possible (&quot;First-time buyer&quot;)</li>
          <li>3-5 testimonials is the sweet spot</li>
          <li>Keep each to 1-3 sentences</li>
        </ul>

        <Callout type="tip" title="RESPA Compliance">
          <p>Under RESPA, you cannot pay for testimonials or provide incentives for reviews. Testimonials must be genuine and unsolicited. Consider pulling from your Google Business, Zillow, or social media reviews.</p>
        </Callout>

        <h2 id="lead-capture-form" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Lead Capture Form</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Every template includes a built-in lead capture form. Customize the fields to match your intake process:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Essential fields:</strong> Name, email, phone</li>
          <li><strong>Optional fields:</strong> Loan type, purchase vs. refinance, property state, estimated credit score</li>
          <li><strong>CTA button text:</strong> Use action-oriented language (&quot;Get My Rate Quote&quot;, &quot;Start My Application&quot;)</li>
        </ul>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Leads are delivered to your email and saved in your LoanGraphs dashboard. You can also integrate with your CRM or LOS.
        </p>

        <h2 id="colors-fonts" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Colors & Fonts</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Adjust colors and fonts to match your personal brand or company guidelines. You can customize:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Primary color</strong> — Used for buttons, links, and accents</li>
          <li><strong>Secondary color</strong> — Used for highlights and secondary actions</li>
          <li><strong>Background</strong> — Light or dark theme</li>
          <li><strong>Heading font</strong> — Choose from professional font pairings</li>
          <li><strong>Body font</strong> — Optimized for readability</li>
        </ul>

        <CodeBlock
          code={`/* Example: Custom color override */
:root {
  --color-primary: #1e3a5f;
  --color-secondary: #2d8c4e;
  --color-accent: #e8913a;
}`}
          language="css"
        />

        <h2 id="best-practices" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Best Practices</h2>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Complete every section before going live — half-finished sites hurt credibility</li>
          <li>Use a professional headshot (not a selfie or group photo)</li>
          <li>Test your site on mobile before publishing</li>
          <li>Ask a colleague to review your bio for typos</li>
          <li>Update your site quarterly with fresh testimonials and current rates info</li>
          <li>Ensure NMLS numbers are visible in the footer</li>
        </ul>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
