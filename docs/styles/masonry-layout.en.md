# Masonry Layout — Style Reference

> Cards of uneven height flow down the columns; the scan line is never horizontal.

**Theme:** light

Masonry is an arrangement strategy: card width is fixed and height follows content, letting a multi-column container create natural stagger. Its visual language must yield to the content — white cards, 8 to 16px radius, whisper-light borders, imagery covering 60%+ of each card. Spacing must be strictly uniform (16px), otherwise stagger turns into chaos. On hover the image slowly scales to 1.05 with a 4% black veil; the card itself never lifts and never gains a shadow, because any displacement breaks the stability of the columns. Filter bars use pill buttons; the selected state fills with the primary color.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Midnight | `#1a1a2e` | `--color-midnight` | Headings, selected states and dark blocks. Near-black with a hint of violet that cooperates with photo content. |
| Mist | `#f5f5f5` | `--color-mist` | Page canvas. One step below white so white card edges read clearly. |
| Card White | `#ffffff` | `--color-card-white` | Fill for every card. White cards let imagery be the only visual weight — the card never competes. |
| Rose Red | `#e94560` | `--color-rose-red` | Primary accent: likes, favorites and selected pills. The only high-saturation color on the site. |
| Mint | `#16c79a` | `--color-mint` | Success and new-content marks, badges only. |
| Amber | `#ffd460` | `--color-amber` | Highlights and featured slots, never more than 10% of a card. |
| Indigo | `#7579e7` | `--color-indigo` | Links and secondary actions, a warm-cold counterpoint to Rose Red. |

## Typography

### Inter — the only typeface. Card titles 600, captions 400; sizes run small to stay readable at density.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 13, 15, 18, 24, 32
- **Line height:** 1.2 (display), 1.3 (headings), 1.55 (body)
- **Letter spacing:** -0.01em on display, 0.03em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 32px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 24px | 1.3 | — | `--text-heading` |
| body-lg | — | 500 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 15px | 1.55 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.03em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 16px |
| buttons | 999px |
| inputs | 12px |
| images | 12px |

- **Page max-width:** 1440px
- **Section gap:** 64px
- **Card padding:** 16px
- **Element gap:** 16px

## Components

### Masonry Card

**Role:** any card in the masonry flow

White fill, 16px radius, 1px #e8e8e8 border, no shadow, 16px padding. Imagery covers 60%+ of the card height, 12px radius, lazy-loaded. Below the image: a 15px/600 title (two lines max) and a 13px grey caption (one line max). On hover the image scales 1.05 with a 4% black veil — the card itself never moves. 400ms ease-out transitions.

- **Sizes:** image ≥ 60% of height; padding 16px
- **States:** hover: image scale 1.05 + 4% black veil

### Filter Pill

**Role:** top filter option

Full-round, 36px tall, 0 16px padding, 13px/500. Default: white fill with a 1px border; selected: midnight fill with white text; hover deepens border and text only, never the fill. The whole filter row scrolls horizontally, never wraps.

- **States:** hover: darker border; selected: midnight fill

### Search Bar

**Role:** top search

Mist background, 12px radius, 1px #e8e8e8 border, 40px tall, 40px left padding for a 16px icon, 13px type. On focus the border turns midnight with a 2px midnight 12% outer ring.

### Column Container

**Role:** masonry container

4–5 columns on desktop, 3 on tablet, 2 on mobile; column and row gaps both fixed at 16px. Build with CSS columns or grid row-span; absolute positioning is forbidden. Card heights are never unified, but the space between neighboring cards in one column must equal the row gap.

## Do's and Don'ts

### Do

- Keep column gap and row gap the same value
- Let card height follow content; no uniform cropping
- Keep imagery at 60%+ of the card
- On hover move only the image, never the card
- Let the filter row scroll horizontally without wrapping
- Use CSS columns or grid; never absolute positioning

### Don't

- Don't fake masonry with absolute positioning
- Don't lift cards — it breaks column alignment
- Don't mix two spacing values
- Don't write titles longer than two lines
- Don't add shadows to cards
- Don't unify crop ratios

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Mist | `#f5f5f5` | Page canvas |
| 1 | Card White | `#ffffff` | Cards |

## Elevation

- **Card:** `none — the border separates it`
- **Card hover:** `none — only the image moves`

## Imagery

Imagery is the subject, covering 60%+ of each card. Styles may mix (photography, illustration, screenshots), but aspect ratios must follow content — no unified cropping. No large flat color placeholders or decorative shapes.

## Layout

1440px cap, 16px container padding, scroll-to-load pagination. Column count follows breakpoints: ≥1280 five columns, ≥1024 four, ≥768 three, two on mobile. All spacing is fixed 16px; the filter bar sits 8px below the top.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope, based on the pages, tasks and real content in the user's request; flag missing business information instead of inventing data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features that weren't requested.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop while preserving hierarchy and avoiding accidental horizontal overflow.
- Handle keyboard focus and reduced motion for the interactions you touch; add disabled, loading, empty and error states where they apply.
- When finished, run the project's existing checks and report only the tests and visual inspections you actually ran, listing what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1a2e`
- background: `#f5f5f5`
- card: `#ffffff`
- accent: `#e94560`
- muted: `#8a8a94`
- border: `#e8e8e8`

EXAMPLE COMPONENT PROMPTS:

1. Build a masonry gallery: CSS columns with four columns, 16px column and row gaps. Cards are white with 16px radius, a 1px #e8e8e8 border, no shadow, 16px padding. Images have 12px radius and cover 60%+ of the card height, followed by a 15px/600 title (two-line clamp) and a 13px #8a8a94 caption. On hover the image scales 1.05 with a 4% black veil, the card stays put, 400ms ease-out.

## Quick Start

```css

:root {
  /* Colors */
  --color-midnight: #1a1a2e;
  --color-mist: #f5f5f5;
  --color-card-white: #ffffff;
  --color-rose-red: #e94560;
  --color-mint: #16c79a;
  --color-amber: #ffd460;
  --color-indigo: #7579e7;

  /* Typography — Font Families */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-display: 32px;
  --leading-display: 1.2;
  --tracking-display: -0.01em;
  --text-heading: 24px;
  --leading-heading: 1.3;
  --text-body-lg: 18px;
  --leading-body-lg: 1.5;
  --text-body: 15px;
  --leading-body: 1.55;
  --text-label: 12px;
  --leading-label: 1.4;
  --tracking-label: 0.03em;

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

  /* Layout */
  --page-max-width: 1440px;
  --section-gap: 64px;
  --card-padding: 16px;
  --element-gap: 16px;
  --density: comfortable;

  /* Border Radius */
  --radius-cards: 16px;
  --radius-buttons: 999px;
  --radius-inputs: 12px;
  --radius-images: 12px;

  /* Surfaces */
  --surface-mist: #f5f5f5;
  --surface-card-white: #ffffff;
}

```
