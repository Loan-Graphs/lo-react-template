import { Metadata } from 'next'
import LearnTOC from '@/components/gallery/LearnTOC'
import VideoPlaceholder from '@/components/gallery/learn/VideoPlaceholder'

export const metadata: Metadata = {
  title: 'Going Live Checklist | Video Tutorials',
  description: 'Everything to check before publishing your LoanGraphs site to the world.',
}

const tocItems = [
  { id: 'video', label: 'Video' },
  { id: 'what-youll-learn', label: "What You'll Learn" },
  { id: 'timestamps', label: 'Timestamps' },
  { id: 'transcript', label: 'Transcript' },
]

export default function GoingLiveChecklistPage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Going Live Checklist</h1>
        <p className="text-gray-500 text-sm mb-8">Everything to check before sharing your LoanGraphs site with the world.</p>

        <h2 id="video" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Video</h2>
        <VideoPlaceholder />

        <h2 id="what-youll-learn" className="text-xl font-semibold text-gray-900 mt-10 mb-3">What You&apos;ll Learn</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Don&apos;t launch without checking these essentials. This video walks through the complete pre-launch checklist — domain verification, lead form testing, mobile preview, and how to share your link for maximum impact.
        </p>

        <h2 id="timestamps" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Timestamps</h2>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>0:00</strong> — Pre-launch checklist</li>
          <li><strong>3:00</strong> — Domain verification</li>
          <li><strong>5:00</strong> — Lead test</li>
          <li><strong>7:00</strong> — Share your link</li>
        </ul>

        <h2 id="transcript" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Transcript</h2>
        <p className="text-gray-400 text-sm italic">Transcript will be available once video is published.</p>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
