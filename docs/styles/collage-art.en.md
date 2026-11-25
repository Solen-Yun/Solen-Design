# Collage Art — Style Reference

> Cut out, torn open, pasted on at an angle: a handmade collage spread from a magazine.

**Theme:** light

Collage art simulates handmade collage: paper cut out, edges torn, glued onto old stock — edges misaligned, angles inconsistent. Technically it rests on four things — clip-path polygons for torn edges, rotation via a rotate utility (not inline transform, avoiding hover conflicts), hard offset shadows for paper thickness, and mixed typefaces alternating (serif, sans, monospace on the same page). Smooth gradients are banned, radii above 8px are banned, frosted glass is banned — every piece of a handmade collage is solid paper.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#2d2d2d` | `--color-ink` | Text and cutout strokes. Like a black marker. |
| Aged Paper | `#f5f0e8` | `--color-aged-paper` | Page ground. Yellowed stock; every clipping pastes onto it. |
| Clipping Red | `#e74c3c` | `--color-clipping-red` | The first clashing scrap and the most common accent. |
| Clipping Blue | `#3498db` | `--color-clipping-blue` | The second clash, in primary counterpoint to the red. |
| Clipping Orange | `#f39c12` | `--color-clipping-orange` | Warm scraps and highlight tags. |
| Clipping Violet | `#9b59b6` | `--color-clipping-violet` | The most heterogeneous color, used to break the page's order. |

## Typography

### Playfair Display — large headlines in serif, like a title block cut from a magazine.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 700, 900
- **Sizes:** 18, 24, 34, 48, 64
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.06em on uppercase labels

### Inter — body and labels in sans; alternating typefaces across a page is this style's grammar.

- **Substitute:** system-ui, 'Segoe UI', sans-serif
- **Weights:** 400, 700, 900
- **Sizes:** 13, 15, 18
- **Line height:** 1.4 (display), 1.35 (headings), 1.6 (body)
- **Letter spacing:** 0 on display, 0.06em on uppercase labels

### JetBrains Mono — numbers, coordinates and note labels, like typewritten tag slips.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 13
- **Line height:** 1.4 (display), 1.4 (headings), 1.5 (body)
- **Letter spacing:** 0.04em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Playfair Display | 900 | 64px | 1.05 | -0.02em | `--text-display` |
| heading | Playfair Display | 700 | 48px | 1.1 | — | `--text-heading` |
| subheading | Inter | 900 | 34px | 1.15 | — | `--text-subheading` |
| body-lg | Inter | 400 | 18px | 1.55 | — | `--text-body-lg` |
| body | Inter | 400 | 15px | 1.6 | — | `--text-body` |
| label | JetBrains Mono | 400 | 13px | 1.4 | 0.12em | `--text-label` |

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
| cards | 2px |
| buttons | 2px |
| stickers | 999px |
| torn | 0 |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Torn Paper Card

**Role:** the torn-paper card (the core component)

Aged-stock or clash-color fill, zero radius, with a clip-path polygon (8 to 12 vertices, each jittered 2 to 6px) forming a torn edge. Hard offset shadow 6px 6px 0 ink 28%. Resting rotation -2 to -1 degrees. On hover the rotation zeroes and the card lifts 2px, the shadow widening to 8px. Transition 200ms.

- **States:** hover: rotation to 0, lift 2px

### Cutout Tag

**Role:** the cut-out label strip

28px tall, 0 12px padding, zero radius, both ends cut at slants by clip-path (8px each), filled with a clash color, text in 13px monospace uppercase at 0.12em. The whole strip rotates 1 to 3 degrees with a 3px 3px 0 ink 22% hard shadow.

### Mixed Type Stack

**Role:** the mixed-type stack

Three typefaces deliberately mixed within one block: a 900 serif title, a 900 sans subtitle, a monospace label — each with its own rotation (-2, 0, +2 degrees) and its own colored backing bar, reading as "cut separately, then pasted together".

### Tape Strip

**Role:** the tape

96 to 160px long, 20px tall, rotated -6 to 6 degrees, filled with semi-transparent clash color (60%) or semi-transparent white, ends zigzagged by clip-path. Pressed over a scrap's corner, crossing the edge by 8px. No border, no shadow.

### Cut Mark Border

**Role:** the cut-mark border

A 2px dashed or solid border in ink 40%, paired with a small scissors icon or short tick marks along the edge, hinting "this piece was cut along this line". Used to emphasize a single element only — never everywhere.

## Do's and Don'ts

### Do

- Use clip-path for torn edges and slants
- Rotate via a rotate utility, not inline transform
- Hard offset shadows for paper thickness
- Alternate three typefaces on one page
- Ground on aged stock; paste scraps above
- Rotate each piece -3 to 3 degrees

### Don't

- Don't use smooth gradients
- Don't exceed 8px radius
- Don't use frosted glass
- Don't align every piece to one angle
- Don't use a single typeface
- Don't make the torn edges regular

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Aged Paper | `#f5f0e8` | Page ground |
| 1 | Cutout Paper | `#fbf7ef` | Scraps |
| 2 | Clipping | `#e74c3c` | Clash-color scraps |

## Elevation

- **Paper lift:** `6px 6px 0 rgba(45,45,45,0.28)`
- **Paper lift sm:** `3px 3px 0 rgba(45,45,45,0.22)`
- **Pressed:** `none`

## Imagery

Clipped photos, magazine fragments, hand doodles, labels and stamps. Images must carry clear cut edges (a white border allowed), with two layers of scraps from different sources allowed. No smooth gradients, circular crops or uniform-style photography.

## Layout

Capped at 1200px with 24px container padding and 96px section gaps. Elements may overlap and misalign; rotation runs -3 to 3 degrees. An invisible central axis keeps the collage from total chaos — but every piece deviates from it a little.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#2d2d2d`
- background: `#f5f0e8`
- paper: `#fbf7ef`
- red: `#e74c3c`
- blue: `#3498db`
- orange: `#f39c12`

EXAMPLE COMPONENT PROMPTS:

1. Build a collage card: background #fbf7ef, zero radius, clip-path: polygon(0 2%,8% 0,20% 3%,35% 0,50% 2%,65% 0,80% 3%,92% 0,100% 2%,100% 98%,90% 100%,75% 97%,60% 100%,45% 98%,30% 100%,15% 97%,0 100%) for a torn edge, box-shadow 6px 6px 0 rgba(45,45,45,0.28), transform rotate(-1.5deg). The title is 48px/700 serif; the subtitle 34px/900 sans rotated 1deg; a 120px semi-transparent red tape (clip-path zigzag) rotated -4 degrees pasted at the top-left. On hover rotate(0) translateY(-2px), transition 200ms. Page ground #f5f0e8.
2. Build a cutout tag: 28px tall, 0 12px padding, zero radius, slant-cut ends (8px each) via clip-path, a clash-color fill, 13px monospace uppercase at 0.12em, rotated 1 to 3 degrees with a 3px 3px 0 rgba(45,45,45,0.22) shadow.
