# Desktop Vibrancy — Style Reference

> Three tiers of deep grey, system-grade blur, almost no ornament — like a quiet desktop app.

**Theme:** dark

This style imitates the native materials of a desktop system: the window is three tiers of deep grey (#1c1c1e deepest, #2c2c2e middle, #3a3a3c lightest), the sidebar is 80%-opaque deep grey with a large-radius backdrop-blur for that translucent feel, and every divider is a 1px white line at 8% to 12% — never thicker. Headings use a serif (Georgia) in dialogue with the sans-serif body; that contrast is what separates it from an ordinary dark dashboard. Motion only changes color, 200ms ease-out; any translation or scaling reminds the user this is a web page, not the system.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deepest Grey | `#1c1c1e` | `--color-deepest` | Window ground and sidebar base. The deepest layer on the page; every other grey sits above it. |
| Mid Grey | `#2c2c2e` | `--color-mid` | Content area and list rows. One tier above the deepest, separating sidebar from main region. |
| Light Grey | `#3a3a3c` | `--color-light-grey` | Toolbars, floating panels and surfaces that sit one layer closer to the viewer. |
| System Blue | `#0a84ff` | `--color-system-blue` | Selection, links and the primary button. Equivalent to the desktop system's accent; the only one. |
| System Green | `#30d158` | `--color-system-green` | Success, online, completed. Beside system blue it only ever appears as a small mark. |
| System Orange | `#ff9f0a` | `--color-system-orange` | Warnings and pending items. Means "look at this", not "it failed". |
| System Red | `#ff453a` | `--color-system-red` | Deletion and irreversible actions. Its presence always implies a cost. |

## Typography

### Georgia — window titles and large headings. The serif is the only "human" note in this dark interface; without it, it reads as an ordinary dashboard.

- **Substitute:** 'New York', 'Times New Roman', serif
- **Weights:** 400, 700
- **Sizes:** 24, 32, 40
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### SF Pro Text — body, controls and menus. Type runs small (11 to 17px): desktop-app density, not web density.

- **Substitute:** -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 11, 12, 13, 15, 17
- **Line height:** 1.2 (display), 1.3 (headings), 1.5 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### SF Mono — code blocks, paths and figures. For all monospace content, never decorative.

- **Substitute:** ui-monospace, SFMono-Regular, Menlo, monospace
- **Weights:** 400, 500
- **Sizes:** 12, 13
- **Line height:** 1.4 (display), 1.4 (headings), 1.6 (body)
- **Letter spacing:** 0 on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Georgia | 700 | 40px | 1.15 | -0.01em | `--text-display` |
| heading | Georgia | 400 | 32px | 1.25 | — | `--text-heading` |
| subheading | SF Pro Text | 600 | 17px | 1.3 | — | `--text-subheading` |
| body | SF Pro Text | 400 | 15px | 1.5 | — | `--text-body` |
| body-sm | SF Pro Text | 400 | 13px | 1.5 | — | `--text-body-sm` |
| label | SF Pro Text | 500 | 11px | 1.4 | 0.02em | `--text-label` |
| code | SF Mono | 400 | 13px | 1.6 | — | `--text-code` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 10px |
| buttons | 6px |
| inputs | 6px |
| panels | 14px |
| pills | 999px |

- **Page max-width:** 1280px
- **Section gap:** 48px
- **Card padding:** 16px
- **Element gap:** 8px

## Components

### Vibrancy Sidebar

**Role:** sidebar and overlay backgrounds

Deep grey at 80% opacity, backdrop-blur 40px, only a right 1px white 10% border. 240px wide, 12px padding. The selected row takes a system-blue 18% ground with 6px radius; hover is white 8%. No translation, no scaling.

- **States:** hover: white 8%; selected: blue 18%

### System Button

**Role:** primary and toolbar buttons

System-blue fill, white text, 6px radius, no border, 13px/500 type, padding 6px 14px. Hover only brightens the fill by 8%; press darkens it by 10%; transitions run 200ms and touch color only. Disabled state is a white 12% fill with 40% text.

- **States:** hover: +8% brightness; active: -10%; disabled: 12% white fill

### List Row

**Role:** settings items, file lists and message lists

44px tall, 12px horizontal padding, 6px radius, no background. Rows separate by a 1px white 8% line. Hover fills white 6%; selection fills system blue 18%. Icons on the left at 16px; helper text on the right at 13px white 60%.

### Segmented Control

**Role:** view switching and filters

The track is white 6% fill, 8px radius, 28px tall; the selected segment fills light grey #3a3a3c with 6px radius and an inset 0 1px 0 white 6%. Type 11px/500. Switching transitions color and position only, 200ms.

### Vibrancy Toolbar

**Role:** window toolbar

52px tall, light grey #3a3a3c fill, a bottom 1px white 10% border, no shadow. Three 12px window dots (red, amber, green) on the left, a serif 13px title centered in the middle — centered, not left-aligned — and tool buttons on the right.

## Do's and Don'ts

### Do

- Stick to the three deep greys; layer by luminance difference, not strokes
- Give sidebars and overlays 80% opacity plus deep blur for translucency
- Keep every divider a 1px white line at 8% to 12%
- Set headings in serif, body in the system sans
- Animate color only, over 200ms
- Keep desktop density: 44px rows, 11 to 17px type

### Don't

- Don't use strokes thicker than 1px
- Don't add translation or scaling to motion
- Don't borrow glassmorphism's saturated blooms — this is system material, not decoration
- Don't fill large areas with the accent color
- Don't break desktop density with web-sized type
- Don't round panels past 14px

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deepest | `#1c1c1e` | Window ground and sidebar |
| 1 | Mid | `#2c2c2e` | Content area and list rows |
| 2 | Light Grey | `#3a3a3c` | Toolbars and floating panels |
| 3 | Vibrancy | `rgba(28,28,30,0.8)` | The translucent layer, always with backdrop-blur |

## Elevation

- **Panel:** `0 1px 0 rgba(255,255,255,0.08) inset, 0 20px 48px rgba(0,0,0,0.5)`
- **Popover:** `0 12px 32px rgba(0,0,0,0.55)`

## Imagery

App screenshots and window captures lead; a light wallpaper behind the window is what makes the vibrancy visible. Real grid and list density is allowed. No illustration, cartoon icons or saturated photography.

## Layout

Capped at 1280px: a fixed 240px sidebar on the left with the content region to its right. Rows 44px, section gap 48px, padding 16px — density clearly above the web. The toolbar is fixed at the top; the content region scrolls independently; the sidebar does not scroll with content.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `rgba(255,255,255,0.92)`
- background: `#1c1c1e`
- panel: `#2c2c2e`
- toolbar: `#3a3a3c`
- accent: `#0a84ff`
- border: `rgba(255,255,255,0.10)`

EXAMPLE COMPONENT PROMPTS:

1. Build a desktop-vibrancy sidebar: 240px wide, background rgba(28,28,30,0.8), backdrop-filter: blur(40px), a right 1px rgba(255,255,255,0.10) border. List rows 44px tall, 6px radius, 12px padding; hover fills rgba(255,255,255,0.08), the selected row fills rgba(10,132,255,0.18). All transitions 200ms and color-only.
2. Build a vibrancy toolbar: 52px tall, #3a3a3c fill, bottom 1px rgba(255,255,255,0.10) border, no shadow. Three 12px window dots (red, amber, green) on the left; a serif 13px title centered; tool buttons on the right. Nothing moves — only color changes, 200ms.
