# Theme Tokens — LO Website CSS Custom Properties

All base components use CSS custom properties for theming.
Templates override these variables to create distinct visual identities.

## Color Tokens

| Token | Default | Maps to |
|---|---|---|
| `--color-primary` | `#0ea5e9` (sky-500) | `loProfile.primaryColor` |
| `--color-primary-light` | `#e0f2fe` | Computed from primary (10% opacity bg) |
| `--color-primary-dark` | `#0284c7` | Computed from primary (hover states) |
| `--color-accent` | `#f97316` (orange-500) | `loProfile.accentColor` |
| `--color-accent-light` | `#fff7ed` | Computed from accent |
| `--hero-bg` | `#0f172a` | Hero section background |
| `--hero-bg-end` | `#1e293b` | Hero gradient end |
| `--section-bg-alt` | `#f8fafc` | Alternating section background |
| `--color-background` | `#ffffff` | Page background |
| `--color-foreground` | `#0f172a` | Primary text |
| `--color-muted` | `#64748b` | Secondary text |
| `--color-muted-light` | `#94a3b8` | Tertiary text |
| `--color-border` | `#e2e8f0` | Default borders |

## Typography Tokens

| Token | Default | Description |
|---|---|---|
| `--font-heading` | `var(--font-inter)` | Heading font family |
| `--font-body` | `var(--font-inter)` | Body font family |

## Spacing & Shape Tokens

| Token | Default | Description |
|---|---|---|
| `--radius-sm` | `0.5rem` | Small border radius (inputs, pills) |
| `--radius-md` | `0.75rem` | Medium border radius (buttons) |
| `--radius-lg` | `1rem` | Large border radius (cards, sections) |
| `--section-py` | `4rem` | Default section vertical padding |
| `--section-py-lg` | `5rem` | Large section vertical padding |

## Usage in Components

All base components reference these tokens via `var()`:

```css
.hero { background: linear-gradient(135deg, var(--hero-bg), var(--hero-bg-end)); }
.btn-primary { background-color: var(--color-primary); }
.card { border-radius: var(--radius-lg); border: 1px solid var(--color-border); }
```

## Template Overrides

Templates override tokens in their wrapping layout:

```css
:root {
  --color-primary: #1e40af; /* blue-800 */
  --color-accent: #f97316;
  --hero-bg: #1a1a2e;
}
```

Or dynamically via inline styles from `loProfile`:

```tsx
<div style={{
  '--color-primary': loProfile.primaryColor,
  '--color-accent': loProfile.accentColor,
} as React.CSSProperties}>
```
