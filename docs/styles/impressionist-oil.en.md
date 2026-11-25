# Impressionist Oil — Style Reference

> Thick paint and dappled light: an interface like a canvas that hasn't dried yet.

**Theme:** light

Impressionist oil borrows from Monet and Renoir: a warm canvas ground (#f5f0e1), brushstroke texture, dappled light, pointillist flecks of color, and the volume of impasto. Technically it rests on three things — buttons use a linear gradient to mimic paint squeezed from a tube, cards take a repeating-linear-gradient texture along the brush's direction, and shadows stack a solid base with a blurred spread to suggest the height of piled paint. Flat solid blocks are banned, neon is banned, monospace is banned, uppercase is banned — and a pressed button must sink 3px, because a solid shadow without the sink reads false.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#f5f0e1` | `--color-canvas` | Page ground. The warm cream of linen canvas; every stroke sits on it. |
| Warm Ochre | `#e8a87c` | `--color-warm-ochre` | Primary: sunsets, skin tones and primary buttons. Impressionism's favorite warmth. |
| Vermilion | `#c0392b` | `--color-vermilion` | Emphasis and the red of flowers, small in area but piercing. |
| Deep Blue | `#2c3e50` | `--color-deep-blue` | Text and shadows. Impressionism never uses pure black; deep blue serves as the dark. |
| Teal | `#1abc9c` | `--color-teal` | The cool side of water and leaves, a pointillist counterpoint to vermilion. |
| Sunlight | `#f5d88a` | `--color-sunlight` | Light patches and highlights; the brightest strokes in the frame. |

## Typography

### Lora — a bold serif, weight 700 for headings. Never monospace, never uppercase — impressionism is soft.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 15, 18, 22, 30, 40, 54
- **Line height:** 1.2 (display), 1.3 (headings), 1.75 (body)
- **Letter spacing:** 0.01em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 54px | 1.2 | 0.01em | `--text-display` |
| heading | — | 700 | 40px | 1.25 | — | `--text-heading` |
| subheading | — | 400 | 30px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 22px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 18px | 1.75 | — | `--text-body` |
| label | — | 700 | 15px | 1.5 | 0.06em | `--text-label` |

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
| cards | 10px |
| buttons | 8px |
| inputs | 8px |

- **Page max-width:** 1080px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Paint Button

**Role:** action button

A warm-ochre vertical gradient (#f0b98f to #d99a6d), canvas or deep-blue text, 8px radius, no stroke, 18px/700, padding 14px 32px, impasto shadow 0 4px 0 deep blue 18% plus 0 12px 28px deep blue 14%. On hover the gradient brightens and the shadow spreads to 36px; on press it translates 3px down while the shadow retreats to 1px — the feeling of paint pressed down. The focus ring must carry a canvas-colored offset.

- **Sizes:** padding 14px 32px; label 18px
- **States:** hover: brighter gradient; active: sink 3px, shadow 1px

### Brushstroke Card

**Role:** the brushstroke card (the core component)

Canvas fill layered with a repeating-linear-gradient stroke texture (8px intervals, deep blue 3%, -12 degrees, echoing the brush direction), 10px radius, 1px deep-blue 12% stroke, 32px padding, impasto shadow. Titles 40px/700 deep blue, body 18px at deep blue 75%. On hover the shadow deepens and thickens.

### Dab Light

**Role:** light patches and pointillism

A group of 6 to 14 circles, 12 to 32px in radius, in sunlight, teal or vermilion at 20% to 35%, absolutely positioned across a section, allowed to overlap and soften into each other. They mimic light through leaves, 2 to 3 groups per screen.

### Mixed Hue Edge

**Role:** the mixed-hue edge

Borders never use one color: two strokes offset from each other — vermilion 25% beneath, teal 20% above, each shifted 1px — so the boundary reads as pigments blending. It replaces the plain stroke.

### Canvas Field

**Role:** the canvas-field input

Canvas fill, 8px radius, 1px deep-blue 20% stroke, padding 12px 16px, 18px serif. On focus the stroke turns warm ochre with a 2px ochre 25% outer ring, the ring's offset in canvas color.

## Do's and Don'ts

### Do

- Ground on warm canvas with linen texture
- Gradient the buttons to mimic squeezed paint
- Texture the cards along the brush direction
- Stack shadows: solid base plus blurred spread
- Sink pressed buttons 3px
- Offset the focus ring in canvas color

### Don't

- Don't use flat solid blocks
- Don't use neon or fluorescent color
- Don't use monospace
- Don't use uppercase text
- Don't leave a pressed button unsunk
- Don't let the focus ring hug the element

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Canvas | `#f5f0e1` | Page ground (with linen texture) |
| 1 | Warm Wash | `rgba(232,168,124,0.14)` | Warm sections |
| 2 | Cool Wash | `rgba(26,188,156,0.10)` | Cool sections |

## Elevation

- **Impasto:** `0 4px 0 rgba(44,62,80,0.18), 0 12px 28px rgba(44,62,80,0.14)`
- **Impasto hover:** `0 6px 0 rgba(44,62,80,0.20), 0 18px 36px rgba(44,62,80,0.18)`
- **Pressed:** `0 1px 0 rgba(44,62,80,0.18)`

## Imagery

Impressionist oil painting: landscapes, gardens, water, small figure studies. Visible brushstrokes and blended color are mandatory; warm tones, soft light. Photos may be graded into painterly strokes. No flat solid blocks, neon imagery or crisp photography.

## Layout

Capped at 1080px with 24px container padding and 112px section gaps. Overlapping elements and softened edges are allowed. The whole page keeps the canvas texture, with color blocks semi-transparent like thin washes.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#2c3e50`
- background: `#f5f0e1`
- ochre: `#e8a87c`
- vermilion: `#c0392b`
- teal: `#1abc9c`
- sunlight: `#f5d88a`

EXAMPLE COMPONENT PROMPTS:

1. Build an impressionist card: canvas #f5f0e1 fill layered with a repeating-linear-gradient stroke texture (8px intervals, rgba(44,62,80,0.03), -12deg), 10px radius, 1px rgba(44,62,80,0.12) stroke, 32px padding, box-shadow 0 4px 0 rgba(44,62,80,0.18), 0 12px 28px rgba(44,62,80,0.14). Title 40px/700 Lora in #2c3e50; body 18px at 1.75 line height. Buttons take a warm-ochre gradient linear-gradient(#f0b98f, #d99a6d), 8px radius, 18px/700, padding 14px 32px, brightening on hover, and on active translateY(3px) with the shadow retreating to 1px. Page ground #f5f0e1.
2. Build a dab-light group: 6–14 circles of 12–32px radius in sunlight, teal or vermilion at 20–35%, overlapping across a section, 2–3 groups per screen.
