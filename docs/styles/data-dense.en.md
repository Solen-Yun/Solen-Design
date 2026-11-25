# Data Dense — Style Reference

> Every pixel carries data: 10 to 12px type, 4px spacing steps, no ornament.

**Theme:** light

Data dense serves operator consoles, and every aesthetic metric is pushed to its minimum: 10 to 12px type, 28px line height, spacing in 4px increments, 4px radius, no shadows or gradients. Its hierarchy rests on three things — alternating row grounds (white and a very pale blue-grey), 1px dividers, and status tag color blocks. Numbers, IDs and code are always monospace and right-aligned, so columns compare vertically. The value is density itself: forty records per screen instead of twelve. Any change that adds whitespace is a regression.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| White | `#ffffff` | `--color-white` | Table and panel ground. Forms the lightest layer against the row tint. |
| Row Tint | `#f8fafc` | `--color-row-tint` | Alternating rows and header grounds. One step down — perceived through repetition. |
| Ink | `#1e293b` | `--color-ink` | Primary text and numbers. Deep slate, still crisp in dense setting. |
| Muted | `#64748b` | `--color-muted` | Headers, secondary columns and captions. Always paired with 10px uppercase. |
| Primary Blue | `#3b82f6` | `--color-primary-blue` | Primary actions, selected rows and focus. The only saturated block allowed in a table. |
| Danger | `#ef4444` | `--color-danger` | Delete and error states, only in text and 10%-ground tags. |
| Success | `#22c55e` | `--color-success` | Growth and completion, equal in area and weight to danger red. |

## Typography

### Inter — the only typeface, topping out at 18px. The 10px uppercase header is this style's identifying mark.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 10, 11, 12, 14, 18
- **Line height:** 1.2 (display), 1.3 (headings), 1.45 (body)
- **Letter spacing:** -0.01em on display, 0.06em on uppercase labels

### JetBrains Mono — numbers, IDs, timestamps and code. Monospace makes vertical comparison possible.

- **Substitute:** ui-monospace, SFMono-Regular, Menlo, monospace
- **Weights:** 400, 500
- **Sizes:** 11, 12, 14
- **Line height:** 1.4 (display), 1.4 (headings), 1.45 (body)
- **Letter spacing:** 0 on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | — | 600 | 18px | 1.3 | — | `--text-heading` |
| body-lg | — | 500 | 14px | 1.45 | — | `--text-body-lg` |
| body | — | 400 | 12px | 1.45 | — | `--text-body` |
| body-sm | — | 400 | 11px | 1.4 | — | `--text-body-sm` |
| label | — | 500 | 10px | 1.3 | 0.06em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 4px |
| buttons | 4px |
| inputs | 4px |
| tags | 4px |

- **Page max-width:** 1600px
- **Section gap:** 16px
- **Card padding:** 12px
- **Element gap:** 4px

## Components

### Data Table

**Role:** the main data table

A 1px #e2e8f0 outer frame, 4px radius, no shadow. The header is 32px tall with a #f8fafc ground and 10px uppercase 0.06em grey text at weight 500. Rows run 28px with 8px 12px padding and alternate on #f8fafc. Numeric columns are monospace and right-aligned; the status column holds color tags. Hovering tints the whole row #eff6ff. Transition 120ms.

- **Sizes:** row 28px; header 32px
- **States:** hover: row #eff6ff

### Action Button

**Role:** inline actions and toolbar buttons

24px tall, padding 4px 10px, 4px radius, 11px/500, no shadow. The primary action is blue-filled with white text; secondary actions are white with a 1px #e2e8f0 stroke; the delete action is red text on a transparent ground. Hover changes only the ground, over 120ms.

- **Sizes:** height 24px; label 11px

### Stat Card

**Role:** the top metric strip

White ground, 1px #e2e8f0 stroke, 4px radius, 10px 12px padding, no shadow. First row a 10px uppercase grey label, second an 18px/600 monospace number, third a 10px delta in green or red. Three or more cards sit in an equal-width row at 12px gaps.

### Status Tag

**Role:** status and category marks

10px/500, 4px radius, padding 2px 6px, no stroke. In-progress uses blue 10% ground with blue 700 text, success green 10% with green 700, failure red 10% with red 700. Color must always accompany a text label — never hue alone.

### Admin Rail

**Role:** the left navigation

192px wide, #f8fafc ground, 1px #e2e8f0 right border, 12px vertical padding. Items 26px tall, 4px radius, 12px text, 14px icons. The selected item is blue-filled with white text; hover shows a white ground with ink text. Group labels are 10px uppercase grey with 12px space above.

## Do's and Don'ts

### Do

- Set type at 10 to 12px, topping out at 18px
- Space in 4px increments
- Fix the row height at 28px
- Right-align numbers and IDs in monospace
- Layer with alternating row grounds and 1px lines
- Pair every status color with a text label

### Don't

- Don't use padding above 16px
- Don't use radius above 8px
- Don't shadow tables
- Don't use decorative gradients
- Don't add whitespace for looks
- Don't convey status through hue alone

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | Tables and panels |
| 1 | Row Tint | `#f8fafc` | Alternating rows and headers |
| 2 | Rail | `#f8fafc` | Left navigation |

## Elevation

- **None:** `none — 1px borders only`

## Imagery

Almost no images. Avatars 20px, icons 14px and mini trend charts (no taller than 24px) are allowed. No large images, illustration or background textures — they directly cut the number of visible rows.

## Layout

A 192px left nav plus a content area capped at 1600px with 16px padding. A 12px-gapped metric strip sits on top, the table below fills the remaining height. All spacing is a multiple of 4, row height is fixed at 28px, and the screen targets 35+ rows.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1e293b`
- background: `#ffffff`
- rowTint: `#f8fafc`
- accent: `#3b82f6`
- muted: `#64748b`
- border: `#e2e8f0`

EXAMPLE COMPONENT PROMPTS:

1. Build a data table: outer frame 1px #e2e8f0, 4px radius, no shadow. Header 32px tall on a #f8fafc ground with 10px uppercase 0.06em #64748b. Rows 28px tall with 8px 12px padding, alternating row ground #f8fafc, the whole row turning #eff6ff on hover. Numeric columns use font-variant-numeric: tabular-nums and are right-aligned; the status column uses 10px tags (10% ground + solid text, 4px radius, padding 2px 6px).
