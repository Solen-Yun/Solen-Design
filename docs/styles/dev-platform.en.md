# Dev Platform — Style Reference

> Grey carries the structure, blue only carries interaction, color always carries meaning.

**Theme:** light

The dev-platform style is developer tooling's default language: most of the interface is greyscale (white, #f6f8fa, #d0d7de, #656d76, #1f2328), blue #0969da is used only for clickable things, and green/yellow/red appear only semantically (passed, warning, failed). Radii are a uniform 6px, borders a uniform 1px #d0d7de, shadows near zero. Code blocks in monospace on a light grey ground are its most identifying element. Gradients are banned, heavy shadows are banned, non-semantic decorative color is banned, serif faces are banned, and lively animation is banned.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Link Blue | `#0969da` | `--color-link-blue` | The only primary color, for links, primary buttons and selection. |
| White | `#ffffff` | `--color-white` | Cards and content grounds. The one layering device against the light grey. |
| Canvas Grey | `#f6f8fa` | `--color-canvas-grey` | Page ground and code-block ground. The interface's foundation. |
| Border Grey | `#d0d7de` | `--color-border-grey` | Every 1px border and divider — one value only. |
| Muted Grey | `#656d76` | `--color-muted-grey` | Metadata, timestamps and captions. |
| Ink | `#1f2328` | `--color-ink` | Headings and body. A deep grey with blue in it, softer than black. |
| Success | `#1f883d` | `--color-success` | Passed, merged, successful — semantics only. |
| Warning | `#9a6700` | `--color-warning` | Pending and worth attention — semantics only. |
| Danger | `#cf222e` | `--color-danger` | Failed, deleted, conflicted — semantics only. |

## Typography

### Inter — interface text, sizes running small (12 to 16px mostly), rarely above 24px.

- **Substitute:** -apple-system, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 13, 14, 16, 20, 24
- **Line height:** 1.25 (display), 1.3 (headings), 1.5 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### JetBrains Mono — code blocks, branch names, commit hashes and command lines. Monospace is this style's identifying core.

- **Substitute:** ui-monospace, SFMono-Regular, Menlo, monospace
- **Weights:** 400, 500
- **Sizes:** 12, 13, 14
- **Line height:** 1.4 (display), 1.4 (headings), 1.5 (body)
- **Letter spacing:** 0 on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading-lg | — | 600 | 24px | 1.25 | — | `--text-heading-lg` |
| heading | — | 600 | 20px | 1.3 | — | `--text-heading` |
| subheading | — | 600 | 16px | 1.4 | — | `--text-subheading` |
| body | — | 400 | 14px | 1.5 | — | `--text-body` |
| body-sm | — | 400 | 13px | 1.5 | — | `--text-body-sm` |
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

### Border Radius

| Element | Value |
|---|---|
| cards | 6px |
| buttons | 6px |
| inputs | 6px |
| pills | 999px |

- **Page max-width:** 1280px
- **Section gap:** 24px
- **Card padding:** 16px
- **Element gap:** 8px

## Components

### Primary Button

**Role:** the primary action button

Passed-green #1f883d fill, white text, 6px radius, 1px rgba(31,35,40,0.15) stroke, no shadow, 14px/500, padding 5px 16px. On hover the fill deepens to #1a7f37; on press an inset shadow appears (inset 0 1px 0 rgba(31,35,40,0.10)). Transition 80ms. Note the primary button is green while links are blue — the two never swap jobs.

- **Sizes:** padding 5px 16px; label 14px
- **States:** hover: darker fill; active: inset shadow

### Repo Card

**Role:** repo cards and content cards

White ground, 6px radius, 1px #d0d7de stroke, 16px padding, no shadow. Title 16px/600 in interaction blue (clickable), description 14px body, and a bottom row of 12px muted grey with a language dot, star count and update time. On hover the border stays put and only the title gains an underline.

### Code Block

**Role:** the code block (identifying core)

Light grey #f6f8fa ground, 6px radius, 1px #d0d7de stroke, 16px padding, JetBrains Mono 13px, line height 1.5, horizontally scrollable. Syntax highlighting uses only five or six colors and never changes weight. A copy button (12px, muted grey) may sit at the top right.

### State Label

**Role:** status labels and badges

Fully rounded 999px, semantic color at 10% ground, semantic color text, 1px same-hue 25% stroke, 12px/500, padding 2px 10px. Green for passed, yellow for pending, red for failed, blue for informational. Every label must carry text — color is only a support.

### Side Nav

**Role:** side navigation and filters

White or transparent ground, 240px wide, no right border. Items 32px tall, 6px radius, 14px text; the selected item takes a #f6f8fa ground plus a 2px interaction-blue left bar. Group headings 12px/600 muted grey with 16px space above.

## Do's and Don'ts

### Do

- Let five greys carry the structure
- Use blue only for clickable elements
- Reserve green/yellow/red for semantics
- Keep radius at 6px and borders at #d0d7de
- Set code blocks in monospace on light grey
- Keep motion under 80ms, with no bounce

### Don't

- Don't use gradient backgrounds or decorative color
- Don't use heavy shadows
- Don't use non-semantic decorative color
- Don't use serif faces
- Don't use oversized type or wide spacing
- Don't use lively animation

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Canvas Grey | `#f6f8fa` | Page ground |
| 1 | White | `#ffffff` | Cards and list containers |

## Elevation

- **None:** `none — 1px #d0d7de borders only`
- **Overlay:** `0 8px 24px rgba(31,35,40,0.12)`

## Imagery

Almost no images. Avatars 20 to 40px, icons 16px and language dots 8px are allowed. No illustration, photography or background images — the interface itself is the content.

## Layout

Capped at 1280px with 16px container padding, 24px section gaps and 16px card gaps. The typical structure is a 240px left nav plus a content area, whose list rows run 56px tall. Density approaches a desktop application; whitespace only appears between sections.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1f2328`
- background: `#f6f8fa`
- card: `#ffffff`
- primary: `#0969da`
- border: `#d0d7de`
- muted: `#656d76`

EXAMPLE COMPONENT PROMPTS:

1. Build a dev-platform repo card: white ground, 6px radius, 1px #d0d7de stroke, 16px padding, no shadow. Title 16px/600 #0969da, description 14px #1f2328, and a bottom row of 12px #656d76 with a language dot, star count and update time. On hover only the title gains an underline. Page ground #f6f8fa. Code blocks use a #f6f8fa ground, 13px monospace, a 1px #d0d7de stroke and a 6px radius.
