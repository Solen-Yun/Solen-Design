# Magic Circle — Style Reference

> Concentric rings, a hexagram, runes set along the circumference: a circle not yet cast.

**Theme:** dark

The magic-circle style comes from the casting visuals of fantasy works: layered concentric rings over a deep navy-black ground (#0a0920), a hexagram or hexagon at the core, runes arranged around the circumference, sacred geometry such as the flower of life as a latent pattern, and gold (#fbbf24) as the only warm light. Its signature motion is Arcane Rotation — on hover a card's inner dashed rings rotate 180 degrees over 3000ms, linear, as if the circle were being activated; buttons must scale to 0.95 when pressed, because casting requires focusing energy. Focus rings must carry an offset in the ground color, or they vanish against the dark field.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Circle Ground | `#0a0920` | `--color-circle-ground` | Page ground. Deep navy-black, letting gold rings and indigo runes float. |
| Circle Indigo | `#1e1b4b` | `--color-circle-indigo` | Panels and raised faces. The ground inside the circle. |
| Gold | `#fbbf24` | `--color-gold` | The only warm light: rings, runes and the primary button. |
| Silver | `#e2e8f0` | `--color-silver` | Primary text and secondary rings. The cool side's brightness. |
| Indigo | `#818cf8` | `--color-indigo` | Rune text and data. A cool-warm counterpoint to gold. |
| Spirit Green | `#56ed40` | `--color-spirit-green` | The "charged" state and success, the least frequent. |

## Typography

### Cinzel — titles in a monumental serif with wide tracking; runes and labels in monospace. Body text stays serif for readability.

- **Substitute:** 'Trajan Pro', Georgia, serif
- **Weights:** 400, 700
- **Sizes:** 11, 13, 16, 22, 32, 44
- **Line height:** 1.15 (display), 1.25 (headings), 1.7 (body)
- **Letter spacing:** 0.08em on display, 0.24em on uppercase labels

### JetBrains Mono — runes, coordinates and incantations. Monospace keeps rune glyphs equal in width when set around a circle.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400
- **Sizes:** 11, 13
- **Line height:** 1.5 (display), 1.5 (headings), 1.6 (body)
- **Letter spacing:** 0.12em on display, 0.24em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Cinzel | 700 | 44px | 1.15 | 0.08em | `--text-display` |
| heading | Cinzel | 700 | 32px | 1.2 | 0.08em | `--text-heading` |
| subheading | Cinzel | 400 | 22px | 1.35 | 0.06em | `--text-subheading` |
| body | Cinzel | 400 | 16px | 1.7 | — | `--text-body` |
| body-sm | Cinzel | 400 | 13px | 1.65 | — | `--text-body-sm` |
| label | JetBrains Mono | 400 | 11px | 1.5 | 0.24em | `--text-label` |

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
| cards | 8px |
| buttons | 2px |
| circles | 999px |
| hexagons | 0 |

- **Page max-width:** 1120px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Arcane Circle

**Role:** the ring assembly (core component)

Three to five concentric layers: outermost a 1px gold 40% solid ring, next a 1px gold 25% dashed ring (dash 8, gap 6), middle a 2px gold 60% solid ring, inner dashed rings. The core holds a hexagram (two overlapping triangles) or a hexagon. On hover every ring rotates 180 degrees over 3000ms linear — never allowed to stay still. Under prefers-reduced-motion they hold still.

- **Sizes:** 240–480px; rotation 3000ms linear

### Rune Path

**Role:** circumferential runes

Eight to 24 monospace characters at 11px set evenly along the circle, each rotated by its angle on the ring (rotate to position, counter-rotate the glyph to stay upright or follow the tangent). Geometric symbols or Latin capitals, never real words. Gold at 60%.

### Sigil Button

**Role:** the casting button

Circle-ground fill, gold text, 2px radius, 1px gold 40% stroke, 16px/700, 0.24em tracking, padding 12px 32px, outer glow 0 0 15px gold 15%. On hover the stroke rises to 100%, the glow widens to 30px and an inner glow joins; on press it scales to 0.95 with the inner glow deepening to 60% — the energy focus of a cast. Transition 500ms.

- **Sizes:** padding 12px 32px; label 16px
- **States:** hover: border full, glow 30px; active: scale 0.95, inner glow

### Hex Card

**Role:** the hexagonal card

A clip-path polygon cuts a regular hexagon (or an 8px-radius rectangle with hexagon corner marks), indigo fill, 1px gold 30% stroke, 32px padding. Content centered. On hover the stroke rises to 60% and the inner rings begin rotating.

### Sacred Geometry Bed

**Role:** the sacred-geometry latent layer

The page or section underlay carries a flower-of-life or hexagonal grid, 1px lines in gold 6% or indigo 8%, extremely low opacity. It exists only when noticed, and must never outweigh the content.

## Do's and Don'ts

### Do

- Layer concentric rings around a hexagram core
- Rotate rings 3000ms linear on hover
- Set runes evenly along the circumference
- Keep gold the only warm light, indigo the cool side
- Scale buttons to 0.95 when pressed
- Give focus rings a ground-colored offset

### Don't

- Don't use bright neon colors
- Don't leave rings motionless on hover
- Don't use focus rings without the offset
- Don't let buttons press without scaling
- Don't let the latent layer outweigh content
- Don't use real words as runes

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Circle Ground | `#0a0920` | Page ground |
| 1 | Circle Indigo | `#1e1b4b` | Panels |
| 2 | Gold Rim | `rgba(251,191,36,0.20)` | Gold rings |

## Elevation

- **Gold glow:** `0 0 15px rgba(251,191,36,0.15)`
- **Gold glow strong:** `0 0 30px rgba(251,191,36,0.40), inset 0 0 15px rgba(251,191,36,0.10)`
- **Cast:** `inset 0 0 30px rgba(251,191,36,0.60)`

## Imagery

Sigil illustration, alchemical symbols, star charts, spellbook page scans. Always line-art, gold or indigo, on dark grounds. No realistic photography, soft illustration or color imagery.

## Layout

Capped at 1120px with 24px container padding and 128px section gaps. Circles and hexagons may break the rectangular container. The circle often serves as the hero's central visual — text wraps around or sits over it but must stay readable.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#e2e8f0`
- background: `#0a0920`
- panel: `#1e1b4b`
- gold: `#fbbf24`
- indigo: `#818cf8`
- green: `#56ed40`

EXAMPLE COMPONENT PROMPTS:

1. Build a magic-circle card: circle-ground #0a0920 fill, 8px radius, 1px rgba(251,191,36,0.3) stroke, 32px padding. Inside, four concentric rings: outer 1px gold 40% solid, next 1px gold 25% dashed (dash 8 gap 6), middle 2px gold 60%, inner dashed ring, with a hexagram at the core. On hover every ring rotates 180 degrees over 3000ms linear. Set 12 monospace runes (gold 60%, each rotated by its angle) around the circumference. The button: circle-ground fill, gold text, 2px radius, 1px gold 40% stroke; on hover the glow widens to 0 0 30px rgba(251,191,36,0.4); on active scale(0.95). Page ground #0a0920, focus rings offset-2 in the ground color.
