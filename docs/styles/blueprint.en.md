# Blueprint — Style Reference

> Blue ground, white lines: grid, coordinates, callouts, dimension lines — a drawing not yet built.

**Theme:** dark

The engineering blueprint imitates technical drafting: a blueprint-blue ground (#1e3a5f) covered with a 1px white or pale-blue grid, every line and word in white or pale blue, callouts and dimension lines picked out in orange, and type strictly monospace to hold the drafting feel. Element borders are 1px translucent white, guide lines are dashed, and cards are translucent in the same blue with slight blur (tracing paper laid over the drawing). Warm backgrounds are banned, rounded soft elements are banned, gradient fills are banned — lines and blocks must be solid color.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Blueprint Blue | `#1e3a5f` | `--color-blueprint-blue` | Page ground. The blue of drafting paper, over which all white lines and grids run. |
| White | `#ffffff` | `--color-white` | Primary lines and main text. The drafting white line. |
| Pale Blue | `#a0c4e8` | `--color-pale-blue` | Secondary lines, grid and auxiliary text, one step weaker than white. |
| Mid Blue | `#4a90d9` | `--color-mid-blue` | Links and selection — the most saturated blue in frame. |
| Callout Orange | `#ff6b35` | `--color-callout-orange` | The only warm color, for callouts, dimension lines and problems needing pointing out. |
| Revision Violet | `#b071e4` | `--color-revision-violet` | Revision marks and version notes, least frequent. |

## Typography

### JetBrains Mono — the only typeface, monospace throughout. Every character in a drawing is a label, so tracking must open up.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 10, 11, 13, 16, 22, 32
- **Line height:** 1.2 (display), 1.3 (headings), 1.65 (body)
- **Letter spacing:** 0.08em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | — | 700 | 32px | 1.2 | 0.08em | `--text-heading` |
| subheading | — | 700 | 22px | 1.3 | 0.08em | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.65 | — | `--text-body` |
| body-sm | — | 400 | 11px | 1.6 | — | `--text-body-sm` |
| label | — | 700 | 10px | 1.4 | 0.16em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1280px
- **Section gap:** 48px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Grid Bed

**Role:** the grid ground (core structure)

Two repeating-linear-gradients stack into a white grid of 8px small cells and 80px large cells: small cells 1px white 5%, large cells 1px white 10%. It covers the page as a fixed layer with pointer-events: none, making the whole page read as a drawing.

### Drafting Card

**Role:** content cards and blocks

Blueprint blue 60% fill, 12px blur, zero radius, 1px white 30% stroke, 20px padding. The top left holds a 12px monospace uppercase block number (like FIG. 01), the top right a dimension mark. On hover the stroke rises to 60%.

### Dimension Line

**Role:** dimension lines and callouts

A 1px white 50% line with a 4px short perpendicular tick at each end, and 10px monospace measurement text (like 2400) at its center. Key measurements use orange #ff6b35. It explains spacing and dimension.

### Draft Button

**Role:** action buttons

Transparent ground, 1px white 40% stroke, zero radius, 11px monospace uppercase 0.16em, padding 10px 20px. On hover the fill takes white 12% and the stroke turns white while the text stays white; on press the fill rises to 20%. Transition 120ms linear.

- **Sizes:** padding 10px 20px; label 11px
- **States:** hover: fill 12%, border white; active: fill 20%

### Auxiliary Rule

**Role:** auxiliary dashed rules

A 1px dashed line (dash 4px, gap 4px) in white 25% or pale blue 40%, used to lead out callouts, connect blocks and explain. It is never decorative — it always means "this line relates to that object".

## Do's and Don'ts

### Do

- Blue ground with white lines and 8px + 80px double grid
- Set monospace throughout
- Pick out callouts in orange
- Use dashed lines for guides
- Keep zero radius and solid fills
- Number blocks and mark dimensions

### Don't

- Don't use warm backgrounds
- Don't use rounded soft elements
- Don't use gradient fills
- Don't use color photography
- Don't use serif or proportional sans
- Don't let guide lines become decoration

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Blueprint Blue | `#1e3a5f` | Page ground (with grid) |
| 1 | Tracing Paper | `rgba(30,58,95,0.60)` | Cards (translucent) |

## Elevation

- **None:** `none — the drawing is flat`
- **Card focus:** `0 0 0 1px rgba(255,255,255,0.30)`

## Imagery

Technical illustration: section views, plans, exploded views, flow diagrams and structural schematics, all drawn in white lines. Photos may be processed into blue-ground white-line drawings. No color photography, soft illustration or decorative figures.

## Layout

Capped at 1280px with 16px container padding and 12px block gaps, forming a drawing-like dense arrangement. Blocks may join along 1px white lines into larger figures. All dimensions are multiples of 4, aligned to the grid.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#1e3a5f`
- pale: `#a0c4e8`
- accent: `#4a90d9`
- callout: `#ff6b35`
- card: `rgba(30,58,95,0.60)`

EXAMPLE COMPONENT PROMPTS:

1. Build an engineering-blueprint card: background rgba(30,58,95,0.6), backdrop-blur 12px, zero radius, 1px rgba(255,255,255,0.3) stroke, 20px padding. Upper left a 12px monospace uppercase block number (FIG. 01), upper right a dimension mark. The page ground #1e3a5f carries a double grid: 8px small cells at 1px white 5%, 80px large cells at 1px white 10%. Key callouts in orange #ff6b35, guide lines as 1px dashed (dash 4px, gap 4px, white 25%). Monospace type throughout.
