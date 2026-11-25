# Watercolor Style — Style Reference

> Three layers of wash on paper: color never draws an outline, it only bleeds at the edges.

**Theme:** light

The key of the watercolor style is "no hard edges". Every color block is a heavily blurred round wash, layered over the others; card gradients fade diagonally in and out, with a 1px extremely faint stroke hinting at the paper. The ground is warm paper white (#faf8f5), the primary a grey-leaning blue (#4a6fa5), headings set in serif italic, body line height stretched to 1.7. It never uses drop shadows to layer — it uses "the area color spreads across paper" — on hover the washes inside a card enlarge and deepen, like water continuing to bloom on wet paper.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Watercolor Blue | `#4a6fa5` | `--color-watercolor-blue` | Primary actions, headings and text. A grey-leaning blue, like pigment diluted once with water. |
| Paper White | `#faf8f5` | `--color-paper-white` | Page canvas. Warm white, mimicking watercolor paper. |
| Peach | `#e8a87c` | `--color-peach` | The first warm wash, on title areas and a card corner. |
| Water Teal | `#85cdca` | `--color-water-teal` | The cool wash, layered with peach into an in-between tone. |
| Rose | `#c38d94` | `--color-rose` | The third wash, lowest opacity, only to deepen the center. |
| Ochre | `#d4a373` | `--color-ochre` | Paper edges and dividers, mostly as 10% to 20% fine lines. |

## Typography

### Cormorant Garamond — headings, quotes and the nav wordmark, mostly italic. Serif italic is the watercolor's most natural typographic expression.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 500
- **Sizes:** 20, 26, 34, 44, 60
- **Line height:** 1.2 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** -0.005em on display, 0.12em on uppercase labels

### Inter — body and captions, kept neutral so it never competes with the serif headings.

- **Substitute:** system-ui, -apple-system, sans-serif
- **Weights:** 300, 400
- **Sizes:** 13, 15, 17
- **Line height:** 1.5 (display), 1.5 (headings), 1.7 (body)
- **Letter spacing:** 0 on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Cormorant Garamond | 400 | 60px | 1.2 | — | `--text-display` |
| heading | Cormorant Garamond | 400 | 44px | 1.25 | — | `--text-heading` |
| subheading | Cormorant Garamond | 500 | 26px | 1.35 | — | `--text-subheading` |
| body-lg | Inter | 300 | 17px | 1.7 | — | `--text-body-lg` |
| body | Inter | 400 | 15px | 1.7 | — | `--text-body` |
| label | Inter | 400 | 13px | 1.5 | 0.12em | `--text-label` |

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
| cards | 24px |
| buttons | 999px |
| inputs | 16px |
| washes | 999px |

- **Page max-width:** 1080px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Wash Button

**Role:** primary action button

A blue-to-water-teal horizontal gradient (80% opacity), white text, 999px full radius, no stroke. 17px serif type, padding 16px 32px, shadow 0 10px 30px blue 20%. On hover the gradient rises to 90%, the shadow spreads to 40px and the button lifts 2px; on press it scales 0.98 and the shadow retreats to 10px. Transition 500ms ease-in-out.

- **States:** hover: gradient 80%→90%, lift 2px; active: scale 0.98

### Wash Card

**Role:** work cards and content cards

A three-stop diagonal gradient of peach 20% to white to water-teal 20%, 24px radius, 1px blue 10% stroke, 32px padding, 10px blur, with a 96px water-teal 30% blurred circle in the top-right corner. On hover the gradient ends rise to 30%, the blob scales 1.5 and deepens to 40%, and the shadow spreads to 40px. Transition 500ms; the blob 700ms.

### Wash Input

**Role:** forms and writing inputs

White 60% fill, 1px blue 20% stroke, 16px radius, padding 16px 20px, 15px serif. Placeholders at blue 40%. On focus the stroke rises to 40%, the fill to 80%, with a 0 10px 30px blue 10% soft glow. Transition 300ms.

### Color Wash

**Role:** the background wash layer

Two to three circles, 256px to 384px in diameter, filled with peach, water teal or rose at 20% to 30%, blurred 64px, scattered across two corners and the center, allowed to overlap. No animation. Never more than three per page.

## Do's and Don'ts

### Do

- Make every color block a large blurred circle with no hard edge
- Set headings in serif italic
- Let washes enlarge and deepen on hover
- Keep the paper-white ground, not cool white
- Cap the page at three wash circles
- Time motion at 500ms, the blob at 700ms

### Don't

- Don't use hard strokes or sharp geometry
- Don't use saturated primaries
- Don't rely on drop shadows for layering
- Don't bold the serif in body text
- Don't let washes cover text
- Don't stack more than three washes together

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper White | `#faf8f5` | Page canvas |
| 1 | Wash Card | `rgba(255,255,255,0.60)` | Cards and overlays |

## Elevation

- **Card:** `0 10px 30px rgba(74,111,165,0.10)`
- **Card hover:** `0 12px 40px rgba(74,111,165,0.18)`

## Imagery

Watercolor originals, wash textures, paper grain. Photos may carry a paper-texture overlay with reduced saturation. No sharp photography, hard-edged graphics, 3D renders or neon color.

## Layout

Capped at 1080px with 32px container padding and 128px section gaps. The layout keeps enormous whitespace; text blocks stay under 34em wide. Headings may span columns and overlap the wash circles. Images use 24px radii or irregular crops.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#4a6fa5`
- background: `#faf8f5`
- card: `rgba(255,255,255,0.60)`
- accent: `#e8a87c`
- secondary: `#85cdca`
- border: `rgba(74,111,165,0.20)`

EXAMPLE COMPONENT PROMPTS:

1. Build a watercolor card: background linear-gradient(135deg, rgba(232,168,124,0.2), #ffffff, rgba(133,205,202,0.2)), 24px radius, 1px rgba(74,111,165,0.1) stroke, 32px padding, backdrop-blur 10px. Top-right a 96px rgba(133,205,202,0.3) circle with blur(40px). On hover the gradient ends rise to 0.3 and the blob scales 1.5, deepening to 0.4, over 700ms. Page ground #faf8f5, headings in serif italic #4a6fa5.
2. Build a wash button: a blue-to-teal horizontal gradient at 80% opacity, white 17px serif text, 999px radius, padding 16px 32px, shadow 0 10px 30px rgba(74,111,165,0.20). On hover the gradient rises to 90%, the shadow spreads to 40px and the button lifts 2px over 500ms ease-in-out; on press scale 0.98 with the shadow back to 10px.
