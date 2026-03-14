import { Metadata } from 'next'
import LearnTOC from '@/components/gallery/LearnTOC'
import Callout from '@/components/gallery/learn/Callout'

export const metadata: Metadata = {
  title: 'Layout Options for Your LO Website | Learn',
  description: 'Best layout practices for loan officer websites — hero, about, products, testimonials, and compliance.',
}

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'hero-section', label: 'Hero Section' },
  { id: 'about-section', label: 'About Section' },
  { id: 'loan-products', label: 'Loan Products' },
  { id: 'rates-section', label: 'Rates Section' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact-cta', label: 'Contact / CTA' },
  { id: 'footer', label: 'Footer' },
  { id: 'responsive', label: 'Responsive Layouts' },
  { id: 'compliance', label: 'Compliance Reminder' },
]

export default function LayoutTipsPage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Layout Options for Your LO Website</h1>
        <p className="text-gray-500 text-sm mb-8">Structure your website for maximum impact and lead conversion.</p>

        <h2 id="overview" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Overview</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          The layout of your website determines the flow of information and where visitors focus their attention. A well-structured LO website guides borrowers from awareness to action — learning who you are, what you offer, and how to get started.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Here is the recommended section order for maximum conversion, along with tips for each section.
        </p>

        <h2 id="hero-section" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Hero Section</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          The hero is the first thing visitors see — it must capture attention in under 3 seconds.
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Headline:</strong> Clear, benefit-focused statement with your location and specialty</li>
          <li><strong>Subheadline:</strong> 1-2 sentences expanding on your value proposition</li>
          <li><strong>CTA button:</strong> High-contrast, action-oriented (&quot;Get My Rate Quote&quot;)</li>
          <li><strong>Headshot:</strong> Professional photo — borrowers want to see who they are working with</li>
          <li><strong>Trust badges:</strong> NMLS number, years of experience, review rating</li>
        </ul>

        <Callout type="tip" title="Hero Layout Options">
          <p>Split layout (text left, photo right) performs best for LO websites. Full-width image backgrounds can work but make sure text remains highly readable.</p>
        </Callout>

        <h2 id="about-section" className="text-xl font-semibold text-gray-900 mt-10 mb-3">About Section</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          The about section builds personal connection and trust:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Lead with your experience and number of families helped</li>
          <li>Mention specialties (first-time buyers, VA, jumbo, etc.)</li>
          <li>Add a personal touch — community involvement, family, hobbies</li>
          <li>Keep it to 2-3 paragraphs maximum</li>
          <li>Include a larger photo or different angle than the hero</li>
        </ul>

        <h2 id="loan-products" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Loan Products Section</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Display your loan products in a card or grid layout. Each product card should include:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Product name:</strong> Conventional, FHA, VA, USDA, Jumbo, etc.</li>
          <li><strong>Brief description:</strong> 1-2 sentences about who it is for</li>
          <li><strong>Key benefit:</strong> Down payment amount, qualification flexibility, etc.</li>
          <li><strong>Icon or illustration:</strong> Visual identifier for each product type</li>
        </ul>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          A 2-column or 3-column grid works well for loan products. On mobile, stack them vertically.
        </p>

        <h2 id="rates-section" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Rates Section</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Rates attract visitors but require careful compliance. Options:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Live rate widget:</strong> Embed from your rate engine (LoanGraphs provides this)</li>
          <li><strong>General messaging:</strong> &quot;Competitive rates — check today&apos;s rates&quot; with a CTA to your rate tool</li>
          <li><strong>Rate comparison table:</strong> If displaying specific rates, include APR, assumptions, and all required disclaimers</li>
        </ul>

        <Callout type="warning" title="Compliance Required">
          <p>Displaying specific rates triggers TILA/Reg Z requirements for APR disclosure, rate assumptions, and fees. When in doubt, link to your rate engine instead of displaying static rates.</p>
        </Callout>

        <h2 id="testimonials" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Testimonials</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Testimonials are your most powerful conversion tool. Layout options:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Card grid:</strong> 2-3 testimonials displayed in cards with name, initials, and loan type</li>
          <li><strong>Carousel/slider:</strong> Cycle through testimonials. Good for 5+ reviews.</li>
          <li><strong>Featured quote:</strong> One large, impactful quote with a subtle background</li>
          <li><strong>Star rating:</strong> Display your aggregate Google/Zillow rating alongside individual quotes</li>
        </ul>

        <h2 id="contact-cta" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Contact / CTA Section</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          The final push before the footer. This is where visitors decide to reach out:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Lead capture form (name, email, phone, loan type)</li>
          <li>Direct phone number (clickable tap-to-call)</li>
          <li>Email address</li>
          <li>Office location or service area</li>
          <li>Calendar booking link (if you use Calendly or similar)</li>
        </ul>

        <h2 id="footer" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Footer</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          The footer is critical for compliance and credibility. Required elements:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>NMLS disclosure:</strong> Your individual NMLS ID and company NMLS ID</li>
          <li><strong>Equal Housing logo:</strong> Equal Housing Lender or Equal Housing Opportunity logo</li>
          <li><strong>Company legal name:</strong> As registered with the NMLS</li>
          <li><strong>Licensing states:</strong> States where you are licensed to originate</li>
          <li><strong>Privacy policy link:</strong> Required by most compliance frameworks</li>
          <li><strong>Contact information:</strong> Phone, email, physical address</li>
        </ul>

        <Callout type="warning" title="NMLS Compliance">
          <p>Federal and state regulations require NMLS numbers and Equal Housing disclosures on all LO marketing materials, including websites. Missing these can result in compliance violations and fines.</p>
        </Callout>

        <h2 id="responsive" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Responsive Layouts</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Over 70% of borrowers browse on mobile. Responsive considerations:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Multi-column grids should stack to single column on mobile</li>
          <li>Hero section: stack vertically (headline above photo)</li>
          <li>Navigation: hamburger menu on mobile</li>
          <li>CTAs: full-width buttons on small screens</li>
          <li>Testimonial carousels: swipeable on touch devices</li>
          <li>Forms: single column, large tap targets (minimum 44px)</li>
        </ul>

        <h2 id="compliance" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Compliance Reminder</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Every section of your website should be reviewed for compliance:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>No guaranteed rate promises or misleading rate advertising</li>
          <li>NMLS numbers displayed in footer and about section</li>
          <li>Equal Housing disclosure visible</li>
          <li>Testimonials are genuine and unsolicited (RESPA)</li>
          <li>Rate displays include APR and required assumptions (TILA/Reg Z)</li>
          <li>State-specific disclaimers if required by your licensing states</li>
        </ul>

        <Callout type="info" title="Stay Current">
          <p>Compliance requirements change. Review your website quarterly and after any regulatory updates. Consider having your compliance department or attorney review your site annually.</p>
        </Callout>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
