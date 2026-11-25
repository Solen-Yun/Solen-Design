Implement the "MagicBento" component from zero: a bento grid of feature cards that feel alive — each card carries a small self-playing artwork (scrubbing chart, growing bars, collaborative cursors, a CI pipeline, an integration hub, security toggles), a pointer spotlight pools under the cursor, the border catches an edge light that follows the cursor around the whole grid, and clicking a card fires a glowing wave across the grid and replays the card's artwork. Optional tilt/magnetism, rising star particles, a staggered intro, and light/dark themes. Full specification follows; it must not depend on external pages, videos, images (any photo comes in through item props), or font files beyond the icon set named below.

## Structure & rendering

- Pure React + CSS + one 2D canvas per starred card: MagicBento.jsx and MagicBento.css. React >= 18; runtime dependency on the icon set `@hugeicons/react` + `@hugeicons/core-free-icons` (branch, tick, chat, git-host, design-tool, notes, sparkles, key, fingerprint icons for the built-in artworks).
- Root is a `<div class="magic-bento">`: CSS grid, `grid-template-columns: repeat(cols, minmax(0,1fr))`, `grid-auto-flow: row dense`, auto-rows `rowHeight`px (or `minmax(rowHeight, auto)` when squeezed to one column), gap px. The column count collapses responsively — when a single cell would drop under 150px it falls to 2 columns (if a pair still gets ≥ 200px), else 1. Theme palettes inject CSS variables: dark — card surface gradient #1a1820→#121116, ink #f4f4f5, muted 60%, tile/well inner chrome, deep shadows, glow alpha 0.85, spot alpha 0.07; light — white surfaces, ink #18181b, glow alpha 0.5, spot alpha 0.035. Radius derives inner radii and padding from the radius prop.
- Each item renders a `.magic-bento__cell` (grid span from colSpan/rowSpan, clamped to the column count) holding `.magic-bento__card` — the transformed, clipping card. Cards with an href render `<a>`; others with onClick (item-level or the grid-level onItemClick) render a div with role button, tabIndex 0, aria-label of the title, cursor pointer. Inside the card, in paint order: optional cover image with a bottom-up dark scrim; `__light` spotlight layer (radial gradient at the pointer, alphas scaled by `--mb-hot`); optional `__stars` canvas; the content column (header with icon + label, the artwork region, title + description at the bottom); `__rim` (1px inset ring + top highlight); `__border` — a masked 1px ring painting two radial gradients: the border glow tracking the cursor and the click wave (a ring expanding from the click point, radius var `--mb-wr`, alpha fading).
- Text auto-hide (default on) line-clamps the title to 1 line and description to 2. Cover-image cards force light ink over the scrim.
- Item shape: `{ id?, title?, description?, label?, icon?, visual?, image?, href?, target?, rel?, onClick?, colSpan?, rowSpan?, content? }` — content replaces the whole body; visual is either one of the six artwork keys or a custom ReactNode.

## Built-in artworks

- `analytics` — a smooth monotone-cubic line + area chart of 12 monthly values rising 3.1k → 12.4k; moving the pointer scrubs: a vertical guide and dot snap to the curve, the figure swaps to the interpolated value and month, and it rests back to "12.4k / +18%" on leave. A stroke-draw animation plays on entry and on click.
- `dashboard` — 7 bars (heights 42–88%) growing in with stagger; the peak bar is accent-filled; hovering brightens; figure "$48.2k / Weekly".
- `collaboration` — a mock doc: title, six placeholder lines with widths, an accent selection band + blinking caret on one line, and two named arrow cursors that pop in and drift along looping keyframe paths; their drift runs only while hovered/clicked.
- `automation` — a trigger tile ("Push to main" + commit hash) above a vertical rail with four steps (Install 8s, Build 12s, Test 48s, Deploy 9s): dashes → spinning accent ring → accent check, staggered 520ms per step; hovering a rested card re-runs the flow (throttled to 3.2s); clicking replays it.
- `integration` — a hub-and-spokes SVG: four app tiles around a central sparkles tile, lines draw in, and while the card is active packets travel the spokes (1.8s loop, staggered).
- `security` — two setting rows (SSO, 2FA) whose accent switches flip on with the intro; the second stays off-when-reduced.
- All animated pieces pause until their cell has entered (data-state="in") and are driven by CSS animations keyed off `--mb-delay`; a Web-Animations replay helper restarts the finite animations of a card on click and the flow subset on hover.

