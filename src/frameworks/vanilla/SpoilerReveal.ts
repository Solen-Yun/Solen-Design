import { mountSpoilerReveal, type SpoilerRevealOptions } from "../../components/spoiler-reveal/SpoilerRevealEngine.js";
import type { MotionController } from "../../components/spoiler-reveal/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SpoilerRevealOptions = {}): ReturnType<typeof mountSpoilerReveal> {
  return mountSpoilerReveal(target, options);
}
export type { SpoilerRevealOptions };
