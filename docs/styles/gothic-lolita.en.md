# Gothic Lolita — Style Reference

> Black ribbons, lace edges, crosses and roses: dark romance in fine ornament.

**Theme:** dark

Gothic lolita stitches gothic architectural ornament to lolita's fine detail: a black ground (#1a1a1a) carrying deep violet (#4a1a4a) and blood red (#8b1a2a), text in pale grey-white (#e5e5e5), decorative serif type, patterns that must be strictly symmetric gothic motifs — crosses and roses — with borders of lace scallops or ribbons. The bans: no bright vivid colors, no cute cartoon elements, no modern minimalism, no overly rounded shapes — roundness would push it toward the sweet styles, and this one wants dark.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Violet | `#4a1a4a` | `--color-deep-violet` | Primary: ribbons, borders and accent blocks. The transition between black and blood red. |
| Blood Red | `#8b1a2a` | `--color-blood-red` | Second primary: roses, crosses and key emphasis. |
| Black | `#1a1a1a` | `--color-black` | Page base and the main garment. The style's dark foundation. |
| Pale Silver | `#e5e5e5` | `--color-pale-silver` | Text and lace. Not pure white — a satin sheen with a touch of grey. |
| Mid Violet | `#6b2d5b` | `--color-mid-violet` | Raised surfaces and secondary ornament, one tier brighter than the primary violet. |

## Typography

### Cormorant Garamond — decorative serif; headings take 0.22em of wide tracking like a lace hem; body line height 1.75.

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 14, 17, 21, 28, 38, 52
- **Line height:** 1.15 (display), 1.3 (headings), 1.75 (body)
- **Letter spacing:** 0.03em on display, 0.22em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 52px | 1.15 | 0.03em | `--text-display` |
| heading | — | 600 | 38px | 1.25 | 0.03em | `--text-heading` |
| subheading | — | 400 | 28px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 21px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 17px | 1.75 | — | `--text-body` |
| label | — | 600 | 14px | 1.55 | 0.22em | `--text-label` |

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
| cards | 4px |
| buttons | 2px |
| stamps | 999px |
| frames | 50% 50% 0 0 |

- **Page max-width:** 1040px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Lace Frame

**Role:** the lace-scallop frame (the core component)

Deep-violet fill, 4px radius, 1px pale-silver 25% stroke, 32px padding. All four edges take an 8px-radius scallop made of radial-gradient (16px apart), and each corner holds a 16px symmetric gothic motif (a cross or scroll, drawn in 1px pale-silver lines).

### Ribbon Button

**Role:** action button

Deep-violet fill, pale-silver text, 2px radius, 1px pale-silver 30% stroke, 14px/600, 0.22em tracking, padding 14px 32px. Both ends are cut into ribbon tails by clip-path (10px each), with an outer glow of 0 0 20px deep violet 60%. On hover the stroke rises to 60%, the text turns blood red and the glow widens to 32px; on press it scales to 0.98. Transition 300ms.

- **Sizes:** padding 14px 32px; label 14px
- **States:** hover: blood red text, wider glow; active: scale 0.98

### Rose Motif

**Role:** roses and crosses

48 to 96px symmetric roses (8 to 12 petals, two layers) or crosses, in 1px line art or flat blood red. Must be strictly left-right symmetric — asymmetry is not allowed in gothic lolita ornament. Placed at frame corners or beside titles, 2 to 3 per screen.

### Cameo Portrait

**Role:** the cameo portrait frame

A 96 to 160px oval frame, 2px pale-silver 40% stroke, filled deep violet or holding a grayscale portrait, with an extra 4px deep-violet stroke around the outside. It imitates a Victorian cameo brooch, for character and author portraits.

### Cross Divider

**Role:** the cross divider

A 1px pale-silver 30% horizontal line with a 16px blood-red cross at the center and a 4px diamond on each side. Used between sections instead of ordinary rules.

## Do's and Don'ts

### Do

- Pair black with deep violet and blood red
- Keep ornament strictly symmetric
- Use lace scallops and ribbons
- Set decorative serif with wide tracking
- Keep text pale silver, not pure white
- Mark with roses and crosses

### Don't

- Don't use bright vivid colors
- Don't use cute cartoon elements
- Don't go modern-minimal
- Don't use overly rounded shapes
- Don't use asymmetric ornament
- Don't use pure white

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Black | `#1a1a1a` | Page base |
| 1 | Deep Violet | `#4a1a4a` | Cards |
| 2 | Blood Red | `#8b1a2a` | Accent blocks |

## Elevation

- **None:** `none — depth comes from ornament`
- **Violet glow:** `0 0 20px rgba(74,26,74,0.60)`

## Imagery

Dark-toned photography and illustration: lace, ribbons, roses, candelabra, crosses, gothic architectural detail. Low saturation with rich shadows; monochrome brown-black allowed. No bright photography, cute illustration or colorful cartoons.

## Layout

Capped at 1040px with 32px container padding and 112px section gaps. Strict symmetry dominates (consistent with gothic), with elements allowed to stack centered. Whitespace runs generous; ornament density is higher than usual but must stay symmetric.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#e5e5e5`
- background: `#1a1a1a`
- violet: `#4a1a4a`
- red: `#8b1a2a`
- mid: `#6b2d5b`
- lace: `#e5e5e5`

EXAMPLE COMPONENT PROMPTS:

1. Build a gothic-lolita card: deep-violet #4a1a4a fill, 4px radius, 1px rgba(229,229,229,0.25) stroke, 32px padding. All four edges take an 8px lace scallop from radial-gradient (16px apart), each corner holding a 16px symmetric gothic cross in 1px pale-silver lines. Title 38px/600 Cormorant Garamond at 0.22em tracking in #e5e5e5; body 17px at 1.75 line height. The button takes deep-violet fill with pale-silver text, 2px radius, ribbon tails cut by clip-path at both ends, outer glow 0 0 20px rgba(74,26,74,0.6), turning blood red #8b1a2a on hover. Page base #1a1a1a.
2. Build a cross divider: a 1px pale-silver 30% line with a 16px blood-red cross at the center and a 4px diamond on each side.
