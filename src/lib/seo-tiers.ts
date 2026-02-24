export type SeoTier = 'minimum' | 'standard' | 'elite'

export interface SeoTierConfig {
  price: number
  cadence: 'biweekly' | 'weekly' | 'twice-weekly'
  articlesPerYear: number
}

export const SEO_TIERS: Record<SeoTier, SeoTierConfig> = {
  minimum: { price: 499, cadence: 'biweekly', articlesPerYear: 26 },
  standard: { price: 799, cadence: 'weekly', articlesPerYear: 52 },
  elite: { price: 1299, cadence: 'twice-weekly', articlesPerYear: 104 },
}
