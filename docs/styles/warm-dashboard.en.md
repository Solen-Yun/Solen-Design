# Warm Dashboard — Style Reference

> Terracotta ground with cream-white cards: a data interface can have body warmth.

**Theme:** light

The warm dashboard resolves a contradiction: dashboards are usually cold, hard and blue, yet teams stare at them eight hours a day. The fix: swap the ground to terracotta (#d4a088), make cards cream-white, use soft diffuse shadows instead of hard edges, and enlarge radii to 24px. Data runs on teal (#4a9d9a) and gold (#e8b86d) series, avoiding blue-red "system alert" palettes. Hierarchy comes from brighter cards and diffuse shadows, never thicker borders — the style bans borders above 2px.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Terracotta | `#d4a088` | `--color-terracotta` | Page ground. The style's source of warmth, more important than any accent. |
| Cream | `#faf8f5` | `--color-cream` | Cards and panels. Much brighter than terracotta; the lightness gap lifts content. |
| Teal | `#4a9d9a` | `--color-teal` | Primary actions and the chart's first series. The only calm anchor on the warm ground. |
| Gold | `#e8b86d` | `--color-gold` | The chart's second series and highlights. Same family as terracotta, one step brighter. |
| Brick | `#c17767` | `--color-brick` | Negative metrics and reminders. Gentler than pure red, still reads as decline. |
| Slate Teal | `#6b8e8e` | `--color-slate-teal` | Secondary data and captions, for series not meant to be read actively. |

## Typography

### Inter — the only typeface. Numbers use tabular-nums; titles 600, body 400.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 13, 15, 18, 24, 32
- **Line height:** 1.2 (display), 1.3 (headings), 1.55 (body)
- **Letter spacing:** -0.01em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 32px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 24px | 1.3 | — | `--text-heading` |
| subheading | — | 600 | 18px | 1.35 | — | `--text-subheading` |
| body-lg | — | 500 | 15px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.55 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.04em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 12px |
| inputs | 12px |
| dots | 999px |

- **Page max-width:** 1440px
- **Section gap:** 32px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Warm Button

**Role:** the primary action button

Teal fill, white text, 12px radius, no stroke, 15px/500, padding 12px 24px, shadow 0 4px 12px teal 20%. On hover the fill deepens to #3d8380, the shadow widens to 20px and the button lifts 2px; on press it scales 0.98 and the shadow retracts. Transition 200ms ease-out.

- **Sizes:** padding 12px 24px; label 15px
- **States:** hover: darker fill, lift 2px; active: scale 0.98

### Cream Card

**Role:** metric cards and chart containers

Cream-white fill, 24px radius, no stroke, 32px padding, shadow 0 8px 24px black 4%. On hover the shadow widens to 40px, the card lifts 4px and a 1px very light stroke appears. Values run 32px/700 in tabular numerals; to the right, a 12px teal dot (positive) or brick dot (negative) marks the change.

### Warm Input

**Role:** filters and search

White 80% fill, 12px radius, 1px terracotta 25% stroke, padding 10px 16px, 13px text. On focus the stroke turns teal with a 3px teal 20% outer ring — dimensions never change.

### Glass Sidebar

**Role:** side navigation

White 80% fill, 12px blur, 1px terracotta 20% stroke on the right, 240px wide. Items are 40px tall, 12px radius, 13px text; the selected item uses teal 12% ground with teal text, hover uses white 60%.

### Series Palette

**Role:** chart color rules

First series teal #4a9d9a, second gold #e8b86d, third brick #c17767, fourth slate teal #6b8e8e. Only these four, used strictly in order. Gridlines in terracotta 15%, axis text in slate teal. Blue-purple-red primary triads are banned.

## Do's and Don'ts

### Do

- Ground in terracotta, cards in cream white
- Keep shadows soft and diffuse, never hard-edged
- Round corners 12 to 24px
- Use the four-color series in order, only those
- Align values in tabular numerals
- Keep borders at 1px maximum

### Don't

- Don't use cold grounds (blue, purple)
- Don't use pure black text
- Don't use hard-edged shadows
- Don't use saturated neon colors
- Don't use borders of 2px or more
- Don't put blue-purple-red triads in charts

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Terracotta | `#d4a088` | Page ground |
| 1 | Cream | `#faf8f5` | Cards and panels |
| 2 | Glass White | `rgba(255,255,255,0.80)` | Sidebar and overlays |

## Elevation

- **Card:** `0 8px 24px rgba(0,0,0,0.04)`
- **Card hover:** `0 16px 40px rgba(0,0,0,0.08)`
- **Button:** `0 4px 12px rgba(74,157,154,0.20)`

## Imagery

Charts and icons dominate; photography is nearly absent. Avatars and product thumbnails are allowed. The charts themselves are the primary visual, colored strictly from the four-series palette.

## Layout

Capped at 1440px with 24px container padding, 24px card gaps and 32px section gaps. A 240px glass sidebar sits left of the content area, a row of metric cards on top (each at least 240px wide), charts below in two columns. Whitespace runs one step looser than data-dense layouts.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#3a3330`
- background: `#d4a088`
- card: `#faf8f5`
- primary: `#4a9d9a`
- secondary: `#e8b86d`
- muted: `#6b8e8e`

EXAMPLE COMPONENT PROMPTS:

1. Build a warm-dashboard metric card: cream-white #faf8f5 fill, 24px radius, no border, 32px padding, shadow 0 8px 24px rgba(0,0,0,0.04). A 12px #6b8e8e label on top, a 32px/700 value below (tabular-nums), and a 12px teal dot on the right for positive change. On hover the shadow widens to 0 16px 40px rgba(0,0,0,0.08) with translateY(-4px). Page ground #d4a088.
