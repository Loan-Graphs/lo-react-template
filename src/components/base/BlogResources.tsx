import Link from 'next/link'
import BlogCard from '@/components/BlogCard'
import { getAllPosts } from '@/lib/blog'
import type { LOProfile } from '@/types/lo-profile'

interface BlogResourcesProps {
  loProfile: LOProfile
}

export default function BlogResources({ loProfile }: BlogResourcesProps) {
  const featuredPosts = getAllPosts().slice(0, 3)

  if (featuredPosts.length === 0) return null

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2
              style={{ color: 'var(--color-foreground)', fontSize: '1.875rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}
              className="mb-2"
            >
              Mortgage Tips &amp; Insights
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>Learn before you borrow.</p>
          </div>
          <Link
            href="/blog"
            style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem' }}
            className="hover:underline hidden sm:block"
          >
            All Articles &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem' }}
            className="hover:underline"
          >
            View All Articles &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
