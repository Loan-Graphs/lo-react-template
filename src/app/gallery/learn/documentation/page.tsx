import { Metadata } from 'next'
import LearnTOC from '@/components/gallery/LearnTOC'

export const metadata: Metadata = {
  title: 'Documentation | LoanGraphs Templates',
  description: 'Technical reference for LoanGraphs Templates — API, CRM integrations, domain setup, and more.',
}

const tocItems = [
  { id: 'getting-started', label: 'Quick Start' },
  { id: 'api', label: 'API Reference' },
  { id: 'crm-integrations', label: 'CRM Integrations' },
  { id: 'domain-api', label: 'Domain Configuration' },
  { id: 'customization-api', label: 'Customization Fields' },
  { id: 'compliance', label: 'Compliance Fields' },
  { id: 'support', label: 'Support' },
]

export default function DocumentationPage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Documentation</h1>
        <p className="text-gray-500 text-sm mb-8">Technical reference for LoanGraphs Templates.</p>

        <h2 id="getting-started" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Quick Start</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Get your LoanGraphs site live in four steps:
        </p>
        <ol className="list-decimal list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Sign up</strong> — Create your free LoanGraphs account.</li>
          <li><strong>Pick a template</strong> — Browse the template gallery and select your design.</li>
          <li><strong>Customize</strong> — Add your headshot, bio, NMLS number, rates, and contact info.</li>
          <li><strong>Publish</strong> — Go live on your free subdomain or connect a custom domain.</li>
        </ol>

        <h2 id="api" className="text-xl font-semibold text-gray-900 mt-10 mb-3">API Reference</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          LoanGraphs sends lead notifications via webhooks. Configure your endpoint URL in the dashboard settings. When a new lead submits a form on your site, we send a POST request with the following payload:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 overflow-x-auto">
          <pre className="text-xs text-gray-800 font-mono leading-relaxed">{`{
  "event": "new_lead",
  "timestamp": "2026-03-13T18:00:00Z",
  "lead": {
    "name": "Sarah Johnson",
    "email": "sarah@example.com",
    "phone": "713-555-0100",
    "message": "Interested in FHA loan, first-time buyer",
    "source_template": "template-8",
    "site_url": "https://john.loangraphs.com"
  }
}`}</pre>
        </div>

        <h2 id="crm-integrations" className="text-xl font-semibold text-gray-900 mt-10 mb-3">CRM Integrations</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Connect your LoanGraphs leads to your existing CRM. All integrations use webhook URLs configured in your dashboard settings.
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Salesforce</strong> — Web-to-Lead or custom webhook endpoint</li>
          <li><strong>HubSpot</strong> — Native webhook integration</li>
          <li><strong>Encompass</strong> — Webhook relay to Encompass API</li>
          <li><strong>Zapier</strong> — No-code integration for 5,000+ apps</li>
        </ul>

        <h2 id="domain-api" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Domain Configuration</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Connect your custom domain to your LoanGraphs site:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>CNAME setup</strong> — Point your domain&apos;s CNAME record to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">yoursite.loangraphs.com</code></li>
          <li><strong>SSL provisioning</strong> — SSL certificates are automatically provisioned and renewed</li>
          <li><strong>Subdomain options</strong> — Free tier includes a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">yourname.loangraphs.com</code> subdomain</li>
        </ul>

        <h2 id="customization-api" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Customization Fields</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          All editable fields available through the dashboard:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 overflow-x-auto">
          <pre className="text-xs text-gray-800 font-mono leading-relaxed">{`name              — Your display name
bio               — Your professional bio
headshot_url      — Profile photo URL
nmls_number       — Your NMLS ID
phone             — Contact phone number
email             — Contact email address
company_name      — Company / brokerage name
company_nmls      — Company NMLS ID
logo_url          — Company logo URL
rates[]           — Current rate offerings
testimonials[]    — Client testimonials
loan_products[]   — Loan programs offered
social_links{}    — Social media profile URLs`}</pre>
        </div>

        <h2 id="compliance" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Compliance Fields</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Required disclosures included in every template:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>NMLS#</strong> — Individual and company NMLS numbers displayed in footer</li>
          <li><strong>Equal Housing Lender</strong> — Logo and text automatically included</li>
          <li><strong>State licenses</strong> — Configurable state licensing disclosure text</li>
        </ul>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          You are responsible for ensuring your site content meets your state&apos;s specific advertising and disclosure requirements.
        </p>

        <h2 id="support" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Support</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Need help? Reach out to our support team:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Email</strong> — <a href="mailto:support@loangraphs.com" className="text-blue-600 hover:underline">support@loangraphs.com</a></li>
          <li><strong>Pro plan</strong> — Response within 1 business day</li>
          <li><strong>Free plan</strong> — Response within 3 business days</li>
        </ul>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
