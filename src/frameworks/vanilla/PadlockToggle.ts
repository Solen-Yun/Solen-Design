import { mountPadlockToggle, type PadlockToggleOptions } from "../../components/padlock-toggle/PadlockToggleEngine.js";
import type { MotionController } from "../../components/padlock-toggle/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PadlockToggleOptions = {}): ReturnType<typeof mountPadlockToggle> {
  return mountPadlockToggle(target, options);
}
export type { PadlockToggleOptions };
