Implement the "StarBorder" component from zero: a button (or any element via a polymorphic tag) whose exact rounded outline is a race track for light — one to six glowing star heads orbit the perimeter endlessly, each dragging a fading comet tail; hovering can send the star on one extra accelerating lap, brighten the glow, or keep the star hidden until the cursor reveals it right where the pointer touches the outline; clicking fires twin light pulses around the border plus a ring flash; an optional sparkle mode adds cross-shaped head flares and drifting stardust. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React 18 + Canvas 2D, two files only: StarBorder.jsx (entry, outline geometry, trail/star/dust renderer) and StarBorder.css (all styles). No runtime dependencies, no iframe.
- Root is the element named by `as` (default "button"; when it is a button and the caller passed no `type`, `type="button"` is added automatically). Class `star-border` plus the caller's className; every other prop spreads onto it, so `disabled`, `onClick`, `href` (with `as="a"`) and so on keep working. Styling: position relative, isolation isolate, inline-flex centered, gap 0.5rem, padding 0.875rem 1.5rem, border 0, radius from `--star-border-radius`, background from `--star-border-surface`, colour from `--star-border-text`, font inherit at weight 500, transparent tap highlight.
- Theme tokens are injected as inline CSS variables from the theme prop: dark — surface #0c0c0f, text #fafafa, track rgba(255,255,255,0.1), star colour #ffffff; light — surface #ffffff, text #18181b, track rgba(24,24,27,0.12), star colour #18181b. backgroundColor / textColor / borderColor override surface / text / track respectively. The star colour is `color` or the theme star colour; the trail colour is `trailColor` or the star colour.
- The static track ring is a ::before pseudo-element (inset 0, z-index −1, border-radius inherit) stroked by an inset box-shadow of `--star-border-thickness` in the track colour.
- An absolutely positioned canvas (top/left −48px, size 100% + 96px, z-index −1, aria-hidden, pointer-events none) paints everything that moves. Its backing store covers the element plus a 48px bleed on every side at devicePixelRatio clamped to 2; the 2D transform offsets by (48 + thickness/2) × dpr so drawing happens in element-local coordinates and glow may spill past the box without clipping.
- A disabled button gets opacity 0.5 and a not-allowed cursor; :focus-visible shows a 2px outline in the track colour, offset 3px.

## Outline geometry

- The star travels the exact outline of the content box inset by thickness: a rounded rectangle of (width − thickness) × (height − thickness) with corner radius max(0, radius − thickness/2), clamped to half the side lengths. Any radius from 0 (sharp card) to half the height (pill) is followed exactly.
- The path is decomposed into 8 segments in order — top edge, top-right arc, right edge, bottom-right arc, bottom edge, bottom-left arc, left edge, top-left arc — each with a length, start point and direction (arcs carry a start angle); the perimeter total is the loop length.
- pointAt(distance) walks the wrapped arc length and returns the position plus the outward unit normal; project(x, y) returns the arc length nearest a given point (exact on straights, angle-clamped on arcs). Hover reveal and click pulses use project to snap light onto the outline under the cursor.

## Motion

- A single phase value wraps around the perimeter. Each frame the velocity eases toward cruise = ±total / duration (direction prop: clockwise +, counterclockwise −; duration in seconds floored at 0.3) with a 0.45s time constant, and phase advances by velocity × dt. Instantaneous speed drives trail length.
- hover="lap" (default): on pointer enter, or on keyboard :focus-visible, one extra lap is layered in over 0.9s — each frame adds the cubic in-out eased increment over the perimeter, so the star visibly accelerates around the border once and settles back into its cruise.
- hover="brighten": a boost value eases to 1 while engaged (0.18s in, 0.5s out) and lifts glow by up to 0.4 (clamped at 1.5), brightening trails, heads and the ring flash.
- hover="reveal": the star fades out while idle (reveal value eases down over 0.45s) and fades in when engaged (0.16s); on enter the head is teleported to the projected pointer position and velocity is zeroed, so the star materializes exactly under the cursor and resumes orbiting from there.
- hover="none": the star just cruises, ignoring the pointer.
- prefers-reduced-motion: reduce — cruise velocity is 0, the lap is skipped and stardust stops spawning; the reveal/brighten easing and click pulses still respond to direct interaction.

## Drawing

