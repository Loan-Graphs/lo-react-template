'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '/learn/introduction' },
      { label: 'How to Customize', href: '/learn/how-to-customize' },
      { label: 'Custom Domain', href: '/learn/custom-domain' },
      { label: 'Tips for Customizing', href: '/learn/tips-for-customizing' },
      { label: 'Typography Tips', href: '/learn/typography-tips' },
      { label: 'Styling Tips', href: '/learn/styling-tips' },
      { label: 'Animation Tips', href: '/learn/animation-tips' },
      { label: 'Layout Tips', href: '/learn/layout-tips' },
    ],
  },
  {
    title: 'Videos',
    items: [
      { label: 'All Videos', href: '/learn/videos' },
      { label: 'How to Customize Your Template', href: '/learn/videos/how-to-customize' },
      { label: 'Setting Up Your Domain', href: '/learn/videos/setting-up-domain' },
      { label: 'Getting Your First Lead', href: '/learn/videos/getting-your-first-lead' },
      { label: 'LO Website Best Practices', href: '/learn/videos/lo-website-best-practices' },
      { label: 'Writing a Bio That Converts', href: '/learn/videos/writing-your-bio' },
      { label: 'Adding Testimonials the Right Way', href: '/learn/videos/adding-testimonials' },
      { label: 'Going Live Checklist', href: '/learn/videos/going-live-checklist' },
      { label: 'Understanding Your Analytics', href: '/learn/videos/understanding-analytics' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'FAQ', href: '/learn/faq' },
      { label: 'Documentation', href: '/learn/documentation' },
    ],
  },
]

export default function LearnSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[240px] shrink-0 border-r border-gray-100 bg-white h-[calc(100vh-48px)] sticky top-12 overflow-y-auto hidden lg:block">
      <nav className="py-6 px-4">
        {navigation.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
              {section.title}
            </h3>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block text-sm px-3 py-1.5 rounded-md transition-colors ${
                        isActive
                          ? 'text-black font-medium border-l-2 border-black bg-gray-50'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
