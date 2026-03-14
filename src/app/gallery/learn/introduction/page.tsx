import { Metadata } from 'next'
import LearnTOC from '@/components/gallery/LearnTOC'
import Callout from '@/components/gallery/learn/Callout'

export const metadata: Metadata = {
  title: 'Introduction to LoanGraphs Templates | Learn',
  description: 'Get started with LoanGraphs Templates — free professional websites for loan officers.',
}

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'templates', label: 'Templates' },
  { id: 'customization', label: 'Customization' },
  { id: 'going-live', label: 'Going Live' },
  { id: 'next-steps', label: 'Next Steps' },
]

export default function IntroductionPage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Introduction to LoanGraphs Templates</h1>
        <p className="text-gray-500 text-sm mb-8">Everything you need to launch your professional loan officer website.</p>

        <h2 id="overview" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Overview</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          LoanGraphs Templates gives you a library of professionally designed, mobile-optimized website templates built specifically for mortgage loan officers. Whether you are an independent broker, part of a large lender, or just starting out, these templates help you look polished and attract borrowers from day one.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Every template is designed with the mortgage industry in mind — lead capture forms, NMLS compliance footers, rate displays, testimonial sections, and more. No coding required.
        </p>

        <h2 id="getting-started" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Getting Started</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Getting your website live takes just a few steps:
        </p>
        <ol className="list-decimal list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Browse templates</strong> — Pick a design that matches your brand and style.</li>
          <li><strong>Customize</strong> — Add your headshot, NMLS number, bio, rates, and contact info.</li>
          <li><strong>Preview</strong> — See how your site looks on desktop and mobile.</li>
          <li><strong>Go live</strong> — Publish to a free LoanGraphs subdomain or connect your own domain.</li>
        </ol>

        <Callout type="tip" title="Pro Tip">
          <p>Start with a template that is closest to your vision — it is much faster to tweak a great starting point than to build from scratch.</p>
        </Callout>

        <h2 id="templates" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Templates</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          LoanGraphs offers both <strong>Free</strong> and <strong>Pro</strong> templates:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Free templates</strong> — Fully functional designs included with every LoanGraphs account. Perfect for getting started quickly.</li>
          <li><strong>Pro templates</strong> — Premium designs with advanced layouts, animations, and conversion-optimized sections. Available with a LoanGraphs Pro subscription.</li>
        </ul>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          All templates include responsive design, lead capture, NMLS-compliant footers, and SEO-friendly markup.
        </p>

        <h2 id="customization" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Customization</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Every template is fully customizable through the LoanGraphs dashboard. Change colors, fonts, images, text, and layout sections without touching any code. You can also add custom CSS if you want deeper control.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Key customization areas include your personal info, bio, loan products, rates display, testimonials, and call-to-action buttons. See the <a href="/learn/how-to-customize" className="text-blue-600 hover:underline">How to Customize</a> guide for a full walkthrough.
        </p>

        <h2 id="going-live" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Going Live</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          When you are ready to publish, you have two options:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Free subdomain</strong> — Your site is available at <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">yourname.loangraphs.com</code> instantly.</li>
          <li><strong>Custom domain</strong> — Connect your own domain (e.g., <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">www.johndoeloans.com</code>) for a professional look. See the <a href="/learn/custom-domain" className="text-blue-600 hover:underline">Custom Domain</a> guide.</li>
        </ul>

        <h2 id="next-steps" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Next Steps</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Ready to build your site? Here is where to go next:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><a href="/learn/how-to-customize" className="text-blue-600 hover:underline">How to Customize</a> — Step-by-step customization guide</li>
          <li><a href="/learn/tips-for-customizing" className="text-blue-600 hover:underline">Tips for Customizing</a> — Best practices for making your template shine</li>
          <li><a href="/learn/custom-domain" className="text-blue-600 hover:underline">Custom Domain</a> — Connect your own domain name</li>
          <li><a href="/learn/typography-tips" className="text-blue-600 hover:underline">Typography Tips</a> — Choose the right fonts for trust and readability</li>
        </ul>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
