import { mountGrowthBubbles, type GrowthBubblesOptions } from "../../components/growth-bubbles/GrowthBubblesEngine.js";
import type { MotionController } from "../../components/growth-bubbles/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: GrowthBubblesOptions = {}): ReturnType<typeof mountGrowthBubbles> {
  return mountGrowthBubbles(target, options);
}
export type { GrowthBubblesOptions };
