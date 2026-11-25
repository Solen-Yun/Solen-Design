# Cubism — Style Reference

> The same thing seen from three angles, then pressed back into one plane.

**Theme:** light

Cubism comes from Picasso and Braque: objects are broken into sharply angular geometric blocks, presented from several viewpoints at once, and those fragments are pressed back into the picture with skew and rotate. The palette is low-saturation earth tones (umber #5c4033, cream #e8dcc8, ochre #8b7355, slate blue #3d5c6e, brick #9b3d25, moss #647f53), borders are 2px heavy lines, radii only 2 to 4px, the layout is deliberately asymmetric and tilted, and text is bold uppercase to stress the geometric feel. Soft gradients and blur are banned — cubism is hard.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Umber | `#5c4033` | `--color-umber` | Primary: text, heavy borders and the deepest blocks. |
| Cream | `#e8dcc8` | `--color-cream` | Page ground and light planes. The beige of an old canvas. |
| Ochre | `#8b7355` | `--color-ochre` | The mid-tone plane, creating a third lightness level. |
| Slate Blue | `#3d5c6e` | `--color-slate-blue` | The cool-side fragment, alternating warm and cool as analytical cubism does. |
| Brick | `#9b3d25` | `--color-brick` | The warmest fragment, for emphasis and key blocks. |
| Moss | `#647f53` | `--color-moss` | The fourth fragment color, least frequent. |

## Typography

### Inter — bold sans, uppercase. The letterforms must be square, because cubist text is also cut into blocks.

- **Substitute:** 'Arial Black', Georgia, sans-serif
- **Weights:** 700, 900
- **Sizes:** 14, 18, 24, 32, 44, 60
- **Line height:** 1 (display), 1.1 (headings), 1.55 (body)
- **Letter spacing:** -0.02em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 60px | 1 | -0.02em | `--text-display` |
| heading | — | 900 | 44px | 1.05 | -0.02em | `--text-heading` |
| subheading | — | 700 | 32px | 1.15 | — | `--text-subheading` |
| body-lg | — | 700 | 24px | 1.45 | — | `--text-body-lg` |
| body | — | 700 | 18px | 1.55 | — | `--text-body` |
| label | — | 900 | 14px | 1.4 | 0.06em | `--text-label` |

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
| cards | 4px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Fragmented Panel

**Role:** the fragmented panel (core component)

A container cut by clip-path into 3 to 5 irregular polygons, each filled with a different earth tone, with a 2px cream gap between fragments (the canvas ground showing through). The whole block rotates -2deg or skews -4deg. Zero shadow.

### Multi-View Block

**Role:** the multi-view overlay

Two copies of the same content stacked: one normal, one offset 8px, skewed -8deg, at 45% opacity, creating the illusion of two simultaneous viewpoints. Used only for headings and images — body text is never overlaid.

### Angular Button

**Role:** action buttons

Umber fill, cream text, 2px radius, 2px umber stroke, 14px/900 uppercase, 0.06em tracking, padding 14px 28px, no shadow. clip-path cuts 12px off the top-right corner. On hover the fill turns brick; on press it shifts 2px 2px. Transition 150ms linear.

- **Sizes:** padding 14px 28px; label 14px
- **States:** hover: brick fill; active: translate 2px

### Skewed Card

**Role:** the skewed card

Cream or earth-tone fill, 4px radius, 2px umber stroke, 28px padding. The whole card skews -3deg and rotates 1deg, with adjacent cards at different angles (-3, +2, -1 degrees) for deliberate asymmetry. The content counter-skews in an inner layer to keep text upright.

### Fragmented Edge

**Role:** the fragmented edge

An irregular clip-path polygon makes an image's edge look shattered, or 3 to 4 small triangles and trapezoids in color are layered along the edge. It replaces radii and decorative borders.

## Do's and Don'ts

### Do

- Use low-saturation earth tones
- Cut planes into fragments with clip-path
- Overlay the same content from multiple viewpoints
- Use 2px heavy borders and 2 to 4px radii
- Make the layout asymmetric and tilted
- Set bold uppercase type

### Don't

- Don't use soft gradients or blur
- Don't use symmetric centered layouts
- Don't use large radii
- Don't use over-bright saturated color
- Don't drop a whole photo in untouched
- Don't shadow the fragments

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream | `#e8dcc8` | Page ground |
| 1 | Ochre Plane | `#8b7355` | Mid-tone planes |
| 2 | Umber Plane | `#5c4033` | Deepest planes |

## Elevation

- **None:** `none — planes stack by overlap, not shadow`

## Imagery

Images must be shattered: photos cut by clip-path into blocks each offset, or turned into multi-faceted constructions in earth tones. Three angles of the same face placed side by side are allowed. No complete clear photos, soft illustration or gradient imagery.

## Layout

Capped at 1120px with 24px container padding and 96px section gaps. Overlap, tilt and offset are allowed, with angles limited to three: -3, -1.5, +2. The layout must be asymmetric — centered symmetry instantly loses cubism.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#5c4033`
- background: `#e8dcc8`
- ochre: `#8b7355`
- slate: `#3d5c6e`
- brick: `#9b3d25`
- moss: `#647f53`

EXAMPLE COMPONENT PROMPTS:

1. Build a cubist panel: cream #e8dcc8 as the base, with clip-path cutting a rectangle into 4 irregular polygons filled #5c4033, #8b7355, #3d5c6e and #9b3d25, leaving a 2px cream gap between fragments, the whole block rotate(-2deg) skewX(-4deg), zero shadow. Title 44px/900 uppercase with a second copy offset 8px, skewed -8deg at 45% opacity. Button #5c4033 fill, cream text, 2px radius, 2px stroke, padding 14px 28px, clip-path cutting 12px off the top-right, the fill turning #9b3d25 on hover. The layout is asymmetric; no gradients or shadows sitewide.
