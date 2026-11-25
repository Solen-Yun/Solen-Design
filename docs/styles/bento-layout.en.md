# Bento Grid — Style Reference

> Cards of unequal size share one grid; size itself sets the hierarchy.

**Theme:** light

Bento Grid treats the page as a 4-column grid where cards span 1 column, 2 columns or 2 rows — size is the information hierarchy: the largest cell holds the primary feature, the smallest holds supplementary notes. Every gap must be identical (16px or 24px), otherwise the whole grid falls apart. Cards share a 24px radius, a whisper-light border and an almost invisible shadow; on hover they lift 4px, scale up 1% and widen the shadow to 0 8px 30px, like lifting a real box. A gradient anchor is allowed on a few cards, but never more than one per screen.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#18181b` | `--color-ink` | Headings, primary buttons and the dark anchor card. Also the contrast baseline of the whole grid. |
| Snow | `#fafafa` | `--color-snow` | Page canvas. Cards sit one step brighter and float on the luminance difference. |
| Card White | `#ffffff` | `--color-card` | Fill for every card. No grey cards — hierarchy comes only from size and content. |
| Sky | `#3b82f6` | `--color-sky` | Primary accent and icon backgrounds. Used on one anchor card or a group of icons. |
| Violet | `#8b5cf6` | `--color-violet` | Second accent, paired with Sky only on the gradient anchor card. |
| Tangerine | `#f97316` | `--color-tangerine` | Data and alerts. At most one occurrence per screen, inside a small cell. |

## Typography

### Inter — the only typeface. Card titles use 600, grid titles 700, body 400.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 24, 32
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 32px | 1.15 | -0.02em | `--text-display` |
| heading | — | 600 | 24px | 1.25 | — | `--text-heading` |
| body-lg | — | 500 | 16px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.02em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 8 | 8px | `--spacing-8` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 96 | 96px | `--spacing-96` |

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 12px |
| inputs | 12px |
| icons | 16px |

- **Page max-width:** 1152px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Bento Cell

**Role:** any card in the grid

White fill, 24px radius, 1px #f4f4f5 border, 24px padding (32px for large cells), shadow 0 2px 10px 2%. Cards span 1 column by default and can span 2 columns or 2 rows as needed. On hover they lift 4px, scale 1.01 and widen the shadow to 0 8px 30px 8%, over 300ms ease-out.

- **Sizes:** 1x1, 2x1, 2x2; padding 24px or 32px
- **States:** hover: lift 4px, scale 1.01, shadow widens

### Anchor Card

**Role:** the primary feature card, usually a 2x2 cell

Ink fill or a Sky-to-Violet 135-degree gradient, white text, 32px padding. Title 24px/600, body 14px white at 80%. Icons sit in a 48px square with a 16px radius on a 12% white background. On hover the shadow picks up the primary color (Sky 30%) and the card lifts 4px. Only one per screen.

### Bento Grid Container

**Role:** page-level grid container

1 column on mobile, 2 on tablet, 4 on desktop; a single uniform gap of 16px (compact) or 24px (relaxed) — pick one per page. Row height is fixed by grid-auto-rows in multiples of 180px so spanning cards keep stable proportions.

### Bento Tile Action

**Role:** buttons and links inside cards

Ink fill, white text, 12px radius, 14px/500 type, 8px 18px padding, tier-one shadow. On hover it turns to 80% ink and lifts 2px; on press it scales to 0.95. Inside dark cards it flips to a white fill with ink text.

## Do's and Don'ts

### Do

- Vary card sizes — size is the hierarchy
- Use one gap value per page
- Keep the 24px radius; don't mix 12px and 32px
- Finish hover within 300ms: lift 4px, scale 1%
- Keep anchor cards (gradient or ink) to one per screen
- Collapse to a single column on mobile, preserving order

### Don't

- Don't make every card the same size
- Don't mix two gap values on one page
- Don't use square corners
- Don't use hard offset shadows (the neo-brutalist set)
- Don't stuff more than three content blocks into one card
- Don't leave a row with a single card

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Snow | `#fafafa` | Page canvas |
| 1 | Card White | `#ffffff` | Standard card |
| 2 | Ink Anchor | `#18181b` | Primary feature card, at most one per screen |

## Elevation

- **Card rest:** `0 2px 10px rgba(0,0,0,0.02)`
- **Card hover:** `0 8px 30px rgba(0,0,0,0.08)`
- **Anchor card hover:** `0 12px 40px rgba(59,130,246,0.30)`

## Imagery

Cards favor product screenshots, data charts, icon grids and small motion clips. One anchor card may use a gradient in place of imagery. No large portrait photography or decorative illustration — they break the grid.

## Layout

4-column grid, 1152px cap, 16px or 24px gap, 180px row base. Spans must come in pairs: every 2x2 needs at least two 1x1 cells so no row holds a single card. On mobile the grid degrades to a single-column flow with the same gap and padding values.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope, based on the pages, tasks and real content in the user's request; flag missing business information instead of inventing data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features that weren't requested.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop while preserving hierarchy and avoiding accidental horizontal overflow.
- Handle keyboard focus and reduced motion for the interactions you touch; add disabled, loading, empty and error states where they apply.
- When finished, run the project's existing checks and report only the tests and visual inspections you actually ran, listing what remains unverified.

QUICK COLOR REFERENCE:

- text: `#18181b`
- background: `#fafafa`
- card: `#ffffff`
- accent: `#3b82f6`
- secondary: `#8b5cf6`
- border: `#f4f4f5`

EXAMPLE COMPONENT PROMPTS:

1. Build a bento grid: 4 columns on desktop, 16px gap, 180px row base. The first card spans 2 columns and 2 rows, ink fill, white text, 32px padding, 24px radius; the rest are white cards with 24px radius, a 1px #f4f4f5 border and 24px padding. On hover every card lifts 4px, scales 1.01, and its shadow widens from 0 2px 10px rgba(0,0,0,0.02) to 0 8px 30px rgba(0,0,0,0.08), over 300ms ease-out.

## Quick Start

```css

:root {
  /* Colors */
  --color-ink: #18181b;
  --color-snow: #fafafa;
  --color-card: #ffffff;
  --color-sky: #3b82f6;
  --color-violet: #8b5cf6;
  --color-tangerine: #f97316;

  /* Typography — Font Families */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-display: 32px;
  --leading-display: 1.15;
  --tracking-display: -0.02em;
  --text-heading: 24px;
  --leading-heading: 1.25;
  --text-body-lg: 16px;
  --leading-body-lg: 1.5;
  --text-body: 14px;
  --leading-body: 1.6;
  --text-label: 12px;
  --leading-label: 1.4;
  --tracking-label: 0.02em;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 8px;
  --spacing-8: 8px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-96: 96px;

  /* Layout */
  --page-max-width: 1152px;
  --section-gap: 64px;
  --card-padding: 24px;
  --element-gap: 16px;
  --density: comfortable;

  /* Border Radius */
  --radius-cards: 24px;
  --radius-buttons: 12px;
  --radius-inputs: 12px;
  --radius-icons: 16px;

  /* Surfaces */
  --surface-snow: #fafafa;
  --surface-card-white: #ffffff;
  --surface-ink-anchor: #18181b;
}

```
