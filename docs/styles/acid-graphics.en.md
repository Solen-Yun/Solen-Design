# Acid Graphics — Style Reference

> Fluorescent green on pure black, type stretched and warped, everything vibrating at high frequency.

**Theme:** dark

Acid graphics comes from rave culture and underground club visuals: a pure-black ground (#0a0a0a) carrying fluorescent green (#39ff14), fluorescent yellow (#e6ff00), violet (#a020f0) and pink (#ff6ec7); colors must be flat fluorescents, never gradients; type is monospace and warped with skew and rotate; shadows are hard-edged offsets. Its motion language is anti-polished — ease-in-out and slow micro-interactions are banned, all feedback completes within 100ms, like a device dropping frames. More bans: no soft pastels or low saturation, no radius, no serif, no white or light backgrounds.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Acid Green | `#39ff14` | `--color-acid-green` | The first primary. Vibrates against pure black; the style's emblem. |
| Pure Black | `#0a0a0a` | `--color-pure-black` | Page base. Must be near pure black so the fluorescents sting. |
| Acid Yellow | `#e6ff00` | `--color-acid-yellow` | The second fluorescent, in the closest frequency clash with green. |
| Electric Violet | `#a020f0` | `--color-electric-violet` | The third fluorescent, pulling the palette apart cold-warm. |
| Hot Pink | `#ff6ec7` | `--color-hot-pink` | The fourth fluorescent, for emotional emphasis and glitch feel. |
| Electric Cyan | `#00ffff` | `--color-electric-cyan` | The fifth fluorescent, least frequent, for data and scales. |

## Typography

### JetBrains Mono — monospace throughout; headings at 700 squeezed to a 0.95 line height, skew and rotate allowed.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 12, 14, 18, 26, 40, 64
- **Line height:** 0.95 (display), 1.05 (headings), 1.45 (body)
- **Letter spacing:** -0.02em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 64px | 0.95 | -0.02em | `--text-display` |
| heading | — | 700 | 40px | 1 | -0.02em | `--text-heading` |
| subheading | — | 700 | 26px | 1.1 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.45 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.45 | — | `--text-body` |
| label | — | 400 | 12px | 1.4 | 0.08em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** compact

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1360px
- **Section gap:** 48px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Skewed Headline

**Role:** the warped headline (the core component)

Monospace 700, line height 0.95, -0.02em tracking, the whole block at skewX(-8deg) with rotate(-2deg), in fluorescent green or yellow. May overlap color blocks and overflow the container. On hover the skew hard-cuts to -14 degrees (a twitch), with transition-none or 80ms linear.

- **States:** hover: skew to -14deg, instant

### Acid Button

**Role:** action button

Fluorescent-green fill, black text, zero radius, 2px black stroke, 14px/700, 0.08em tracking, padding 10px 24px, hard shadow 6px 6px 0 electric violet. On hover the fill hard-cuts to fluorescent yellow and the shadow swaps; on press it translates 6px 6px with the shadow at none. transition-none or 80ms linear.

- **Sizes:** padding 10px 24px; label 14px
- **States:** hover: hard color cut; active: translate 6px

### Liquid Form

**Role:** the liquid flowing shape

SVG feTurbulence plus feDisplacementMap (baseFrequency 0.015, scale 30) makes a flat color block or thick-stroked shape's edge flow. Fill with one fluorescent color, shifting the noise seed per second or per frame for a wriggle. Decoration blocks only — never text.

### Acid Card

**Role:** content cards

Pure-black 90% fill, zero radius, 2px fluorescent-green stroke, 20px padding, hard shadow 6px 6px 0 electric violet. Titles 26px/700 fluorescent green, body 14px white 80%. On hover the stroke hard-cuts to fluorescent yellow and the shadow turns green, transition-none.

- **States:** hover: hard color swap

### Tick Rail

**Role:** the tick and data rail

A 32px-tall strip with repeating-linear-gradient drawing a 2px fluorescent-cyan or green vertical line every 8px, like an audio level meter. Values in monospace fluorescent color stack on the right. For decoration and data viz, at most three per screen.

## Do's and Don'ts

### Do

- Pair pure black with fluorescent colors
- Keep colors flat fluorescent, never gradients
- Warp type with skew and rotate
- Use hard offset shadows
- Complete feedback within 100ms
- Set everything in monospace

### Don't

- Don't use soft pastels or low saturation
- Don't use rounded corners
- Don't use serif faces
- Don't use white or light backgrounds
- Don't use gradients
- Don't use ease-in-out or slow micro-interactions

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Pure Black | `#0a0a0a` | Page base |
| 1 | Panel | `#141414` | Cards and panels |

## Elevation

- **Acid offset:** `6px 6px 0 #39ff14`
- **Violet offset:** `6px 6px 0 #a020f0`
- **Pressed:** `none`

## Imagery

Rave-flyer graphics: warped metal textures, liquid color blocks, glitch stripes, ASCII and rasterized photos. Photos may be crushed into an 8-color fluorescent palette. No refined photography, soft illustration or low-saturation images.

## Layout

Capped at 1360px with 16px container padding and 48px section gaps. Heavy overlap, tilts of -8 to 8 degrees, and container overflow are allowed. The chaos must have rhythm: every screen needs at least one element angled differently from the rest.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#39ff14`
- background: `#0a0a0a`
- yellow: `#e6ff00`
- violet: `#a020f0`
- pink: `#ff6ec7`
- cyan: `#00ffff`

EXAMPLE COMPONENT PROMPTS:

1. Build an acid-graphics button: fluorescent green #39ff14 fill, black text, zero radius, 2px solid #0a0a0a border, 14px/700 at 0.08em tracking, padding 10px 24px, box-shadow 6px 6px 0 #a020f0. On hover the background hard-cuts to #e6ff00 and the shadow swaps, transition: none; on active translate(6px,6px) with no shadow. Headlines use monospace 700, line height 0.95, skewX(-8deg) rotate(-2deg), in #39ff14. Page base #0a0a0a, zero radius site-wide, no gradients, no soft transitions.
2. Build a tick rail: a 32px strip with repeating-linear-gradient drawing a 2px cyan line every 8px, values stacked in monospace fluorescent color on the right.
