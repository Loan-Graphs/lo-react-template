# Phase 1 Task: LO Websites V2 — Template Foundation
# FINAL VERSION — DO NOT EDIT

## Context

You are building the structural foundation of a multi-tenant LO (Loan Officer) website platform.
The PRD source of truth: ~/alex-operating-system/knowledge/projects/prd-lo-websites-v2.md

## Repo Map

| Repo | Path | Role |
|---|---|---|
| `lo-react-template` | `/Users/alexfinley2/lo-react-template` | ✅ PRIMARY working repo — ALL deliverables for steps 1–7 go here |
| `lo-templates` | `/Users/alexfinley2/lo-templates` | ✅ SECONDARY — steps 8–10 go here (schema sync + gallery rebuild) |
| `nathanloanteam` | `/Users/alexfinley2/nathanloanteam` | ⚠️ READ ONLY — structural reference |
| `loan-officer-website` | `/Users/alexfinley2/loan-officer-website` | ⚠️ READ ONLY — dynamic value patterns reference |
| `loangraphs4` | `/Users/alexfinley2/loangraphs4` | ⚠️ READ ONLY — LoanGraphs API reference |

⚠️ You are on branch `feature/lo-websites-v2-phase1` in `lo-react-template`. Stay on this branch.
⚠️ DO NOT modify or commit to nathanloanteam, loan-officer-website, or loangraphs4.

---

## Step 1: Audit nathanloanteam (READ ONLY)

Read `/Users/alexfinley2/nathanloanteam/` — understand:
- All page sections and their order
- Component structure and file layout
- How LO profile data flows from API to components
- Any existing geo/state logic

---

## Step 2: Build LOProfile TypeScript Schema (in lo-react-template)

Create `src/types/lo-profile.ts`:

```ts
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
```

---

## Step 3: Build lo-template-base Component Library (in lo-react-template)

Create `src/components/base/` with these 11 reusable section components. Use CSS custom properties (`var(--color-primary)` etc.) for all colors — no hardcoded values. Each accepts `loProfile: LOProfile` as a prop.

**Required components (in page order):**
1. `HeroSection.tsx` — headline, photo, CTA button
2. `SocialProofBar.tsx` — Google rating, review count, years experience
3. `LoanProducts.tsx` — loan product cards
4. `WhyMeSection.tsx` — 3–5 differentiator trust bullets
5. `HowItWorks.tsx` — 3-step process
6. `MarketRatesWidget.tsx` — live rates display (use loProfile data or placeholder)
7. `TestimonialCarousel.tsx` — reviews carousel (3–6 items)
8. `AboutSection.tsx` — bio, photo, NMLS number
9. `LeadCaptureForm.tsx` — name, phone, email, loan purpose
10. `BlogResources.tsx` — blog/content section
11. `LOFooter.tsx` — NMLS disclaimer, licensed states list, social links

Also create `src/components/base/index.ts` that re-exports all of them.

---

## Step 4: UpsellGate Component (in lo-react-template)

Create `src/components/base/UpsellGate.tsx`:
- Props: `feature: 'market-data' | 'seo-articles'`, `loProfile: LOProfile`, `children: React.ReactNode`
- If `loProfile.plan === 'free'` AND feature not enabled → render "Upgrade to unlock [feature]" banner instead of children
- Otherwise → render children normally

Wrap `BlogResources` with `<UpsellGate feature="seo-articles">` and any Market Data sections with `<UpsellGate feature="market-data">`.

---

## Step 5: Theme Token Documentation + CSS Vars (in lo-react-template)

Create `src/styles/theme-tokens.md` documenting all overridable CSS custom properties:
- `--color-primary` (maps to loProfile.primaryColor)
- `--color-accent` (maps to loProfile.accentColor)
- `--font-heading`, `--font-body`
- `--hero-bg`, `--section-bg-alt`
- Any spacing or border-radius tokens used in base components

Update `src/app/globals.css` (or equivalent) to define these CSS vars and wire them to Tailwind.

---

## Step 6: Rebuild Homepage (in lo-react-template)

