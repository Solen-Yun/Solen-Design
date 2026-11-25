# Victorian Botanical — Style Reference

> Pen-drawn branches, old paper, dark green and gold: a page from a natural history atlas.

**Theme:** light

Victorian botanical imitates the 19th-century natural history atlases and botanical illustration: an aged-paper ground (#faf5ef), dark green primary (#2d4a2d), gold (#8b6914) as accent, crimson (#6b3a3a) for flowers. The core figure is pen-drawn botany — 1px fine lines and irregular natural curves, never filled into solid shapes. Borders are 30% dark-green hairlines echoing the line work, radii stay restrained at 8px, and shadows are an extremely faint warm green. Interaction states swap the stroke for gold.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Dark Green | `#2d4a2d` | `--color-dark-green` | Primary: text, line work and main buttons. The ink-green of a specimen sheet. |
| Aged Paper | `#faf5ef` | `--color-aged-paper` | Page ground. Warm faux-aged paper, like an atlas page. |
| Gold | `#8b6914` | `--color-gold` | Accent and hover state: strokes, small marks and heading details. |
| Crimson | `#6b3a3a` | `--color-crimson` | Flowers and fruit, infrequent but striking. |
| Mid Green | `#3d5c3d` | `--color-mid-green` | Secondary line work and leaf veins. |
| Sprout | `#308323` | `--color-sprout` | New leaves and "new" marks, the brightest green. |

## Typography

### Cormorant Garamond — serif, headings at 0.04em tracking, labels at 0.18em. Line height 1.8 makes long copy read like an atlas caption column.

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 13, 16, 20, 26, 34, 46
- **Line height:** 1.2 (display), 1.3 (headings), 1.8 (body)
- **Letter spacing:** 0.04em on display, 0.18em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 46px | 1.2 | 0.04em | `--text-display` |
| heading | — | 600 | 34px | 1.3 | — | `--text-heading` |
| subheading | — | 400 | 26px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 20px | 1.75 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.8 | — | `--text-body` |
| label | — | 600 | 13px | 1.6 | 0.18em | `--text-label` |

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
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---|---|
| cards | 8px |
| buttons | 6px |
| inputs | 6px |

- **Page max-width:** 1040px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Plant Plate

**Role:** the botanical line plate (core component)

A 1:1 or 3:4 area with a plant drawn in 1px dark-green lines (stem, leaves, flowers) — the lines must curve naturally, hold a consistent weight, and never be filled. Leaf veins use mid-green 1px. Below sits a 13px monospace scientific name (italic serif) and a plate number (like "PL. XII"). The whole block carries no background and no border.

### Fine Card

**Role:** the fine-line card

Aged-paper fill, 8px radius, 1px dark-green 30% stroke, 32px padding, shadow 0 2px 8px dark green 10%. Title 34px/600 dark green, body 16px at line height 1.8. On hover the stroke turns gold 60% and the shadow widens to 18px — the main interaction change is that one line changing color.

- **States:** hover: gold border, wider shadow

### Gold Button

**Role:** action buttons

Dark-green fill, aged-paper text, 6px radius, 1px gold 40% stroke, 13px/600, 0.18em tracking, padding 12px 28px, shadow 0 2px 8px dark green 10%. On hover the stroke reaches 100% and the text turns gold; on press it shifts 1px 2px. Transition 250ms ease-out.

- **Sizes:** padding 12px 28px; label 13px
- **States:** hover: gold border and text; active: offset 1px 2px

### Sprig Rule

**Role:** the leafy divider

A 1px dark-green 30% horizontal line with a 32px sprig of line work (two leaves and a stem) at its center and fine tendrils extending at both ends. It replaces ordinary dividers and is the layout's most characteristic ornament.

### Index Label

**Role:** the atlas number

13px/600, 0.18em tracking, dark green or gold. Formats fixed as "图版 XII · 1836" or "PL. XII". It is the page's only decorative text, imitating an atlas annotation.

## Do's and Don'ts

### Do

- Pair aged paper with dark green and gold
- Keep line work 1px and unfilled
- Use 1px borders at 30% dark green
- Swap the stroke to gold on hover
- Restrain radius to 8px
- Annotate with plate numbers

### Don't

- Don't fill the line work
- Don't use thick borders
- Don't use high-saturation imagery
- Don't use full rounding
- Don't use modern sans-serif
- Don't use cool grey shadows

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Aged Paper | `#faf5ef` | Page ground |
| 1 | Green Wash | `rgba(45,74,45,0.06)` | Secondary sections |

## Elevation

- **Warm green:** `0 2px 8px rgba(45,74,45,0.10)`
- **Warm green hover:** `0 6px 18px rgba(45,74,45,0.14)`

## Imagery

Botanical line drawings, specimen photography, scanned atlas pages. Line work must be 1px and unfilled; photographs must be soft, warm and desaturated. No color illustration, modern layout or high-saturation imagery.

## Layout

Capped at 1040px with 32px container padding and 112px section gaps. An asymmetric two-column is allowed (plate left, caption right). Whitespace is generous — at least 32px between line work and text, letting the plate breathe on its own.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#2d4a2d`
- background: `#faf5ef`
- gold: `#8b6914`
- crimson: `#6b3a3a`
- mid: `#3d5c3d`
- sprout: `#308323`

EXAMPLE COMPONENT PROMPTS:

1. Build a Victorian-botanical card: aged-paper #faf5ef fill, 8px radius, 1px rgba(45,74,45,0.3) stroke, 32px padding, box-shadow 0 2px 8px rgba(45,74,45,0.1). On the left, a 3:4 plant line plate: 1px dark-green lines drawing a stem and two leaves, veins in #3d5c3d, never filled. Below, a 13px italic scientific name and a "PL. XII" label. Title 34px/600 Cormorant Garamond, 0.04em tracking, color #2d4a2d; body 16px at line height 1.8. On hover the stroke turns #8b6914 and the shadow widens to 18px. Page ground #faf5ef.
