# Watercolor Art — Style Reference

> Pigment dispersing in water: edges bleed, colors layer, the paper is wet.

**Theme:** light

The watercolor art style simulates the physics of real watercolor: pigment pooling from center to edge (a radial-gradient on buttons), edges bleeding irregularly, colors stacked at very low opacity, and a grainy paper texture (feTurbulence). Its technical parameters are deliberately pressed to the minimum — borders run only 8% to 18% opacity, shadows are extremely soft and tinted, radii start at 24px. The bans are explicit: no hard offset shadows, no borders above 2px, no pure black or neon, no monospace, no uppercase — nothing in watercolor is sharp.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Blush | `#d4a0a0` | `--color-blush` | Primary: primary buttons and main washes, like a thin ochre-red layer. |
| Wet Paper | `#faf6f0` | `--color-wet-paper` | Page ground. Textured warm white, mimicking watercolor paper. |
| Water Blue | `#7bb8d4` | `--color-water-blue` | The second color, for water and sky imagery. |
| Leaf Green | `#8cc5a8` | `--color-leaf-green` | Plant semantics and success states. |
| Petal Violet | `#c3a0d4` | `--color-petal-violet` | Emotional accents and floral touches. |
| Gamboge | `#e8c87a` | `--color-gamboge` | The highlight and sunlight layer, most often as an overlay. |

## Typography

### Cormorant Garamond — serif throughout, tracking opened to 0.14em, line height 1.85. Monospace and uppercase are banned.

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 300, 400, 600
- **Sizes:** 15, 18, 22, 30, 40, 54
- **Line height:** 1.15 (display), 1.3 (headings), 1.85 (body)
- **Letter spacing:** 0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Cormorant Garamond | 300 | 54px | 1.15 | 0.02em | `--text-display` |
| heading | Cormorant Garamond | 400 | 40px | 1.25 | — | `--text-heading` |
| subheading | Cormorant Garamond | 400 | 30px | 1.35 | — | `--text-subheading` |
| body-lg | Cormorant Garamond | 400 | 22px | 1.8 | — | `--text-body-lg` |
| body | Cormorant Garamond | 400 | 18px | 1.85 | — | `--text-body` |
| label | Cormorant Garamond | 600 | 15px | 1.6 | 0.14em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 32px |
| buttons | 24px |
| inputs | 24px |

- **Page max-width:** 1060px
- **Section gap:** 128px
- **Card padding:** 36px
- **Element gap:** 28px

## Components

### Wet Button

**Role:** action button (pigment pooling)

Blush fill layered with a radial-gradient (the center brightening to 110%, edges falling to 90%) to pool the pigment, 24px radius, 1px blush 18% stroke, 15px serif, 0.14em tracking, padding 16px 40px, shadow 0 4px 20px blush 30% plus inset 0 1px 0 white 20%. On hover the fill deepens to #c99595 and the shadow spreads to 40px; on press it scales to 0.98 and gains an inner shadow. Transition 500ms ease-in-out.

- **Sizes:** padding 16px 40px; label 15px
- **States:** hover: deeper wash, wider shadow; active: scale 0.98

### Wash Card

**Role:** content cards (multi-color layering)

White ground under two very faint washes (the first 10% blush, the second 8% water blue, each spreading from a corner via radial-gradient), 32px radius, 1px blush 12% stroke, 36px padding, soft shadow 0 4px 20px blush 30%. The three layers should leave uneven edges, mimicking wet-on-wet.

### Bleed Edge

**Role:** the bleeding-edge ornament

SVG feTurbulence plus feDisplacementMap (baseFrequency 0.02, scale 8) applied to a color block or image edge, making the boundary tremble and bloom. Decoration blocks only — never text.

### Paper Grain

**Role:** the paper-grain overlay

A fixed full-page noise texture at 2% to 4% opacity (feTurbulence or a base64 noise image), pointer-events: none, blended multiply. This layer makes every wash look painted on paper.

### Botanical Sprig

**Role:** botanical watercolor touches

A 64 to 160px watercolor leaf or flower (translucent, edges bleeding) in leaf green or petal violet at 40% to 60%, at a card corner or beside a title. At most three per screen.

## Do's and Don'ts

### Do

- Keep borders at 8% to 18% opacity
- Pool pigment with radial-gradients
- Layer a 2% to 4% paper grain
- Keep radii at 24px and above
- Make shadows extremely soft and tinted
- Transition at 500ms ease-in-out

### Don't

- Don't use hard offset shadows
- Don't use borders above 2px
- Don't use pure black or neon
- Don't use monospace
- Don't use uppercase text
- Don't apply bleed filters to text

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Wet Paper | `#faf6f0` | Page ground (with paper grain) |
| 1 | Wash Card | `rgba(212,160,160,0.10)` | Cards (faint washes) |
| 2 | Pool | `radial-gradient` | Pigment pooling areas |

## Elevation

- **Soft tinted:** `0 4px 20px rgba(212,160,160,0.30), inset 0 1px 0 rgba(255,255,255,0.20)`
- **Soft tinted hover:** `0 10px 40px rgba(212,160,160,0.50), inset 0 1px 0 rgba(255,255,255,0.20)`
- **Pressed:** `inset 0 2px 4px rgba(90,62,62,0.10)`

## Imagery

Watercolor painting and wet-on-wet illustration: plants, landscapes, still life — always with bleeding edges and layered color. Photos may be graded into watercolor effects. No hard-edged vector illustration, saturated images or pure black grounds.

## Layout

Capped at 1060px with 24px container padding and 128px section gaps. Elements may drift and rotate slightly (-2 to 2 degrees). Washes may spill a little past the container edge, like pigment running off the paper. Whitespace is generous; density runs below normal.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#5a3e3e`
- background: `#faf6f0`
- blush: `#d4a0a0`
- blue: `#7bb8d4`
- green: `#8cc5a8`
- violet: `#c3a0d4`

EXAMPLE COMPONENT PROMPTS:

1. Build a watercolor button: background #d4a0a0 layered with radial-gradient(circle at 35% 30%, rgba(255,255,255,0.18), transparent 60%) to pool the pigment, 24px radius, 1px rgba(212,160,160,0.18) stroke, 15px serif at 0.14em tracking, padding 16px 40px, box-shadow 0 4px 20px rgba(212,160,160,0.3), inset 0 1px 0 rgba(255,255,255,0.2). On hover the background deepens to #c99595 and the shadow spreads to 0 10px 40px rgba(212,160,160,0.5); on active scale(0.98) with inset 0 2px 4px rgba(90,62,62,0.1). Transition 500ms ease-in-out. Page ground #faf6f0, optionally layered with 3% paper-grain noise.
2. Build a wash card: white ground under a 10% blush wash and an 8% water-blue wash (radial-gradients from opposite corners), 32px radius, 1px blush 12% stroke, 36px padding, soft shadow 0 4px 20px blush 30% — the layered edges should look uneven, wet-on-wet.
