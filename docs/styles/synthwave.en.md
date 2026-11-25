# Synthwave — Style Reference

> A sunset gradient pressed onto a grid horizon, neon glowing from both the inside and the outside at once.

**Theme:** dark

Synthwave is the visual of 80s synth music: pink-purple-cyan neon, an orange-to-pink-to-violet sunset gradient, a perspective grid converging on the horizon, retro-tech type. It carries two signature motion rules. First, Arcade Pulse — neon borders and glowing elements pulse or flicker on hover, like a CRT energizing after being touched. Second, Multidimensional Neon — buttons must carry both an inset cyan glow and an outer pink glow; two neon tubes light from opposite directions and intensify together on hover. Single-direction glow is wrong here.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Magenta | `#ff00ff` | `--color-magenta` | The first neon: the pink side of the outer glow and the primary button. |
| Cyan | `#00ffff` | `--color-cyan` | The second neon: the cyan side of the inner glow and the grid lines. |
| Deep Violet Base | `#1a0b2e` | `--color-deep-violet` | Page base. Deep enough for both neon layers to be visible. |
| Pink | `#ff6ec7` | `--color-pink` | The sunset gradient's middle and the secondary accent. |
| Violet | `#7b68ee` | `--color-violet` | The gradient's transition stop, carrying pink into deep violet. |
| Sunset Orange | `#f67d50` | `--color-sunset-orange` | The gradient's top and the warm highlight, where the sun meets the horizon. |

## Typography

### Orbitron — the geometric sans of retro-tech, uppercase with wide tracking. Headlines run 46 to 66px at 0.04em tracking.

- **Substitute:** 'Arial Black', 'Trebuchet MS', sans-serif
- **Weights:** 700, 900
- **Sizes:** 13, 16, 22, 32, 46, 66
- **Line height:** 1.05 (display), 1.15 (headings), 1.5 (body)
- **Letter spacing:** 0.04em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Orbitron | 900 | 66px | 1.05 | 0.04em | `--text-display` |
| heading | Orbitron | 900 | 46px | 1.1 | 0.04em | `--text-heading` |
| subheading | Orbitron | 700 | 32px | 1.2 | — | `--text-subheading` |
| body-lg | Orbitron | 700 | 16px | 1.5 | — | `--text-body-lg` |
| body | Orbitron | 700 | 13px | 1.5 | — | `--text-body` |
| label | Orbitron | 700 | 13px | 1.4 | 0.2em | `--text-label` |

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
| cards | 8px |
| buttons | 8px |
| inputs | 8px |

- **Page max-width:** 1280px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Multidimensional Button

**Role:** primary action button (dual-direction neon)

Deep-violet fill, white text, 8px radius, 1px magenta 60% stroke; 13px/700 uppercase at 0.2em, padding 12px 28px. It must carry both an outer 0 0 15px magenta 40% glow and an inset 0 0 10px cyan 20% glow. On hover both intensify to 30px and 20px and an Arcade Pulse fires (one back-and-forth cycle within 1.2s). Transition 200ms.

- **Sizes:** padding 12px 28px; label 13px
- **States:** hover: both glows intensify, arcade pulse

### Neon Card

**Role:** content cards

Deep-violet 80% fill, 8px radius, 1px cyan 35% stroke, 24px padding, dual outer glow (cyan 12px, magenta 24px). Titles are 32px/700 with a 0 0 12px magenta text glow; body is 13px white 80%. On hover the stroke rises to 70% and one pulse fires.

- **States:** hover: border 70%, pulse once

### Sunset Horizon

**Role:** the sunset and horizon (the signature)

A vertical gradient band from orange through pink to violet, 240 to 360px tall, holding a 120 to 200px circle (orange-to-pink radial) sliced by 8 to 12 horizontal dark lines into a striped sun. Below it, the perspective grid (perspective(320px) rotateX(60deg)) with cyan 25% lines.

### Virtual Grid

**Role:** the virtual grid (active only on approach)

The perspective grid fills the bottom of a section, resting at 30% opacity with no motion. Only when the parent is hovered (or the element enters the viewport) does it rise to 70% and begin drifting forward slowly (6s linear loop). The grid must never animate at rest — it activates only when the "player approaches".

- **States:** group-hover: opacity 70%, forward drift

### Chip Label

**Role:** neon labels

Transparent ground, 1px cyan stroke, 8px radius, 13px/700 uppercase at 0.2em, padding 4px 10px, cyan text with a 0 0 8px cyan 60% glow. On hover the stroke turns magenta and the glow changes color.

## Do's and Don'ts

### Do

- Keep the pink-purple-cyan neon palette
- Build the orange-pink-violet sunset gradient
- Make every neon dual-direction (inset plus outer)
- Fire an Arcade Pulse on hover
- Activate the grid only on approach
- Set everything in uppercase geometric tech type

### Don't

- Don't use bright white backgrounds
- Don't drift into modern minimalism
- Don't omit the neon glow
- Don't use overly formal typefaces
- Don't glow in one direction only
- Don't animate the grid at rest

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Violet Base | `#1a0b2e` | Page base |
| 1 | Sunset Gradient | `linear-gradient(#f67d50, #ff6ec7, #7b68ee)` | The sunset |
| 2 | Grid Floor | `perspective grid` | The horizon grid |

## Elevation

- **Multidimensional:** `0 0 15px rgba(255,0,255,0.40), inset 0 0 10px rgba(0,255,255,0.20)`
- **Multidimensional strong:** `0 0 30px rgba(255,0,255,0.70), inset 0 0 20px rgba(0,255,255,0.40)`
- **Text glow:** `0 0 12px rgba(255,0,255,0.70)`

## Imagery

Synth visuals: sunsets, palm silhouettes, sports cars, city skylines, grid floors, retro-tech hardware. Photos may be crushed into pink-purple duotones. No bright white grounds, no modern photography, no minimal compositions.

## Layout

Capped at 1280px with 24px container padding and 96px section gaps. The common hero: a centered large title pressed over the sunset and grid horizon. Elements may overlap the grid, but text always stays above the glow and readable.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#1a0b2e`
- magenta: `#ff00ff`
- cyan: `#00ffff`
- pink: `#ff6ec7`
- violet: `#7b68ee`

EXAMPLE COMPONENT PROMPTS:

1. Build a synthwave button: deep-violet #1a0b2e fill, white text, 8px radius, 1px rgba(255,0,255,0.6) stroke, 13px/700 uppercase at 0.2em tracking, padding 12px 28px, box-shadow 0 0 15px rgba(255,0,255,0.4), inset 0 0 10px rgba(0,255,255,0.2) (dual-direction neon). On hover both glows intensify to 0 0 30px rgba(255,0,255,0.7), inset 0 0 20px rgba(0,255,255,0.4) and one pulse fires. The hero adds a vertical orange-pink-violet gradient band with a circle sun sliced by horizontal dark lines, above a perspective(320px) rotateX(60deg) cyan grid that lifts opacity and drifts only on group-hover.
2. Build a neon card: deep-violet 80% fill, 8px radius, 1px rgba(0,255,255,0.35) stroke, 24px padding, dual outer glow (cyan 12px, magenta 24px), a 32px/700 title with 0 0 12px magenta text glow, body 13px white 80%. On hover the stroke rises to 70% and one pulse fires.
