Implement the "TextLoop" component from zero: a seamless text marquee that rides along curved SVG paths — a wave, a straight line, an arch, a closed circle ring or an infinity loop — optionally drawn as a coloured ribbon tape with a second tape crossing it at an angle. The loop drifts on its own, eases to a stop under the pointer, can be grabbed and flung (rings follow the pointer around the circle), and accelerates for a moment when the page scrolls. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + SVG, two files only: TextLoop.jsx (entry, geometry, motion) and TextLoop.css (all styles). React >= 18; the animation library gsap at ^3.13.0 is used only as a ticker and tween engine. No iframe, no canvas.
- Root is a `<div>` (class text-loop, plus text-loop--draggable when draggable): position relative, width 100%, overflow hidden; grab cursor while draggable and grabbing during a drag (touch-action pan-y). Inline style merged from the style prop.
- Inside is one `<svg>` (class text-loop-svg: display block, width 100%, height auto): viewBox 0 0 1200 520, preserveAspectRatio xMidYMid meet, role="img" with aria-label = the text prop. The design space is 1200×520 with centre (600, 260) and a 6px edge pad.
- defs: (a) an edge-fade mask — a horizontal linearGradient of 17 stops (9 per side) whose fade zone is edgeFade × 0.3 of the width, opacity following a smootherstep ramp; (b) when the cross tape and ribbon are both on, a Gaussian blur filter (stdDeviation max(4, ribbonWidth × 0.11), oversized userSpaceOnUse region) and an "underlay" mask holding the cross ribbon path stroked in white at ribbonWidth.
- A hidden measure `<text>` (class text-loop-measure, visibility hidden, pointer-events none) holds one loop unit for width measurement. Everything visible is wrapped in `<g mask>` for the fade and painted by one of two `<text>` copies per tape (head and tail textPaths, see loop). Text styling: inline fontSize, fontWeight, letterSpacing; dominant-baseline central; textLength = path length with lengthAdjust="spacing" so the repeated unit stretches to tile the path exactly; user-select none.
- Loop unit: the text uppercased when uppercase, followed by the gap — `"\u00A0" + separator + "\u00A0"` when separator is non-empty, otherwise three no-break spaces. Repeats = round(path length / measured unit width), floored at 1; the unit text repeated that many times is rendered twice per tape (head at startOffset = offset, tail at offset − length) so the wrap seam never shows. Measurement re-runs on geometry changes and once after document.fonts.ready.
- Accessibility: the svg is a labelled image; all textPath elements and the measure text are aria-hidden. Instances namespace their path/mask/filter ids through useId and share nothing.

## Paths

- wave (default): a smooth T-chain quadratics from x = −320 to 1520 in 320px steps, amplitude = min(curviness × 2.2, room × 2) where room = max(20, 260 − ribbonWidth/2 − 6).
- line: straight from (−320, 260) to (1520, 260).
- arch: one quadratic from (120, 260 + rise/2) through (600, 260 − rise × 1.5) to (1080, 260 + rise/2), rise = min(120 + curviness × 1.1, room × 2).
- circle: a closed ring of two arcs; radius = min(90 + max(0, curviness) × 0.95, room). The mirrored variant used by the cross tape is a flat ellipse rx = radius × 1.22, ry = radius × 0.42.
- infinity: a lemniscate of four cubic Béziers through (600 ± r, 260), r = 150 + curviness × 1.4, half-height = min(60 + curviness × 0.95, room).
- A custom path prop (a raw SVG d string in the 1200×520 space) replaces the built path for both tapes.
- Ribbon: the path itself is stroked with ribbonColor at strokeWidth ribbonWidth, round caps and joins; with ribbon off the path stroke is none and the text falls back to currentColor.

## Motion & interaction

