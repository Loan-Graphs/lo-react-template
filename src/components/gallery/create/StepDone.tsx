'use client'

import { useState, useEffect } from 'react'

interface StepDoneProps {
  subdomain: string
  templateSlug: string
  formData: {
    name: string
    email: string
    nmls: string
    phone: string
    states: string[]
    primaryColor: string
  }
}

export default function StepDone({ subdomain, templateSlug, formData }: StepDoneProps) {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [token, setToken] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const siteUrl = `https://${subdomain}.loangraphs.me`

  useEffect(() => {
    let cancelled = false

    async function createSite() {
      try {
        const res = await fetch('/api/create-site', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            nmls: formData.nmls,
            phone: formData.phone,
            states: formData.states,
            primaryColor: formData.primaryColor,
            subdomain,
            templateSlug,
          }),
        })

        const data = await res.json()

        if (!cancelled) {
          if (res.ok && data.ok) {
            setToken(data.token)
            setStatus('success')
          } else {
            setErrorMsg(data.error || 'Something went wrong. Please try again.')
            setStatus('error')
          }
        }
      } catch {
        if (!cancelled) {
          setErrorMsg('Network error. Please try again.')
          setStatus('error')
        }
      }
    }

    createSite()
    return () => { cancelled = true }
  }, [subdomain, templateSlug, formData])

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div className="text-center py-24">
        <div className="flex justify-center mb-6">
          <svg
            className="animate-spin h-10 w-10 text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <p className="text-slate-500 text-lg">Creating your site...</p>
      </div>
    )
  }

  // Error state
  if (status === 'error') {
    return (
      <div className="text-center py-24">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-medium text-slate-900 mb-3">Something went wrong</h2>
        <p className="text-slate-500 mb-8">{errorMsg}</p>
        <button
          onClick={() => setStatus('loading')}
          className="bg-slate-900 text-white rounded-full px-8 py-3 text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          Try again
        </button>
      </div>
    )
  }

  // Success state
  const dashboardUrl = `https://app.loangraphs.com/website${token ? `?token=${token}` : ''}`

  return (
    <div className="text-center relative overflow-hidden">
      {/* Confetti */}
      <Confetti />

      {/* Animated Checkmark */}
      <div className="flex justify-center mb-8">
        <div className="w-18 h-18 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
          <svg
            className="w-10 h-10 text-green-600"
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
      </div>

      {/* Success Message */}
      <h1 className="text-4xl font-medium tracking-tight text-slate-900 mb-3">
        Your site is live.
      </h1>
      <a
        href={siteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl text-slate-500 hover:text-slate-700 transition-colors inline-block mb-8"
      >
        {siteUrl}
      </a>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 mb-16">
        <button
          onClick={handleCopy}
          className="border border-slate-200 text-slate-600 rounded-full px-8 py-3 text-sm hover:bg-slate-50 transition-colors"
        >
          {copied ? 'Copied ✓' : 'Copy Link'}
        </button>
        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-slate-900 text-white rounded-full px-8 py-3 text-sm font-medium hover:bg-slate-800 transition-colors inline-block"
        >
          Visit Site →
        </a>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 my-12" />

      {/* Next Steps */}
      <h2 className="text-lg font-medium text-slate-700 mb-8">Now customize it.</h2>

      {/* Next Steps Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="border border-slate-100 rounded-2xl p-6 text-center">
          <div className="text-3xl mb-3">🖼</div>
          <h3 className="text-sm font-medium text-slate-900 mb-2">Add Your Photo</h3>
          <p className="text-xs text-slate-500">
            Upload a headshot for your hero section
          </p>
        </div>

        <div className="border border-slate-100 rounded-2xl p-6 text-center">
          <div className="text-3xl mb-3">✍️</div>
          <h3 className="text-sm font-medium text-slate-900 mb-2">Write Your Bio</h3>
          <p className="text-xs text-slate-500">
            Tell clients who you are and why they should work with you
          </p>
        </div>

        <div className="border border-slate-100 rounded-2xl p-6 text-center">
          <div className="text-3xl mb-3">🎨</div>
          <h3 className="text-sm font-medium text-slate-900 mb-2">Pick Your Colors</h3>
          <p className="text-xs text-slate-500">
            Choose an accent color that matches your brand
          </p>
        </div>
      </div>

      {/* Dashboard CTA */}
      <a
        href={dashboardUrl}
        className="inline-block bg-slate-900 text-white rounded-full px-12 py-4 text-sm font-medium hover:bg-slate-800 transition-colors"
      >
        Go to My Dashboard →
      </a>
    </div>
  )
}

function Confetti() {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-yellow-400',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-indigo-500',
  ]

  return (
    <>
      <style jsx>{`
        @keyframes confetti-fall {
          from {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        :global(.animate-scale-in) {
          animation: scale-in 0.4s ease-out;
        }

        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          border-radius: 2px;
          pointer-events: none;
          animation: confetti-fall 3s ease-out forwards;
        }
      `}</style>

      {colors.map((color, i) => (
        <div
          key={i}
          className={`confetti ${color}`}
          style={{
            left: `${10 + i * 11}%`,
            top: '-20px',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </>
  )
}
