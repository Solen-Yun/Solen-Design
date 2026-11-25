# Split Layout — Style Reference

> Two blocks each take half the viewport; contrast creates the tension, balance keeps it easy on the eyes.

**Theme:** light

Split layout cuts the viewport in half with a seam and places mirrored content on each side: image and text, old and new, question and answer. Its rules are all balance problems — the two sides must never be identical (that's a meaningless split), visual weight must not skew severely (one side full, the other empty), reading order must not be cut by the seam, and the divider must not shout. Mobile must abandon the split and stack vertically, otherwise each side is only 180px wide. Asymmetric splits (40:60) are allowed to express priority.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#0f0f0f` | `--color-ink` | Background and text of the dark side. Builds the maximum contrast between the halves. |
| White | `#ffffff` | `--color-white` | Background of the light side. Paired with ink to form the page's basic tension. |
| Red | `#ff4757` | `--color-red` | Accent of the "after"/"new" side, opposed to blue. |
| Green | `#2ed573` | `--color-green` | Positive outcomes and successful comparisons. |
| Blue | `#1e90ff` | `--color-blue` | Accent of the "before"/"old" side, opposed to red. |
| Amber | `#ffa502` | `--color-amber` | Differences that need attention, and highlights. |

## Typography

### Inter — the only typeface. Titles on both sides must match in level and size, or the visual weight tips.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 700
- **Sizes:** 12, 14, 16, 22, 32, 44
- **Line height:** 1.1 (display), 1.2 (headings), 1.55 (body)
- **Letter spacing:** -0.02em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 44px | 1.1 | -0.02em | `--text-display` |
| heading | — | 700 | 32px | 1.2 | — | `--text-heading` |
| subheading | — | 500 | 22px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.55 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.08em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 16px |
| buttons | 8px |
| inputs | 8px |

- **Page max-width:** 1440px
- **Section gap:** 0px
- **Card padding:** 48px
- **Element gap:** 24px

## Components

### Split Panel

**Role:** split container

grid-template-columns takes 1fr 1fr (symmetric) or 0.8fr 1.2fr (asymmetric), min-height 100vh (hero) or 600px (content areas). Each side gets 48px padding, vertically centered content, single column, lines no wider than 34em. The seam is a 1px line at 10% ink — or simply 48px of whitespace.

- **Sizes:** 100vh hero; 600px content

### Contrast Pair

**Role:** the paired content on both sides

The sides must contrast, not repeat: image vs text, dark vs light, question vs answer. Labels ("before", "after") use 12px uppercase with 0.08em spacing, blue and red respectively. Titles on both sides must share the same size.

### Split CTA

**Role:** each side's own action

8px radius, 16px/500, 12px 24px padding. The dark side uses a white button with ink text; the light side uses an ink button with white text — buttons must invert against their side, or the sense of separation collapses. On hover change brightness only, never position.

### Seam Divider

**Role:** the seam

Prefer whitespace (a 48px gap) over a line. When a line is needed, use 1px ink at 10%, not full height (15% inset top and bottom), so the page doesn't read as two unrelated posters.

### Compare Row

**Role:** comparison rows (the structure mobile keeps)

Mobile drops the side-by-side split for vertical stacking, but the contrast must survive: each item keeps a 12px label above it ("before", "after") with matching colors (blue vs red). Stack order follows reading order.

## Do's and Don'ts

### Do

- Make the two sides contrast
- Keep titles on both sides the same size
- Allow 40:60 asymmetric splits
- Prefer whitespace for the seam
- Invert buttons against their side
- Stack to one column on mobile and keep the labels

### Don't

- Don't make both sides identical
- Don't keep the split on mobile
- Don't let visual weight skew severely
- Don't cut the reading order
- Don't let the divider shout
- Don't move buttons on hover

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Ink Half | `#0f0f0f` | The dark side |
| 1 | White Half | `#ffffff` | The light side |
| 2 | Image Half | `full-bleed photo` | The imagery side |

## Elevation

- **Panel:** `0 12px 32px rgba(15,15,15,0.10)`
- **Button:** `0 4px 12px rgba(15,15,15,0.15)`

## Imagery

One high-contrast photo or screenshot takes a side; the other side is text or a solid block. Image ratios are fixed (1:1 or 4:5) — cropping allowed, stretching not. Never place imagery on both sides symmetrically unless the two images form a clear contrast.

## Layout

1440px cap; the hero is a 100vh split. Content areas may use 40:60 asymmetry for priority. The seam aligns to the page grid. Below 768px it stacks to one column and each side's padding drops to 24px.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope, based on the pages, tasks and real content in the user's request; flag missing business information instead of inventing data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features that weren't requested.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop while preserving hierarchy and avoiding accidental horizontal overflow.
- Handle keyboard focus and reduced motion for the interactions you touch; add disabled, loading, empty and error states where they apply.
- When finished, run the project's existing checks and report only the tests and visual inspections you actually ran, listing what remains unverified.

QUICK COLOR REFERENCE:

- text: `#0f0f0f`
- dark: `#0f0f0f`
- light: `#ffffff`
- before: `#1e90ff`
- after: `#ff4757`
- muted: `#6b7280`

EXAMPLE COMPONENT PROMPTS:

1. Build a split hero: outer grid with two columns, min-height 100vh. The left half is #0f0f0f with a 12px uppercase 0.08em #1e90ff label (BEFORE), a 44px/700 white title and a 16px paragraph, plus a white button with ink text at the bottom. The right half is white with the label in #ff4757 (AFTER), the same-size title in ink, and an ink button with white text. Each side gets 48px padding, content vertically centered. On mobile it stacks to one column in reading order.

## Quick Start

```css

:root {
  /* Colors */
  --color-ink: #0f0f0f;
  --color-white: #ffffff;
  --color-red: #ff4757;
  --color-green: #2ed573;
  --color-blue: #1e90ff;
  --color-amber: #ffa502;

  /* Typography — Font Families */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-display: 44px;
  --leading-display: 1.1;
  --tracking-display: -0.02em;
  --text-heading: 32px;
  --leading-heading: 1.2;
  --text-subheading: 22px;
  --leading-subheading: 1.3;
  --text-body-lg: 16px;
  --leading-body-lg: 1.55;
  --text-body: 14px;
  --leading-body: 1.55;
  --text-label: 12px;
  --leading-label: 1.4;
  --tracking-label: 0.08em;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 8px;
  --spacing-8: 8px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-96: 96px;

  /* Layout */
  --page-max-width: 1440px;
  --section-gap: 0px;
  --card-padding: 48px;
  --element-gap: 24px;
  --density: comfortable;

  /* Border Radius */
  --radius-cards: 16px;
  --radius-buttons: 8px;
  --radius-inputs: 8px;

  /* Surfaces */
  --surface-ink-half: #0f0f0f;
  --surface-white-half: #ffffff;
  --surface-image-half: full-bleed photo;
}

```
