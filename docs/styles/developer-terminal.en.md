# Terminal — Style Reference

> The whole site is one terminal session: commands, output, comments, a status bar.

**Theme:** dark

The terminal style organizes the interface entirely as a shell session: phosphor-green monospace text over a near-black ground, content always in paired "command + output" structures, comment lines opening with # in blue-grey, lists aligned like `ls -la`, tables with `ps aux`-style headers, a tmux status bar at the page bottom, and a blinking cursor block at the input position. Its bans are thorough — no sans or serif faces, no light grounds, no gradients or glass, no photography or illustration, no more than four accent colors, no heavy shadows. A terminal holds only characters.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Phosphor Green | `#4af626` | `--color-phosphor` | Primary text and cursor. The style's single identifying color, like an old CRT's phosphor. |
| Terminal Black | `#0a0e12` | `--color-terminal-black` | Page ground. An extremely deep blue-black that makes the green look emissive rather than reflective. |
| Cyan | `#8be9fd` | `--color-cyan` | First accent: paths, links and keywords. The string color in syntax highlighting. |
| Magenta | `#ff79c6` | `--color-magenta` | Second accent: function names and commands. |
| Amber | `#ffb86c` | `--color-amber` | Third accent: warnings and arguments — the most-used of the three in a terminal. |
| Comment Grey | `#6272a4` | `--color-comment-grey` | Comments, metadata and disabled states. Always one step darker than body text. |

## Typography

### JetBrains Mono — the only typeface, without exception. Every level of hierarchy is distinguished by size and color, never by family.

- **Substitute:** ui-monospace, 'SF Mono', Menlo, monospace
- **Weights:** 400, 700
- **Sizes:** 12, 13, 14, 16, 20, 28
- **Line height:** 1.2 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** 0 on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | — | 700 | 28px | 1.25 | — | `--text-heading` |
| subheading | — | 700 | 20px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| body-sm | — | 400 | 13px | 1.55 | — | `--text-body-sm` |
| label | — | 400 | 12px | 1.4 | 0.08em | `--text-label` |

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
| cards | 2px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1100px
- **Section gap:** 32px
- **Card padding:** 16px
- **Element gap:** 8px

## Components

### Command Block

**Role:** the paired command-and-output structure (core component)

Command lines open with $, with 8px between the $ and the command; the command is white or phosphor green. Output lines indent 16px and run slightly darker. No blank line between a command and its output; 16px between groups. The whole block is 13px monospace at line height 1.6, needing no border or background.

### Terminal Panel

**Role:** panels and section blocks

#0f141a fill, 2px radius, 1px #1f2937 stroke, 16px padding, no shadow. The panel's top may carry a 12px blue-grey path header (like ~/projects). Panels sit 16px apart.

### Cursor Block

**Role:** the blinking cursor

An 8px × 16px solid phosphor-green block, following a heading's end or the text at an input position, toggling hard on a 1-second steps(1) cycle (never a fade). At most one per screen.

### Status Bar

**Role:** the tmux-style status bar

Fixed to the viewport bottom, 24px tall, phosphor green 15% ground, 1px #1f2937 top border. The left shows the session name and branch (12px uppercase 0.08em), the right the time and a CPU placeholder. The whole bar carries no radius.

### Aligned List

**Role:** the ls-style aligned list and table

Lists align in monospace into three or four columns (permissions / size / time / name), with a stable 8px gap — fixed column widths, never tabs. Headers are blue-grey uppercase 12px above a 1px #1f2937 rule. Row height 24px.

## Do's and Don'ts

### Do

- Use monospace everywhere, without exception
- Pair the near-black ground with phosphor-green text
- Make content a command plus its output
- Open comments with # in blue-grey
- Align lists by column width
- Blink the cursor with a hard steps(1) toggle

### Don't

- Don't use sans or serif faces
- Don't use white or light backgrounds
- Don't use gradients or glass
- Don't use photography or illustration
- Don't exceed four accent colors
- Don't use heavy shadows

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Terminal Black | `#0a0e12` | Page ground |
| 1 | Panel | `#0f141a` | Panels and cards |

## Elevation

- **None:** `none — the terminal is flat`
- **Focus glow:** `0 0 0 1px #4af626`

## Imagery

No images at all. Only characters, ASCII figures and block-character progress bars. Progress may be drawn as ███░░. No icons — they break the all-characters premise; use → and » when something needs to point.

## Layout

Capped at 1100px with 16px container padding and 32px section gaps. The whole page reads like a scrolled session log: starting from a $ command, then output, comments, and the next group of commands below. Line width stays under 100 characters to preserve terminal reading habits.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#4af626`
- background: `#0a0e12`
- panel: `#0f141a`
- cyan: `#8be9fd`
- magenta: `#ff79c6`
- comment: `#6272a4`

EXAMPLE COMPONENT PROMPTS:

1. Build a terminal panel: background #0f141a, 2px radius, 1px #1f2937 stroke, 16px padding, no shadow. A 12px #6272a4 path header at the top (like ~/projects). Content in 13px monospace at line height 1.6: command lines open with $ in #4af626, output lines indent 16px in rgba(74,246,38,0.8), comment lines open with # in #6272a4. Page ground #0a0e12 with a 24px phosphor-green-15% status bar fixed at the bottom.
