# Kinetic Constructivism — Style Reference

> Geometric primitives are not placed — they are mounted on axles: circles orbit, triangles swing.

**Theme:** light

Kinetic constructivism bolts a motor onto constructivism: on bone paper (#efe9dc), only five primitives — circle, triangle, square, thick diagonal bar and arc — filled with the three primaries, constructivist red (#e0231b), ultramarine (#1c4a87) and chrome yellow (#f4b301), with warm ink (#17130e) as the body. Primitives don't decorate the layout; they move along axles — circles orbit, triangles pendulum-swing, squares march in step. Entrance uses expo-out (0.6 to 0.9 seconds); rotation loops run linear or steps() for a gear feel. The bans are hard: no radius, shadow, gradient, glow or blur; no fourth color; no muddying the primaries; no illustration stealing the show; no screen where every primitive moves at once (keep a static skeleton — one dominant motion per screen); no animating layout properties; no ignoring reduced-motion.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Bone Paper | `#efe9dc` | `--color-bone-paper` | Page ground. A yellow-tinged paper, like a poster not yet printed. |
| Warm Ink | `#17130e` | `--color-warm-ink` | Text and the boldest diagonal. A warm near-black. |
| Constructivist Red | `#e0231b` | `--color-red` | First primary: the main disc and the loudest primitive. |
| Ultramarine | `#1c4a87` | `--color-ultramarine` | Second primary: triangles and secondary primitives. |
| Chrome Yellow | `#f4b301` | `--color-chrome-yellow` | Third primary: the smallest squares and highlight points. |

## Typography

### Inter — sans throughout, 700 and 900. Titles compress to line height 0.95; a text block is itself a geometric solid.

- **Substitute:** 'Arial Black', Helvetica, sans-serif
- **Weights:** 700, 900
- **Sizes:** 13, 16, 22, 32, 48, 72
- **Line height:** 0.95 (display), 1.05 (headings), 1.5 (body)
- **Letter spacing:** -0.03em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 72px | 0.95 | -0.03em | `--text-display` |
| heading | — | 900 | 48px | 1 | -0.03em | `--text-heading` |
| subheading | — | 700 | 32px | 1.1 | — | `--text-subheading` |
| body-lg | — | 700 | 22px | 1.4 | — | `--text-body-lg` |
| body | — | 700 | 16px | 1.5 | — | `--text-body` |
| label | — | 700 | 13px | 1.4 | 0.08em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| discs | 999px |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 24px

## Components

### Orbiting Disc

**Role:** the orbiting disc (core component)

A solid circle (40 to 160px, constructivist red) orbiting along a larger invisible track: the keyframes change only transform's rotate (the outer ring rotating while the inner counter-rotates so the disc itself stays upright). Cycle 12 to 24 seconds, linear infinite. The circle has zero radius on cards (it is a circle), no shadow, no stroke.

- **Sizes:** cycle 12–24s linear

### Pendulum Triangle

**Role:** the pendulum triangle

A solid isosceles triangle (clip-path polygon) swinging ±18 degrees about its apex, cycle 4 to 6 seconds, cubic-bezier(0.45, 0, 0.55, 1) (near-sinusoidal). Ultramarine or chrome-yellow fill. The pivot must be the apex, or it looks like it's floating.

- **Sizes:** swing ±18deg; 4–6s

### Marching Blocks

**Role:** the marching blocks

Three to six equal squares (24 to 40px each) in a row, translating 16px along X and back with a 120ms stagger, cycle 1.6 seconds, linear or steps(2) (gear feel). Fills rotate through the primaries. They must never move simultaneously — the offset makes the march.

- **Sizes:** stagger 120ms; cycle 1.6s

### Diagonal Bar

**Role:** the thick diagonal

A solid bar 16 to 40px thick at 45 or -30 degrees, warm ink or constructivist red, crossing a section and allowed to overflow the container. It is the strongest compositional axis and stays static — moving primitives travel along its direction.

### Hard Button

**Role:** action buttons

Constructivist-red fill, bone-white text, zero radius, no stroke, 16px/900, 0.08em tracking, padding 12px 28px, no shadow. On hover the fill hard-cuts to ultramarine; on press it translates 2px 2px (shadow stays zero; the shift reads as pressing in). Entrance expo-out 0.7 seconds.

- **Sizes:** padding 12px 28px; label 16px
- **States:** hover: blue fill; active: translate 2px

## Do's and Don'ts

### Do

- Use five primitives and three primaries, only
- Orbit the circles, swing the triangles, march the blocks
- Enter with expo-out over 0.6 to 0.9 seconds
- Loop rotations linear or in steps()
- Keep one dominant motion per screen
- Animate transform only

### Don't

- Don't use radius, shadow, gradient, glow or blur
- Don't introduce a fourth color
- Don't muddy the three primaries
- Don't let illustration steal the show
- Don't set every primitive in motion at once
- Don't animate layout properties

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Bone Paper | `#efe9dc` | Page ground |
| 1 | Red Solid | `#e0231b` | Red primitives |
| 2 | Ultramarine Solid | `#1c4a87` | Blue primitives |

## Elevation

- **None:** `none — knife-cut hard edges only`

## Imagery

No images — the primitives are the imagery. A small amount of black-and-white photography is allowed, cut into hard-edged geometry. No illustration, no 3D skeuomorphism, no image with a soft edge.

## Layout

Capped at 1200px with 24px container padding and 96px section gaps. Primitives may overflow containers and the page edge. **One dominant motion per screen**: every other primitive holds still as the skeleton. All motion uses transform only — never top/left/width/height.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#17130e`
- background: `#efe9dc`
- red: `#e0231b`
- blue: `#1c4a87`
- yellow: `#f4b301`
- ink: `#17130e`

EXAMPLE COMPONENT PROMPTS:

1. Build a kinetic-constructivism layout: bone-paper #efe9dc ground, warm-ink #17130e text. A 120px constructivist-red #e0231b solid disc orbits an invisible track (keyframes changing only transform rotate, 18s cycle linear, the inner layer counter-rotating to stay upright). An ultramarine #1c4a87 isosceles triangle swings ±18 degrees about its apex (5s, cubic-bezier(0.45,0,0.55,1)). Four 32px chrome-yellow #f4b301 squares translate 16px along X with a 120ms stagger (1.6s linear). A 32px-thick warm-ink bar crosses the section at 45 degrees and overflows the container. Title 72px/900, line height 0.95, -0.03em tracking. Zero radius, zero shadow, no gradients — one dominant motion per screen.
