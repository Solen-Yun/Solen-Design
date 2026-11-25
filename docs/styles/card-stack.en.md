# Card Stack — Style Reference

> Three cards overlap front to back; order is explained by the Z axis, not by placement.

**Theme:** light

Card Stack is a 3D arrangement strategy: one lead card in front, the two behind it each offset 12px and 24px up, scaled to 0.96 and 0.92, and dropped in opacity. It turns "order" into a spatial relationship instead of a list. The visuals stay restrained — the cards themselves are white with a 16px radius and a level-one shadow, and all the expressiveness goes into the layered transform: on a change, the cards rearrange along the Z axis and settle over 400ms of ease-out. The offset between cards must never exceed 24px, or the deck reads as loose scraps of paper rather than a hand of cards.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Midnight | `#1a1a2e` | `--color-midnight` | Headings, primary buttons and the dark card. The stack needs one deep enough colour to separate the lead card. |
| Fog | `#f0f0f5` | `--color-fog` | Page canvas. A light grey with a hint of blue, so the white cards keep a clean edge. |
| Card White | `#ffffff` | `--color-card-white` | Fill for the lead card and the cards behind it. All cards share one colour; only the transform tells them apart. |
| Indigo | `#6c5ce7` | `--color-indigo` | Primary accent and the active indicator state — it tells the user which card is in front. |
| Cyan | `#00cec9` | `--color-cyan` | Success and "done" steps, for progress semantics. |
| Pink | `#fd79a8` | `--color-pink` | Emotional accent, for favourites and recommendations. |
| Butter | `#ffeaa7` | `--color-butter` | Highlights and "new" flags, in small areas only. |

## Typography

### Inter — the only typeface. Card titles 600, body 400; the type scale stays quiet so it doesn't pull attention off the stack.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 28, 36
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 36px | 1.15 | -0.02em | `--text-display` |
| heading | — | 600 | 28px | 1.25 | — | `--text-heading` |
| subheading | — | 600 | 20px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
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
| 96 | 96px | `--spacing-96` |

### Border Radius

| Element | Value |
|---|---|
| cards | 16px |
| buttons | 12px |
| indicators | 999px |

- **Page max-width:** 960px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 16px

## Components

### Stack Card

**Role:** any one card in the stack

White fill, 16px radius, no border, 32px padding. The lead card carries `0 18px 40px` midnight at 12%; each card behind shifts 12px up, scales to 0.96 and drops to 70% opacity, the third shifts another 12px, scales to 0.92 and drops to 40%. On a change, transition the transform over 400ms cubic-bezier(0.22, 1, 0.36, 1).

- **Sizes:** padding 32px; radius 16px
- **States:** lead: full opacity; layer 2: 0.96 / 70%; layer 3: 0.92 / 40%

### Deck Controls

**Role:** the change buttons and the drag hint

Round buttons 40px, white fill, 1px #e4e4ec border, no shadow, arrow icon 16px. On hover the border turns midnight and a `0 4px 12px` shadow at 8% is added; on press it scales to 0.94. The two buttons sit on either side of the card, vertically centred.

### Step Indicator

**Role:** progress indicator

A row of 8px dots, 8px apart. The current item fills with indigo and stretches into a 24px capsule; the rest are midnight dots at 30%. Width and colour transition together over 300ms ease-out.

### Stack Container

**Role:** the container that holds the stack

Max width 640px, height fixed to the tallest card's content plus 48px (to leave room for the layers behind). Implement the depth with transform and z-index — never fake it with absolutely positioned offsets. The container must support horizontal touch swiping, with an 80px threshold.

## Do's and Don'ts

### Do

- Keep the offset under 24px and the scale at or above 0.92
- Keep every card the same colour; let the transform alone carry the layers
- Rearrange along the Z axis on a change, 400ms ease-out
- Use the indicator to tell the user where they are
- Drop the overlap on mobile and swipe one card at a time
- Reserve 48px in the container for the layers behind

### Don't

- Don't let the offset exceed 24px
- Don't recolour the cards behind
- Don't fake depth with absolute positioning
- Don't put a second stack inside a card
- Don't take longer than 500ms to change
- Don't keep the overlap on mobile

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Fog | `#f0f0f5` | Page canvas |
| 1 | Card White | `#ffffff` | Every card in the stack |

## Elevation

- **Lead card:** `0 18px 40px rgba(26,26,46,0.12)`
- **Trailing card:** `0 8px 20px rgba(26,26,46,0.08)`

## Imagery

Cards carry illustrations and product screenshots: at most one image per card, its width filling the content area. No full-bleed photography and no background textures — the stack is already present enough.

## Layout

Cap at 960px with 24px container padding and 96px between sections. The stack area is centred, cards max out at 640px wide, with 40px on each side for the change buttons. Leave 48px above and below for the layers behind. On mobile, switch to a single card sliding vertically and drop the overlap.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1a2e`
- background: `#f0f0f5`
- card: `#ffffff`
- accent: `#6c5ce7`
- muted: `#8a8a99`
- border: `#e4e4ec`

EXAMPLE COMPONENT PROMPTS:

1. Build a card stack: three white cards (16px radius, 32px padding), the first shown at full size with a `0 18px 40px rgba(26,26,46,0.12)` shadow; the second `translateY(-12px) scale(0.96)` at opacity 0.7; the third `translateY(-24px) scale(0.92)` at opacity 0.4. On a change, transition only transform and opacity, 400ms cubic-bezier(0.22,1,0.36,1). Below, place three 8px dots as the indicator; the active one becomes a 24px capsule filled with #6c5ce7.
