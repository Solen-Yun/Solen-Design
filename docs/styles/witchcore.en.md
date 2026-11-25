# Witchcore — Style Reference

> Moon phases, tarot, amethyst and gold runes: a divination laid out on a late-night desk.

**Theme:** dark

Witchcore is the occult aesthetic: a vertical gradient from deep violet to midnight black (#4a1942 to #0d0b14), gold rune text (#c9a74e) with a 0 0 8px shimmer, borders as 30% translucent gold hairlines rising to 60% on hover, cards in #0d0b14 at 80% with slight blur for a hazed feel, amethyst (#7b68ae) as the secondary information color, and the background dusted with stars (small radial-gradient points). Serif type with wide tracking gives words a ceremonial quality. Moon phases, tarot cards, crystals and herbs are its graphic vocabulary.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Violet | `#4a1942` | `--color-deep-violet` | The gradient's top. The violet of dusk, moving toward midnight black. |
| Midnight | `#0d0b14` | `--color-midnight` | The gradient's bottom and card ground. Near-black with violet in it. |
| Gold | `#c9a74e` | `--color-gold` | Runes, borders and every glow. The source of the ceremonial feel. |
| Amethyst | `#7b68ae` | `--color-amethyst` | Secondary information and moonlight semantics. |
| Herb Green | `#3d8b6e` | `--color-herb-green` | Herbs and "growth" semantics, less frequent. |
| Sprout | `#6bc15e` | `--color-sprout` | The brightest, appearing only in herb details and "new" marks. |

## Typography

### Cormorant Garamond — serif, headings at 0.04em tracking, labels at 0.24em. The wide tracking makes words sound like an incantation.

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 14, 17, 21, 28, 36, 48
- **Line height:** 1.2 (display), 1.3 (headings), 1.75 (body)
- **Letter spacing:** 0.04em on display, 0.24em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 48px | 1.2 | 0.04em | `--text-display` |
| heading | — | 600 | 36px | 1.25 | 0.04em | `--text-heading` |
| subheading | — | 400 | 28px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 21px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 17px | 1.75 | — | `--text-body` |
| label | — | 600 | 14px | 1.55 | 0.24em | `--text-label` |

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
| cards | 12px |
| buttons | 8px |
| moons | 999px |

- **Page max-width:** 1040px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Haze Card

**Role:** the haze card (core component)

Midnight 80% fill, 8px blur, 12px radius, 1px gold 30% stroke, 32px padding. Title 36px/600 gold with a 0 0 8px gold text shimmer, body 17px white 80%. On hover the stroke rises to 60% and the gold text glow widens to 24px.

### Rune Label

**Role:** the rune label

Transparent ground, 1px gold 30% stroke, 8px radius, 14px/600, 0.24em tracking, padding 4px 12px, text gold with a 0 0 8px shimmer. A 6px gold diamond may sit at each side as a rune separator.

### Moon Phase Row

**Role:** the moon-phase ornament

A row of 5 to 8 moon-phase icons (16px each, new moon to full), 12px apart, in gold or amethyst, the current phase carrying a 0 0 12px shimmer. It is both ornament and an indicator of "which stage we are in", used at sections and statuses.

### Tarot Frame

**Role:** the tarot card

Vertical 2:3 ratio, 12px radius, 1px gold 40% stroke, 20px padding, midnight 90% fill. A 1px gold inner rule sits at both top and bottom, with a figure at the center (moon phase, crystal, herb line work). On hover the card lifts 4px, the gold rule reaches 80% and the stardust brightens within 600ms.

### Stardust Bed

**Role:** the stardust ground

Over the gradient, 20 to 40 white or pale-gold points of 1 to 2px (radial-gradient or multiple box-shadows) at 20% to 50% opacity, distributed unevenly. A very slow twinkle is allowed (each point on a 4 to 8 second cycle, offset from the others) — never a fast blink.

## Do's and Don'ts

### Do

- Run a vertical gradient from deep violet to midnight black
- Pair gold runes with an 8px shimmer
- Keep borders 30% gold, rising to 60% on hover
- Use 80% midnight cards with slight blur
- Set serif with wide tracking
- Speak in moon phases and tarot

### Don't

- Don't use bright photography
- Don't use high-saturation imagery
- Don't let the stardust blink fast
- Don't use thick borders
- Don't use a modern sans for headings
- Don't let the stardust carry content

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Sky Gradient | `linear-gradient(#4a1942, #0d0b14)` | Page ground |
| 1 | Haze Card | `rgba(13,11,20,0.80)` | Cards |
| 2 | Gold Ground | `rgba(201,167,78,0.12)` | Rune grounds |

## Elevation

- **Gold shimmer:** `0 0 8px rgba(201,167,78,0.40)`
- **Gold bloom:** `0 0 24px rgba(201,167,78,0.30)`

## Imagery

Occult imagery: tarot faces, moon phases, crystals, herbs, candlelight, star charts. Must be dark-toned, gold-and-violet, and hazed. No bright photography, modern illustration or high-saturation imagery.

## Layout

Capped at 1040px with 24px container padding and 112px section gaps. Elements may rotate slightly (-1 to 1 degree) and offset, as if cards were spread out. Whitespace is generous; the stardust fills the gaps without carrying content.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#c9a74e`
- background: `#0d0b14`
- violet: `#4a1942`
- amethyst: `#7b68ae`
- herb: `#3d8b6e`
- gold: `#c9a74e`

EXAMPLE COMPONENT PROMPTS:

1. Build a witchcore card: background rgba(13,11,20,0.8) with 8px blur, 12px radius, 1px rgba(201,167,78,0.3) stroke, 32px padding. Title 36px/600 Cormorant Garamond in #c9a74e with text-shadow 0 0 8px rgba(201,167,78,0.4) and 0.04em tracking; body 17px at line height 1.75 in rgba(255,255,255,0.8). Above it a row of 16px moon-phase icons (gold, the current phase with a 0 0 12px shimmer), 12px apart. Page ground linear-gradient(#4a1942, #0d0b14) with 30 pale-gold 1–2px stardust points at 30% opacity. On hover the stroke rises to rgba(201,167,78,0.6).
