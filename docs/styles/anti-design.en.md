# Anti-Design — Style Reference

> Break every rule of interface design at once — but break each one on purpose.

**Theme:** light

Anti-design is experimental brutalism deliberately fighting UI convention: 4 to 8px extra-bold black borders wrap everything, borders run asymmetric (right and bottom thicker), only right angles, shadows are 8px hard offsets, colors hit the most saturated primaries (red blue yellow magenta cyan green), spacing and alignment are deliberately inconsistent, type sizes swing wildly. Its "mess" is cost-accounted — every violation must be reproducible and explainable, never casually placed. That is also what separates it from an ordinary bad page: anti-design's chaos is controlled.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | The extra-bold borders, hard shadows and text. The structure's entire weight. |
| White | `#ffffff` | `--color-white` | Canvas. Keep it pure white so primaries sting. |
| Red | `#ff0000` | `--color-red` | First clash, often sharing a block with the black border. |
| Blue | `#0000ff` | `--color-blue` | Second clash and link color. |
| Yellow | `#ffff00` | `--color-yellow` | Highlight ground, making black text jump. |
| Magenta | `#ff00ff` | `--color-magenta` | Third clash, breaking the red-blue-yellow primary order. |
| Cyan | `#00ffff` | `--color-cyan` | Fourth clash, often a background letting other blocks float. |

## Typography

### Inter — sans throughout, but sizes are deliberately non-uniform — 11px and 110px may share one block.

- **Substitute:** 'Arial Black', Helvetica, sans-serif
- **Weights:** 400, 700, 900
- **Sizes:** 11, 16, 28, 48, 72, 110
- **Line height:** 0.9 (display), 1 (headings), 1.4 (body)
- **Letter spacing:** -0.04em on display, 0 on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 110px | 0.9 | -0.04em | `--text-display` |
| heading | — | 900 | 72px | 0.95 | -0.03em | `--text-heading` |
| subheading | — | 700 | 48px | 1 | — | `--text-subheading` |
| body-lg | — | 400 | 28px | 1.3 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.4 | — | `--text-body` |
| label | — | 700 | 11px | 1.3 | 0 | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** compact

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 0 | 0px | `--spacing-0` |
| 4 | 4px | `--spacing-4` |
| 12 | 12px | `--spacing-12` |
| 20 | 20px | `--spacing-20` |
| 36 | 36px | `--spacing-36` |
| 60 | 60px | `--spacing-60` |
| 92 | 92px | `--spacing-92` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1440px
- **Section gap:** 36px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Asymmetric Frame

**Role:** the asymmetric heavy frame (core component)

4 to 8px pure-black borders with unequal sides (say top 4, right 8, bottom 8, left 4), zero radius, 20px padding, hard shadow 8px 8px 0 black. Fill one primary. Every frame on screen must follow the same asymmetry rule, or it is merely messy.

### Slam Button

**Role:** action buttons

Primary fill (red or blue), white or black text, 4px black border, zero radius, 28px/900, padding 12px 24px, hard shadow 8px 8px 0 black. On hover the fill hard-cuts to another primary and the shadow widens to 12px; on press it translates 8px 8px with the shadow collapsing. Transition 80ms linear.

- **Sizes:** padding 12px 24px; label 28px
- **States:** hover: color swap, shadow 12px; active: translate 8px

### Broken Grid

**Role:** the deliberate misaligned grid

A 12-column grid, but elements offset 1 to 3 columns by rule (never random): every row has at least one element crossing a boundary, and offset directions alternate. Gaps jump among 4, 12, 20, 36. Once written, the offset rule must hold globally.

### Oversized Numeral

**Role:** oversized numerals and letters

110px/900 digits or a single letter, filled primary or black, rotated 0 to 12 degrees, pressed into a section corner or straddling a border. For chapter marks and ornament — its size against a neighboring 11px label is the extreme contrast.

### Raw Marquee

**Role:** the raw marquee

Duplicate content, 24s linear infinite translateX 0 to -50%, text at 48px/900 uppercase on a primary ground. Hover pauses. No ornament, no fade — it just rolls through.

## Do's and Don'ts

### Do

- Frame everything in 4 to 8px black with unequal sides
- Keep zero radius, right angles only
- Offset shadows 8px hard
- Hit the most saturated primaries
- Keep spacing and alignment deliberately inconsistent
- Make chaos reproducible and ruled

### Don't

- Don't use any rounding
- Don't use desaturated or soft colors
- Don't align consistently
- Don't use soft shadows
- Don't use gradients
- Don't place things carelessly — violations need rules

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | Canvas |
| 1 | Yellow Block | `#ffff00` | Highlight block |
| 2 | Cyan Block | `#00ffff` | Reversed block |

## Elevation

- **Hard offset:** `8px 8px 0 #000000`
- **Hard offset sm:** `4px 4px 0 #000000`
- **Pressed:** `none`

## Imagery

Images must be anti-design too: low-resolution screenshots, stretched photos, misplaced icons, ASCII graphics. Deliberately compress images to 20% quality. No refined photography or soft illustration — "refinement" is disqualifying here.

## Layout

Capped at 1440px with gaps jumping among 4, 12, 20, 36, 60, 92. Elements may overlap, cross boundaries, rotate 0 to 12 degrees. But offsets and overlaps must obey one written rule — the chaos must reproduce.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#000000`
- background: `#ffffff`
- red: `#ff0000`
- blue: `#0000ff`
- yellow: `#ffff00`
- cyan: `#00ffff`

EXAMPLE COMPONENT PROMPTS:

1. Build an anti-design block: white ground, a red-filled square with a pure-black border of top 4 / right 8 / bottom 8 / left 4, zero radius, box-shadow 8px 8px 0 #000. The title runs 110px/900 with -0.04em tracking, straddling the border and rotated -3 degrees, beside an 11px label for extreme contrast. The button is yellow-filled, 4px black border, 28px/900, hard shadow 8px 8px 0 #000, hovering to a cyan hard-cut. Gaps jump among 4, 12, 20, 36; elements offset 1 to 3 columns by a written rule. Zero radius sitewide, no gradients.
