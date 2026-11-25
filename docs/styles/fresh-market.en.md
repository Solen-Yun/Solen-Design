# Fresh Market — Style Reference

> Warm cream, pumpkin orange, leaf green: an interface that makes you want to buy vegetables.

**Theme:** light

Fresh market is the e-commerce language of food, produce and organic brands: a warm cream ground (#fef9f0), a pumpkin-orange primary button (#e8722a, fully rounded), deep green (#2d5016) carrying headings and the "organic" idea, category tags as pale-green pills (#d4e4bc), prices in golden-yellow blocks (#f5c542) with brown text (#8b4513), product cards with large radii (16px) and soft shadows, and 12px image radii to soften edges. Its sense of trust comes from temperature rather than decoration — the colors run warm, the radii run large, the shadows run very light.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Warm Cream | `#fef9f0` | `--color-warm-cream` | Page ground. A yellow-leaning cream that keeps food photos looking fresh. |
| Leaf Green | `#2d5016` | `--color-leaf-green` | Headings and "organic" semantics. The style's source of trust. |
| Pumpkin | `#e8722a` | `--color-pumpkin` | Primary button and key accents — the only action color. |
| Marigold | `#f5c542` | `--color-marigold` | Price tag ground and promo badges. |
| Brown | `#8b4513` | `--color-brown` | Text pressed onto marigold, plus crate and packaging semantics. |
| Pale Green | `#d4e4bc` | `--color-pale-green` | Category pills and light section grounds. |

## Typography

### Nunito — rounded sans; 600 and 700 for headings, 400 for body. The letterforms must not come to a point — food has no edges.

- **Substitute:** system-ui, -apple-system, 'PingFang SC', sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 12, 14, 16, 20, 26, 34
- **Line height:** 1.25 (display), 1.35 (headings), 1.65 (body)
- **Letter spacing:** -0.01em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 34px | 1.25 | -0.01em | `--text-display` |
| heading | — | 700 | 26px | 1.3 | — | `--text-heading` |
| subheading | — | 600 | 20px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.65 | — | `--text-body` |
| label | — | 700 | 12px | 1.4 | 0.04em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
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
| pills | 999px |

- **Page max-width:** 1200px
- **Section gap:** 64px
- **Card padding:** 16px
- **Element gap:** 12px

## Components

### Pumpkin Button

**Role:** the primary action button

Pumpkin-orange fill, white text, fully rounded 999px, no stroke, 16px/700, padding 12px 24px, shadow 0 2px 8px green 6%. On hover the fill deepens to #d0621f and the shadow widens to 20px; on press it scales 0.98. Touch height never below 48px.

- **Sizes:** min-height 48px; padding 12px 24px
- **States:** hover: #d0621f; active: scale 0.98

### Produce Card

**Role:** product cards

White ground, 16px radius, 1px pale-green 60% stroke, 16px padding, shadow 0 2px 8px green 6%. The image holds a fixed 1:1 at a 12px radius filling the card's width. Below it a 14px product name (at most two lines) and a 16px/700 deep-green price beside a 999px marigold 20% tag. On hover the shadow widens to 20px and the card lifts 2px.

### Category Pill

**Role:** category pill tags

Pale-green fill, deep-green text, fully rounded 999px, no stroke, 12px/700, 0.04em tracking, padding 6px 14px. The selected state raises its ground to deep green and turns the text cream. Used for category filters and product attributes.

### Price Tag

**Role:** the price tag

A marigold block with brown text, 8px radius, padding 2px 8px, 16px/700. The original price sits beside it at 12px struck-through brown, 8px away. Price is always the highest-contrast element on the card.

### Fresh Badge

**Role:** freshness badges

A 48px circle filled pale green or marigold with a deep-green icon or single character and a 1px white 60% stroke. Placed at the product image's top-left to mark "in season", "organic" or "local". It must carry text or an icon, never color alone.

## Do's and Don'ts

### Do

- Pair the warm cream ground with pumpkin orange and deep green
- Make the primary button fully round, at least 48px tall
- Keep price the highest-contrast element on the card
- Use pale-green pills for categories
- Fix product images at 1:1 with a 12px radius
- Keep shadows very light and green-tinted

### Don't

- Don't use dark or cold-lit photography
- Don't go below an 8px radius
- Don't use heavy shadows
- Don't let price lose contrast
- Don't use cool grey as a neutral
- Don't mark freshness with color alone

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm Cream | `#fef9f0` | Page ground |
| 1 | White | `#ffffff` | Product cards |
| 2 | Pale Green | `#d4e4bc` | Category sections |

## Elevation

- **Soft:** `0 2px 8px rgba(45,80,22,0.06)`
- **Soft hover:** `0 6px 20px rgba(45,80,22,0.10)`

## Imagery

Food and ingredient photography: vegetables, bread, dairy, market scenes. Natural light, warm tones, clean backgrounds required. Flat-lay overhead shots allowed. No dark photography, processed close-ups or cold light.

## Layout

Capped at 1200px with 16px container padding, a product grid of 2 (mobile) to 4 (desktop) columns at 12 to 16px gaps, and 64px section gaps. Radii uniformly favor the large end, never below 8px.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#2d5016`
- background: `#fef9f0`
- card: `#ffffff`
- pumpkin: `#e8722a`
- marigold: `#f5c542`
- pale: `#d4e4bc`

EXAMPLE COMPONENT PROMPTS:

1. Build a fresh-market product card: white ground, 16px radius, 1px rgba(212,228,188,0.6) stroke, 16px padding, shadow 0 2px 8px rgba(45,80,22,0.06). Image 1:1, 12px radius, filling the card width. Below it a 14px product name and a marigold #f5c542 price tag (8px radius, brown #8b4513 text, 16px/700). At the image's top-left a 48px pale-green #d4e4bc circular badge. Primary button pumpkin #e8722a fill, white text, fully rounded 999px, minimum height 48px. Page ground #fef9f0, grid of 2 to 4 columns at 12px gaps.
