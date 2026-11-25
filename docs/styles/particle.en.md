# Particle — Style Reference

> Points and connecting lines drifting through deep space: data is flowing, the interface is only glass.

**Theme:** dark

The particle system expresses "data flowing" with a layer of drifting dots and connection lines: a blue-black ground (#0a0e1a), cool accent colors (blue, teal, violet), particles linked by a distance threshold, brightening into pulses as they approach. The interface itself recedes behind glass cards — translucent white with backdrop blur, letting particles show through. Its bans are specific: no warm or earthy colors, no thick borders, no patterns competing with the particle animation, no conventional shadows (shadows become glows). The particle layer must respect reduced-motion and pause when off-screen.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Blue Black | `#0a0e1a` | `--color-blue-black` | Page ground. Slightly blue, giving particles and lines depth in the dark. |
| Ink Teal | `#0f1419` | `--color-ink-teal` | Secondary sections and glass-card backing, one step deeper than the ground. |
| Mist | `#e0e8ff` | `--color-mist` | Primary text and the brightest particles. A blue-tinged near-white. |
| Data Blue | `#64c8ff` | `--color-data-blue` | Connection lines and particle primary — the visual body of "data flowing". |
| Pulse Teal | `#64ffc8` | `--color-pulse-teal` | Pulses and "hit" feedback, one step brighter than data blue. |
| Nebula Violet | `#a78bfa` | `--color-nebula-violet` | Far-layer particles and secondary accents, creating depth. |

## Typography

### Inter — the only typeface. Interface text stays restrained, because the particle layer is the visual body.

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 14, 17, 24, 36, 48
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 48px | 1.1 | -0.02em | `--text-display` |
| heading | — | 600 | 36px | 1.2 | — | `--text-heading` |
| subheading | — | 500 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 17px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.14em | `--text-label` |

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
| cards | 16px |
| buttons | 12px |
| inputs | 12px |
| particles | 999px |

- **Page max-width:** 1200px
- **Section gap:** 112px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Particle Canvas

**Role:** the particle layer (signature component)

A full-frame canvas fixed behind content and above the page ground. Particle count scales by area (one per 10000px², capped at 120), radius 1 to 3px, colored data blue or nebula violet with an 8px halo. Two particles connect with a 1px line when closer than 140px, opacity decaying linearly with distance. Particles near the pointer drift gently outward within a 200px radius. All drawing happens inside requestAnimationFrame; an IntersectionObserver pauses it off-screen, and prefers-reduced-motion renders a single static frame.

- **Sizes:** density 1 / 10000px², max 120

### Glass Card

**Role:** content cards and data panels

Mist-white 6% fill, 16px radius, 1px mist-white 12% stroke, 24px padding, 20px backdrop blur, outer glow 0 0 40px data blue 25% — conventional shadows are never used. Title 24px/600 mist white, body 14px mist white 70%. On hover the fill rises to 10% and the glow widens to 60px.

### Glow Button

**Role:** the primary action button

Data-blue 12% fill, 1px data-blue 40% stroke, 12px radius, mist-white text 15px/500, padding 12px 24px, outer glow 0 0 24px data blue 30%. On hover the fill rises to 20%, the glow widens to 40px and the text turns pure white. Transition 200ms.

- **States:** hover: fill 20%, glow 40px

### Pulse Ring

**Role:** pulse indicators and selection feedback

From the element's center, a 1px pulse-teal ring expands: radius from 8px to 48px, opacity from 100% to 0, over 1.2s ease-out, looping or firing once on click. At most three pulses at once per screen.

### Nebula Field

**Role:** the far-layer nebula backdrop

Behind the particle layer, one more layer of radial gradients (a nebula-violet 8% mass and a data-blue 6% mass, blurred 120px), positioned randomly but fixed at first render, unmoving on scroll. It provides depth without competing with the particles' motion.

## Do's and Don'ts

### Do

- Ground in blue-black with cool accents
- Pause the particle layer off-screen
- Decay line opacity with distance
- Build depth with glows, not conventional shadows
- Press content onto glass cards
- Respect reduced-motion

### Don't

- Don't lead with warm or earthy colors
- Don't use thick borders
- Don't add patterns competing with the particles
- Don't use light backgrounds
- Don't use conventional shadows
- Don't pulse more than three at once

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Blue Black | `#0a0e1a` | Page ground |
| 1 | Glass | `rgba(224,232,255,0.06)` | Cards and panels |
| 2 | Glass Raised | `rgba(224,232,255,0.10)` | Hover and overlays |

## Elevation

- **Glow:** `0 0 40px rgba(100,200,255,0.25)`
- **Glow strong:** `0 0 60px rgba(100,200,255,0.40)`
- **Never:** `conventional box shadows are forbidden`

## Imagery

The particle layer is the imagery — no photography or illustration. Data visualization (network graphs, flow diagrams) may live inside cards. No static background images or geometric ornament; they compete with the particles for attention.

## Layout

Capped at 1200px with 24px container padding and 112px section gaps. All content presses onto glass cards, with 64px between cards to expose the particle layer. The hero usually holds text left with space right, letting particles flow through the emptiness.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#e0e8ff`
- background: `#0a0e1a`
- glass: `rgba(224,232,255,0.06)`
- blue: `#64c8ff`
- teal: `#64ffc8`
- violet: `#a78bfa`

EXAMPLE COMPONENT PROMPTS:

1. Build a particle-system hero: page ground #0a0e1a with a full-frame canvas behind content drawing drifting particles (radius 1–3px, color #64c8ff with an 8px halo), 1px lines connecting particles closer than 140px with opacity decaying by distance, drawn in requestAnimationFrame, paused off-screen, and rendering a single static frame under reduced-motion. Above it a glass card: rgba(224,232,255,0.06) fill, 16px radius, 1px rgba(224,232,255,0.12) stroke, 24px blur, 24px padding, box-shadow 0 0 40px rgba(100,200,255,0.25).
