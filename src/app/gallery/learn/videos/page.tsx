import { Metadata } from 'next'
import Link from 'next/link'
import LearnTOC from '@/components/gallery/LearnTOC'

export const metadata: Metadata = {
  title: 'Video Tutorials | LoanGraphs Templates',
  description: 'Watch video tutorials on customizing your LoanGraphs template, setting up your domain, and more.',
}

const videos = [
  {
    title: 'How to Customize Your Template',
    description: 'Walk through every customization option — from headshot to lead capture.',
    href: '/learn/videos/how-to-customize',
  },
  {
    title: 'Setting Up Your Domain',
    description: 'Buy a domain, configure DNS, and go live with SSL in minutes.',
    href: '/learn/videos/setting-up-domain',
  },
  {
    title: 'Getting Your First Lead',
    description: 'Set up lead capture forms and connect your CRM for instant notifications.',
    href: '/learn/videos/getting-your-first-lead',
  },
  {
    title: 'LO Website Best Practices',
    description: 'What the best loan officer websites have in common — and how to match them.',
    href: '/learn/videos/lo-website-best-practices',
  },
  {
    title: 'Writing a Bio That Converts',
    description: 'The formula for a bio that builds trust and drives applications.',
    href: '/learn/videos/writing-your-bio',
  },
  {
    title: 'Adding Testimonials the Right Way',
    description: 'Stay RESPA-compliant while showcasing social proof that converts.',
    href: '/learn/videos/adding-testimonials',
  },
  {
    title: 'Going Live Checklist',
    description: 'Everything to check before sharing your site with the world.',
    href: '/learn/videos/going-live-checklist',
  },
  {
    title: 'Understanding Your Analytics',
    description: 'Track traffic, conversions, and ROI with simple analytics tools.',
    href: '/learn/videos/understanding-analytics',
  },
]

const tocItems = [{ id: 'videos', label: 'All Videos' }]

export default function VideosIndexPage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Video Tutorials</h1>
        <p className="text-gray-500 text-sm mb-8">
          Step-by-step video guides to help you get the most out of your LoanGraphs template.
        </p>

        <div id="videos" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div key={video.href} className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="bg-gray-900 aspect-video flex items-center justify-center relative">
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="inline-flex items-center rounded-full bg-gray-700 px-2.5 py-0.5 text-[10px] font-medium text-gray-300">
                    Coming Soon
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{video.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{video.description}</p>
                <Link
                  href={video.href}
                  className="inline-block text-xs bg-gray-200 text-gray-400 px-3 py-1.5 rounded-md cursor-not-allowed"
                  aria-disabled="true"
                  tabIndex={-1}
                >
                  Watch
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
