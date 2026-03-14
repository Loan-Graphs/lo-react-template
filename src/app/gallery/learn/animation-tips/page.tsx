import { Metadata } from 'next'
import LearnTOC from '@/components/gallery/LearnTOC'
import Callout from '@/components/gallery/learn/Callout'
import CodeBlock from '@/components/gallery/learn/CodeBlock'

export const metadata: Metadata = {
  title: 'Adding Professional Touches to Your LO Website | Learn',
  description: 'Animation best practices for loan officer websites — subtle, fast, and purposeful.',
}

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'core-principles', label: 'Core Principles' },
  { id: 'animations-that-work', label: 'Animations That Work' },
  { id: 'what-to-avoid', label: 'What to Avoid' },
  { id: 'hover-states', label: 'Hover States' },
  { id: 'form-feedback', label: 'Form Feedback' },
  { id: 'performance', label: 'Performance' },
  { id: 'best-practices', label: 'Best Practices' },
]

export default function AnimationTipsPage() {
  return (
    <>
      <main className="flex-1 max-w-3xl px-8 md:px-12 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Adding Professional Touches to Your LO Website</h1>
        <p className="text-gray-500 text-sm mb-8">Subtle animations that enhance your site without distracting from your message.</p>

        <h2 id="overview" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Overview</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Animations can make your website feel polished and modern — or they can make it feel slow and gimmicky. In the mortgage industry, where trust and professionalism matter most, animations should be subtle, fast, and purposeful.
        </p>

        <h2 id="core-principles" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Core Principles</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Follow these three rules for animations on an LO website:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Subtle</strong> — Animations should enhance, not distract. If a visitor notices the animation more than the content, it is too much.</li>
          <li><strong>Fast</strong> — Keep transitions under 300ms. Borrowers are busy and impatient. Slow animations feel sluggish.</li>
          <li><strong>Purposeful</strong> — Every animation should serve a goal: drawing attention to a CTA, confirming a form submission, or creating visual flow.</li>
        </ul>

        <h2 id="animations-that-work" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Animations That Work</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          These animations add polish to mortgage websites:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Fade-in on scroll</strong> — Content sections fade in as the user scrolls down. Clean and professional.</li>
          <li><strong>Hover effects on buttons</strong> — Color shift, slight elevation, or arrow slide. Guides the user to click.</li>
          <li><strong>Smooth section transitions</strong> — Sections slide up gently as they enter the viewport.</li>
          <li><strong>Number counters</strong> — &quot;500+ families helped&quot; counting up as the stat section comes into view.</li>
          <li><strong>Form success animation</strong> — A checkmark animation when a lead form is submitted.</li>
        </ul>

        <CodeBlock
          code={`/* Fade-in on scroll */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Button hover */
.btn-cta {
  transition: all 0.2s ease;
}
.btn-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}`}
          language="css"
        />

        <h2 id="what-to-avoid" className="text-xl font-semibold text-gray-900 mt-10 mb-3">What to Avoid</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          These animation patterns hurt credibility on mortgage websites:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Autoplay video backgrounds</strong> — Slow to load, distracting, uses data on mobile</li>
          <li><strong>Spinning or rotating elements</strong> — Looks amateurish and dizzying</li>
          <li><strong>Bouncing icons or text</strong> — Feels like a 1990s website</li>
          <li><strong>Parallax overuse</strong> — One subtle parallax hero is fine; parallax on every section is disorienting</li>
          <li><strong>Cursor effects</strong> — Sparkle trails, custom cursors, and following elements are unprofessional</li>
          <li><strong>Entrance animations on every element</strong> — If everything animates in, nothing stands out</li>
        </ul>

        <Callout type="warning" title="The Credibility Test">
          <p>Ask yourself: &quot;Would a major bank use this animation?&quot; If the answer is no, skip it. Your website should feel as trustworthy as Chase or Wells Fargo, even if you are an independent broker.</p>
        </Callout>

        <h2 id="hover-states" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Hover States</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Hover states are the most important interactive animations on your site. They tell visitors what is clickable:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Buttons:</strong> Darken or lighten the background color, add a slight shadow lift</li>
          <li><strong>Links:</strong> Underline on hover or color change</li>
          <li><strong>Cards:</strong> Subtle shadow increase or slight scale (1.02x max)</li>
          <li><strong>Navigation items:</strong> Background highlight or bottom border</li>
        </ul>

        <h2 id="form-feedback" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Form Feedback Animations</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Lead capture forms should provide clear visual feedback:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li><strong>Focus state:</strong> Border color change when a field is active</li>
          <li><strong>Validation:</strong> Subtle red border and shake for errors, green check for valid fields</li>
          <li><strong>Submit button:</strong> Loading spinner while processing</li>
          <li><strong>Success:</strong> Checkmark animation + &quot;Thank you&quot; message</li>
        </ul>

        <h2 id="performance" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Performance</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Animations should never slow down your website:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Use CSS transforms and opacity for animations (GPU-accelerated)</li>
          <li>Avoid animating layout properties (width, height, margin, padding)</li>
          <li>Use <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">will-change</code> sparingly and only on elements that animate</li>
          <li>Respect <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">prefers-reduced-motion</code> for users who disable animations</li>
          <li>Test your Lighthouse Performance score — animations should not impact it</li>
        </ul>

        <CodeBlock
          code={`/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}
          language="css"
        />

        <h2 id="best-practices" className="text-xl font-semibold text-gray-900 mt-10 mb-3">Best Practices</h2>
        <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-4">
          <li>Less is more — one or two well-placed animations beat ten flashy ones</li>
          <li>Keep all transitions under 300ms for responsiveness</li>
          <li>Animate content as it enters the viewport, not on page load</li>
          <li>Use easing functions (ease-out) for natural-feeling motion</li>
          <li>Test on slower devices — if it stutters, remove it</li>
          <li>When in doubt, skip the animation. A static, well-designed site beats a poorly animated one.</li>
        </ul>
      </main>
      <LearnTOC items={tocItems} />
    </>
  )
}
