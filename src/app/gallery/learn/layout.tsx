import Link from 'next/link'
import LearnSidebar from '@/components/gallery/LearnSidebar'

function LearnNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 md:px-12 h-12 max-w-[1400px] mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-[9px] font-bold text-white">
            LG
          </div>
          <span className="text-sm font-semibold text-gray-900 tracking-tight hidden sm:inline">
            LoanGraphs
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
            Templates
          </Link>
          <Link href="/learn" className="text-xs text-black font-medium">
            Learn
          </Link>
          <a
            href="https://loangraphs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  )
}

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LearnNavbar />
      <div className="flex pt-12 min-h-screen bg-white">
        <LearnSidebar />
        <div className="flex-1 flex justify-center">
          {children}
        </div>
      </div>
    </>
  )
}
