# Arcade CRT — Style Reference

> An arcade monitor still glowing: scanlines, curved glass, phosphor and chromatic fringes.

**Theme:** dark

Arcade CRT simulates the monitors of 80s and 90s arcades: a full-screen scanline overlay, barrel curvature (faked with slight scale and radius), highly saturated phosphor colors, and RGB dispersion fringing the edges. The technical recipe is fixed — every content area layers scanlines, type must be monospace or pixel, only saturated phosphor colors are used, shadows can only be neon glows, and gradients can only run neon-to-dark. The bans are equally fixed: no soft desaturated tones, no serif or conventional sans body text, no radius above 4px, no subtle shadows.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Phosphor Green | `#39ff14` | `--color-phosphor-green` | Primary text and phosphor. The old green-phosphor screen's color. |
| Screen Black | `#050505` | `--color-screen-black` | The display's ground. Near pure black, so the phosphor layer reads as self-lit. |
| Magenta | `#ff00ff` | `--color-magenta` | The warm side of RGB dispersion and "bonus" states. |
| Cyan | `#00ffff` | `--color-cyan` | The cool side of RGB dispersion and data. |
| Alert Red | `#ff2a2a` | `--color-alert-red` | Health and failure, the harshest color on screen. |
| Coin Yellow | `#ffff00` | `--color-coin-yellow` | Scores, coins and highlights, for the "flash" moments. |

## Typography

### Press Start 2P — pixel or monospace; line height must open to 1.9 or pixel glyphs smear together.

- **Substitute:** 'Courier New', ui-monospace, monospace
- **Weights:** 400
- **Sizes:** 10, 12, 14, 18, 26, 36
- **Line height:** 1.3 (display), 1.4 (headings), 1.9 (body)
- **Letter spacing:** 0.05em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 400 | 36px | 1.35 | 0.05em | `--text-display` |
| heading | — | 400 | 26px | 1.4 | 0.05em | `--text-heading` |
| subheading | — | 400 | 18px | 1.5 | — | `--text-subheading` |
| body-lg | — | 400 | 14px | 1.9 | — | `--text-body-lg` |
| body | — | 400 | 12px | 1.9 | — | `--text-body` |
| label | — | 400 | 10px | 1.6 | 0.12em | `--text-label` |

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
| cards | 4px |
| buttons | 2px |
| inputs | 2px |
| screen | 24px |

- **Page max-width:** 1120px
- **Section gap:** 64px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Scanline Overlay

**Role:** the scanline overlay (signature)

A fixed full-page repeating-linear-gradient — a 1px black 45% line every 3px — with pointer-events: none. Optionally a bright band sweeps top to bottom every 3 seconds (8% bright, 3s cycle, linear). This layer must cover all content areas; without it, it is not a CRT.

### Tube Frame

**Role:** the tube frame

The page's outermost container: 24px radius, 2px dark-grey border, inset 0 0 80px black 60% (faking tube vignetting) plus an outer 0 0 120px phosphor-green 8% spill. Inside, a scale(0.995) layer adds the faint barrel illusion.

### Neon Panel

**Role:** content panels

Screen-black 90% fill, 4px radius, 1px phosphor-green 40% stroke, 20px padding, outer glow 0 0 20px phosphor green 60%. Titles 26px with 0 0 8px text glow, body 12px phosphor green 85%. On hover the stroke rises to 80% and the glow widens to 32px.

### Arcade Button

**Role:** action buttons

Magenta or phosphor-green fill, screen-black text, 2px radius, 12px uppercase 0.12em, padding 10px 20px, outer glow 0 0 16px same hue 60%. On hover the glow widens to 28px with a 60ms RGB-dispersion jitter; on press it shifts 1px and the glow contracts to 8px. Transition 80ms linear.

- **States:** hover: glow 28px, RGB jitter; active: translate 1px

### Score Readout

**Role:** score and status readouts

10px monospace uppercase 0.12em, phosphor green or coin yellow, with 0 0 8px text glow. Format: "SCORE 0012400 / HI 0098000", the value part in coin yellow. It may live permanently in a section corner, like an arcade's score strip.

### Chromatic Edge

**Role:** the dispersion edge

Stack two text copies over titles or buttons: one offset -2px in magenta, one +2px in cyan, blend mode screen, 60% opacity. At rest the offset is 2px; on hover it hard-cuts to 3px and jitters once.

## Do's and Don'ts

### Do

- Layer scanlines over the full screen
- Set monospace or pixel type
- Use only saturated phosphor colors
- Render shadows exclusively as neon glows
- Keep gradients neon-to-dark
- Cap radius at 4px (tube frame excepted)

### Don't

- Don't use soft desaturated colors
- Don't set body text in serif or conventional sans
- Don't exceed 4px radius
- Don't use subtle shadows
- Don't use gradients that aren't neon-to-dark
- Don't skip the scanlines

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Screen Black | `#050505` | Page ground |
| 1 | Tube Glass | `rgba(57,255,20,0.04)` | Panels (green-tinted translucent) |
| 2 | Scanline | `repeating-linear-gradient` | The scanline overlay |

## Elevation

- **Green glow:** `0 0 20px rgba(57,255,20,0.60)`
- **Magenta glow:** `0 0 20px rgba(255,0,255,0.55)`
- **Text glow:** `0 0 8px rgba(57,255,20,0.70)`

## Imagery

Pixel art from arcades and retro games, screen captures, low-resolution renders. Images must carry scanlines and slight dispersion. No modern HD photography or smooth illustration.

## Layout

Capped at 1120px with 16px container padding and 64px section gaps. The whole page composes like a layout inside one screen; elements may hug the edges. All content sits inside the Tube Frame, with a 16 to 24px outer "bezel" standing in for the tube's casing.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#39ff14`
- background: `#050505`
- magenta: `#ff00ff`
- cyan: `#00ffff`
- yellow: `#ffff00`
- alert: `#ff2a2a`

EXAMPLE COMPONENT PROMPTS:

1. Build an arcade-CRT panel: screen black #050505 fill, 4px radius, 1px rgba(57,255,20,0.4) stroke, 20px padding, box-shadow 0 0 20px rgba(57,255,20,0.6). Title 26px pixel face with 0 0 8px rgba(57,255,20,0.7) text glow. The whole page layers a scanline pattern (1px black 45% every 3px, pointer-events: none), and the outer container takes inset 0 0 80px rgba(0,0,0,0.6) vignetting. The button is magenta #ff00ff fill, screen-black text, 2px radius, outer glow 0 0 16px same hue 60%; on hover the glow widens to 28px with one 60ms RGB-dispersion jitter.
