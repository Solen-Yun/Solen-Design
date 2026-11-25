# Sketch Style — Style Reference

> Lines are never drawn straight: dashes, wiggles, a slight tilt — doodled on paper.

**Theme:** light

The key of the sketch style is "refuse perfection". Every border is dashed or wavy, cards may tilt -1 degree and return to 0 on hover, and shadows are cross-hatching instead of blurred fills. The ground is warm cream (#f5f0e8), the primary is pencil grey (#2c2c2c), and accents behave like colored pencils — four of them, never saturated. Motion must be brief (150 to 200ms) because pencil feedback means "drawing down", not "floating up". The easiest way to ruin this style is making the irregularity too regular — it turns into a decoration pattern.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Pencil Grey | `#2c2c2c` | `--color-pencil` | All lines, text and strokes. A warm grey, like a 2B pencil. |
| Paper | `#f5f0e8` | `--color-paper` | Page canvas. A yellow-leaning cream, closer to a sketchbook than pure white. |
| Vermilion | `#e74c3c` | `--color-vermilion` | Emphasis marks and reminders, like a red teacher's pen. |
| Lake Blue | `#3498db` | `--color-lake-blue` | Links and secondary marks; the calmest colored pencil. |
| Grass | `#27ae60` | `--color-grass` | Completion and checkmarks, for hand-drawn ticks and status. |
| Amber | `#f39c12` | `--color-amber` | Annotations and highlight grounds, like a marker pen. |

## Typography

### Caveat — headings and handwritten notes. The penmanship is the style's personality; without it there is nothing but dashed borders.

- **Substitute:** 'Comic Sans MS', 'Segoe Script', cursive
- **Weights:** 400, 700
- **Sizes:** 18, 22, 28, 40, 56
- **Line height:** 1.15 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** 0.01em on display, 0.1em on uppercase labels

### Georgia — body copy. A serif body wears better than handwriting, forming the contrast of handwritten titles over printed text.

- **Substitute:** 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 14, 16, 18
- **Line height:** 1.4 (display), 1.4 (headings), 1.7 (body)
- **Letter spacing:** 0 on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Caveat | 700 | 56px | 1.15 | — | `--text-display` |
| heading | Caveat | 700 | 40px | 1.2 | — | `--text-heading` |
| subheading | Caveat | 400 | 28px | 1.25 | — | `--text-subheading` |
| body-lg | Georgia | 400 | 18px | 1.7 | — | `--text-body-lg` |
| body | Georgia | 400 | 16px | 1.7 | — | `--text-body` |
| label | Caveat | 400 | 18px | 1.3 | 0.1em | `--text-label` |

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
| inputs | 2px |
| doodles | 40% 60% 70% 30% |

- **Page max-width:** 1080px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Sketch Button

**Role:** action button

Transparent ground, 2px dashed pencil-grey stroke, 2px radius, bold italic serif, 0.1em tracking, padding 12px 32px, shadow 4px 4px 0 pencil grey 15%. On hover the fill hard-cuts to pencil grey, the text turns paper, the shadow widens to 6px as the button lifts 4px and rotates 1 degree; on press it translates 4px 4px, rotates -2 degrees and the shadow drops to none. Transition 150ms.

- **Sizes:** padding 12px 32px
- **States:** hover: invert, lift 4px, rotate 1deg; active: translate 4px, rotate -2deg, shadow none

### Sketch Card

**Role:** content cards and notes

Paper ground, 2px solid pencil-grey stroke (cards may use solid; buttons stay dashed), 2px radius, 32px padding, a resting tilt of -1 degree, shadow 5px 5px 0 pencil grey 15%. On hover it rotates back to 0, lifts 4px and the shadow widens to 8px, over 200ms. A 32px hand-drawn ring (border-radius 40% 60% 70% 30%) may sit at the top-right, appearing on hover and scaling to 1.25.

### Sketch Input

**Role:** forms and writing inputs

Transparent ground, only a bottom 2px wavy line (simulated with repeating-linear-gradient), no side strokes, padding 8px 4px, 16px serif. On focus the wave turns lake blue and thickens to 3px, without changing the box size or adding a ring.

### Hand Underline

**Role:** hand-drawn underlines for headings and links

A 2px dashed line or a one-cycle SVG wave, 8% wider than the text, sitting 2px below, allowed a 1-degree tilt. On hover the underline grows from length 0 to 100% over 200ms, with steps or linear easing rather than a spring.

### Cross Hatched Shadow

**Role:** hatched shadows (instead of blurred ones)

Fill the shadow area with a repeating pattern of 1px lines at 45 and -45 degrees (6px apart, pencil grey 15%) — no blur. Only for illustrations and drawn elements that need "volume"; interface elements use the hard offset shadow.

## Do's and Don'ts

### Do

- Use dashed or wavy borders, never perfect straight lines
- Allow cards a ±1-degree tilt
- Shadow with hard offsets or hatching, never blur
- Keep the paper ground, not pure white
- Keep motion at 150 to 200ms, brief and direct
- Set headings handwritten, body in serif

### Don't

- Don't use perfect straight lines or symmetric radii
- Don't use a pure white background
- Don't use gradients or glass blur
- Don't use saturated color
- Don't use smooth animation longer than 200ms
- Don't let the irregularity become a pattern

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#f5f0e8` | Page canvas |
| 1 | Card Paper | `#f5f0e8` | Cards (same as ground; the border does the separating) |

## Elevation

- **Sketch offset:** `5px 5px 0 rgba(44,44,44,0.15)`
- **Sketch hover:** `8px 8px 0 rgba(44,44,44,0.20)`
- **Pressed:** `none`

## Imagery

Hand-drawn line art, pencil drafts, sticky-note doodles. Photos may be converted to line art before tinting. No realistic photography, no gradients, no smooth vector illustration.

## Layout

Capped at 1080px with 24px container padding and 96px section gaps. Elements may tilt ±1 degree for the handwritten feel, but tilts within one section keep the same direction. Whitespace need not be perfectly symmetric — like the arrangement of stickers in a journal.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#2c2c2c`
- background: `#f5f0e8`
- accent: `#e74c3c`
- link: `#3498db`
- success: `#27ae60`
- highlight: `#f39c12`

EXAMPLE COMPONENT PROMPTS:

1. Build a sketch-style button: transparent ground, 2px dashed #2c2c2c stroke, 2px radius, bold italic serif, 0.1em tracking, padding 12px 32px, box-shadow 4px 4px 0 rgba(44,44,44,0.15). On hover the ground becomes #2c2c2c, the text #f5f0e8, the shadow widens to 6px with transform translateY(-4px) rotate(1deg). On active translate(4px,4px) rotate(-2deg) with no shadow. Transition 150ms. Page ground #f5f0e8.
2. Build a sketch input: transparent ground with only a bottom 2px wavy line (repeating-linear-gradient), no side strokes, padding 8px 4px, 16px serif text. On focus the wave turns #3498db and thickens to 3px — no ring, no size change.
