# Mid-Century Modern — Style Reference

> The Atomic Age of the 1950s: starbursts, organic curves, saturated warm flats.

**Theme:** light

Mid-century modern comes from the Atomic Age design of the 1950s: Eames chairs, atom clocks and starburst patterns. It sets saturated but warm colors (orange #e8572a, teal #2a6e5e, mustard #c4a35a, slate blue #44628c) on a cream ground (#f5f0e1), shapes are geometric flats with organic curves (medium radii 8 to 12px), typography leans on wide tracking for retro signal, and 2px style-colored strokes emphasize structure. The bans: no fluorescent or neon, no serif or script faces, no gradient backgrounds — flat color blocks are its foundation.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Atomic Orange | `#e8572a` | `--color-atomic-orange` | First primary: primary buttons, starbursts and the loudest block. |
| Cream | `#f5f0e1` | `--color-cream` | Page ground. A yellow-leaning cream, that era's home color. |
| Teal | `#2a6e5e` | `--color-teal` | Second primary: text, secondary buttons and counterpoint blocks. |
| Mustard | `#c4a35a` | `--color-mustard` | Warm accents and highlight grounds, often beside orange. |
| Slate Blue | `#44628c` | `--color-slate-blue` | The cool balance, for information and third sections. |
| Charcoal | `#3d3d3d` | `--color-charcoal` | Body text and strokes. Softer than black, right for 50s print. |

## Typography

### Inter — geometric sans with widened tracking (body 0.02em, labels 0.14em). Wide tracking is its most direct period signal.

- **Substitute:** 'Futura', 'Century Gothic', sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 14, 16, 20, 28, 38, 52
- **Line height:** 1.15 (display), 1.25 (headings), 1.65 (body)
- **Letter spacing:** 0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 52px | 1.15 | 0.02em | `--text-display` |
| heading | — | 700 | 38px | 1.2 | 0.02em | `--text-heading` |
| subheading | — | 600 | 28px | 1.3 | 0.02em | `--text-subheading` |
| body-lg | — | 400 | 20px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.65 | — | `--text-body` |
| label | — | 600 | 14px | 1.5 | 0.14em | `--text-label` |

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
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| motifs | 999px |

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Block Button

**Role:** action buttons

Atomic-orange fill, cream text, 8px radius, no stroke, 16px/600, 0.02em tracking, padding 12px 28px. On hover the fill deepens to #cf4a20; on press it scales 0.98. Transition 200ms ease-out. A 12px starburst may sit before the label.

- **Sizes:** padding 12px 28px; label 16px
- **States:** hover: #cf4a20; active: scale 0.98

### Blocks Card

**Role:** content cards

Cream or one solid color fill, 12px radius, a 2px style-colored stroke (orange, teal or mustard), 28px padding, no shadow. Title 28px/600, body 16px/400 at line height 1.65. The card's upper-right may carry a 48px starburst or oval.

### Starburst

**Role:** the starburst (signature)

Eight to sixteen equal pointed rays radiating from a center (clip-path polygon or SVG), 48 to 120px, atomic orange or mustard. It is the era's most identifying figure — placed at card corners or beside titles, 2 to 4 per screen.

### Organic Oval

**Role:** the organic oval

A 160 to 320px ellipse (border-radius at 50% / 60% 40%), filled one solid color at 25% or fully opaque, absolutely positioned at a section corner, allowed to overflow. It echoes the Eames era's organic lines.

### Wide Label

**Role:** the wide-tracked label

14px/600, 0.14em tracking, uppercase, charcoal or teal. One source of the retro feel — for section numbers, years and categories. Never below 12px, or the wide tracking cramps the glyphs.

## Do's and Don'ts

### Do

- Paint saturated warm flats, never gradients
- Pair geometric sans with wide tracking
- Round 8 to 12px for organic curves
- Stroke structure with 2px style colors
- Ornament with starbursts and ovals
- Set warm colors on cream

### Don't

- Don't use fluorescent or neon colors
- Don't use serif or script faces
- Don't use gradient backgrounds
- Don't use fully rounded buttons
- Don't use cool grey as the neutral
- Don't skip the starbursts

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream | `#f5f0e1` | Page ground |
| 1 | Orange Block | `#e8572a` | Accent block |
| 2 | Teal Block | `#2a6e5e` | Counterpoint block |

## Elevation

- **None:** `none — flat blocking carries everything`
- **Max allowed:** `0 2px 6px rgba(61,61,61,0.08)`

## Imagery

1950s-style illustration and photography: furniture, atom motifs, starbursts, abstract ovals, home interiors. Images must be flat or high-contrast, in saturated warm colors. No gradient imagery, neon colors or contemporary realistic photography.

## Layout

Capped at 1120px with 24px container padding and 96px section gaps. Overlap and offset allowed. The page zones into large flat blocks, their shapes rounded rectangles or organic curves.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#3d3d3d`
- background: `#f5f0e1`
- orange: `#e8572a`
- teal: `#2a6e5e`
- mustard: `#c4a35a`
- slate: `#44628c`

EXAMPLE COMPONENT PROMPTS:

1. Build a mid-century card: cream #f5f0e1 fill, 12px radius, 2px solid #e8572a stroke, 28px padding, no shadow. Title 28px/600, 0.02em tracking, color #2a6e5e; body 16px/400 at line height 1.65 in #3d3d3d. The upper-right holds a 48px atomic-orange starburst (8 radiating points, clip-path). Labels 14px/600 uppercase at 0.14em. Primary button #e8572a fill, cream text, 8px radius. Page ground #f5f0e1, sections zoned by large flat blocks, no gradients anywhere.
