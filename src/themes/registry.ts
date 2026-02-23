export const THEMES = {
  'prestige': {
    name: 'Prestige',
    description: 'Dark navy + gold luxury aesthetic',
    target: 'Jumbo/high-net-worth LOs',
  },
  'local-hero': {
    name: 'Local Hero',
    description: 'Warm earthy tones, community-focused',
    target: 'Purchase-heavy, community lenders',
  },
  'modern-edge': {
    name: 'Modern Edge',
    description: 'Bold black + electric accent, conversion-focused',
    target: 'High-volume, DTC LOs',
  },
  'trust-builder': {
    name: 'Trust Builder',
    description: 'Ultra-clean white, heavy social proof',
    target: 'Newer LOs building credibility',
  },
  'team-page': {
    name: 'Team Page',
    description: 'Multi-LO team layout with individual profiles',
    target: 'Branch managers, team leads',
  },
} as const

export type ThemeKey = keyof typeof THEMES
