Implement the "BlurText" component from zero: text that arrives out of focus — every word (or character) starts blurred and transparent, then crisply resolves with a soft-focus reveal, piece by piece with a controllable stagger order. Five built-in effects (blur, zoom, tilt, focus, drift) each push pieces in from a different direction with their own blur profile, spring overshoot and exit state; an optional loop blurs the text back out and re-resolves it forever. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React >= 18 plus the motion package (`motion` components, `MotionConfig`, spring transitions); one file (BlurText.jsx), no CSS file — all styles inline. No iframe.
- Root is a `<p>` with display flex, flex-wrap wrap, the `color` prop, and cursor pointer when trigger is "click"; pointerenter drives trigger "hover", click drives trigger "click". It is wrapped in `<MotionConfig reducedMotion="user">` so system reduced-motion preferences are honoured. A visually-hidden span carries the full plain text; every animated piece is aria-hidden.
- Text splits on spaces into words; animateBy "words" makes each word one piece (padded with a non-breaking space except the last), "characters" splits every word into single-character pieces with non-breaking spaces between words. Words render as inline-flex wrappers so they wrap as units; pieces are inline-block with will-change: transform, filter, opacity. Changing `text` remounts the pieces and restarts the reveal.
- Stagger ranks: "start" ranks pieces front-to-back, "end" back-to-front, "center" by distance from the middle (half ranks for even counts), "random" shuffles deterministically — an FNV-style seed hashed from the full text drives a linear-congruential generator and a Fisher–Yates shuffle, so the same text always shuffles the same way. Per-piece delay = rank × stagger where stagger = delay/1000 seconds.

## Effects

- Five built-in effects, each parameterized by `blur` (px) and `distance` (px), oriented by `direction` (top/bottom/left/right map to a y/x axis and a sign):
  - blur (default): pieces start at blur(10px), opacity 0 and offset by +distance along the axis, resolving straight to sharp, opaque and in place; exit reverses to blurred, transparent and offset −0.6 × distance.
  - zoom: starts blurred 1.2×, scaled 1.4 and pushed 0.35 × distance inward; exits shrinking to 0.82 scale. Bounce 0.25.
  - tilt: pieces flip in from a 55° rotateX (vertical directions) or rotateY (horizontal) with 600px perspective, half the distance offset, straightening through a slight counter-lean; transform origin sits on the entering edge. Exit falls away at −40°.
  - focus: pure rack-focus — pieces start blurred 1.4× at opacity 0.32 and scale 1.12 with no movement, easing in-out throughout; no spring, longest settle.
  - drift: pieces slide in horizontally 1.6 × distance (direction right/left decides the sign) with a 28° skew that unwinds, vertical push only on vertical directions; exit drifts the opposite way with +20° skew. Bounce 0.3.
- Each effect defines: a from-state, an end (rest) state, an exit state, the fade easing for opacity/filter (linear for blur, ease-out for zoom/drift/tilt, in-out for focus), a spring bounce factor (none for focus), a settle factor (how much of the run the movement spring eats), and an exit ease (ease-in except focus's in-out).
- The in-animation interpolates each property from its from-state to its rest state over totalDuration = stepDuration × (number of steps − 1), i.e. 0.35s per step by default. Opacity/filter follow the fade ease; movement keys (x, y, scale, rotateX, rotateY, skewX) present in the from-state ride a spring with visualDuration = totalDuration × settle and the effect's bounce. Every piece delays by rank × stagger. Custom `animationFrom`/`animationTo`/`easing` replace the built-in states entirely: keyframes then walk the full user sequence with evenly spaced times and the user easing (default linear).
- Exit animation: pieces animate to the exit state over stepDuration × 1.3 with the exit ease, staggering at 0.4 × the in-rate (reverse order emerges naturally from the ranks).
- Phases: trigger "load" starts in immediately; "hover"/"click" start settled (initial=false on pieces) and replay through out → in on interaction; "view" starts hidden and flips to in when an IntersectionObserver (threshold, rootMargin) sees the paragraph, once. The replay only fires when settled, and never interrupts an exit. With loop on, the settled phase schedules out after loopDelay seconds and out chains back to in, forever; onAnimationComplete fires when the in-phase settles.

## Extras & accessibility

- focusOnHover: hovering a word keeps it sharp while every other word blurs by clamp(blur × 0.3, 2–6px) and dims to opacity 0.3, both transitioning 0.45s with a soft cubic-bezier; leaving resets. Hover words track independently of the reveal state.
- fromColor tints the pieces during entry and exit, with a CSS color transition timed to each piece's stagger (90% of totalDuration in, exitDuration out) so the colour settles to the inherited colour as pieces resolve.
- prefers-reduced-motion is delegated to MotionConfig ("user"), so system preferences collapse the animation; the IntersectionObserver still gates visibility-triggered runs.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "" | The text to reveal; split on spaces into pieces. |
| delay | number | 200 | Stagger between pieces, in ms; 0 plays all at once. |
| className | string | "" | Extra class names for the paragraph. |
| animateBy | "words" \| "characters" | "words" | Split granularity of the pieces. |
| direction | "top" \| "bottom" \| "left" \| "right" | "top" | Where pieces travel in from. |
| threshold | number | 0.1 | IntersectionObserver visibility ratio for the "view" trigger. |
| rootMargin | string | "0px" | IntersectionObserver root margin for the "view" trigger. |
| animationFrom | object | - | Custom entry state per piece; replaces the built-in from-state. |
| animationTo | object[] | - | Custom keyframe steps; replaces the built-in states. |
| easing | string \| number[] | - | Easing for the custom keyframe sequence; defaults to linear. |
| onAnimationComplete | () => void | - | Called when the reveal settles. |
| stepDuration | number | 0.35 | Seconds per animation step; drives the total duration. |
| blur | number | 10 | Starting blur radius in px; also scales zoom/focus/drift blur. |
| distance | number | 50 | Travel distance in px for the movement part of the effect. |
| effect | "blur" \| "zoom" \| "tilt" \| "focus" \| "drift" | "blur" | Which built-in effect to run. |
| staggerFrom | "start" \| "end" \| "center" \| "random" | "start" | Which piece animates first; random is deterministic per text. |
| trigger | "view" \| "load" \| "hover" \| "click" | "view" | What starts the reveal; hover/click replay on interaction. |
| loop | boolean | false | Blur out and re-resolve forever. |
| loopDelay | number | 2 | Seconds to hold the settled text before looping out. |
| color | string | - | Text colour for the paragraph. |
| fromColor | string | - | Colour pieces tint during entry/exit, settling to the inherited colour. |
| focusOnHover | boolean | false | Hovering a word blurs and dims the others. |

## Delivery & validation

- Deliver the complete content of BlurText.jsx plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: words resolve blurred-to-sharp with the configured stagger order (start/end/center/random all rank correctly and random is stable per text); all five effects land with their own blur/scale/tilt/skew profiles and spring overshoot; direction flips the travel axis and sign; custom animationFrom/animationTo/easing override the built-ins; view/load/hover/click triggers behave (hover and click replay only when settled); loop blurs out after loopDelay and re-resolves without getting stuck mid-exit; focusOnHover dims siblings independently; fromColor settles to the inherited colour; reduced motion collapses the animation; text changes restart cleanly; word wrapping keeps words intact at 375 / 768 / 1440 wide; screen readers get the plain text while pieces are aria-hidden.
