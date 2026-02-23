import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Set Up Your Site — LoanGraphs',
  description: 'Create your free mortgage website in minutes.',
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50">{children}</div>
}
