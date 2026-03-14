'use client'

import { useEffect, useState } from 'react'

interface TOCItem {
  id: string
  label: string
}

export default function LearnTOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <aside className="w-[200px] shrink-0 hidden xl:block h-[calc(100vh-48px)] sticky top-12 overflow-y-auto">
      <div className="py-6 px-4">
        <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
          On this page
        </h4>
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-xs transition-colors ${
                  activeId === item.id
                    ? 'text-black font-medium'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
