# Vertical Timeline — Style Reference

> One line running through, pinning time to it: alternating left and right, with the nodes setting the rhythm.

**Theme:** light

The vertical timeline turns "sequence" into "top to bottom": a 2px connector line runs through the center, nodes stack in chronological order, alternating left and right on desktop and collapsing to one side on mobile. It carries three technical disciplines — the connector must never break, node sizes must be identical, and mobile must give up the two-sided alternation. Visually the line stays weak (slate 25%) so the nodes and cards carry the attention; on hover the node's ring grows and fills with the primary color while its card lifts — the two must move together, never the card alone.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Slate | `#1e293b` | `--color-slate` | Headings and primary text. The connector uses it too, but at 25% opacity. |
| Haze | `#f8fafc` | `--color-haze` | Page base and alternating blocks. It lets the white cards float. |
| Primary Blue | `#3b82f6` | `--color-primary-blue` | The current node, primary buttons and links. On a timeline it means "you are here". |
| Done Green | `#10b981` | `--color-done-green` | Nodes already passed and completed milestones. |
| Pending Amber | `#f59e0b` | `--color-pending-amber` | Upcoming nodes and ones that need attention. |
| Alert Red | `#ef4444` | `--color-alert-red` | Delayed and failed nodes; its presence means the timeline has a break. |

## Typography

### Inter — the only font on the site. Times and ordinals are 12px uppercase with wide tracking; body is 15px.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 13, 15, 18, 22, 28
- **Line height:** 1.2 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 28px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 22px | 1.3 | — | `--text-heading` |
| subheading | — | 600 | 18px | 1.35 | — | `--text-subheading` |
| body-lg | — | 500 | 15px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.55 | — | `--text-body` |
| label | — | 600 | 12px | 1.4 | 0.06em | `--text-label` |

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
| cards | 12px |
| buttons | 8px |
| nodes | 999px |

- **Page max-width:** 960px
- **Section gap:** 48px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Timeline Node

**Role:** node rings on the line

A 20px circle with a 2px slate 30% stroke and white fill, vertically aligned to the connector. The current node fills primary blue and gains a 4px blue 20% outer ring; past nodes fill done green; pending stays white. On hover the ring scales to 1.25 and fills with the primary, moving in lockstep with its card (which lifts 2px at the same moment). Transition 150ms.

- **Sizes:** 20px diameter
- **States:** hover: scale 1.25, fill primary, card lifts

### Timeline Card

**Role:** node cards

White ground, 12px radius, 1px #e2e8f0 border, 24px padding, shadow 0 2px 8px. The card fills 100% of its side of the line, sitting 24px from the node. At the top a 12px uppercase time label (grey); below it an 18px/600 title and 13px body. On hover it lifts 2px and the shadow widens to 24px.

### Connector Line

**Role:** the central line

2px wide, slate 25%, centered through the whole timeline, drawn by a pseudo-element from the first node to the last — it may never break. If two nodes drift more than 96px apart, the content has grown too long: split it rather than stretch the line.

### Time Filter

**Role:** time filter

A horizontal row of pill buttons, 32px tall, padding 0 14px, 12px/600. Default is white with a 1px border; the selected state fills primary blue with white text. Used to filter nodes by year or phase; on switch the node list fades back in with a 200ms stagger.

## Do's and Don'ts

### Do

- Never let the connector break or drift off the axis
- Keep every node the same size
- Collapse to one side on mobile
- Give every node a time or an ordinal
- Move the node and its card together
- Keep nodes 48px to 96px apart

### Don't

- Don't let the connector line break
- Don't use inconsistent node sizes
- Don't keep two-sided alternation on mobile
- Don't omit the time marker
- Don't stretch the connector for over-long content
- Don't animate the card while the node holds still

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Haze | `#f8fafc` | Page base |
| 1 | Card White | `#ffffff` | Node cards |

## Elevation

- **Card:** `0 2px 8px rgba(15,23,42,0.06)`
- **Card hover:** `0 8px 24px rgba(15,23,42,0.10)`
- **Current node:** `0 0 0 4px rgba(59,130,246,0.20)`

## Imagery

Icons and avatars lead; each node may carry one 16:10 thumbnail. No full-bleed background images — the timeline needs clean vertical space.

## Layout

Capped at 960px. Desktop is the central line with alternating sides (each 44% wide, 12% gap); nodes sit on the card's side nearest the line. On mobile it collapses to one left-aligned side with the line at 16px from the left edge. Nodes stay at least 48px apart and never more than 96px.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1e293b`
- background: `#f8fafc`
- card: `#ffffff`
- accent: `#3b82f6`
- done: `#10b981`
- border: `#e2e8f0`

EXAMPLE COMPONENT PROMPTS:

1. Build a vertical timeline: a central 2px rgba(30,41,59,0.25) connector running through, nodes as 20px circles (2px rgba(30,41,59,0.3) stroke, white fill); the current node fills #3b82f6 with a 4px rgba(59,130,246,0.2) outer ring. Cards: white ground, 12px radius, 1px #e2e8f0 border, 24px padding, shadow 0 2px 8px rgba(15,23,42,0.06). Desktop alternates left and right (each 44% wide, 12% gap); mobile collapses to a single left-aligned side.
2. Build a time filter: a row of pill buttons, 32px tall, padding 0 14px, 12px/600, white with a 1px #e2e8f0 border by default; the selected pill fills #3b82f6 with white text. Switching filters re-renders the node list with a 200ms staggered fade.
