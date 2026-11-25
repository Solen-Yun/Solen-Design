Implement the "RotatingText" component from zero: an inline text rotator that cycles through a list of phrases, splitting each phrase into per-character motion units that enter and leave with 3D flip, slide, blur, scale or drop transitions, with per-character stagger, an optional highlight marker whose width springs between phrase lengths, and an imperative API for driving the rotation from outside. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + the motion animation library, two files only: RotatingText.jsx (entry, rotation state, stagger model, presets) and RotatingText.css (all styles). React >= 18. No iframe.
- The component is a forwardRef component with displayName "RotatingText". The imperative ref exposes `{ next, previous, jumpTo, reset }`.
- Root is a `MotionConfig reducedMotion="user"` wrapping a `motion.span` (class text-rotate, plus text-rotate-highlight when highlight is on, plus mainClassName) that receives the remaining DOM props, style, and merged mouse handlers. It runs layout animations (unless highlight) with the transition prop or a spring `{ type: "spring", damping: 25, stiffness: 300 }`, so the box grows and shrinks with the current phrase.
- Children of the root: a visually hidden span (class text-rotate-sr-only) carrying the current phrase for screen readers, and the animated presence tree. With highlight on, the presence tree sits inside a measuring span (class text-rotate-highlight-content, flex, no shrink, white-space pre) used for width tracking.
- The presence tree is an `AnimatePresence` (mode from animatePresenceMode, default "wait"; initial from animatePresenceInitial, default false) holding one `motion.span` keyed by the active index — class text-rotate, or text-rotate-lines when splitBy is "lines" (a full-width column). Inside it, each word is a span (class text-rotate-word plus splitLevelClassName, inline-flex) whose characters are `motion.span`s (class text-rotate-element plus elementLevelClassName, inline-block) carrying the enter/rest/leave states and a per-character delay; words are separated by a white-space:pre span (class text-rotate-space). The whole presence span is aria-hidden.
- Splitting: "characters" splits words on spaces and then each word into graphemes (Intl.Segmenter grapheme granularity when available, otherwise code points); "words" keeps whole words as single units; "lines" splits on "\n" into a column; any other splitBy string is used as a literal delimiter. Out-of-range indices clamp to the last text; a missing text renders empty.
- Text changes remount the presence span; characters animate in and out. Everything else persists — the rotator never remounts its root.

## Transition presets

- Five presets, chosen by the effect prop and handed the direction ("down" flips the vertical sense): slide — characters translate y ±100% in and ∓120% out with opacity, spring damping 25 / stiffness 300; flip — rotateX from ∓90° to 0 with transformPerspective 480, entering over a 0.6 s tween with ease [0.34, 1.4, 0.64, 1] and leaving over a 0.32 s tween with ease [0.5, 0, 0.75, 0], each character styled with transformOrigin "50% 50% -0.45em" and hidden backface so the flip reads as a 3D card; blur — translate y ±45% with opacity over a 0.55 s tween, ease [0.22, 1, 0.36, 1]; scale — scale from 0.35 (up) or 1.7 (down) with a spring damping 17 / stiffness 240; drop — falls from y −110% with a spring damping 18 / stiffness 320 / mass 0.9 and exits downward over a 0.3 s tween, ease [0.55, 0, 1, 0.45].
- An unknown effect falls back to slide. The transition prop replaces the per-character transition; the initial, animate and exit props replace the corresponding states outright. Preset exit transitions (flip, drop) only apply when neither transition nor exit is provided.
- The blur prop (or 10 px when effect is "blur" and blur is 0) wraps every state with `filter: blur(Npx)` — entering from blurred, resting crisp, leaving back to blurred. Blur presets already handle their own offsets.

## Stagger & rotation

- Each character's delay is its stagger index × staggerDuration. The index comes from staggerFrom: "first" counts from the first character, "last" from the last, "center" from the middle outward (absolute distance from floor(total/2)), "random" uses an order reshuffled for every incoming phrase, and a number measures absolute distance from that character index.
- Auto rotation: when auto is on and not paused, a timeout advances to the next phrase every rotationInterval ms; the timer resets whenever the index, interval or pause state changes. paused = pauseOnHover && hovered, where hovered tracks pointerenter/leave on the root (only tracked when pauseOnHover is on; the original onMouseEnter/onMouseLeave props still fire).
- next advances by one, wrapping to 0 when loop is on and sticking at the last phrase when off; previous mirrors it backwards; jumpTo clamps into range; reset returns to 0. Every transition calls onNext with the new index. Re-selecting the current index is a no-op.

