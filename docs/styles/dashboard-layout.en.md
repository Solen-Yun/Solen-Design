# Dashboard Layout — Style Reference

> Metrics first: numbers, then charts, details last.

**Theme:** light

Dashboard layout solves "understood at a glance": a row of KPI cards on top (3 to 4), a chart zone and a detail table beneath. Each KPI card holds exactly three elements — metric name, figure, change rate; the rate renders as a 10%-tint chip in green or red, with no arrows. A dark left rail against a light-grey content area forms the fixed zoning; cards use 12px radius, 1px borders and one shadow tier. Density runs higher than a corporate site: 16px chart padding, 44px table rows, figures aligned in monospace.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Near Black | `#111827` | `--color-near-black` | Rail ground, headings and primary figures. A dashboard needs stronger contrast than a corporate site. |
| Mist | `#f9fafb` | `--color-mist` | Content canvas; cards float on it. |
| Card White | `#ffffff` | `--color-card-white` | KPI cards, chart containers and table grounds. |
| Indigo | `#6366f1` | `--color-indigo` | Primary actions and the charts' lead series. Only one blue-violet family per screen. |
| Positive Green | `#10b981` | `--color-positive` | Growth metrics and success states, as a 10% ground with solid text — never a solid block. |
| Negative Red | `#ef4444` | `--color-negative` | Declines and errors, matching green in area and weight. |

## Typography

### Inter — the only font on the site. Figures use tabular-nums to guarantee column alignment — the single most important typographic detail here.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 11, 12, 14, 20, 28, 36
- **Line height:** 1.15 (display), 1.3 (headings), 1.5 (body)
- **Letter spacing:** -0.02em on display, 0.04em on uppercase labels

### JetBrains Mono — table values, IDs and code snippets. Monospace makes vertical comparison possible.

- **Substitute:** ui-monospace, SFMono-Regular, Menlo, monospace
- **Weights:** 400, 500
- **Sizes:** 12, 13
- **Line height:** 1.4 (display), 1.4 (headings), 1.5 (body)
- **Letter spacing:** 0 on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 36px | 1.15 | -0.02em | `--text-display` |
| heading | — | 600 | 20px | 1.3 | — | `--text-heading` |
| body-lg | — | 500 | 14px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.5 | — | `--text-body` |
| label | — | 500 | 11px | 1.4 | 0.04em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** compact

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

### Border Radius

| Element | Value |
|---|---|
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| chips | 8px |

- **Page max-width:** 1600px
- **Section gap:** 24px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### KPI Card

**Role:** top metric cards

White ground, 12px radius, 1px #f3f4f6 border, 20px padding, shadow 0 1px 2px. The first row holds a 13px grey metric name and, on the right, a change-rate chip (11px, weight 500, 10% green or red ground, 8px radius, padding 2px 8px); the second row is a 36px/700 figure in tabular-nums; the third row is an 11px grey comparison note. On hover the ground turns #f9fafb and the shadow rises to 0 4px 12px.

- **States:** hover: ground #f9fafb, shadow up

### Chart Panel

**Role:** line, bar and area chart containers

White ground, 12px radius, 1px border, 16px padding. The 20px/600 title shares a row with the legend (11px, 8px dots). Charts keep no vertical gridlines — only horizontal 1px #f3f4f6 dashes. Height is fixed at 280px or 320px so the container never jitters.

### Data Table

**Role:** detail tables and activity streams

White ground, 12px radius, 1px border. The header is 11px/500 uppercase 0.04em on a #f9fafb ground, 36px tall; rows are 44px with 1px #f3f4f6 separators and a #f9fafb hover. Value columns align right in monospace; status columns use 10%-tint chips.

### Sidebar Rail

**Role:** left navigation

240px wide, near-black fill, white text at 70%, fixed. Items are 40px tall, 8px radius, 18px icons; the selected item takes a white 10% ground with pure white text, hover white 6%. Groups sit 24px apart with a 1px white 8% divider between them.

## Do's and Don'ts

### Do

- Keep KPI cards to name, figure and change rate
- Use tabular-nums so figures align in columns
- Render change rates as 10%-tint chips — no arrows, no emphasis blocks
- Keep charts to horizontal dashes only, no vertical grids
- Set table rows at 44px with right-aligned values
- Fix chart heights to avoid layout shifts

### Don't

- Don't cram charts or buttons into a KPI card
- Don't separate data series with rainbow palettes
- Don't exceed 12px card radius
- Don't use heavy shadows or glow
- Don't let table rows drop below 40px
- Don't hide filters in second-level menus

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Mist | `#f9fafb` | Content canvas |
| 1 | Card White | `#ffffff` | KPI cards, charts, tables |
| 2 | Rail | `#111827` | Side navigation |

## Elevation

- **Card:** `0 1px 2px rgba(17,24,39,0.06)`
- **Hover:** `0 4px 12px rgba(17,24,39,0.08)`

## Imagery

Charts are the primary visual; no photography. Avatars, product thumbnails and icons are allowed. Chart colors must stay in the accent family — no off-palette rainbow series.

## Layout

The rail is fixed at 240px; the content area caps at 1600px with 24px padding. The top KPI row is a 12-column grid of 3 to 4 equal cards; the chart zone below runs two columns at 2:1; the table spans full width. Section gap 24px, card gap 16px.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#111827`
- background: `#f9fafb`
- card: `#ffffff`
- accent: `#6366f1`
- positive: `#10b981`
- negative: `#ef4444`

EXAMPLE COMPONENT PROMPTS:

1. Build a dashboard KPI row: three white cards (12px radius, 1px #f3f4f6 border, 20px padding, shadow 0 1px 2px rgba(17,24,39,0.06)). Each card's first row is a 13px #6b7280 metric name with an 11px change-rate chip on the right (10% green ground + #10b981 text, 8px radius, padding 2px 8px); the second row is a 36px/700 figure with font-variant-numeric: tabular-nums; the third row is an 11px #9ca3af comparison note. On hover the ground turns #f9fafb and the shadow rises to 0 4px 12px.
2. Build a data table: white ground, 12px radius, 1px border. Header 11px/500 uppercase 0.04em on a #f9fafb ground, 36px tall; rows 44px with 1px #f3f4f6 separators and a #f9fafb hover; value columns right-aligned in monospace; status column as 10%-tint chips.
