# Luxury Retail — Style Reference

> Warm white, large 3:4 product images, hairline buttons: the price never has to shout.

**Theme:** light

Luxury retail is the boutique's e-commerce language: a warm-white ground (#faf9f6) rather than pure white, serif headings (#1a1a1a), gold (#c9a96e) appearing only on borders, dividers and icons, product imagery shown large (at least 3:4), buttons as transparent fills with hairline borders that invert on hover, and body copy set with wider tracking at a looser line height. Dividers are uniformly 1px warm grey (#e8e0d4), never heavy separations. Its restraint comes from "no explanation" — no promo labels, no discount badges, no scrolling banners.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Warm White | `#faf9f6` | `--color-warm-white` | Page ground. A white with a hint of warmth — costlier than pure white. |
| Black | `#1a1a1a` | `--color-black` | Headings, body copy and button strokes. |
| Gold | `#c9a96e` | `--color-gold` | The only accent: borders, dividers and icons. Never a ground. |
| Antique Brown | `#8b7355` | `--color-antique-brown` | Secondary text and material cues. |
| Pale Sand | `#e8e0d4` | `--color-pale-sand` | Every 1px divider and secondary section. |
| Graphite | `#2c2c2c` | `--color-graphite` | The inverted fill on hover and dark sections. |

## Typography

### Cormorant Garamond — a light serif; headings at 300 weight with 0.02em tracking; body copy set with wider tracking at 1.85 line height.

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 300, 400
- **Sizes:** 13, 16, 19, 26, 34, 46
- **Line height:** 1.25 (display), 1.35 (headings), 1.85 (body)
- **Letter spacing:** 0.02em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 300 | 46px | 1.25 | 0.02em | `--text-display` |
| heading | — | 300 | 34px | 1.3 | 0.02em | `--text-heading` |
| subheading | — | 400 | 26px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 19px | 1.8 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.85 | — | `--text-body` |
| label | — | 400 | 13px | 1.6 | 0.2em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** airy

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
| 160 | 160px | `--spacing-160` |
| 240 | 240px | `--spacing-240` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| media | 0 |

- **Page max-width:** 1280px
- **Section gap:** 160px
- **Card padding:** 32px
- **Element gap:** 32px

## Components

### Product Frame

**Role:** product display (core component)

Product imagery at a fixed minimum ratio of 3:4 (3:4 or taller), filling the container's width with zero radius, zero border and zero shadow. 24px below the image sit the product name (19px serif) and price (16px, neither bold nor red). The image must be the sole protagonist, with whitespace around it at least 10% of its width.

- **Sizes:** aspect 3:4 or taller

### Outline Button

**Role:** action buttons

Transparent ground, 1px black 60% stroke, zero radius, 13px/400, 0.2em tracking, padding 16px 40px, no shadow. On hover the fill turns black and the text turns warm white (inverted); on press it stays inverted with an unchanged stroke. Transition 300ms ease-out.

- **Sizes:** padding 16px 40px; label 13px
- **States:** hover: inverted; active: inverted, border unchanged

### Gold Hairline

**Role:** gold lines and warm-grey separators

Two kinds of 1px line: semantic separators in warm grey #e8e0d4 (spanning the content width), emphatic separators in gold #c9a96e (inset 15% at each end). Never above 2px, never dashed.

### Quiet Field

**Role:** form inputs

Transparent ground with only a bottom 1px warm-grey stroke (no enclosing border), padding 12px 0, 16px serif. On focus the underline turns gold and stays 1px.

### Range Label

**Role:** collection and category labels

13px/400, 0.2em tracking, uppercase, gold or antique brown, no ground and no border. It is the page's only decorative small type, used for collection names and seasons (like "SPRING · 2026").

## Do's and Don'ts

### Do

- Ground in warm white, never pure white
- Let gold appear only on lines and icons
- Show product imagery at 3:4 or taller, and large
- Use hairline buttons that invert on hover
- Separate with 1px warm grey
- Keep prices unbolded and unred

### Don't

- Don't use promo labels or discount badges
- Don't use scrolling banners
- Don't use dividers above 2px
- Don't use rounded corners
- Don't use shadows
- Don't spread gold into a ground

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm White | `#faf9f6` | Page ground |
| 1 | Pale Sand | `#e8e0d4` | Secondary sections |
| 2 | Graphite | `#2c2c2c` | Inverted sections |

## Elevation

- **None:** `none — a shadow would suggest a discount`

## Imagery

Product photography: white or pale-sand grounds, a single light source, precise composition, always 3:4 or taller and shown large. Material close-ups are allowed. No model lifestyle shots, promo graphics or multi-color backgrounds.

## Layout

Capped at 1280px with 32px container padding and 160px section gaps. The product grid runs 2 columns (mobile) to 3 (desktop) with 32px gaps. Whitespace claims over sixty percent of the page. Zero radius and zero shadow throughout.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#faf9f6`
- gold: `#c9a96e`
- brown: `#8b7355`
- sand: `#e8e0d4`
- graphite: `#2c2c2c`

EXAMPLE COMPONENT PROMPTS:

1. Build a luxury-retail product card: warm-white #faf9f6 ground, zero radius, zero border, zero shadow, with the product image at 3:4 filling the card width and whitespace around it at 10% of that width. 24px below the image, a 19px serif product name and a 16px price (never bold). Button transparent with a 1px rgba(26,26,26,0.6) stroke, zero radius, 13px at 0.2em tracking, padding 16px 40px, inverting on hover to #1a1a1a fill with #faf9f6 text. Separators use 1px #e8e0d4, emphatic ones 1px #c9a96e inset 15% at each end. Collection labels 13px uppercase at 0.2em in gold. Page ground #faf9f6.
