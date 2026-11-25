# Steampunk — Style Reference

> Brass, copper pipes, rivets and gears: a Victorian machine still hissing steam.

**Theme:** dark

Steampunk comes from Victorian industrial machinery: on a deep-brown ground (#3d2b1f or the darker #2a1f15) sit brass (#b5a642) and copper (#b87333) fittings, text runs cream or brass, serif faces carry all typography, borders are translucent copper hairlines with rivet dots, and buttons use a vertical brass gradient to simulate lit metal. Brass sheen is expressed through a 0 0 15px warm outer glow. Pure-white backgrounds are banned, modern minimalism is banned, neon and fluorescent colors are banned, and flat texture-less design is banned.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Brass | `#b5a642` | `--color-brass` | The primary metal: buttons, strokes and text highlights. |
| Deep Brown | `#3d2b1f` | `--color-deep-brown` | Page ground and panels. The color of leather and old wood. |
| Copper | `#b87333` | `--color-copper` | The second metal: pipes, rivets and borders. |
| Cream | `#f5f0e1` | `--color-cream` | Primary text and the paper color of labels. |
| Iron | `#4a4a4a` | `--color-iron` | Secondary fittings and stamped recesses. |
| Verdigris | `#5a9025` | `--color-verdigris` | Oxidized copper green, for marks of use and status. |

## Typography

### Playfair Display — serif throughout; titles widen their tracking like a nameplate, body runs line height 1.7.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 15, 18, 22, 30, 40, 54
- **Line height:** 1.15 (display), 1.25 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 54px | 1.15 | 0.02em | `--text-display` |
| heading | — | 700 | 40px | 1.2 | — | `--text-heading` |
| subheading | — | 400 | 30px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 22px | 1.65 | — | `--text-body-lg` |
| body | — | 400 | 18px | 1.7 | — | `--text-body` |
| label | — | 700 | 15px | 1.5 | 0.16em | `--text-label` |

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
| cards | 4px |
| buttons | 4px |
| inputs | 4px |
| gauges | 999px |

- **Page max-width:** 1080px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Brass Button

**Role:** action buttons

A vertical brass gradient (#c9b84e to #8a7d32), deep-brown text, 4px radius, 1px copper 50% stroke, 18px/700, 0.08em tracking, padding 14px 32px, outer glow 0 0 15px brass 30% plus an inset 0 1px 0 white 30% top highlight. On hover the glow widens to 30px and the gradient brightens; on press the gradient inverts and the inner shadow deepens. Transition 200ms.

- **Sizes:** padding 14px 32px; label 18px
- **States:** hover: glow 30px, brighter; active: inverted gradient

### Riveted Panel

**Role:** the riveted panel (core component)

Deep-brown fill, 4px radius, 1px copper 50% stroke, 32px padding; a 6px copper dot (rivet) sits every 24px along the edges, with one 8px rivet at each corner. Outer glow 0 0 15px brass 30%. Rivets must be evenly spaced — handcraft does not mean arbitrary.

### Gear Ornament

**Role:** gear ornaments

A 48 to 120px gear (12 to 20 teeth, via clip-path polygon or SVG), filled brass or copper, with a 20%-diameter hole at the center, rotating slowly (20s linear infinite). Two or three may mesh together. At most three per screen, and the rotation must be slow — a fast spin turns it into a funfair.

### Pressure Gauge

**Role:** pressure-gauge readouts

A 96 to 160px circular dial: 3px brass rim, cream face, 12 ticks (one every 30 degrees, 8px long), a copper needle rotated to the value, an 8px rivet at the center. The value sits below the dial in 18px serif.

### Pipe Divider

**Role:** pipe dividers

An 8px-tall copper bar with a 12px circular flange (carrying 4 rivets) at each end, optionally a 90-degree elbow in the middle. It replaces ordinary dividers, declaring "this is one pipeline".

## Do's and Don'ts

### Do

- Pair the deep-brown ground with brass and copper
- Set serif type with nameplate-wide tracking
- Rivet every panel edge
- Light buttons with a brass gradient
- Render brass sheen as a warm outer glow
- Keep gears at 20s or slower

### Don't

- Don't use a pure-white background
- Don't do modern minimalism
- Don't use neon or fluorescent colors
- Don't design flat and textureless
- Don't cover the screen in brass
- Don't let gears spin fast

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Dark Brown | `#2a1f15` | Page ground |
| 1 | Deep Brown | `#3d2b1f` | Panels |
| 2 | Brass Plate | `#b5a642` | Metal fittings |

## Elevation

- **Brass glow:** `0 0 15px rgba(181,166,66,0.30)`
- **Brass glow strong:** `0 0 30px rgba(181,166,66,0.50)`
- **Metal drop:** `0 6px 16px rgba(0,0,0,0.45)`

## Imagery

Industrial photography and mechanical illustration: gears, pipes, gauges, airships, pocket watches. Must carry metal reflections and warm tones. Photos may be graded into sepia monochrome. No modern cities, minimal products or cold-toned photography.

## Layout

Capped at 1080px with 24px container padding and 112px section gaps. Panels may stack and carry riveted borders. The whole page stays dark brown; metal appears only where attention is needed — never a full screen of brass.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#f5f0e1`
- background: `#2a1f15`
- panel: `#3d2b1f`
- brass: `#b5a642`
- copper: `#b87333`
- cream: `#f5f0e1`

EXAMPLE COMPONENT PROMPTS:

1. Build a steampunk button: background linear-gradient(to bottom, #c9b84e, #8a7d32), deep-brown text #2a1f15, 4px radius, 1px rgba(184,115,51,0.5) stroke, 18px/700 with 0.08em tracking, padding 14px 32px, box-shadow 0 0 15px rgba(181,166,66,0.3), inset 0 1px 0 rgba(255,255,255,0.3). On hover the glow widens to 0 0 30px rgba(181,166,66,0.5). Page ground #2a1f15; panels #3d2b1f with a 1px copper stroke and a 6px copper rivet every 24px. Titles in Playfair Display 40px/700, 0.16em tracking, color #f5f0e1.
