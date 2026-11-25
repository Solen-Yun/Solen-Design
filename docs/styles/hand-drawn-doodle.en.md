# Hand-Drawn Doodle — Style Reference

> Doodles in a notebook: dashed lines, colored markers, tape and push pins.

**Theme:** light

The hand-drawn doodle style turns the interface into a notebook page covered in sticky notes: a cream paper ground (#fffef5), every border a 2 to 3px dash, shadows not grey but solid colored offsets (yellow, red or cyan), titles allowed a -3-degree skew, cards tilting slightly on hover. The decorative vocabulary includes tape strips, push pins and paper clips — what separates it from "pencil sketch": the pencil is quieter, the doodle is louder. Type is a bold sans, never monospace, because notes are written by hand.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#2c2c2c` | `--color-ink` | Dashed borders, headings and main text. Like a black felt-tip pen. |
| Cream | `#fffef5` | `--color-cream` | Page and card ground. A very pale warm yellow, like recycled paper. |
| Marker Red | `#ff6b6b` | `--color-marker-red` | The first accent and shadow color. Card shadows swap to it on hover. |
| Marker Teal | `#4ecdc4` | `--color-marker-teal` | Links and secondary accent; the button's hover shadow color. |
| Marker Yellow | `#ffd93d` | `--color-marker-yellow` | Highlights and the default shadow color, marking a region. |
| Olive | `#a98d16` | `--color-olive` | The only dark accent, for text pressed onto yellow. |

## Typography

### Baloo 2 — headings and buttons, weight 800 with a -3-degree skew allowed. The rounded sans is the doodle's voice.

- **Substitute:** 'Comic Sans MS', 'Trebuchet MS', sans-serif
- **Weights:** 600, 800
- **Sizes:** 14, 18, 24, 32, 44
- **Line height:** 1.1 (display), 1.2 (headings), 1.55 (body)
- **Letter spacing:** 0.02em on display, 0.12em on uppercase labels

### Nunito — body and captions, readable but still carrying a hand-written feel.

- **Substitute:** 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 600
- **Sizes:** 14, 16, 18
- **Line height:** 1.4 (display), 1.4 (headings), 1.65 (body)
- **Letter spacing:** 0 on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Baloo 2 | 800 | 44px | 1.1 | 0.02em | `--text-display` |
| heading | Baloo 2 | 800 | 32px | 1.15 | — | `--text-heading` |
| subheading | Baloo 2 | 600 | 24px | 1.25 | — | `--text-subheading` |
| body-lg | Nunito | 600 | 18px | 1.6 | — | `--text-body-lg` |
| body | Nunito | 400 | 16px | 1.65 | — | `--text-body` |
| label | Baloo 2 | 600 | 14px | 1.35 | 0.12em | `--text-label` |

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
| doodles | 60% 40% 50% 50% |

- **Page max-width:** 1080px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Doodle Button

**Role:** action button

Cream ground, 2px dashed ink border, 2px radius, 18px/800 uppercase at 0.12em tracking, padding 12px 24px, shadow 4px 4px 0 marker red. On hover the fill hard-cuts to ink, the text turns cream, the button lifts 4px, shifts right 1px and rotates 1 degree with the shadow swapping to marker teal and widening to 6px; on press it translates 3px 3px, scales 0.98, rotation zeroes and the shadow drops. Transition 150ms linear.

- **Sizes:** padding 12px 24px; label 18px
- **States:** hover: invert, rotate 1deg, teal shadow; active: translate 3px, shadow none

### Note Card

**Role:** note cards and content cards

Cream ground, 3px dashed ink border, 2px radius, 32px padding, shadow 5px 5px 0 marker yellow. Titles 32px/800 resting at -3 degrees, returning to zero on hover. On hover the card lifts 4px, rotates -1 degree and the shadow swaps to marker red, widening to 8px. Transition 150ms linear.

### Tape Strip

**Role:** the decorative tape

96px wide, 24px tall, rotated -4 degrees, semi-transparent marker yellow 80%, a 2px zigzag at each end (clip-path), no border or shadow. Placed at a card's top-left or top-right, overlapping the border by 4px. Purely decorative; no interaction.

### Scribble Input

**Role:** forms and note inputs

Cream ground, 2px dashed ink border, 2px radius, padding 12px 16px, 16px sans. Placeholders at ink 30%. On focus the border turns marker red with a 2px 2px 0 marker-yellow hard shadow, without changing the box size. Transition 200ms.

### Doodle Underline

**Role:** hand-drawn underlines and circles

A single-cycle SVG wave (2px stroke, one of the marker colors) pressed 4px below the text, 6% wider than it. Circles take an ellipse, tilted 6 degrees, left unclosed (a 12px gap), used once to keep the emphasis scarce.

## Do's and Don'ts

### Do

- Use dashed borders everywhere, 2 to 3px
- Shadow with solid colored offsets
- Allow cards a ±2-degree rotation
- Decorate with tape, pins and real objects
- Bold the titles with a -3-degree skew allowed
- Keep motion at 150ms linear

### Don't

- Don't use solid borders
- Don't use grey blurred shadows
- Don't use monospace type
- Don't use gradients
- Don't use precise right angles and geometry
- Don't use large radii

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream | `#fffef5` | Page canvas |
| 1 | Note | `#fffef5` | Cards (same color; the dashes and colored shadows do the separating) |

## Elevation

- **Default:** `5px 5px 0 #ffd93d`
- **Hover:** `8px 8px 0 #ff6b6b`
- **Button default:** `4px 4px 0 #ff6b6b`
- **Pressed:** `none`

## Imagery

Doodle illustration, sticky-note photos, hand-drawn step diagrams. Photos may be pasted as "instant shots" with tape. No realistic photography, gradients or precise vector illustration.

## Layout

Capped at 1080px with 24px container padding and 96px section gaps. Cards may rotate ±2 degrees, at most three rotated cards per screen. Elements may drift slightly, like notes stuck on a wall. The grid stays readable — untidiness is not the goal.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#2c2c2c`
- background: `#fffef5`
- red: `#ff6b6b`
- teal: `#4ecdc4`
- yellow: `#ffd93d`
- olive: `#a98d16`

EXAMPLE COMPONENT PROMPTS:

1. Build a doodle button: background #fffef5, 2px dashed #2c2c2c border, 2px radius, 18px/800 uppercase at 0.12em tracking, padding 12px 24px, box-shadow 4px 4px 0 #ff6b6b. On hover the background becomes #2c2c2c, the text #fffef5, with translate(-1px, -4px) rotate(1deg) and the shadow becoming 6px 6px 0 #4ecdc4. On active translate(3px,3px) scale(0.98) with no shadow. Transition 150ms linear. Page ground #fffef5.
2. Build a tape strip: 96px wide, 24px tall, rotated -4 degrees, semi-transparent marker yellow 80%, a 2px zigzag at each end via clip-path, no border or shadow, overlapping the card border by 4px.
