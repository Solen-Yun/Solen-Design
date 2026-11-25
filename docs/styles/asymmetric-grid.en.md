# Asymmetric Grid — Style Reference

> Unequal column widths, elements pressing on each other: the tension comes from imbalance, not decoration.

**Theme:** light

The asymmetric grid manufactures tension through unequal column widths: grid-template-columns written as ratios like 1fr 2fr 0.6fr, elements overlapping via negative translate and explicit z-index, a type hierarchy stretched to extremes (12px beside 120px), and hard-edged offset shadows that reinforce the sense of physical peeling. Its bans are quality lines you can operate by — no equal column widths, no perfectly aligned elements without variation, no ignoring mobile, no chaos that loses readability, no elements of similar size. The first rules create tension; the last two keep tension from becoming noise.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#0f0f0f` | `--color-ink` | Text, blocks and hard shadows. The structure's entire weight. |
| White | `#ffffff` | `--color-white` | Canvas. Pure white keeps blocks and shadows sharp. |
| Tension Red | `#ff3366` | `--color-tension-red` | Primary accent: the largest block and the boldest headline. |
| Signal Cyan | `#00d4ff` | `--color-signal-cyan` | Second accent, a cool counterpoint to red. |
| Alert Yellow | `#ffcc00` | `--color-alert-yellow` | Highlights and label grounds, pulling elements out of the overlaps. |
| Rust | `#b45700` | `--color-rust` | The darkest accent, for text pressed onto yellow. |

## Typography

### Inter — the only typeface. The size hierarchy must stretch: 12px and 120px on one screen is normal.

- **Substitute:** 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 700, 900
- **Sizes:** 12, 16, 24, 40, 72, 120
- **Line height:** 0.95 (display), 1.05 (headings), 1.55 (body)
- **Letter spacing:** -0.03em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 120px | 0.95 | -0.03em | `--text-display` |
| heading-lg | — | 900 | 72px | 1 | -0.03em | `--text-heading-lg` |
| heading | — | 700 | 40px | 1.05 | -0.02em | `--text-heading` |
| subheading | — | 700 | 24px | 1.2 | — | `--text-subheading` |
| body | — | 400 | 16px | 1.55 | — | `--text-body` |
| label | — | 700 | 12px | 1.4 | 0.06em | `--text-label` |

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
| inputs | 0 |

- **Page max-width:** 1440px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Uneven Grid

**Role:** the uneven grid (core structure)

grid-template-columns uses ratios like 1fr 2.2fr 0.6fr or 2fr 1fr 1.4fr — three equal columns never appear. A 12-column base with 16px gutters, but each row may combine columns differently. On mobile it collapses to one column and drops the negative offsets.

### Overlap Block

**Role:** the overlapping block

A filled block presses onto its neighbor with -translate-x-8 and -translate-y-4, z-index set explicitly (adjacent layers differ by 10). Zero radius, hard shadow 6px 6px 0 ink or red. Overlap stays between 16 and 48px — beyond that it eats content.

### Contrast Headline

**Role:** the extreme-contrast headline

120px/900, line height 0.95, -0.03em tracking, forming a 10× size gap against the 12px label below it. The headline may span two columns and press onto other elements, but text must always sit on the top layer and stay readable.

### Label Chip

**Role:** the small label

Alert-yellow fill, ink text, zero radius, 12px/700, 0.06em tracking, padding 4px 10px. It often lands on the edge of an overlap zone, explaining "what this block is", contrasting with the huge headline.

### Edge Button

**Role:** action buttons

Tension-red fill, white text, zero radius, 16px/700, padding 14px 28px, hard shadow 6px 6px 0 ink. On hover the shadow switches to signal cyan; on press it translates 6px 6px with the shadow collapsing. Transition 120ms linear.

## Do's and Don'ts

### Do

- Keep column widths unequal
- Overlap with negative offsets and z-index
- Stretch the type hierarchy to 10×
- Sharpen the剥离 feel with hard offset shadows
- Collapse to one column without overlaps on mobile
- Hold overlap between 16 and 48px

### Don't

- Don't make column widths equal
- Don't align everything neatly without variation
- Don't skip the mobile responsive pass
- Don't clutter past readability
- Don't keep elements at similar sizes
- Don't let overlaps eat content

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | Canvas |
| 1 | Ink Block | `#0f0f0f` | Dark blocks |
| 2 | Red Block | `#ff3366` | Accent blocks |

## Elevation

- **Hard offset:** `6px 6px 0 #0f0f0f`
- **Hard offset color:** `6px 6px 0 #ff3366`
- **Pressed:** `none`

## Imagery

Images may be wildly unequal in size: one giant image across three columns beside a 120px thumbnail. Cropping and close-ups are allowed. No equal-size grids or neatly aligned gallery arrangements.

## Layout

Capped at 1440px with 24px container padding and 96px section gaps. Every row uses a different column combination; negative offsets and overlaps are allowed. Mobile collapses to one column, drops overlaps, and compresses the type hierarchy to within 4×.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#0f0f0f`
- background: `#ffffff`
- red: `#ff3366`
- cyan: `#00d4ff`
- yellow: `#ffcc00`
- ink: `#0f0f0f`

EXAMPLE COMPONENT PROMPTS:

1. Build an asymmetric-grid layout: grid-template-columns: 1fr 2.2fr 0.6fr, 16px gutters, 1440px cap. A tension-red #ff3366 block on the left presses onto the middle column with translate(-32px,-16px), explicit z-index, zero radius, hard shadow 6px 6px 0 #0f0f0f. The headline runs 120px/900, line height 0.95, -0.03em tracking, spanning two columns; beside it a 12px alert-yellow chip forms the 10× contrast. Mobile collapses to one column, drops the offsets, and compresses the hierarchy to within 4×. Page ground #ffffff.
