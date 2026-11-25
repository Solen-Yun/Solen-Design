# Dopamine Design — Style Reference

> Saturated clashes plus big round type: an interface that looks like it's grinning.

**Theme:** light

Dopamine design aims for emotional impact: pink, violet, yellow and blue sit side by side at full saturation, headings push to 5xl–7xl at weight 900, buttons are fully rounded with colored shadows, and cards use two-color gradients — everything round, everything big, everything bright. Its rules are mostly prohibitions: no large areas of grey, no low-saturation macaron pastels, no serious corporate typography, no serif faces. Emoji and playful icons are allowed, though banned in other styles — here they are part of the tone.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Hot Pink | `#ff006e` | `--color-hot-pink` | First primary and the main button. The style's strongest emotional signal. |
| Electric Violet | `#8338ec` | `--color-electric-violet` | Second primary, forming gradients and clashes with hot pink. |
| Sunny Yellow | `#ffbe0b` | `--color-sunny-yellow` | Highlights and badges, for information that must pop. |
| Vivid Blue | `#3a86ff` | `--color-vivid-blue` | Third clash and link color, the coolest of the set. |
| Mint | `#06d6a0` | `--color-mint` | Success and "done" states, small in area. |
| Tangerine | `#fb5607` | `--color-tangerine` | The hottest of the set, for emphasis and countdowns. |

## Typography

### Inter — the only sans, weights 700 and 900. Headings 44 to 64px with tightened tracking; the block must be heavy enough to land.

- **Substitute:** 'Segoe UI', system-ui, sans-serif
- **Weights:** 700, 900
- **Sizes:** 15, 18, 22, 30, 44, 64
- **Line height:** 1.02 (display), 1.1 (headings), 1.5 (body)
- **Letter spacing:** -0.03em on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 64px | 1.02 | -0.03em | `--text-display` |
| heading-lg | — | 900 | 44px | 1.05 | -0.02em | `--text-heading-lg` |
| heading | — | 900 | 30px | 1.15 | — | `--text-heading` |
| subheading | — | 700 | 22px | 1.25 | — | `--text-subheading` |
| body-lg | — | 700 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 700 | 15px | 1.5 | — | `--text-body` |

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
| cards | 24px |
| buttons | 999px |
| inputs | 16px |
| badges | 999px |

- **Page max-width:** 1160px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 20px

## Components

### Dopamine Button

**Role:** the primary action button

Hot-pink fill, white text, fully rounded 999px, no stroke, 18px/700, padding 16px 32px, colored shadow 0 8px 30px pink 40%. On hover the shadow widens to 40px and deepens to 60%, the button scales 1.05 and lifts 2px; on press it shrinks to 0.95. Transition 200ms.

- **Sizes:** padding 16px 32px; label 18px
- **States:** hover: scale 1.05, deeper pink shadow; active: scale 0.95

### Gradient Card

**Role:** content and feature cards

A diagonal gradient from electric violet to vivid blue, 24px radius, no stroke, 32px padding, shadow 0 16px 50px violet 35%. The top left holds a fully-rounded white 20% label (14px/600) with slight blur. On hover the shadow widens to 60px and the card scales 1.02.

### Bold Input

**Role:** inputs

White ground, 16px radius, 2px electric-violet 20% stroke, padding 14px 20px, 15px/700 text. The label sits 8px above in violet 15px/700. On focus the stroke turns hot pink with a 4px hot-pink 15% outer ring.

### Emoji Badge

**Role:** badges with emoji

Sunny yellow or mint fill, fully rounded 999px, no stroke, 14px/700, padding 6px 14px, with a 16px emoji or playful icon in front. This is the only place in the style where emoji are allowed.

### Blob Shape

**Role:** decorative color blocks

An irregular circle (border-radius values like 60% 40% 55% 45%), 120 to 320px, filled with one saturated color at 20% opacity, absolutely positioned at a section corner, allowed to overflow. At most three per screen.

## Do's and Don'ts

### Do

- Set saturated colors side by side
- Push headings to large sizes at weight 900
- Fully round buttons with colored shadows
- Use two-color gradients on cards
- Allow emoji and playful icons
- Animate 200ms with a 1.05 scale

### Don't

- Don't use large areas of grey
- Don't use low-saturation macaron pastels
- Don't do serious corporate typography
- Don't use serif faces
- Don't use sharp right angles
- Don't put more than five clashes on one screen

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | Page ground |
| 1 | Pink Wash | `rgba(255,0,110,0.08)` | Section grounds |
| 2 | Gradient Card | `linear-gradient violet→blue` | Cards |

## Elevation

- **Pink lift:** `0 8px 30px rgba(255,0,110,0.40)`
- **Pink lift hover:** `0 12px 40px rgba(255,0,110,0.60)`
- **Violet lift:** `0 16px 50px rgba(131,56,236,0.35)`

## Imagery

High-saturation illustration, geometric figures, 3D-rendered candy-colored objects. Emoji are allowed as visual elements. No low-saturation photography, serious corporate shots or grey-toned illustration.

## Layout

Capped at 1160px with 24px container padding and 96px section gaps. Decorative blocks may overflow and rotate in bulk. Elements sit at least 20px apart; whitespace is moderate — dopamine works through color, not emptiness.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#ffffff`
- pink: `#ff006e`
- violet: `#8338ec`
- yellow: `#ffbe0b`
- blue: `#3a86ff`

EXAMPLE COMPONENT PROMPTS:

1. Build a dopamine-style button: background #ff006e, white text, 18px/700, fully rounded 999px, padding 16px 32px, box-shadow 0 8px 30px rgba(255,0,110,0.4). On hover the shadow widens to 0 12px 40px rgba(255,0,110,0.6) with scale(1.05) and translateY(-2px); on active scale(0.95), transition 200ms. A 240px irregular blob may sit in the corner (border-radius 60% 40% 55% 45%), filled #ffbe0b at 20% opacity. Page ground #ffffff.
