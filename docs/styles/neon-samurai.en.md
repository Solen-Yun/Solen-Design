# Neon Samurai — Style Reference

> A blade's slash line, vermilion torii, neon glow: ukiyo-e crashes into the neon street.

**Theme:** dark

Neon samurai stitches samurai aesthetics into cyber neon: on a deep-navy ground (#080818), vermilion (#dc2626) is the primary, violet (#a020f0) and sky (#38bdf8) form a dual neon pair, gold (#fbbf24) marks blade highlights. The graphic vocabulary is a fixed set of four — the slash line (a 2 to 4px diagonal stroke tapering at its end), the torii as section frame, armor-plate polygonal cards, and calligraphy brush strokes as dividers (with neon glow). Conventional drop shadows are banned; depth is expressed only through glow.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Vermilion | `#dc2626` | `--color-vermilion` | Primary: torii, slash lines and primary buttons. The samurai's red. |
| Deep Navy | `#080818` | `--color-deep-navy` | Page ground. Deep enough to light vermilion and the dual neon at once. |
| Neon Violet | `#a020f0` | `--color-neon-violet` | First neon: armor edges and hover glows. |
| Sky | `#38bdf8` | `--color-sky` | Second neon: data, the blade's cool side, links. |
| Gold | `#fbbf24` | `--color-gold` | Blade light and highlights, the only warm light on screen. |
| Neon Pink | `#ff1253` | `--color-neon-pink` | Warnings and splatter effects, the least frequent. |

## Typography

### Cinzel — monumental serif; display adds 0.06em tracking, labels 0.22em. The letterforms carry a blade-edge sharpness.

- **Substitute:** 'Noto Serif SC', Georgia, serif
- **Weights:** 400, 700
- **Sizes:** 12, 15, 20, 28, 38, 52
- **Line height:** 1.15 (display), 1.25 (headings), 1.65 (body)
- **Letter spacing:** 0.06em on display, 0.22em on uppercase labels

### JetBrains Mono — data and coordinates. The cyber side's typeface.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400
- **Sizes:** 11, 13
- **Line height:** 1.4 (display), 1.4 (headings), 1.5 (body)
- **Letter spacing:** 0.08em on display, 0.22em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Cinzel | 700 | 52px | 1.15 | 0.06em | `--text-display` |
| heading | Cinzel | 700 | 38px | 1.2 | 0.06em | `--text-heading` |
| subheading | Cinzel | 400 | 28px | 1.3 | 0.04em | `--text-subheading` |
| body | Cinzel | 400 | 15px | 1.65 | — | `--text-body` |
| body-sm | Cinzel | 400 | 13px | 1.6 | — | `--text-body-sm` |
| label | JetBrains Mono | 400 | 12px | 1.4 | 0.22em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1240px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Slash Line

**Role:** the slash line (signature graphic)

A 2 to 4px diagonal stroke (angle -20 to -35 degrees), tapering from 4px to 1px, vermilion or gold with 0 0 16px glow. It crosses sections and may overflow the container. It is the style's most identifying element: one or two per screen, never more.

### Armor Card

**Role:** the armor-plate card (core component)

Vermilion 8% fill, zero radius, 1px vermilion 40% stroke, 28px padding; clip-path cuts unequal chamfers at the four corners (16px top-right, 16px bottom-left), with a dual neon glow outside (vermilion 20px plus violet 40px). On hover the glow widens to 32/64px and an ink-splatter bursts once (eight 4px vermilion dots scattering and fading within 300ms).

- **States:** hover: glow widens, ink splatter burst

### Torii Frame

**Role:** the torii frame

A horizontal vermilion beam at the section top (10px tall, overhanging 32px on each end, 0 0 20px glow) plus two posts (6px wide, extending 40 to 64px downward), forming the torii silhouette. It frames a section's boundary: at most two per screen.

### Brush Divider

**Role:** the calligraphy divider

A 2 to 6px horizontal irregular stroke (clip-path or SVG path giving a thick entry and thin exit), vermilion or gold with neon glow. It replaces ordinary dividers, echoing one calligraphic horizontal.

### Neon Button

**Role:** action buttons

Deep-navy fill, vermilion text, zero radius, 1px vermilion 60% stroke, 12px monospace uppercase at 0.22em, padding 12px 28px, dual outer glow. On hover the stroke rises to 100% and the glow turns violet plus sky; on press it shifts 1px and the glow contracts to 8px. Transition 200ms.

- **Sizes:** padding 12px 28px; label 12px
- **States:** hover: violet-sky glow; active: translate 1px

## Do's and Don'ts

### Do

- Pair vermilion with deep navy and dual neon
- Keep one or two slash lines per screen
- Use torii as section frames, two at most
- Cut armor plates with unequal 16px chamfers
- Set dividers as calligraphy brush strokes
- Express depth only with glow, never shadows

### Don't

- Don't use conventional drop shadows
- Don't use rounded corners
- Don't exceed two slash lines
- Don't use Western portraiture
- Don't let the glow lose restraint
- Don't mix two chamfer sizes

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Navy | `#080818` | Page ground |
| 1 | Armor Plate | `rgba(220,38,38,0.08)` | Cards (vermilion-tinted translucent) |
| 2 | Blade Edge | `rgba(251,191,36,0.20)` | Blade-light layer |

## Elevation

- **Dual neon:** `0 0 20px rgba(220,38,38,0.45), 0 0 40px rgba(160,32,240,0.25)`
- **Blade glow:** `0 0 16px rgba(251,191,36,0.50)`
- **Never:** `standard drop shadows are forbidden`

## Imagery

Samurai and blades, torii gates, armor plates, calligraphy strokes, neon street scenes. Ukiyo-e or calligraphy scans may be layered with neon glow. No Western portraits, soft illustration, or un-glowed realistic photography.

## Layout

Capped at 1240px with 24px container padding and 96px section gaps. Slash lines may overflow the container; torii frames may span sections. Zero radius throughout, chamfers fixed at 16px. All depth comes from glow — conventional drop shadows never appear.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#dc2626`
- background: `#080818`
- vermilion: `#dc2626`
- violet: `#a020f0`
- sky: `#38bdf8`
- gold: `#fbbf24`

EXAMPLE COMPONENT PROMPTS:

1. Build a neon-samurai card: deep-navy #080818 ground, vermilion 8% fill, zero radius, 1px rgba(220,38,38,0.4) stroke, 28px padding, clip-path cutting 16px off the top-right and bottom-left, box-shadow 0 0 20px rgba(220,38,38,0.45), 0 0 40px rgba(160,32,240,0.25). Title 38px/700 Cinzel, 0.06em tracking, vermilion. A 3px slash line (angle -28 degrees, tapering from 4px to 1px, gold #fbbf24, 0 0 16px glow) crosses the section and overflows the container. Set a torii beam at the section top (10px tall, overhanging 32px each end, vermilion, glowing). Zero radius site-wide, zero conventional shadows — depth only through neon glow.