Rebuild the main homepage (`src/app/page.tsx` or equivalent) to:
- Fetch LO profile using the existing `getProfile()` function (preserves LoanGraphs API integration)
- Map API response to `LOProfile` type
- Render all 11 base components in correct order:
  Hero → SocialProofBar → LoanProducts → WhyMe → HowItWorks → MarketRatesWidget → Testimonials → About → LeadCaptureForm → BlogResources (wrapped in UpsellGate) → LOFooter

---

## Step 7: GeoAwareCTA Component + Edge Middleware (in lo-react-template)

Create `src/components/base/GeoAwareCTA.tsx`:
```ts
interface GeoAwareCTAProps {
  loProfile: LOProfile
  visitorState?: string // from Edge middleware
}
```

Logic:
- `visitorState` in `loProfile.licenseStates` → `"Get your {STATE} pre-approval now →"` → link to `/apply` (or `loProfile.calendlyUrl`)
- `visitorState` NOT in `loProfile.licenseStates` → `"We're happy to refer you to a licensed loan officer in your state"` → link to `/referral`
- `visitorState` unknown → `"Get pre-approved today →"` (generic fallback)

Create `middleware.ts` at root:
- Read `x-vercel-ip-country-region` header
- Pass visitor state to pages via response header or cookie
- No client-side geolocation (prevents flash)

Use `GeoAwareCTA` inside:
- `HeroSection` (below the CTA button)
- `LeadCaptureForm` (below the form)
- `LOFooter` (sticky bar)

---

## Step 8: Sync LOProfile Schema to lo-templates

In `/Users/alexfinley2/lo-templates`:
- Create branch `feature/lo-websites-v2-phase1` (or checkout if exists)
- Copy `LOProfile` types to `components/templates/types.ts` (replace existing)
- Update `data/stock-data.json` to include all new LOProfile fields:
  - Add: `plan: 'free'`, `licenseStates: ['AZ', 'CA', 'TX']`, `marketDataEnabled: false`, `seoArticlesEnabled: false`, `primaryColor: '#1e40af'`, `accentColor: '#f97316'`, `differentiators: [...]`, `targetGeos`, `targetTopics`, `seoTier`

---

## Step 9: Rebuild lo-templates Preview Templates

In `lo-templates`, rebuild the placeholder `LOView.tsx` files (at minimum template-1 through template-3) to render all 11 sections in the correct order. These can be simplified/static for preview purposes — they just need to show the structural contract visually with stock data. The full visual polish comes in Phase 2.

---

## Step 10: Archive Old Phase Docs in lo-templates

In `/Users/alexfinley2/lo-templates`:
- Rename `PHASE1_COMPLETE.md` → `PHASE0_SCAFFOLD.md`
- Rename `PHASE1_SUMMARY.md` → `PHASE0_SUMMARY.md`
- Update the contents to say "This was Phase 0 (scaffold setup). Phase 1 per PRD is the template foundation work."

---

## Commit Strategy

Commit in logical chunks in `lo-react-template` (branch: `feature/lo-websites-v2-phase1`):
- `feat: add LOProfile TypeScript schema`
- `feat: build lo-template-base component library (11 sections)`
- `feat: add UpsellGate for free tier gating`
- `feat: rebuild homepage with base components + LOProfile`
- `feat: add GeoAwareCTA with Edge middleware`
- `docs: add theme token documentation and CSS vars`

Commits in `lo-templates` (branch: `feature/lo-websites-v2-phase1`):
- `chore: sync LOProfile schema from lo-react-template`
- `chore: update stock-data.json with full LOProfile fields`
- `feat: rebuild template previews with 11-section structure`
- `chore: archive old Phase 0 scaffold docs`

---

## Done Signal

When ALL steps above are complete, run:
openclaw system event --text "Done: Phase 1 complete — lo-template-base library, LOProfile schema, GeoAwareCTA, UpsellGate, theme tokens all built in lo-react-template. lo-templates synced. Ready for Phase 2 visual themes." --mode now
