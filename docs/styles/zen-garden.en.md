# Zen Garden — Style Reference

> White sand, mossed stones, raked lines: whitespace here is not empty — it is combed.

**Theme:** light

The zen garden composes a waterless garden from three materials: white sand, moss and stone. On the interface that becomes a sand-white ground (#f5f3ee), moss-green accents (#8a9a7b), borders thin to the point of near-invisibility (1px at 30%), and vast "combed" whitespace — here whitespace is the core structure, not slack. Time runs extremely slowly: transitions last 1000ms ease-in-out, because raked lines and moss change on the scale of years. The bans: no bright vivid color, no heavy borders or coarse lines, no fast animation or bounce, no dense packing.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Stone | `#4a5548` | `--color-stone` | Text and stones. A green-tinged deep grey, the garden's only weight. |
| Sand | `#f5f3ee` | `--color-sand` | Page ground. The white sand's color; everything rests on it. |
| Moss | `#8a9a7b` | `--color-moss` | The only accent: hover states, selection and "growing" semantics. |
| Gravel | `#c4bba8` | `--color-gravel` | Borders and dividers, always 1px at 30%. |
| Rock | `#7a7062` | `--color-rock` | Secondary text and metadata. |
| Pond Teal | `#799d91` | `--color-pond-teal` | One cool stroke hinting at "water", extremely rare. |

## Typography

### Noto Serif SC — serif throughout, line height 1.9, tracking opened to 0.28em. The space between letters and lines matters as much as the content.

- **Substitute:** 'Songti SC', Georgia, serif
- **Weights:** 300, 400
- **Sizes:** 15, 18, 22, 28, 38, 50
- **Line height:** 1.2 (display), 1.4 (headings), 1.9 (body)
- **Letter spacing:** 0.04em on display, 0.28em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 300 | 50px | 1.2 | 0.04em | `--text-display` |
| heading | — | 300 | 38px | 1.35 | — | `--text-heading` |
| subheading | — | 400 | 28px | 1.45 | — | `--text-subheading` |
| body-lg | — | 400 | 22px | 1.8 | — | `--text-body-lg` |
| body | — | 300 | 18px | 1.9 | — | `--text-body` |
| label | — | 400 | 15px | 1.7 | 0.28em | `--text-label` |

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
| stones | 999px |

- **Page max-width:** 960px
- **Section gap:** 240px
- **Card padding:** 40px
- **Element gap:** 40px

## Components

### Quiet Button

**Role:** action buttons

Transparent ground, no stroke by default (border-color: transparent), zero radius, serif 15px, 0.28em tracking, padding 12px 32px, text in stone 70%. On hover the stroke turns moss 30%, text rises to 100%, the ground takes moss 5%, and a nearly invisible moss glow appears (0 0 20px moss 5%). Transition 1000ms ease-in-out.

- **Sizes:** padding 12px 32px; label 15px
- **States:** hover: moss border 30%, text 100%; no motion

### Stone Card

**Role:** content cards and stone groups

Sand fill (same as the ground — the border does the separating), zero radius, 1px gravel 30% stroke, 40px padding, no shadow. On hover only the stroke rises to 55%; nothing else changes. Cards may offset 16 to 48px from each other, the way stones refuse the grid.

### Raked Line

**Role:** raked-line ornament

repeating-linear-gradient draws 1px parallel lines 24px apart in sand 40% or gravel 25%, laid over a section (at 50% opacity), simulating raked sand. Lines must be evenly spaced concentric arcs or straights — never disorderly.

### Moss Cluster

**Role:** moss and stone accents

Two or three circles or irregular blocks of different sizes (16 to 64px), moss green or rock color, at 60% to 80% opacity, placed together at a card corner or beside a title, like moss growing next to a stone group. At most two per screen.

### Silence Gap

**Role:** the whitespace block

An empty section 240px to 320px tall, existing as a real element. It is the heart of the garden — without this blank, a zen garden is just piles of stones.

## Do's and Don'ts

### Do

- Ground in sand white, accent with moss
- Keep borders 1px at 30%
- Give whitespace 240px — it is the core
- Transition 1000ms without moving elements
- Set line height 1.9 and tracking 0.28em
- Decorate with raked lines

### Don't

- Don't use bright vivid colors
- Don't use heavy borders or coarse lines
- Don't use fast animation or bounce
- Don't pack elements densely
- Don't use shadows
- Don't draw the raked lines disorderly

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Sand | `#f5f3ee` | Page ground |
| 1 | Moss Bed | `rgba(138,154,123,0.08)` | Moss sections |

## Elevation

- **None:** `none — the garden is flat`

## Imagery

Zen-garden photography and minimal line art: sand patterns, stone groups, moss, bamboo fences, distant mountain shadows. Must carry generous whitespace, tones held between grey-green and sand. No vivid colors, dense patterns or colored illustration.

## Layout

Capped at 960px with 32px container padding and 240px section gaps. Compose like a garden: content leans to one side, the other side stays empty, elements need not align to a grid. Dense packing is banned — at most three elements per screen.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#4a5548`
- background: `#f5f3ee`
- moss: `#8a9a7b`
- gravel: `#c4bba8`
- rock: `#7a7062`
- teal: `#799d91`

EXAMPLE COMPONENT PROMPTS:

1. Build a zen-garden card: sand #f5f3ee fill, zero radius, 1px rgba(196,187,168,0.3) stroke, 40px padding, no shadow. Title 38px Noto Serif SC 300 with 0.04em tracking; body 18px/300 at line height 1.9. Leave 240px between cards. On hover the stroke rises to rgba(196,187,168,0.55) and nothing else changes, transition 1000ms ease-in-out. A section may layer 1px sand lines 24px apart (at 50% opacity). Page ground #f5f3ee.
