'use client'

import { templatesMeta } from '@/data/templates-meta'
import Image from 'next/image'

interface StepTemplatePickerProps {
  selectedTemplate: string
  setSelectedTemplate: (id: string) => void
  onNext: () => void
}

export default function StepTemplatePicker({
  selectedTemplate,
  setSelectedTemplate,
  onNext,
}: StepTemplatePickerProps) {
  const selectedTemplateMeta = templatesMeta.find((t) => t.id === selectedTemplate)

  return (
    <div className="text-center">
      {/* Header */}
      <h1 className="text-4xl font-medium tracking-tight text-slate-900 mb-3">
        Choose Your Template
      </h1>
      <p className="text-slate-500 text-lg font-light mb-12">
        You can change this anytime.
      </p>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {templatesMeta.map((template) => {
          const isSelected = template.id === selectedTemplate

          return (
            <div
              key={template.id}
              className={`relative cursor-pointer rounded-xl overflow-hidden transition-all ${
                isSelected ? 'ring-2 ring-slate-900 ring-offset-2' : ''
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              {/* Template Image */}
              <div className="relative aspect-[3/4] bg-slate-100">
                <Image
                  src={template.thumbnail}
                  alt={template.name}
                  fill
                  className="object-cover"
                />

                {/* Selected Checkmark */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}

                {/* Preview Link (on hover) */}
                <a
                  href={`/templates/${template.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 opacity-0 hover:opacity-100 transition-opacity text-xs text-white bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  Preview ↗
                </a>
              </div>

              {/* Template Name & Badge */}
              <div className="p-3 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {template.name}
                  </span>
                  {template.tier === 'pro' && (
                    <span className="bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-full ml-2">
                      PRO
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <button
        onClick={onNext}
        className="bg-slate-900 text-white rounded-full px-8 py-3 text-sm font-medium hover:bg-slate-800 transition-colors"
      >
        Continue with {selectedTemplateMeta?.name} →
      </button>
    </div>
  )
}
