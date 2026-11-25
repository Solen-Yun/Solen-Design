# Monochrome — Style Reference

> No color: hierarchy rests on five greys, weight and negative space.

**Theme:** light

Monochrome minimalism is subtraction at its strictest: the whole page holds only black, white and three greys (#111111, #444444, #666666, #999999, #cccccc, #e5e5e5). Hierarchy is built from three things — weight contrast (300 against 500), grey depth, and negative space. Any hue is banned, full rounding is banned, heavy shadows are banned, gradients are banned. The rhythm deliberately slows: transitions run 700ms ease-in-out changing only color, never position, because in this language displacement is itself noise.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#111111` | `--color-ink` | Primary text, primary buttons and the deepest blocks. The style's only "accent". |
| Paper | `#fafafa` | `--color-paper` | Page ground. A near-white grey letting cards layer by #f5f5f5. |
| Deep Grey | `#444444` | `--color-deep-grey` | Hover-state secondary text, one step deeper than #666666. |
| Mid Grey | `#666666` | `--color-mid-grey` | Body and captions, the first contrast against #111111. |
| Light Grey | `#999999` | `--color-light-grey` | Metadata and placeholders, the third level. |
| Border Grey | `#e5e5e5` | `--color-border-grey` | Every 1px divider. Nearly invisible, but structure collapses without it. |

## Typography

### Inter — the only typeface, weights 300 to 500 only. The weight gap is the style's primary hierarchy tool.

- **Substitute:** 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 300, 400, 500
- **Sizes:** 11, 13, 16, 22, 32, 44
- **Line height:** 1.15 (display), 1.3 (headings), 1.8 (body)
- **Letter spacing:** -0.01em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 300 | 44px | 1.15 | -0.01em | `--text-display` |
| heading | — | 300 | 32px | 1.25 | — | `--text-heading` |
| subheading | — | 400 | 22px | 1.35 | — | `--text-subheading` |
| body-lg | — | 300 | 16px | 1.8 | — | `--text-body-lg` |
| body | — | 300 | 13px | 1.8 | — | `--text-body` |
| label | — | 500 | 11px | 1.5 | 0.2em | `--text-label` |

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
| 160 | 160px | `--spacing-160` |

### Border Radius

| Element | Value |
|---|---|
| cards | 2px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1040px
- **Section gap:** 160px
- **Card padding:** 40px
- **Element gap:** 32px

## Components

### Mono Button

**Role:** the primary action button

Ink fill, paper text, 2px radius, no stroke, no shadow, 11px/500, uppercase, 0.2em tracking, padding 16px 32px. On hover the fill turns #2a2a2a; on press one step darker still. Transition 700ms ease-in-out, color only.

- **Sizes:** padding 16px 32px; label 11px
- **States:** hover: #2a2a2a; active: darker still

### Grey Card

**Role:** content cards

#f5f5f5 fill, 2px radius, 1px #e5e5e5 stroke, 40px padding, no shadow. Title 32px/300 ink with slightly open tracking; body 13px/300 mid grey, line height 1.8. On hover the fill turns #ebebeb, the stroke #cccccc and the body #444444 — all within 700ms, the element never moving.

### Hairline Divider

**Role:** the hairline divider

A 1px #e5e5e5 line across the content width, no gradient fade. It is the style's only structural tool — more explicit than whitespace, quieter than shadow.

### Ghost Field

**Role:** inputs

Paper fill, 2px radius, 1px #e5e5e5 stroke, padding 14px 16px, 13px text. Placeholder #999999. On focus the stroke turns ink and stays 1px — no ring, no background change.

### Weight Ladder

**Role:** the weight hierarchy rule

Titles use 300 only, body 300, labels and buttons 500, metadata 400. Weights above 600 are banned — once they appear, the greys' subtlety is crushed. Hierarchy layers size, grey and whitespace threefold.

## Do's and Don'ts

### Do

- Use five to six greys, hue-free
- Build hierarchy from weight and grey
- Cap weight at 500
- Transition 700ms changing only color
- Keep borders 1px #e5e5e5
- Compose with negative space

### Don't

- Don't use any color with hue
- Don't use full rounding
- Don't use heavy shadows
- Don't use gradients
- Don't shift elements on hover
- Don't use weights above 600

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#fafafa` | Page ground |
| 1 | Panel | `#f5f5f5` | Cards |
| 2 | Hover Panel | `#ebebeb` | Card hover |

## Elevation

- **None:** `none — a 1px #e5e5e5 border does the work`
- **Max allowed:** `0 1px 2px rgba(17,17,17,0.04)`

## Imagery

Black-and-white and architectural photography: clear shape and light-dark structure required, nothing that depends on color. Greyscale captions allowed. No color imagery, illustration or icon ornament.

## Layout

Capped at 1040px with 32px container padding and 160px section gaps. Negative space is the primary compositional tool, with at least 32px between elements. One column or a strictly aligned two — offsets and rotation banned.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#111111`
- background: `#fafafa`
- card: `#f5f5f5`
- muted: `#666666`
- light: `#999999`
- border: `#e5e5e5`

EXAMPLE COMPONENT PROMPTS:

1. Build a monochrome card: background #f5f5f5, 2px radius, 1px #e5e5e5 stroke, 40px padding, no shadow. Title 32px/300 #111111 with slightly open tracking; body 13px/300 #666666 at line height 1.8. On hover the ground turns #ebebeb, the stroke #cccccc and the body #444444, transition 700ms ease-in-out, no displacement. Page ground #fafafa. Any color with hue is banned.
