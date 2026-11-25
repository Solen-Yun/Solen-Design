# Comic Style — Style Reference

> Thick ink lines, hard shadows, speech bubbles and burst lettering: a comic panel on screen.

**Theme:** light

Comic style ports the vocabulary of printed comics onto the interface: a 4px pure-black ink line surrounds every element, a 4px blur-free shadow mimics print misregistration, halftone dots texture the backgrounds, and information lives in speech bubbles rather than cards. Type must be bold, uppercase, wide-tracked — like a title box. Motion is exaggerated but short: hover scales the element 1.05 and rotates it 1 degree, never longer than 100ms, like a jump cut between panels. Radius is only allowed on bubbles; everything else stays square.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1a1a1a` | `--color-ink` | All borders, shadows, body text and bubble strokes. The ink line is this style's only structural language. |
| Paper | `#ffffff` | `--color-paper` | Panel ground. Keep the printing-paper cleanliness so the halftone shows. |
| Comic Red | `#ff3333` | `--color-comic-red` | Action, warnings and impact words. Marks "this panel matters". |
| Comic Yellow | `#ffcc00` | `--color-comic-yellow` | Highlights and bursts, usually paired with red. |
| Comic Blue | `#3366ff` | `--color-comic-blue` | Links, info bubbles and the "system" semantic. |
| Comic Green | `#33cc33` | `--color-comic-green` | Success and "cleared" states; the least frequent. |

## Typography

### Bangers — headlines and impact words. A comic face with hand-drawn irregularity; that is the style's voice.

- **Substitute:** 'Impact', 'Arial Black', sans-serif
- **Weights:** 400
- **Sizes:** 20, 28, 40, 56
- **Line height:** 1 (display), 1.05 (headings), 1.5 (body)
- **Letter spacing:** 0.02em on display, 0.08em on uppercase labels

### Comic Neue — bubble text and body. Must stay readable while keeping the hand-written feel.

- **Substitute:** 'Comic Sans MS', 'Segoe UI', sans-serif
- **Weights:** 400, 700
- **Sizes:** 13, 15, 18
- **Line height:** 1.4 (display), 1.4 (headings), 1.55 (body)
- **Letter spacing:** 0.01em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Bangers | 400 | 56px | 1 | 0.02em | `--text-display` |
| heading | Bangers | 400 | 40px | 1.05 | — | `--text-heading` |
| subheading | Bangers | 400 | 28px | 1.1 | — | `--text-subheading` |
| body-lg | Comic Neue | 700 | 18px | 1.45 | — | `--text-body-lg` |
| body | Comic Neue | 400 | 15px | 1.55 | — | `--text-body` |
| label | Comic Neue | 700 | 13px | 1.3 | 0.08em | `--text-label` |

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
| bubbles | 24px |
| pills | 999px |

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Ink Button

**Role:** primary action button

Paper-white fill, 4px ink-black border, zero radius, 4px hard shadow, 18px uppercase bold, 0.08em tracking, padding 14px 28px. On hover the fill hard-cuts to comic yellow, the button scales 1.05 and rotates 1 degree, within 100ms; on press it translates 4px 4px while the shadow drops to none.

- **Sizes:** padding 14px 28px; label 18px
- **States:** hover: yellow fill, scale 1.05, rotate 1deg; active: translate 4px, shadow none

### Speech Bubble

**Role:** the information container (replacing cards)

Paper-white fill, 3px ink-black stroke, 24px radius (the only rounded element), 20px padding, 4px hard shadow. The tail is drawn with two pseudo-elements: a 3px-stroked triangle and a white triangle covering the stroke, forming a hollow speech point. Text 15px, line height 1.55.

### Halftone Panel

**Role:** background panel blocks

White ground with a 6px-interval radial dot grid (1px radius, ink black) at 12% overall opacity. Gives a region a printed texture; never covers more than 40% of a screen. The block itself may carry a 4px ink border, forming a panel frame.

### Burst Lettering

**Role:** impact words and emphasized titles

Comic face at 40 to 56px, uppercase, filled comic red or yellow, 2px ink stroke (-webkit-text-stroke), a 4px 4px ink offset shadow. May rotate -3 to 3 degrees. At most one per screen.

### Panel Grid

**Role:** the panel-frame container

A 2-to-3-column grid, 12px gap, every cell bordered with 4px ink, zero radius. Cell heights may differ; one cell may span two columns as the establishing shot. The grid keeps 48px of white margin, echoing a printed page.

## Do's and Don'ts

### Do

- Wrap every element in the 4px ink line
- Use hard shadows to mimic print misregistration
- Reserve radius for speech bubbles only
- Texture backgrounds with halftone dots
- Keep motion under 100ms but exaggerated
- Set titles in the comic face, uppercase

### Don't

- Don't use borders thinner than 2px
- Don't use soft shadows
- Don't lean on gradients as the main visual
- Don't round cards
- Don't exceed 100ms motion
- Don't set titles in a formal sans

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#ffffff` | Panel ground |
| 1 | Halftone | `radial-gradient(#1a1a1a 1px, transparent 1px) 6px` | The halftone texture layer |

## Elevation

- **Print offset:** `4px 4px 0 #1a1a1a`
- **Offset red:** `4px 4px 0 #ff3333`
- **Pressed:** `none`

## Imagery

Comic panels and script-style illustration: thick strokes, flat fills, halftone shading. Photos may be converted to halftone monochrome and set inside a panel. No realistic photography, no gradients, no soft shadows.

## Layout

Capped at 1120px, a 2-to-3-column panel grid with 12px gaps and 48px page margins. Sections divide with one continuous 4px ink line, like turning a page. The usual hero: one full-width title panel plus a speech bubble.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#ffffff`
- red: `#ff3333`
- yellow: `#ffcc00`
- blue: `#3366ff`
- green: `#33cc33`

EXAMPLE COMPONENT PROMPTS:

1. Build a comic-style button: white ground, 4px solid #1a1a1a border, border-radius 0, box-shadow 4px 4px 0 #1a1a1a, 18px bold uppercase at 0.08em tracking, padding 14px 28px. On hover the background hard-cuts to #ffcc00 with transform scale(1.05) rotate(1deg), transition 100ms; on active translate(4px,4px) with box-shadow none.
2. Build a speech bubble: white fill, 3px #1a1a1a stroke, 24px radius, 20px padding, 4px hard shadow. Draw the tail with two pseudo-elements — a stroked triangle and a white triangle covering the stroke — for a hollow speech point. Text 15px at 1.55 line height.
