'use client'

import { useState } from 'react'

export default function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-4">
      <div className="bg-gray-950 rounded-lg p-4 overflow-x-auto">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 text-[10px] text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded transition-colors opacity-0 group-hover:opacity-100"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <pre className="text-green-400 font-mono text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
      {language && (
        <span className="absolute bottom-2 right-3 text-[10px] text-gray-600">{language}</span>
      )}
    </div>
  )
}
