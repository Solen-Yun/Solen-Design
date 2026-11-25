# Wabi-Sabi — Style Reference

> Imperfect, impermanent, incomplete: let material and time speak for the design.

**Theme:** light

Wabi-sabi is the Japanese aesthetic of accepting imperfection: a vessel's chip, paper's yellowing, a wall's mottling are all treated as value, not defect. On interfaces it appears as a warm paper ground (#f2ede4), ink text (#3a3a3a), serif faces, extremely thin dividers (1px at 30% opacity), and whitespace so generous it borders on luxury. It bans vivid high-saturation color, heavy shadows and thick borders, dense packing, decorative animation and bounce — any urge to show off offends it.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#3a3a3a` | `--color-ink` | All text. A mid-deep grey rather than pure black, easier on long looks. |
| Paper | `#f2ede4` | `--color-paper` | Page ground. A yellowed warm ivory, like washi kept for years. |
| Moss | `#8a9a7b` | `--color-moss` | The first secondary, moss on stone steps, for quiet emphasis. |
| Sand | `#b5a78c` | `--color-sand` | Section grounds and dividers, separating without contrast. |
| Tea | `#8b6f4e` | `--color-tea` | A warm brown, for elements that carry human presence and woodware semantics. |
| Slate Teal | `#799d91` | `--color-slate-teal` | One cool stroke, for water, glaze and stillness. |

## Typography

### Noto Serif SC — serif throughout, only 300 and 400. Line height 1.9 with slightly open tracking, letting even letters carry space between them.

- **Substitute:** 'Songti SC', Georgia, serif
- **Weights:** 300, 400
- **Sizes:** 14, 16, 19, 24, 32, 42
- **Line height:** 1.25 (display), 1.4 (headings), 1.9 (body)
- **Letter spacing:** 0.02em on display, 0.24em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Noto Serif SC | 300 | 42px | 1.25 | 0.02em | `--text-display` |
| heading | Noto Serif SC | 400 | 32px | 1.35 | — | `--text-heading` |
| subheading | Noto Serif SC | 400 | 24px | 1.45 | — | `--text-subheading` |
| body-lg | Noto Serif SC | 400 | 19px | 1.85 | — | `--text-body-lg` |
| body | Noto Serif SC | 300 | 16px | 1.9 | — | `--text-body` |
| label | Noto Serif SC | 400 | 14px | 1.7 | 0.24em | `--text-label` |

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
| cards | 2px |
| buttons | 2px |
| images | 0 |

- **Page max-width:** 980px
- **Section gap:** 192px
- **Card padding:** 40px
- **Element gap:** 36px

## Components

### Hairline Rule

**Role:** the hairline divider (core structure)

1px, #d4cdc5 at 30%, spanning the content width and inset 10% at both ends. The line must be weak enough to be "almost invisible yet still felt" — it is the style's only structural tool.

### Quiet Button

**Role:** action buttons

Transparent ground, 1px ink 25% stroke, 2px radius, serif 14px, 0.24em tracking, padding 14px 36px, no shadow. On hover the stroke rises to 45% and text lifts from 80% to 100% — the element itself never moves. Transition 600ms ease-out.

- **States:** hover: border 45%, text 100%; no motion

### Paper Card

**Role:** content cards

A paper fill one step brighter, 2px radius, 1px sand 30% stroke, 40px padding, no shadow. Title 32px/400, body 16px/300 at line height 1.9. On hover only the stroke rises to 50% and the fill brightens 2%, over 800ms.

### Object Image

**Role:** the vessel-image container

Zero radius, no border, no shadow. Images may be irregular vessels (ceramic bowls, old wood, stone), edges allowed to run uneven. 36px between image and text. No filters or overlays — let the material present itself.

### Silence Block

**Role:** the whitespace block

An empty section 192px to 320px tall containing nothing, existing as a real element. In wabi-sabi, "nothing" is itself content — it separates and magnifies what surrounds it.

## Do's and Don'ts

### Do

- Ground in warm paper, never pure white
- Set serif type at line height 1.9
- Keep dividers 1px at 30%
- Let whitespace approach luxury
- Allow imperfection and asymmetry
- Transition 600 to 800ms without moving elements

### Don't

- Don't use vivid saturated colors
- Don't use heavy shadows or thick borders
- Don't pack elements densely
- Don't use decorative animation or bounce
- Don't use pure-white backgrounds
- Don't add filters or overlays that damage material

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#f2ede4` | Page ground |
| 1 | Lifted Paper | `#f7f3ec` | Cards |
| 2 | Sand Block | `rgba(181,167,140,0.22)` | Secondary sections |

## Elevation

- **None:** `none — shadows break the quiet`
- **Max allowed:** `0 1px 2px rgba(58,58,58,0.04)`

## Imagery

Vessel photography: ceramics, old wood, stone, dry branches, linen. Must be natural light, low saturation, carrying wear marks. Asymmetric and incomplete compositions are allowed. No high saturation, studio lighting or decorative illustration.

## Layout

Capped at 980px with 32px container padding and 192px section gaps. The layout allows incompleteness and bias: elements need not snap to a grid, whitespace may run asymmetric. Dense packing is banned — one screen holds no more than three information blocks in principle.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#3a3a3a`
- background: `#f2ede4`
- card: `#f7f3ec`
- moss: `#8a9a7b`
- sand: `#b5a78c`
- tea: `#8b6f4e`

EXAMPLE COMPONENT PROMPTS:

1. Build a wabi-sabi card: background #f7f3ec (paper one step brighter), 2px radius, 1px rgba(181,167,140,0.3) stroke, 40px padding, no shadow. Title 32px Noto Serif SC 400 in #3a3a3a; body 16px/300 at line height 1.9. Leave 192px between cards. On hover the stroke rises to rgba(181,167,140,0.5), transition 800ms ease-out, no element displacement. Page ground #f2ede4.
