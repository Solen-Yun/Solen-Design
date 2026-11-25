# Swiss International Style — Style Reference

> Grid, left alignment, sans-serif, three primaries — let the structure itself be the decoration.

**Theme:** light

The Swiss International Style comes from 1950s graphic design: everything aligns to a strict grid, type always aligns left (never centered), the font is sans-serif in regular and bold only, and decoration is deleted outright, leaving black, white and the three primaries (red, blue, yellow). The page's order comes from the rhythm of column lines and whitespace, not from card borders. Interaction keeps the structural feel too: on hover the left rule turns from grey to red and the ground tints slightly grey — the structural line is "activated", not given a shadow or a shift.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | Body text, headings and rules. Swiss style allows pure black because it pursues print-grade contrast. |
| White | `#ffffff` | `--color-white` | Page canvas; no grey gradients of any kind. |
| Signal Red | `#ff0000` | `--color-red` | The only accent: numbering, active rules, key figures. Its area stays within one character's width. |
| Ultramarine | `#0057b8` | `--color-blue` | Links and clickable markers. When red is on screen, blue stays off. |
| Cadmium Yellow | `#ffcc00` | `--color-yellow` | Large color fields and poster sections, for zoning rather than emphasis. |

## Typography

### Helvetica Neue — the only font on the site, weights 400 and 700 only. Hierarchy is carried entirely by size and column width.

- **Substitute:** Inter, Arial, 'Helvetica Neue', sans-serif
- **Weights:** 400, 700
- **Sizes:** 11, 13, 15, 20, 32, 56, 88
- **Line height:** 0.98 (display), 1.05 (headings), 1.5 (body)
- **Letter spacing:** -0.03em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 88px | 0.98 | -0.03em | `--text-display` |
| heading-lg | — | 700 | 56px | 1 | -0.02em | `--text-heading-lg` |
| heading | — | 700 | 32px | 1.05 | — | `--text-heading` |
| body-lg | — | 400 | 20px | 1.4 | — | `--text-body-lg` |
| body | — | 400 | 15px | 1.5 | — | `--text-body` |
| label | — | 700 | 11px | 1.3 | 0.08em | `--text-label` |

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

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Structural List Row

**Role:** list, catalog and index rows

No background, no radius, no shadow. A 2px vertical rule on the left defaults to #d4d4d4, rows are 64px tall with 16px left padding. Numbers are 11px/700 at 0.08em tracking in red; titles are 20px/700, aligned left. On hover the left rule turns red and the ground becomes #f0f0f0, over 200ms; no translation.

- **States:** hover: rule grey to red, ground #f0f0f0

### Section Label

**Role:** section numbering and category labels

11px, weight 700, 0.08em tracking, uppercase. A 24px short black rule connects the number to the title. Pills and rounded corners are not accepted.

### Inline Button

**Role:** action and link buttons

No fill, no border, no radius, left-aligned; text 13px/700 uppercase at 0.08em with a 2px black rule beneath. On hover the rule turns red while the text stays black, 200ms; on press the rule thickens to 3px and nothing else changes.

### Color Field

**Role:** zoning blocks and poster areas

A solid fill of red, blue or yellow, no radius, no shadow, no gradient. Text inside is white or black (chosen by contrast), at least 32px/700, left-aligned and snapped to the block's 48px padding. No more than one color field per screen.

## Do's and Don'ts

### Do

- Align everything left, never center
- Use only weights 400 and 700
- Keep red as the sole accent, within one character's width
- Separate with 1px or 2px black rules, not card frames
- Activate structural rules on hover — no shadows, no shifts
- Let type sizes span wide: 11px to 88px

### Don't

- Don't use rounded corners
- Don't use shadows or gradients
- Don't center the layout
- Don't let red and blue both act as accents
- Don't exceed two weights
- Don't wrap content in cards

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | Page canvas |
| 1 | Black Block | `#000000` | Inverted blocks and rules |
| 2 | Yellow Block | `#ffcc00` | Zoning color fields |

## Elevation

- **None:** `none`

## Imagery

Black-and-white photography, geometric compositions, and large-set type that itself becomes the image. Full-bleed single-color fields are allowed. No color photography, no illustration, no icon walls, no soft transitions of any kind.

## Layout

12 columns, capped at 1200px, 24px gutters. Everything aligns left and snaps to column lines; headings may span 8 columns or more. Section gap 96px; a single 1px black rule may run the full width as a divider. The page refuses centered layouts and card containers.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#000000`
- background: `#ffffff`
- accent: `#ff0000`
- link: `#0057b8`
- block: `#ffcc00`
- rule: `#d4d4d4`

EXAMPLE COMPONENT PROMPTS:

1. Build a Swiss index list: each row has no background, no radius, 64px height, a 2px #d4d4d4 vertical rule on the left and 16px left padding. Inside each row: an 11px/700 red number (0.08em tracking) on the left and a 20px/700 black title on the right, all left-aligned. On hover the left rule turns #ff0000 and the ground becomes #f0f0f0, transition 200ms, with no translation and no shadow.
2. Build an inline button: no fill, no border, no radius, left-aligned 13px/700 uppercase text at 0.08em tracking with a 2px black rule underneath. On hover the rule turns #ff0000 and the text stays black over 200ms; on press the rule thickens to 3px.
