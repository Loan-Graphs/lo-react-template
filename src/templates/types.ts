// === LOProfile — canonical schema (synced from lo-react-template) ===

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

// Backward compat alias for templates 4-9 that still use old field names
export interface LoanOfficer extends LOProfile {
  licensedStates: string[]
  loanTypes: string[]
  certifications: string[]
  yearsInIndustry: number
}

// === Company & Blog (unchanged) ===

export interface Company {
  name: string
  logo: string
  phone: string
  email: string
  website: string
  about: string
  foundedYear: number
  loanOfficers: { name: string; title: string; photo: string }[]
  offices: { city: string; state: string; address: string; phone: string }[]
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  image: string
}

export interface TemplateProps {
  loanOfficer: LoanOfficer
  company: Company
  blogPosts: BlogPost[]
}
