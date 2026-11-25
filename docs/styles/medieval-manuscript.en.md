# Medieval Manuscript — Style Reference

> Parchment, double rules, gold-and-red initials: a page worn by fingers.

**Theme:** light

Medieval manuscript imitates illuminated manuscripts: a parchment ground (#f0e6d0), gold (#c9a74e) and deep red (#8b1a1a) for ornament and headings, deep brown (#3d2b1f) for body text, borders using border-double or two solid lines (an outer 3 to 4px plus an inner 1px) to imitate the manuscript's double rules, the opening letter enlarged past 5xl as a drop cap, and serif type throughout for classical consistency. Its hierarchy rests entirely on ornamental borders and initials, never on shadows or color contrast.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Parchment | `#f0e6d0` | `--color-parchment` | Page ground. Yellowed paper; everything is written on it. |
| Deep Red | `#8b1a1a` | `--color-deep-red` | Headings and important text. The cinnabar ink of manuscripts. |
| Gold | `#c9a74e` | `--color-gold` | Borders, initial grounds and ornament. The color of illuminated gilding. |
| Deep Brown | `#3d2b1f` | `--color-deep-brown` | Body text and secondary borders. The brown-black of old ink. |
| Forest | `#2d4a2d` | `--color-forest` | Vine ornament and secondary accents. |
| Bright Green | `#6bc15e` | `--color-bright-green` | Leaf accents inside initials, least frequent. |

## Typography

### UnifrakturMaguntia — gothic or high-contrast ornamental serif for headings, readable serif for body. The gothic face appears only in headings and initials.

- **Substitute:** 'Cinzel', Georgia, serif
- **Weights:** 400
- **Sizes:** 20, 26, 34, 44, 58, 76
- **Line height:** 1.15 (display), 1.25 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.16em on uppercase labels

### EB Garamond — body and captions. Line height 1.8, like a manuscript's text column.

- **Substitute:** Garamond, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 16, 18, 21
- **Line height:** 1.5 (display), 1.5 (headings), 1.8 (body)
- **Letter spacing:** 0.01em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | UnifrakturMaguntia | 400 | 76px | 1.15 | 0.02em | `--text-display` |
| heading | UnifrakturMaguntia | 400 | 58px | 1.2 | — | `--text-heading` |
| subheading | UnifrakturMaguntia | 400 | 44px | 1.25 | — | `--text-subheading` |
| body-lg | EB Garamond | 400 | 21px | 1.75 | — | `--text-body-lg` |
| body | EB Garamond | 400 | 18px | 1.8 | — | `--text-body` |
| label | EB Garamond | 600 | 16px | 1.6 | 0.16em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| initials | 4px |

- **Page max-width:** 960px
- **Section gap:** 128px
- **Card padding:** 40px
- **Element gap:** 24px

## Components

### Double Frame

**Role:** the double-rule frame (core component)

An outer 3px deep-brown solid line and an inner 1px gold solid line, with 8px of parchment showing between them (padding plus an inner stroke, or a double border with outline-offset). Zero radius. Each corner carries a 16px ornament (geometric scrollwork or a cross). The whole content is written inside the frame, like a manuscript page.

### Illuminated Initial

**Role:** the illuminated initial (signature)

The paragraph's first letter floats left, sized 4× the body, its line height spanning three to four lines, with a gold 18% fill inside the glyph, a 2px deep-red outline, and 2px deep-brown corner lines. Simplest scrollwork or leaf strokes (forest green) may sit inside the letter. Only once per content block.

### Rubric Label

**Role:** the rubric label

16px/600, 0.16em tracking, deep-red text, no ground and no border. It is the small red-ink heading a scribe wrote above a section, used 8px above a block and as marginal notes.

### Parchment Button

**Role:** action buttons

Parchment fill, deep-brown text, zero radius, a 3px deep-brown border plus an inner 1px gold line (double), 16px/600, 0.16em tracking, padding 14px 32px, no shadow. On hover the lower fill turns gold 18% and the border deep red; on press the whole button shifts 1px 2px. Transition 250ms ease-out.

- **Sizes:** padding 14px 32px; label 16px
- **States:** hover: gold ground, red border; active: offset 1px 2px

### Margin Vine

**Role:** the margin vine

A 1px forest-green vine running vertically along the page or section edge, carrying 6 to 10 small leaves (each 8px) and 2 to 3 deep-red blossoms. It imitates the decorated margin column of a manuscript — at most two per screen.

## Do's and Don'ts

### Do

- Pair the parchment ground with gold and deep red
- Make every border a double rule (3px + 1px)
- Enlarge the opening initial to 4×
- Set serif type throughout
- Decorate the margins with vines
- Keep body measure under 60 characters

### Don't

- Don't use single-rule borders
- Don't set body text in a gothic face
- Don't use realistic photography
- Don't use rounded corners
- Don't use shadows
- Don't drop-cap every paragraph

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Parchment | `#f0e6d0` | Page ground |
| 1 | Gold Ground | `rgba(201,167,78,0.18)` | Initial and ornament grounds |
| 2 | Ink Block | `#3d2b1f` | Dark blocks |

## Elevation

- **None:** `none — the double frame carries all depth`
- **Max allowed:** `inset 0 0 40px rgba(61,43,31,0.06)`

## Imagery

Manuscript miniatures, woodcuts, illuminated ornament, parchment texture. Images must carry flattened line work and the gold-red palette, possibly with gold-leaf grounds. No realistic photography, modern illustration or color-gradient imagery.

## Layout

Capped at 960px with 32px container padding and 128px section gaps. The whole page sits inside a Double Frame, with decorated margins preserved. Body copy is single-column with a measure under 60 characters, like a manuscript's text block.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#3d2b1f`
- background: `#f0e6d0`
- red: `#8b1a1a`
- gold: `#c9a74e`
- forest: `#2d4a2d`
- brown: `#3d2b1f`

EXAMPLE COMPONENT PROMPTS:

1. Build a medieval-manuscript page: parchment ground #f0e6d0, body EB Garamond 18px at line height 1.8 in #3d2b1f. An outer 3px solid #3d2b1f border plus an inner 1px solid #c9a74e (8px of gap between the two), with a 16px gold ornament at each corner, zero radius. Headings in the gothic face at 58px in #8b1a1a. The first paragraph's initial is 4× size with a gold 18% ground and a 2px deep-red outline. A rubric label (16px, 0.16em tracking, deep red) sits above the block. A 1px forest-green vine with small leaves runs along the margin. No shadows, no rounded corners.
