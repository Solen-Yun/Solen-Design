# Neon Gradient — Style Reference

> Gradient cards glowing at their edges over a deep-violet ground.

**Theme:** dark

Neon gradient is the most common visual of recent SaaS and young brands: on a deep violet-black ground (#0f0a1e) sit gradient-filled cards (violet-to-pink, cyan-to-lime diagonal gradients) with 16 to 24px radii and bold colored strokes, edges glowing in the same hue; titles may be pure white or gradient text; buttons are gradients with outer glow. The rule is "a gradient must have two clear poles" — from one saturated color to another, never a muddy three-plus color blend; and the glow must share the gradient's hue, or it turns dirty.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Violet Ground | `#0f0a1e` | `--color-deep-violet` | Page ground. Purple-leaning near-black that makes every gradient brighter. |
| Violet | `#a855f7` | `--color-violet` | The first pole of the gradient and the primary button's start. |
| Pink | `#f472b6` | `--color-pink` | The second pole, always paired with violet. |
| Cyan | `#22d3ee` | `--color-cyan` | The cool pole of the second gradient pair, for data and tech semantics. |
| Lime | `#a3e635` | `--color-lime` | The warm pole of the second pair and success states. |
| Amber | `#fbbf24` | `--color-amber` | The third gradient and badge highlights. |

## Typography

### Inter — the only typeface. Titles 34 to 48px with tight tracking, may use gradient text.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 12, 14, 17, 24, 34, 48
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 48px | 1.1 | -0.02em | `--text-display` |
| heading | — | 700 | 34px | 1.15 | -0.02em | `--text-heading` |
| subheading | — | 600 | 24px | 1.25 | — | `--text-subheading` |
| body-lg | — | 400 | 17px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 600 | 12px | 1.45 | 0.1em | `--text-label` |

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
| buttons | 16px |
| inputs | 16px |
| pills | 999px |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Gradient Card

**Role:** the gradient card (core component)

A 135-degree two-pole gradient fill (violet to pink, or cyan to lime), 24px radius, 1px white 20% stroke, 28px padding, outer glow 0 0 32px violet 45% — the glow takes the gradient's dominant pole. Title pure white 34px/700, body white 85%. On hover the gradient rotates to 180 degrees and the glow widens to 40px.

- **States:** hover: gradient rotates, glow 40px

### Gradient Button

**Role:** the primary action button

A horizontal violet-to-pink gradient, white text, 16px radius, no stroke, 17px/600, padding 12px 28px, outer glow 0 8px 32px violet 50%. On hover the gradient slides horizontally (background-position from left to right) and the glow widens to 40px; on press it scales 0.98. The gradient must set background-size: 200% to have room to move.

- **Sizes:** padding 12px 28px; label 17px
- **States:** hover: gradient slides, glow 40px; active: scale 0.98

### Gradient Text

**Role:** gradient headlines

background: linear-gradient(90deg, violet, pink) with background-clip: text and color: transparent. Reserved for the hero and key section titles — at most two per page, or the page loses its focal point. Never for body text.

### Glow Border

**Role:** the glowing stroke

A 1px gradient stroke (built from a 1px-padded gradient layer over an inner dark core) with a same-hue 0 0 24px glow. Used for secondary cards and inputs in place of solid strokes. The stroke hue must belong to the card's gradient family.

### Sparkle Badge

**Role:** badges and icon grounds

A fully rounded (999px) or 12px-radius chip filled with a gradient or a 20% gradient wash, holding a 16 to 20px line icon (star, rocket, spark). Icons stay white — colored icons over colored gradients blur.

## Do's and Don'ts

### Do

- Give every gradient two saturated poles
- Match glow color to gradient color
- Round cards 24px, buttons 16px
- Cap gradient text at two uses
- Set button gradients to background-size 200%
- Limit gradients to three sets per screen

### Don't

- Don't blend three or more colors muddily
- Don't mismatch glow and gradient hues
- Don't set body text in gradients
- Don't stack colored icons on colored gradients
- Don't compete with photography for brightness
- Don't use sharp angles

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Violet | `#0f0a1e` | Page ground |
| 1 | Violet→Pink | `linear-gradient(135deg, #a855f7, #f472b6)` | Card gradient |
| 2 | Cyan→Lime | `linear-gradient(135deg, #22d3ee, #a3e635)` | Second gradient set |

## Elevation

- **Violet glow:** `0 0 32px rgba(168,85,247,0.45)`
- **Pink glow:** `0 0 40px rgba(244,114,182,0.40)`
- **Button glow:** `0 8px 32px rgba(168,85,247,0.50)`

## Imagery

Gradients, abstract shapes and icons dominate. Product screenshots may sit inside gradient cards. No realistic photography, grayscale images or soft illustration — they fight the gradients for brightness.

## Layout

Capped at 1200px with 24px container padding and 96px section gaps. Cards may vary in size (1×1 and 2×1), but one screen holds no more than three gradient sets. The page keeps its deep-violet ground with enough dark area between glowing blocks — otherwise the glows pollute each other.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#0f0a1e`
- violet: `#a855f7`
- pink: `#f472b6`
- cyan: `#22d3ee`
- lime: `#a3e635`

EXAMPLE COMPONENT PROMPTS:

1. Build a neon-gradient card: background linear-gradient(135deg, #a855f7, #f472b6), 24px radius, 1px rgba(255,255,255,0.2) stroke, 28px padding, box-shadow 0 0 32px rgba(168,85,247,0.45). Title 34px/700 pure white, body 14px rgba(255,255,255,0.85). The button runs a horizontal violet-to-pink gradient with background-size 200%, 16px radius, white 17px/600 text, padding 12px 28px, box-shadow 0 8px 32px rgba(168,85,247,0.5); on hover background-position slides from left to right and the glow widens to 40px. Page ground #0f0a1e, no more than three gradient sets per screen.
