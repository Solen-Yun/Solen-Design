Implement the "SlingButton" component from zero: a circular send button whose pad you grab and pull back like a slingshot — a band stretches from the well to the pad, an accent progress ring arms around the pull, the icon rotates to aim at the drag direction, and releasing past the arm threshold fires the action, snaps the pad home on a spring, and bursts a cone of particles in the launch direction. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React + CSS + an inline SVG effect layer, two files only: SlingButton.jsx (entry, pointer physics, particle launch) and SlingButton.css (all styles). Uses `motion/react` for the return spring and reduced-motion detection, and one icon package for the default up-arrow glyph. No iframe, no canvas.
- Root is a `<span class="sling-button">` sized `--sl-size` (default 56px) via inline CSS variables. It carries `data-armed` while the pull passes the arm threshold and `data-sent` for ~200ms after a fired launch.
- Layer order inside the root: an absolutely centered SVG (`--sl-svg` square, overflow visible, pointer-events none) holding (a) a tension group with two band paths and (b) a well circle plus a progress arc; then N particle `<span>` dots (default 14, each `--sl-dot` px, default max(6, size/7), accent-coloured circles); then a `motion.span` wrapper translated by two motion values; inside it the `<button class="sling-button__pad">` (circular, cursor grab, `touch-action: none`, an ::after hit slop of −6px inset outside for easier grabbing) containing the icon face.
- Geometry derived from props: GAP = 4px between pad and well; well radius = size/2 + GAP + strokeWidth; pad radius = size/2 − strokeWidth/2; SVG half-size H = well radius + strokeWidth + 2; arc radius = well radius.
- Theming via inline CSS variables: `--sl-pad` (pad face, default #f5f5f5), `--sl-icon` (glyph, #18181b), `--sl-accent` (band hot stroke, arc, particles, sent flash — #f5f5f5), `--sl-well` (well circle, #27272a), `--sl-band` (resting band, #52525b), `--sl-stroke` (3px). The default icon is an up-chevron outline icon sized to 40% of the button; children replaces it. The exact default glyph artwork is embedded in code and takes precedence over this description.
- Accessibility: the pad is a real `<button type="button">` with `aria-label` (default "Send") and `aria-describedby` pointing to a visually hidden hint span reading "Press Enter to send, or drag away and release."; `aria-disabled` when disabled; `data-held`/`data-armed` drive cursor (grab → grabbing) and face scale (held 0.97, armed 1.04, fine-pointer hover 1.02); disabled shows 0.5 opacity and a not-allowed cursor.

## Pull physics

- Pointer down (primary button only, not disabled, no active grip) stops any running return spring, records the pointer id, start position, a history buffer (last 4 samples within 80ms) for release velocity, and a slop distance (4px fine pointers, 8px touch) that separates a tap from a drag; sets pointer capture.
- Drag distance uses an inverse rubber-band: displayed distance d = R·raw / (R + raw), where R = maxPull (default 160px) — so the pad approaches but never exceeds R, resisting harder the farther it is pulled. The raw origin accounts for grabbing mid-return.
- Axis restriction: `axis: "horizontal"` or `"vertical"` rubber-bands the off-axis coordinate (amplitude size/4, factor 0.55), while `axis: "any"` (default) lets the pad follow the pointer freely in 2D. The pull direction unit vector drives everything below.
- While dragging, a rAF-scheduled paint (queued from motion-value change events) recomputes: the band path — two straight segments from the points where the band leaves the well circle tangent-style to the pad rim, drawn with the resting band colour; a "hot" duplicate band path in the accent colour whose opacity equals arm progress p = projection of the pull onto the pull direction / ARM (ARM = min(armAt, 0.8·R), default 48); an arc progress ring around the well using stroke-dasharray `p (1−p)` with dashoffset p/2, rotated to face the pull direction, hidden below 1% progress; and the icon rotation — the icon turns by up to 90° (scaled by min(dist/12, 1)) to point along the pull direction, with transitions disabled mid-drag and restored on release.
- Arming: when displayed distance crosses ARM the root and pad flip to `data-armed`; the band and arc thicken to 1.5× stroke and the face swells to 1.04.

## Launch

- Release with a drag: velocity is estimated from the recent history (finger velocity, capped at 3000px/s). If armed and not cancelled, `onSend` fires immediately; the pad receives a launch velocity of launchSpeed (default 2600) × min(p, 1.5) opposite the pull direction, added to the finger velocity (total capped at 6000px/s), and a spring animation (duration 0.4s, bounce = recoil 0.2) returns px/py to 0. If released below the threshold or cancelled (Escape, pointercancel, lost capture), the pad springs back with a small cancel velocity (0.5 × launchSpeed × p) and no callback.
- Fire particles: 150ms after a fired launch a cone of dots bursts along the launch direction. The lead dot flies straight (reach = flight × push, where push = 0.85 + 0.35 × overcharge power from pulling past ARM up to 1.5×); the other dots get randomized angles within ±spread/2 degrees (double-random triangular distribution), reaches of 0.3–1.3 × flight × push, lateral drift, scales of 0.3–0.9 shrinking to 0.2–0.8 of that, durations 0.7–1.7 × 300ms, and random delays up to 70ms. Each dot animates transform and opacity via Web Animations with a strong ease-out; all fade out by the end. Launching the dots also relaxes the icon.
- Tap (pointer never moved past slop): with tapSends (default true) the press sends immediately on release without any pull; a tap always relaxes the icon.
- Sent flash: fired launches set `data-sent` for 200ms (reduced-motion path uses this instead of particles), tinting the well circle with the accent colour via a CSS fill transition.
- Resize/prop changes to size, strokeWidth, armAt, maxPull, axis: stop springs, jump the pad home, repaint.

## Reduced motion & cleanup

- prefers-reduced-motion: no particles, no icon rotation transition, no face scale transforms (CSS override), the pad jumps home with a 200ms opacity fade on the tension layer instead of a spring, and fired launches use the 200ms sent flash only.
- Unmount: stop both spring animations, clear the pending particle timer. Escape during a drag cancels it. Multiple instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | up-arrow icon | The icon inside the pad. Defaults to a built-in outline up-chevron. |
| onSend | () => void | - | Called when the sling fires (release past the arm threshold) or on a plain tap. |
| padColor | string | "#f5f5f5" | The pad face colour. |
| iconColor | string | "#18181b" | The glyph colour. |
| accentColor | string | "#f5f5f5" | Colour of the hot band, progress arc, particles and the sent flash. |
| wellColor | string | "#27272a" | The well circle behind the pad. |
| bandColor | string | "#52525b" | The resting band colour before the arm highlight fades in. |
| size | number | 56 | Button diameter in px; the icon and particle dot size derive from it. |
| strokeWidth | number | 3 | Band, arc and well stroke width in px. |
| armAt | number | 48 | Pull distance (px) at which the sling arms; clamped to 80% of maxPull. |
| maxPull | number | 160 | Rubber-band ceiling: the pad can never be pulled farther than this. |
| launchSpeed | number | 2600 | Spring-back speed imparted to the pad on a fired release (px/s). |
| recoil | number | 0.2 | Bounce of the return spring, 0–1. |
| flight | number | 120 | Base particle flight distance in px. |
| particles | number | 14 | Number of particle dots; floored at 0. |
| spread | number | 60 | Cone half-angle of the particle burst, in degrees. |
| axis | "any" \| "horizontal" \| "vertical" | "any" | Free 2D pull, or lock one axis with rubber-banding on the other. |
| tapSends | boolean | true | A press without movement sends on release. |
| disabled | boolean | false | Disables interaction and dims the button. |
| ariaLabel | string | "Send" | Accessible name of the pad button. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of SlingButton.jsx and SlingButton.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: dragging in any direction stretches the band from the well rim to the pad and the hot band/arc fade in proportionally; the icon aims along the pull; releasing past the arm threshold calls onSend once, snaps home on a spring and bursts the particle cone along the launch direction; releasing early returns without firing; Escape cancels a drag; a plain tap sends when tapSends is on and does nothing when off; over-pulling past the arm distance visibly boosts the burst; axis locks rubber-band the free axis; disabled blocks all interaction; reduced motion fires with the flash only and no transforms; repeated rapid fires never leave dots stuck or springs running after unmount; keyboard users get the hidden hint and a focusable pad; 375 / 768 / 1440 wide without overflow.