## Pointer engine

- One window-level listener set (pointermove/down/up/cancel, document pointerout at window edge, scroll + resize mark the rects dirty). Card rects are measured lazily and cached until dirty.
- The grid tracks a smoothed light position (0.05s exponential) and a near factor that eases up while the pointer is within half a spotlight radius of the grid (0.12s in, 0.4s out) — this drives `--mb-near`, so every border lights in proportion as the cursor roams nearby, not just over cards.
- Per card: a hot factor eases toward 1 while the pointer is inside (0.14s in / 0.32s out) and drives the spotlight opacity; tilt (±6deg) and magnetism (±6px) springs integrate at 240 Hz sub-steps toward the pointer's normalized offset when enabled; press scales to 0.985 while the pointer is down on that card. All values are written as CSS custom properties, cached per property to skip redundant writes.
- Click wave: on click (mouse or keyboard; keyboard clicks explode from the card centre) a wave originates at the click point, expands to the grid's farthest corner + 140px over 1.1s with an ease-out radius and fading alpha, and simultaneously replays the card's artwork animations.
- Stars: each starred card owns a DPR-capped canvas; ~particleCount particles rise with slight drift, wrap vertically, twinkle sinusoidally, and light up only inside 0.75 × spotlightRadius of the pointer, scaled by the card's stars factor.
- Intro: cells start shifted 16px down / 0.97 scale and enter with a 420ms fade + 760ms overshoot spring, staggered 80ms in DOM order once 15% of the grid is visible; 260ms later a click-wave washes the grid from the top-left; delays reset after the stagger completes. Changing items/columns re-syncs entered cells. `disableAnimations` or reduced motion skips the intro and finishes animations instead.
- Frame-loop self-sleep: the rAF loop runs only while light/hot/springs/wave/stars are unsettled; a visibility observer pauses it off-screen. Unmount removes every listener and observer, clears timers and frames.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | Item[] | DEFAULT_ITEMS | The six seeded feature cards (Analytics, Dashboard, Collaboration, Automation, Integration, Security). |
| columns | number | 4 | Grid columns, floored at 1; collapses responsively. |
| rowHeight | number | 200 | Row height in px. |
| gap | number | 12 | Grid gap in px. |
| radius | number | 20 | Card corner radius in px. |
| theme | "dark" \| "light" | "dark" | Card chrome and accent contrast. |
| glowColor | string | - | Accent/glow colour (hex or rgb); falls back to the theme ink. |
| textAutoHide | boolean | true | Line-clamps titles and descriptions. |
| enableBorderGlow | boolean | true | Border light that follows the cursor around the grid. |
| enableSpotlight | boolean | true | Pointer spotlight inside cards. |
| spotlightRadius | number | 300 | Spotlight/border glow radius in px, floored at 40. |
| enableStars | boolean | false | Rising star particles inside cards. |
| particleCount | number | 24 | Star particle count per card, 0–120. |
| enableTilt | boolean | false | Cards tilt toward the pointer (±6deg). |
| enableMagnetism | boolean | false | Cards drift toward the pointer (±6px). |
| clickEffect | boolean | true | Click wave plus artwork replay. |
| intro | boolean | true | Staggered entrance for the cells. |
| disableAnimations | boolean | false | Kills all motion (also forced by reduced-motion). |
| onItemClick | (item, index) => void | - | Called for every card click. |
| className | string | "" | Extra class names for the grid. |
| style | CSSProperties | - | Inline styles for the grid. |

## Delivery & validation

- Deliver the complete content of MagicBento.jsx and MagicBento.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. The seeded artwork copy (titles, step names, cursor names) is content, not branding.
- Validate: the six artworks animate in with the intro stagger, replay on click, and the automation flow re-runs on hover; the spotlight and border glow track the pointer across cards and the border lights up as the cursor merely approaches the grid; clicking fires the expanding wave from the exact point; tilt and magnetism ease without overshoot; stars rise and twinkle only near the cursor; themes switch all chrome and accents; glowColor retints spotlight, border, wave, chart and bars; columns collapse at narrow widths without dead cells; href cards navigate, non-link cards activate with Enter/Space and fire the keyboard wave; disableAnimations/reduced-motion produce a static but complete grid; off-screen grids pause; unmount leaves no listeners, observers or frames; 375 / 768 / 1440 wide without overflow.
