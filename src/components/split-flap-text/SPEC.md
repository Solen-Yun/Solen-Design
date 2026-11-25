Implement the "SplitFlapText" component from zero: a mechanical split-flap departure board — every character is a physical tile split at a horizontal hinge, and when a phrase changes the changed tiles clack through random glyphs (flap flipping down over the old character, the new one rising behind it) until each lands on its target letter, with a configurable cascade direction across the board. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: SplitFlapText.jsx (entry, phrase scheduling, per-tile flip engine) and SplitFlapText.css (all styles, keyframes). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div class="split-flap-text">` (plus `split-flap-text--minimal` when tileStyle is "minimal" and `split-flap-text--glare` when glare > 0): inline-flex, gap = --split-flap-gap, monospace stack (SFMono-Regular, Roboto Mono, Cascadia Code, Liberation Mono, Menlo, monospace), font-size --split-flap-font-size, font-weight 760, line-height 1, letter-spacing 0.035em, white-space pre, user-select none, tabular-nums. All extra props spread onto the root; className and style merge in.
- The board renders exactly `width` tiles; width = max(1, ceil(padTo), length of the longest phrase). Every tile is `<span class="split-flap-text__tile">` (aria-hidden): fixed 0.78em wide × 1.08em tall, overflow hidden, radius --split-flap-radius, perspective 10em, preserve-3d. Board skin: radial top highlight + vertical gradient of --split-flap-tile-color, inset top/bottom bevel shadows, a drop shadow scaled by --split-flap-lift, a hinge line drawn by ::before (1px gradient with a dark core), and a 1px inner frame drawn by ::after.
- Each tile holds two permanent halves: top half (`__half--top`) shows the incoming character while flipping, bottom half (`__half--bottom`) shows the current character. Characters are absolutely positioned so the visible half clips the right portion (each `__char` spans 200% height anchored to its half). While a tile flips it also mounts a front flap (`__flap--front`, shows the current char, rotates rotateX 0 → -90deg around its bottom edge) and a back flap (`__flap--back`, shows the next char, rotates rotateX 90 → 0deg around its top edge); both halves' gradients and backface-visibility hidden give the physical-flap read. The hinge ::before always sits on top (z-index 8), the frame ::after at 9.
- A visually hidden `<span class="split-flap-text__sr">` carries the current phrase for screen readers (trimmed, without padding spaces).
- All colors and physics flow through inline CSS variables on the root: --split-flap-tile-color, --split-flap-text-color, --split-flap-radius, --split-flap-gap, --split-flap-font-size, --split-flap-flip-duration, plus derived depth variables (see depth model).

## Phrase engine

- Phrases come from the words array (fallback to the built-in defaults when empty) or from the text string when text is a string; each entry is stringified. Board width and normalization are recomputed from them: each phrase is sliced to width and padded with spaces per align — left pads on the right, right pads on the left, center splits the remaining padding with floor((width − len) / 2) on the left.
- Timing (all clamped): flipDuration seconds → flipMs = max(40, ×1000) and CSS var clamped to >= 0.04s; stagger seconds → staggerMs = max(0, ×1000); cycleDelay ms → holdMs = max(400, value); flipsPerChar floored at >= 0; charset resolved from the presets alpha (A–Z), alphanumeric (A–Z 0–9), numeric (0–9), or a custom non-empty string, falling back to alphanumeric.
- Showing a target phrase: for every slot whose current character differs, a plan is built — a sequence of flipsPerChar random glyphs sampled from the charset followed by the target character, with start delay = cascadeStep × staggerMs where cascadeStep is index for order "left", width − 1 − index for "right", floor(|index − (width − 1) / 2|) for "center", and a fresh Fisher–Yates shuffled position for "random". Slots whose character is unchanged do not flip.
- A single requestAnimationFrame loop drives all plans: elapsed − start gives step = floor(localElapsed / flipMs); on each new step the tile's character advances through the sequence, tile.tick increments so the flip animations remount and restart cleanly; when the sequence is exhausted the tile settles on the target and stops flipping. The loop cancels any previous animation and self-stops when all plans finish.
- Cycling: if there is more than one phrase, after holdMs + total animation duration the next phrase shows; loop = false stops after the last phrase. A hidden document (visibilitychange via document.hidden) defers the flip and re-checks on each hold interval instead of animating in the background.
- intro = true starts the board fully blank (spaces) and flips into the first phrase on mount; intro = false starts directly on phrase 0. Changing the phrases or width re-seeds the shown text and restarts from phrase 0; a mid-flight phrases change resumes from the current visual text.

## Depth & glare model

- depth 0–1 (clamped) drives a two-stage material model: flat = min(1, depth × 2) and deep = max(0, depth − 0.5) × 2. They set the front flap's brightness dip (1.08 → down to ~0.22 at full), the back flap's start brightness (0.58 → lower), hinge thickness (1px + 0.05em × deep), hinge shade, drop shadow strength and lift, flap edge thickness (0.035em × deep), and the shade overlays' opacity (cast = 0.62 × deep; shade spans only render when deep > 0). At depth 0.5 the board is a classic light-plastic; at 1 it is a deep, heavy, shadowed cabinet.
- glare 0–1 (clamped) adds a moving specular band across both flaps during each flip (a linear-gradient positioned via background-position keyframes, peak alpha 0.55 × glare).
- tileStyle "minimal": tile background, bevels, hinge, frame and text shadow are removed; a two-stop mask splits each tile into top and bottom halves separated by --split-flap-split (0.015em + 0.06 × depth). Instead of 3D flaps, the top half reveals the incoming char with a clip-path inset keyframe ramp and the bottom half covers the old char with the mirrored ramp — a flat, typographic take on the same mechanics.

## Interaction & accessibility

- The board is display-only: no pointer handlers, purely autonomous cycling.
- prefers-reduced-motion: reduce — the JS engine builds no flip plans and jumps straight to the settled phrase, and it tracks the media query live (toggling mid-session switches between instant and animated behaviour); the stylesheet also forces `animation: none !important` on flaps, shades and halves as a belt-and-braces guarantee.
- Unmount cancels the frame loop and clears the cycle timer. Multiple instances are independent (own refs, own timers).
- Responsive: tiles are em-sized so fontSize scales the whole board; at narrow widths keep fontSize/padTo within the container (the board does not wrap; white-space: pre).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| words | string[] | ["LAUNCH READY", "SYNC ONLINE", "SIGNAL LIVE"] | Phrases the board cycles through; falls back to the defaults when empty. |
| text | string | - | Alternative single-string source of phrases; overrides words when set. |
| flipDuration | number | 0.12 | One flap flip in seconds; clamped to >= 0.04. |
| stagger | number | 0.06 | Cascade delay between tiles in seconds. |
| cycleDelay | number | 2400 | Hold time on each phrase in ms; clamped to >= 400. |
| charset | "alpha" \| "alphanumeric" \| "numeric" \| string | "alphanumeric" | Preset name or custom character pool the flaps clack through. |
| flipsPerChar | number | 8 | Random flips each changed tile performs before landing. |
| tileColor | string | "#111827" | Tile body colour. |
| textColor | string | "#f8fafc" | Character colour. |
| tileRadius | number \| string | 8 | Tile corner radius (number → px). |
| gap | number \| string | 6 | Gap between tiles (number → px). |
| fontSize | number \| string | 52 | Board font size (number → px); tiles scale in em. |
| loop | boolean | true | Cycles forever; false stops after the last phrase. |
| padTo | number | 12 | Minimum board width in tiles. |
| align | "left" \| "right" \| "center" | "left" | How phrases are padded inside the fixed-width board. |
| intro | boolean | true | Starts blank and flips into the first phrase on mount. |
| glare | number | 0 | Specular sweep strength on flipping flaps, 0–1. |
| depth | number | 0.5 | Material depth 0–1: flap shading, hinge, shadows. |
| order | "left" \| "right" \| "center" \| "random" | "left" | Direction the flip cascade travels across the board. |
| tileStyle | "board" \| "minimal" | "board" | board = physical flap cabinet; minimal = flat masked halves. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | {} | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of SplitFlapText.jsx and SplitFlapText.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: mount with intro shows a blank board that clacks into phrase 0; every cycle only changed tiles flip and land exactly on the target characters; order left / right / center / random produce the four cascade directions with the same landing result; flipsPerChar 0 lands immediately per tile; charset presets and a custom string both sample correctly; flipping reads as a physical flap (front drops, back rises, hinge stays put) in board style and as clip reveals in minimal style; depth 0 / 0.5 / 1 show the three material stages and glare sweeps only when set; cycleDelay respects its floor and loop = false stops after the last phrase; a hidden tab defers flips; tileColor / textColor / fontSize / gap / tileRadius restyle live; prefers-reduced-motion settles instantly and reacts to live toggles; rapid prop changes never leak timers or frame loops; same-page instances run independently; the board renders without overflow at 375 / 768 / 1440 wide.
