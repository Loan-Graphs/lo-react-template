import { Metadata } from 'next'
import LearnTOC from '@/components/gallery/LearnTOC'
import Callout from '@/components/gallery/learn/Callout'
import CodeBlock from '@/components/gallery/learn/CodeBlock'

export const metadata: Metadata = {
  title: 'Connect Your Custom Domain | Learn',
  description: 'How to connect a custom domain to your LoanGraphs loan officer website.',
}

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'getting-a-domain', label: 'Getting a Domain' },
  { id: 'dns-setup', label: 'DNS Setup' },
  { id: 'verification', label: 'Verification' },
  { id: 'ssl', label: 'SSL Certificate' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'best-practices', label: 'Best Practices' },
]

export default function CustomDomainPage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Custom Domain</h1>
        <p className="text-gray-500 text-sm mb-8">Use your own domain name for a professional web presence.</p>

        <h2 id="overview" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Overview</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Every LoanGraphs site comes with a free subdomain (e.g., <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">yourname.loangraphs.com</code>). For a more professional look, you can connect your own custom domain like <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">www.johndoeloans.com</code>.
        </p>

        <h2 id="getting-a-domain" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Getting a Domain</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          If you do not already own a domain, you can purchase one from any domain registrar. We recommend:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Namecheap</strong> — Affordable, simple DNS management</li>
          <li><strong>Google Domains</strong> — Clean interface, easy setup</li>
          <li><strong>Cloudflare</strong> — At-cost pricing with built-in performance</li>
        </ul>

        <Callout type="tip" title="Domain Name Tips for Loan Officers">
          <p>Good domain patterns: <code className="bg-blue-100 px-1 rounded text-xs">yourname + loans/lending/mortgage</code>. Examples: johndoeloans.com, sarahmortgage.com, smithlending.com. Keep it short, memorable, and professional.</p>
        </Callout>

        <h2 id="dns-setup" className="text-xl font-semibold text-gray-900 mt-10 mb-3">DNS Setup</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          After purchasing your domain, add the following DNS records in your registrar&apos;s DNS settings:
        </p>

        <CodeBlock
          code={`# Add a CNAME record for your domain
Type:  CNAME
Name:  www
Value: sites.loangraphs.com
TTL:   3600

# If using root domain (no www), add an A record
Type:  A
Name:  @
Value: 76.76.21.21
TTL:   3600`}
          language="dns"
        />

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Then, in your LoanGraphs dashboard, go to <strong>Settings → Domain</strong> and enter your domain name. Click <strong>Verify</strong> to confirm the DNS records are set up correctly.
        </p>

        <h2 id="verification" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Verification</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Once you have added the DNS records, LoanGraphs will automatically verify your domain. This usually takes a few minutes, but DNS propagation can take up to 48 hours in some cases.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          You will see a green checkmark in your dashboard when the domain is verified and active.
        </p>

        <h2 id="ssl" className="text-xl font-semibold text-gray-900 mt-10 mb-3">SSL Certificate</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          SSL certificates are <strong>automatically provisioned</strong> for all custom domains at no extra cost. Your site will be served over HTTPS with a valid SSL certificate, ensuring borrower data is encrypted and your site displays the secure padlock icon.
        </p>

        <Callout type="success" title="Automatic SSL">
          <p>No action required — your SSL certificate is generated and renewed automatically. Borrowers will see the secure padlock in their browser.</p>
        </Callout>

        <h2 id="troubleshooting" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Troubleshooting</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          If your domain is not connecting, check these common issues:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>DNS propagation</strong> — Changes can take up to 48 hours to fully propagate. Be patient.</li>
          <li><strong>Wrong record type</strong> — Make sure you are using CNAME for <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">www</code> and A record for root domain.</li>
          <li><strong>Conflicting records</strong> — Remove any existing A or CNAME records for the same hostname before adding new ones.</li>
          <li><strong>Nameserver issues</strong> — If you recently transferred your domain, nameservers may still be pointing to the old registrar.</li>
          <li><strong>Proxy disabled</strong> — If using Cloudflare, set the DNS record to &quot;DNS only&quot; (gray cloud) during initial setup.</li>
        </ul>

        <h2 id="best-practices" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Best Practices for LO Domains</h2>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Use a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">.com</code> domain when possible — it is the most trusted TLD</li>
          <li>Avoid hyphens and numbers in your domain name</li>
          <li>Set up both <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">www</code> and root domain — redirect one to the other</li>
          <li>Create a professional email to match (e.g., <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">john@johndoeloans.com</code>)</li>
          <li>Register your domain for 2+ years to signal legitimacy to search engines</li>
        </ul>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
