Implement the "SloshGauge" component from zero: a rounded glass tank whose liquid level chases the target value on a springy simulation — the surface tilts in the direction of travel, overshoots, sloshes and can splash off the top or bottom walls before settling. The value read-out is painted twice so it always reads correctly, inside and outside the liquid. Optionally the tank is a vertical slider you can drag or keyboard-drive. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: SloshGauge.jsx (entry, spring simulation, pointer/keyboard input) and SloshGauge.css (all styles). React >= 18; zero runtime dependencies. No iframe, no canvas.
- Root is a `<div class="slosh-gauge">` sized by inline CSS variables (`--sg-w` default 88px, `--sg-h` 180px, `--sg-r` radius clamped to half of width/height, default 20px), with `overflow: clip`, the glass background var and tabular-nums typography sized as `clamp(round(width × 0.16), 12, 20)px`.
- Role: `role="slider"` with `tabIndex 0`, `aria-orientation vertical`, `aria-valuemin 0`, `aria-valuemax 100`, live `aria-valuenow` when `interactive` is true; otherwise `role="meter"` with the same value attributes. `aria-disabled` when disabled, `data-interactive/held/disabled` attributes drive cursor (ns-resize), opacity 0.5 and the not-allowed cursor.
- Paint order inside: an outer value label span (centre, muted at 65% of current color); a liquid div filling the tank, clipped per-frame by `clip-path: polygon(...)` whose top edge tilts — left/right heights offset by ±tan(tilt)·width/2 around the current level; a duplicate value label inside the liquid div in the on-liquid colour; a right-edge tick ruler (22% wide, one 1px line per tick via a repeating linear-gradient, `--sg-ticks` divisions, default 4); and, for interactive tanks, a drag marker line (2px, currentColor, 80% wide) that only shows while held, tracking a lazily painted position.
- Colours via inline CSS variables: `--sg-liquid` (default #f5f5f5), `--sg-glass` (default #27272a), and `--sg-on-liquid` computed from the liquid colour by relative luminance (weights 299/587/114, threshold 150) → #111111 on light liquid, #ffffff on dark. Hex parsing accepts 3- and 6-digit forms; unparsable falls back to white ink.

## Liquid simulation

- State `{ x (displayed level), v, L (target), raf, last }`; the display level is a damped spring toward the target integrated with fixed sub-steps of 1/120s (frame delta clamped to 0.05s): stiffness k = 1224 − 1044 × viscosity, damping ratio ζ = 0.26 − 0.17 × viscosity (viscosity 0 skips the spring and snaps; ζ forced to 1 under reduced motion). Each sub-step the velocity decays by exp(−c·h) toward the target.
- Walls bounce: crossing 0 or 100 clamps the level and reflects the velocity multiplied by the splash restitution (default 0.42) — a hard push sloshes, splashes against the ceiling/floor and settles back. Rest detection parks the loop when within 0.05 of the target and |v| < 2; the frame loop self-sleeps when parked and wakes on any target change.
- Tilt: surface angle = clamp(velocity × tilt × 0.07, ±30°) applied to the clip-path top edge; under reduced motion the tilt is forced to 0.
- Target changes (controlled value prop or input) update L, announce, and wake the loop; the controlled watcher ignores value updates that merely echo the value currently being dragged.

## Interaction

- Pointer down (interactive, not disabled, primary button): if press lands within 10px of the marker, grab with the current offset (marker drags relative); otherwise jump the level straight to the press point. Pointer capture keeps the drag outside the tank; dragging reports integer onChange only when the rounded level actually changes.
- Release with Escape restores the level from drag start and reports it; a controlled component snaps back to the prop value if the drag ended elsewhere; cancel/lost-capture behaves like release.
- Keyboard (interactive, not disabled): arrows ±2, PageUp/PageDown ±10, Shift+arrows ±10, Home 0, End 100 — all instant (no slosh) and reported via onChange. Escape during a drag cancels.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | - | Controlled level 0–100. Leave out for uncontrolled mode. |
| defaultValue | number | 60 | Starting level in uncontrolled mode. |
| onChange | (value: number) => void | - | Reports the rounded level while dragging or via keyboard. |
| interactive | boolean | false | Makes the tank a draggable vertical slider. |
| showValue | boolean | true | Renders the percentage label in and out of the liquid. |
| disabled | boolean | false | Dims the tank and blocks input. |
| liquidColor | string | "#f5f5f5" | Liquid colour; the ink inside it is picked automatically. |
| glassColor | string | "#27272a" | Tank background colour. |
| width | number | 88 | Tank width in px. |
| height | number | 180 | Tank height in px. |
| radius | number | 20 | Corner radius in px, clamped to half the smaller side. |
| ticks | number | 4 | Tick divisions on the right edge; 0 hides them. |
| viscosity | number | 0.15 | Spring viscosity 0–1: 0 snaps instantly, higher is lazier and wobblier. |
| tilt | number | 0.45 | How much the surface tilts with velocity, 0–1 scale. |
| splash | number | 0.42 | Velocity kept when the liquid bounces off a wall, 0–1. |
| unit | string | "%" | Suffix shown after the value in the label. |
| ariaLabel | string | "Level" | Accessible name of the tank. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of SloshGauge.jsx and SloshGauge.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: setting a distant target makes the liquid spring over, tilt while moving, overshoot and slosh to rest; a violent drag splashes off the walls and settles; viscosity 0 snaps with no animation; the label always reads correctly both above and under the liquid, including mid-slosh; aria-valuenow tracks the animated value; interactive tank: direct tap jumps, near-marker press grabs with offset, drag outside the tank keeps control, Escape restores the pre-drag level, keyboard steps and Home/End work instantly; controlled and uncontrolled modes both work; disabled blocks input; reduced motion removes tilt and settling oscillation; light and dark liquid colours both get readable ink; unmount cancels the frame loop and media-query listener; 375 / 768 / 1440 wide without overflow.
