# Cyberpunk Neon — Style Reference

> Neon tubes on a near-black ground: only glow, no shadows.

**Theme:** dark

Cyberpunk neon's first rule is "no ordinary shadows" — all depth is expressed as glow, replacing drop shadows with 0 0 20px colored halos. The base is near-black (#0a0a0f) with 4px scanlines layered on top, hinting at a CRT. Colors are highly saturated cyan, magenta, yellow and green, with cyan as the primary (the interface skeleton) and magenta as the adversarial accent. Radii must stay small (8px at most), because neon tubes are hard. Type is monospace in all caps, like terminal output.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Near Black | `#0a0a0f` | `--color-near-black` | Page base. A slightly blue-tinted deep black, so cyan light reads as glowing rather than grey. |
| Neon Cyan | `#00ffff` | `--color-neon-cyan` | Primary: borders, primary buttons and glowing headings. The interface skeleton is drawn entirely with it. |
| Neon Magenta | `#ff00ff` | `--color-neon-magenta` | Adversarial accent: danger, hostility and the second tier. Forms the classic counterpoint to cyan. |
| Neon Yellow | `#ffff00` | `--color-neon-yellow` | Warnings and data highlights, for information that must cut through the dark. |
| Neon Green | `#00ff00` | `--color-neon-green` | Terminal success output and online status, like an old phosphor screen. |
| Alarm Red | `#ff0506` | `--color-alarm-red` | Errors and overload; the only warm color permitted. |

## Typography

### JetBrains Mono — the only font on the site, all caps with wide tracking. Monospace is the first signal that "this is a machine interface".

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 12, 14, 18, 24, 40
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** 0.05em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 40px | 1.1 | 0.05em | `--text-display` |
| heading | — | 700 | 24px | 1.2 | 0.05em | `--text-heading` |
| subheading | — | 400 | 18px | 1.3 | 0.05em | `--text-subheading` |
| body | — | 400 | 14px | 1.6 | 0.02em | `--text-body` |
| body-sm | — | 400 | 12px | 1.55 | — | `--text-body-sm` |
| label | — | 700 | 11px | 1.4 | 0.14em | `--text-label` |

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
| panels | 8px |

- **Page max-width:** 1280px
- **Section gap:** 64px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Neon Button

**Role:** primary action button

Transparent ground, 2px neon-cyan border, 2px radius, no shadow block. 12px type, weight 700, uppercase, 0.14em tracking, padding 10px 24px, text in neon cyan. At rest it carries a 0 0 12px cyan glow. On hover the fill rises to cyan 12% and the glow widens to 24px; on press the glow contracts to 6px and the fill climbs to 20%. Transition 150ms.

- **Sizes:** padding 10px 24px; label 12px
- **States:** hover: fill 12%, glow 24px; active: glow 6px, fill 20%

### Data Panel

**Role:** cards and data panels

Cyan 4% fill, 1px cyan 30% border, 4px radius, 20px padding, no shadow. The title is 18px cyan with a 0 0 8px text glow; body copy is 14px white 70%. An 8px square notch may be cut from the top-left corner (clip-path) for a hardware feel. On hover the border rises to 60%, the fill to 8%, with a 0 0 16px glow.

- **States:** hover: border 60%, fill 8%, glow 16px

### Terminal Input

**Role:** inputs and command lines

Near-black ground, 1px cyan 40% border, 2px radius, padding 8px 12px, 14px monospace. A blinking cyan block cursor sits on the left (1 Hz, steps easing). On focus the border rises to 100% and gains a 0 0 12px glow.

### Scanline Overlay

**Role:** full-screen CRT texture

A fixed overlay: repeating-linear-gradient drawing a 1px cyan 4% horizontal line every 4px, with pointer-events: none. It may sit above or below the content in z-index, but must never block clicks. The whole overlay runs at 60% opacity.

### Glitch Heading

**Role:** glitch-effect headings

The heading text is cyan, layered with two pseudo-element copies: one offset -2px in red, one offset 2px in cyan, blend mode screen, 70% opacity. It jitters for 60ms only on hover or once every 6 seconds; otherwise it holds still.

## Do's and Don'ts

### Do

- Express depth as glow; ban ordinary shadows
- Use a near-black base, not pure black
- Keep radii at 8px or under
- Cyan leads, magenta opposes
- Layer 4px scanlines on top
- Set everything in wide-tracked uppercase monospace

### Don't

- Don't use light or white backgrounds
- Don't use desaturated colors
- Don't use ordinary drop shadows (shadow-md and the like)
- Don't use warm colors except alarm red
- Don't use large radii
- Don't soften the design language

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Near Black | `#0a0a0f` | Page base |
| 1 | Panel | `rgba(0,255,255,0.04)` | Cards and panels (cyan-tinted) |
| 2 | Scanline Overlay | `repeating-linear-gradient(0deg, rgba(0,255,255,0.04) 0 1px, transparent 1px 4px)` | Full-screen scanlines |

## Elevation

- **Cyan glow:** `0 0 20px rgba(0,255,255,0.50)`
- **Magenta glow:** `0 0 20px rgba(255,0,255,0.45)`
- **Text glow:** `0 0 8px rgba(0,255,255,0.60)`

## Imagery

Night cities, circuit textures, scanlines and holograms. Photos may be crushed into high-contrast duotones and layered under a cyan glow. No daylight photography, no soft gradients, no warm illustrations.

## Layout

Capped at 1280px, container padding 16px, section gap 64px. Full-width data bars and border grids are allowed: 1px cyan 20% lines cut the page into dashboard-like zones. Density approaches a HUD — information may crowd, but every item needs a glow tier.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#e0ffff`
- background: `#0a0a0f`
- cyan: `#00ffff`
- magenta: `#ff00ff`
- yellow: `#ffff00`
- border: `rgba(0,255,255,0.30)`

EXAMPLE COMPONENT PROMPTS:

1. Build a neon button: transparent ground, 2px solid #00ffff border, border-radius 2px, 12px 700 uppercase 0.14em tracking, padding 10px 24px, text #00ffff, box-shadow 0 0 12px rgba(0,255,255,0.5). On hover the background becomes rgba(0,255,255,0.12) and the shadow widens to 0 0 24px rgba(0,255,255,0.5); on active the shadow contracts to 0 0 6px. Page base #0a0a0f, optionally layered with 4px-interval cyan 4% scanlines.
2. Build a data panel: cyan 4% fill, 1px cyan 30% border, 4px radius, 20px padding, no shadow. Title 18px cyan with a 0 0 8px text glow, body 14px white 70%. Cut an 8px square notch from the top-left corner with clip-path. On hover the border rises to 60%, the fill to 8%, and a 0 0 16px glow appears.
