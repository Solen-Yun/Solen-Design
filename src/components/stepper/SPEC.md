Implement the "Stepper" component from zero: a multi-step flow with a frosted frame, a tile-like indicator track whose highlight glides between steps on a spring, direction-aware slide/fade content transitions with animated height, and a footer with Back/Continue/Complete buttons that collapses away when the flow finishes. Horizontal by default with a vertical rail variant; number, dot and bar indicator styles; linear (forward-only navigation) or free mode. Pure React + CSS, two files: Stepper.jsx (entry, transitions, glider placement) and Stepper.css (all styles). React plus one small icon package for the arrows and ticks.

## Structure & rendering

- Root is a `<div>` (class stepper, stepper--horizontal or stepper--vertical, stepper--framed when frame is on) with width min(100%, width prop — number becomes px), border-radius var (default 24px). Extra props spread onto it. Framed mode adds 8px padding, a translucent theme panel with backdrop blur(20px) saturate(1.6), a deep shadow and an aria-hidden rim span (1px inset edge + 1px top highlight). Two theme palettes (~18 CSS variables) inject frame/tile/well/track colours, ink tiers, solid button colour, and hover/press filters; accentColor overrides the solid colour and picks dark (#18181b) or white ink by sRGB luminance (> 0.4 → dark).
- Children: each `<Step>` (exported wrapper rendering .stepper__step) is one step; steps may carry props title, description (rail only) and icon. current clamps to 1..total+1; values above total mean the flow is completed (data-completed, completedContent renders instead of a step).
- Header variants: numbers (default) renders a track div — a rounded well (radius from --stepper-radius) holding an absolutely positioned glider span plus one 40px segment button per step (aria-label "Step n[: title]", aria-current="step" on the active one). Each segment holds a 22px round badge — the step number, the step's icon if given, or an animated checkmark when complete (SVG stroke-dashoffset draw over 360ms) — and, when titles exist and space allows, a 13px/600 title (ellipsised; muted until visited) and an optional 12px description. dots renders small round marks (active scales 1.3 on the spring); bars renders 4px progress tracks with a spring-eased fill. All indicator controls are disabled when unreachable.
- Vertical orientation switches the header to a left rail (212px wide, max 42%): the track becomes a column, segments align left with badge + title + description. When the root is narrower than 520px, vertical folds back to the horizontal header (compact). In horizontal mode a measurement pass adds up badge widths and title widths and, when they overflow the track, collapses titles (tight) until the container grows.
- Body: a viewport (overflow hidden, aria-live "polite") with the active pane (tabIndex −1) plus, during a transition, an absolutely positioned leaving pane (aria-hidden). A footer (unless showFooter is off) holds a back button (tile background, hidden at step 1) and a right-aligned primary button — Continue or Complete on the last step — both 38px tall with icons, press scale 0.96, and hover filters.

## Motion engine

- Content transitions: every step change renders the new pane and keeps the old one in the DOM for the exit. The viewport animates its height from the previous to the new pane height over 560ms with a spring — a CSS `linear()` easing curve baked into a CSS variable, falling back to cubic-bezier(0.34, 1.4, 0.64, 1) when linear() is unsupported. In slide mode the entering pane starts translated 36px along the travel axis (horizontal → X, vertical → Y) and the leaving pane slides out −36px opposite while fading in 140ms (exit finishes at 200ms and unmounts it); in fade mode both shifts are 0 and only opacity crossfades (entering fades in over 420ms with a 25% delay). transition "none" and reduced motion drop straight to an instant or short fade (200ms). Any running animations are cancelled before the next one starts, and keyboard focus inside the leaving pane is moved into the new pane.
- Glider: a background tile that springs (transform/width/height 560ms with the same spring) from one segment's offset box to the next on every step change; placed instantly on mount, resize, or under reduced motion, and faded out once completed. A ResizeObserver on the track re-places it without animation when the layout shifts.
- Footer collapse: on completion the footer's grid row animates 1fr → 0fr over 480ms (spring) with opacity fade; the completed content then fills the frame.
- Linear mode: a `reached` watermark tracks the highest visited step; clicking indicators can only jump to steps at or before it (forward too), so navigation stays ordered while still allowing backtracking. disableStepIndicators removes all indicator clicking. In free mode every step is reachable.
- State: controlled when the step prop is a number (with onStepChange/onFinalStepCompleted reporting intent); otherwise an internal step seeded by initialStep (default 1). go() clamps to 1..total+1, fires onFinalStepCompleted when passing total, onStepChange otherwise. backButtonProps/nextButtonProps merge (className and onClick preserved; a preventDefault onClick cancels the built-in navigation).
- Reduced motion: transitions become short fades, the check draw and dot/bar/footer springs collapse to 0.01ms, and the glider places instantly.
- Unmount: disconnects all ResizeObservers (root measure, viewport height, track).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | One `<Step>` per step; title/description/icon props decorate the indicators. |
| step | number | - | Controlled current step (1..total; > total means completed). |
| initialStep | number | 1 | Starting step in uncontrolled mode. |
| onStepChange | (step: number) => void | () => {} | Called on every step change below the final. |
| onFinalStepCompleted | () => void | () => {} | Called when moving past the last step. |
| indicator | "numbers" \| "dots" \| "bars" | "numbers" | Header style (vertical always uses numbers). |
| orientation | "horizontal" \| "vertical" | "horizontal" | Layout; vertical uses a left rail. |
| transition | "slide" \| "fade" \| "none" | "slide" | Content transition between steps. |
| linear | boolean | false | Restrict jumps to steps already reached. |
| disableStepIndicators | boolean | false | Removes indicator clicking entirely. |
| renderStepIndicator | ({ step, currentStep, onStepClick }) => ReactNode | - | Custom indicator body per segment. |
| showFooter | boolean | true | Shows the Back/Continue footer. |
| backButtonText | string | "Back" | Back button label. |
| nextButtonText | string | "Continue" | Next button label. |
| completeButtonText | string | "Complete" | Next button label on the last step. |
| backButtonProps | object | {} | Props merged onto the back button. |
| nextButtonProps | object | {} | Props merged onto the next button. |
| completedContent | ReactNode | - | Replaces the step content once completed. |
| theme | "dark" \| "light" | "dark" | Frame, tile and ink palette. |
| accentColor | string | - | Solid button / badge colour; ink picked by contrast. |
| frame | boolean | true | Frosted frame with rim. |
| radius | number | 24 | Corner radius in px. |
| width | number \| string | 440 | Preferred width; number becomes px. |
| className | string | "" | Extra class names for the root. |
| stepCircleContainerClassName | string | "" | Extra class for the header wrapper. |
| stepContainerClassName | string | "" | Extra class for the header wrapper. |
| contentClassName | string | "" | Extra class for the content viewport. |
| footerClassName | string | "" | Extra class for the footer. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of Stepper.jsx and Stepper.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: clicking indicators glides the tile highlight and transitions content in the chosen direction with height animation; Back/Continue navigate, the last step's button completes, the footer collapses and completedContent shows; badges turn into drawn checkmarks; linear mode blocks jumping ahead but allows backtracking, free mode allows everything; disableStepIndicators blocks all jumps; dots/bars variants animate their fills; vertical rail shows descriptions and folds below 520px; tight titles collapse and restore on resize; controlled step + onStepChange/onFinalStepCompleted work; button prop merges respect preventDefault; completed/final callbacks fire once per transition; accent colour contrast ink; light/dark, frame on/off, radius/width props; reduced motion strips springs; unmount leaves no observers; 375 / 768 / 1440 wide without overflow.
