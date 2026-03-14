import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LoanGraphs Templates | Free Professional Websites for Loan Officers',
  description: 'Browse, preview, and get professional websites for loan officers. Free with LoanGraphs signup.',
  openGraph: {
    title: 'LoanGraphs Templates',
    description: 'Free professional websites for loan officers',
    type: 'website',
    locale: 'en_US',
  },
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
