import { mountRevealFooter, type RevealFooterOptions } from "../../components/reveal-footer/RevealFooterEngine.js";
import type { MotionController } from "../../components/reveal-footer/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: RevealFooterOptions = {}): ReturnType<typeof mountRevealFooter> {
  return mountRevealFooter(target, options);
}
export type { RevealFooterOptions };
