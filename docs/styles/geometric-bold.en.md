# Geometric Bold — Style Reference

> Giant circles, squares and triangles colliding on the canvas, with type set large enough to be a poster.

**Theme:** light

Geometric bold treats layout as poster-making: type up to 160px, color blocks pure red-blue-yellow, shapes limited to circle, square and triangle — and they must overlap. Everything is absolutely positioned, with 6 to 12 degrees of rotation allowed for momentum. Radius has only two legal values — perfectly square or perfectly round; nothing in between. The difficulty is order: no matter how many shapes, they must land on an invisible grid, and block areas must have clear hierarchy (the largest never exceeds 40% of the screen).

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | Primary text, the largest blocks and shape strokes. A poster demands the most extreme contrast. |
| White | `#ffffff` | `--color-white` | Canvas and inverted text. Paired with black; no grey middle steps. |
| Red | `#ff0000` | `--color-red` | Primary accent and focal shapes. Never more than 25% of the screen. |
| Blue | `#0000ff` | `--color-blue` | The second block, answering red; always smaller in area. |
| Yellow | `#ffff00` | `--color-yellow` | Highlight garnish, on labels and small shapes; the smallest area. |
| Ochre | `#6c3b00` | `--color-ochre` | The only dark warm tone, for text that must sit on yellow. |

## Typography

### Inter — the only font on the site, weights 700 and 900 only. Poster type squeezes to a 0.88 line height so the type block itself becomes a shape.

- **Substitute:** Helvetica Neue, Arial, sans-serif
- **Weights:** 700, 900
- **Sizes:** 14, 18, 24, 40, 80, 160
- **Line height:** 0.88 (display), 0.95 (headings), 1.5 (body)
- **Letter spacing:** -0.045em on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 160px | 0.88 | -0.045em | `--text-display` |
| heading-lg | — | 900 | 80px | 0.92 | -0.035em | `--text-heading-lg` |
| heading | — | 700 | 40px | 0.98 | -0.02em | `--text-heading` |
| subheading | — | 700 | 24px | 1.1 | — | `--text-subheading` |
| body | — | 700 | 18px | 1.5 | — | `--text-body` |
| label | — | 700 | 14px | 1.3 | 0.1em | `--text-label` |

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
| 128 | 128px | `--spacing-128` |
| 192 | 192px | `--spacing-192` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| shapes | 999px |

- **Page max-width:** 1440px
- **Section gap:** 192px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Shape Block

**Role:** geometric shapes and color blocks

Only circle, square and isosceles triangle. Filled with a pure color (one of black, red, blue, yellow), no stroke, no shadow, allowed to overlap other shapes by 20% to 40%. May rotate 6 to 12 degrees. At most four shapes per screen, one of which must be clearly larger than the rest.

- **States:** hover: rotate an extra 3deg, no scale

### Poster Headline

**Role:** the primary headline block

160px, weight 900, line height 0.88, -0.045em tracking; line width is decided by the content, not the container. May stack three lines and overlap shapes, but the text always sits on top with at least 7:1 contrast against its background. The whole block may rotate -2 to 2 degrees.

### Block Button

**Role:** action button

Solid black or red fill, white text, square corners, no shadow. 14px/700, 0.1em tracking, padding 16px 32px, a 2px border in the fill color. On hover fill and text swap; on press the whole button offsets 4px toward the bottom-right, still with no shadow. Transition 120ms.

- **States:** hover: inverted; active: offset 4px

### Grid Scaffold

**Role:** the invisible grid

12 columns, 24px gutters, content capped at 1440px. Every shape and text block must snap to a column line or a column midpoint; overlaps are allowed but their landings must be on the grid. A single 1px guide line may run the page — visible only in the design file.

## Do's and Don'ts

### Do

- Use only circle, square and triangle
- Keep radius at 0 or fully round — nothing between
- Set headlines at 160px, line height 0.88
- Let shapes overlap by 20% to 40%
- Snap everything to the 12-column grid
- Cap the largest block at 40% of the screen

### Don't

- Don't use intermediate radii
- Don't use gradients or soft shadows
- Don't put text beneath a shape
- Don't exceed four shapes per screen
- Don't let three blocks share the same area
- Don't use realistic illustration or photography as the hero

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | Canvas |
| 1 | Black Block | `#000000` | Primary shapes and inverted sections |
| 2 | Color Block | `#ff0000` | Accent shapes |

## Elevation

- **None:** `none — shapes stack by overlap, not shadow`

## Imagery

The geometry itself is the image; no photography. Photos may be flattened into solid duotones and used as shape fills. No gradients, no soft shadows, no realistic illustration.

## Layout

Capped at 1440px, 12 columns, 24px gutters. Section gap 192px; shapes may overflow the container edge. The common hero: a giant headline pressed over two overlapping shapes. Scrolling stays smooth — no parallax.

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
- ochre: `#6c3b00`

EXAMPLE COMPONENT PROMPTS:

1. Build a geometric-bold hero: white ground, 12-column grid. A black circle covering 35% of the screen at the top left (no stroke, no shadow) and a red square of 20% at the bottom right, overlapping by 25%. The headline is 160px/900, line height 0.88, -0.045em tracking, pure black, pressed over both shapes. Below it a solid black square-corner button (14px/700, 0.1em tracking, padding 16px 32px) that inverts to white-on-black logic on hover.
2. Build a shape cluster: four shapes only — one large red circle (40%), one blue square rotated 8 degrees (20%), one black triangle (15%) and one small yellow circle (5%), overlapping 20–40%, every landing snapped to the 12-column grid, no shadow, radius 0 or 999px only.
