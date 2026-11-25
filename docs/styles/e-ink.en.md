# E-Ink — Style Reference

> Warm paper white carrying ink-dark information, with greyscale and halftone only where grouping is needed.

**Theme:** light

The e-ink style treats reading screens, listings and simple data panels as one restrained printed page: warm paper white as the ground, ink-dark type as the primary level, and four neutral greys for zoning, annotation and charts. What it cares about is aligned numeric columns, short labels, hairline rules and reading order. A local halftone may hint at a selected region or carry a greyscale chart, but body copy always stays solid and high contrast. There is one warm paper ground and nothing outside that one hue; status is expressed with text and shape together. The layout rules for narrow screens, keyboard focus and reduced motion are explicit. This is a visual style reference for browser UI — not an e-paper hardware simulation, and not a claim that any refresh rate or bit depth has been verified.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#20211e` | `--e-ink-text` | Body, headings, primary actions and focus outlines. The heaviest lines and letters. |
| Warm Paper | `#f5f3ea` | `--e-ink-paper` | The page ground and input fill. Not a yellowing filter — all body copy must stay legible on it. |
| Graphite | `#555750` | `--e-ink-muted` | Secondary body copy, chart lines, metadata and short labels. Still required to hold contrast. |
| Rule Gray | `#bab9b0` | `--e-ink-rule` | Card borders, dividers and non-critical grid lines. Never for body copy. |
| Reading Surface | `#e6e4da` | `--e-ink-panel` | Grouped list rows, table rows and the selected reading card. |

## Typography

### Public Sans — reuse the sans already present on the system, keep body copy at a regular weight, cap headings at 700, and introduce no proprietary screen face.

- **Substitute:** Inter, system-ui, sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 13, 16, 20, 28, 36
- **Line height:** 1.2 (display), 1.3 (headings), 1.55 (body)
- **Letter spacing:** -0.02em on display, 0.06em on uppercase labels

### System Mono — dates, times, numbers, units and short statuses. Used only where alignment matters.

- **Substitute:** ui-monospace, SFMono-Regular, Consolas, monospace
- **Weights:** 400, 600
- **Sizes:** 11, 12, 14, 16, 24
- **Line height:** 1.2 (display), 1.35 (headings), 1.45 (body)
- **Letter spacing:** 0 on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Sans | 600 | 36px | 1.2 | -0.02em | `--text-display` |
| heading | Sans | 600 | 28px | 1.3 | -0.01em | `--text-heading` |
| subheading | Sans | 500 | 20px | 1.35 | — | `--text-subheading` |
| body | Sans | 400 | 16px | 1.55 | — | `--text-body` |
| body-compact | Sans | 400 | 13px | 1.5 | — | `--text-body-compact` |
| data | Mono | 600 | 16px | 1.35 | 0 | `--text-data` |
| label | Sans | 600 | 12px | 1.4 | 0.06em | `--text-label` |

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
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| badges | 0 |

- **Page max-width:** 1120px
- **Section gap:** 40px
- **Card padding:** 20px
- **Element gap:** 8px

## Components

### Ink Action

**Role:** the single primary action of the page

An ink fill on the paper ground, zero radius, 12–16px padding. The label is 14px/600; keyboard focus uses a 2px ink outline held 2px clear of the edge. Never add an icon as the only cue.

- **Sizes:** min-height 44px; horizontal padding 12–24px
- **States:** default: ink on paper; hover: panel gray; active: pressed gray; disabled: 60% opacity plus disabled semantics; focus-visible: 2px ink outline

### Reading Row

**Role:** bibliography entries, list items and summary items

Each row is separated by a single 1px hairline; the index and the numbers are monospace. Secondary descriptions wrap rather than shrinking below 12px. A selected row shows both a "current" label and an ink bar on the left.

- **States:** default: paper surface; selected: reading gray, ink rule and label; offline: explicit text plus a hollow marker

### Paper Field

**Role:** search, filters and short text input

