'use client'

import { useState } from 'react'
import Link from 'next/link'
import stockData from '@/data/stock-data.json'

interface TemplateSwitcherProps {
  currentTemplate: string
  viewMode: string
}

export function TemplateSwitcher({ currentTemplate, viewMode }: TemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <div className="container-fluid py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm font-semibold text-gray-700">Template:</div>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <span className="text-sm font-medium">
                {stockData.templates.find(t => t.id === currentTemplate)?.name || 'Select Template'}
              </span>
              <span className="text-xs">▼</span>
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg z-50 w-48">
                {stockData.templates.map(template => (
                  <Link
                    key={template.id}
                    href={`/${template.id}/${viewMode}`}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 text-sm border-b last:border-b-0 hover:bg-blue-50 transition ${
                      currentTemplate === template.id ? 'bg-blue-100 font-semibold text-primary' : ''
                    }`}
                  >
                    {template.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <Link
              href={`/${currentTemplate}/loan-officer`}
              className={`px-3 py-2 rounded text-sm font-medium transition ${
                viewMode === 'loan-officer'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              LO View
            </Link>
            <Link
              href={`/${currentTemplate}/company`}
              className={`px-3 py-2 rounded text-sm font-medium transition ${
                viewMode === 'company'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Company View
            </Link>
          </div>

          {/* CTA Button */}
          <a
            href="https://loangraphs.com/signup"
            className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm whitespace-nowrap"
          >
            Get This Template
          </a>
        </div>
      </div>
    </div>
  )
}
