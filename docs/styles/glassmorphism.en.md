# Glassmorphism — Style Reference

> Optics at night: glass has no color of its own — it borrows, bends and softens whatever light sits behind it.

**Theme:** dark

Glassmorphism is optics, not palette. Real glass is colorless: it takes its color from the content layer and stays neutral itself, which is the one principle every system-level glass treatment shares. The whole system rests on three things. First, a deep-ink night base carrying two or three large soft light blooms — glass must have something to blur. Second, the panel itself uses only 5% to 12% white, paired with 40px to 60px of backdrop-blur and 180% backdrop-saturate. Third, light must have direction — a 1px white inner highlight along the top edge, a 1px dark inner rim along the bottom, and a deep outer shadow; only when all three coexist does the surface gain thickness. The single permitted color is champagne gold, reserved for the primary CTA and the most important figures.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Night Deep | `#060a13` | `--color-night-deep` | The deepest layer, used for the full-screen background and the lowest sections. Glass only reads against it. |
| Night | `#0b1322` | `--color-night` | Default page base. One step brighter than night deep, separating adjacent sections without introducing a second color band. |
| Night Steel | `#16233a` | `--color-night-steel` | Secondary panels and input grounds. For places that need one more layer beneath the glass. |
| Moon Steel | `#33517a` | `--color-moon-steel` | Secondary text, chart contrast and separators. The closest thing night has to a structural line. |
| Moonlight | `#7c9cc4` | `--color-moonlight` | Highlight text, icons and data points. For places that should glow without competing with the primary CTA. |
| Champagne | `#e4b863` | `--color-champagne` | The only accent in the system. Given solely to the primary CTA, key figures and the single most important link. |
| Glass Fill | `rgba(255,255,255,0.08)` | `--color-glass-fill` | Panel fill. Always translucent, never above 15% — beyond that it degrades into a solid block. |

## Typography

### Inter — the only font in the system. Hierarchy comes from weight (400/500/600) and size, not from a second family.

- **Substitute:** SF Pro Display, system-ui, -apple-system, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 14, 16, 24, 40, 64
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Inter | 600 | 64px | 1.05 | -0.02em | `--text-display` |
| heading | Inter | 600 | 40px | 1.15 | -0.01em | `--text-heading` |
| subheading | Inter | 500 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | Inter | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | Inter | 400 | 14px | 1.6 | — | `--text-body` |
| label | Inter | 500 | 12px | 1.4 | 0.14em | `--text-label` |

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
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| panels | 32px |
| buttons | 16px |
| inputs | 14px |
| pills | 999px |

- **Page max-width:** 1280px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 16px

## Components

### Glass Panel

**Role:** every content container: cards, panels, overlays

White 8% fill, 40px backdrop-blur, 180% backdrop-saturate, 1px white 15% border, 24px radius. The shadow must carry all three layers at once: outer 0 16px 40px dark, top inset 0 1px 0 white 22%, bottom inset 0 -1px 0 dark 35%. Padding 32px. On hover the fill rises to 14%, the border to 30%, the shadow steps up to the 64px tier and the panel lifts 2px, transitioning over 500ms cubic-bezier(0.16, 1, 0.3, 1).

- **Sizes:** padding 32px; radius 24px
- **States:** hover: fill 8% to 14%, border 15% to 30%, translateY -2px

### Champagne CTA

**Role:** primary action button; only one allowed per page

Champagne gold fill, deep-ink text, 999px full radius, no border. 16px type, 500 weight, padding 14px 28px. On hover the fill lifts to 92% opacity, the button rises 1px, and a 0 12px 32px gold 25% glow appears, transitioning over the same 500ms easing.

- **Sizes:** padding 14px 28px; radius 999px
- **States:** hover: lift 1px, glow; focus-visible: 2px champagne outline, 2px offset

### Glass Input

**Role:** form inputs and search fields

Transparent ground, 1px white 15% border, 14px radius, no outer shadow. Padding 12px 16px, 14px type, placeholders in moon steel. On focus the border rises to 40% and a 0 0 0 3px white 8% ring appears around the outside, without changing the input's size.

