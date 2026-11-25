# Z-Pattern Layout — Style Reference

> The eye walks a Z: top-left to top-right, cutting diagonally to bottom-left, landing at bottom-right.

**Theme:** light

The Z-pattern draws the attention path of a marketing page: the first stroke is the header (logo left, CTA right), the second is the diagonal across the hero, the third is the horizontal sweep across the bottom band that lands on the right-side CTA. So the rules are hard — only content that must be seen sits on the Z path, the CTA must sit at the path's end, and anything that interrupts the flow (long body copy, unrelated images, two-column card walls) is banned. Visually it needs high contrast and a strong primary, because the path is pulled by contrast.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Slate | `#0f172a` | `--color-deep-slate` | Headings and body. Highest contrast on the white page, pulling the eye. |
| White | `#ffffff` | `--color-white` | Page canvas. Kept clean so the Z path is never muddied. |
| Indigo | `#6366f1` | `--color-indigo` | The path-end CTA and links. The page's strongest visual anchor. |
| Cyan | `#06b6d4` | `--color-cyan` | Secondary accent and graphic garnish, toward the diagonal's right side. |
| Amber | `#f59e0b` | `--color-amber` | Badges and scarcity hints, near the path's start to catch initial attention. |
| Pink | `#ec4899` | `--color-pink` | A second CTA or emotional emphasis; the least frequent. |

## Typography

### Inter — the only font on the site. The hero title is 56px/700 with tight tracking; everything else falls back quickly, keeping the path simple.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 28, 40, 56
- **Line height:** 1.05 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.03em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 56px | 1.05 | -0.03em | `--text-display` |
| heading-lg | — | 700 | 40px | 1.1 | -0.02em | `--text-heading-lg` |
| heading | — | 600 | 28px | 1.2 | — | `--text-heading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.06em | `--text-label` |

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
| cards | 16px |
| buttons | 12px |
| inputs | 12px |
| badges | 999px |

- **Page max-width:** 1120px
- **Section gap:** 128px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Path CTA

**Role:** the primary action at the path's end

Indigo fill, white text, 12px radius, no stroke; 18px/700, padding 16px 40px, shadow 0 4px 14px indigo 30%. On hover the shadow spreads to 25px, the button lifts 4px and scales 1.02; on press it scales 0.95 and drops 2px. Transition 200ms ease-out. At most two per page, both on the Z path.

- **Sizes:** padding 16px 40px; label 18px
- **States:** hover: lift 4px, shadow 25px; active: scale 0.95

### Diagonal Lead

**Role:** the hero's diagonal visual block

The title aligns left at the top-left so the eye sweeps to the upper right; the right side holds a visual block (screenshot, product image or abstract shape) no taller than 60% of the viewport. No divider between the two. The subtitle is at most two lines, 16px below the title.

### Header Bar

**Role:** the path's start: the header

72px tall, white ground, no border. A 20px/700 wordmark on the left; on the right one Path CTA and at most three links. The middle stays empty — putting nav in the middle breaks the first stroke.

### Bottom Band

**Role:** the path's end zone

Deep slate or white ground, laid out horizontally: a one-sentence conclusion on the left, a CTA and an email input on the right. The whole band stays under 240px tall and never holds a card grid.

### Trust Row

**Role:** the trust strip (logos or figures)

A horizontal band right under the hero, 80px tall, with 4 to 6 grey-scale logos or three key figures. 12px uppercase at 0.06em, 60% opacity. It supports the Z's second stroke without interrupting the path.

## Do's and Don'ts

### Do

- Put only must-see content on the Z path
- Place the CTA at the path's end (bottom-right)
- Align titles left, set the visual block right
- Make one claim per screen; don't pile up information
- Keep high contrast and a single primary
- Leave the header's middle empty

### Don't

- Don't put secondary content on the path
- Don't interrupt the Z's flow
- Don't overload the path with content
- Don't put a CTA off the path
- Don't make the page complicated
- Don't place a two-column card wall mid-page

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | Page canvas |
| 1 | Slate Band | `#0f172a` | Inverted section (usually mid-page) |

## Elevation

- **CTA:** `0 4px 14px rgba(99,102,241,0.30)`
- **CTA hover:** `0 8px 25px rgba(99,102,241,0.50)`
- **Card:** `0 2px 8px rgba(15,23,42,0.06)`

## Imagery

Right-aligned product screenshots or abstract shapes, to catch the diagonal. Clean device frames are allowed. No large portraits or background images — they pull the eye off the path.

## Layout

Capped at 1120px with 24px container padding and 128px section gaps. The structure is fixed: the header stroke → the diagonal zone → the bottom end band. One claim per section; no two-column card walls mid-page.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#0f172a`
- background: `#ffffff`
- accent: `#6366f1`
- secondary: `#06b6d4`
- badge: `#f59e0b`
- muted: `#64748b`

EXAMPLE COMPONENT PROMPTS:

1. Build a Z-pattern marketing hero: a 72px white header with a 20px/700 logo left and one #6366f1 rounded button right (18px/700, padding 16px 40px, shadow 0 4px 14px rgba(99,102,241,0.3)). The middle holds a left-aligned 56px/700 title (-0.03em tracking) with a two-line subtitle and a product screenshot on the right. The bottom band carries one sentence on the left and a CTA with an email input on the right. Section gap 128px.
2. Build a trust row: an 80px horizontal band right under the hero with 4–6 grey-scale logos or three key figures, 12px uppercase 0.06em at 60% opacity.
