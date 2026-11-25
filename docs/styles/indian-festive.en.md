# Indian Festive — Style Reference

> Vermilion, saffron orange, gold mandalas: one lamp from the festival of lights.

**Theme:** light

Indian festive comes from the visuals of the festival of lights and the color-powder festival: an ivory ground (#fff8e7), vermilion (#e63946) and saffron orange (#ff9f1c) as primary accents, gold (#d4af37) used abundantly for decorative lines and halos, royal violet (#7b2d8e) and peacock teal (#2a9d8f) as secondaries. Mandalas, oil lamps (diyas), petals and jewel patterns are the main figures, radius 12px conveys softness, and headings are bold with wide tracking. Unlike Islamic geometry's precision, filling and overlapping are allowed here — festivity is dense by nature.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Vermilion | `#e63946` | `--color-vermilion` | Primary: primary buttons, sari red and the loudest blocks. |
| Ivory | `#fff8e7` | `--color-ivory` | Page ground. A warm white, like festival light on a wall. |
| Saffron | `#ff9f1c` | `--color-saffron` | Second accent: petals, lamp flames and one end of gradients. |
| Gold | `#d4af37` | `--color-gold` | Decorative lines, strokes and halos. The source of the festive feel, usable in quantity. |
| Royal Violet | `#7b2d8e` | `--color-royal-violet` | Secondary and dark sections, cooling the overall warmth. |
| Peacock Teal | `#2a9d8f` | `--color-peacock-teal` | Secondary and "success" semantics, the only cool hue in frame. |

## Typography

### Cormorant Garamond — serif, headings 700 with wide tracking. The decoration comes from the letterforms, not an extra family.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 14, 17, 22, 30, 40, 54
- **Line height:** 1.2 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 54px | 1.2 | 0.02em | `--text-display` |
| heading | — | 700 | 40px | 1.3 | — | `--text-heading` |
| subheading | — | 400 | 30px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 22px | 1.65 | — | `--text-body-lg` |
| body | — | 400 | 17px | 1.7 | — | `--text-body` |
| label | — | 700 | 14px | 1.5 | 0.16em | `--text-label` |

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
| buttons | 12px |
| inputs | 12px |
| medallions | 999px |

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Mandala Card

**Role:** the mandala card (core component)

White or ivory fill, 12px radius, 1px gold 50% stroke, 32px padding, plus a soft 0 0 20px gold 35% glow. Centered at the top, a 96 to 160px mandala (concentric circles plus 8 to 16 symmetric petals, drawn in 1px gold lines, a vermilion dot at the center). Title 40px/700 vermilion, body 17px warm grey.

### Festive Button

**Role:** action buttons

Vermilion fill, ivory text, 12px radius, 1px gold 60% stroke, 17px/700, 0.16em tracking, padding 14px 32px, with a soft 0 0 20px gold 35% glow. On hover the fill turns saffron orange and the stroke reaches 100%; on press it scales 0.98. Transition 250ms ease-out.

- **Sizes:** padding 14px 32px; label 17px
- **States:** hover: saffron fill, gold border full; active: scale 0.98

### Diya Lamp

**Role:** the oil-lamp ornament

A 32 to 64px clay bowl (border-radius 40% 40% 50% 50%), filled vermilion or gold, with a 16px teardrop flame above the mouth (a radial gradient from saffron orange to yellow) carrying a 0 0 16px orange 60% glow. It identifies the festival more than anything else — two to four lamps per screen.

### Jewel Gradient

**Role:** the jewel gradient band

A horizontal gradient band (vermilion through saffron to gold, or violet through peacock teal to gold), 8 to 16px tall, for between sections or along a card's top. The gradient must be smooth with exactly three stops — more turns muddy.

### Petal Scatter

**Role:** the petal scatter

Eight to twenty small petals or circles (each 8 to 16px), in saffron, vermilion or gold, 40% to 80% opacity, scattered across a section and individually rotated 0 to 90 degrees. It echoes the color powder and petals of the festival — one or two groups per screen.

## Do's and Don'ts

### Do

- Pair the ivory ground with vermilion and saffron
- Use gold freely for decorative lines and halos
- Speak in mandalas and oil lamps
- Round corners 12px
- Give gradients exactly three stops
- Allow ornament to fill and overlap

### Don't

- Don't use cool-toned photography
- Don't compose minimally
- Don't let gradients exceed three stops
- Don't use sharp angles
- Don't let ornament bury the text
- Don't mix two radius systems

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Ivory | `#fff8e7` | Page ground |
| 1 | White Card | `#ffffff` | Cards |
| 2 | Gold Ground | `rgba(212,175,55,0.16)` | Decorative gold grounds |

## Elevation

- **Gold glow:** `0 0 20px rgba(212,175,55,0.35)`
- **Warm lift:** `0 8px 24px rgba(230,57,70,0.14)`

## Imagery

Festive photography and ornament: lamps, petals, sari patterns, jewels, mandalas, color powder. Must be warm, saturated and visibly gold. Photos may be graded warm-gold. No cool photography, minimal composition or undecorated imagery.

## Layout

Capped at 1120px with 24px container padding and 96px section gaps. Ornament may fill and overlap — the festival's density is part of the content. Headings often center; body copy may stay left-aligned.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#e63946`
- background: `#fff8e7`
- saffron: `#ff9f1c`
- gold: `#d4af37`
- violet: `#7b2d8e`
- teal: `#2a9d8f`

EXAMPLE COMPONENT PROMPTS:

1. Build an Indian-festive card: white or ivory #fff8e7 fill, 12px radius, 1px rgba(212,175,55,0.5) stroke, 32px padding, box-shadow 0 0 20px rgba(212,175,55,0.35). Centered at the top, a 120px mandala (concentric circles plus 12 symmetric petals, 1px gold lines, a vermilion #e63946 dot at the center). Title 40px/700 Cormorant Garamond in #e63946 with 0.02em tracking; body 17px in #5a4a3a. Button #e63946 fill, ivory text, 12px radius, 1px gold stroke, padding 14px 32px, gold glow, the fill turning #ff9f1c on hover. A 12px three-stop gradient band (#e63946 → #ff9f1c → #d4af37) sits at the section's top. Page ground #fff8e7.
