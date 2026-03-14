import { Metadata } from 'next'
import LearnTOC from '@/components/gallery/LearnTOC'
import VideoPlaceholder from '@/components/gallery/learn/VideoPlaceholder'

export const metadata: Metadata = {
  title: 'Getting Your First Lead | Video Tutorials',
  description: 'Set up lead capture, connect your CRM, and start getting borrower inquiries.',
}

const tocItems = [
  { id: 'video', label: 'Video' },
  { id: 'what-youll-learn', label: "What You'll Learn" },
  { id: 'timestamps', label: 'Timestamps' },
  { id: 'transcript', label: 'Transcript' },
]

export default function GettingYourFirstLeadPage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Getting Your First Lead</h1>
        <p className="text-gray-500 text-sm mb-8">Set up lead capture forms, connect your CRM, and start converting visitors into borrowers.</p>

        <h2 id="video" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Video</h2>
        <VideoPlaceholder />

        <h2 id="what-youll-learn" className="text-xl font-semibold text-gray-900 mt-10 mb-3">What You&apos;ll Learn</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          This video covers the complete lead generation setup — from configuring your contact forms to integrating with your CRM and building a nurture sequence that converts inquiries into applications.
        </p>

        <h2 id="timestamps" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Timestamps</h2>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>0:00</strong> — Lead capture overview</li>
          <li><strong>2:00</strong> — Form setup</li>
          <li><strong>4:30</strong> — CRM connection</li>
          <li><strong>7:00</strong> — Nurture sequence tips</li>
        </ul>

        <h2 id="transcript" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Transcript</h2>
        <p className="text-gray-400 text-sm italic">Transcript will be available once video is published.</p>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
