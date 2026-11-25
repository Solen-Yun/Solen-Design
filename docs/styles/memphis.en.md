# Memphis — Style Reference

> Clashing colors, chunky borders, geometry flying loose: the 1981 Milan joke turned into an interface.

**Theme:** light

Memphis was the 1981 Milan design group's rebuttal to modernism: no restraint — clash; no grid — irregularity. On the interface it becomes two hard rules. First, geometric ornament must exist, and on hover each piece moves or rotates in its own direction (Playful Chaos). Second, headings and text may snap instantly into a saturated clash color on hover (Pop Swap), a 150ms hard cut. Borders are always 4px pure black, shadows are hard offsets that drop to zero on press. Monochrome palettes are banned, overly symmetric layouts are banned, and ornaments that stay still on hover are banned.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Coral | `#ff6b6b` | `--color-coral` | The first clash and the primary action. Memphis starts here, always set against yellow or blue. |
| Honey | `#feca57` | `--color-honey` | The second clash and highlight ground; coral's direct opponent. |
| Electric Blue | `#48dbfb` | `--color-electric-blue` | The third clash and links, breaking the warmth of red and yellow. |
| Bubblegum | `#ff9ff3` | `--color-bubblegum` | Reserved for geometric ornament, almost never for text. |
| Mint | `#1dd1a1` | `--color-mint` | Success state and the fourth clash; the smallest area. |
| Grape | `#5f27cd` | `--color-grape` | The dark clash, for shapes and secondary buttons on light grounds. |

## Typography

### Inter — the only font on the site, weights 700 and 900 only. Headings squeeze to a 1.0 line height so the type block is itself a geometric shape.

- **Substitute:** 'Arial Black', Helvetica, sans-serif
- **Weights:** 700, 900
- **Sizes:** 14, 18, 24, 32, 44, 60
- **Line height:** 1 (display), 1.1 (headings), 1.5 (body)
- **Letter spacing:** -0.02em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 60px | 1 | -0.02em | `--text-display` |
| heading | — | 900 | 44px | 1.05 | -0.02em | `--text-heading` |
| subheading | — | 700 | 32px | 1.1 | — | `--text-subheading` |
| body-lg | — | 700 | 18px | 1.45 | — | `--text-body-lg` |
| body | — | 700 | 14px | 1.5 | — | `--text-body` |
| label | — | 700 | 14px | 1.35 | 0.06em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| shapes | 999px |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Pop Button

**Role:** primary action button

Coral fill, white text, 4px pure-black border, zero radius, 6px hard offset shadow; 14px/700, 0.06em tracking, padding 12px 24px. On hover the fill hard-cuts to honey, the text turns black and the shadow grows to 10px — never shifting toward the shadow; on press the button translates 6px 6px while the shadow drops to none. Transition 150ms.

- **States:** hover: color swap, shadow grows; active: translate 6px, shadow none

### Playground Card

**Role:** content cards and work cards

Warm-white fill, 4px pure-black border, zero radius, 28px padding, 6px hard shadow. Inside, 3 to 4 geometric ornaments (circle, triangle, squiggle) in different colors. On hover each ornament moves 6 to 10px in its own direction and rotates 8 to 20 degrees on its own (Playful Chaos), the title snaps to a clash color (Pop Swap), and the card itself never moves. Transition 150ms.

### Geometric Ornament

**Role:** geometric ornament elements

Only circle, triangle, squiggle and zigzag; filled with a clash color, optionally with a 3px black stroke. Sized 24px to 96px, absolutely positioned at the corners of cards or sections and allowed to overflow the edge by 8 to 16px. On hover each moves and rotates along its own path — never in sync.

### Memphis Input

**Role:** form inputs

White fill, 4px pure-black border, zero radius, padding 10px 14px, 14px/700. On focus the border hard-cuts to electric blue with a 4px honey hard shadow, without changing the size.

### Zigzag Divider

**Role:** section dividers

A 16px-tall zigzag line (clip-path or SVG), filled with a clash color, spanning the content width. Used in place of straight rules; no more than three per page.

## Do's and Don'ts

### Do

- Pair clash colors; never put neighbors of the same family together
- Use 4px pure-black borders and zero radius
- Include geometric ornament, moving on hover
- Hard-cut hover colors within 150ms
- Make the press offset equal the shadow offset and zero the shadow
- Set titles at 900 with a 1.0 line height

### Don't

- Don't use monotone or low-saturation palettes
- Don't use tidy symmetric layouts
- Don't use thin borders
- Don't omit the geometric ornament
- Don't let ornament stand still on hover
- Don't shift toward the shadow on hover

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#fdf6e3` | Page ground (warm white) |
| 1 | Coral Block | `#ff6b6b` | Emphasis sections |
| 2 | Honey Block | `#feca57` | Highlight sections |

## Elevation

- **Hard offset:** `6px 6px 0 #000000`
- **Hard offset lg:** `10px 10px 0 #000000`
- **Pressed:** `none`

## Imagery

Geometry is the image; no photography. Abstract 80s-style illustration and thick-stroked line art are allowed. No realistic photography, no gradients, no soft shadows.

## Layout

Capped at 1200px with 24px container padding and 96px section gaps. Symmetry is deliberately broken: elements may drift off the grid, tilt -3 to 3 degrees, and ornament may overflow the container. Content still lands on the 8px grid — the chaos happens only in the visual layer.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#000000`
- background: `#fdf6e3`
- coral: `#ff6b6b`
- honey: `#feca57`
- blue: `#48dbfb`
- mint: `#1dd1a1`

EXAMPLE COMPONENT PROMPTS:

1. Build a Memphis button: background #ff6b6b, white text, 4px solid #000 border, border-radius 0, 700 weight 14px, 0.06em tracking, padding 12px 24px, box-shadow 6px 6px 0 #000. On hover the background hard-cuts to #feca57, the text turns black and the shadow grows to 10px 10px 0 #000, with no translation. On active translate(6px,6px) with box-shadow none. Transition 150ms. Page ground #fdf6e3.
2. Build a playground card: warm-white fill, 4px #000 border, zero radius, 28px padding, 6px hard shadow, holding 3–4 geometric ornaments in different colors. On hover each ornament translates 6–10px along its own direction and rotates 8–20 degrees on its own while the title hard-cuts to a clash color — the card itself never moves. Transition 150ms.
