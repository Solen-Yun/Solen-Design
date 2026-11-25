# Pastel UI — Style Reference

> Layered pastel groups on a warm cream ground: friendly, but every word stays legible.

**Theme:** light

The pastel-ui style is built for mobile communities and content apps: a warm cream ground (#fff8f0) carries all the content, while the pastels (lilac, mint, butter, coral) appear only as group backgrounds and status hints, never as large decoration. Type uses deep violet (#66508f) and dark ink (#332d3d) to hold contrast, and cards and touch controls share a 16 to 24px radius. It writes practicality into the spec — save, rate and quick feedback must sit near the point of decision, touch targets must never be small, dense horizontal tables are banned, and fluorescent colors or high-saturation gradients must not swallow the page.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Violet | `#66508f` | `--color-deep-violet` | The primary: primary buttons, labels and links. The only color in the palette deep enough to lead. |
| Cream | `#fff8f0` | `--color-cream` | The page ground. A warm white, softer than plain white. |
| Ink | `#332d3d` | `--color-ink` | Headings and body. Dark enough to hold 4.5:1 and above. |
| Lilac | `#d9c7ff` | `--color-lilac` | The first group color, used for featured blocks. |
| Mint | `#cbefdf` | `--color-mint` | The second group color and the success state. |
| Butter | `#ffe49a` | `--color-butter` | Reminders and the saved state, appearing only on small widgets. |
| Coral | `#ffb5a7` | `--color-coral` | Emotional feedback and the focus ring, used least of all. |

## Typography

### Inter — the only typeface on the site. The scale leans mobile (13 to 17px for most text), with 12px uppercase labels at 0.16em.

- **Substitute:** system-ui, -apple-system, 'PingFang SC', sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 12, 13, 15, 17, 21, 26
- **Line height:** 1.25 (display), 1.35 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | Inter | 700 | 26px | 1.3 | -0.01em | `--text-heading` |
| subheading | Inter | 600 | 21px | 1.35 | — | `--text-subheading` |
| body-lg | Inter | 600 | 17px | 1.5 | — | `--text-body-lg` |
| body | Inter | 400 | 15px | 1.6 | — | `--text-body` |
| body-sm | Inter | 400 | 13px | 1.55 | — | `--text-body-sm` |
| label | Inter | 600 | 12px | 1.4 | 0.16em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 16px |
| inputs | 16px |
| pills | 999px |

- **Page max-width:** 480px
- **Section gap:** 32px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Pastel Button

**Role:** the primary action button

Deep violet fill, white label, 16px radius, no stroke, 15px/600, 12px 20px padding, shadow 0 6px 16px violet 20%. On hover it lifts 2px; on press it scales to 0.98. The touch height is never under 44px. Transition 200ms.

- **Sizes:** min-height 44px; padding 12px 20px
- **States:** hover: lift 2px; active: scale 0.98

### Group Card

**Role:** the content card and group block

Pastel fill (mint, lilac or butter — one per block), 24px radius, 1px deep violet 10% border, 20px padding, shadow 0 4px 12px violet 10%. At the top a 12px uppercase 0.16em label in deep violet 70%, in the middle a 21px/600 dark ink title, below it 13px body copy in dark ink 80%. One block uses exactly one pastel.

### Soft Field

**Role:** the search and input field

Cream fill, 16px radius, 1px deep violet 20% border, 12px 16px padding, 15px type, with a 4px coral 40% outer ring on focus. The placeholder is dark ink 60%.

### Action Cluster

**Role:** quick actions at the point of decision

Three 44px fully round buttons in a row, 12px apart, using lilac, mint and coral at 30% with deep violet icons. They sit pinned to the bottom-right of a content card or to a bottom bar, so the user's hand is already there when they finish reading.

### Bottom Sheet

**Role:** the mobile bottom sheet

Cream ground, 24px radius at the top, a 1px deep violet 10% border along the top, shadow 0 -12px 40px deep violet 12%. A 36px × 4px grip in deep violet 20% sits centered at the top. Padding 20px, maximum height 88vh.

## Do's and Don'ts

### Do

- Let the warm cream ground carry all the content
- Use pastels only for grouping and status
- Keep type in deep violet and dark ink for contrast
- Keep touch targets at 44px or larger
- Put quick actions next to the point of decision
- Use 16 to 24px radii

### Don't

- Don't cover the page with fluorescent colors or high-saturation gradients
- Don't use touch targets that are too small
- Don't use dense horizontal tables
- Don't let a pastel carry body copy
- Don't widen into multiple columns on desktop
- Don't mix two pastels in one card

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream | `#fff8f0` | Page ground |
| 1 | Mint Card | `#cbefdf` | Content cards |
| 2 | Lilac Block | `#d9c7ff` | Featured blocks |

## Elevation

- **Soft:** `0 4px 12px rgba(102,80,143,0.10)`
- **Button:** `0 6px 16px rgba(102,80,143,0.20)`

## Imagery

Icons, avatars and light illustration. Pastel geometric shapes are allowed as group markers. No large dark images and no high-saturation photography — on mobile, imagery is there to identify, not to decorate.

## Layout

Mobile first: a single column capped at 480px, 16px padding, 12px between cards, 32px between sections. On desktop the column stays centered and does not widen. A fixed bottom action bar is 64px tall, and the content reserves the same bottom padding. Horizontal tables are forbidden.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#332d3d`
- background: `#fff8f0`
- primary: `#66508f`
- lilac: `#d9c7ff`
- mint: `#cbefdf`
- coral: `#ffb5a7`

EXAMPLE COMPONENT PROMPTS:

1. Build a pastel-ui card: background #cbefdf, 24px radius, 1px rgba(102,80,143,0.1) border, 20px padding, shadow 0 4px 12px rgba(102,80,143,0.1). At the top a 12px uppercase 0.16em label in rgba(102,80,143,0.7), in the middle a 21px/600 #332d3d title, below it 13px body copy in rgba(51,45,61,0.8). The primary button is deep violet #66508f with white text, 16px radius and a minimum height of 44px. Page ground #fff8f0, a single column capped at 480px, and a fixed 64px bottom action bar.
