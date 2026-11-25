# Ink Wash — Style Reference

> Ink has five tones, the paper holds vast emptiness: the spirit lives where nothing is painted.

**Theme:** light

Ink wash comes from traditional Chinese ink painting: the density, wetness and dryness of ink are the only expressive means, and the paper's vast emptiness is the composition's main body (treating blankness as substance). On the interface the discipline is explicit — serif type echoes calligraphy, borders must be brush-thin (1px at 20% ink), all color is pressed into greys, shadows are banned outright. Interaction tightens the same way: hover only deepens the ink and lets borders bleed slightly — never displacement, never spring or bounce, because any mechanical elasticity breaks the stillness.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#2c2c2c` | `--color-ink` | All text and lines. Not pure black, leaving room for "thick ink" and "scorched ink". |
| Xuan Paper | `#f8f5f0` | `--color-xuan` | Page ground. A slightly warm-yellow paper, the carrier of all emptiness. |
| Grey Green | `#6b7b6e` | `--color-grey-green` | The first secondary, for distant mountain tones and quiet emphasis. |
| Ochre | `#a89279` | `--color-ochre` | A warm stroke, for elements with human presence, infrequent. |
| Pale Sand | `#c4b9a8` | `--color-pale-sand` | The pale-ink layer, for section grounds and separation. |
| Slate Blue | `#697a7c` | `--color-slate-blue` | One cool stroke, for water and sky. |

## Typography

### Noto Serif SC — serif throughout. Line height 1.9 is a prerequisite of ink wash — letter and line spacing must stay open, like unpainted paper.

- **Substitute:** 'Songti SC', 'STSong', Georgia, serif
- **Weights:** 300, 400, 500
- **Sizes:** 15, 18, 22, 28, 38, 52
- **Line height:** 1.2 (display), 1.4 (headings), 1.9 (body)
- **Letter spacing:** 0.02em on display, 0.3em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Noto Serif SC | 300 | 52px | 1.2 | 0.02em | `--text-display` |
| heading | Noto Serif SC | 400 | 38px | 1.35 | — | `--text-heading` |
| subheading | Noto Serif SC | 400 | 28px | 1.45 | — | `--text-subheading` |
| body-lg | Noto Serif SC | 400 | 22px | 1.8 | — | `--text-body-lg` |
| body | Noto Serif SC | 300 | 18px | 1.9 | — | `--text-body` |
| label | Noto Serif SC | 500 | 15px | 1.7 | 0.3em | `--text-label` |

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
| 144 | 144px | `--spacing-144` |
| 192 | 192px | `--spacing-192` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| seals | 4px |

- **Page max-width:** 1000px
- **Section gap:** 192px
- **Card padding:** 40px
- **Element gap:** 32px

## Components

### Ink Rule

**Role:** the ink rule (core structure)

1px, ink at 20%, spanning the content width but not the full width (inset 15% each side), ends fading to transparency. The line must be thin enough to read as a brush's lifting stroke.

### Quiet Button

**Role:** action buttons

Transparent ground, 1px ink 30% stroke, zero radius, serif 15px, 0.3em tracking, padding 14px 36px, no shadow. On hover the stroke rises to 60%, text lifts from 70% to 100%, and a faint ink bloom appears (0 0 12px ink 8% — the only permitted "shadow"). Transition 600ms ease-out, never displaced.

- **States:** hover: border 60%, ink bloom; no displacement

### Rice Paper Card

**Role:** content cards and scroll panels

Xuan-paper fill, zero radius, 1px ink 15% stroke, 40px padding, no shadow. Title 38px/400, body 18px/300 at line height 1.9. On hover the stroke rises to 35% and bleeds outward 2px (outline-offset or a second stroke simulating ink soaking into paper).

### Seal Stamp

**Role:** the seal

A 32px square, 4px radius, vermilion or ochre fill (the only non-grey color, appearing only here), holding a 20px white serif character, edges chipped 1px (cut with a mask or pseudo-element). Marks chapters and "read".

### Emptiness Block

**Role:** the emptiness block

A section carrying no content, 128px to 320px tall, existing purely to let what surrounds it breathe. In the document structure it is real (not margin), because in this style emptiness is itself content.

## Do's and Don'ts

### Do

- Lead with ink, keep color inside greys
- Keep borders 1px at 20% ink
- Treat whitespace as structure, not slack
- Set serif type at line height 1.9
- Let interaction only deepen ink and bleed borders
- Reserve all color for the seal

### Don't

- Don't use vivid saturated colors
- Don't use heavy shadows
- Don't use thick borders
- Don't use decorative animation or bounce
- Don't use spring or bounce curves
- Don't displace elements on hover

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Xuan Paper | `#f8f5f0` | Page ground |
| 1 | Pale Ink | `rgba(196,185,168,0.30)` | Pale-ink sections |

## Elevation

- **None:** `none — shadows break the ethereal mood`

## Imagery

Ink paintings: distant mountains, bare branches, a lone boat, drifting mist. Must hold vast emptiness; ink layers in tone but stays un-vivid. Calligraphic inscriptions allowed. No photographs, geometric illustration or saturated color.

## Layout

Capped at 1000px with 32px container padding and 192px section gaps. Compose like a handscroll: content leans to one side, the other side holds vast emptiness, titles often vertical or set high. Centered dense layouts are banned.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#2c2c2c`
- background: `#f8f5f0`
- accent: `#6b7b6e`
- ochre: `#a89279`
- pale: `#c4b9a8`
- border: `rgba(44,44,44,0.20)`

EXAMPLE COMPONENT PROMPTS:

1. Build an ink-wash card: xuan-paper #f8f5f0 fill, zero radius, 1px rgba(44,44,44,0.15) stroke, 40px padding, no shadow. Title 38px Noto Serif SC 400 in #2c2c2c; body 18px/300 at line height 1.9. Below the card, a 1px rgba(44,44,44,0.2) ink rule inset 15% each side. On hover the stroke rises to rgba(44,44,44,0.35) and bleeds outward 2px, transition 600ms ease-out, no displacement. Page ground #f8f5f0 with 192px whitespace between sections.
