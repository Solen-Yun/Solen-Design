# Cottagecore — Style Reference

> Linen, gardens, hand-sewn hems: a country afternoon you want to live inside.

**Theme:** light

Cottagecore grows from the longing for simple country living: earth and floral tones (green, off-white, wheat, brown, dusty rose), serif type, linen or paper textures, large radii with soft shadows, and embroidery-style decorations — flowers and mushrooms. Its motion has one very specific habit — on hover the element lifts 2px and rotates 0.8 degrees, like paper caught by a breeze — and must always ship a motion-reduce fallback. The bans: no cold blue-grey, no sharp corners or hard borders, no neon or fluorescence, nothing technological or industrial.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Meadow | `#5a8f5a` | `--color-meadow` | Primary: primary buttons, leaf decoration and success states. |
| Cloth | `#faf6f0` | `--color-cloth` | Page ground. Linen washed a hundred times. |
| Wheat | `#f5d75f` | `--color-wheat` | Sunlight and highlights, on flower centers and badges. |
| Timber | `#8b7355` | `--color-timber` | Wooden objects and the second text tier, warmer than ink. |
| Wild Rose | `#d4a0a0` | `--color-wild-rose` | Flowers and emotional emphasis, medium frequency. |
| Sprout | `#7ff77e` | `--color-sprout` | The brightest pencil, only for "new" and spring themes. |

## Typography

### Lora — the only font on the site. A serif with a hint of handwriting, line height 1.8 to make the page feel slow.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 15, 17, 21, 28, 36, 48
- **Line height:** 1.2 (display), 1.35 (headings), 1.8 (body)
- **Letter spacing:** 0.01em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 48px | 1.2 | 0.01em | `--text-display` |
| heading | — | 600 | 36px | 1.3 | — | `--text-heading` |
| subheading | — | 400 | 28px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 21px | 1.75 | — | `--text-body-lg` |
| body | — | 400 | 17px | 1.8 | — | `--text-body` |
| label | — | 600 | 15px | 1.6 | 0.12em | `--text-label` |

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
| cards | 24px |
| buttons | 999px |
| inputs | 16px |
| ornaments | 999px |

- **Page max-width:** 1040px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Meadow Button

**Role:** action button

Meadow-green fill, off-white text, 999px full radius, no stroke, 15px serif, padding 12px 32px, shadow 0 4px 10px green 20%. On hover it lifts 2px, rotates 0.8 degrees and the shadow spreads to 20px; on press rotation returns to zero, the scale drops to 0.97 and the shadow retreats to 6px. Transition 500ms ease-in-out with motion-reduce:transform-none.

- **Sizes:** padding 12px 32px; label 15px
- **States:** hover: lift 2px, rotate 0.8deg; active: rotate 0, scale 0.97

### Linen Card

**Role:** content cards

A cloth tone one step brighter, 24px radius, 1px meadow-green 12% stroke, 32px padding, soft shadow 0 4px 10px green 20%. A 32px floral or leaf decoration (meadow green 70%) sits at the top-left. On hover the card lifts 4px and the shadow spreads to 20px.

### Fabric Field

**Role:** inputs

Cloth fill, 16px radius, 1px timber-brown 20% stroke, padding 12px 18px, 17px type. On focus the stroke turns meadow green with a 3px green 15% outer ring. Placeholders at timber 50%.

### Floral Sprig

**Role:** flowers and mushrooms

Hand-drawn line or embroidered-feel flowers, wheat and mushrooms, 24 to 96px, colored wild rose, wheat or meadow green. Placed at card corners or beside headings, allowed a slight tilt of -8 to 8 degrees. This is the style's identity mark and may never be omitted.

### Stitched Rule

**Role:** the stitched divider

A 2px dashed line (6px dash, 4px gap) in meadow green 30% or timber brown 30%, inset 16px at both ends. Optionally finished with a small "backstitch" mark at each end. Used between sections instead of straight rules.

## Do's and Don'ts

### Do

- Lead with earth and floral tones, warm throughout
- Use serif type at line height 1.8
- Keep radii 16 to 24px with soft shadows
- Always include floral or leaf decoration
- Lift 2px and rotate 0.8 degrees on hover
- Ship the motion-reduce fallback

### Don't

- Don't use cold blue-grey tones
- Don't use sharp corners or hard borders
- Don't use neon or fluorescent colors
- Don't use tech or industrial elements
- Don't omit the decoration
- Don't animate rotation without a fallback

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cloth | `#faf6f0` | Page ground (with linen texture) |
| 1 | Lighter Cloth | `#fffdf8` | Cards |
| 2 | Meadow Wash | `rgba(90,143,90,0.10)` | Section grounds |

## Elevation

- **Soft:** `0 4px 10px rgba(90,143,90,0.20)`
- **Soft hover:** `0 8px 20px rgba(90,143,90,0.30)`
- **Pressed:** `0 2px 6px rgba(90,143,90,0.20)`

## Imagery

Country photography and hand-drawn illustration: gardens, bread, pottery, linen, mushrooms. Natural light, warm tones, soft focus. Photos may be graded into gentle film tones. No cold light, industrial objects or tech products.

## Layout

Capped at 1040px with 24px container padding and 112px section gaps. Cards may drift and tilt slightly (-2 to 2 degrees). Whitespace runs generous, density mid-to-low. Decoration may spill a little past the container edge, like a vine escaping its frame.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#3d3a34`
- background: `#faf6f0`
- card: `#fffdf8`
- green: `#5a8f5a`
- wheat: `#f5d75f`
- rose: `#d4a0a0`

EXAMPLE COMPONENT PROMPTS:

1. Build a cottagecore button: background #5a8f5a, off-white #faf6f0 text, 999px full radius, 15px serif, padding 12px 32px, box-shadow 0 4px 10px rgba(90,143,90,0.2). On hover translateY(-2px) rotate(0.8deg) with the shadow spreading to 0 8px 20px rgba(90,143,90,0.3); on active rotate(0) scale(0.97) with the shadow retreating to 0 2px 6px, transition 500ms ease-in-out plus motion-reduce:transform-none. Cards take #fffdf8 ground, 24px radius, 32px padding and a 32px meadow-green leaf at the top-left. Page ground #faf6f0, optionally layered with linen texture.
2. Build a stitched divider: a 2px dashed line (6px dash, 4px gap) in meadow green 30%, inset 16px at both ends, with small backstitch marks.