## Highlight marker

- With highlight on, the root becomes a marker: box-sizing content-box, flex-wrap nowrap, centered content, overflow hidden, padding 0.1em 0.28em, border-radius 0.16em, background highlightColor, and an automatically contrasted text colour — the highlight colour parses as 3/4/6/8-digit hex or rgb()/rgba(); relative luminance above 0.3 picks #0b0b0c, otherwise #ffffff; unparsable colours keep the inherited colour.
- The root width is a motion value tracked to the content span's offsetWidth + 1: the first measurement snaps, later changes spring to the new width with `{ type: "spring", damping: 34, stiffness: 320 }`. A ResizeObserver on the content span re-fits on any size change (font load, prop change); reduced motion snaps instead of springing; the observer disconnects and running animations stop on cleanup. Layout animations on the root and presence span are disabled in this mode.

## Accessibility & behaviour

- The animated characters are aria-hidden; the sr-only span always carries the exact current phrase, so assistive tech reads one stable string per change.
- Reduced motion: `MotionConfig reducedMotion="user"` defers to the user's OS preference for transforms and layout, and the highlight width snaps without springs.
- Unmount: the auto-rotation timer clears, the width observer disconnects and width animations stop. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| texts | string[] | - | The phrases to cycle through. |
| transition | object | - | Replaces the per-character transition of the chosen preset. |
| initial | object | - | Replaces the per-character enter state. |
| animate | object | - | Replaces the per-character rest state. |
| exit | object | - | Replaces the per-character leave state. |
| effect | "slide" \| "flip" \| "blur" \| "scale" \| "drop" | "slide" | Which enter/leave preset the characters use. |
| direction | "up" \| "down" | "up" | Which way the characters travel. |
| highlight | boolean | false | Draws a marker block behind the text instead of inline rotating text. |
| highlightColor | string | "#a855f7" | Background of the marker; the ink auto-contrasts. |
| animatePresenceMode | "sync" \| "wait" \| "popLayout" | "wait" | How AnimatePresence overlaps leaving and entering phrases. |
| animatePresenceInitial | boolean | false | Whether the first phrase animates in on mount. |
| rotationInterval | number | 2000 | Milliseconds each phrase holds before advancing. |
| staggerDuration | number | 0 | Delay between neighbouring characters in seconds. |
| staggerFrom | "first" \| "last" \| "center" \| "random" \| number | "first" | Which end the stagger ripples from; a number anchors at that character index. |
| loop | boolean | true | Wraps from the last phrase back to the first. |
| auto | boolean | true | Advances on its own every rotationInterval. |
| pauseOnHover | boolean | false | Holds the rotation while the pointer is over the text. |
| blur | number | 0 | Extra blur in px wrapped around every character state. |
| splitBy | "characters" \| "words" \| "lines" \| string | "characters" | How a phrase splits into motion units; any other string is a literal delimiter. |
| onNext | (index: number) => void | - | Called with the new index on every transition. |
| onMouseEnter | (event) => void | - | Extra mouseenter handler on the root. |
| onMouseLeave | (event) => void | - | Extra mouseleave handler on the root. |
| mainClassName | string | - | Extra class for the root. |
| splitLevelClassName | string | - | Extra class for each word span. |
| elementLevelClassName | string | - | Extra class for each character span. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of RotatingText.jsx and RotatingText.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: all five presets enter and leave correctly in both directions; per-character stagger ripples first / last / center / random / anchor-index; the highlight marker's width springs between phrases of different lengths and its ink auto-contrasts; auto rotation honours rotationInterval, loop and pauseOnHover; next / previous / jumpTo / reset work through the ref and jumpTo clamps; onNext fires once per change; splitBy characters / words / lines / custom delimiter all segment correctly (graphemes, not code units, for emoji); initial / animate / exit / transition overrides apply; blur adds to any preset; the sr-only text always matches the visible phrase; prefers-reduced-motion settles without springs; rapid phrase changes under mode "wait" never stack; unmount leaves no timers or observers; same-page instances are independent; no horizontal overflow at 375 / 768 / 1440 wide.
