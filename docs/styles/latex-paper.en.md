# Academic Paper — Style Reference

> The proportions of Computer Modern, the hierarchy of numbering, the restraint of three-line tables: a sheet of paper.

**Theme:** light

The academic-paper style carries the vocabulary of scholarly typesetting onto the web: serif throughout with tightened tracking to echo the classic math serif, headings numbered 1 and 1.1, an abstract as a narrow block indented on both sides with a centered small heading, theorems on a pale ground or with a 2px left rule and a bold label over italic body text, tables as academic booktabs (a heavy top and bottom rule with a thin rule under the header, never vertical lines or zebra striping), and links in a uniform paper-link blue. Colored big buttons, gradients, sans body copy, rounded corners, shadows and decorative figures are banned — paper is flat, and hierarchy rests only on horizontal rules and whitespace.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#111111` | `--color-ink` | Body, headings and the heavy rules of three-line tables. Printing black. |
| White | `#ffffff` | `--color-white` | The sheet. Pure white, never yellowed. |
| Hyperref Blue | `#0b5394` | `--color-hyperref-blue` | Links and cross-references — the only color permitted. |
| Theorem Ground | `#f5f5f0` | `--color-theorem-ground` | The pale ground of theorem environments and code blocks. |
| Muted Grey | `#6b6b66` | `--color-muted-grey` | Figure captions, metadata and reference details. |
| Rule Grey | `#d4d4d0` | `--color-rule-grey` | The thin header rule and the very secondary dividers. |

## Typography

### Latin Modern Roman — serif throughout, headings tightened to echo Computer Modern. Body line height 1.55, a touch looser than print to suit screens.

- **Substitute:** 'Computer Modern', 'Source Serif', Georgia, serif
- **Weights:** 400, 700
- **Sizes:** 12, 14, 17, 20, 26, 34
- **Line height:** 1.2 (display), 1.3 (headings), 1.55 (body)
- **Letter spacing:** -0.01em on display, 0.04em on uppercase labels

### Latin Modern Mono — code, equation numbers and algorithm blocks. Monospace appears only in code, never in body copy.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400
- **Sizes:** 12, 13
- **Line height:** 1.4 (display), 1.4 (headings), 1.5 (body)
- **Letter spacing:** 0 on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Latin Modern Roman | 700 | 34px | 1.2 | -0.01em | `--text-display` |
| heading | Latin Modern Roman | 700 | 26px | 1.25 | — | `--text-heading` |
| subheading | Latin Modern Roman | 700 | 20px | 1.3 | — | `--text-subheading` |
| body-lg | Latin Modern Roman | 400 | 17px | 1.55 | — | `--text-body-lg` |
| body | Latin Modern Roman | 400 | 14px | 1.55 | — | `--text-body` |
| label | Latin Modern Roman | 700 | 12px | 1.4 | 0.04em | `--text-label` |

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

- **Page max-width:** 700px
- **Section gap:** 48px
- **Card padding:** 16px
- **Element gap:** 12px

## Components

### Numbered Section

**Role:** numbered sub-section headings

Formatted as "1 引言" and "1.1 背景", with a 12px gap between the number and the title (never a tab). Level one is 26px/700, level two 20px/700, both serif with tight tracking. Numbers do not indent; the title and number align left.

### Theorem Block

**Role:** the theorem environment

Pale ground #f5f5f0 (or a white ground with a 2px ink left rule), zero radius, 12px 16px padding, no shadow. The label is 12px/700 roman (like "定理 1"), the body 14px italic serif at line height 1.55, with one space between label and body.

### Booktabs Table

**Role:** the three-line table

A 2px ink rule on top, a 1px ink (or #d4d4d0) rule under the header, a 2px ink rule at the bottom; cells padded 4px 12px in 14px serif, numeric columns right-aligned. Vertical lines and zebra striping are never allowed. The caption sits above the table, formatted "表 1：".

### Abstract Block

**Role:** the abstract

Maximum width 36rem, 32px of padding on each side, centered. Above it a 12px/700 centered small heading "摘要"; the body is 14px serif at line height 1.6, justified (text-align: justify).

### Reference Entry

**Role:** the reference entry

14px serif at line height 1.5 with a hanging indent (padding-left: 1.5em paired with text-indent: -1.5em), entries numbered in square brackets like [1]. Eight pixels between entries. Authors and years are never bolded — the list stays flat.

## Do's and Don'ts

### Do

- Set serif throughout with tight heading tracking
- Number sub-sections 1 and 1.1
- Build tables as booktabs three-line tables
- Use a uniform hyperref blue for links
- Set theorems on a pale ground or a left rule
- Keep zero radius and zero shadow

### Don't

- Don't add vertical lines or zebra striping to tables
- Don't use colored big buttons or gradients
- Don't use sans body copy
- Don't use any rounded corners
- Don't use shadows
- Don't use decorative figures or emoji

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | The sheet |
| 1 | Theorem Ground | `#f5f5f0` | Theorems and code blocks |

## Elevation

- **None:** `none — paper is flat`

## Imagery

Figures may appear only as numbered captions: line charts, bar charts and diagrams in black and white or low saturation. The caption sits below the figure, 14px muted grey, formatted "图 1：". No decorative illustration, emoji, large color images, or any uncaptioned image.

## Layout

A 700px text block, centered, justified. Section gaps 48px with 32px above headings. Single column, symmetric margins. All separation uses horizontal rules — never color blocks or shadows.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#111111`
- background: `#ffffff`
- link: `#0b5394`
- theorem: `#f5f5f0`
- muted: `#6b6b66`
- rule: `#d4d4d0`

EXAMPLE COMPONENT PROMPTS:

1. Build an academic-paper page: a 700px centered text block, serif throughout (Latin Modern Roman or Source Serif), body 14px at line height 1.55, justified. Headings numbered 1 / 1.1 with a 12px gap between number and title, at 26px and 20px weight 700. The abstract is a 36rem narrow block, centered, with a 12px centered small heading above. Tables use booktabs: a 2px #111 top rule, a 1px #d4d4d0 header rule, a 2px #111 bottom rule, never vertical lines. Link color #0b5394. Zero radius, zero shadow.
