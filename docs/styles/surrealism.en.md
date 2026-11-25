# Surrealism — Style Reference

> Time inside the dream: everything is slow, everything is slightly tilted, and the light comes from the wrong direction.

**Theme:** dark

Surrealism borrows Dalí's vocabulary: the unlikely pairing of midnight blue and desert gold, illogical spatial relationships, melting and deformed shapes, and light cast from where it shouldn't come. It carries two unique rules of time and displacement. First, all transitions must run 700 to 1000ms ease-in-out (Timeless Easing) — dream time is elastic. Second, hover must never scale; only skew and rotate may bend reality. Shadows cannot be black either — they must be rose or gold diffuse halos; a black shadow wakes the dream instantly.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Midnight Blue | `#1a1a3e` | `--color-midnight` | Page base and primary. Deep toward black but keeping blue's breath. |
| Bone | `#f0ece4` | `--color-bone` | Text and light blocks. The greyed bone-white of dream objects. |
| Desert Gold | `#d4a574` | `--color-desert-gold` | Warm accent and the halo color. That impossible beam of sunlight. |
| Dusty Rose | `#c38d94` | `--color-dusty-rose` | The second accent and the shadow substitute. Every projection uses it, never black. |
| Violet | `#4a3f6b` | `--color-violet` | Deep violet for melting shapes and layered shadows. |
| Moss | `#90ba6d` | `--color-moss` | The single touch of life, least frequent, breaking the dream's suffocation. |

## Typography

### Cormorant Garamond — serif throughout, headings may be italic. Thin-stroked serif on a dark ground reads as if handwritten into the dream.

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 300, 400, 600
- **Sizes:** 15, 18, 22, 30, 42, 58
- **Line height:** 1.1 (display), 1.25 (headings), 1.8 (body)
- **Letter spacing:** 0.01em on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Cormorant Garamond | 300 | 58px | 1.1 | 0.01em | `--text-display` |
| heading | Cormorant Garamond | 400 | 42px | 1.2 | — | `--text-heading` |
| subheading | Cormorant Garamond | 400 | 30px | 1.3 | — | `--text-subheading` |
| body-lg | Cormorant Garamond | 400 | 22px | 1.7 | — | `--text-body-lg` |
| body | Cormorant Garamond | 400 | 18px | 1.8 | — | `--text-body` |
| label | Cormorant Garamond | 600 | 15px | 1.5 | 0.1em | `--text-label` |

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
| 144 | 144px | `--spacing-144` |

### Border Radius

| Element | Value |
|---|---|
| cards | 32px |
| buttons | 999px |
| inputs | 24px |
| orbs | 999px |

- **Page max-width:** 1120px
- **Section gap:** 144px
- **Card padding:** 36px
- **Element gap:** 28px

## Components

### Melting Panel

**Role:** cards and content panels

Violet 40% fill, 32px radius, 1px desert-gold 20% stroke, 36px padding, wrapped in a rose diffuse halo (0 24px 60px rose 22%) — never a black shadow. The panel rests rotated -1 degree with a slight skewX(-1.5deg). On hover it rotates to 1 degree, the skew zeroes and the halo spreads to 80px, over 1000ms ease-in-out.

- **States:** hover: rotate to 1deg, halo 80px

### Distorted Button

**Role:** action button

Desert-gold fill, midnight-blue text, 999px full radius, no stroke, 18px/600, 0.1em tracking, padding 14px 36px, halo 0 12px 40px gold 28%. On hover it takes skewX(-6deg) with rotate(-2deg) and the halo spreads to 60px — scale is forbidden. On press the skew zeroes and the button sinks 2px. Transition 700ms ease-in-out.

- **States:** hover: skew and rotate, no scale; active: skew 0, sink 2px

### Color Orb

**Role:** decorative orbs

Circles of 24px to 160px, radial gradients fading from desert-gold or rose centers to transparent, borderless, absolutely positioned at card edges and allowed to overflow 20% to 40%. Colors spread and contract slowly within 2000ms (Color Melting) — transition-none is never allowed. At most four per screen.

### Soft Field

**Role:** inputs

Midnight-blue 60% fill, 24px radius, 1px violet 40% stroke, padding 14px 20px, 18px serif. On focus the stroke turns desert gold 60% with a 0 0 0 3px gold 15% outer ring, over 700ms.

### Floating Epoch

**Role:** floating temporal displacement

Duplicate the same content into two or three layers, each offset 8 to 16px with different opacities (100%, 45%, 20%) and angles (-3, 0, +4 degrees). Only for titles or the hero visual — the illusion of one thing seen three times in time.

## Do's and Don'ts

### Do

- Keep every transition at 700 to 1000ms ease-in-out
- Hover with skew and rotate, never scale
- Make every shadow a rose or gold halo
- Pair midnight blue with desert gold, the unlikely match
- Let shapes melt and deform
- Allow italic serif headings

### Don't

- Don't use overly bright pure colors
- Don't use strictly symmetric grids
- Don't do modern undecorated minimalism
- Don't use harsh neon
- Don't use hover:scale-105
- Don't use black shadows

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Midnight | `#1a1a3e` | Page base |
| 1 | Melting Panel | `rgba(74,63,107,0.40)` | Cards (translucent violet) |
| 2 | Bone Patch | `#f0ece4` | Light contrast points |

## Elevation

- **Abyssal glow:** `0 24px 60px rgba(195,141,148,0.22)`
- **Gold halo:** `0 12px 40px rgba(212,165,116,0.28)`
- **Never:** `black shadows are forbidden`

## Imagery

Melting clocks, floating stones, a sea growing indoors, objects with wrong proportions. Images must carry illogical spatial relationships with shadows from the wrong direction. No documentary photography, no flat icons.

## Layout

Capped at 1120px with 24px container padding and 144px section gaps. Strictly symmetric grids are forbidden: elements may drift 16 to 48px off the grid, overlap, and rotate -3 to 3 degrees. But reading order must stay clear — the dream may tilt, it may not become illegible.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#f0ece4`
- background: `#1a1a3e`
- panel: `rgba(74,63,107,0.40)`
- gold: `#d4a574`
- rose: `#c38d94`
- moss: `#90ba6d`

EXAMPLE COMPONENT PROMPTS:

1. Build a surrealist card: background rgba(74,63,107,0.4), 32px radius, 1px rgba(212,165,116,0.2) stroke, 36px padding, box-shadow 0 24px 60px rgba(195,141,148,0.22) (never black). The whole card takes rotate(-1deg) skewX(-1.5deg). Title 42px serif at weight 300 in #f0ece4; body 18px serif at 1.8 line height. On hover rotate(1deg) skewX(0) with the halo spreading to 80px, transition 1000ms ease-in-out. Page base #1a1a3e, with two radial-gradient desert-gold orbs at the edges whose color spreads over 2000ms.
2. Build a distorted button: desert-gold fill, midnight-blue 18px/600 text at 0.1em tracking, 999px radius, padding 14px 36px, halo 0 12px 40px rgba(212,165,116,0.28). On hover skewX(-6deg) rotate(-2deg) with the halo spreading to 60px — never scale — over 700ms ease-in-out; on press skew 0 with a 2px sink.
