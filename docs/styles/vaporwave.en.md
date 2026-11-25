# Neon Retro — Style Reference

> Pink-purple-cyan gradients, scanlines, glitch offsets: a broken system from 1987.

**Theme:** dark

Neon retro (vaporwave / synthwave) is recycled 80s-and-90s futurism: pink, purple and cyan gradients on the ground, neon glow that must be a dual-color ghost (pink and cyan each offset 1 to 2px), and scanlines plus grid backgrounds hinting at CRTs and a perspective floor. The interaction language comes from old systems too — clicking makes an element jitter 2px out of alignment, like an error dialog. Motion is deliberately slow: hover drifts rather than reacts. Monochrome grey is banned, modern minimalism is banned, single-color glow is banned.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Neon Pink | `#ff71ce` | `--color-neon-pink` | The first primary and the warm side of the glow ghost. Core to headings and the primary button. |
| Seafoam Cyan | `#01cdfe` | `--color-cyan` | The second primary and the cold side of the ghost. Always paired with pink, never alone. |
| Midnight | `#0d0221` | `--color-midnight` | Page base. A purple-leaning near-black that lets pink and cyan glow float. |
| Mint | `#05ffa1` | `--color-mint` | Success and "online" states; the third neon. |
| Violet | `#b967ff` | `--color-violet` | The gradient's middle station, carrying pink into cyan. |
| Sunlight | `#fffb96` | `--color-sunlight` | Highlights and key figures; the smallest area. |

## Typography

### Space Grotesk — headings use the squared sans; small labels go monospace uppercase at 0.24em — the wide tracking is the strongest period signal.

- **Substitute:** 'Arial Black', 'Courier New', sans-serif
- **Weights:** 500, 700
- **Sizes:** 12, 14, 18, 24, 36, 52
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** 0.02em on display, 0.24em on uppercase labels

### JetBrains Mono — body, labels and data. Monospace makes the whole page read like a log exported from an old system.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400
- **Sizes:** 12, 13, 15
- **Line height:** 1.4 (display), 1.4 (headings), 1.6 (body)
- **Letter spacing:** 0.04em on display, 0.24em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Space Grotesk | 700 | 52px | 1.05 | 0.02em | `--text-display` |
| heading | Space Grotesk | 700 | 36px | 1.15 | 0.02em | `--text-heading` |
| subheading | Space Grotesk | 500 | 24px | 1.25 | — | `--text-subheading` |
| body-lg | JetBrains Mono | 400 | 15px | 1.6 | — | `--text-body-lg` |
| body | JetBrains Mono | 400 | 13px | 1.6 | — | `--text-body` |
| label | JetBrains Mono | 400 | 12px | 1.4 | 0.24em | `--text-label` |

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
| cards | 4px |
| buttons | 4px |
| inputs | 4px |

- **Page max-width:** 1160px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Neon Button

**Role:** primary action button

Transparent ground, 1px neon-pink border, 4px radius, 12px monospace uppercase at 0.24em, padding 12px 24px, pink text with a dual-color text glow (pink plus cyan). On hover the fill rises to pink 12%, the button floats up 4px and the glow widens to 24px — over 600ms ease-out (slow drift, never fast); on press the element glitches 2px out of place (+2px X, -2px Y) and recovers within 120ms.

- **Sizes:** padding 12px 24px; label 12px
- **States:** hover: fill 12%, lift 4px, slow; active: glitch 2px offset

### Glitch Card

**Role:** content cards and panels

Pink 6% fill, 4px radius, 1px cyan 30% border, 24px padding, with a 1px pink 20% offset ghost (2px 2px 0). Titles are 24px/500 with a dual-color text glow; body is 13px monospace at pink-white 75%. On hover the border turns pink 60%, the ghost flips to cyan and the card floats up 2px, over 600ms.

### Grid Floor

**Role:** perspective grid and scanline background

The base layer draws 4px-interval cyan 6% horizontal lines with repeating-linear-gradient (the scanlines); above it a 40px-interval magenta 8% vertical-line layer builds the grid. For perspective, use transform: perspective(400px) rotateX(60deg) to create the horizon. The whole overlay is pointer-events: none.

### Chrome Text

**Role:** chrome-metal headlines (optional ornament)

Fill with a three-stop gradient (pink → violet → cyan) via background-clip: text, then stack a 2px dark stroke (-webkit-text-stroke) and the dual-color ghost. Hero headlines only, at most one per page — never body text.

### Status Strip

**Role:** bottom status bar

Fixed to the viewport bottom, 32px tall, midnight ground, a top 1px cyan 20% border. The left side shows "ONLINE" in 12px monospace mint; the right side shows time and coordinates. Like an old system's status bar.

## Do's and Don'ts

### Do

- Build the pink-purple-cyan gradient
- Make every glow a pink-cyan dual ghost
- Layer scanlines and the perspective grid
- Set labels uppercase at 0.24em tracking
- Let hover drift over 600ms
- Give clicks a 2px glitch offset

### Don't

- Don't use a grey, monochrome palette
- Don't slip into modern minimalism
- Don't omit the neon glow
- Don't use formal typefaces
- Don't glow in a single color
- Don't make interactions fast

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Midnight | `#0d0221` | Page base |
| 1 | Panel | `rgba(255,113,206,0.06)` | Cards (pink-tinted) |
| 2 | Grid Overlay | `repeating-linear-gradient` | Grid and scanlines |

## Elevation

- **Dual glow:** `2px 2px 0 #01cdfe, -2px -2px 0 #ff71ce`
- **Neon bloom:** `0 0 20px rgba(255,113,206,0.50)`
- **Text glow:** `0 0 10px rgba(255,113,206,0.60), 0 0 20px rgba(1,205,254,0.40)`

## Imagery

Synth landscapes, palm silhouettes, classical statuary, perspective grids and CRT scanlines. Images must carry the pink-purple grade with glowing edges. No realistic photography, no natural-light shots, no modern illustration.

## Layout

Capped at 1160px with 24px container padding and 96px section gap. The common hero: a centered large headline pressed over the perspective grid. Elements may tilt and overlap slightly, but the grid background runs through the whole page to keep the period unified.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ff71ce`
- background: `#0d0221`
- cyan: `#01cdfe`
- violet: `#b967ff`
- mint: `#05ffa1`
- border: `rgba(1,205,254,0.30)`

EXAMPLE COMPONENT PROMPTS:

1. Build a neon-retro card: background rgba(255,113,206,0.06), 4px radius, 1px rgba(1,205,254,0.3) border, 24px padding, box-shadow 2px 2px 0 #01cdfe, -2px -2px 0 #ff71ce. Title 24px neon pink #ff71ce with text-shadow 0 0 10px rgba(255,113,206,0.6), 0 0 20px rgba(1,205,254,0.4). Body 13px monospace. On hover the border turns rgba(255,113,206,0.6) and the card translates -2px, transition 600ms ease-out. Page base #0d0221, optionally layered with 4px-interval cyan 6% scanlines.
2. Build a neon button: transparent ground, 1px #ff71ce border, 4px radius, 12px monospace uppercase at 0.24em tracking, padding 12px 24px, pink text with the dual-color glow. On hover the fill rises to rgba(255,113,206,0.12), the button floats 4px and the glow widens, over 600ms ease-out; on press the element glitches translate(2px, -2px) for 120ms.
