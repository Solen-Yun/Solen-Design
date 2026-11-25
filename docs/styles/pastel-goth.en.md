# Pastel Goth — Style Reference

> A skull growing in lavender frosting: a dark core, a soft surface.

**Theme:** dark

Pastel goth stitches dark aesthetics to candy colors: deep violet (#2d1b3d) and near-black (#1a1225) as grounds, lavender (#d4a5e3) and pastel blue (#7ec8c8) as primary text, blush pink (#f5a5b8) and periwinkle (#b8a5f5) as ornament. The graphic vocabulary is gothic (skulls, crosses, stars, bats) but rendered pastel, rounded and cute — the contrast is the whole point. Radii run 12 to 16px, "soft but not too cute"; borders are pastel at 30% translucency; headings may be bold but must be softened with pastel color.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Violet | `#2d1b3d` | `--color-deep-violet` | The main page ground. Just violet enough to be softer than black. |
| Near Black | `#1a1225` | `--color-near-black` | The deepest sections and card grounds. Black with violet in it. |
| Lavender | `#d4a5e3` | `--color-lavender` | Primary text and primary strokes. The style's identifying color. |
| Pastel Blue | `#7ec8c8` | `--color-pastel-blue` | Second text color and the cool-side accent. |
| Blush | `#f5a5b8` | `--color-blush` | Emotional accents and the "cute" side. |
| Periwinkle | `#b8a5f5` | `--color-periwinkle` | The third ornament color, for gradients and icons. |

## Typography

### Quicksand — rounded sans; headings 700 but with soft letterforms. A hard face would break the contrast.

- **Substitute:** 'Trebuchet MS', 'Segoe UI', sans-serif
- **Weights:** 500, 700
- **Sizes:** 12, 15, 19, 26, 34, 46
- **Line height:** 1.2 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** 0.01em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 46px | 1.2 | 0.01em | `--text-display` |
| heading | — | 700 | 34px | 1.3 | — | `--text-heading` |
| subheading | — | 500 | 26px | 1.4 | — | `--text-subheading` |
| body-lg | — | 500 | 19px | 1.65 | — | `--text-body-lg` |
| body | — | 500 | 15px | 1.7 | — | `--text-body` |
| label | — | 700 | 12px | 1.5 | 0.14em | `--text-label` |

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
| cards | 16px |
| buttons | 12px |
| inputs | 12px |
| icons | 999px |

- **Page max-width:** 1080px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Soft Goth Card

**Role:** the soft goth card (core component)

Near-black fill, 16px radius, 1px lavender 30% stroke, 28px padding, plus a 0 0 20px lavender 30% soft glow. Title 34px/700 lavender, body 15px pastel blue 80%. Each corner carries a 12px pastel cross or skull line drawing (1px lines, unfilled). On hover the stroke rises to 60% and the glow turns pink.

- **States:** hover: border 60%, pink glow

### Candy Button

**Role:** action buttons

Lavender fill, deep-violet text, 12px radius, 1px pastel-blue 40% stroke, 15px/700, padding 12px 28px, with a 0 0 20px lavender 30% glow. On hover the fill turns pink and the stroke periwinkle; on press it scales 0.98. Transition 200ms.

- **Sizes:** padding 12px 28px; label 15px
- **States:** hover: pink fill; active: scale 0.98

### Skull Motif

**Role:** skull and cross ornaments

Line-drawn skulls, crosses, bats or stars 24 to 64px, 2px stroke in lavender or pink, never filled black. They may sit on a 15% pastel ground. They must be "cutified" — a rounder cranium, slightly chubbier bones. Two to four per screen.

### Pastel Gradient

**Role:** the pastel gradient band

A horizontal gradient from lavender through pink to periwinkle (or pastel blue through lavender to pink), 4 to 8px tall, for card tops or dividers. The gradient must stay soft and stay inside the pastel range — never a dark stop.

### Ghost Field

**Role:** form inputs

Near-black fill, 12px radius, 1px lavender 25% stroke, padding 10px 16px, 15px text. Placeholder pastel blue 45%. On focus the stroke turns lavender 60% with a 3px lavender 20% outer ring.

## Do's and Don'ts

### Do

- Pair the deep violet and near-black grounds with pastels
- Keep gothic elements pastel and rounded
- Round corners 12 to 16px
- Use pastel borders at 30% translucency
- Allow bold headings softened with pastel color
- Keep gradients inside the pastel range

### Don't

- Don't use realistic horror imagery
- Don't fill figures in pure black
- Don't use hard-edged fonts
- Don't put a dark stop in the gradient
- Don't use sharp angles
- Don't let elements become purely cute

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Violet | `#2d1b3d` | Page ground |
| 1 | Near Black | `#1a1225` | Cards |
| 2 | Lavender Wash | `rgba(212,165,227,0.10)` | Accent grounds |

## Elevation

- **Pastel glow:** `0 0 20px rgba(212,165,227,0.30)`
- **Pink glow:** `0 0 20px rgba(245,165,184,0.28)`

## Imagery

Pastel goth illustration: skulls, bats, crosses, stars, spider webs, rendered in pastel and soft glow. Photos may be pressed into a lavender duotone. No realistic horror imagery, pure-black figures or high-saturation illustration.

## Layout

Capped at 1080px with 24px container padding and 96px section gaps. Ornament may rotate slightly (-6 to 6 degrees) and offset. Whitespace is moderate; ornament density is medium-high but must stay soft.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#d4a5e3`
- background: `#2d1b3d`
- lavender: `#d4a5e3`
- blue: `#7ec8c8`
- blush: `#f5a5b8`
- periwinkle: `#b8a5f5`

EXAMPLE COMPONENT PROMPTS:

1. Build a pastel-goth card: near-black #1a1225 fill, 16px radius, 1px rgba(212,165,227,0.3) stroke, 28px padding, box-shadow 0 0 20px rgba(212,165,227,0.3). Title 34px/700 Quicksand in #d4a5e3; body 15px in rgba(126,200,200,0.8). Each corner carries a 12px pastel cross line drawing (2px stroke, lavender, unfilled). Button lavender #d4a5e3 fill, deep-violet text, 12px radius, 1px pastel-blue stroke, padding 12px 28px, the fill turning #f5a5b8 on hover. A 6px pastel gradient band (#d4a5e3 → #f5a5b8 → #b8a5f5) sits at the card's top. Page ground #2d1b3d; zero pure-black fills, zero sharp angles.
