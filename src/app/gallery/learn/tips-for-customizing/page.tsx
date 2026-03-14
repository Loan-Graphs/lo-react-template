import { Metadata } from 'next'
import LearnTOC from '@/components/gallery/LearnTOC'
import Callout from '@/components/gallery/learn/Callout'

export const metadata: Metadata = {
  title: 'Tips for Customizing Your Template | Learn',
  description: 'Best practices and tips for customizing your LoanGraphs loan officer website template.',
}

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'headshot', label: 'Your Headshot Matters' },
  { id: 'headline', label: 'Writing Your Headline' },
  { id: 'ctas', label: 'Effective CTAs' },
  { id: 'social-proof', label: 'Social Proof' },
  { id: 'mobile', label: 'Mobile Optimization' },
  { id: 'seo', label: 'Basic SEO' },
  { id: 'brand-consistency', label: 'Brand Consistency' },
]

export default function TipsPage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tips for Customizing Your Template</h1>
        <p className="text-gray-500 text-sm mb-8">Practical advice to make your LO website convert visitors into leads.</p>

        <h2 id="overview" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Overview</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          A great template is just the starting point. How you customize it determines whether visitors become leads. These tips are based on what works for top-performing loan officer websites.
        </p>

        <h2 id="headshot" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Your Headshot Matters</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Mortgage is a people business. Borrowers want to see who they are trusting with the biggest financial decision of their life.
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Use a professional, well-lit headshot — not a selfie or group photo</li>
          <li>Dress professionally but approachably</li>
          <li>Smile naturally — you want to look trustworthy and friendly</li>
          <li>Use a plain or blurred background</li>
          <li>Minimum resolution: 400×400px (square crop preferred)</li>
        </ul>

        <Callout type="tip" title="Investment Worth Making">
          <p>A professional headshot costs $100-200 and dramatically improves your credibility online. It is one of the highest-ROI investments for your personal brand.</p>
        </Callout>

        <h2 id="headline" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Writing Your Headline</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Your headline is the first text visitors read. Make it clear, specific, and benefit-focused.
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Good:</strong> &quot;Helping Arizona Families Find Their Perfect Home Loan&quot;</li>
          <li><strong>Good:</strong> &quot;Your Trusted Mortgage Advisor in Dallas-Fort Worth&quot;</li>
          <li><strong>Avoid:</strong> &quot;Welcome to My Website&quot; (generic, says nothing)</li>
          <li><strong>Avoid:</strong> &quot;Lowest Rates Guaranteed!&quot; (compliance risk)</li>
        </ul>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Include your location and specialty when possible. This helps with SEO and immediately tells visitors you are relevant to them.
        </p>

        <h2 id="ctas" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Effective CTAs</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Every page should have a clear call-to-action (CTA). The best CTAs are specific and action-oriented:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>&quot;Get My Free Rate Quote&quot;</li>
          <li>&quot;Start My Pre-Approval&quot;</li>
          <li>&quot;Schedule a Free Consultation&quot;</li>
          <li>&quot;Check Today&apos;s Rates&quot;</li>
        </ul>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Place your primary CTA in the hero section, and repeat it after testimonials and at the bottom of the page. Make buttons high-contrast and large enough to tap on mobile.
        </p>

        <h2 id="social-proof" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Social Proof</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Borrowers trust other borrowers. Add social proof throughout your site:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Client testimonials (3-5 is ideal)</li>
          <li>Google/Zillow review rating badge</li>
          <li>Number of families helped or loans closed</li>
          <li>Years of experience</li>
          <li>Industry awards or certifications</li>
        </ul>

        <h2 id="mobile" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Mobile Optimization</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Over <strong>70% of borrowers</strong> will visit your website from a mobile device. Every LoanGraphs template is mobile-responsive by default, but you should still check:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Text is readable without zooming</li>
          <li>Buttons are large enough to tap (minimum 44px)</li>
          <li>Forms are easy to fill out on a phone</li>
          <li>Your phone number is clickable (tap-to-call)</li>
          <li>Images load quickly on mobile networks</li>
        </ul>

        <Callout type="warning" title="Mobile First">
          <p>Always preview your site on a phone before publishing. What looks great on desktop might be cramped or broken on mobile.</p>
        </Callout>

        <h2 id="seo" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Basic SEO</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Simple SEO practices help borrowers find you on Google. Focus on these basics:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Page title:</strong> Include your city + &quot;mortgage&quot; + your name (e.g., &quot;Dallas Mortgage Lender - John Doe&quot;)</li>
          <li><strong>Meta description:</strong> Write a compelling 150-character summary</li>
          <li><strong>Headings:</strong> Use your target keywords naturally in H1 and H2 tags</li>
          <li><strong>Alt text:</strong> Describe your images for accessibility and SEO</li>
          <li><strong>Google Business Profile:</strong> Link your website from your Google Business listing</li>
        </ul>

        <h2 id="brand-consistency" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Brand Consistency</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Your website should feel like an extension of your overall brand. Keep these elements consistent:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Same headshot across your website, social media, and business cards</li>
          <li>Consistent color palette (match your company branding if applicable)</li>
          <li>Same tone of voice in your bio, testimonial requests, and social posts</li>
          <li>Professional email that matches your domain</li>
        </ul>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
