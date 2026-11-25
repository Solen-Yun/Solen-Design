# Cyber Anime — Style Reference

> A cockpit HUD fused with anime light effects: chamfered corners, hexagonal grids, triple-layer neon.

**Theme:** dark

Cyber anime merges the mecha-cockpit HUD with anime's light-effect language: main containers carry chamfered corner brackets (clip-path or assembled edge lines), the background uses a hexagonal grid rather than squares, neon stacks in multiple layers instead of a single glow, and micro-interactions feel like cockpit buttons — hover lifts fast, press compacts, the glow amplifies within 180 to 280ms. The bans are hard: no soft pastels or natural organic colors, no serif, no full rounding (every shape must carry an angle), no light primary background, no bouncy spring animation.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Violet Black | `#0f0f1a` | `--color-deep-violet-black` | Page base. Purple-leaning near-black, letting the neon and violet glow. |
| Frame Violet | `#7c3aed` | `--color-frame-violet` | Primary: borders, primary buttons and the cockpit frame. |
| Neon Teal | `#06d6a0` | `--color-neon-teal` | The first glow layer and "systems online" status. |
| Neon Pink | `#ff006e` | `--color-neon-pink` | The second glow layer, for alerts and high-energy states. |
| Electric Blue | `#38bdf8` | `--color-electric-blue` | Links and data highlights, a cool-warm bridge from teal. |
| Pale Blue | `#51b1ff` | `--color-pale-blue` | The third glow layer and text highlights; the brightest stop. |

## Typography

### Chakra Petch — geometric sans with a tech-chamfer feel. Uppercase with 0.16em tracking, like HUD labels.

- **Substitute:** 'Segoe UI', 'Arial Narrow', sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 11, 13, 15, 20, 28, 40
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** 0.04em on display, 0.16em on uppercase labels

### JetBrains Mono — values, coordinates and status codes. Cockpit readouts must be monospace.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 12, 14
- **Line height:** 1.4 (display), 1.4 (headings), 1.55 (body)
- **Letter spacing:** 0.04em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Chakra Petch | 700 | 40px | 1.15 | 0.04em | `--text-display` |
| heading | Chakra Petch | 700 | 28px | 1.2 | 0.04em | `--text-heading` |
| subheading | Chakra Petch | 600 | 20px | 1.3 | 0.04em | `--text-subheading` |
| body-lg | Chakra Petch | 400 | 15px | 1.55 | — | `--text-body-lg` |
| body | Chakra Petch | 400 | 13px | 1.6 | — | `--text-body` |
| label | JetBrains Mono | 400 | 11px | 1.4 | 0.16em | `--text-label` |

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
| dots | 999px |

- **Page max-width:** 1320px
- **Section gap:** 48px
- **Card padding:** 24px
- **Element gap:** 12px

## Components

### Bracket Panel

**Role:** the chamfered bracket panel (the core component)

Violet 8% fill, zero radius, 1px frame-violet 40% stroke, 24px padding. Each corner draws an L-shaped bracket with two pseudo-elements (2px frame violet, 16px long), and clip-path cuts 12px off the top-right and bottom-left. The outer glow stacks three layers: violet 12px, teal 24px 35%, pink 48px 20%. On hover the glow amplifies to 18/36/72px as the panel lifts 2px, over 220ms.

- **States:** hover: glow amplified, lift 2px

### HUD Button

**Role:** primary action button

Frame-violet fill, white text, zero radius, 1px pale-blue 30% stroke, clip-path cutting 10px off the top-left and bottom-right. 11px monospace uppercase at 0.16em, padding 12px 28px, triple glow. On hover the fill brightens to #8b4ff5 and the glow amplifies; on press it shifts 1px with the glow contracting to 8/16/28px. Transition 180ms.

- **States:** hover: brighter, amplified glow; active: translate 1px

### Hex Field

**Role:** the hexagonal background grid

Two repeating-linear-gradients rotated 60 degrees stack into a hexagonal grid, 1px lines in frame violet 8%, 32px cells. Fixed full-page coverage, pointer-events: none. It must run weaker than a square grid, or it would bury the content.

### Holo Projection

**Role:** the holo-projection panel

Cyan 8% fill, 1px cyan 30% stroke, zero radius, 16px blur, layered with 4px-interval cyan scanlines (8%), edges cut into a slight trapezoid by clip-path (4% narrower at top). For character and mech data, allowed a gentle 2px float (4s loop).

### Status Readout

**Role:** the status readout bar

28px tall, zero radius, 1px frame-violet 25% stroke; the left segment shows the label in monospace (11px uppercase), the middle a segmented bar (10 segments, 2px gaps), the right the value. Teal for normal, pink for warning, grey for offline. The segmented bar must fill in discrete cells, never a continuous gradient.

## Do's and Don'ts

### Do

- Add L-shaped brackets at all four corners plus chamfers
- Use a hexagonal grid, not squares
- Stack neon in three layers
- Keep micro-interactions at 180 to 280ms
- Ground on deep base with translucent panels
- Set type in geometric sans or monospace

### Don't

- Don't use soft pastels or natural colors
- Don't use serif faces
- Don't use full rounding
- Don't use a light primary background
- Don't use bouncy spring animation
- Don't mix two chamfer sizes

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Violet Black | `#0f0f1a` | Page base |
| 1 | Panel | `rgba(124,58,237,0.08)` | Panels (violet-tinted translucent) |
| 2 | Hex Grid | `hexagonal pattern` | The hex-grid layer |

## Elevation

- **Triple glow:** `0 0 12px #7c3aed, 0 0 24px rgba(6,214,160,0.35), 0 0 48px rgba(255,0,110,0.20)`
- **Amplified:** `0 0 18px #7c3aed, 0 0 36px rgba(6,214,160,0.45), 0 0 72px rgba(255,0,110,0.30)`

## Imagery

Neon silhouettes of anime characters and mechs, holograms, data visualization and HUD overlays. Character standees may be graded into duotones with glowing edges. No soft pastels, natural scenery or realistic portraits.

## Layout

Capped at 1320px with 16px container padding and 12px panel spacing — a dense cockpit. Panels may join with 1px lines. Chamfers are fixed at 10px or 12px; mixing sizes is an error.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#e8e6f5`
- background: `#0f0f1a`
- violet: `#7c3aed`
- teal: `#06d6a0`
- pink: `#ff006e`
- blue: `#38bdf8`

EXAMPLE COMPONENT PROMPTS:

1. Build a cyber-anime panel: background rgba(124,58,237,0.08), zero radius, 1px rgba(124,58,237,0.4) stroke, 24px padding, clip-path cutting 12px off the top-right and bottom-left, box-shadow 0 0 12px #7c3aed, 0 0 24px rgba(6,214,160,0.35), 0 0 48px rgba(255,0,110,0.2). Each corner carries a 16px L-shaped bracket in 2px frame violet. The whole page layers a 32px hexagonal grid (1px lines, rgba(124,58,237,0.08)). On hover the glow amplifies to 18/36/72px with translateY(-2px), transition 220ms. Page base #0f0f1a.
2. Build a status readout: 28px tall, 1px frame-violet 25% stroke, a monospace 11px uppercase label on the left, a 10-segment bar in the middle filling in discrete cells, the value on the right — teal normal, pink warning, grey offline.
