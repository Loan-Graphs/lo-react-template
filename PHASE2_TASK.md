# Phase 2 Task: LO Websites V2 — Visual Themes
# PRD reference: ~/alex-operating-system/knowledge/projects/prd-lo-websites-v2.md

## Context

Phase 1 is complete. The base component library, LOProfile schema, UpsellGate, GeoAwareCTA, and homepage are all built in `lo-react-template` on `feature/lo-websites-v2-phase1`.

Phase 2 builds 5 visual themes on top of that foundation. All themes:
- Use the same 11 base section components from `src/components/base/`
- Use the same `LOProfile` schema
- Differ ONLY in visual design (colors, typography, layout, spacing)
- Override the CSS custom properties / Tailwind theme tokens documented in `src/styles/theme-tokens.md`

## Working Repo

`/Users/alexfinley2/lo-react-template` on branch `feature/lo-websites-v2-phase1` (continue on this branch)

## Where Themes Live

Create `src/themes/` directory with one folder per theme:
```
src/themes/
  prestige/
    theme.css       ← CSS var overrides for this theme
    page.tsx        ← Theme page (composes base components with theme applied)
    index.ts        ← exports
  local-hero/
  modern-edge/
  trust-builder/
  team-page/
```

Each theme's `page.tsx` wraps base components with `<div className="theme-[name]">` so the CSS vars apply scoped to that theme.

Each theme's `theme.css` overrides the tokens from `src/styles/theme-tokens.md`.

## Theme 1: "Prestige"

**Target:** Jumbo/high-net-worth LOs
**Visual:** Dark navy + gold luxury aesthetic

CSS vars to set:
- `--color-primary: #0a1628` (deep navy)
- `--color-accent: #c9a227` (gold)
- `--hero-bg: #0a1628`
- `--section-bg-alt: #0d1f3c`
- `--font-heading: 'Playfair Display', Georgia, serif`
- `--font-body: 'Crimson Text', Georgia, serif`

Design notes:
- Large serif headlines
- LO photo in circular frame with gold border
- Minimal whitespace, editorial layout (think private banking / wealth management)
- Gold accent lines between sections
- CTA buttons: gold background, navy text

## Theme 2: "Local Hero"

**Target:** Purchase-heavy, community lenders
**Visual:** Warm earthy tones — terracotta, cream, sage

CSS vars:
- `--color-primary: #c4622d` (terracotta)
- `--color-accent: #5a7a4e` (sage)
- `--hero-bg: #faf5ef` (warm cream)
- `--section-bg-alt: #f0e8dc`
- `--font-heading: 'Nunito', system-ui, sans-serif`
- `--font-body: 'Nunito', system-ui, sans-serif`

Design notes:
- Warm, community-focused feel
- Emphasis on "your local lender" headline variants
- Hand-drawn/organic style icon accents (SVG icons with slightly irregular lines)
- Neighborhood photography vibe in hero
- Rounded corners on cards and buttons

## Theme 3: "Modern Edge"

**Target:** High-volume, direct-to-consumer LOs
**Visual:** Bold black + electric accent, aggressive conversion focus

CSS vars:
- `--color-primary: #0a0a0a` (near black)
- `--color-accent: #00ff88` (electric green) OR `#0066ff` (electric blue) — LO's accentColor drives this
- `--hero-bg: #0a0a0a`
- `--section-bg-alt: #111111`
- `--font-heading: 'Inter', system-ui, sans-serif` (very bold, heavy weight)
- `--font-body: 'Inter', system-ui, sans-serif`

Design notes:
- Asymmetric grid layout
- Diagonal section breaks (use `clip-path: polygon(...)` or `skewY`)
- Aggressive CTA buttons (large, high contrast, electric accent)
- Progress/stat counters in social proof bar (animated count-up on scroll if feasible)
- High contrast — black sections alternating with electric-accent sections

## Theme 4: "Trust Builder"

**Target:** Newer LOs building credibility fast
**Visual:** Ultra-clean white, almost clinical precision, heavy on social proof