- Motion state lives in refs; travel is a single scalar advanced on gsap.ticker with dt clamped to 0.05s. Each frame the offset wraps modulo path length and is written to all textPath startOffsets (head offset, tail offset − length; the cross tape runs the wrapped negative). Frames skip when the combined velocity is under 0.01 px/s. An IntersectionObserver starts and stops the ticker as the root enters/leaves the viewport.
- Base velocity = max(0, speed) px/s × sign (forward +1, reverse −1). prefers-reduced-motion zeroes the base velocity and disables fling handoff; manual dragging still repositions.
- pauseOnHover (default on): a hover scale tweens 1 → 0 on pointerenter (pointerType not touch, power2.out 0.6s) and back to 1 on leave (power2.inOut 0.9s), multiplying the base velocity for a soft pause/resume.
- draggable: pointerdown (mouse button 0, or touch/pen) captures the pointer on the root and records the svg rect centre. On circle paths the drag converts the wrapped pointer angle around the centre into arc length via the ring radius; flat paths project the pointer delta onto the path direction (tilt + half cross angle, in radians) scaled by 1200 / svg width. Velocity blends 60% previous + 40% delta/dt; releasing within 90ms hands off a fling clamped to ±2600 (decay exp(−dt/0.55)), otherwise velocity zeroes.
- scrollBoost: a capture-phase, passive scroll listener on window accepts page scroll or any scroller containing the root; instant scroll velocity (blended 50/50, resets after 200ms gaps or source changes) decays exp(−dt/0.12) once scrolling quiets for 90ms; the boost target = clamp(scrollVelocity × scrollBoost × 0.35 × sign, ±1600) is approached with 1 − exp(−dt/0.18). scrollBoost 0 disables the listener.
- Cross tape: a second copy of the path rotated by tilt − crossAngle/2 (the main tape rotates tilt + crossAngle/2 about the design centre), travelling the opposite direction; wave, arch and circle use mirrored variants of the path for the cross tape (the wave and arch flip their amplitude, the circle becomes the flat ellipse), while line, infinity and custom paths repeat as-is. With ribbon on it is stroked in crossColor or ribbonColor tinted 62% toward white, and its text is filled with a luma-based contrast ink (threshold 0.2 → #120f17 or #ffffff) of that tape colour; without ribbon the cross text uses crossColor or currentColor at 0.45 opacity.
- Shadow: when cross and ribbon are both on, a blurred black copy of the main tape (opacity 0.42, translated down max(4, ribbonWidth × 0.08)) is masked by the cross ribbon shape so a soft shadow appears only where the crossing tape overlaps the main one.
- Outline mode: text strokes (strokeWidth outlineWidth, round joins) instead of filling, for both tapes.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "React ✦ Bits" | The text that loops along the path. |
| shape | "wave" \| "line" \| "arch" \| "circle" \| "infinity" | "wave" | The built-in path. |
| path | string | - | A raw SVG d string (in the 1200×520 design space) that replaces the built path for both tapes. |
| speed | number | 90 | Travel speed along the path in px per second. 0 keeps it still until dragged. |
| direction | "forward" \| "reverse" | "forward" | Which way the text travels. |
| separator | string | "✦" | Mark between repeats, joined with no-break spaces. Empty uses three spaces. |
| curviness | number | 90 | How much the path bends; scales each shape's amplitude or radius. |
| tilt | number | 0 | Whole-tape rotation in degrees about the design centre. |
| fontSize | number | 46 | Letter size in px. |
| fontWeight | number | 800 | Weight of the letters. |
| letterSpacing | number | 2 | Extra space between letters in px. |
| uppercase | boolean | true | Upper-cases the text. |
| color | string | - | Text fill (or stroke when outline). Defaults to white on the ribbon, else currentColor. |
| ribbon | boolean | true | Draws the coloured tape under the text. |
| ribbonColor | string | "#5227FF" | Colour of the main tape. |
| ribbonWidth | number | 86 | Stroke width of the tapes in design px. |
| edgeFade | number | 0 | 0–1; how much of each side fades out (fade zone = value × 0.3 of the width). |
| pauseOnHover | boolean | true | Eases the loop to a stop while hovered. |
| cross | boolean | false | Adds the second tape crossing at an angle, running the opposite way. |
| crossColor | string | - | Colour of the cross tape and (without ribbon) its text. |
| crossAngle | number | 16 | Angle between the two tapes in degrees, split evenly around tilt. |
| draggable | boolean | false | Lets people grab the text; circles follow the pointer around the ring, flats project the drag onto the path. |
| scrollBoost | number | 0 | Momentary px/s boost per px/s of scrolling, easing back after. 0 turns it off. |
| outline | boolean | false | Renders the letters as strokes instead of fills. |
| outlineWidth | number | 1.5 | Stroke width for outline mode. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | {} | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of TextLoop.jsx and TextLoop.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: every shape loops seamlessly with no popping at the seam at any speed, direction, font size and ribbon width; repeats survive font loading; ribbon paints under the text with the configured colour and width; the cross tape crosses at the configured angle, runs opposite, carries contrast ink on its tape and casts the masked shadow; custom paths render for both tapes; speed 0 stays still; pauseOnHover eases to a stop and resumes; dragging works on flat paths and around the ring with fling handoff; scrollBoost spikes with page or container scrolling and eases back; edgeFade fades both sides; outline mode strokes the letters; reduced motion keeps the text still while dragging still repositions; offscreen loops stop ticking; unmount leaves no ticker, observers, listeners or tweens; same-page instances are independent; the screen reader hears the text once; no overflow at 375 / 768 / 1440 wide.
