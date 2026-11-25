# African Textile — Style Reference

> The warp and weft of woven cloth, the dye marks of resist work: color and structure woven together.

**Theme:** dark

African textile comes from West African kente cloth and adire resist dyeing: a deep-wood ground (#2c1810) conveying weight, kente orange (#c4501f) and gold (#f0c75e) as accents, sand (#e8d5b5) for cards and secondary grounds, and forest green (#1a5632) for text and ornament. The core figure is geometric weaving — alternating repeats of stripes, checks and diamonds, like warp on cloth; borders use 2 to 4px heavy lines to convey the fabric's structure; radius stays at 8px, handmade but not rough; headings are bold uppercase with wide tracking, giving weight.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Kente Orange | `#c4501f` | `--color-kente-orange` | First primary: primary buttons, stripes and the loudest woven bands. |
| Dark Wood | `#2c1810` | `--color-dark-wood` | Page ground. Deep enough that orange and gold both read warm. |
| Gold | `#f0c75e` | `--color-gold` | Second primary: the bright lines in the weave, highlights and badges. |
| Forest | `#1a5632` | `--color-forest` | Text and ornament, also the weave's third color. |
| Sand | `#e8d5b5` | `--color-sand` | Cards and light section grounds, balancing the dark wood. |
| Sprout | `#80e671` | `--color-sprout` | The brightest, appearing only in very small areas as accent. |

## Typography

### Inter — bold sans; headings 900, uppercase, 0.24em tracking. Wide tracking reads like the spacing of a loom's warp.

- **Substitute:** 'Arial Black', Helvetica, sans-serif
- **Weights:** 700, 900
- **Sizes:** 13, 16, 21, 28, 36, 48
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** 0.02em on display, 0.24em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 48px | 1.15 | 0.02em | `--text-display` |
| heading | — | 900 | 36px | 1.2 | 0.02em | `--text-heading` |
| subheading | — | 700 | 28px | 1.3 | — | `--text-subheading` |
| body-lg | — | 700 | 21px | 1.5 | — | `--text-body-lg` |
| body | — | 700 | 16px | 1.6 | — | `--text-body` |
| label | — | 900 | 13px | 1.4 | 0.24em | `--text-label` |

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
| cards | 8px |
| buttons | 6px |
| inputs | 6px |

- **Page max-width:** 1160px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Kente Band

**Role:** the kente woven band (signature)

A 24 to 64px tall woven band using repeating-linear-gradient alternating four colors (orange, gold, forest green, sand) as vertical stripes, 8 to 16px wide and uneven (wide and narrow alternating). Every three stripes carries a small diamond or check cell. It appears at page heads, between sections or along card tops.

### Woven Card

**Role:** the woven card (core component)

Sand fill, 8px radius, 4px dark-wood stroke, 28px padding, a 12px kente band joined at the top. Title 36px/900 uppercase forest green, 0.02em tracking; body 16px dark wood 85%. On hover the stroke turns kente orange and the card lifts 2px.

- **States:** hover: orange border, lift 2px

### Weave Button

**Role:** action buttons

Kente-orange fill, gold text, 6px radius, 2px dark-wood stroke, 13px/900 uppercase, 0.24em tracking, padding 14px 32px, hard shadow 0 4px 0 dark wood 60%. On hover the fill turns gold and the text dark wood; on press it translates 4px 4px with the shadow collapsing. Transition 120ms linear.

- **Sizes:** padding 14px 32px; label 13px
- **States:** hover: inverted; active: translate 4px

### Adire Wash

**Role:** the resist-dye ground

Layered radial-gradients (8 to 16px circles, randomly offset) over the ground create irregular dyed spots in gold or orange at 8% to 15% opacity. It must be an uneven repeat — a regular dot grid instantly reads as UI rather than cloth.

### Diamond Motif

**Role:** the diamond and check ornament

Solid diamonds 24 to 48px (a square rotated 45 degrees) or 2×2 checks, filled gold, orange or forest green, arranged in groups of two to four. They echo the symbols woven into cloth, placed at card corners or between sections, two or three groups per screen.

## Do's and Don'ts

### Do

- Pair the dark-wood ground with kente orange and gold
- Build woven bands from alternating stripes plus small cells
- Use 2 to 4px borders to convey fabric structure
- Set headings uppercase with wide tracking
- Keep 8px radius — handmade but not rough
- Make the resist texture uneven

### Don't

- Don't use cool-toned photography
- Don't pass off a regular dot grid as weaving
- Don't use hairline borders
- Don't use large radii
- Don't go modern-minimal
- Don't let the weave outweigh the content

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Dark Wood | `#2c1810` | Page ground |
| 1 | Sand Card | `#e8d5b5` | Cards |
| 2 | Woven Band | `#c4501f` | Woven bands |

## Elevation

- **Cloth lift:** `0 4px 0 rgba(44,24,16,0.60)`
- **Cloth depth:** `0 8px 24px rgba(44,24,16,0.50)`

## Imagery

Textile and craft photography: kente cloth, adire dyeing, woven baskets, pottery, market scenes. Must be warm, high contrast, with visible weave. Photos may be cropped into strips embedded in the woven structure. No cool photography, modern minimalism or imagery without texture.

## Layout

Capped at 1160px with 24px container padding and 96px section gaps. Woven bands act as dividers, replacing ordinary rules. Cards may be staggered at different widths, like cloth seams.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a5632`
- background: `#2c1810`
- orange: `#c4501f`
- gold: `#f0c75e`
- sand: `#e8d5b5`
- forest: `#1a5632`

EXAMPLE COMPONENT PROMPTS:

1. Build an African-textile card: sand #e8d5b5 fill, 8px radius, 4px solid #2c1810 stroke, 28px padding. A 12px kente band joins the top: repeating-linear-gradient alternating #c4501f, #f0c75e, #1a5632 and #e8d5b5 as vertical stripes of uneven width (8px and 16px), with a small diamond cell every three stripes. Title 36px/900 Inter uppercase, 0.02em tracking, color #1a5632; body 16px in rgba(44,24,16,0.85). Button #c4501f fill, gold text, 6px radius, 2px dark-wood stroke, hard shadow 0 4px 0 rgba(44,24,16,0.6), the fill turning #f0c75e and text dark wood on hover. Page ground #2c1810.
