import { Metadata } from 'next'
import LearnTOC from '@/components/gallery/LearnTOC'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | LoanGraphs Templates',
  description: 'Quick answers to common questions about LoanGraphs Templates.',
}

const faqs = [
  {
    id: 'nmls-compliant',
    question: 'Is LoanGraphs Templates NMLS compliant?',
    answer: 'Yes — all templates include fields for NMLS#, company disclosure, and equal housing lender logo placement. You\'re responsible for your state-specific disclosures.',
  },
  {
    id: 'custom-domain',
    question: 'Can I use my own domain?',
    answer: 'Yes. Pro plan includes custom domain. Point your CNAME to yoursite.loangraphs.com and we provision SSL automatically.',
  },
  {
    id: 'setup-time',
    question: 'How long does setup take?',
    answer: 'Most LOs are live within 30 minutes. Domain propagation adds up to 48 hours.',
  },
  {
    id: 'mobile',
    question: 'Will my site work on mobile?',
    answer: 'All templates are mobile-first. Tested on iOS and Android.',
  },
  {
    id: 'rates',
    question: 'Can I show my current rates?',
    answer: 'Yes — you can manually update rates or request a rate widget integration. Note: displayed rates must comply with your state\'s advertising regulations.',
  },
  {
    id: 'leads',
    question: 'What happens to my leads?',
    answer: 'Leads are emailed to you immediately and stored in your LoanGraphs dashboard. Pro plan includes CRM webhook integrations.',
  },
  {
    id: 'multiple-sites',
    question: 'Can I have multiple LO sites?',
    answer: 'Yes — each Pro seat supports one custom domain. Contact us for team/brokerage plans.',
  },
  {
    id: 'developer',
    question: 'Do I need a web developer?',
    answer: 'No. Everything is point-and-click. If you can update a LinkedIn profile, you can manage your LoanGraphs site.',
  },
  {
    id: 'free-vs-pro',
    question: 'What\'s the difference between Free and Pro?',
    answer: 'Free: 3 templates, LoanGraphs subdomain, basic lead capture. Pro ($29/mo): all 9 templates, custom domain, CRM integrations, priority support.',
  },
  {
    id: 'cancel',
    question: 'How do I cancel?',
    answer: 'Cancel anytime from your dashboard. No contracts, no cancellation fees.',
  },
  {
    id: 'security',
    question: 'Is my data secure?',
    answer: 'Yes. SSL on all sites, data encrypted at rest, SOC 2 compliant infrastructure.',
  },
]

const tocItems = faqs.map((faq) => ({ id: faq.id, label: faq.question }))

export default function FAQPage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-500 text-sm mb-8">Quick answers to common questions about LoanGraphs Templates.</p>

        <div className="divide-y divide-gray-100">
          {faqs.map((faq) => (
            <div key={faq.id} id={faq.id} className="py-6 first:pt-0">
              <h3 className="text-base font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
