# Op Art — Style Reference

> Black-and-white stripes make a still page look alive — the eye is fooled by the pattern.

**Theme:** light

Op art creates visual illusions with geometric pattern: pure black-and-white contrast is the base, with concentric circles, stripes and checkerboards as ornament, and vibrating color pairs (red and blue, yellow and violet) as accents. Its discipline is the opposite of "mess" — every element aligns strictly to a grid, sits centered, is drawn with 2px black lines, and has zero radius, because the illusion depends on the pattern's precision; any looseness kills the effect. Large areas of dense pattern are banned (visual fatigue and dizziness), as are soft gradients and soft shadows.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | Half the pattern, text and 2px lines. The limit of contrast. |
| White | `#ffffff` | `--color-white` | The other half of the pattern and the canvas. Pure white, no grey transition. |
| Vibrating Red | `#ff3300` | `--color-vibrating-red` | The first vibrating color; its edges "shiver" beside blue. |
| Vibrating Blue | `#0066ff` | `--color-vibrating-blue` | The second vibrating color, always paired with red — never alone. |
| Vibrating Yellow | `#ffcc00` | `--color-vibrating-yellow` | The third vibrating color, small accents only. |
| Olive | `#5e6d00` | `--color-olive` | Text pressed onto yellow, avoiding yellow on yellow. |

## Typography

### Inter — minimal sans, weights 500 and 700. Text must stay restrained — the pattern is already the protagonist.

- **Substitute:** Helvetica, 'Arial Black', sans-serif
- **Weights:** 500, 700
- **Sizes:** 13, 16, 22, 30, 44, 64
- **Line height:** 1.1 (display), 1.2 (headings), 1.5 (body)
- **Letter spacing:** -0.02em on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 64px | 1.1 | -0.02em | `--text-display` |
| heading | — | 700 | 44px | 1.15 | — | `--text-heading` |
| subheading | — | 500 | 30px | 1.25 | — | `--text-subheading` |
| body-lg | — | 500 | 22px | 1.45 | — | `--text-body-lg` |
| body | — | 500 | 16px | 1.5 | — | `--text-body` |
| label | — | 700 | 13px | 1.4 | 0.1em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Concentric Rings

**Role:** the concentric rings (signature)

repeating-radial-gradient draws black-and-white rings 8px apart across a 240 to 480px square or circle. Line and gap widths must be equal (8px each) — one wide and one narrow loses op art's "breathing" rhythm.

### Stripe Field

**Role:** stripes and checkerboards

repeating-linear-gradient draws black-and-white stripes 8px apart, or a 16px checkerboard, over a section. Stripes may tilt 15 degrees for stronger vibration. Area is capped at 30% of one screen — beyond that comes visual fatigue.

### Vibrating Pair

**Role:** the vibrating color pair

Two equal-area blocks — red and blue, or yellow and violet — set flush against each other with a 2px black line between. The boundary shimmers. Neither block may occupy a large area alone; equal area is what creates the vibration.

### Op Button

**Role:** action buttons

Black fill, white text, zero radius, 2px black stroke (white when inverted), 16px/700, padding 12px 28px, no shadow. On hover fill and text hard-swap (black-and-white invert); on press it insets 2px with a 2px black inner border. Transition 120ms linear.

- **Sizes:** padding 12px 28px; label 16px
- **States:** hover: invert; active: inset 2px

### Grid Cell

**Role:** the strict grid cell

All content sits in a strictly aligned grid (4 or 6 columns), cells divided by 2px black lines, zero radius. Content is centered (items-center justify-center). Offsets are banned — op art's illusion breaks with any looseness.

## Do's and Don'ts

### Do

- Push pure black-and-white contrast
- Use concentric circles, stripes and checkerboards
- Keep stripe and gap widths equal
- Align strictly to the grid and center
- Place vibrating color pairs as equal areas
- Keep dense pattern under 30% of a screen

### Don't

- Don't flood the page with dense pattern
- Don't use soft gradients
- Don't use soft shadows
- Don't offset the grid
- Don't use rounded corners
- Don't make a vibrating pair unequal in area

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | Canvas |
| 1 | Black Block | `#000000` | Reversed sections |
| 2 | Pattern Field | `repeating gradient` | Pattern areas |

## Elevation

- **None:** `none — a shadow would break the flat illusion`

## Imagery

Images are patterns: concentric circles, stripes, checkerboards, moiré, wave lines. Photos may be converted to ultra high-contrast black-and-white halftone. No color photography, soft illustration or any image with depth.

## Layout

Capped at 1200px with 24px container padding and 96px section gaps. Everything aligns strictly to the grid and centers, zero radius zero shadow. Pattern areas are controlled: dense pattern stays under 30% of a screen, the rest is white or solid color.

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
- red: `#ff3300`
- blue: `#0066ff`
- yellow: `#ffcc00`
- olive: `#5e6d00`

EXAMPLE COMPONENT PROMPTS:

1. Build an op-art layout: white ground #ffffff with pure black #000000 pattern. On the left a 320px square of concentric rings drawn with repeating-radial-gradient at 8px rings (line and gap 8px each). On the right a strict 6-column grid with centered type, heading 44px/700 at -0.02em tracking, body 16px/500. Between them a pair of equal-area vibrating blocks: red #ff3300 and blue #0066ff flush against each other with a 2px black line. Button black fill, white text, zero radius, 2px black stroke, inverting on hover, transition 120ms linear. Zero radius, zero shadow, no gradients sitewide. Dense pattern stays under 30% of a screen.
