Implement the "VoicePill" component from zero: a round mic button that swells leftward into a capsule while recording — a timer and a scrolling equalizer waveform grow out of its left side, the mic glyph blurs into a stop square, and sliding the pointer leftward drags the whole capsule toward a "Cancel" affordance that ends the session. A simulated syllable envelope drives the bars when no microphone is available. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React + CSS, two files only: VoicePill.jsx (entry, envelope, waveform canvas, pointer/keyboard input) and VoicePill.css (all styles). Uses one icon package for two glyphs (mic and a left arrow; the exact glyph artwork ships embedded in code and takes precedence over this description). No iframe. Web Audio and getUserMedia are used only when reactive = "mic".
- Root is a real `<button type="button">` sized `--vp-size` (default 28px) with radius per shape: "pill" → size/2 (a circle), "rounded" → round(size × 0.29). Attributes: `data-state` idle/listening, `data-pressed`, `data-input` pointer/key (key input gets 0ms transitions for instant feedback), `data-time`/waveform presence markers, `aria-label` (default "Dictate"), `aria-pressed` = listening. An inset `::before` of up to 10px expands the hit target toward 44px. Disabled: 0.55 opacity, no pointer events.
- Layers, all absolutely positioned relative to the button: a capsule background span (background var, radius inherited) that is clipped by `clip-path: inset(0 0 0 calc(reach + extra) round radius)` when idle and unclipped while listening — this is the swell: it grows leftward by reach (default 8px) + extra width over openDuration (default 200ms) ease-out; a fine-pointer idle hover tints it 10% toward the icon colour. To its left (right: 100%): the timer span (tabular-nums, accent colour), the waveform canvas (width = size × 1.9, height 64% of the button), and the cancel affordance (left arrow + "Cancel" text, opacity = cancel progress). The glyph stack overlays the button centre: mic icon blurs out (opacity 0, blur 2px, scale 0.7) while the stop square (0.32 × size, 22% radius) blurs in. While sliding, transform transitions drop so the drag is 1:1.
- All content left of the mic carries `transform: translateX(var(--vp-slide))` — the slide-to-cancel drag moves the timer, waveform, glyph and the capsule reveal together. The timer/waveform opacity is 1 − cancel progress so they fade as Cancel fades in.
- Theming via inline CSS variables: `--vp-accent` (default #f5f5f5 — listening icon colour, timer, cancel), `--vp-icon` (default #a1a1aa — idle glyph), `--vp-bg` (default #27272a — capsule), sizes derived from the size prop (icon 54%, stop 32%, timer font 36%, min 10px), `--vp-open`, `--vp-press` (press scale, default 0.95), computed widths for clock/wave, and a `--vp-hit` inset.

## Level pipeline

- Simulated source (default): a loopable 4.8s envelope of 13 syllable pulses — each pulse is a raised-cosine bump (peak 0.5–1.0, width 100–240ms) at fixed offsets, multiplied by a 7.1Hz tremolo (0.7 + 0.3·|sin|), floor 0.06. It reads as natural speech bursts.
- Mic source: getUserMedia audio through an AudioContext → AnalyserNode (fftSize 256, smoothing 0); the level averages three frequency bins ([1,4), [4,11), [11,33)) normalized to byte range, times a 2.2 gain. Permission denial ends the session with reason "mic-denied"; a held-off stream (listening already stopped) is stopped immediately. The AudioContext persists across sessions and is closed on unmount.
- Envelope: the target level (× sensitivity, clamped to 1) chases the displayed level with a first-order attack/release lag — time constants attack (default 40ms, rising) and release (240ms, falling), integrated per frame with dt clamped to 50ms.

## Waveform canvas

- The canvas keeps a history of up to 80 amplitude samples; every 4th frame the running max since the last push is appended. Bars are 2px wide (device-pixel scaled, DPR clamped to 2) on a 3px pitch, right-aligned and scrolled left by the sub-frame phase for smooth motion. Each bar's height is floor + (1 − floor) × value (floor default 0.1) of the canvas height, alpha 0.35 + 0.65 × value, with a smoothstep horizontal fade-in from the right edge so bars emerge under the mic. Redraws only while listening; the canvas resizes with DPR on demand.

## Interaction

- Pointer down (primary, isPrimary, not already held): capture, remember the down X, and begin listening immediately (pressing shows the press scale). The press origin matters for hold logic: `ownPress` marks presses that started the session.
- Hold semantics (`mode`, default "auto"): while holding, release always ends the session if held ≥ holdAfter (300ms) or mode is "hold"; a quick tap in "auto" keeps listening — the next release (a press that did not start the session) ends it. In "tap" style every release ends immediately. onStop reports the reason ("release", "tap", "cancel", "key", "escape", "blur", "disabled", "unmount", "mic-denied") and duration in ms; onStart reports the source.
- Slide to cancel (default on): moving leftward past 4px enters the slide; pull = clamp(−dx, 0, cancelDistance + 24) drives `--vp-slide` (the capsule content shifts left) and a cancel progress pull/cancelDistance (default 64px); reaching 1 cancels on the spot. Release mid-slide (progress < 1) snaps back and resumes normal hold/tap logic.
- Keyboard: Space/Enter toggles listening with instant transitions; Escape ends it. Window blur or tab hidden ends the session (reason "blur"); setting disabled ends it ("disabled"); unmount ends it and closes the AudioContext.
- Reduced motion: CSS drops the press scale, blur transitions and slide transforms — state changes keep opacity fades only; the waveform still draws (it is live feedback, not decoration).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| accentColor | string | "#f5f5f5" | Accent colour: listening icon, timer, waveform bars, cancel. |
| iconColor | string | "#a1a1aa" | Idle mic icon colour. |
| background | string | "#27272a" | Capsule background colour. |
| size | number | 28 | Mic button diameter in px; icon, stop square and timer derive from it. |
| shape | "pill" \| "rounded" | "pill" | Capsule corner style: full round or rounded rectangle. |
| reach | number | 8 | How far the capsule extends leftward beyond the mic when listening, in px. |
| showTime | boolean | true | Shows the m:ss timer. |
| waveform | boolean | true | Shows the scrolling equalizer canvas. |
| slideToCancel | boolean | true | Sliding leftward drags the capsule toward Cancel. |
| cancelDistance | number | 64 | Slide distance (px) that completes a cancel. |
| attack | number | 40 | Envelope attack time constant, in ms. |
| release | number | 240 | Envelope release time constant, in ms. |
| sensitivity | number | 1 | Multiplier on the raw level before the envelope. |
| floor | number | 0.1 | Minimum bar height fraction of the waveform, 0–1. |
| openDuration | number | 200 | Capsule swell duration, in ms. |
| pressScale | number | 0.95 | Scale while pressed. |
| mode | "auto" \| "hold" \| "tap" | "auto" | Hold-to-talk, auto (tap toggles, holds are push-to-talk) or tap-to-toggle. |
| holdAfter | number | 300 | Held ms after which an auto press counts as push-to-talk, in ms. |
| reactive | "simulated" \| "mic" | "simulated" | Level source: built-in speech envelope or the real microphone. |
| disabled | boolean | false | Disables the button and ends any session. |
| ariaLabel | string | "Dictate" | Accessible name. |
| onStart | (info: { source }) => void | - | Called when listening starts. |
| onStop | (info: { reason, duration }) => void | - | Called when listening ends, with the reason and ms held. |
| className | string | "" | Extra class names for the button. |

## Delivery & validation

- Deliver the complete content of VoicePill.jsx and VoicePill.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: pressing swells the capsule, blurs the mic into the stop square, starts the timer and scrolls bars driven by the speech envelope; a quick tap in auto mode keeps it listening and the next release stops it; holding past holdAfter acts push-to-talk; mode hold/tap behave per spec; sliding leftward drags the content and completes a cancel at the distance; Escape, window blur and tab hide all end sessions with the right reasons; onStart/onStop fire once per session with duration; reactive mic requests permission, denies gracefully, and still renders the simulated fallback when unsupported; showTime/waveform false shrink the capsule accordingly; shape rounded changes the radius; disabled blocks input; reduced motion keeps it usable without scale/blur transitions; rapid start/stop cycles leave no RAF loop or audio track alive; 375 / 768 / 1440 wide without overflow.
