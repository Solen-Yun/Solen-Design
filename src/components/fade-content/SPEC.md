Implement the "FadeContent" component from zero: a wrapper that fades its content in when it scrolls into view — plain opacity, out of focus, from washed-out grayscale to colour, or dissolved through animated noise masks (grain dissolve, drifting mist, or mosaic pixel blocks) — with stagger across direct children, optional exit and disappearance, and a scrub mode that ties the reveal directly to scroll position. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React 18+ with the GSAP tween library (core plus its ScrollTrigger plugin) driving the animation. One file only: FadeContent.jsx. No stylesheet, no iframe.
- Root is a plain `<div>` carrying className, the caller's inline style and extra DOM props. It renders with inline `visibility: hidden`; the effect immediately sets visibility visible once the animation is wired.
- Wiring runs in an isomorphic layout effect inside a tween-engine context scoped to the root; every re-run reverts the previous context, so changing any prop rebuilds cleanly. Callback props are read through a ref refreshed each render. Scroller resolution: the container prop (element or selector string) wins, then an element with id "snap-main-container", then the page scroller.
- Targets: stagger > 0 with element children animates each direct child; otherwise the wrapper itself.
- prefers-reduced-motion: reduce — no timeline; the content becomes visible immediately and onComplete fires.

## Looks (non-noise effects)

- duration accepts seconds or milliseconds (values above 10 are treated as ms) and is floored at 0.01s. initialOpacity clamps 0–1. Each look is a from-to pair with a share of the total duration: fade animates autoAlpha initialOpacity → 1 over the full duration (with blur > 0 also animating filter blur(Npx) → blur(0), N = blur px or 10 when blur is true); focus adds a second tween animating filter blur((12 + blur)px) → 0 with scale 0.97 → 1 over the full duration while opacity runs on 0.6 × duration; develop animates filter grayscale(1) contrast(0.55) brightness(1.3) → none over the full duration with opacity on 0.5 × duration — the image develops from a washed-out print to full colour.
- Stagger: with child targets the tweens gain stagger { each: toSeconds(stagger), from: staggerFrom }.

## Noise masks (dissolve / mist / pixel)

- Each target gets its own hidden SVG filter appended to the body (id namespaced, incrementing). The filter runs feTurbulence fractalNoise whose frequency, octaves, edge softness and extra blur scale with the target size (sqrt of the area): dissolve uses frequency 0.6, 1 octave, edge 0.15; mist uses frequency 4/size clamped 0.004–0.02, 3 octaves, edge 0.35 and 10px blur for drifting fog; pixel quantizes the noise into square blocks — block size = size/32 clamped 6–24 rounded to even px — by sampling one cell per block (feFlood dot, feComposite + feTile grid, feMorphology dilate) for a hard mosaic.
- The mask alpha is shaped by an feComponentTransfer table of 33 precomputed sigmoid levels, rewritten every frame from the tweened progress: front = progress × (1 + 2 × edge) − edge, each level mapping to floor + (1 − floor) × (1 − smoothstep(front − edge, front + edge, level)). initialOpacity acts as the floor, so a non-zero value starts the content washed out but visible instead of hidden.
- The filter applies as url(#id) plus a blur that decays with progress when blur is set; at progress ≥ 1 the inline filter clears (crisp resting content) and the SVG is removed; at progress ≤ 0 with floor 0 the content hides. The tween drives a proxy object 0 → 1 with an onUpdate redraw, so the same machinery also plays backwards for exit and scrub.

## Triggers, scrub, exit, disappearance

- trigger "mount" plays the timeline once immediately (scrub ignored).
- trigger "scroll" creates a ScrollTrigger on the wrapper: the start is measured from the scroller (top − height × (1 − threshold), clamped before the scroll limit so short pages still trigger); onEnter plays. once controls replaying: with once on (and no exit) the trigger fires a single time and completed content settles (inline filters cleared, masks removed); with once off, scrolling back above the start reverses the timeline. exit extends the trigger to end "bottom threshold × 100%" and reverses on leave, plays again on enter-back — content fades out as it leaves the viewport.
- scrub (when not mount) binds the reveal to scroll position directly: the zone is height × clamp((1 − 2 × threshold) × 0.4, 0.05, 0.4) and progress maps from the scrolled offset, rounded to three decimals; exit shortens the visible range with an out-zone near the bottom; scrub true binds instantly, a number smooths the timeline progress toward the target with that duration (overwriting in-flight smoothing).
- disappearAfter > 0 (once mode, no scrub, no exit) schedules a concealment after the reveal: noise progress tweens back to 0 (or looks return to their from values) after disappearAfter seconds over disappearDuration with disappearEase, firing onDisappearanceComplete.
- Unmount: kill the smoothing tween, revert the context (timeline and ScrollTriggers) and remove every noise SVG from the body. Instances on one page are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | The content revealed. |
| container | string \| HTMLElement | - | Scroll container for the trigger; selector string or element. Falls back to the page scroller. |
| effect | "fade" \| "focus" \| "develop" \| "dissolve" \| "mist" \| "pixel" | "fade" | Reveal style: plain, out of focus, from grayscale, or through the three noise masks. |
| blur | boolean \| number | false | Extra blur during the reveal; true means 10px, a number is px. |
| duration | number | 1 | Reveal duration in seconds (values above 10 read as ms). |
| ease | string | "power2.out" | Ease name for the reveal. |
| delay | number | 0 | Delay before the reveal, in seconds. |
| threshold | number | 0.1 | 0–1 fraction of the viewport that shifts the trigger line and scrub zone. |
| initialOpacity | number | 0 | Starting opacity; also the noise-mask floor. |
| stagger | number | 0 | Delay between direct children, in seconds; 0 animates the wrapper as one. |
| staggerFrom | string \| number | "start" | Which end the stagger starts from (index, "start", "end", "center"...). |
| trigger | "scroll" \| "mount" | "scroll" | Play on scroll into view or immediately on mount. |
| once | boolean | true | Scroll plays only the first time; off, it reverses when scrolled back above. |
| exit | boolean | false | Fades out when the content leaves the viewport and replays on re-entry. |
| scrub | boolean \| number | false | Bind the reveal to scroll; a number smooths the binding. |
| disappearAfter | number | 0 | Seconds after the reveal before auto-hiding; 0 disables. |
| disappearDuration | number | 0.5 | Disappearance duration in seconds. |
| disappearEase | string | "power2.in" | Ease name for the disappearance. |
| onStart | () => void | - | Called when the reveal starts. |
| onComplete | () => void | - | Called when the reveal completes. |
| onDisappearanceComplete | () => void | - | Called when the disappearance completes. |
| className | string | "" | Extra class names for the wrapper. |
| style | CSSProperties | - | Inline styles for the wrapper. |

## Delivery & validation

- Deliver the complete content of FadeContent.jsx plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. Dependency: gsap at ^3.13.0 (core and ScrollTrigger plugin).
- Validate: fade/focus/develop each animate opacity plus their extra layer and rest with no inline filter; dissolve/mist/pixel reveal through their noise masks (grain, soft fog, hard mosaic blocks) and clean the SVG nodes afterwards; initialOpacity above 0 starts visible-but-washed and floors the masks; blur decays with progress; stagger runs children from each staggerFrom; scroll plays at the threshold line, reverses with once off, exits and re-enters with exit; scrub tracks scroll both directions with and without smoothing; disappearAfter auto-hides after the delay and fires its callback; container accepts a selector and an element as scroller; changing props rebuilds without residue; reduced motion shows content instantly and fires onComplete; unmount leaves no timeline, trigger or SVG filters; 375 / 768 / 1440 wide without overflow.
