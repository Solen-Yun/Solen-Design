# Pixel Art — Style Reference

> A world without transitions: every state change is a hard cut, like an 8-bit console.

**Theme:** light

Pixel art's aesthetic comes from hardware limits: few colors, no anti-aliasing, no transitions. On the web that becomes three hard rules — zero radius, 4px pure-black borders, and a 4px blur-free offset shadow. The most important rule is transition-none: a pixel game is a state machine, not an animation engine, so hover and press must complete instantly, and any fade would destroy the illusion. Interaction borrows game semantics too: hover swaps one palette color for another (a red button turns blue), and pressing translates the element 4px while the shadow drops to zero, as if the button were truly pushed all the way down.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Indigo | `#1a1c2c` | `--color-deep-indigo` | All borders, shadows, dark blocks and body text. The darkest stop in the 8-bit palette. |
| Paper | `#ffffff` | `--color-paper` | Panel fill. Pairs only with deep indigo; no greyscale steps. |
| Pixel Red | `#ff004d` | `--color-pixel-red` | Primary and dangerous actions. Swapped for pixel blue on hover. |
| Pixel Green | `#00e436` | `--color-pixel-green` | Success and hit points; the positive state in game semantics. |
| Pixel Blue | `#29adff` | `--color-pixel-blue` | Links, selected states and the hover swap color. |
| Pixel Yellow | `#ffec27` | `--color-pixel-yellow` | Coins, scores and highlights, on small elements that must be seen instantly. |

## Typography

### Press Start 2P — headings and buttons use the pixel font, all caps; body copy stays monospace for readability. Tracking must run wide, or the pixels smear together.

- **Substitute:** 'Courier New', ui-monospace, monospace
- **Weights:** 400
- **Sizes:** 10, 12, 16, 24, 32
- **Line height:** 1.2 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** 0.05em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 400 | 32px | 1.2 | 0.05em | `--text-display` |
| heading | — | 400 | 24px | 1.3 | 0.05em | `--text-heading` |
| body-lg | — | 400 | 16px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 12px | 1.7 | — | `--text-body` |
| label | — | 400 | 10px | 1.4 | 0.12em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** compact

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

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1024px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Pixel Button

**Role:** primary action button

Pixel red fill, paper-white text, 4px deep-indigo border, zero radius, 4px hard offset shadow. 12px type, uppercase, 0.12em tracking, padding 12px 24px. On hover the fill hard-cuts to pixel blue and the shadow hard-cuts to pixel red; on press the element translates 4px 4px and the shadow drops to none. transition-none throughout.

- **Sizes:** padding 12px 24px; label 12px
- **States:** hover: palette swap, no fade; active: translate 4px, shadow none

### Pixel Card

**Role:** content cards and level cards

Paper-white fill, 4px deep-indigo border, zero radius, 24px padding, 4px hard shadow. Titles 24px uppercase, body 12px monospace. On hover the border and shadow hard-cut to pixel red and the title turns red in sync; the element itself never moves.

### Pixel Input

**Role:** inputs

Paper-white fill, 4px deep-indigo border, zero radius, padding 12px 16px, 12px uppercase monospace. Placeholder at deep indigo 50%. On focus a 2px pixel-blue inner stroke (inset 0 0 0 2px) appears without changing the outer frame.

### Pixel Nav

**Role:** top navigation

Deep indigo fill, a 4px pixel-red bottom border, white uppercase text at 0.05em tracking. Links 12px; hover hard-cuts them to paper white; the selected item takes pixel yellow. 56px tall, no radius, no shadow.

## Do's and Don'ts

### Do

- Zero radius, 4px borders, 4px hard shadows
- transition-none everywhere; states hard-cut
- Do hover as palette swaps, never fades
- Make the press offset equal the shadow offset
- Take font sizes from the 8-bit set: 10, 12, 16, 24, 32
- Keep every dimension a multiple of 4

### Don't

- Don't use any border radius
- Don't use gradients or soft shadows
- Don't use transition-* except none
- Don't use thin borders
- Don't animate opacity on hover
- Don't reach for colors outside the palette

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#ffffff` | Panels and cards |
| 1 | Deep Indigo | `#1a1c2c` | Dark blocks and navigation |

## Elevation

- **Hard offset:** `4px 4px 0 #1a1c2c`
- **Hover offset:** `4px 4px 0 #ff004d`
- **Pressed:** `none`

## Imagery

Pixel drawings and 8-bit icons are the only image language. Photos may be downsampled into pixel maps. No vector illustrations, no soft photography, no anti-aliased shapes of any kind.

## Layout

Capped at 1024px, container padding 24px, section gap 64px. Every dimension is a multiple of 4 and elements align to the 4px grid. A dotted checkerboard may back a section, but never covers more than 30% of a screen.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1c2c`
- background: `#ffffff`
- red: `#ff004d`
- green: `#00e436`
- blue: `#29adff`
- yellow: `#ffec27`

EXAMPLE COMPONENT PROMPTS:

1. Build a pixel button: background #ff004d, white text, 4px solid #1a1c2c border, border-radius 0, box-shadow 4px 4px 0 #1a1c2c, 12px uppercase 0.12em tracking, padding 12px 24px, transition: none. On hover the background hard-cuts to #29adff and the shadow hard-cuts to #ff004d; on active transform: translate(4px, 4px) and box-shadow none.
2. Build a pixel nav bar: deep-indigo fill #1a1c2c, 56px tall, a 4px #ff004d bottom border, white uppercase 12px links at 0.05em tracking. Hover swaps a link to paper white with no transition; the selected link is #ffec27.
