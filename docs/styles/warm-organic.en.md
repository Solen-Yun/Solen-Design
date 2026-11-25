# Warm Organic — Style Reference

> Terracotta, olive green, warm paper stock: an interface that looks like something a hand has touched.

**Theme:** light

The warm-organic style is the portfolio language for architects, interior and product designers, and ceramicists: a warm paper ground (#f5f0eb), terracotta (#c86a4a) as the single primary accent, olive (#7a8b5e) for natural elements, and every neutral pushed warm — the darkest body copy allowed is #2d2a24 deep umber, never black. Radii are a uniform rounded-lg, like a pebble worn smooth by water rather than an inflated balloon. Dividers are a warm hairline (#d4bfa5 at 60%), the shadow cast by one sheet of paper resting on another. Ornament is circles and organic blobs with a very fine olive dot at the center. It bans cool greys, neon and cold blues, glassmorphism, and black body copy.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Warm Umber | `#2d2a24` | `--color-warm-umber` | The ceiling for body and headings. Never pure black. |
| Warm Paper | `#f5f0eb` | `--color-warm-paper` | The page ground. A warm white that suggests textured paper. |
| Terracotta | `#c86a4a` | `--color-terracotta` | The only primary accent: links, CTAs and buttons. |
| Olive | `#7a8b5e` | `--color-olive` | The second accent and natural element, used for tags and details. |
| Warm Sand | `#d4bfa5` | `--color-warm-sand` | Hairline dividers, decorative circles and card underlays. |
| Pale Clay | `#e8ded1` | `--color-pale-clay` | The card and panel ground, one step warmer than the page. |

## Typography

### Inter — body copy is a light sans at line height 1.75. Headings may take a serif or a thin sans with looser tracking.

- **Substitute:** system-ui, -apple-system, 'PingFang SC', sans-serif
- **Weights:** 300, 400, 500
- **Sizes:** 13, 15, 17, 22, 30, 40
- **Line height:** 1.25 (display), 1.35 (headings), 1.75 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### Lora — the optional serif for headings, weight 400 to 500. It carries the handmade side of the voice, against the light sans body.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 500
- **Sizes:** 22, 30, 40
- **Line height:** 1.2 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** 0 on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Lora | 500 | 40px | 1.2 | — | `--text-display` |
| heading | Lora | 500 | 30px | 1.3 | — | `--text-heading` |
| subheading | Inter | 500 | 22px | 1.35 | — | `--text-subheading` |
| body-lg | Inter | 400 | 17px | 1.75 | — | `--text-body-lg` |
| body | Inter | 400 | 15px | 1.75 | — | `--text-body` |
| label | Inter | 500 | 13px | 1.5 | 0.02em | `--text-label` |

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
| buttons | 8px |
| inputs | 8px |
| ornaments | 999px |

- **Page max-width:** 1120px
- **Section gap:** 112px
- **Card padding:** 28px
- **Element gap:** 24px

## Components

### Terracotta Button

**Role:** the primary action button

Terracotta fill, warm white label, 8px radius, no stroke, 15px/500, 12px 28px padding, shadow 0 6px 20px deep umber at 6%. On hover the fill deepens to #b25c3e and the shadow widens to 32px; on press it scales 0.98. Transition 300ms ease-out.

- **Sizes:** padding 12px 28px; label 15px
- **States:** hover: deeper fill, wider shadow; active: scale 0.98

### Clay Card

**Role:** the content and work card

Filled with pale clay, 8px radius, no border (warm layering does the separating), 28px padding, shadow 0 6px 20px deep umber at 6%. The title is serif 30px/500 in deep umber; the body 15px/400 at line height 1.75. On hover the shadow widens to 32px and the card lifts 2px.

### Warm Hairline

**Role:** the warm divider and stacked-paper shadow

1px, #d4bfa5 at 60%, running the width of the content. What it simulates is not a line but the shadow where two sheets of paper overlap, so the color must be warm and semi-transparent.

### Organic Pebble

**Role:** the organic shape ornament

A 48px circle or blob (a four-value border-radius like 60% 40% 55% 45%) filled with warm sand at 30%, with a 4px olive dot at its center. It sits in a card corner or between sections as a rhythmic pause — at most three per screen.

### Clay Field

**Role:** the form input

Pale clay at 40% fill, 8px radius, 1px warm sand border, 12px 16px padding, 15px type. On focus the border turns terracotta and picks up a 1px terracotta 20% outer ring; the background does not change.

## Do's and Don'ts

### Do

- Keep every neutral warm
- Treat terracotta and olive as the only two accents
- Use a uniform 8px radius, like a stone worn smooth
- Divide with warm hairlines
- Cap body copy at deep umber #2d2a24
- Decorate with circles and organic shapes

### Don't

- Don't use cool grey as a neutral
- Don't use high-saturation neon or cold blue
- Don't use glassmorphism
- Don't use pure black body copy
- Don't mix different radii
- Don't use shadows that are too cold or too bright

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm Paper | `#f5f0eb` | Page ground |
| 1 | Pale Clay | `#e8ded1` | Cards and panels |
| 2 | Translucent White | `rgba(255,255,255,0.60)` | Overlays |

## Elevation

- **Soft:** `0 6px 20px rgba(45,42,36,0.06)`
- **Soft hover:** `0 12px 32px rgba(45,42,36,0.10)`

## Imagery

Handmade and architectural photography: ceramics, wood, linen, concrete walls, interiors in natural light. A paper texture overlay is allowed. No cool-toned photography, glass or metal highlights, no neon imagery.

## Layout

Capped at 1120px with 24px container padding and 112px section gaps. An asymmetric two-column split (5:7) is allowed. Whitespace is generous but not empty; density is medium-low. Radii stay at 8px — never mixed.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#2d2a24`
- background: `#f5f0eb`
- card: `#e8ded1`
- terracotta: `#c86a4a`
- olive: `#7a8b5e`
- sand: `#d4bfa5`

EXAMPLE COMPONENT PROMPTS:

1. Build a warm-organic card: pale clay #e8ded1 fill, 8px radius, no border, 28px padding, shadow 0 6px 20px rgba(45,42,36,0.06). The title is serif 30px/500 in #2d2a24; the body 15px/400 at line height 1.75 in rgba(45,42,36,0.8). Cards are divided by a 1px rgba(212,191,165,0.6) warm hairline. Put a 48px organic shape (border-radius 60% 40% 55% 45%) in the top-left corner filled rgba(212,191,165,0.3) with a 4px olive #7a8b5e dot at its center. The primary button is terracotta #c86a4a with warm white text and an 8px radius. Page ground #f5f0eb.
