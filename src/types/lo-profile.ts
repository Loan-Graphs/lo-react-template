export type Plan = 'free' | 'paid'
export type SeoTier = 'minimum' | 'standard' | 'elite'

export interface LoanProduct {
  id: string
  name: string
  description: string
  icon?: string
}

export interface Testimonial {
  id: string
  author: string
  rating: number
  text: string
  date?: string
}

export interface LOProfile {
  // Identity
  name: string
  title: string
  nmls: string
  photo: string
  company: string
  licenseStates: string[]

  // Contact
  phone: string
  email: string
  calendlyUrl?: string

  // Social proof
  googleRating: number
  reviewCount: number
  yearsExperience: number

  // Branding (locked on free tier)
  primaryColor: string
  accentColor: string
  logoUrl?: string

  // Content
  headline: string
  subheadline: string
  bio: string
  loanProducts: LoanProduct[]
  testimonials: Testimonial[]
  differentiators: string[]

  // Tier / upsells
  plan: Plan
  marketDataEnabled: boolean
  seoArticlesEnabled: boolean
  seoTier?: SeoTier
  targetGeos?: string[]
  targetTopics?: string[]
}
