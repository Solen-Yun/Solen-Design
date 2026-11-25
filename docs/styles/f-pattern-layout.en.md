# F-Pattern Layout — Style Reference

> Typeset along the eye's path: one sweep across the top, another below, then straight down the left edge.

**Theme:** light

The F-pattern comes from eye-tracking research: readers sweep horizontally across the top, sweep again a little lower, then skim vertically down the left edge — tracing an F. So the most important information goes in the top two lines, keywords go at the start of each sentence, and line width is pressed to 65 to 75 characters. Visually it must stay quiet: white ground, dark headings, minimal accent — any decoration breaks the scan. Its value is not beauty but letting one screen carry 30% more reading — ideal for docs, blogs, news lists and long explainers.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1a1a2e` | `--color-ink` | Headings and body. Deep but not black; comfortable for long reads. |
| Paper | `#f8f9fa` | `--color-paper` | Page ground. A very light cool white, maximizing text contrast. |
| Vermilion | `#e63946` | `--color-vermilion` | The single high accent, for key conclusions and words that must be scanned. |
| Steel Blue | `#457b9d` | `--color-steel-blue` | Links and secondary headings; secondary during the scan but still visible. |
| Pine | `#2a9d8f` | `--color-pine` | Success and "actionable" hints; infrequent. |
| Sand | `#e9c46a` | `--color-sand` | Inline highlights, marking the key phrase within a passage. |

## Typography

### Inter — the only font on the site. Hierarchy is built from four sizes and two weights, not from color.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 28, 36
- **Line height:** 1.15 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** -0.02em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 36px | 1.15 | -0.02em | `--text-display` |
| heading-lg | — | 700 | 28px | 1.25 | -0.01em | `--text-heading-lg` |
| heading | — | 600 | 20px | 1.35 | — | `--text-heading` |
| body-lg | — | 400 | 16px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.7 | — | `--text-body` |
| label | — | 600 | 12px | 1.4 | 0.06em | `--text-label` |

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
| cards | 8px |
| buttons | 6px |
| inputs | 6px |
| tags | 4px |

- **Page max-width:** 760px
- **Section gap:** 48px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Scan Header

**Role:** the page-top title area (the F's top bar)

A 36px/700 single-line title no wider than 34 characters; beneath it a 16px lead of at most two lines; beneath that a 1px #e2e8f0 rule. The whole block aligns left with 48px top padding. Keywords land within the first three words of the title.

### Scan Row

**Role:** the horizontal scan row (the F's middle bar)

Three to four items side by side, each with a 12px uppercase label on top, a 20px/600 title in the middle and a 14px summary below (two lines at most). 32px between items, the whole row no taller than 160px. Left-aligned, never centered.

### Article List

**Role:** the vertical list (the F's stem)

Each row carries a 2px-wide, 48px-tall accent bar on the left (vermilion, steel blue or pine), with a 16px/600 title and 14px summary to its right. Rows are 88px tall with 1px #e2e8f0 separators. On hover the bar widens to 4px and the ground turns white.

- **States:** hover: bar 2px→4px, ground white

### Inline Highlight

**Role:** inline highlights and keyword marks

A pale sand ground (35% of #e9c46a), no radius, padding 0 2px, inline only, never bold. No more than three highlights per article, or the scan loses its anchors.

### Measure Column

**Role:** the body-width container

Maximum width 760px; body line width held to 65 to 75 characters (about 34em). Left padding 0, right padding left to whitespace; 20px between paragraphs, no first-line indent. Centering the body is forbidden.

## Do's and Don'ts

### Do

- Put keywords within the first three words of a title
- Hold body line width at 65 to 75 characters
- Let the first sentence of each paragraph carry the conclusion
- Reserve accent color for words that must be scanned
- Keep the important content top-left
- Improve scannability with heading levels, lists and paragraphs

### Don't

- Don't put important content in the bottom-right
- Don't center long passages
- Don't ignore content priority
- Don't write long unbroken text
- Don't leave excessive whitespace on the left
- Don't use more than three highlights

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#f8f9fa` | Page ground |
| 1 | White Card | `#ffffff` | List items and quote blocks |

## Elevation

- **None:** `none — separation comes from rules and spacing`
- **Card hover:** `0 2px 8px rgba(26,26,46,0.06)`

## Imagery

Text leads; images must serve the scan: charts, screenshots, thumbnails (uniformly 16:10). No decorative hero images or background images — they cut the F's path.

## Layout

A single column capped at 760px with 24px container padding and 48px section gaps. The page structure is fixed: top bar (title plus lead) → middle bar (three to four items) → stem (the list). Important content always sits top-left; the bottom-right only holds secondary information.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1a2e`
- background: `#f8f9fa`
- accent: `#e63946`
- link: `#457b9d`
- success: `#2a9d8f`
- highlight: `#e9c46a`

EXAMPLE COMPONENT PROMPTS:

1. Build an F-pattern article page: a single column capped at 760px, body 16px/1.7, 34em line width, left-aligned. The top holds a 36px/700 title (keywords in the first three words), a two-line lead and a 1px #e2e8f0 rule; the middle holds a three-column scan row (each column a 12px uppercase label, a 20px/600 title and a 14px two-line summary); the bottom is the article list — each row with a 2px accent bar (48px tall) on the left and a 16px/600 title with a 14px summary on the right, rows separated by 1px rules.
2. Build an inline highlight: a pale sand ground (35% of #e9c46a), no radius, padding 0 2px, inline only, never bold — at most three per article.
