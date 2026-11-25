# Oversized Typography — Style Reference

> The type is the layout: clamp() lets it fill the width as the viewport moves, and everything else retreats.

**Theme:** light

Oversized typography is the mainstream vocabulary of design portfolios around 2026: headings scale continuously with the viewport via clamp(3rem, 12vw, 10rem) and fill the width, so the name and the claim are the hero and imagery demotes to an accent. Navigation, captions and metadata are uniformly small monospace uppercase with wide tracking, producing an extreme contrast in scale. The palette has only three steps — near-black (#0a0a0a), warm white (#fafaf8) and international orange (#ff4d00); no color may appear outside the orange. Gradients are banned, stacks of rounded cards are banned, shadows are banned, and decorative icons replacing text are banned — hierarchy rests only on size, weight and whitespace.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#0a0a0a` | `--color-ink` | Text and hairlines. An extremely deep black, strongest contrast on warm white. |
| Warm White | `#fafaf8` | `--color-warm-white` | Page ground. A faintly warm white that keeps large type from reading cold. |
| International Orange | `#ff4d00` | `--color-international-orange` | The only accent: one word, one line, one button. Never a second semantic use. |
| Mid Grey | `#71717a` | `--color-mid-grey` | Metadata, captions and small footer type. |
| Rule Grey | `#e4e4e7` | `--color-rule-grey` | Hairline dividers and the lightest section grounds. |
| Off Black | `#18181b` | `--color-off-black` | Inverted section grounds, one step above ink. |

## Typography

### Inter — sans, headings at 900 compressed to line height 0.85 with -0.05em tracking; sizes scale continuously with clamp(3rem, 12vw, 10rem).

- **Substitute:** 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 900
- **Sizes:** 12, 16, 24, 48, 96, 160
- **Line height:** 0.85 (display), 0.9 (headings), 1.5 (body)
- **Letter spacing:** -0.05em on display, 0.2em on uppercase labels

### JetBrains Mono — navigation, captions and metadata in 11 to 12px monospace uppercase at 0.2em, an order of magnitude opposite the big headings.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400
- **Sizes:** 11, 12
- **Line height:** 1.5 (display), 1.5 (headings), 1.5 (body)
- **Letter spacing:** 0.2em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Inter | 900 | 160px | 0.85 | -0.05em | `--text-display` |
| heading | Inter | 900 | 96px | 0.88 | -0.04em | `--text-heading` |
| subheading | Inter | 500 | 48px | 1.05 | -0.03em | `--text-subheading` |
| body-lg | Inter | 400 | 24px | 1.4 | — | `--text-body-lg` |
| body | Inter | 400 | 16px | 1.5 | — | `--text-body` |
| label | JetBrains Mono | 400 | 11px | 1.5 | 0.2em | `--text-label` |

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
| 160 | 160px | `--spacing-160` |
| 240 | 240px | `--spacing-240` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1600px
- **Section gap:** 160px
- **Card padding:** 24px
- **Element gap:** 24px

## Components

### Fluid Headline

**Role:** the fluid oversized headline (core)

font-size: clamp(3rem, 12vw, 10rem), weight 900, line height 0.85, -0.05em tracking, left-aligned and filling the container's width. One word may turn international orange or become outlined type with -webkit-text-stroke (as a second line). Never a fixed size — fixed sizes overflow on narrow screens and look small on wide ones.

- **Sizes:** clamp(3rem, 12vw, 10rem)

### Mono Label

**Role:** the monospace small label

11 to 12px monospace, uppercase, 0.2em tracking, mid grey or ink. Used for navigation, section numbers (01 / 02), metadata and footers. It is the only type size besides the big headings; no middle third tier may appear.

### Hairline Section

**Role:** the hairline section divider

Sections divide with a 1px ink 15% border-top plus 160px of vertical whitespace. Never shadows or color blocks — separation and whitespace are the whole mechanism.

### Orange Arrow

**Role:** the international-orange action mark

International-orange fill, white text, zero radius, 16px/500, padding 14px 28px. More commonly: a line of international-orange text plus a right arrow (→); the arrow only ever subordinates the text, never appears alone.

### Index Row

**Role:** the work index row

Each row divides with a 1px ink 15% bottom border and splits into four segments: number (monospace 11px), project name (48px/500), category (monospace 11px), year (monospace 11px). On hover the whole row's text turns international orange, without the project name changing size or moving.

## Do's and Don'ts

### Do

- Scale headings continuously with clamp()
- Use only near-black, warm white and international orange
- Set all small type as monospace uppercase at 0.2em
- Separate sections with a hairline plus 160px of whitespace
- Keep zero radius and zero shadow
- Allow outlined type as a second line

### Don't

- Don't use gradient backgrounds or gradient text
- Don't pile up rounded cards
- Don't use any shadow
- Don't introduce a second accent color
- Don't substitute decorative icons for text
- Don't give headings a fixed size

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm White | `#fafaf8` | Page ground |
| 1 | Off Black | `#18181b` | Inverted sections |

## Elevation

- **None:** `none — hierarchy comes from size alone`

## Imagery

Imagery demotes to accent: small, single, borderless. Work screenshots and portraits are allowed. No large banners or gallery grids — any image must carry less visual weight than the type.

## Layout

Capped at 1600px with 32px container padding and 160px section gaps. The hero holds only one enormous name or claim, filling more than 60% of the viewport. Navigation is fixed to the top, extremely thin, monospace small type only. Whitespace is the primary compositional device.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#0a0a0a`
- background: `#fafaf8`
- accent: `#ff4d00`
- muted: `#71717a`
- rule: `#e4e4e7`
- dark: `#18181b`

EXAMPLE COMPONENT PROMPTS:

1. Build an oversized-typography hero: warm-white #fafaf8 ground with ink #0a0a0a type. The heading uses font-size: clamp(3rem, 12vw, 10rem), weight 900, line height 0.85, -0.05em tracking, left-aligned and filling the width, with one word in international orange #ff4d00. The navigation above uses 11px monospace uppercase at 0.2em in #71717a. Sections separate with a 1px rgba(10,10,10,0.15) border-top plus 160px of whitespace. Zero radius, zero shadow, no gradients sitewide — only three colors plus two greys.
