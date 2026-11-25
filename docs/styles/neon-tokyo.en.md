# Neon Tokyo — Style Reference

> Kabukichō after the rain: signs stacked layer on layer, light pooling on wet asphalt.

**Theme:** dark

Neon Tokyo differs from cyberpunk neon in being a "real city" rather than science fiction: it simulates the Kabukichō night, with signs stacked layer on layer, alternating multi-color neon borders, layered halos and wet-asphalt reflections. The ground runs from deep night blue-black (#0a0a1a) to purple-black, the primary is neon pink (#ff1493), supported by cyan (#00f0ff), orange (#ff6b00) and violet (#bc13fe). Cards use 80% translucency plus deep blur to fake glass reflections, bold sans with Japanese kana as decorative elements, and headings may run a pink-to-cyan gradient.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Neon Pink | `#ff1493` | `--color-neon-pink` | Primary: signs, main buttons and the strongest glow. |
| Night Blue Black | `#0a0a1a` | `--color-night-blue` | Page ground. A night sky with no stars after rain. |
| Neon Cyan | `#00f0ff` | `--color-neon-cyan` | Second neon: data, links and the cool-side light. |
| Neon Orange | `#ff6b00` | `--color-neon-orange` | Third neon, imitating warm signs and lanterns. |
| Neon Violet | `#bc13fe` | `--color-neon-violet` | Fourth neon, used to break the sign layers' color unity. |
| Pale Blue | `#97b6ff` | `--color-pale-blue` | Text reflections and secondary highlights, the softest of the set. |

## Typography

### Inter — bold sans, headings at 900 with tightened tracking. Mixes with Japanese kana, which serve as decoration.

- **Substitute:** 'Hiragino Sans', 'Yu Gothic', system-ui, sans-serif
- **Weights:** 700, 900
- **Sizes:** 12, 15, 20, 28, 38, 54
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.16em on uppercase labels

### JetBrains Mono — data and coordinates, the cyber-side face.

- **Substitute:** ui-monospace, monospace
- **Weights:** 400
- **Sizes:** 11, 13
- **Line height:** 1.5 (display), 1.5 (headings), 1.6 (body)
- **Letter spacing:** 0.1em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Inter | 900 | 54px | 1.1 | -0.02em | `--text-display` |
| heading | Inter | 900 | 38px | 1.15 | -0.02em | `--text-heading` |
| subheading | Inter | 700 | 28px | 1.25 | — | `--text-subheading` |
| body-lg | Inter | 700 | 15px | 1.55 | — | `--text-body-lg` |
| body | Inter | 700 | 13px | 1.6 | — | `--text-body` |
| label | JetBrains Mono | 400 | 11px | 1.5 | 0.16em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** compact

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
| cards | 8px |
| buttons | 4px |
| signs | 2px |

- **Page max-width:** 1240px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Sign Card

**Role:** the sign card (core component)

Deep night blue-black 80% fill, 8px blur, 8px radius, 1px neon-pink 50% stroke, 24px padding, multi-layer halo (pink 12px, pink 28px). Title 38px/900 neon pink with a 0 0 10px pink 60% text glow; body 13px white 80%. On hover the stroke turns cyan and the halo becomes a mix (pink plus cyan plus violet).

- **States:** hover: cyan border, mixed glow

### Gradient Headline

**Role:** the gradient headline

A horizontal pink-to-cyan gradient with background-clip: text and transparent text color, plus a 0 0 10px pink 40% text glow (using filter: drop-shadow rather than text-shadow, because the text is transparent). Only for the hero headline, at most one per page.

### Sign Stack

**Role:** the stacked signs

Three to five narrow signs (each 120 to 200px wide, 40 to 64px tall) stacked vertically, each in a different ground (pink, cyan, orange or violet), 2px radius, different halos, and a -4px negative margin between them so they crowd together. Each holds a short string of 12px uppercase text. It imitates a Kabukichō sign wall.

### Wet Reflection

**Role:** the wet reflection

At a section's bottom, a 60 to 120px band repeats the neon color above vertically flipped, blurred and faint (transform: scaleY(-1) plus 8px blur and a linear-gradient mask fading out), at 10% to 20% opacity. It makes the page look freshly rained on.

### Neon Button

**Role:** action buttons

Transparent ground, 1px neon-pink 60% stroke, 4px radius, 11px monospace uppercase 0.16em, padding 10px 24px, halo 0 0 12px pink 60%. On hover the fill takes pink 12%, the stroke reaches 100% and the halo widens to 28px; on press it shifts 1px with the halo contracting to 6px. Transition 120ms linear.

- **Sizes:** padding 10px 24px; label 11px
- **States:** hover: fill 12%, glow 28px; active: translate 1px

## Do's and Don'ts

### Do

- Ground in a night blue-black to purple-black gradient
- Alternate multi-color neon borders
- Stack glow layers
- Use the sign stack to build a sign wall
- Make cards 80% translucent with deep blur
- Reflect on wet asphalt

### Don't

- Don't use daytime photography or natural landscapes
- Don't use large radii
- Don't use soft illustration
- Don't rely on a single neon color
- Don't let the halo bury the text
- Don't build science-fiction UI elements

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Night Gradient | `linear-gradient(#0a0a1a, #12041e)` | Page ground |
| 1 | Glass Sign | `rgba(10,10,26,0.80)` | Cards and signs |
| 2 | Wet Reflection | `rgba(255,20,147,0.10)` | The reflection layer |

## Elevation

- **Sign glow:** `0 0 12px rgba(255,20,147,0.60), 0 0 28px rgba(255,20,147,0.30)`
- **Cyan glow:** `0 0 12px rgba(0,240,255,0.60), 0 0 28px rgba(0,240,255,0.30)`
- **Mixed glow:** `0 0 16px rgba(255,20,147,0.50), 0 0 32px rgba(0,240,255,0.30), 0 0 48px rgba(188,19,254,0.20)`

## Imagery

City night photography: signs, alleys, wet pavement, vending machines, neon reflections. Must be high contrast with multi-color light sources. Photos may be pressed into a pink-and-cyan duotone. No daytime photography, natural landscapes or soft illustration.

## Layout

Capped at 1240px with 16px container padding and 64px section gaps. Sign stacks and element overlap are allowed; radii stay small (2 to 8px). The page stays dark throughout, with neon lighting only where it must be seen.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#0a0a1a`
- pink: `#ff1493`
- cyan: `#00f0ff`
- orange: `#ff6b00`
- violet: `#bc13fe`

EXAMPLE COMPONENT PROMPTS:

1. Build a neon-Tokyo sign card: background rgba(10,10,26,0.8) with 8px blur, 8px radius, 1px rgba(255,20,147,0.5) stroke, 24px padding, layered glow 0 0 12px rgba(255,20,147,0.6), 0 0 28px rgba(255,20,147,0.3). Title 38px/900 in #ff1493 with text-shadow 0 0 10px rgba(255,20,147,0.6); body 13px in rgba(255,255,255,0.8). Beside it, stack 4 narrow signs (each 160×48px, 2px radius, -4px negative margin, filled #ff1493 / #00f0ff / #ff6b00 / #bc13fe, each with its own halo). A 80px wet-reflection band sits at the section's bottom (the content above scaled -1 on Y with 8px blur at 15% opacity behind a gradient mask). Page ground linear-gradient(#0a0a1a, #12041e).
