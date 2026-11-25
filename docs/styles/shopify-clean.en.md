# Clean Commerce — Style Reference

> The product photo decides: the interface exists only so the price and button cannot be missed.

**Theme:** light

Clean commerce is a conversion-oriented interface for independent stores, its rules derived from business logic: the ground must be white or extremely light grey, because any dark tone distorts how product photos read; product cards must hold a fixed ratio (1:1 or 3:4) so the grid aligns; price is the highest-contrast element on the page at 18px bold; the original price sits beside it at 14px struck-through grey; the primary button uses only brand green #008060, and it must be saturated enough because it is the one thing meant to be clicked. Listing pages forbid large decorative elements — they compete with the merchandise for attention.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| White | `#ffffff` | `--color-white` | Product pages and card grounds. Must be white — any cast tints the product photo. |
| Light Grey | `#f7f7f8` | `--color-light-grey` | Listing-page ground and section separation. One step down, letting white cards float. |
| Brand Green | `#008060` | `--color-brand-green` | The only primary action color. Buy, add-to-cart and checkout all use it. |
| Ink | `#1a1a1a` | `--color-ink` | Titles and price. Price must carry the highest contrast. |
| Line Grey | `#e3e3e3` | `--color-line-grey` | Card strokes and dividers. 1px, barely part of the visual. |
| Gold | `#ffd700` | `--color-gold` | Rating stars and "best seller" marks, extremely small in area. |

## Typography

### Inter — the only typeface. Price at 18px/700, headings 24 to 32px, supporting text 12px grey.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 11, 12, 14, 16, 18, 24, 32
- **Line height:** 1.2 (display), 1.3 (headings), 1.55 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 32px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 24px | 1.3 | — | `--text-heading` |
| price | — | 700 | 18px | 1.3 | — | `--text-price` |
| body-lg | — | 400 | 16px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.55 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.02em | `--text-label` |

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
| cards | 8px |
| buttons | 8px |
| inputs | 8px |
| images | 8px |
| badges | 999px |

- **Page max-width:** 1280px
- **Section gap:** 64px
- **Card padding:** 16px
- **Element gap:** 12px

## Components

### Buy Button

**Role:** buy and add-to-cart

Brand-green fill, white text, 8px radius, no stroke, 16px/600, padding 12px 24px, no shadow. On hover the fill deepens to #006b50; on press it scales 0.98. The full-width version serves detail pages, the fixed version the mobile bottom bar. Low-saturation greens and outlined variants are banned.

- **Sizes:** padding 12px 24px; label 16px
- **States:** hover: #006b50; active: scale 0.98

### Product Card

**Role:** product cards

White ground, 8px radius, 1px #e3e3e3 stroke, 16px padding. The image area holds a fixed aspect-ratio of 1:1 or 3:4, 8px radius, no filters. Below it a 14px product name (at most two lines), then the 18px/700 price beside the 14px struck-through grey original. On hover the shadow rises to 0 4px 12px black 8% and the image scales 1.02.

- **Sizes:** image aspect 1:1 or 3:4
- **States:** hover: shadow, image scale 1.02

### Price Stack

**Role:** price and discount marks

Current price 18px/700 in ink; original price 14px/400 grey (#6b7280) with line-through, 8px from the current price; the discount uses a 999px gold label (12px/600, ink text, padding 2px 8px). All three must sit on one line and must not overflow or wrap on mobile.

### Trust Row

**Role:** the trust bar

Three horizontally arranged 12px grey captions with 16px line icons (free shipping, 30-day returns, authenticity guarantee), spaced 24px, icons in brand green. Placed below the buy button or beside the product photo, with no border.

### Sticky Buy Bar

**Role:** the mobile sticky buy bar

Top 1px #e3e3e3 border, white ground, padding 12px 16px, shadow 0 -4px 12px black 6%. The left shows the 18px/700 price (may include the discount tag), the right a full-width Buy Button. Always visible, never hidden on scroll.

## Do's and Don'ts

### Do

- Use a white or light grey ground so products read true
- Fix image ratios at 1:1 or 3:4
- Make price the highest-contrast element on the page
- Use only saturated brand green for the primary button
- Set the struck original price beside the current one
- Pair trust marks with small icons and 12px text

### Don't

- Don't use dark primary backgrounds
- Don't add large decoration to listing pages
- Don't use a low-contrast price color
- Don't let the CTA be desaturated
- Don't filter or tint product photos
- Don't use irregular image ratios

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Light Grey | `#f7f7f8` | Listing-page ground |
| 1 | White | `#ffffff` | Product cards and detail pages |

## Elevation

- **Card rest:** `none — 1px border only`
- **Card hover:** `0 4px 12px rgba(0,0,0,0.08)`
- **Sticky bar:** `0 -4px 12px rgba(0,0,0,0.06)`

## Imagery

Product photography is the only imagery: white or very light grounds, no filters or color overlays, uniform ratios. Multiple angles of the same product and detail close-ups are allowed. No scene shots as main images, decorative illustration or icon walls.

## Layout

Capped at 1280px with 16px container padding and a product grid of 2 columns (mobile) / 3 (tablet) / 4 (desktop), 16px gaps. Detail pages run image left and information right at 50% each, with the information column pinned in the viewport. Listing pages forbid any decorative block taller than 200px.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#ffffff`
- surface: `#f7f7f8`
- primary: `#008060`
- border: `#e3e3e3`
- muted: `#6b7280`

EXAMPLE COMPONENT PROMPTS:

1. Build a commerce product card: white ground, 8px radius, 1px #e3e3e3 stroke, 16px padding. Image area aspect-ratio 1/1, 8px radius, object-fit cover, no filters. Below it a 14px product name (at most two lines), an 18px/700 #1a1a1a price beside a 14px #6b7280 struck-through original. On hover the shadow becomes 0 4px 12px rgba(0,0,0,0.08) and the image scales 1.02. The buy button uses #008060 fill, 8px radius, white text at 16px/600.
