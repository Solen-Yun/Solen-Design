# Kinetic Typography — Style Reference

> The type is the interface: it arrives letter by letter, its weight breathes, its width stretches with scroll velocity.

**Theme:** dark

Kinetic typography makes the variable font the animation itself: a near-black stage (#0b0b0c) with warm bone-white text (#f4f1eb), letters entering one by one, weight breathing, width stretching with scroll speed, and signal orange (#ff4d00) as the only accent — landing on the primary CTA, key words and hover states. Its technical discipline is harder than its visuals — animate only transform, opacity and font-variation-settings, never top, left, width or height (layout shifts stutter); discrete entrances use expo-out over 0.7 to 0.9 seconds, hovers 0.3 to 0.5; exceeding 1.2 seconds or using linear for a one-shot transition is wrong; one screen carries exactly one dominant motion (one protagonist at a time).

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink Black | `#0b0b0c` | `--color-ink-black` | The stage ground. Near-black, letting bone text and orange jump. |
| Bone | `#f4f1eb` | `--color-bone` | All text. A slightly warm white that never stings on the dark stage. |
| Signal Orange | `#ff4d00` | `--color-signal-orange` | The only accent: primary CTA, key words and hover. Never a large ground. |
| Panel | `#141416` | `--color-panel` | Cards and overlays, one step brighter than the stage. |
| Muted Grey | `#8a857b` | `--color-muted-grey` | Secondary text, metadata and timestamps. |

## Typography

### Inter Variable — the variable font is this style's animation engine: weight and width change live with scroll and interaction; titles run 96 to 132px.

- **Substitute:** 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 300, 500, 700, 900
- **Sizes:** 14, 18, 26, 40, 64, 96, 132
- **Line height:** 0.92 (display), 1 (headings), 1.5 (body)
- **Letter spacing:** -0.04em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 132px | 0.92 | -0.04em | `--text-display` |
| heading-lg | — | 900 | 96px | 0.95 | -0.03em | `--text-heading-lg` |
| heading | — | 700 | 64px | 1 | -0.03em | `--text-heading` |
| subheading | — | 700 | 40px | 1.05 | — | `--text-subheading` |
| body-lg | — | 500 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 300 | 14px | 1.5 | — | `--text-body` |
| label | — | 500 | 14px | 1.4 | 0.12em | `--text-label` |

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
| 160 | 160px | `--spacing-160` |

### Border Radius

| Element | Value |
|---|---|
| cards | 2px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1360px
- **Section gap:** 160px
- **Card padding:** 24px
- **Element gap:** 24px

## Components

### Letter Stagger

**Role:** the letter-by-letter entrance (core motion)

Split the title into spans per character, each starting at translateY(110%) with opacity 0; on entering the viewport they return to 0 and 1 at 30 to 40ms intervals, easing cubic-bezier(0.22, 1, 0.36, 1) (expo-out), 0.7 to 0.9 seconds per character. The parent carries overflow hidden for the rising-mask effect — a plain opacity fade is never a substitute. Under prefers-reduced-motion, show the final state directly.

- **Sizes:** stagger 30–40ms; per-letter 0.7–0.9s

### Variable Breath

**Role:** the weight-and-width breath

font-variation-settings cycles wght (300 to 900) and wdth (85 to 100) over 2.4 seconds, ease-in-out. Continuous decorative loops are exempt from the 1.2-second cap on one-shot transitions. At most one element per screen may breathe, or they fight.

- **Sizes:** 2.4s ease-in-out loop

### Scroll Marquee

**Role:** the marquee

Duplicate the content twice, container overflow hidden, translateX from 0 to -50% over 24 seconds linear for a seamless loop. Hover pauses it. When autoplay runs past 5 seconds alongside other content, a persistent pause/stop/hide control is required — hover alone doesn't count.

- **Sizes:** 24s linear, seamless

### Signal CTA

**Role:** the primary action button

Signal-orange fill, ink-black text, 2px radius, no stroke, 18px/700, padding 14px 32px. On hover the fill brightens 8% and the label's variable weight rises to 900 (0.4s expo-out); on press it scales 0.98. Transitions touch only opacity, transform and font-variation-settings.

- **Sizes:** padding 14px 32px; label 18px
- **States:** hover: weight to 900, brighter; active: scale 0.98

### Velocity Widen

**Role:** scroll-velocity width changes

Read scroll velocity (compute the per-frame scrollY delta inside rAF and cache it), mapped to font-variation-settings wdth (85 to 100) and letter-spacing (-0.04em to -0.02em). Velocity decays with a 0.3-second damper; at rest it returns to defaults. Never read layout properties in scroll events.

## Do's and Don'ts

### Do

- Animate only transform, opacity, font-variation-settings
- Enter with expo-out over 0.7 to 0.9 seconds
- Keep one dominant motion per screen
- Loop the marquee 24s linear, seamlessly
- Provide pause controls when autoplay passes 5 seconds
- Give signal orange only to the CTA, key words and hover

### Don't

- Don't animate layout properties (top/left/width/height)
- Don't run multiple main motions on one screen
- Don't let images steal the show
- Don't exceed one accent color
- Don't substitute plain fades for the rising mask
- Don't let one-shot transitions exceed 1.2s or run linear

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Ink Black | `#0b0b0c` | The stage |
| 1 | Panel | `#141416` | Cards |

## Elevation

- **None:** `none — the type carries the depth`
- **Panel:** `0 24px 60px rgba(0,0,0,0.60)`

## Imagery

Almost no images — the type is the image. Very-low-opacity noise or a grid may texture the stage. No illustration or photography; any figurative image steals the letters' scene.

## Layout

Capped at 1360px with 32px container padding and 160px section gaps. Type may run enormous and span the full width, flush to or overflowing the container. One dominant motion per screen; everything else stays still.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#f4f1eb`
- background: `#0b0b0c`
- accent: `#ff4d00`
- panel: `#141416`
- muted: `#8a857b`
- border: `rgba(244,241,235,0.12)`

EXAMPLE COMPONENT PROMPTS:

1. Build a kinetic-typography hero: stage ground #0b0b0c, text #f4f1eb. Title 132px/900, line height 0.92, -0.04em tracking, split into spans per character, each starting translateY(110%) with opacity 0, returning in order at 35ms intervals, 0.8s per character cubic-bezier(0.22,1,0.36,1), parent overflow hidden. The primary CTA is #ff4d00 fill with ink-black text and 2px radius. The marquee duplicates its content, translateX 0 → -50%, 24s linear seamless, pausing on hover. Animate only transform, opacity and font-variation-settings; one dominant motion per screen.
