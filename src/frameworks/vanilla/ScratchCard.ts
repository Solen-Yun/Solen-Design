import { mountScratchCard, type ScratchCardOptions } from "../../components/scratch-card/ScratchCardEngine.js";
import type { MotionController } from "../../components/scratch-card/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ScratchCardOptions = {}): ReturnType<typeof mountScratchCard> {
  return mountScratchCard(target, options);
}
export type { ScratchCardOptions };
