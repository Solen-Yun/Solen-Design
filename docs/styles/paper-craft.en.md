# Paper Craft — Style Reference

> Layer upon layer of cut paper: each sheet casts a little shadow, each one sits slightly askew.

**Theme:** light

Paper craft simulates cut paper and layered sheets: on a paper-white ground (#fdf6ee) sit bright paper colors (rose #e85d75, mint #5cb8a5, marigold #f5c040, indigo #6b7fb5), each sheet carrying a fixed 4px offset hard shadow (black 8%) showing it stands slightly off the desk. Radii run 12 to 16px, paired with a 1-degree micro-rotation for a handmade imperfection; layering uses several absolutely positioned divs with different shadow depths. Dark backgrounds are banned, glow and neon shadows are banned, metallic and glassy finishes are banned — paper does not reflect.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Rose Paper | `#e85d75` | `--color-rose-paper` | The first paper color: main buttons, the topmost sheet and key accents. |
| Paper White | `#fdf6ee` | `--color-paper-white` | Page ground and the largest sheet beneath. |
| Mint Paper | `#5cb8a5` | `--color-mint-paper` | The second paper color, for secondary sections and "nature" semantics. |
| Marigold Paper | `#f5c040` | `--color-marigold-paper` | Highlights and badges, the loudest of the four. |
| Indigo Paper | `#6b7fb5` | `--color-indigo-paper` | The cool paper color, for information and the third layer. |
| Ink | `#2d2d2d` | `--color-ink` | Text and cut-paper outlines. Not pure black. |

## Typography

### Quicksand — a rounded sans, or one with a handwritten feel. The letterforms must not come to a point; paper art has no sharp strokes.

- **Substitute:** 'Trebuchet MS', 'Segoe UI', sans-serif
- **Weights:** 500, 700
- **Sizes:** 13, 16, 20, 26, 34, 46
- **Line height:** 1.15 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** 0.01em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 46px | 1.15 | 0.01em | `--text-display` |
| heading | — | 700 | 34px | 1.25 | — | `--text-heading` |
| subheading | — | 500 | 26px | 1.35 | — | `--text-subheading` |
| body-lg | — | 500 | 20px | 1.6 | — | `--text-body-lg` |
| body | — | 500 | 16px | 1.7 | — | `--text-body` |
| label | — | 700 | 13px | 1.5 | 0.08em | `--text-label` |

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
| cards | 16px |
| buttons | 12px |
| inputs | 12px |
| stickers | 999px |

- **Page max-width:** 1080px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 24px

## Components

### Paper Card

**Role:** the paper card (core component)

Paper-white or one paper color fill, 16px radius, no stroke, 28px padding, hard shadow 4px 4px 0 black 8%. The whole card rotates 1 degree. On hover it lifts 2px, the shadow widens to 6px and the rotation returns to zero. Transition 300ms ease-out.

- **States:** hover: lift 2px, rotation to 0

### Stacked Sheets

**Role:** the stacked sheets

Three absolutely positioned rounded rectangles, each offset 8px from the one above with a deeper shadow (4px → 6px → 8px) and its own angle (-1, 0, +1.5 degrees). Only the top layer carries content; the other two fill in different paper colors. Three layers is fixed — more looks dirty.

### Craft Button

**Role:** action buttons

Paper-color fill, paper-white text, 12px radius, no stroke, 16px/700, padding 12px 28px, hard shadow 3px 3px 0 black 10%. On hover the shadow widens to 5px and the button lifts 1px; on press the shadow collapses and the button sinks 1px. Transition 150ms ease-out.

- **Sizes:** padding 12px 28px; label 16px
- **States:** hover: shadow 5px, lift 1px; active: shadow none

### Cut Edge

**Role:** the cut-edge ornament

A clip-path polygon makes hand-cut notches on one side of a sheet (5 to 8 vertices, each offset 2 to 4px), or a repeating scalloped half-circle edge. Only one side may be cut — cutting all four loses the sense of "cut".

### Corner Sticker

**Role:** corner stickers and dots

A 32 to 56px circle or half-circle in one paper color with a 3px 3px 0 black 10% hard shadow, pressed onto a sheet's corner and overhanging its edge by 8px. It is the element that best expresses "stuck on by hand" — two to four per screen.

## Do's and Don'ts

### Do

- Ground in paper white and paste color blocks on top
- Use a fixed 4px offset hard shadow to lift sheets off the desk
- Pair 12 to 16px radii with a 1-degree micro-rotation
- Layer at most three sheets, deepening shadow per layer
- Cut notches on only one side
- Let corner stickers overhang by 8px

### Don't

- Don't use dark or black backgrounds
- Don't use glow or neon shadows
- Don't use metallic or glassy finishes
- Don't cut all four edges
- Don't layer more than three sheets
- Don't use sharp letterforms

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper White | `#fdf6ee` | Page ground |
| 1 | Rose Sheet | `#e85d75` | First sheet layer |
| 2 | Mint Sheet | `#5cb8a5` | Second sheet layer |

## Elevation

- **Paper layer 1:** `4px 4px 0 rgba(0,0,0,0.08)`
- **Paper layer 2:** `6px 6px 0 rgba(0,0,0,0.10)`
- **Button:** `3px 3px 0 rgba(0,0,0,0.10)`

## Imagery

Cut-paper illustration, layered sheet compositions, paper-texture photography. Images may be scenes built from multiple paper layers and must show clear hand-cut notches. No realistic photography, metal or glass finishes, glowing images.

## Layout

Capped at 1080px with 24px container padding and 96px section gaps. Elements may rotate ±1.5 degrees and offset 8px. Layer depth stops at three. The page stays paper-white, with color blocks reading as pasted-on sheets.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#2d2d2d`
- background: `#fdf6ee`
- rose: `#e85d75`
- mint: `#5cb8a5`
- marigold: `#f5c040`
- indigo: `#6b7fb5`

EXAMPLE COMPONENT PROMPTS:

1. Build a paper-craft card: paper-white #fdf6ee fill, 16px radius, no border, 28px padding, box-shadow 4px 4px 0 rgba(0,0,0,0.08), transform rotate(1deg). Title 34px/700 in #2d2d2d; body 16px/500 at line height 1.7. Two sheets sit beneath: each offset 8px, shadows 6px and 8px, rotations -1 and 1.5 degrees, filled #5cb8a5 and #f5c040. A 40px rose #e85d75 circular corner sticker overlaps the edge by 8px with a 3px 3px 0 rgba(0,0,0,0.1) shadow. On hover the card lifts 2px and its rotation returns to zero. Page ground #fdf6ee.
