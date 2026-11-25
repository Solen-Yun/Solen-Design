# Magazine Grid — Style Reference

> The layout speaks for itself: a big block carries the main story, small blocks fill in the rest, and size is priority.

**Theme:** light

Magazine Grid carries the layout logic of print onto the web: grid-template-areas draws blocks of unequal size, the lead takes 2×2, the secondary takes 2×1, short items take 1×1, and the reader sees at a glance what matters most. Its three disciplines: no two blocks may share a size (that would mean no hierarchy at all), image crop ratios must be consistent (or the grid goes crooked), and body paragraphs never get a positional animation (reading stability comes first). A title's hover may only change colour — no glow, no shadow.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1a1a1a` | `--color-ink` | Headings and body copy. A newspaper-style dark grey that stays comfortable over a long read. |
| Paper | `#fafafa` | `--color-paper` | Page canvas. Near-white without the glare, so the images carry the contrast. |
| Red | `#e63946` | `--color-red` | Lead markers and section labels — the loudest colour on the page. |
| Teal | `#2a9d8f` | `--color-teal` | Secondary categories and culture columns. |
| Gold | `#e9c46a` | `--color-gold` | Pull-quote background and highlights, marking a passage worth reading on its own. |
| Navy | `#264653` | `--color-navy` | In-depth reporting and feature labels, less frequent than red and teal. |

## Typography

### Playfair Display — a serif for headings. The layout hierarchy comes mainly from size and column width; the typeface only has to supply the print feel.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700, 900
- **Sizes:** 16, 20, 28, 40, 56
- **Line height:** 1.05 (display), 1.15 (headings), 1.7 (body)
- **Letter spacing:** -0.02em on display, 0.1em on uppercase labels

### Inter — body copy, labels and metadata. The contrast between sans-serif body and serif headings is what makes it read as a magazine.

- **Substitute:** system-ui, 'Segoe UI', sans-serif
- **Weights:** 400, 500
- **Sizes:** 12, 13, 15
- **Line height:** 1.4 (display), 1.4 (headings), 1.7 (body)
- **Letter spacing:** 0 on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Playfair Display | 900 | 56px | 1.05 | -0.02em | `--text-display` |
| heading-lg | Playfair Display | 700 | 40px | 1.1 | — | `--text-heading-lg` |
| heading | Playfair Display | 700 | 28px | 1.2 | — | `--text-heading` |
| subheading | Playfair Display | 400 | 20px | 1.3 | — | `--text-subheading` |
| body | Inter | 400 | 15px | 1.7 | — | `--text-body` |
| label | Inter | 500 | 12px | 1.4 | 0.1em | `--text-label` |

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
| cards | 8px |
| buttons | 4px |
| images | 4px |

- **Page max-width:** 1280px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Lead Block

**Role:** the lead story block (2×2)

Spans two columns and two rows and holds a 16:9 image (4px radius, fixed crop) above a 40px/700 serif title and a 20px standfirst (two lines at most). A 12px uppercase label with 0.1em tracking in red sits in the top-left corner. The block carries no shadow.

### Brick Block

**Role:** secondary story and short-item blocks

1×1 or 2×1, with images fixed at 1:1 or 4:3 (blocks of the same size must share the same ratio). Title 28px/700, standfirst 15px at line height 1.7, three lines at most. Label colours are fixed per section: teal for culture, navy for in-depth.

### Pull Quote

**Role:** the pull-quote block

A gold background (25% of #e9c46a) or a solid gold block, 4px radius, 24px padding, the quote set in 28px serif italic at line height 1.4, and a 13px sans-serif attribution below. Only for the single passage on a page worth reading on its own — one per screen at most.

### Section Label

**Role:** section and category labels

12px/500, uppercase, 0.1em tracking, no background and no border. Colours are fixed per section and never mixed across the site: red for the lead, teal for culture, navy for in-depth, ink for opinion. The label always sits 8px above the title.

### Title Hover

**Role:** the hover rule for titles

On hover the title only changes to that section's accent colour, transitioning in 120ms — no underline, no shadow, no glow, no shift. This is how the style defines "crisp".

## Do's and Don'ts

### Do

- Build the hierarchy with blocks of unequal size
- Give blocks of the same size the same image ratio
- Fix label colours per section
- On title hover, change colour only, 120ms
- Set body line height to 1.7 with 16px between paragraphs
- On mobile, drop the column count and stop blocks spanning columns

### Don't

- Don't make every block the same size
- Don't skip the mobile adaptation
- Don't crowd out the whitespace
- Don't mix section label colours
- Don't ignore the image crop ratios
- Don't add positional animation to body copy

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#fafafa` | Page canvas |
| 1 | Card White | `#ffffff` | Content blocks |
| 2 | Gold Quote | `#e9c46a` | Pull-quote blocks |

## Elevation

- **None:** `none — the grid does the separating`
- **Card hover:** `0 4px 16px rgba(26,26,26,0.08)`

## Imagery

News photography and editorial imagery, with one consistent crop ratio (16:9 for the large image, 1:1 or 4:3 for small ones). People, scenes and charts are all fine. No illustration and no decorative graphics.

## Layout

Cap at 1280px with 24px container padding; the main grid is 4 columns with 24px gaps, and the page structure is declared explicitly with grid-template-areas. Sections sit 64px apart. Below 1024px it drops to 2 columns; below 768px everything becomes a single column and the lead no longer spans columns.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#fafafa`
- card: `#ffffff`
- red: `#e63946`
- teal: `#2a9d8f`
- gold: `#e9c46a`

EXAMPLE COMPONENT PROMPTS:

1. Build a magazine grid layout: a 4-column grid with 24px gaps, declared with grid-template-areas. The lead spans 2×2 (a 16:9 image, a 40px/700 serif title, a two-line 20px standfirst and a 12px uppercase label with 0.1em tracking in red). The rest are 1×1 or 2×1 blocks (1:1 or 4:3 image, 28px/700 title, 15px/1.7 standfirst). Add a pull quote on a gold background (25% of #e9c46a) set in 28px serif italic. On title hover, swap the colour for the section accent, transition 120ms, with no shadow and no glow.