- **States:** focus: border 40%, 3px outer ring

### Stat Tile

**Role:** key figures and dashboard metrics

A lighter cut of the glass panel: white 5% fill, 24px blur, 16px radius, 24px padding. A 12px uppercase 0.14em label in moon steel sits on top; beneath it a 40px weight-600 white figure, with 8px left below for a trend note. The figure itself may not take champagne gold unless it is the page's single accent.

### Night Nav

**Role:** top navigation

72px tall, white 4% fill, 20px blur, only a bottom 1px white 10% border. The wordmark on the left is 16px weight 500; center links are 14px moon steel, turning moonlight on hover; the right side holds one champagne CTA. After scrolling past one viewport, the fill rises to 8%.

## Do's and Don'ts

### Do

- Put light into the background first: deep-ink base plus two or three large soft blooms
- Keep glass panels at 5% to 12% white, never above 15%
- Blur at 40px or more, always stacked with 180% saturation boost
- Shadows must have three layers: deep outer shadow, white inner top highlight, dark inner bottom rim
- Champagne gold, the only accent, goes only to the primary CTA and key figures
- Radius starts at 16px; panels use 24px to 32px
- Transitions stay at 500ms with cubic-bezier(0.16, 1, 0.3, 1)

### Don't

- Don't use purple-pink AI gradient backgrounds (#667eea, #764ba2, #f093fb and the like)
- Don't put glass on a flat solid background — there is nothing to blur
- Don't tint the glass panel itself; color belongs to the background
- Don't use backdrop-blur-sm or any blur under 40px
- Don't drop backdrop-saturate
- Don't use opaque fills (bg-white, bg-black)
- Don't use square corners or radius under 16px
- Don't use a single flat shadow layer
- Don't use fast 100ms–150ms transitions; glass needs to be slow

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Night | `#0b1322` | Page base; every light bloom is painted on it |
| 1 | Glass | `rgba(255,255,255,0.08)` | Standard glass panel |
| 2 | Glass Raised | `rgba(255,255,255,0.14)` | Hover state and overlays that need to sit closer |

## Elevation

- **Glass rest:** `0 16px 40px rgba(3,7,18,0.5), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(2,6,16,0.35)`
- **Glass hover:** `0 24px 64px rgba(3,7,18,0.6), inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(2,6,16,0.35)`

## Imagery

A light source is mandatory. Use night photography, dark product shots, or two to three large radial blooms drawn in pure CSS. Images stay low-saturation, dark, with clear highlight regions — glass needs those highlights to read as refraction. No illustrations, no icon walls, no flat solid backgrounds.

## Layout

12 columns, capped at 1280px. Section gap 128px, panel padding 32px, element gap 16px. Content floats above the blooms: the blooms stay fixed on the background layer and keep their parallax while scrolling. No more than three glass panels per screen — beyond that there is no solid reference left and the glass effect collapses.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#0b1322`
- muted: `#7c9cc4`
- accent: `#e4b863`
- glassFill: `rgba(255,255,255,0.08)`
- glassBorder: `rgba(255,255,255,0.15)`

EXAMPLE COMPONENT PROMPTS:

1. Build a glass panel: background rgba(255,255,255,0.08), backdrop-filter: blur(40px) saturate(180%), 1px border rgba(255,255,255,0.15), radius 24px, padding 32px. Write the shadow as box-shadow: 0 16px 40px rgba(3,7,18,0.5), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(2,6,16,0.35). Page base #0b1322, with two large radial blooms behind the panel (one #33517a, one #e4b863, opacity 0.25).
2. Build a night hero: left column holds a 12px uppercase 0.14em label (#7c9cc4), then a 64px weight-600 heading (#ffffff, -0.02em tracking), then 16px body copy (#7c9cc4, line height 1.6), and at the bottom a champagne fully-rounded button (#e4b863 fill, #060a13 text, padding 14px 28px). The right column holds one glass card; on hover it transitions over 500ms, its fill rising to 14% as it lifts 2px.
