# Japanese Fresh — Style Reference

> 「間」(Ma) is the primary design tool: whitespace outweighs elements, and weight never reaches 400.

**Theme:** light

The Japanese-fresh style is built on the concept of Ma — the emptiness between elements matters as much as, or more than, the elements. So its first parameter is whitespace: 128 to 160px between sections, 32px minimum between elements. The second is lightness: all text sits at weight 200 or 300 — never bold, never uppercase, because uppercase is offensive in this language. The third is thinness: borders are only 1px at 30% opacity, there are no visible shadows, elements float on the paper without weight. Motion runs 500ms, slow as breathing.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Pale Blue | `#64b5f6` | `--color-pale-blue` | The only color accent, for links and icons. Must appear small and desaturated. |
| Paper | `#fafaf8` | `--color-paper` | The page canvas. Softer than pure white, close to washi paper. |
| Warm Line | `#d4d4cf` | `--color-warm-line` | Every separator. Used only at 30% opacity, never a cold grey. |
| Mint | `#98d8c8` | `--color-mint` | Botanical and nature semantics, for icon grounds and tags. |
| Sakura | `#ffb7c5` | `--color-sakura` | A seasonal soft accent, the least frequent of all. |
| Mist Blue | `#b8d4e3` | `--color-mist-blue` | Information and sky semantics, one step lighter than the primary. |

## Typography

### Inter — the only typeface, weights 200 and 300 only. Line height 1.9, tracking slightly open, never uppercase, never bold.

- **Substitute:** 'Hiragino Sans', 'PingFang SC', system-ui, sans-serif
- **Weights:** 200, 300
- **Sizes:** 12, 14, 16, 20, 26, 32
- **Line height:** 1.3 (display), 1.45 (headings), 1.9 (body)
- **Letter spacing:** 0.02em on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 200 | 32px | 1.3 | 0.02em | `--text-display` |
| heading | — | 300 | 26px | 1.4 | — | `--text-heading` |
| subheading | — | 300 | 20px | 1.5 | — | `--text-subheading` |
| body-lg | — | 300 | 16px | 1.9 | — | `--text-body-lg` |
| body | — | 300 | 14px | 1.9 | — | `--text-body` |
| label | — | 300 | 12px | 1.6 | 0.1em | `--text-label` |

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
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| icons | 999px |

- **Page max-width:** 960px
- **Section gap:** 160px
- **Card padding:** 32px
- **Element gap:** 32px

## Components

### Quiet Link

**Role:** links and secondary actions

No fill, no border, 14px/300, 0.02em tracking; the only hint is a 1px warm-grey line (30% opacity) beneath the text. On hover the line rises to 60% and the text turns pale blue, over 500ms. No shift, no scale.

- **States:** hover: line 60%, text pale blue

### Ma Card

**Role:** content cards and work cards

Paper-white fill (nearly the same as the page), 12px radius, 1px warm-grey line at 30%, 32px padding, no shadow. Title 26px/300, body 14px/300 at line height 1.9. On hover the border rises to 60% — no shadow, no lift.

### Line Input

**Role:** form inputs

Transparent ground, only a bottom 1px warm-grey line at 30%, no left or right borders, 8px radius, padding 8px 4px, 14px/300 text. On focus the underline turns pale blue and stays 1px — no outer ring, no background change.

### Botanical Accent

**Role:** botanical line-art decoration

Single-stroke plant figures (branches, stems), 1px stroke in warm grey 40% or mint 50%, 48px to 96px. Placed at card corners or between sections as breathing points, never over text. At most two per screen.

### Breath Section

**Role:** section containers

Section gap 160px, 32px between title and body, body line length capped at 32em. Sections get no separator — only whitespace; when a divider is needed it is one 1px warm-grey line at 30%, spanning the content width rather than full width.

## Do's and Don'ts

### Do

- Use weights 200 and 300 only
- Never use uppercase
- Let whitespace claim over sixty percent of the page
- Keep borders at 1px / 30%
- Show no visible shadows
- Transition at 500ms, slow as breathing

### Don't

- Don't use bold or semi-bold
- Don't use uppercase text
- Don't use borders above 2px
- Don't use visible shadows
- Don't use dark backgrounds
- Don't use transitions faster than 200ms

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#fafaf8` | Page canvas |
| 1 | Soft White | `#ffffff` | Cards (nearly the page color) |

## Elevation

- **None:** `none — a 1px line at 30% separates`
- **Hover line:** `1px solid rgba(212,212,207,0.60)`

## Imagery

Still lifes in natural light: a single flower stem, a bowl of water, washi texture, bamboo shadows. Low saturation, generous whitespace, may occupy only a third of the frame. No high-contrast photography, no close-up portraits, no decorative illustration.

## Layout

Capped at 960px with 32px container padding and 160px section gaps. Single column leaning left, or an asymmetric two-column with large empty space on the right. At least 32px between elements, 48px above and below titles. The whole page targets over 60% whitespace.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#4a4a46`
- background: `#fafaf8`
- accent: `#64b5f6`
- mint: `#98d8c8`
- sakura: `#ffb7c5`
- border: `rgba(212,212,207,0.30)`

EXAMPLE COMPONENT PROMPTS:

1. Build a Japanese-fresh card: background #fafaf8, 12px radius, 1px rgba(212,212,207,0.3) stroke, 32px padding, no shadow. Title 26px/300 #4a4a46 with 0.02em tracking; body 14px/300, line height 1.9. On hover the stroke rises to rgba(212,212,207,0.6) — no shift, no shadow, transition 500ms. Leave 160px between cards.