- Trail: length = min(speed × trailLength × duration, spacing × 0.92, total × 0.6) in px behind each head (trailLength clamped 0–1). Drawn as up to 90 stepped strokes with a squared fade (u² × intensity); each step paints two passes — a wide low-alpha halo of 2 + 6 × glow px and the thickness-wide core — mixing colour from tail to head along the trail; on dark theme the composite operation is "lighter" and the trail whitens toward the head, on light theme it is plain source-over with softer alphas.
- Resting state: when the star is nearly still (below ~60% of cruise speed) a soft symmetric rest trail of (10 + 14 × glow + 2 × thickness) px extends both ways from each head, scaled by a stillness factor.
- Heads: 1–6 stars evenly spaced around the loop (spacing = total / stars). Each paints a radial bloom of reach (12 + 40 × glow) px (light theme × 0.6) at strength (light 0.08 / dark 0.4) × glow × intensity, with a four-stop falloff. sparkle adds a bright core dot (radius ~1.6 × thickness, light theme slightly smaller) and horizontal + vertical cross spikes of length (3 + 4 × glow + 1.5 × thickness) × twinkle; twinkle oscillates around 0.82 ± 0.18 at 6.1 and 2.7 rad/s with per-star phase offsets.
- Stardust (sparkle only): motes spawn at head positions at (2 + 6 × min(2, pace)) × stars per second while the star is visible, capped at 48 live motes; each gets an outward push of 3–13 px/s, a lateral drift, a shear from the star's direction of travel, exponential drag (tau ≈ 0.45s), life 0.35–0.85s, radius 0.45–1.15 px and a 20 rad/s shimmer; dark-theme motes whiten toward 60% white.
- Click pulses (clickPulse): a pointerdown (left button for mice) projects the click onto the outline and spawns a pulse pair from that point; keyboard activation (click detail 0) pulses from the current head position. Each half travels in one direction at an eased half-perimeter over 0.5s, fades over 0.65s, and draws its own trails and small heads; at most 4 pulses coexist. Every pulse also flashes the whole ring: a rounded-rect stroke in the head colour whose alpha decays with a 0.22s time constant, brightened further while boosted.
- Colour parsing runs through the canvas fillStyle normalizer on a detached context (3/6-digit hex, rgb()/rgba(), named colours); unparsable input falls back to white. Colours are re-parsed only when color or trailColor changes.

## Frame loop & lifecycle

- One requestAnimationFrame loop per instance. It keeps running while a reveal/boost value is still easing, a flash, pulse or dust is alive, the star is moving while visible, or the pointer is over the element; once everything settles it stops after one final paint. It wakes on: prop changes (an effect runs after every render), resize, pointer enter/leave/down/click, focus/blur, and becoming visible again.
- ResizeObserver on the root re-measures size and re-allocates the canvas on the next frame. IntersectionObserver pauses the loop entirely while offscreen and wakes it on return.
- Pointer coordinates are normalized through getBoundingClientRect scale factors, so CSS scaling on ancestors cannot skew the projected positions.
- Unmount: cancel the frame, disconnect both observers, remove the six pointer/focus listeners. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| as | ElementType | "button" | Renders as this element ("a", "div", …); button semantics and type are automatic for buttons. |
| children | ReactNode | - | Content inside the frame; the star rides its exact outline. |
| color | string | - | Star and head colour; theme default (#ffffff dark / #18181b light) when unset. |
| trailColor | string | - | Comet trail colour; falls back to color. |
| duration | number | 4 | Seconds per full orbit of the outline; floored at 0.3. |
| thickness | number | 1 | Track and trail stroke width in px; floored at 0.5. |
| radius | number | 12 | Corner radius in px the star follows; floored at 0. |
| trailLength | number | 0.3 | Trail length as a fraction of the lap time, 0–1. |
| stars | number | 1 | Evenly spaced heads around the outline, 1–6. |
| glow | number | 0.6 | Halo and bloom strength, 0–1. |
| sparkle | boolean | false | Cross-flare heads and drifting stardust. |
| direction | "clockwise" \| "counterclockwise" | "clockwise" | Orbit direction. |
| hover | "lap" \| "brighten" \| "reveal" \| "none" | "lap" | Hover behaviour: one extra lap, a glow boost, appear under the cursor, or nothing. |
| clickPulse | boolean | true | Click fires twin light pulses around the outline plus a ring flash. |
| theme | "dark" \| "light" | "dark" | Surface, ink, track and star colour defaults. |
| backgroundColor | string | - | Surface colour override. |
| textColor | string | - | Label colour override. |
| borderColor | string | - | Static track ring colour override. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of StarBorder.jsx and StarBorder.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. No runtime dependency beyond React.
- Validate: the star follows the exact rounded outline for pills and cards at any size and radius; duration, direction, thickness and stars changes apply live without restart; the trail stretches with speed and shrinks to the soft rest trail at standstill; hover lap accelerates exactly one lap and settles; brighten visibly lifts glow; reveal hides while idle and materializes under the cursor; click pulses run both ways from the click point with a ring flash and keyboard Enter pulses from the head; sparkle adds flares, twinkle and dust capped at 48; theme dark/light plus the three colour overrides; as="a" renders a working link and disabled dims; reduced motion stops the idle orbit but keeps click feedback; offscreen instances pause; unmount leaves no frame loop, observers or listeners; 375 / 768 / 1440 wide without overflow.