CSS vars:
- `--color-primary: #1a56db` (professional blue)
- `--color-accent: #0ea5e9` (sky blue)
- `--hero-bg: #ffffff`
- `--section-bg-alt: #f8fafc`
- `--font-heading: 'Inter', system-ui, sans-serif`
- `--font-body: 'Inter', system-ui, sans-serif`

Design notes:
- Reviews front and center — Social Proof Bar is XL, highly visible
- Progress indicators / trust badge row (verified, licensed, NMLS-compliant badges)
- Video embed placeholder in About section (for intro reel — use a placeholder embed div)
- Star ratings displayed prominently throughout
- Clean white cards with subtle drop shadows
- Form fields with validation states clearly visible

## Theme 5: "Team Page"

**Target:** Branch managers, team leads
**Visual:** Multi-LO team layout — shared brand + individual profiles

This theme is structurally different from the others. It adds:

### Main Page (Team Overview)
- Company hero section (company name, logo, tagline)
- Grid of team member cards — each card shows: photo, name, title, NMLS, specialty, "View Profile →" link
- Shared testimonials section (company-level reviews)
- Lead form: "Connect with our team"
- Footer with all team members' NMLS numbers listed

### Individual Team Member Pages `/team/[slug]`
Each team member gets their own full page using the standard 11-section structure:
- Full hero (their photo, name, title)
- Social Proof Bar (their individual stats)
- Loan Products they specialize in
- Why Me (their individual differentiators)
- How It Works
- Market Rates Widget
- Testimonials (their personal reviews)
- About (their bio + NMLS)
- Lead Capture Form (goes to them specifically)
- Blog/Resources (shared if seoArticlesEnabled)
- Footer (their NMLS + the company's info)

**Implementation:**
- `src/themes/team-page/page.tsx` — the team overview page
- `src/app/team/[slug]/page.tsx` — dynamic route for individual profiles
- `src/themes/team-page/TeamMemberCard.tsx` — card component for the grid
- `LOProfile` will need a `teamMembers?: TeamMember[]` field — add this to the schema:

```ts
export interface TeamMember {
  slug: string
  name: string
  title: string
  nmls: string
  photo: string
  bio: string
  specialty?: string
  phone?: string
  email?: string
  testimonials?: Testimonial[]
  loanProducts?: LoanProduct[]
  differentiators?: string[]
}
```

Add `teamMembers?: TeamMember[]` to `LOProfile` in `src/types/lo-profile.ts`.

## Template Registry

Create/update `src/themes/registry.ts`:
```ts
export const THEMES = {
  'prestige': { name: 'Prestige', description: 'Dark navy + gold luxury aesthetic', target: 'Jumbo/high-net-worth LOs' },
  'local-hero': { name: 'Local Hero', description: 'Warm earthy tones, community-focused', target: 'Purchase-heavy, community lenders' },
  'modern-edge': { name: 'Modern Edge', description: 'Bold black + electric accent, conversion-focused', target: 'High-volume, DTC LOs' },
  'trust-builder': { name: 'Trust Builder', description: 'Ultra-clean white, heavy social proof', target: 'Newer LOs building credibility' },
  'team-page': { name: 'Team Page', description: 'Multi-LO team layout with individual profiles', target: 'Branch managers, team leads' },
} as const
export type ThemeKey = keyof typeof THEMES
```

## Commit Strategy

One commit per theme:
- `feat: add Prestige theme (dark navy + gold)`
- `feat: add Local Hero theme (warm earthy tones)`
- `feat: add Modern Edge theme (black + electric accent)`
- `feat: add Trust Builder theme (clean white, heavy social proof)`
- `feat: add Team Page theme + /team/[slug] dynamic route`
- `feat: add theme registry`

Also update `LOProfile` schema if you add `TeamMember` type — commit as:
- `feat: add TeamMember type to LOProfile schema`

## Done Signal

When all 5 themes are built and committed, run:
openclaw system event --text "Done: Phase 2 complete — Prestige, Local Hero, Modern Edge, Trust Builder, and Team Page themes all built in lo-react-template. /team/[slug] dynamic route added." --mode now
