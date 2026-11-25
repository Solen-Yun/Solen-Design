# Scandinavian — Style Reference

> Warm grey-white, hairline strokes, extremely slow transitions: "quiet" turned into measurable parameters.

**Theme:** light

The Scandinavian style comes from the Hygge view of living: less, slower, warmer. Every parameter is more restrained than usual — weights only 200 and 300, radius fixed at 2px, borders 1px at 30% opacity, transitions a full 700ms and always ease-in-out. Interaction is deliberately feather-light: hover moves the border from 30% to 80%, press only shifts brightness — never displacement, never bounce. Whitespace is structure, not decoration: at least 40px between elements. The palette is warm grey-white with wood, moss and grey-blue, all saturation held under 30%.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Charcoal | `#3d3d3d` | `--color-charcoal` | Titles and primary-button fill. Deep but not black, gentle over long looks. |
| Warm White | `#f5f0eb` | `--color-warm-white` | The page canvas. A wood-toned ivory, closer to interior walls than cold white. |
| Wood | `#a89279` | `--color-wood` | Secondary text and ornaments. A pale-oak tone, the style's source of warmth. |
| Moss | `#5a7a6b` | `--color-moss` | Hover highlights and success, the green of houseplants. |
| Grey Blue | `#7ba0b8` | `--color-grey-blue` | Links and cool balance, for information meant to recede. |
| Sand | `#c9a88c` | `--color-sand` | Dividers and tile grounds, separating without introducing contrast. |

## Typography

### Inter — the only typeface, only hairline 200 and 300. Line height 1.8 with slightly open tracking, letting text breathe.

- **Substitute:** 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 200, 300, 400
- **Sizes:** 12, 14, 16, 20, 26, 34
- **Line height:** 1.2 (display), 1.35 (headings), 1.8 (body)
- **Letter spacing:** 0.01em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 300 | 34px | 1.2 | 0.01em | `--text-display` |
| heading | — | 300 | 26px | 1.3 | — | `--text-heading` |
| subheading | — | 400 | 20px | 1.4 | — | `--text-subheading` |
| body-lg | — | 300 | 16px | 1.8 | — | `--text-body-lg` |
| body | — | 300 | 14px | 1.8 | — | `--text-body` |
| label | — | 400 | 12px | 1.5 | 0.12em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** airy

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 8 | 8px | `--spacing-8` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 40 | 40px | `--spacing-40` |
| 56 | 56px | `--spacing-56` |
| 80 | 80px | `--spacing-80` |
| 120 | 120px | `--spacing-120` |
| 160 | 160px | `--spacing-160` |

### Border Radius

| Element | Value |
|---|---|
| cards | 2px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1040px
- **Section gap:** 160px
- **Card padding:** 40px
- **Element gap:** 40px

## Components

### Quiet Button

**Role:** the primary action button

Charcoal fill, warm-white text, 2px radius, no stroke, no shadow. 14px/300, 0.12em tracking, padding 14px 40px. On hover the fill turns moss and brightness drops 5%; on press the fill only darkens one more step — never scale, never shift. Transition 700ms ease-in-out, the rhythm the whole style beats to.

- **Sizes:** padding 14px 40px; label 14px
- **States:** hover: moss fill, brightness 95%; active: darker fill only

### Hygge Card

**Role:** content cards and image tiles

White 60% fill, 2px radius, 1px sand 30% stroke, 40px padding, no shadow. Title 26px/300 charcoal, body 14px/300 wood. On hover the stroke rises to 80%, the ground brightens slightly and the title turns moss — all within 700ms.

### Line Input

**Role:** form inputs

Transparent ground, only a bottom 1px sand 40% stroke, no left or right borders, 2px radius, padding 8px 0, 14px/300 text. On focus the underline turns moss at unchanged width — no outer ring.

### Breathing Section

**Role:** section containers

160px between sections, 40px between title and content, body measure capped at 34em. Sections separate with a 1px sand 30% line, or whitespace alone. Never place two high-contrast elements side by side.

## Do's and Don'ts

### Do

- Use weights 200 and 300 only
- Transition 700ms ease-in-out
- Keep radius at 2px, nearly square
- Let hover change only borders and grounds
- Keep at least 40px between elements
- Hold all saturation under 30%

### Don't

- Don't use vivid saturated colors
- Don't use thick borders or strong shadows
- Don't pack elements densely
- Don't use decorative faces or oversized type
- Don't bounce or snap-scale anything
- Don't give press actions violent feedback

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm White | `#f5f0eb` | Page canvas |
| 1 | Soft White | `rgba(255,255,255,0.60)` | Cards |

## Elevation

- **None:** `none — a 1px border at 30% does the work`
- **Hover border:** `1px solid rgba(212,205,197,0.80)`

## Imagery

Interior photography in natural light: wooden furniture, linen textiles, plants, ceramics. Low saturation, warm tones, generous whitespace. No high contrast, cold light or decorative illustration.

## Layout

Capped at 1040px with 40px container padding and 160px section gaps. One column or an asymmetric two (5:7); whitespace claims over half the page. At least 40px between elements — prefer dropping a module to compressing the gaps.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#3d3d3d`
- background: `#f5f0eb`
- card: `rgba(255,255,255,0.60)`
- accent: `#5a7a6b`
- wood: `#a89279`
- border: `rgba(212,205,197,0.40)`

EXAMPLE COMPONENT PROMPTS:

1. Build a Scandinavian card: background rgba(255,255,255,0.6), 2px radius, 1px rgba(212,205,197,0.3) stroke, 40px padding, no shadow. Title 26px/300 #3d3d3d, body 14px/300 #a89279 at line height 1.8. On hover the stroke rises to rgba(212,205,197,0.8) and the title turns #5a7a6b, transition 700ms ease-in-out. Page ground #f5f0eb.
