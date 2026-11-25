# Art Deco — Style Reference

> Golden geometry pressed onto a dark ground, symmetric to the point of ritual.

**Theme:** dark

Art deco comes from the 1920s and 30s: gold, deep blue-black, strict axial symmetry, geometric ornament (sunbursts, stepped forms, fans). Its rules are three prohibitions — no bright modern palettes, no asymmetric clutter, no modern sans-serif type — and no omitting the ornament either. The most effective rendering on screen: a dark base (#1a1a2e) with gold strokes (#d4af37 at 1px or 2px), serif headings with wide tracking, and 1px gold lines building vertically symmetric frames.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Gold | `#d4af37` | `--color-gold` | Strokes, headings and small ornament. The style's entire sense of luxury comes from it. |
| Midnight | `#1a1a2e` | `--color-midnight` | Page base. Deep blue-black rather than pure black, so the gold reads warmer. |
| Antique Gold | `#c9a227` | `--color-antique-gold` | Secondary strokes and embossed effects, one step darker than the main gold. |
| Slate Navy | `#2d2d44` | `--color-slate-navy` | Cards and panels. Barely brighter than the base, keeping the overall depth. |
| Ivory | `#f5f5dc` | `--color-ivory` | Body text and light blocks. Softer than pure white, like old correspondence paper. |
| Emerald | `#4bc542` | `--color-emerald` | The only second color, reserved for tiny jewel-like accents. |

## Typography

### Cinzel — headings and wordmarks. All caps at 0.12 to 0.2em tracking; the letterforms themselves carry a 1920s monument feel.

- **Substitute:** 'Trajan Pro', Georgia, serif
- **Weights:** 400, 700
- **Sizes:** 14, 18, 24, 36, 48, 64
- **Line height:** 1.1 (display), 1.2 (headings), 1.7 (body)
- **Letter spacing:** 0.12em on display, 0.2em on uppercase labels

### Georgia — body copy. A serif is the only legal body font; sans-serif is anachronistic in this language.

- **Substitute:** 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 14, 16, 18
- **Line height:** 1.4 (display), 1.4 (headings), 1.7 (body)
- **Letter spacing:** 0.01em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Cinzel | 700 | 64px | 1.1 | 0.12em | `--text-display` |
| heading-lg | Cinzel | 700 | 48px | 1.15 | 0.12em | `--text-heading-lg` |
| heading | Cinzel | 400 | 36px | 1.2 | 0.1em | `--text-heading` |
| subheading | Cinzel | 400 | 24px | 1.3 | 0.08em | `--text-subheading` |
| body | Georgia | 400 | 16px | 1.7 | — | `--text-body` |
| label | Cinzel | 400 | 14px | 1.5 | 0.2em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| medallions | 999px |

- **Page max-width:** 1080px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Gold Frame

**Role:** symmetric gold-line border (the identity core)

Outside the content block, two layers of 1px gold line (#d4af37): the outer at 0 from the edge, the inner at 8px, with a 12px 45-degree short slash at each corner as the corner ornament. Top and bottom borders run one step heavier than the sides (2px vs 1px), reinforcing the 1920s framed composition. Inside the frame everything stays pure — no other ornament.

### Deco Button

**Role:** action button

Transparent ground, 1px gold stroke, zero radius, gold uppercase text at 14px/400, 0.2em tracking, padding 14px 36px. On hover the fill rises to gold 12%, the text turns ivory, and a 0 0 12px gold 35% outer glow appears; on press the fill climbs to 20%. Transition 250ms ease-out.

- **Sizes:** padding 14px 36px; label 14px
- **States:** hover: fill 12%, ivory text, glow; active: fill 20%

### Deco Card

**Role:** content cards and menu cards

Slate navy ground, zero radius, 1px antique-gold 60% stroke, 32px padding. A 24px geometric ornament (a fan or sunburst drawn in 1px gold) sits centered at the top; the title is 24px/400 uppercase at 0.08em, centered; body is 16px serif ivory. Gold 1px rules separate the card's top and bottom at 32px each.

### Sunburst Divider

**Role:** radiating divider ornament

A horizontal gold line with 7 to 9 short rays fanning downward (each 8 to 12px, 12 degrees apart), 1px wide, 120 to 200px across, centered between sections. It is the style's signature ornament; no more than two per screen.

### Ivory Panel

**Role:** light block

Ivory ground, zero radius, 1px antique-gold stroke on all four sides, 48px padding, with text turning midnight inside. Used to break an all-dark page, but never more than one per page.

## Do's and Don'ts

### Do

- Keep strict axial symmetry; center everything
- Use gold only as 1px and 2px fine lines
- Set headings in serif, uppercase, wide tracking
- Always include ornament: corner marks, sunbursts, fans
- Keep zero radius; right angles only
- Pair the dark base with ivory text

### Don't

- Don't use bright modern palettes
- Don't use asymmetric, cluttered layouts
- Don't use modern sans-serif type
- Don't omit the ornament
- Don't use large radii
- Don't place two ivory panels on one screen

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Midnight | `#1a1a2e` | Page base |
| 1 | Slate Navy | `#2d2d44` | Cards and panels |
| 2 | Ivory | `#f5f5dc` | Light blocks |

## Elevation

- **None:** `none — 1px gold lines do the separating`
- **Gold glow:** `0 0 12px rgba(212,175,55,0.35)`

## Imagery

Black-and-white photography and geometric ornament: sunbursts, stepped forms, fans, symmetric motifs. Photos may be treated into gold-toned duotones. No color photography, no modern illustration, no asymmetric compositions.

## Layout

Capped at 1080px, container padding 24px, section gap 128px. Everything is strictly centered and symmetric; headings and content both follow the central axis. Ornament lines run from the page edge to the content edge, forming the framed composition. Left-aligned, off-axis layouts are forbidden.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#f5f5dc`
- background: `#1a1a2e`
- card: `#2d2d44`
- gold: `#d4af37`
- antique: `#c9a227`
- emerald: `#4bc542`

EXAMPLE COMPONENT PROMPTS:

1. Build an art-deco card: background #2d2d44, zero radius, 1px rgba(201,162,39,0.6) stroke, 32px padding. At the top, centered, a fan ornament drawn in 1px #d4af37 (24px tall). Title 24px Cinzel uppercase 0.08em centered in #d4af37; body 16px serif, line height 1.7, in #f5f5dc. A 1px gold rule runs across the card 32px from the top and the bottom. Page base #1a1a2e.
2. Build a deco button: transparent ground, 1px #d4af37 stroke, zero radius, 14px/400 uppercase text at 0.2em tracking, padding 14px 36px, text gold. On hover the fill rises to rgba(212,175,55,0.12), the text turns #f5f5dc, and a 0 0 12px rgba(212,175,55,0.35) glow appears over 250ms ease-out; on press the fill climbs to 0.20.
