import { Metadata } from 'next'
import LearnTOC from '@/components/gallery/LearnTOC'
import VideoPlaceholder from '@/components/gallery/learn/VideoPlaceholder'

export const metadata: Metadata = {
  title: 'Understanding Your Analytics | Video Tutorials',
  description: 'Track traffic, conversions, and ROI with simple analytics tools.',
}

const tocItems = [
  { id: 'video', label: 'Video' },
  { id: 'what-youll-learn', label: "What You'll Learn" },
  { id: 'timestamps', label: 'Timestamps' },
  { id: 'transcript', label: 'Transcript' },
]

export default function UnderstandingAnalyticsPage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Understanding Your Analytics</h1>
        <p className="text-gray-500 text-sm mb-8">Learn which metrics matter, where your traffic comes from, and how to track conversions.</p>

        <h2 id="video" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Video</h2>
        <VideoPlaceholder />

        <h2 id="what-youll-learn" className="text-xl font-semibold text-gray-900 mt-10 mb-3">What You&apos;ll Learn</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Numbers don&apos;t have to be intimidating. This video breaks down the key metrics every loan officer should track — from traffic sources and bounce rates to conversion tracking and building a monthly review habit.
        </p>

        <h2 id="timestamps" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Timestamps</h2>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>0:00</strong> — What metrics matter</li>
          <li><strong>2:30</strong> — Traffic sources</li>
          <li><strong>5:00</strong> — Conversion tracking</li>
          <li><strong>8:00</strong> — Monthly review process</li>
        </ul>

        <h2 id="transcript" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Transcript</h2>
        <p className="text-gray-400 text-sm italic">Transcript will be available once video is published.</p>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
