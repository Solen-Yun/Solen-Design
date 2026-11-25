# Doc Workspace — Style Reference

> A document on beige paper: the interface recedes until only the content remains.

**Theme:** light

The doc-workspace style serves long reading and writing sessions. A beige paper ground (#f7f6f3) replaces pure white, text is pressed into a warm ink black (#37352f), and every divider is an extremely faint 1px line. The signal-to-noise ratio of interaction is deliberately minimal: hover only shifts the ground from #f7f6f3 to #efedea within 150ms — no translation, no scaling, no shadow jumps — because any sense of floating breaks the stability of reading. The signature detail is the drag handle: transparent until hover reveals it, hinting "this block can move". Beyond that, no ornament at all.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#37352f` | `--color-ink` | Body, headings and icons. This style's ink leans warm; pure black makes the paper look dirty. |
| Paper | `#f7f6f3` | `--color-paper` | Page canvas. The site-wide default ground and the baseline color for hover states. |
| Hover Grey | `#efedea` | `--color-hover-grey` | Hover and selection grounds. Barely darker than paper — felt but not noticed. |
| Hairline | `#e9e7e4` | `--color-hairline` | Table rules, dividers and input strokes. Always 1px, always this faint. |
| Link Blue | `#2eaadc` | `--color-link-blue` | Links and clickable references. The only color in the system that clearly steps forward. |
| Marker Red | `#eb5757` | `--color-marker-red` | Deletion and errors. Its presence means the content is at risk. |

## Typography

### ui-sans-serif — the only font on the site. System stack first, because the most important metric for a writing tool is rendering stability.

- **Substitute:** Inter, -apple-system, 'Segoe UI', 'PingFang SC', sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 14, 16, 20, 24, 32
- **Line height:** 1.2 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 32px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 24px | 1.3 | — | `--text-heading` |
| subheading | — | 500 | 20px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.02em | `--text-label` |

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
| 96 | 96px | `--spacing-96` |

### Border Radius

| Element | Value |
|---|---|
| cards | 4px |
| buttons | 4px |
| inputs | 4px |
| pills | 999px |

- **Page max-width:** 708px
- **Section gap:** 48px
- **Card padding:** 16px
- **Element gap:** 8px

## Components

### Block Row

**Role:** document blocks, the page tree and settings items

Transparent ground, no border, 4px radius, padding 4px 8px, line height 1.6, 14px type. On hover the ground becomes #efedea over a 150ms color transition with zero movement. The drag handle on the left is 16px wide, transparent by default, visible on hover and focus.

- **States:** hover: ground #efedea; handle: transparent to visible

### Ghost Button

**Role:** toolbar buttons and secondary actions

Transparent ground, no stroke, 4px radius, 13px/500 type, padding 4px 8px, 16px line icons with 6px between icon and text. Hover ground #efedea, pressed #e3e1db. Lifting and scaling are forbidden — color only, 150ms.

- **States:** hover: #efedea; active: #e3e1db

### Inline Input

**Role:** inline editing and search

Transparent ground, no stroke, padding 4px 8px, same size as body text. On focus the only addition is a 1px #e9e7e4 bottom rule — no outer ring, no ground change. Placeholder at 60% ink.

- **States:** focus: 1px bottom rule only

### Callout Block

**Role:** notes, quotes and explanation blocks

Light grey ground (#efedea), 4px radius, padding 12px 16px, an 8px icon slot on the left. Text 14px/1.6. One soft emphasis tint is allowed (blue, yellow or red — pick one), but only one per page.

## Do's and Don'ts

### Do

- Set the canvas to beige #f7f6f3 with ink #37352f body text
- Let hover change the ground only, 150ms, no movement
- Reveal the drag handle from transparent to visible on hover
- Keep dividers at 1px #e9e7e4
- Cap body width at 708px, no more than 80 characters per line
- Keep radius at 4px or under, except pill tags

### Don't

- Don't use gradient backgrounds
- Don't use heavy shadows — everything is flat except popovers
- Don't use any translate or scale animation
- Don't trigger border or shadow jumps on hover
- Don't exceed 8px radius
- Don't give buttons a lift; documents have no floating feel

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#f7f6f3` | Page canvas |
| 1 | White Page | `#ffffff` | Document body and popovers |
| 2 | Hover Grey | `#efedea` | Hover and selected rows |

## Elevation

- **None:** `none`
- **Popover:** `0 8px 24px rgba(15,15,15,0.12)`

## Imagery

Almost no decorative imagery. Content screenshots, charts and embedded media blocks are allowed, and they must match the document width with square corners or 4px radius. No background images, illustration or icon walls — they turn the paper into a poster.

## Layout

Single column, body width capped at 708px with 24px to 96px side padding. Section gap 48px, 8px between elements inside a block. Everything aligns left; headings never center. A 240px sidebar may sit beside the body, but the body width does not shrink for it.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#37352f`
- background: `#f7f6f3`
- page: `#ffffff`
- hover: `#efedea`
- border: `#e9e7e4`
- link: `#2eaadc`

EXAMPLE COMPONENT PROMPTS:

1. Build a block-row list: each row transparent, 4px radius, padding 4px 8px, 14px type, line height 1.6. On hover the ground becomes #efedea over a 150ms color transition — no movement, no shadow. Each row's left side carries a 16px drag handle (transparent by default, visible on hover). Page ground #f7f6f3, text #37352f.
2. Build a callout block: #efedea ground, 4px radius, padding 12px 16px, an 8px icon slot on the left, 14px/1.6 text. One soft tint per page at most.
