# Horizontal Gallery — Style Reference

> The white-box showroom: works line up along a horizontal track, and viewing becomes a stroll.

**Theme:** light

The horizontal gallery imitates a museum's white-box room: works run along a horizontal snap-scrolling track (overflow-x-auto, snap-x mandatory, each piece shrink-0 snap-start), whitespace is the gallery wall, captions are 12px uppercase 0.2em grey set below the image (never on it) with a No. 01 number, and the section title rides as the track's first cell, sticky on the left through the scroll. Its bans all point one way — never let ornament disturb the work: no shadows, radii or borders on artwork images, no text pressed onto images, no heavy frames, no flashy walls, no saturated multicolor decoration. The single accent is restrained terracotta.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1a1a1a` | `--color-ink` | Titles and primary text. The label's ink. |
| Gallery White | `#fcfcfa` | `--color-gallery-white` | Page ground. A slightly warm white, like a painted wall. |
| Terracotta | `#a85a3a` | `--color-terracotta` | The only accent, sparingly on numbers, links and selected marks. |
| Stone | `#8a8a85` | `--color-stone` | Captions, numbers and metadata. Lowest level but must stay readable. |
| Hairline | `#e8e6e1` | `--color-hairline` | Every divider, never more than 1px. |
| Dark Stone | `#2e2e2c` | `--color-dark-stone` | Reversed sections, for "about" and the footer. |

## Typography

### Cormorant Garamond — titles in a light serif with wide tracking. Hierarchy comes from size and tracking, never boldness.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 300, 400
- **Sizes:** 22, 28, 36, 48, 64
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** 0.02em on display, 0.2em on uppercase labels

### Inter — body and captions in a light sans, sizes held to 12 to 15px so the work keeps the stage.

- **Substitute:** system-ui, 'Helvetica Neue', sans-serif
- **Weights:** 300, 400
- **Sizes:** 12, 13, 15
- **Line height:** 1.5 (display), 1.5 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Cormorant Garamond | 300 | 64px | 1.1 | 0.02em | `--text-display` |
| heading | Cormorant Garamond | 300 | 48px | 1.15 | — | `--text-heading` |
| subheading | Cormorant Garamond | 400 | 36px | 1.25 | — | `--text-subheading` |
| body-lg | Inter | 300 | 15px | 1.7 | — | `--text-body-lg` |
| body | Inter | 300 | 13px | 1.7 | — | `--text-body` |
| label | Inter | 400 | 12px | 1.5 | 0.2em | `--text-label` |

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
| media | 0 |

- **Page max-width:** 1440px
- **Section gap:** 160px
- **Card padding:** 0px
- **Element gap:** 24px

## Components

### Snap Rail

**Role:** the horizontal rail (core structure)

Container with overflow-x: auto, scroll-snap-type: x mandatory, scrollbar hidden but keyboard and touch scrolling preserved. Each work is shrink-0, scroll-snap-align: start, spaced 64px. A 1px hairline runs above and below the rail.

- **Sizes:** gap 64px between works

### Gallery Cell

**Role:** the artwork cell

Image width scales with the viewport (42vw desktop, 60vw tablet, 82vw mobile), height adaptive to the original ratio, zero radius, zero border, zero shadow. 16px below the image sits the caption: a 12px uppercase 0.2em stone-grey number (No. 01) plus title and year. Captions never appear on the image.

- **Sizes:** 42vw desktop / 60vw tablet / 82vw mobile

### Sticky Title

**Role:** the resident section title (first cell)

The track's first cell, sticky left-0, ground-matched background, 320px wide, 1px hairline on its right. Title 48px light serif, with a 12px uppercase section number below. It stays resident through the horizontal scroll, naming the current section.

### Hairline Caption

**Role:** captions and metadata

12px, 0.2em tracking, uppercase, stone #8a8a85. Format fixed as "No. 01 / Title / Year / Medium". The number is terracotta. It mimics a museum label — never bolded, never omitting the number.

### Wall Rule

**Role:** the wall divider

1px, #e8e6e1, spanning the content width, inset 24px at each end. It separates chapters' tracks. Absolutely never 2px or thicker — a heavy line turns the page into a table, not a wall.

## Do's and Don'ts

### Do

- Snap horizontally with snap-x mandatory
- Give every work a No. 01 number and label
- Keep every divider at exactly 1px
- Stick the section title to the rail's left
- Set titles in light serif, hierarchy by tracking
- Restrict accent to sparing terracotta

### Don't

- Don't shadow, round or frame artwork images
- Don't press text onto the artwork
- Don't mix masonry into the rail
- Don't use borders of 2px or more
- Don't decorate the walls
- Don't use saturated multicolor ornament

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Gallery White | `#fcfcfa` | The walls |
| 1 | Dark Stone | `#2e2e2c` | Reversed sections |

## Elevation

- **None:** `none — a shadow would mount the work on the wall`

## Imagery

The artwork image is the only content: high quality, precisely cropped, unfiltered. Different sizes and ratios are allowed (that is the gallery's rhythm), but every work carries its number and label. No decorative illustration, background textures or multicolor graphics.

## Layout

Capped at 1440px with 32px rail padding and 160px chapter gaps. Vertically the page is nearly all whitespace; the horizontal carries the content. Mobile may drop to one 82vw work visible at a time.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#fcfcfa`
- accent: `#a85a3a`
- stone: `#8a8a85`
- hairline: `#e8e6e1`
- dark: `#2e2e2c`

EXAMPLE COMPONENT PROMPTS:

1. Build a horizontal gallery: container overflow-x auto, scroll-snap-type x mandatory, a 1px #e8e6e1 hairline above and below. Each work is shrink-0, scroll-snap-align start, 64px apart, 42vw wide (82vw on mobile), zero radius, zero border, zero shadow. 16px below the image sits a 12px uppercase 0.2em caption formatted "No. 01 / Title / Year", the number in terracotta #a85a3a, the rest #8a8a85. The section title is the first cell, sticky left-0, 320px wide, 48px light serif. Page ground #fcfcfa.
