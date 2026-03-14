import { Metadata } from 'next'
import LearnTOC from '@/components/gallery/LearnTOC'
import VideoPlaceholder from '@/components/gallery/learn/VideoPlaceholder'

export const metadata: Metadata = {
  title: 'Adding Testimonials the Right Way | Video Tutorials',
  description: 'Stay RESPA-compliant while showcasing client testimonials that build trust.',
}

const tocItems = [
  { id: 'video', label: 'Video' },
  { id: 'what-youll-learn', label: "What You'll Learn" },
  { id: 'timestamps', label: 'Timestamps' },
  { id: 'transcript', label: 'Transcript' },
]

export default function AddingTestimonialsPage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Adding Testimonials the Right Way</h1>
        <p className="text-gray-500 text-sm mb-8">Stay RESPA-compliant while showcasing social proof that converts visitors into borrowers.</p>

        <h2 id="video" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Video</h2>
        <VideoPlaceholder />

        <h2 id="what-youll-learn" className="text-xl font-semibold text-gray-900 mt-10 mb-3">What You&apos;ll Learn</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Testimonials are one of the most powerful conversion tools on your site — but in mortgage, there are compliance rules to follow. This video covers RESPA guidelines, how to collect reviews, and the best display strategies for maximum impact.
        </p>

        <h2 id="timestamps" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Timestamps</h2>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>0:00</strong> — RESPA compliance overview</li>
          <li><strong>2:30</strong> — How to collect reviews</li>
          <li><strong>5:00</strong> — Adding to your site</li>
          <li><strong>7:30</strong> — Display strategies</li>
        </ul>

        <h2 id="transcript" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Transcript</h2>
        <p className="text-gray-400 text-sm italic">Transcript will be available once video is published.</p>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