Warm paper fill, a 1px neutral border, minimum height 44px; the placeholder keeps a readable grey rather than fading toward invisible. Provide a visible label and a 2px keyboard focus outline.

- **States:** default: paper fill; focus-visible: 2px ink outline; disabled: explicit disabled semantics and 60% opacity

### Halftone Mark

**Role:** sample background texture or limited greyscale chart fill

Reserve the small dot pattern for decorative blocks or chart areas, with a dot pitch of at least 5px; text and interactive elements stay solid so the dots never chew up character edges. When depth is needed, keep the annotation and the legend alongside it.

### Status Marker

**Role:** progress, online state and reminders

A greyscale block paired with a solid or hollow geometric marker, with words like "done" or "offline" beside it. The dot is never the only carrier of state, and errors or warnings never borrow undefined colors.

## Do's and Don'ts

### Do

- Write the purpose of the screen first, then choose the fewest cards, states or data points.
- Keep numeric columns, units and dates aligned; label numbers with their units.
- Give every state both a shape or a word, never color alone.
- Group with hairline rules and local halftone, keeping texture out of the body copy.
- Reserve at least 44px of touch height and obvious keyboard focus for interactive controls.
- On narrow screens merge columns in reading order and keep readable type sizes.
- Label sample data, placeholder images and hardware information clearly as samples or with their source.

### Don't

- Don't present screen captures, sensor readings or demo content as live hardware data.
- Don't put important text inside halftone, background texture or low-contrast grey.
- Don't signal error, warning, offline or selected state with grey shade alone.
- Don't use glow, glass blur, continuous flicker or large gradients.
- Don't assume 1-bit quantization, text sharpening or screen refresh has been done.
- Don't bring in pixel fonts, icons or device brand marks without a confirmed license.

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm Paper | `#f5f3ea` | Page background and long-form reading surface. |
| 1 | Reading Surface | `#e6e4da` | Grouped list rows, static cards and table cells. |
| 2 | Pressed Area | `#bab9b0` | Pressed state, chart marker and secondary rule, with a text or shape cue. |

## Elevation

- **Flat:** `none; use a single divider or offset hatch.`
- **Selected:** `none; use a 2px ink outline and a text marker.`

## Imagery

Prefer whitespace, readable data tables and a few line graphics. Use halftone only for local charts — never copy someone else's brand mark, fonts, device shell or promotional imagery. When a real image needs previewing, confirm the license first and keep the original source.

## Layout

Ordinary desktop content is capped at 1120px; the reading data panel is organized against an 800 × 480 reference proportion and switches to a single column with an explicit reading order on narrow screens. Prefer one or two aligned columns, set key numbers in monospace, and give tables a narrow-screen card or scroll strategy rather than squeezing the body copy.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- ink: `#20211e`
- paper: `#f5f3ea`
- graphite: `#555750`
- rule: `#bab9b0`
- readingSurface: `#e6e4da`

EXAMPLE COMPONENT PROMPTS:

1. Read the repository's existing components and design doc first, then pick only the data rows the target page needs. Use warm paper #f5f3ea, ink #20211e and the greys defined in the spec, adding no new dependencies and no fake sensor data; mark samples clearly as SAMPLE. Use an 800 × 480 panel as the design reference, but the real page still splits into columns on desktop and a single column on mobile. Align numbers, units and dates, and keep texture to chart backgrounds only; offline, warning and selected states each show text or a geometric marker. Give interactive controls a 44px touch height, keyboard focus styles and a prefers-reduced-motion fallback. Unless real hardware is connected and tested, do not claim e-paper, 1-bit thresholds or refresh capability are verified.
2. When implementing sample device status, provide plain HTML sample data rather than a running hardware API. Add a "sample data" marker; each column carries name, value, unit, status and update time; a hairline rule groups them; gauges must not be carried by color or halftone alone. Verify the 390px narrow screen, keyboard order and the reduced-motion preference, and do not overwrite existing repository components.
