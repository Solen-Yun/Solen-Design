import { mountMatchaPowderReveal, type MatchaPowderRevealOptions } from "../../components/matcha-powder-reveal/MatchaPowderRevealEngine.js";
import type { MotionController } from "../../components/matcha-powder-reveal/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: MatchaPowderRevealOptions = {}): ReturnType<typeof mountMatchaPowderReveal> {
  return mountMatchaPowderReveal(target, options);
}
export type { MatchaPowderRevealOptions };
