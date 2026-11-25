# Swiss Poster — Style Reference

> Type so large it becomes the graphic, blocks flush with no gap, hierarchy by size and color field.

**Theme:** light

The Swiss poster style is the international style's poster branch: unlike the regular Swiss style it pushes type to poster scale — large enough to become the graphic itself, with line and column width decided by content, a single word allowed to fill half the screen. Its layout rules are extremely hard: black and white lead, primaries (red #ff0000, blue #0057b8, yellow #ffcc00) appear only as color blocks; regions are separated by 2px black lines rather than whitespace; elements touch at gap-0; radius never exceeds 2px. Decorative and monospace typefaces are banned, gradients are banned, dashed borders are banned.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | Text, dividers and the largest blocks. The poster's whole skeleton. |
| White | `#ffffff` | `--color-white` | Canvas and inverted text. Paired with black; no grey steps. |
| Red | `#ff0000` | `--color-red` | The first accent block. Marks the most important information; never more than 20% of a screen. |
| Blue | `#0057b8` | `--color-blue` | The second accent block, often diagonal to the red. |
| Yellow | `#ffcc00` | `--color-yellow` | The third accent and highlight bars, for details that must jump out. |
| Ochre | `#6c3b00` | `--color-ochre` | The only dark warm tone, for text pressed onto yellow blocks. |

## Typography

### Inter — the only font on the site, weights 700 and 900 only. Poster headlines run 120 to 180px at a 0.85 line height — the type block is itself the graphic.

- **Substitute:** Helvetica, 'Arial Black', sans-serif
- **Weights:** 700, 900
- **Sizes:** 14, 18, 24, 40, 72, 120, 180
- **Line height:** 0.85 (display), 0.92 (headings), 1.4 (body)
- **Letter spacing:** -0.045em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 180px | 0.85 | -0.045em | `--text-display` |
| heading-lg | — | 900 | 120px | 0.88 | -0.04em | `--text-heading-lg` |
| heading | — | 900 | 72px | 0.92 | -0.03em | `--text-heading` |
| subheading | — | 700 | 40px | 1 | — | `--text-subheading` |
| body | — | 700 | 18px | 1.4 | — | `--text-body` |
| label | — | 700 | 14px | 1.3 | 0.04em | `--text-label` |

## Spacing & Layout

**Base unit:** 0px
**Density:** compact

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 0 | 0px | `--spacing-0` |
| 8 | 8px | `--spacing-8` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 40 | 40px | `--spacing-40` |
| 64 | 64px | `--spacing-64` |
| 96 | 96px | `--spacing-96` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1440px
- **Section gap:** 0px
- **Card padding:** 24px
- **Element gap:** 0px

## Components

### Poster Headline

**Role:** the poster headline (the core)

120 to 180px, weight 900, line height 0.85, -0.045em tracking, aligned left or pinned to the top, a single line allowed to fill the full 1440px width. It may overlap color blocks (text always on top) and meets adjacent blocks with no gap — only a 2px black line between.

### Flush Grid

**Role:** the flush grid (gap-0)

A 12-column grid with gap 0; regions separate only by 2px black lines. Each region fills a solid color (white, black or one primary) with 24px padding. Separation with gap-4-style spacing is forbidden — in the Swiss poster, the line is the spacing.

### Block Button

**Role:** action button

Solid black fill, white text, zero radius, no stroke, no shadow, 14px/700, 0.04em tracking, padding 16px 40px. On hover the fill hard-cuts to primary red; on press it swaps to primary blue with a 2px 2px offset (like print misregistration). Transition 120ms linear.

- **Sizes:** padding 16px 40px; label 14px
- **States:** hover: red fill; active: blue fill, offset 2px

### Color Field

**Role:** color-block regions

A whole block filled with one primary (red, blue or yellow) or pure black, zero radius, no stroke (the grid's 2px line replaces it), 24px padding. Text inside picks black or white by contrast, at least 24px. One block, one color.

### Rule Divider

**Role:** the 2px divider

A 2px solid black line, horizontal or vertical, cutting regions apart. Dashed lines are never used (weakness, in this language), and whitespace never replaces the line.

## Do's and Don'ts

### Do

- Push type to graphic scale (120 to 180px)
- Lead with black and white; primaries only as blocks
- Separate regions with 2px black lines at gap-0
- Squeeze line height to 0.85 to 0.92
- Allow extreme asymmetry
- Keep radius at 2px or less

### Don't

- Don't use decorative or monospace faces
- Don't exceed 2px radius
- Don't use gradients
- Don't use dashed borders
- Don't replace dividers with spacing
- Don't center the composition

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | Canvas |
| 1 | Black Block | `#000000` | Inverted regions |
| 2 | Red Block | `#ff0000` | Accent regions |

## Elevation

- **None:** `none — nothing floats on a poster`

## Imagery

Black-and-white photography, geometric compositions, monochrome graphics. Images must crop into strict rectangles and snap to the grid; a high-contrast duotone layered with one primary is allowed. No soft photography, illustration or decorative shapes.

## Layout

Capped at 1440px, zero spacing, 12 columns, regions divided by 2px lines. The poster allows extreme asymmetry: the title takes 10 columns, the body 2. Centered symmetry is forbidden, and whitespace never replaces the divider.

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
- blue: `#0057b8`
- yellow: `#ffcc00`
- ochre: `#6c3b00`

EXAMPLE COMPONENT PROMPTS:

1. Build a Swiss-poster layout: a 12-column grid, gap 0, regions divided by 2px solid #000. The headline is 180px/900, line height 0.85, -0.045em tracking, left-aligned filling 10 columns. The right two columns hold 18px/700 body. One region fills #ff0000, one #0057b8, one pure black, with text chosen black or white by contrast at 24px minimum. The button is solid black with white text, zero radius, padding 16px 40px, hard-cutting to #ff0000 on hover. Page ground #ffffff.
2. Build a color field: a whole region filled with one primary or pure black, zero radius, no stroke, 24px padding, text at least 24px — one block, one color.
