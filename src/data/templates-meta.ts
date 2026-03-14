export type TemplateTier = 'free' | 'pro'
export type TemplateCategory = 'trending' | 'free' | 'pro' | 'new'

export interface TemplateMeta {
  id: string
  name: string
  description: string
  thumbnail: string
  tier: TemplateTier
  tags: string[]
  categories: TemplateCategory[]
  views: number
  remixes: number
  accent: string // CSS color for card hover accent
}

export const templatesMeta: TemplateMeta[] = [
  {
    id: 'template-8',
    name: 'Nathan Pro',
    description: 'Slate dark hero with trust signals and lead capture. Inspired by top producers.',
    thumbnail: '/thumbnails/template-8.svg',
    tier: 'pro',
    tags: ['Dark', 'Lead Gen', 'Trust Signals'],
    categories: ['trending', 'pro'],
    views: 4820,
    remixes: 312,
    accent: '#6366f1',
  },
  {
    id: 'template-7',
    name: 'Bold Orange',
    description: 'Energetic orange and charcoal with strong CTAs and bold typography.',
    thumbnail: '/thumbnails/template-7.svg',
    tier: 'pro',
    tags: ['Bold', 'High Conversion', 'CTA-First'],
    categories: ['trending', 'pro'],
    views: 3910,
    remixes: 241,
    accent: '#f97316',
  },
  {
    id: 'template-5',
    name: 'Dynamic Blue',
    description: 'Vibrant blue theme with dynamic elements and mortgage calculator.',
    thumbnail: '/thumbnails/template-5.svg',
    tier: 'pro',
    tags: ['Blue', 'Modern', 'Calculator'],
    categories: ['trending', 'pro'],
    views: 3270,
    remixes: 198,
    accent: '#3b82f6',
  },
  {
    id: 'template-1',
    name: 'Modern Dark',
    description: 'Sleek dark theme with gradient accents. Clean hero with prominent CTA.',
    thumbnail: '/thumbnails/template-1.svg',
    tier: 'free',
    tags: ['Dark', 'Minimal', 'Gradients'],
    categories: ['free', 'trending'],
    views: 5100,
    remixes: 427,
    accent: '#8b5cf6',
  },
  {
    id: 'template-2',
    name: 'Classic Pro',
    description: 'Professional and timeless design. Perfect for experienced LOs.',
    thumbnail: '/thumbnails/template-2.svg',
    tier: 'free',
    tags: ['Classic', 'Professional', 'Light'],
    categories: ['free'],
    views: 2890,
    remixes: 183,
    accent: '#10b981',
  },
  {
    id: 'template-3',
    name: 'Minimal Clean',
    description: 'Minimal approach with clean lines. Fast loading and distraction-free.',
    thumbnail: '/thumbnails/template-3.svg',
    tier: 'free',
    tags: ['Minimal', 'Clean', 'Fast'],
    categories: ['free'],
    views: 2340,
    remixes: 156,
    accent: '#14b8a6',
  },
  {
    id: 'template-4',
    name: 'Corporate Plus',
    description: 'Corporate style with modern touches. Great for company-wide deployments.',
    thumbnail: '/thumbnails/template-4.svg',
    tier: 'pro',
    tags: ['Corporate', 'Multi-LO', 'Enterprise'],
    categories: ['pro'],
    views: 1980,
    remixes: 94,
    accent: '#0ea5e9',
  },
  {
    id: 'template-6',
    name: 'Elegant White',
    description: 'Clean white background with elegant accents. Luxury feel for jumbo markets.',
    thumbnail: '/thumbnails/template-6.svg',
    tier: 'pro',
    tags: ['Elegant', 'Luxury', 'Jumbo'],
    categories: ['pro'],
    views: 1750,
    remixes: 87,
    accent: '#f59e0b',
  },
  {
    id: 'template-9',
    name: 'Horizon',
    description: 'Fresh, modern layout with parallax sections and animated stats.',
    thumbnail: '/thumbnails/template-9.svg',
    tier: 'pro',
    tags: ['Modern', 'Animated', 'New'],
    categories: ['new', 'pro'],
    views: 890,
    remixes: 42,
    accent: '#ec4899',
  },
  {
    id: 'template-11',
    name: 'Liquid Glass',
    description: 'Glass morphism hero with animated liquid background, floating phone mockup, and bento grid. Premium design for top producers.',
    thumbnail: '/thumbnails/template-11.svg',
    tier: 'pro',
    tags: ['Glass', 'Animated', 'Premium'],
    categories: ['new', 'pro'],
    views: 120,
    remixes: 8,
    accent: '#6366f1',
  },
]

export const trending = templatesMeta.filter(t => t.categories.includes('trending'))
export const freeTemplates = templatesMeta.filter(t => t.tier === 'free')
export const proTemplates = templatesMeta.filter(t => t.tier === 'pro')
export const newTemplates = templatesMeta.filter(t => t.categories.includes('new'))
