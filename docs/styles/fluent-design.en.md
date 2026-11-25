# Fluent Design — Style Reference

> Light, depth, motion, material, scale: five elements stacked into one cross-platform interface language.

**Theme:** light

Fluent is the "material + light" system: the interface is not flat but built from acrylic panels, minimal radii and a very light sense of depth. It uses a single primary blue (#0078d4); every other color appears only as state (yellow, red, green). Radii are deliberately restrained — buttons 2px, cards 8px, inputs 2px — which is what separates it from the rounded-corner styles. Every interactive element must carry a 2px focus ring with an offset; that is the accessibility floor, not decoration. Motion runs 150ms to 250ms, emphasizing "response" over "performance".

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Fluent Blue | `#0078d4` | `--color-fluent-blue` | Primary actions, links and focus rings. The only brand color in the system, never a gradient. |
| Deep Blue | `#106ebe` | `--color-deep-blue` | Hover and pressed states. Same hue one tier darker, keeping the volume. |
| Acrylic White | `rgba(255,255,255,0.70)` | `--color-acrylic` | Card and panel fill. Must be paired with 20px blur, or the acrylic feel collapses. |
| Caution Yellow | `#ffb900` | `--color-caution` | Warnings and states needing attention, only on icons and badges. |
| Error Red | `#e81123` | `--color-error` | Errors and deletion; its presence means irreversible. |
| Success Green | `#00cc6a` | `--color-success` | Success and completion, mostly on checkmarks and status bars. |

## Typography

### Segoe UI Variable — the only font on the site, weights 400 and 600 only. Hierarchy comes from size and whitespace, not stacked weights.

- **Substitute:** -apple-system, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 12, 14, 16, 20, 28, 40, 68
- **Line height:** 1.1 (display), 1.25 (headings), 1.55 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 68px | 1.1 | -0.01em | `--text-display` |
| heading-lg | — | 600 | 40px | 1.15 | — | `--text-heading-lg` |
| heading | — | 600 | 28px | 1.2 | — | `--text-heading` |
| subheading | — | 600 | 20px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.55 | — | `--text-body` |
| label | — | 600 | 12px | 1.4 | 0.02em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 96 | 96px | `--spacing-96` |

### Border Radius

| Element | Value |
|---|---|
| cards | 8px |
| buttons | 2px |
| inputs | 2px |
| pills | 999px |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 12px

## Components

### Fluent Button

**Role:** primary action button

Fluent-blue fill, white text, 2px radius, 1px same-color stroke. 14px type, weight 600, padding 10px 24px, shadow 0 2px 4px blue 30%. On hover the fill turns deep blue, the button lifts 2px and the shadow spreads to 0 4px 8px blue 40%; on press it scales 0.97, the lift returns to zero and the shadow is removed. The focus ring is 2px blue with a 2px offset. Transition 150ms ease-out.

- **Sizes:** padding 10px 24px; label 14px
- **States:** hover: lift 2px, deeper fill; active: scale 0.97, no shadow; focus: 2px ring + offset

### Acrylic Card

**Role:** content cards and settings panels

70% white fill, 20px blur, 1px white 30% stroke, 8px radius, 24px padding, two-layer shadow (0 2px 4px 4% and 0 8px 16px 8%). The icon block is 48px square, primary-blue fill, 8px radius. On hover the fill rises to 85%, the stroke to 50%, the card lifts 4px and the shadow steps up to the 16px 32px tier. Transition 200ms ease-out.

- **States:** hover: fill 70%→85%, lift 4px

### Fluent Input

**Role:** forms and search

White ground, 1px #d1d1d1 stroke, 2px radius, padding 8px 12px, 14px type. Space for a 1px accent line is always reserved below. On focus the stroke turns Fluent blue, the accent line thickens to 2px and a 2px-offset focus ring appears, without changing the box size.

### Acrylic Flyout

**Role:** dropdowns, menus and notification overlays

85% white fill, 30px blur, 1px white 40% stroke, 8px radius, 8px padding, shadow 0 8px 24px 12%. Menu items are 36px tall with 4px radius, hover fills white 50% and gains a 3px primary-blue indicator bar on the left.

## Do's and Don'ts

### Do

- Use one primary blue; every other color is state only
- Keep radii restrained: buttons 2px, cards 8px
- Make focus rings 2px with an offset
- Build cards from acrylic fill plus blur and stroke
- Keep motion between 150ms and 250ms, emphasizing response
- Align all spacing to the 4px grid

### Don't

- Don't use large radii; Fluent loses its edge
- Don't treat yellow, red and green as decoration
- Don't drop the focus ring
- Don't use glass cards without blur
- Don't exceed 250ms motion
- Don't use pure black text; use deep grey

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Page | `#f3f2f1` | Page ground |
| 1 | Acrylic | `rgba(255,255,255,0.70)` | Cards and panels |
| 2 | Solid White | `#ffffff` | Overlays and dialogs |

## Elevation

- **Card:** `0 2px 4px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.08)`
- **Card hover:** `0 4px 8px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.14)`
- **Focus ring:** `0 0 0 2px #ffffff, 0 0 0 4px #0078d4`

## Imagery

Product screenshots, system icons and abstract geometry. Large soft light blooms are allowed as hero backgrounds. Icons must be 1.5px-stroked line shapes sharing the interface's geometric language. No realistic photography, no decorative illustration.

## Layout

Capped at 1200px, 12 columns, 24px container padding, 96px section gaps. The hero may be centered or text-left with an image right. Settings pages use a left 280px nav beside a single-column form no wider than 640px. Everything aligns to the 4px baseline grid.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#201f1e`
- background: `#f3f2f1`
- card: `rgba(255,255,255,0.70)`
- primary: `#0078d4`
- muted: `#605e5c`
- border: `#d1d1d1`

EXAMPLE COMPONENT PROMPTS:

1. Build a Fluent card: background rgba(255,255,255,0.7), backdrop-filter blur(20px), 1px rgba(255,255,255,0.3) stroke, 8px radius, 24px padding, shadow 0 2px 4px rgba(0,0,0,0.04) with 0 8px 16px rgba(0,0,0,0.08). Top-left a 48px primary-blue icon block (8px radius), title 20px/600 #201f1e. On hover the fill rises to 85%, the card lifts 4px and the shadow rises to 0 16px 32px. Page ground #f3f2f1.
2. Build a Fluent button: #0078d4 fill, white 14px/600 text, padding 10px 24px, 2px radius, 1px #0078d4 stroke, shadow 0 2px 4px rgba(0,120,212,0.30). On hover the fill turns #106ebe, the button lifts 2px and the shadow spreads over 150ms ease-out; on press it scales 0.97 and drops the shadow; the focus ring is 2px blue with 2px offset.
