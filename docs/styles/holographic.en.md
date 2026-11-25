# Holographic — Style Reference

> A rainbow spectrum flowing over deep space as the angle changes: foil flipping in the light.

**Theme:** dark

Holographic simulates the prismatic refraction of laser holographic foil: the ground is deep purple or deep navy (#0a0a1f), every element carries a gradient of three or more colors, and the gradient flows horizontally with interaction — its own rule called Spectrum Shift, implemented with background-size: 200% plus hover moving background-position from left to right, mimicking foil changing color with viewpoint. Pure-color elements are banned (a solid block without gradient has lost its material in this language), light backgrounds are banned (they kill the hologram outright), low saturation is banned, and so are sharp corners without glow.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Space | `#0a0a1f` | `--color-deep-space` | Page ground. Deep enough for every iridescence to float. |
| Deep Violet | `#1a0b2e` | `--color-deep-violet` | Secondary panel ground, more purple than deep space. |
| Hologram Violet | `#a855f7` | `--color-hologram-violet` | The gradient's home station and brand color, most often the button's start. |
| Magenta | `#ff0080` | `--color-magenta` | The spectrum's warm end, letting gradients cross purple to cyan. |
| Cyan | `#00d4ff` | `--color-cyan` | The spectrum's cool end, the brightest stop in a gradient. |
| Gold | `#ffd700` | `--color-gold` | Highlights and "foil reflection", appearing only inside gradients, never as fill. |
| Neon Green | `#00ff88` | `--color-neon-green` | The spectrum's fifth station, adding irregularity to gradients. |

## Typography

### Inter — the only typeface. Titles use gradient text (background-clip: text); labels run uppercase.

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 700
- **Sizes:** 12, 14, 17, 24, 36, 52
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 52px | 1.1 | -0.02em | `--text-display` |
| heading | — | 700 | 36px | 1.2 | — | `--text-heading` |
| subheading | — | 500 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 17px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.14em | `--text-label` |

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
| cards | 20px |
| buttons | 999px |
| inputs | 16px |

- **Page max-width:** 1160px
- **Section gap:** 112px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Spectrum Button

**Role:** the primary action button

A three-color linear gradient (violet to magenta to cyan, roughly a third each), white text, fully rounded 999px, no stroke, 15px/700, padding 12px 28px, outer glow 0 0 32px magenta 30%. The gradient sets background-size: 200% auto; on hover background-position moves from left to right (1.2s ease) — the Spectrum Shift. On press it scales 0.98.

- **Sizes:** padding 12px 28px; label 15px
- **States:** hover: background-position left→right; active: scale 0.98

### Prism Card

**Role:** content cards

White 6% fill, 20px radius, 1px white 12% stroke, 24px padding, plus a violet-to-cyan soft halo (0 0 40px violet 35%). The top carries a 2px three-color gradient line (violet→magenta→cyan) as the "foil edge". On hover the line's background-position flows backward and the card's glow turns magenta.

### Spectrum Text

**Role:** gradient headlines

background: linear-gradient(90deg, violet, magenta, cyan, gold) with background-clip: text and color: transparent, background-size 200%, position moving on hover. Reserved for the hero and section titles — never body text (readability collapses).

### Glass Field

**Role:** inputs

White 6% fill, 16px radius, 1px white 15% stroke, padding 12px 18px, 15px text. On focus the stroke becomes a 1px gradient (border-image or pseudo-element) with a 0 0 0 3px violet 25% ring — the focus ring must offset into deep space or it vanishes on the dark ground.

### Iridescent Orb

**Role:** decorative orbs

96px to 240px circles, radial gradient from a violet center fading through magenta and cyan, no border, outer glow 0 0 60px violet 30%. Placed behind cards or in section corners, allowed to overflow the container. At most two per screen.

## Do's and Don'ts

### Do

- Give every element a gradient of three or more colors
- Ground in deep purple or deep navy
- Let gradients flow with Spectrum Shift
- Pair sharp corners with glow
- Offset focus rings into deep-space color
- Keep saturation high to hold the iridescence

### Don't

- Don't use solid blocks without gradients
- Don't use light or white backgrounds
- Don't use desaturated or grey tones
- Don't leave sharp corners ungrown
- Don't stack two or more non-gradient elements in a row
- Don't let focus rings vanish on the dark ground

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Space | `#0a0a1f` | Page ground |
| 1 | Glass Panel | `rgba(255,255,255,0.06)` | Cards (translucent) |
| 2 | Spectrum | `linear-gradient 3+ stops` | Gradient elements |

## Elevation

- **Iridescent glow:** `0 0 40px rgba(168,85,247,0.35)`
- **Magenta glow:** `0 0 32px rgba(255,0,128,0.30)`

## Imagery

Laser foils, prisms, flakes, fluids and crystals. Every image must carry multi-color iridescence. Photos may layer a 30% rainbow gradient blended with overlay. No monochrome photography, pure-white grounds or grey-toned illustration.

## Layout

Capped at 1160px with 24px container padding and 112px section gaps. Elements may overlap widely and orbs may overflow. Two adjacent elements may not both be gradient-free solid blocks — the rule forces the spectrum to stay present across the whole page.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#0a0a1f`
- violet: `#a855f7`
- magenta: `#ff0080`
- cyan: `#00d4ff`
- gold: `#ffd700`

EXAMPLE COMPONENT PROMPTS:

1. Build a holographic button: background linear-gradient(90deg, #a855f7, #ff0080, #00d4ff), background-size 200% auto, white 15px/700 text, 999px radius, padding 12px 28px, box-shadow 0 0 32px rgba(255,0,128,0.3). On hover background-position slides from left to right, transition 1.2s ease; on active scale(0.98). Page ground #0a0a1f. No two adjacent gradient-free solid blocks allowed.
