# Islamic Geometric — Style Reference

> Infinitely extending tessellations, gold and deep blue, strict symmetry: ornament is order.

**Theme:** light

Islamic geometric comes from the decorative tradition of mosques and manuscripts: precise tessellations (eight-pointed stars, hexagons, geometric interlacing) form infinitely extending borders and grounds, colored in the classic pairing of deep blue (#1a3a5c), gold (#c9a74e) and ivory (#f5ecd7), supported by forest green (#2d7d46) and crimson (#8b2332). Layout is strictly symmetric and centered, borders use 2px gold lines, and shadows are a faint gold diffusion. Fluorescent and neon are banned, asymmetric chaotic layouts are banned, minimal undecorated design is banned (moderate ornament is the core), and script or cartoon faces are banned.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Blue | `#1a3a5c` | `--color-deep-blue` | Primary: dark sections and pattern grounds. The blue of glazed tile. |
| Ivory | `#f5ecd7` | `--color-ivory` | Page ground and the paper color of text and images. |
| Gold | `#c9a74e` | `--color-gold` | Every stroke, pattern line and accent. The main carrier of ornament. |
| Forest | `#2d7d46` | `--color-forest` | The second secondary, for vegetal motifs and secondary sections. |
| Crimson | `#8b2332` | `--color-crimson` | The third secondary, for accents and details that must pop. |
| Bright Green | `#6bc15e` | `--color-bright-green` | The brightest, appearing only in small areas of pattern. |

## Typography

### Cormorant Garamond — an elegant serif, headings centered with wide tracking. Line height 1.75 gives the text the same composure as the ornament.

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 15, 18, 22, 30, 40, 54
- **Line height:** 1.2 (display), 1.35 (headings), 1.75 (body)
- **Letter spacing:** 0.02em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 54px | 1.2 | 0.02em | `--text-display` |
| heading | — | 600 | 40px | 1.3 | — | `--text-heading` |
| subheading | — | 400 | 30px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 22px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 18px | 1.75 | — | `--text-body` |
| label | — | 600 | 15px | 1.55 | 0.2em | `--text-label` |

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
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| arches | 50% 50% 0 0 |

- **Page max-width:** 1080px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Tessellation Border

**Role:** the tessellation border (core component)

SVG pattern or repeating conic-gradient weaves eight-pointed stars and hexagons, 1px lines at gold 70%, 48px cells. Used as section borders (24 to 48px wide) or as a ground (opacity dropping to 8%). The pattern must repeat strictly and seamlessly.

### Arch Frame

**Role:** the arched frame

The card's top uses border-radius: 50% 50% 0 0 for a pointed or semicircular arch, a 2px gold stroke, deep blue or ivory fill, 32px padding. Each corner adds a 12px geometric corner ornament (a quarter star).

### Gold Button

**Role:** action buttons

Gold fill, deep-blue text, 8px radius, 1px deep-blue 30% stroke, 15px/600, 0.2em tracking, padding 14px 32px, shadow 0 4px 12px gold 20%. On hover the fill brightens 6% and the shadow widens to 24px; on press it scales 0.98. Geometric corner cuts of 4px may be added.

- **Sizes:** padding 14px 32px; label 15px
- **States:** hover: brighter, shadow 24px; active: scale 0.98

### Arabesque Divider

**Role:** the vegetal divider

A 1px gold horizontal line with a 32px symmetric scroll-and-vine motif (drawn as an SVG path) at its center, and interlacing vines extending left and right. It replaces ordinary dividers and is the page's most characteristic decorative device.

### Star Medallion

**Role:** the star medallion

An eight- or sixteen-pointed star (two squares overlaid at 45 degrees), 48 to 120px, 1px gold stroke filled deep blue or crimson, with an 8px bright-green or gold dot at its center. Placed at a section's center or above a title, one or two per screen.

## Do's and Don'ts

### Do

- Use the classic deep blue, gold and ivory trio
- Make tessellations seamless and exactly repeated
- Lay out strictly symmetric and centered
- Frame with 2px gold lines plus geometric corner ornaments
- Render shadows as a faint gold diffusion
- Use symmetric scroll-vine for vegetal motifs

### Don't

- Don't use fluorescent or neon colors
- Don't use asymmetric chaotic layouts
- Don't go minimal and undecorated
- Don't use script or cartoon faces
- Don't let a pattern lose its registration
- Don't put more than two tessellation borders on one screen

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Ivory | `#f5ecd7` | Page ground |
| 1 | Deep Blue | `#1a3a5c` | Dark sections |
| 2 | Gold Line | `rgba(201,167,78,0.20)` | Pattern lines |

## Elevation

- **Gold soft:** `0 4px 12px rgba(201,167,78,0.20)`
- **Gold stronger:** `0 8px 24px rgba(201,167,78,0.28)`

## Imagery

Architectural and decorative photography: mosque tile, domes, wood carving, manuscript pages. Must carry pattern detail and symmetric composition. Photos may be graded into a deep-blue-and-gold duotone. No realistic portrait photography, neon imagery or asymmetric composition.

## Layout

Capped at 1080px with 24px container padding and 128px section gaps. Strictly symmetric and centered — non-negotiable in this style. Every section may carry a tessellation border on all four sides, but no more than two per screen or it turns crowded.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a3a5c`
- background: `#f5ecd7`
- gold: `#c9a74e`
- forest: `#2d7d46`
- crimson: `#8b2332`
- blue: `#1a3a5c`

EXAMPLE COMPONENT PROMPTS:

1. Build an Islamic-geometric card: ivory #f5ecd7 fill, top border-radius 50% 50% 0 0 for the arch, 2px solid #c9a74e stroke, 32px padding, box-shadow 0 4px 12px rgba(201,167,78,0.2). Centered above, a 64px eight-pointed star (two squares overlaid at 45 degrees, 1px gold stroke, filled #1a3a5c). Title 40px/600 Cormorant Garamond, centered, 0.02em tracking, color #1a3a5c; body 18px at line height 1.75. Below the card, a 1px gold line with a central 32px symmetric scroll motif. Everything symmetric and centered, zero fluorescent color.
