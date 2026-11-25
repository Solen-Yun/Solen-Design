import { mountCardSwap, type CardSwapOptions } from "../../components/card-swap/CardSwapEngine.js";
import type { MotionController } from "../../components/card-swap/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: CardSwapOptions = {}): ReturnType<typeof mountCardSwap> {
  return mountCardSwap(target, options);
}
export type { CardSwapOptions };
