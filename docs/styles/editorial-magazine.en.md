# Editorial Magazine — Style Reference

> A serif magazine layout on warm cream paper; order comes from whitespace and a single hairline, not from column decoration.

**Theme:** light

The editorial style comes from print media: the layout language of high-end magazines and newspapers. It puts all expressiveness into type-size steps, serif headings and the breathing room of whitespace, while color recedes to one soft ink black and one warm cream ground. Hierarchy is built with opacity (text /60 and /40, borders /10) and letter spacing (tight for headings, wide for labels); depth comes from whitespace and 1px hairlines — no shadows, no radius, no gradients. The whole system has a single warm accent, kept under 2% of any screen, used only for quote marks and selection states.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1c1c1c` | `--color-ink` | Body, headings, 1px borders and the ground of inverted blocks. The only dark on the site; it replaces pure black to keep the print feel from turning harsh. |
| Paper | `#f9f8f6` | `--color-paper` | Page canvas. Every default background uses it — closer to paper than cool white, and easier on the eyes for long reads. |
| Graphite | `#6b7280` | `--color-graphite` | Secondary text, captions, dates and auxiliary notes. Use it when hierarchy needs to recede, instead of shrinking the type. |
| Mauve | `#816d70` | `--color-mauve` | The single warm accent. Appears only on quote marks and selection states, never more than 2% of a screen. |

## Typography

### serif — all headings, quotes and figures. The serif is the style's core identity; without it only a page of grey text remains.

- **Substitute:** Georgia, 'Times New Roman', 'Songti SC', serif
- **Weights:** 400, 500
- **Sizes:** 28, 36, 48, 60, 72
- **Line height:** 1.05 (display), 1.15 (headings), 1.7 (body)
- **Letter spacing:** -0.02em on display, 0.2em on uppercase labels

### sans-serif — body, buttons, labels and navigation. Always paired with the serif headings; it carries all functional text.

- **Substitute:** Inter, system-ui, -apple-system, sans-serif
- **Weights:** 400, 500, 700
- **Sizes:** 12, 14, 16
- **Line height:** 1.05 (display), 1.2 (headings), 1.7 (body)
- **Letter spacing:** -0.01em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | serif | 400 | 72px | 1.05 | -0.02em | `--text-display` |
| heading-lg | serif | 400 | 48px | 1.1 | -0.02em | `--text-heading-lg` |
| heading | serif | 400 | 36px | 1.2 | -0.01em | `--text-heading` |
| subheading | serif | 400 | 28px | 1.3 | — | `--text-subheading` |
| body-lg | sans-serif | 400 | 16px | 1.7 | — | `--text-body-lg` |
| body | sans-serif | 400 | 14px | 1.7 | — | `--text-body` |
| label | sans-serif | 500 | 12px | 1.4 | 0.2em | `--text-label` |

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
| 128 | 128px | `--spacing-128` |
| 160 | 160px | `--spacing-160` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| images | 0 |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 8px

## Components

### Contrast Lockup Button

**Role:** primary action button, e.g. Read Story, Subscribe

Ink fill, warm paper text, 1px ink border, square corners. 12px type, weight 500, uppercase, 0.2em tracking; padding 16px 32px. On hover the fill and text swap, transitioning over 200ms.

- **Sizes:** padding 16px 32px; label 12px
- **States:** rest: ink on paper inverted; hover: paper fill, ink text; focus-visible: 2px ink outline, 2px offset

### Underline Text Link

**Role:** secondary actions and navigation, e.g. View All

No fill, no border, 12px uppercase 0.2em tracking. The underline is a 1px current-color line that starts as scale-x 0 from the right and expands from the left to 1 on hover, over 500ms with cubic-bezier(0.16, 1, 0.3, 1).

- **States:** hover: underline scale-x 0 to 1; focus-visible: 2px outline, no underline

### Hairline Card

**Role:** article cards and list items

A 1px ink /10 rule on top, padding-top 24px, no radius, no shadow, no background. On hover the rule deepens to /40 over 500ms; inner images scale slowly to 1.02 over 600ms.

- **States:** hover: rule /10 to /40, image 1 to 1.02

### Section Label

**Role:** section categories and column names

12px uppercase, 0.2em tracking, graphite; preceded by a 24px long, 1px wide ink rule with 12px between rule and text. No decoration beyond the uppercase.

### Pull Quote

**Role:** in-paragraph quote emphasis

28 to 36px serif italic, line height 1.3, indented 24px on both sides, a 2px ink rule on the left, 32px of whitespace above and below. Quote marks use mauve at 1.5 times the body size.

## Do's and Don'ts

### Do

- Pair serif headings with sans-serif body; the two always appear together
- Build greys from opacity: text /60 and /40, borders /10, instead of introducing new colors
- Keep section gaps at least 96px, container padding 24px to 48px
- Labels are uniformly 12px uppercase with 0.2em tracking, never bold
- Italic is only for subtitles and quotes, never for inline emphasis
- Interaction uses only underline expansion and color inversion, around 500ms

### Don't

- Don't introduce other color accents. Only mauve #816d70 is allowed, for quote marks and selection states, under 2% of a screen
- Don't express hierarchy with shadows; depth comes only from whitespace and 1px lines
- Don't use pure black #0a0a0a or cool white #fafafa as the main colors
- Headings must never use a sans-serif face
- Don't use any border radius, including cards, buttons and inputs
- Don't use gradients, background patterns or decorative geometry
- Don't stack elements; prefer leaving another screen of white

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#f9f8f6` | Default page canvas |
| 1 | Ink Band | `#1c1c1c` | Inverted blocks: footer, CTA strip, quote section |

## Elevation

- **None:** `none`
- **Hairline:** `1px solid rgba(28,28,28,0.1)`

## Imagery

Photography first: low saturation, warm tones, full-bleed crops; people and still life both work, but it must read as a magazine spread. No illustration, graphic patterns or icon systems; when a diagram is needed, use a 1px ink wireframe to keep the paper feel.

## Layout

Single column capped at 1200px with an inner 8-column grid. The hero is a 45/55 split (text / image); body sections are single or two columns with 48px gutters. Section gaps run 96 to 128px, container padding 24px (mobile) to 48px (desktop). Reading width stays within 34em; beyond that, break the line. No dense layouts beyond three columns.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1c1c1c`
- background: `#f9f8f6`
- muted: `#6b7280`
- accent: `#816d70`
- border: `rgba(28,28,28,0.1)`

EXAMPLE COMPONENT PROMPTS:

1. Build a magazine hero: a 1200px container; the left 45% holds a 12px uppercase 0.2em graphite section name with a 24px rule, then a 72px serif heading (line height 1.05, tracking -0.02em, ink), then a 16px sans-serif intro (line height 1.7, max width 34em), and at the bottom an ink-filled square button (12px uppercase 0.2em, padding 16px 32px). The right 55% holds a low-saturation warm full-bleed photo, square corners, no shadow.
2. Build an article list: each row has a 1px rgba(28,28,28,0.1) rule on top with 24px padding above and 64px between rows. Inside a row: a 48px graphite date on the left (12px uppercase 0.2em), and on the right a 28px serif title with 14px sans-serif summary (line height 1.7, color #6b7280), summaries capped at two lines. On hover the rule deepens to rgba(28,28,28,0.4) over 500ms.
