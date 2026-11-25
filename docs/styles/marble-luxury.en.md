# Marble Luxury — Style Reference

> Marble white, a thin antique-gold line, the finest serif: everything says "no rush".

**Theme:** light

Marble luxury is the language of high-end hotels and property: a marble-white ground (#f8f6f3), pure-black text (#1a1a1a), antique gold (#c9a96e) only as 1px dividers and fine borders, serif type kept light, tracking opened past 0.2em. Its luxury comes from "less but better" — no shadows, no gradients, no decorative figures, only proportion, whitespace and that one gold line. Stone texture appears as an extremely faint ground (5% to 8% opacity), never as a showy marble photo.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Marble White | `#f8f6f3` | `--color-marble-white` | Page ground. A white with a hint of warmth, like polished stone. |
| Black | `#1a1a1a` | `--color-black` | All text. Pure black, no grey mixed in. |
| Antique Gold | `#c9a96e` | `--color-antique-gold` | The only accent: 1px dividers, fine borders and small marks. |
| Stone Grey | `#8a7968` | `--color-stone-grey` | Secondary text and the dark lines of the texture. |
| Pale Stone | `#e8e0d6` | `--color-pale-stone` | Secondary sections and card backings, one step deeper than the ground. |
| Jade | `#85bd73` | `--color-jade` | A trace amount for "nature" and "garden" semantics, least frequent. |

## Typography

### Cormorant Garamond — a light serif, weights 300 and 400 only. Headings at 0.04em tracking, labels at 0.28em, line height 1.85 — slowness is its syntax.

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 300, 400
- **Sizes:** 13, 15, 18, 24, 34, 48
- **Line height:** 1.2 (display), 1.35 (headings), 1.85 (body)
- **Letter spacing:** 0.04em on display, 0.28em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 300 | 48px | 1.2 | 0.04em | `--text-display` |
| heading | — | 300 | 34px | 1.3 | 0.04em | `--text-heading` |
| subheading | — | 400 | 24px | 1.4 | — | `--text-subheading` |
| body-lg | — | 300 | 18px | 1.8 | — | `--text-body-lg` |
| body | — | 300 | 15px | 1.85 | — | `--text-body` |
| label | — | 400 | 13px | 1.6 | 0.28em | `--text-label` |

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

- **Page max-width:** 1120px
- **Section gap:** 240px
- **Card padding:** 48px
- **Element gap:** 40px

## Components

### Gold Rule

**Role:** the antique-gold rule (core structure)

1px, antique gold 30%, spanning the content width and inset 5% at each end. It replaces every other means of separation — no shadows, no color blocks, no whitespace bars. The whole weight of the luxury sits on this line.

### Marble Card

**Role:** content cards

Marble-white or pale-stone fill, zero radius, 1px antique-gold 20% stroke, 48px padding, no shadow. Title 34px/300 black, 0.04em tracking; body 15px/300 at line height 1.85. On hover only the stroke rises to 40%, nothing else changes.

### Quiet Button

**Role:** action buttons

Transparent ground, 1px black 40% stroke, zero radius, 13px/400, 0.28em tracking, padding 18px 40px, no shadow. On hover the stroke turns antique gold 100% and the text turns antique gold; on press the stroke thickens to 2px while the position holds. Transition 500ms ease-out.

- **Sizes:** padding 18px 40px; label 13px
- **States:** hover: gold border and text; active: border 2px

### Stone Vein

**Role:** the stone-vein ground

SVG feTurbulence with feDisplacementMap (very low frequency, fine lines) generates a few irregular veins in stone grey at 5% to 8% opacity, appearing only on large section backgrounds. Its presence should be almost imperceptible — if you notice it, it's too heavy.

### Index Mark

**Role:** numbers and small marks

13px/400, 0.28em tracking, antique gold or stone grey. Formats like "01 — 04" or "EST. 1987". It is the only small type on the page besides headings, and the only decorative text allowed.

## Do's and Don'ts

### Do

- Pair marble white with pure-black text
- Spend antique gold only on 1px lines and fine borders
- Use serif weights 300 and 400 only
- Open tracking past 0.2em
- Keep zero radius and zero shadow
- Let whitespace claim over sixty percent

### Don't

- Don't use shadows
- Don't use gradients
- Don't spread gold into surfaces
- Don't use thick borders
- Don't use decorative figures
- Don't let the veins draw the eye

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Marble White | `#f8f6f3` | Page ground |
| 1 | Pale Stone | `#e8e0d6` | Secondary sections |

## Elevation

- **None:** `none — flat stone, no shadow`

## Imagery

Architectural and interior photography: stone, metal, glass, precisely proportioned space. Natural light, low saturation, restrained composition required. Photos may be graded into warm monochrome. No saturated photography, decorative illustration or portrait close-ups.

## Layout

Capped at 1120px with 32px container padding and 240px section gaps. Whitespace claims over sixty percent of the page. One column or a restrained two — everything left-aligned or strictly centered, with offsets and rotation banned.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#f8f6f3`
- gold: `#c9a96e`
- stone: `#8a7968`
- pale: `#e8e0d6`
- jade: `#85bd73`

EXAMPLE COMPONENT PROMPTS:

1. Build a marble-luxury card: marble-white #f8f6f3 fill, zero radius, 1px rgba(201,169,110,0.2) stroke, 48px padding, no shadow. Title 34px/300 Cormorant Garamond, 0.04em tracking, color #1a1a1a; body 15px/300 at line height 1.85. Cards separate with a 1px rgba(201,169,110,0.3) antique-gold line inset 5% at each end. Margins carry 240px of whitespace; the background may layer 5%-opacity fine stone veins (feTurbulence). Button transparent, 1px black 40% stroke, zero radius, 13px at 0.28em tracking, padding 18px 40px, the stroke and text turning #c9a96e on hover. Page ground #f8f6f3.
