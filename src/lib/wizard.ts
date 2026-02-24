export interface WizardTestimonial {
  id: string
  author: string
  rating: number
  text: string
  date: string
}

export interface WizardLoanProduct {
  id: string
  name: string
  description: string
  icon: string
  selected: boolean
}

export interface WizardState {
  // Step 1 — Template
  templateKey: string

  // Step 2 — Basic Info
  name: string
  title: string
  nmls: string
  phone: string
  email: string
  company: string
  licenseStates: string[]

  // Step 3 — Media
  photo: string
  logoUrl: string

  // Step 4 — Colors
  primaryColor: string
  accentColor: string

  // Step 5 — Headline
  headline: string
  subheadline: string

  // Step 6 — Loan Products
  loanProducts: WizardLoanProduct[]

  // Step 7 — Testimonials
  testimonials: WizardTestimonial[]

  // Step 8 — Domain
  subdomain: string
  customDomain: string
  useCustomDomain: boolean
  dnsStatus: 'idle' | 'checking' | 'verified' | 'failed'

  // Step 9 — Market Data upsell
  marketDataSelected: boolean

  // Step 10 — SEO Articles upsell
  seoTier: 'none' | 'minimum' | 'standard' | 'elite'
}

export const DEFAULT_LOAN_PRODUCTS: WizardLoanProduct[] = [
  { id: 'purchase', name: 'Home Purchase', description: 'First-time buyers and move-up buyers.', icon: 'home', selected: true },
  { id: 'refinance', name: 'Refinance', description: 'Lower your rate or tap equity.', icon: 'refinance', selected: true },
  { id: 'fha', name: 'FHA Loans', description: 'Low down payment, flexible qualifying.', icon: 'home', selected: true },
  { id: 'va', name: 'VA Loans', description: 'Zero-down for veterans and active duty.', icon: 'home', selected: false },
  { id: 'jumbo', name: 'Jumbo Loans', description: 'Financing above conforming loan limits.', icon: 'dollar', selected: false },
  { id: 'investment', name: 'Investment Property', description: 'DSCR loans for real estate investors.', icon: 'investment', selected: false },
]

export const INITIAL_STATE: WizardState = {
  templateKey: 'prestige',
  name: '',
  title: 'Mortgage Loan Officer',
  nmls: '',
  phone: '',
  email: '',
  company: '',
  licenseStates: [],
  photo: '',
  logoUrl: '',
  primaryColor: '#0ea5e9',
  accentColor: '#f97316',
  headline: '',
  subheadline: '',
  loanProducts: DEFAULT_LOAN_PRODUCTS,
  testimonials: [],
  subdomain: '',
  customDomain: '',
  useCustomDomain: false,
  dnsStatus: 'idle',
  marketDataSelected: false,
  seoTier: 'none',
}

export const STEP_TITLES: Record<number, string> = {
  1: 'Choose Your Template',
  2: 'Your Information',
  3: 'Photo & Logo',
  4: 'Brand Colors',
  5: 'Your Headline',
  6: 'Loan Products',
  7: 'Testimonials',
  8: 'Domain Setup',
  9: 'Market Data',
  10: 'SEO Articles',
  11: 'Review & Launch',
}

export const TOTAL_STEPS = 11

export function computeSubdomain(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 30) || 'my-site'
}

export const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
]
