Implement the "FuseButton" component from zero: an action button whose "done" state carries an undo offer on a burning fuse — pressing it crossfades to an undo face while a fuse burns along the button's rim (or as a line across it) for the undo window; clicking the undo face (or pressing Escape) reverts to idle before the fuse finishes, otherwise the fuse burns out and the button settles into a permanent done state. Hovering a mouse over the armed button pauses the fuse; hiding the tab pauses it too. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + an icon set package, two files only: FuseButton.jsx (entry, phase machine, fuse animation) and FuseButton.css (all styles). React >= 18; the icon package supplies a default archive box action icon, an undo arrow and a checkmark tick (stroke icons ~1.8–2.2 stroke width); the action icon can be replaced by any node through the icon prop.
- Root is a `<span>` with class `fuse-button`, tabIndex −1: display inline-grid, single overlapping column (grid-template-columns minmax(0, 1fr), all faces grid-area 1/1), height from the size preset, radius, background = background, colour = color, font-size/letter-spacing inherited from a weight-500 preset, overflow hidden, isolation isolate, user-select none, touch-action manipulation, transition transform 160ms ease-out (pressing the whole span scales to a preset 0.97 via data-pressed). Inline CSS variables: --fb-ink, --fb-bg, --fb-fuse, --fb-fuse-h (fuseThickness), --fb-radius, --fb-fade (crossfadeMs), --fb-h/--fb-fs/--fb-icon/--fb-px from the size preset (sm: 36/13/14/16, md: 44/14/15/20, lg: 52/15/17/24 px).
- Three stacked faces share one grid cell, each a full-size inline-flex centred button/span with an 8px gap between icon and label. Every face is hidden by default (opacity 0, blur(2px), visibility hidden with a delayed visibility transition); the active phase's face (idle / undo / settled) fades in over crossfadeMs with blur clearing. When the last interaction was the keyboard, data-instant zeroes all transition durations so phases switch without animation.
- The idle face is the action `<button>` (icon + label, disabled prop passes through, inert while not idle). The undo face is the undo `<button>` (rotated undo arrow icon + undoLabel, described-by the status region, aria-keyshortcuts "Escape", inert while not armed); it also hosts the fuse line element when fuse mode is a line. The settled face is a non-interactive span (checkmark tick + doneLabel). While disabled, the root drops to opacity 0.55.
- The fuse: in "outline" mode an absolutely-positioned SVG covers the root with a rounded `<rect>` (pathLength 1, dasharray 1, inset by half the fuse thickness, rx = radius − half thickness, stroke fuse colour at fuseThickness, round caps, drop-shadow glow); it fades in with the armed phase and its stroke-dashoffset animates 0 → −1 (one full lap around the rim) linearly over the undo window. In "top"/"bottom" line modes a 1.5px-high bar (fuse colour, glow shadow, origin left) burns via scaleX 1 → 0 along the bottom (default) or top of the undo face. Focus-visible draws a 2px offset outline on the root (with a :has-free fallback inset outline on the faces).

## Phase machine

- Phases: idle → armed → (idle | settled). The idle face's click arms the fuse: reset the window to undoWindow, start the fuse animation (Web Animations API, linear, fill forwards), call onCommit("press") when commitOn is "press", and enter armed. The animation's onfinish fires onFuseEnd, calls onCommit("fuseEnd") when commitOn is "fuseEnd", and moves to settled (settle "stay") or back to idle (settle "reset"). The undo face's click — or Escape while armed — pauses and detaches the animation, calls onUndo and returns to idle.
- Re-arming after a settled state is impossible until the fuse ends and the button returned to idle. Changing the `fuse` variant while armed relights the fuse from the current elapsed time (currentTime preserved). Undo timing uses the animation's live currentTime, so pause-on-hover does not shorten the window.
- Hover pause (mouse pointer type only): the fuse pauses while the pointer is over the root when pauseOnHover is on; the first pointer-leave after arming enables the pause behaviour. Tab visibilitychange pauses/resumes the animation when the document is hidden/shown. Every phase change calls onPhaseChange(phase); an internal latest-ref keeps callbacks fresh without re-binding.
- Keyboard input (Enter/Space on the faces) marks the next phase switch as instant; Escape while armed undoes. Focus follows the phases: arming focuses the undo button, returning to idle refocuses the idle button (only when focus was inside the root), so keyboard users ride the crossfade.

## Accessibility

- The root carries aria-disabled while settled. The undo button describes itself with a polite status region that announces the doneLabel from arming until back to idle (empty in idle). Faces are inert when not active, so tabbing only ever lands on the live face; the root draws the focus-visible outline.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | "Archive" | Text of the idle action face. |
| undoLabel | string | "Undo" | Text of the armed undo face. |
| doneLabel | string | "Archived" | Text of the settled face and of the status announcement. |
| icon | ReactNode | - | Icon on the idle face; defaults to a built-in archive icon. |
| color | string | "#f5f5f5" | Ink colour of labels and focus outline. |
| background | string | "#27272a" | Button background. |
| fuseColor | string | "#f5a524" | Fuse colour (line/rim) and its glow. |
| size | "sm" \| "md" \| "lg" | "md" | Size preset (height / font / icon / padding). |
| radius | number | 22 | Corner radius in px; also shapes the outline fuse. |
| undoWindow | number | 4000 | Fuse burn time, in ms. |
| fuse | "outline" \| "top" \| "bottom" | "outline" | Fuse style: a rim lap around the button, or a line on the top/bottom edge. |
| fuseThickness | number | 1.5 | Fuse stroke height in px. |
| crossfadeMs | number | 200 | Crossfade duration between faces, in ms. |
| commitOn | "press" \| "fuseEnd" | "press" | When onCommit fires: at arm time or when the fuse burns out. |
| pauseOnHover | boolean | true | Pauses the fuse while a mouse hovers the armed button. |
| settle | "reset" \| "stay" | "reset" | After the fuse ends: return to idle or stay settled. |
| disabled | boolean | false | Disables the idle action button. |
| onCommit | (reason: "press" \| "fuseEnd") => void | - | The action commit hook, governed by commitOn. |
| onUndo | () => void | - | Fires when the fuse is undone. |
| onFuseEnd | () => void | - | Fires when the fuse burns out. |
| onPhaseChange | (phase: "idle" \| "armed" \| "settled") => void | - | Fires on every phase change. |
| className | string | "" | Extra class names for the root. |
| type | "button" \| "submit" \| "reset" | "button" | Type of the idle action button. |

## Delivery & validation

- Deliver the complete content of FuseButton.jsx and FuseButton.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: press → undo face crossfades in and the fuse burns for undoWindow; undo click and Escape both return to idle and fire onUndo before burnout; letting the fuse finish fires onFuseEnd (and onCommit("fuseEnd") when configured) then settles or resets per settle; commitOn "press" fires at arm time; hover and hidden-tab pause the fuse without shrinking the window; relighting after a fuse-variant swap keeps elapsed time; keyboard arm/undo switches instantly and focus follows the faces; sizes sm/md/lg, colours, thickness, crossfade and radius all take effect; disabled blocks arming; reduced motion removes blur and the undo-icon spin; forced-colors/high-contrast styles stay legible; unmount cancels the running animation and listeners; 375 / 768 / 1440 wide without overflow.
