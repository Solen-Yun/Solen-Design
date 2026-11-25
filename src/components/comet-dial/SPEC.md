Implement the "CometDial" component from zero: a circular SVG dial whose tick ring is an arc of a given sweep; you drag anywhere on the ring and the lit arc and its head dot follow your finger, and on release the dial keeps gliding with computed momentum before a spring snaps it to the nearest step — while it moves fast, a comet of tapering arc segments streaks out behind the head. A large tabular readout sits in the centre. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + a motion runtime, two files only: CometDial.jsx (entry, pointer/grip physics, paint loop) and CometDial.css (all styles). React >= 18; the runtime provides one motion value with spring animation, velocity query, reduced-motion detection and jump.
- Root is a `<div>` with class `comet-dial` (position relative, square width/height = size, user-select none) carrying `data-dragging` while a grip is active and `data-disabled` when disabled (opacity 0.55, pointer-events none on the ring). Inline CSS variables: --cd-accent, --cd-ink, --cd-size, --cd-figure (round(size × 0.16) px).
- Inside is a single `<svg viewBox="0 0 200 200">` (absolute inset 0, rounded, cursor grab / grabbing while dragging, touch-action none, outline none) that is the interactive element: role="slider", tabIndex 0 (−1 when disabled), aria-label, aria-valuemin/max/now/text (valuenow and valuetext are refreshed by the paint loop; valuetext is "<value><unit>"). Children in paint order: the track arc (stroke --cd-ink at 24% opacity), the lit arc (stroke --cd-accent at 70% opacity, drawn from the sweep start up to the current angle), a group of 12 comet paths (stroke --cd-accent, opacity 0 when idle), and the head circle (fill --cd-accent, radius = thickness × 1.8). Beneath the SVG an aria-hidden readout div centers a value line: the figure span (font --cd-figure, weight 500, letter-spacing −0.04em, tabular-nums) and, when unit is non-empty, a unit span at half size and 50% opacity.
- Geometry: the arc radius is 80 in the 200×200 viewBox. Sweep angle `sweep` (degrees) leaves a gap of 360 − sweep; the arc starts at 90 + gap/2 (measured in SVG coordinates, so the gap sits at the top). Arc paths use round caps and are regenerated on demand with an SVG large-arc flag when the segment exceeds 180°.

## Reading model & paint loop

- One motion value holds the "reading" (a raw angle value in value units, i.e. min–max space). A target ref holds the committed, snapped value. The frame loop runs only while needed (self-sleeping, see below) and each frame:
  - While a pointer grip is active, the reading exponentially follows the grip angle with time constant 0.06 s (reduced motion jumps instead).
  - Velocity is estimated per frame from reading delta over dt (clamped to 50 ms), normalized by the value range, then smoothed with time constant 0.05 s. This smoothed velocity drives the comet.
  - The lit arc path is redrawn from the sweep start to the angle of the current reading (empty when the reading sits at min). The head circle's cx/cy are set to the point at that angle.
  - Comet: 12 segments. Segment length = (cometReach × speedFactor) / 12 where speedFactor = clamp(|velocity| / 4, 0, 1); trailing segments trail behind the motion direction, each clamped into the sweep range, drawn as arc paths with width = thickness + cometWidth × taper × speedFactor (taper 1 → 0 over the 12 segments) and opacity taper × speedFactor. When the dial is not moving all comet segments are hidden.
  - The centre figure text and aria-valuenow are updated only when the formatted string changes (decimals derived from step).
- Self-sleep: the loop stops when there is no grip, the reading is not animating, and the smoothed velocity is below 0.002; the comet is cleared on the final frame. Any drag, launch or key interaction wakes it again. dt is clamped so background-tab resumes don't jump.

## Pointer interaction

