import { Metadata } from 'next'
import LearnTOC from '@/components/gallery/LearnTOC'
import VideoPlaceholder from '@/components/gallery/learn/VideoPlaceholder'

export const metadata: Metadata = {
  title: 'How to Customize Your Template | Video Tutorials',
  description: 'Learn how to customize every part of your LoanGraphs template — headshot, bio, lead capture, and more.',
}

const tocItems = [
  { id: 'video', label: 'Video' },
  { id: 'what-youll-learn', label: "What You'll Learn" },
  { id: 'timestamps', label: 'Timestamps' },
  { id: 'transcript', label: 'Transcript' },
]

export default function HowToCustomizePage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">How to Customize Your Template</h1>
        <p className="text-gray-500 text-sm mb-8">A complete walkthrough of every customization option available in LoanGraphs Templates.</p>

        <h2 id="video" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Video</h2>
        <VideoPlaceholder />

        <h2 id="what-youll-learn" className="text-xl font-semibold text-gray-900 mt-10 mb-3">What You&apos;ll Learn</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          This video covers the full customization flow — from uploading your headshot to configuring lead capture forms. By the end, you&apos;ll know how to make your template truly yours without writing a single line of code.
        </p>

        <h2 id="timestamps" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Timestamps</h2>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>0:00</strong> — Overview</li>
          <li><strong>1:20</strong> — Changing your name &amp; headshot</li>
          <li><strong>3:45</strong> — Editing your bio</li>
          <li><strong>6:00</strong> — Setting up lead capture</li>
          <li><strong>8:30</strong> — Publishing changes</li>
        </ul>

        <h2 id="transcript" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Transcript</h2>
        <p className="text-gray-400 text-sm italic">Transcript will be available once video is published.</p>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
