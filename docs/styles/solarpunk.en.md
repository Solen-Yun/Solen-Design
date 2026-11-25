# Solarpunk — Style Reference

> An optimistic ecological future: plants and technology don't oppose — they grow together.

**Theme:** light

Solarpunk is the affirmative answer to cyberpunk: no neon wasteland, but sunlight, plants and technology that lives with us. Visually it rests on three things — a warm light ground (#fef3c7 or mint-tinted white), the leaf-green and gold pair as primaries, and large radii with organic curves (no edge is completely straight). Gradients are legal here, and they must run warm, from green to gold. It bans pure-black backgrounds, sharp right angles, cold industrial elements and neon glow, along with any wasteland or dystopian hint.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Leaf | `#4ade80` | `--color-leaf` | Primary: growth, action and plant elements. The style's optimism comes from it. |
| Golden | `#fbbf24` | `--color-golden` | Sunlight and energy, almost always beside leaf green, forming the warm gradient. |
| Cream Light | `#fef3c7` | `--color-cream-light` | Page ground. A warm golden light base that softens greens and blues. |
| Sky | `#38bdf8` | `--color-sky` | Water and clean energy, for data and secondary elements. |
| Ochre | `#a16207` | `--color-ochre` | Text and strokes. Deep ochre replaces black, avoiding any coldness. |
| Lavender | `#b692ff` | `--color-lavender` | Technology and community semantics, least frequent, distinguishing mechanical parts. |

## Typography

### Nunito — the only typeface. Rounded sans letterforms share a source with the organic curves; line height 1.7 keeps long text readable.

- **Substitute:** 'Segoe UI', 'PingFang SC', system-ui, sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 13, 15, 18, 24, 32, 44
- **Line height:** 1.2 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** -0.01em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 44px | 1.2 | -0.01em | `--text-display` |
| heading | — | 700 | 32px | 1.3 | — | `--text-heading` |
| subheading | — | 600 | 24px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.65 | — | `--text-body-lg` |
| body | — | 400 | 15px | 1.7 | — | `--text-body` |
| label | — | 600 | 13px | 1.45 | 0.04em | `--text-label` |

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
| cards | 24px |
| buttons | 999px |
| inputs | 16px |
| media | 32px |

- **Page max-width:** 1160px
- **Section gap:** 112px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Sun Button

**Role:** the primary action button

A leaf-to-gold gradient at 135 degrees, white text, fully rounded 999px, no stroke, 15px/700, padding 12px 28px, shadow 0 8px 20px gold 30%. On hover the gradient angle turns to 180 degrees (simulating moving light), the shadow widens to 28px and the button lifts 2px; on press it scales 0.98. Transition 300ms ease-out.

- **Sizes:** padding 12px 28px; label 15px
- **States:** hover: gradient rotates, lift 2px; active: scale 0.98

### Organic Card

**Role:** content and project cards

Mint-white fill, 24px radius, 1px leaf 15% stroke, 28px padding, shadow 0 12px 32px leaf 18%. The top-left carries a 48px circular icon ground (leaf 12%). On hover it lifts 4px and the shadow widens to 48px. Asymmetric radii are allowed (24px mixed with 32px) but must stay consistent within one card.

### Soft Input

**Role:** form inputs

Mint-white fill, 16px radius, 1px leaf 20% stroke, padding 12px 18px, 15px text; on focus the stroke turns leaf and a 4px leaf 20% outer ring appears. Placeholder ochre 45%.

### Plant Motif

**Role:** plant and organic ornaments

Single-stroke plant figures (vines, leaves, hybrid leaf-solar-panel shapes), 2px stroke in leaf or ochre, 64px to 160px. They may wind along card edges or between sections, overflowing the container by up to 16px. At most three per screen.

### Warm Gradient Band

**Role:** gradient bands and separation

A leaf-to-gold gradient at 120 degrees, 120px to 200px tall, 32px radius or full-width without radius. It bridges sections, replacing whitespace. An 8% leaf-vein texture may layer on top.

## Do's and Don'ts

### Do

- Ground warm and light — never black or dark
- Pair leaf green with gold in warm gradients
- Use large radii and organic curves
- Place plants beside technology
- Set text in deep ochre instead of black
- Give shadows a green cast, not grey

### Don't

- Don't use pure black or dark themes
- Don't use sharp right angles
- Don't use cold industrial elements
- Don't use high-contrast neon glow
- Don't include wasteland or dystopian imagery
- Don't use gloomy, oppressive palettes

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream Light | `#fef3c7` | Page ground |
| 1 | Mint White | `#f0fdf4` | Cards and sections |
| 2 | Leaf Wash | `rgba(74,222,128,0.12)` | Highlighted sections |

## Elevation

- **Card:** `0 12px 32px rgba(74,222,128,0.18)`
- **Card hover:** `0 20px 48px rgba(74,222,128,0.26)`
- **Button:** `0 8px 20px rgba(251,191,36,0.30)`

## Imagery

Mixed plant-and-technology illustration: solar panels grown into leaf shapes, rooftop gardens, vines wrapping structures. Natural-light photography with a warm grade is allowed. No cold industrial photography, wasteland scenes or neon effects.

## Layout

Capped at 1160px with 24px container padding and 112px section gaps. Asymmetry and curved edges are allowed (section bottoms may be cut in arcs), elements arranged along gentle curves. Cards sit 20px apart; overall density medium-loose.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#a16207`
- background: `#fef3c7`
- card: `#f0fdf4`
- leaf: `#4ade80`
- golden: `#fbbf24`
- sky: `#38bdf8`

EXAMPLE COMPONENT PROMPTS:

1. Build a solarpunk card: background #f0fdf4, 24px radius, 1px rgba(74,222,128,0.15) stroke, 28px padding, shadow 0 12px 32px rgba(74,222,128,0.18). Top-left carries a 48px circular icon ground (rgba(74,222,128,0.12)). Title 24px/600 #a16207, body 15px/400 at line height 1.7. The primary button uses linear-gradient(135deg, #4ade80, #fbbf24), 999px radius, white text, shadow 0 8px 20px rgba(251,191,36,0.3). Page ground #fef3c7.
