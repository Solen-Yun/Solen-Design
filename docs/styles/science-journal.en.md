# Science Journal — Style Reference

> A narrow serif column argues, sidenotes murmur at the margin, figures break the measure to present evidence.

**Theme:** light

The science-journal style takes the academic journal site as its model: the body is a narrow 42rem serif column at line height 1.75; sidenotes absolutely position to the right margin on large screens and collapse into pale grey inline blocks on small ones; figures break out of the measure to 64rem, centered, to present evidence. Its rules are strict almost to the point of the journal — separation uses only 1px hairlines, tables use booktabs style (two heavy horizontal rules plus a thin header rule, never vertical lines or zebra striping), citations use superscript numbers paired with a reference list, and color has exactly two jobs: academic blue for links and citations, chart orange for data emphasis.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1f2933` | `--color-ink` | Body and headings. A deep grey-blue, kinder to long reads than black. |
| Paper | `#ffffff` | `--color-paper` | Page ground. Pure white, no texture — papers need no atmosphere. |
| Academic Blue | `#2a7ae2` | `--color-academic-blue` | Links, superscript citations and key emphasis. Only those three uses. |
| Chart Orange | `#e4572e` | `--color-chart-orange` | Data emphasis and the chart's main series, never interface decoration. |
| Muted Grey | `#6b7280` | `--color-muted-grey` | Captions, sidenotes and metadata. Always the third level. |
| Grey Block | `#f3f4f6` | `--color-grey-block` | The small-screen sidenote collapse and code block ground. |

## Typography

### Source Serif — body and headings must be serif. Line height 1.75 is the floor for long-form readability and may not be compressed.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 13, 15, 17, 21, 28, 36
- **Line height:** 1.2 (display), 1.3 (headings), 1.75 (body)
- **Letter spacing:** -0.01em on display, 0.06em on uppercase labels

### Inter — only for UI control labels and metadata. Body copy never uses sans.

- **Substitute:** system-ui, sans-serif
- **Weights:** 400, 500
- **Sizes:** 12, 13
- **Line height:** 1.4 (display), 1.4 (headings), 1.6 (body)
- **Letter spacing:** 0 on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Source Serif | 600 | 36px | 1.2 | -0.01em | `--text-display` |
| heading-lg | Source Serif | 600 | 28px | 1.25 | — | `--text-heading-lg` |
| heading | Source Serif | 600 | 21px | 1.35 | — | `--text-heading` |
| body-lg | Source Serif | 400 | 17px | 1.75 | — | `--text-body-lg` |
| body | Source Serif | 400 | 15px | 1.75 | — | `--text-body` |
| label | Inter | 500 | 12px | 1.4 | 0.06em | `--text-label` |

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
| 96 | 96px | `--spacing-96` |

### Border Radius

| Element | Value |
|---|---|
| cards | 6px |
| buttons | 4px |
| figures | 0 |

- **Page max-width:** 672px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Reading Column

**Role:** the narrow reading column (core structure)

max-width 42rem (672px), 24px padding on each side, centered. Body 17px serif, line height 1.75, 24px paragraph spacing, no first-line indent. The body must never run full width — full width belongs to figures alone.

- **Sizes:** 42rem measure

### Sidenote

**Role:** the sidenote (margin murmur)

On large screens (1280px and up) absolutely positioned 24px outside the body's right margin, 200px wide, 12px grey at line height 1.5; on small screens it collapses into a pale grey block inside the body (#f3f4f6), 4px radius, 12px padding, 12px grey. The anchor is a superscript number.

### Evidence Figure

**Role:** the figure (breaking the measure)

max-width 64rem (1024px), centered, twice the body's width. The caption is 13px grey opening with "图 N：", 12px from the figure. The figure area carries zero radius and no border. It is the only element allowed to break the measure.

### Booktabs Table

**Role:** the booktabs-style table

A 2px ink rule on top, a 1px ink rule under the header, a 2px ink rule at the bottom, with never a vertical line or zebra striping between. Cells pad 8px 12px in 14px serif; numeric columns are right-aligned with monospace figures.

### Citation Sup

**Role:** the superscript citation

A 12px superscript number after the body text (academic blue, no wrapping, 2px from the text), with a reference list at the end ordered by number, each entry 13px with title and source. Clicking the superscript jumps to the entry and highlights it for 2 seconds.

## Do's and Don'ts

### Do

- Keep the body in a 42rem column at line height 1.75
- Keep body copy serif; sans belongs to UI only
- Float sidenotes to the right margin on large screens, collapse them on small
- Break figures out to 64rem
- Use booktabs tables with no vertical lines and no zebra striping
- Separate only with 1px hairlines

### Don't

- Don't use any gradient
- Don't use heavy shadows
- Don't use large radii
- Don't let the body run full width
- Don't use multicolored decoration and large color blocks
- Don't add vertical lines or zebra striping to tables

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#ffffff` | Page ground |
| 1 | Grey Block | `#f3f4f6` | Code and collapsed sidenotes |

## Elevation

- **None:** `none — hairlines and whitespace do the work`
- **Max allowed:** `0 1px 2px rgba(31,41,51,0.05)`

## Imagery

Charts are the imagery: scatters, lines, networks and attention heat maps, all with axes and captions. Author photos are allowed. No decorative photography, illustration or background images — atmosphere has no place in this language.

## Layout

Body measure 42rem, figures 64rem, page capped at 1024px. Section gaps 64px with 48px above headings. Separation is always a 1px #e5e7eb hairline. The whole page is single column, with no side navigation.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1f2933`
- background: `#ffffff`
- accent: `#2a7ae2`
- chart: `#e4572e`
- muted: `#6b7280`
- rule: `#e5e7eb`

EXAMPLE COMPONENT PROMPTS:

1. Build a science-journal page: body column max-width 42rem, centered, 17px serif at line height 1.75, 24px paragraph spacing. Heading levels 36px / 28px / 21px serif. Figure area max-width 64rem, centered, zero radius, with a 13px #6b7280 caption opening "图 N：". Tables use booktabs: 2px / 1px / 2px #1f2933 horizontal rules, no vertical lines and no zebra striping. Superscript citations in 12px #2a7ae2. All separation uses 1px #e5e7eb. Page ground #ffffff.
