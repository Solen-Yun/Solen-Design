# Cyber Wafuu — Style Reference

> Seigaiha waves and circuit traces share one origin; kintsugi's cracks become glowing borders.

**Theme:** dark

Cyber wafuu lets technology "hack" traditional Japanese patterns: seigaiha waves merge with circuit routing, the asanoha star pattern serves as the grid, shoji lattice frames the cards, the torii frames navigation, and kintsugi's golden cracks become strokes and accents. The ground is deep indigo (#080814), the primary navy (#1e3a5f), supported by vermilion (#c41e3a), gold (#c9a227) and circuit cyan (#38bdf8). Interaction stays restrained — hover lifts 1 to 2px and intensifies the glow, never more.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Indigo | `#080814` | `--color-deep-indigo` | Page ground. Deep enough to light gold lines and circuit cyan at once. |
| Navy | `#1e3a5f` | `--color-navy` | Primary: panels, buttons and shoji lattice. |
| Vermilion | `#c41e3a` | `--color-vermilion` | The torii's and seal's red, the only warm accent on screen. |
| Kintsugi Gold | `#c9a227` | `--color-kintsugi-gold` | Kintsugi cracks and strokes, turning "repaired" into ornament. |
| Circuit Cyan | `#38bdf8` | `--color-circuit-cyan` | Traces, hover glow and data. The technology side's color. |
| Ochre | `#7c3e00` | `--color-ochre` | Text pressed onto gold, and the dark tone of old wood. |

## Typography

### Inter — sans-serif; titles add 0.04em tracking, small labels 11px uppercase at 0.18em.

- **Substitute:** 'Hiragino Sans', 'PingFang SC', system-ui, sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 11, 13, 16, 22, 30, 42
- **Line height:** 1.2 (display), 1.3 (headings), 1.65 (body)
- **Letter spacing:** 0.04em on display, 0.18em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 42px | 1.2 | 0.04em | `--text-display` |
| heading | — | 700 | 30px | 1.3 | 0.04em | `--text-heading` |
| subheading | — | 600 | 22px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.65 | — | `--text-body` |
| label | — | 600 | 11px | 1.45 | 0.18em | `--text-label` |

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
| seals | 4px |

- **Page max-width:** 1240px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 16px

## Components

### Shoji Card

**Role:** the shoji-lattice card (core component)

Deep-indigo fill, zero radius, 1px navy 30% stroke, 32px padding. Inside, 1px navy 20% lines draw the shoji lattice (2 horizontal, 2 to 3 vertical, evenly spaced); the lattice lines cross the content at an opacity too low to disturb reading. A 2px kintsugi crack (a jagged path with 0 0 12px gold 40% glow) overlays the top-left or bottom-right. On hover the card lifts 2px and the glow turns a cyan-plus-gold pair.

- **States:** hover: lift 2px, dual glow

### Torii Nav

**Role:** the torii navigation frame

At the page top, a horizontal beam (12px tall, vermilion fill, overhanging 24px on each end) plus two posts (8px wide, hanging from the beam to the top of the content) form the torii silhouette. Nav items sit below the beam. The torii itself is the container boundary and never duplicates other borders.

### Kintsugi Border

**Role:** the kintsugi crack border

An SVG jagged line runs along one side (or all four) of a container — an irregular 2px gold stroke with 0 0 12px gold 40% glow, bends between 100 and 140 degrees. It replaces ordinary strokes and implies the object has been repaired. At most three per screen.

### Seigaiha Ground

**Role:** the seigaiha pattern ground

Repeated concentric semicircles (radial-gradient or SVG pattern) draw seigaiha, 32px units, 1px lines in circuit cyan 10% or gold 8%. It may overlay circuit traces (straight lines with 90-degree bends), forming "traditional pattern crossed by circuitry".

### Execute Button

**Role:** action buttons

Navy fill, silver-grey text, zero radius, 1px navy 60% stroke, 13px/600, 0.18em tracking, padding 12px 24px, outer glow 0 0 12px navy 40%. On hover it lifts 1px, the stroke turns circuit cyan 60% and the glow becomes cyan plus gold; on press it sinks 1px and the glow retracts. Transition 250ms ease-out.

- **Sizes:** padding 12px 24px; label 13px
- **States:** hover: lift 1px, cyan glow; active: sink 1px

## Do's and Don'ts

### Do

- Merge seigaiha waves with circuits
- Build cards from shoji lattice
- Use kintsugi cracks as borders and accents
- Frame navigation with a single torii
- Limit hover to a 1 to 2px lift
- Keep zero radius, right angles everywhere

### Don't

- Don't use bright or high-saturation imagery
- Don't use rounded corners
- Don't let patterns outweigh content
- Don't repeat the torii frame
- Don't use exaggerated motion offsets
- Don't place more than three kintsugi seams per screen

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Indigo | `#080814` | Page ground |
| 1 | Navy Panel | `rgba(30,58,95,0.30)` | Panels |
| 2 | Circuit Trace | `rgba(56,189,248,0.20)` | The trace layer |

## Elevation

- **Navy glow:** `0 0 15px rgba(30,58,95,0.20)`
- **Dual amp:** `0 0 24px rgba(56,189,248,0.35), 0 0 36px rgba(201,162,39,0.16)`
- **Pressed:** `0 0 12px rgba(56,189,248,0.28)`

## Imagery

Japanese scenes and patterns: shoji doors, torii gates, karesense gardens, kintsugi pottery, seigaiha textiles. Always dark-toned, may be layered with circuit texture. Photos may be graded into indigo duotones. No bright photography, cartoon illustration or high-saturation imagery.

## Layout

Capped at 1240px with 24px container padding and 96px section gaps. Zero radius throughout. Panels may join with 1px navy lines into shoji-style lattice sections. The torii appears only once, at the page head.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#e2e8f0`
- background: `#080814`
- navy: `#1e3a5f`
- vermilion: `#c41e3a`
- gold: `#c9a227`
- cyan: `#38bdf8`

EXAMPLE COMPONENT PROMPTS:

1. Build a cyber-wafuu card: deep-indigo #080814 fill, zero radius, 1px rgba(30,58,95,0.3) stroke, 32px padding, box-shadow 0 0 15px rgba(30,58,95,0.2). Inside, draw the shoji lattice with 1px rgba(30,58,95,0.2) lines (2 horizontal, 3 vertical, evenly spaced). Overlay a 2px gold #c9a227 jagged crack at the bottom-right (0 0 12px rgba(201,162,39,0.4) glow). The background may layer 32px-unit seigaiha (1px circuit cyan #38bdf8 at 10%) with 90-degree circuit traces. On hover lift 2px with the glow turning 0 0 24px rgba(56,189,248,0.35), 0 0 36px rgba(201,162,39,0.16). Page ground #080814.
