# Ukiyo-e Digital — Style Reference

> Indigo, vermilion and gold leaf pressed inside thick lines: one woodblock printing over another.

**Theme:** light

The ukiyo-e digital style comes from Japanese woodblock printing: indigo, vermilion and gold leaf lead the palette, shapes are outlined in thick lines, fills are flat, and compositions take Hokusai-style diagonal momentum with wave patterns. The interaction language borrows from printmaking too — on hover elements shift with a hard edge (like the second block printed slightly out of register), and soft blur is never allowed. The bans are hard: no gradient shadows or soft blur, no transparency or glass, no western radii or round buttons, no neon, no spring bounce or silky easing.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Indigo | `#1a3055` | `--color-indigo` | Primary: text, thick lines and dark sections. The woodblock's "blue fold". |
| Washi | `#f5f0e1` | `--color-washi` | Paper ground. Cream washi white; every block presses onto it. |
| Vermilion | `#d4553a` | `--color-vermilion` | The first accent: seals, sunrise and warnings. The print's only warm stress. |
| Gold Leaf | `#c9a227` | `--color-gold-leaf` | Preciousness and highlights; the area must stay small, like applied foil. |
| Ultramarine | `#2a5a8c` | `--color-ultramarine` | The second blue, for water and distance; brighter than the primary indigo. |
| Young Grass | `#747800` | `--color-young-grass` | Plants and moss; the least frequent. |

## Typography

### Noto Serif SC — headings in a heavy serif with wide spacing, like a title cartouche on the print; the body uses the same family lighter, line height 1.7.

- **Substitute:** 'Songti SC', Georgia, serif
- **Weights:** 600, 700
- **Sizes:** 16, 20, 26, 34, 46, 60
- **Line height:** 1.15 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Noto Serif SC | 700 | 60px | 1.15 | 0.02em | `--text-display` |
| heading | Noto Serif SC | 700 | 46px | 1.25 | — | `--text-heading` |
| subheading | Noto Serif SC | 600 | 34px | 1.35 | — | `--text-subheading` |
| body-lg | Noto Serif SC | 600 | 20px | 1.6 | — | `--text-body-lg` |
| body | Noto Serif SC | 600 | 16px | 1.7 | — | `--text-body` |
| label | Noto Serif SC | 700 | 16px | 1.5 | 0.2em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| seals | 4px |

- **Page max-width:** 1100px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Woodblock Card

**Role:** the print card (the core component)

Washi fill, zero radius, 3px indigo stroke, 32px padding, hard shadow 4px 4px 0 indigo. A 4px vermilion bar presses across the top or bottom edge. On hover the hard shadow widens to 6px and the whole card shifts 2px 2px (the second block printed out of register), over 150ms linear.

- **States:** hover: shadow 6px, offset 2px

### Seal Button

**Role:** action button

Vermilion fill, washi text, zero radius (never round), 3px indigo stroke, 20px/700, 0.2em tracking, padding 14px 32px, hard shadow 4px 4px 0 indigo. On hover the shadow widens to 6px with the 2px 2px shift; on press the shadow drops to zero and the button sinks. Transition 120ms linear.

- **Sizes:** padding 14px 32px; label 20px
- **States:** hover: shadow 6px, offset 2px; active: shadow none

### Wave Pattern

**Role:** the wave-pattern ornament

Repeated arcs (SVG paths or assembled border-radii) drawing a Hokusai wave, 3px lines in indigo or ultramarine, 48 to 120px tall. Only along the top or bottom of a section, at most two per screen.

### Gold Seal

**Role:** the seal mark

A 32px square of vermilion or gold leaf (4px radius) holding a 20px washi-colored serif character, its edge eroded by 1px (a mask cutting a few pixels). Used to mark sections and "read".

### Cartouche Label

**Role:** the title-cartouche label

Indigo fill, washi text, zero radius, 16px/700, 0.2em tracking, padding 6px 14px, with a 3px gold-leaf vertical line on the left. For section names and numbering, usually at a block's top-left.

## Do's and Don'ts

### Do

- Lead with indigo, vermilion and gold leaf
- Outline shapes with 3px strokes
- Use hard offset shadows with zero blur
- Keep zero radius; never round buttons
- Shift elements like misregistered prints on hover
- Pair the heavy serif with wide tracking

### Don't

- Don't use gradient shadows or soft blur
- Don't use transparency or glass effects
- Don't use western radii or round buttons
- Don't use neon or saturated modern colors
- Don't use spring bounce
- Don't use silky modern easing

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Washi | `#f5f0e1` | Paper ground |
| 1 | Indigo Block | `#1a3055` | Dark sections |
| 2 | Vermilion Block | `#d4553a` | Accent sections |

## Elevation

- **Woodblock offset:** `4px 4px 0 #1a3055`
- **Woodblock hover:** `6px 6px 0 #1a3055`
- **Pressed:** `none`

## Imagery

Woodblock-style illustration: waves, Mount Fuji, flowers and birds, profile figures — always thick-stroked with flat fills. Photos may be graded into three-color woodcuts. No soft gradients, no realistic photography, no glass.

## Layout

Capped at 1100px with 24px container padding and 112px section gaps. Diagonal compositions and misaligned elements (mimicking multi-block registration) are allowed, but body copy stays readable. Zero radius runs through the whole site.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a3055`
- background: `#f5f0e1`
- vermilion: `#d4553a`
- gold: `#c9a227`
- ultramarine: `#2a5a8c`
- ink: `#1a3055`

EXAMPLE COMPONENT PROMPTS:

1. Build a ukiyo-e card: washi #f5f0e1 fill, zero radius, 3px solid #1a3055 stroke, 32px padding, box-shadow 4px 4px 0 #1a3055. Press a 4px #d4553a bar across the top. Title 46px heavy serif, 0.02em tracking, #1a3055. On hover the shadow widens to 6px 6px 0 #1a3055 with translate(2px,2px), transition 150ms linear. Buttons use #d4553a fill, washi text, zero radius, 3px indigo stroke, hard shadow. Page ground #f5f0e1. Zero radius, zero blur site-wide.
2. Build a gold seal: a 32px square of vermilion or gold leaf (4px radius) holding a 20px washi serif character, edges eroded by a mask.
