# VHS Aesthetic — Style Reference

> A tape watched for twenty years: chroma shift, noise, a timecode blinking.

**Theme:** dark

VHS aesthetics simulates the picture defects of 80s and 90s videotape: text splits RGB with paired magenta and cyan offsets, monospace throughout, a deep black or deep violet ground (#000000 or #1a0a2e), uppercase wide-tracked labels, scanlines and noise over the picture, and a blinking timecode resident at the lower right. Its difference from glitch art: "this is not a glitch but a medium" — VHS distortion is constant, gentle and total, not a sudden tear. Clean sharp typography is banned, because that is exactly what VHS never had.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Magenta | `#ff00ff` | `--color-magenta` | The warm side of the RGB split, and the primary text color. |
| Black | `#000000` | `--color-black` | Page ground. The tape's black field. |
| Cyan | `#00ffff` | `--color-cyan` | The cool side of the RGB split. Forever paired with magenta. |
| Yellow | `#ffff00` | `--color-yellow` | Timecode, recording marks and highlights. |
| Green | `#00ff00` | `--color-green` | The "PLAY" indicator and status, less frequent. |
| Deep Violet | `#1a0a2e` | `--color-deep-violet` | Secondary ground and a gradient end, keeping the black from dying. |

## Typography

### JetBrains Mono — monospace throughout. Labels uppercase with 0.18em tracking, like a VCR's on-screen characters.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 13, 16, 22, 32, 44
- **Line height:** 1.15 (display), 1.25 (headings), 1.55 (body)
- **Letter spacing:** 0.06em on display, 0.18em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 44px | 1.15 | 0.06em | `--text-display` |
| heading | — | 700 | 32px | 1.2 | 0.06em | `--text-heading` |
| subheading | — | 700 | 22px | 1.3 | 0.06em | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.55 | — | `--text-body` |
| label | — | 400 | 11px | 1.45 | 0.18em | `--text-label` |

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
| cards | 4px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1160px
- **Section gap:** 80px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Split Title

**Role:** the RGB-split title (core)

Monospace 700 uppercase, primary magenta, stacking two text copies: one offset 2px in cyan, one -2px in magenta, blend mode screen. At rest the offset is 2px; every 8 seconds a 200ms stepped jitter fires (steps(3)), jumping the offset to 4px and back. Body text never splits.

- **Sizes:** jitter 200ms steps(3), every 8s

### Tape Panel

**Role:** tape panels

Deep-violet fill, 4px radius, 1px magenta 25% stroke, 24px padding. Title 22px/700 with the split, body 13px white 80%. The upper left holds a "● REC" indicator (green dot blinking on a 1s cycle), the lower right the timecode (yellow, like 00:12:47). On hover the stroke rises to 50% and a 2px white 30% tracking bar sweeps across (180ms steps(3)).

- **States:** hover: border 50%, tracking bar sweep

### Scanline Bed

**Role:** the scanline and noise bed

Two fixed overlays: one repeating-linear-gradient (a 1px black 40% line every 3px), one noise layer (base64 grain or feTurbulence at 6% opacity). A third layer scrolls very slowly vertically (3px per 12 seconds, linear). pointer-events: none.

### Play Button

**Role:** action buttons

Transparent ground, 1px magenta 40% stroke, 2px radius, 11px monospace uppercase 0.18em, padding 10px 24px, magenta text with a 0 0 8px faint glow. On hover the stroke rises to 100% and text turns yellow; on press the element shifts 2px horizontally with one 60ms chroma drift. Transition 80ms linear.

- **Sizes:** padding 10px 24px; label 11px
- **States:** hover: yellow text; active: shift 2px, color drift

### OSD Label

**Role:** on-screen display labels

11px monospace uppercase 0.18em, yellow or green, optionally carrying a 1px black outline to stay readable over bright pictures. Format fixed as "SP · 00:12:47" or "PLAY". It is the VCR's overlay, resident in a corner.

## Do's and Don'ts

### Do

- Offset text with paired magenta and cyan
- Set monospace throughout
- Ground in deep black or deep violet
- Layer scanlines and noise
- Keep timecode and REC indicators resident
- Jitter 2 to 4px, once every 8 seconds

### Don't

- Don't use clean sharp typography
- Don't RGB-split body text
- Don't use HD clean photography
- Don't use large radii
- Don't use standard shadows
- Don't let noise bury the text

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Black | `#000000` | Page ground |
| 1 | Deep Violet | `#1a0a2e` | Panels |
| 2 | Noise Overlay | `grain + scanlines` | The noise layer |

## Elevation

- **RGB split:** `2px 0 #ff00ff, -2px 0 #00ffff`
- **Text glow:** `0 0 8px rgba(255,0,255,0.55)`
- **Never:** `no standard drop shadows`

## Imagery

Tape footage: home video, old commercials, surveillance, low-resolution material. Must carry scanlines, chroma shift and noise. Modern photos may be VHS-processed (chroma displacement, downsampling, grain). No HD clean photography or modern illustration.

## Layout

Capped at 1160px with 16px container padding and 80px section gaps. Slight picture offset and whole-frame jitter are allowed (2 to 4px every 8 seconds). Small radii (2 to 4px) throughout. All text stays readable above the OSD layer.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ff00ff`
- background: `#000000`
- cyan: `#00ffff`
- yellow: `#ffff00`
- green: `#00ff00`
- violet: `#1a0a2e`

EXAMPLE COMPONENT PROMPTS:

1. Build a VHS-aesthetic panel: deep violet #1a0a2e fill, 4px radius, 1px rgba(255,0,255,0.25) stroke, 24px padding. Title 22px/700 monospace uppercase with two stacked copies for RGB separation (one text-shadow 2px 0 #00ffff, one -2px 0 #ff00ff), jittering 200ms every 8 seconds. Upper left a "● REC" green dot (#00ff00, blinking on 1s), lower right a yellow timecode "00:12:47" (11px monospace 0.18em). The page overlays repeating-linear-gradient (1px black 40% every 3px) plus 6% noise. Buttons transparent with a 1px magenta stroke, 11px monospace uppercase 0.18em, text turning yellow on hover. Page ground #000000.