- Pointerdown on the SVG (only button 0, not disabled, no existing grip) is ignored inside a dead zone of radius 44 around the centre. Otherwise it sets pointer capture, focuses the SVG, records a grip {pointer id, start point, angle history, side}, sets dragging, commits the touched angle (snapping the target and firing onChange) and launches a gentle spring to the snapped angle so the head eases to the finger.
- The exact angle under the pointer maps from client coordinates through the bounding box into the 200×200 space; angles beyond the sweep are clamped to 0 or full sweep, and once a drag starts on one side of the gap the grip remembers that side so crossing the gap doesn't flip the value.
- Pointermove only takes effect after the pointer travels 10px (so a stationary press stays a tap); during drag it updates the grip angle, pushes it onto a short history (last 4 samples), commits continuously (onChange per move) and wakes the loop.
- Pointerup/cancel: releases capture, clears dragging. A tap (never moved) just commits with no fling. A drag computes velocity from the history (first vs last sample; 0 if the last sample is older than 80 ms or the pointer was cancelled), then predicts a destination: snapped(angle + velocity/1000 × (decel/(1−decel)) × momentum) where decel = 0.99 — and springs the reading there with a spring whose stiffness k = 200 + speed/100 × 700, damping = critical × (1 − bounce), mass 1, seeded with the release velocity; bounce interpolates from tapBounce to flickBounce by |velocity| / range / 2. onChangeEnd fires with the snapped value and { velocity, bounce }.

## Keyboard & controlled use

- Keyboard on the focused SVG: ArrowRight/Up and ArrowLeft/Down step ±step (×10 with Shift), PageUp/PageDown ±10 steps, Home/End jump to min/max; each move snaps, jumps the reading, commits and wakes the loop once. Disabled ignores keys and pointer input.
- Controlled mode: when `value` is passed, external changes (while not dragging) launch a spring to the snapped value. Uncontrolled mode seeds from defaultValue. onChange fires on every commit during drags and keys; onChangeEnd fires on release and on each discrete key move.

## Reduced motion & cleanup

- prefers-reduced-motion: no spring flights or follow easing — the reading jumps to its target, the comet never draws, and the paint loop still renders once to update arcs, head and text.
- Unmount cancels the frame loop, removes window pointer listeners bound during a drag and stops the reading value. Re-layout (min/max/step/sweep/thickness/comet props/unit changes) repaints immediately.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | - | Controlled value; external changes spring the dial there. |
| defaultValue | number | 62 | Initial value (uncontrolled mode). |
| min | number | 0 | Minimum value. |
| max | number | 100 | Maximum value. |
| step | number | 1 | Snap increment; its decimal count drives the readout formatting. |
| unit | string | "%" | Unit shown after the readout figure and in aria-valuetext. |
| label | string | "Level" | Accessible name of the slider. |
| accent | string | "#f5f5f5" | Accent colour of the lit arc, comet and head. |
| ink | string | "#fdfdfd" | Track colour and readout ink. |
| size | number | 250 | Dial diameter in px. |
| sweep | number | 320 | Arc sweep in degrees; the remaining gap sits at the top. |
| thickness | number | 5 | Stroke thickness of the track, lit arc and comet base, in viewBox units. |
| speed | number | 25 | Spring stiffness dial 0–100 (k = 200 + speed/100 × 700). |
| tapBounce | number | 0.2 | Spring bounce after a tap or small move, 0–0.9. |
| flickBounce | number | 0.1 | Spring bounce after a hard flick, blended from tapBounce by flick speed. |
| momentum | number | 1 | Multiplier on the predicted glide distance after release. |
| cometReach | number | 180 | Total angular reach of the comet at full speed, in degrees. |
| cometWidth | number | 12 | Extra stroke width the comet adds at full speed, in viewBox units. |
| disabled | boolean | false | Disables pointer and keyboard input and dims the dial. |
| onChange | (value: number) => void | - | Fires when the snapped target changes (continuously during drags). |
| onChangeEnd | (value: number, detail: { velocity: number, bounce: number }) => void | - | Fires on release and on each discrete key move. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of CometDial.jsx and CometDial.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: dragging the ring follows the finger with slight smoothing and never crosses the top gap mid-drag; release glides with momentum and settles on a spring that snaps to step; a hard flick stretches the comet behind the head and it fades when the dial sleeps; taps ease the head to the tapped angle; arrow keys, PageUp/Down, Home/End all work with Shift ×10; step decimals format the readout; controlled value changes spring from outside; disabled blocks input; reduced motion jumps without comet; rapid drags across min/max clamp correctly and never stick; unmount leaves no rAF or listeners; 375 / 768 / 1440 wide without overflow.
