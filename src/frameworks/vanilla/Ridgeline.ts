import { mountRidgeline, type RidgelineOptions } from "../../components/ridgeline/RidgelineEngine.js";
import type { MotionController } from "../../components/ridgeline/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: RidgelineOptions = {}): ReturnType<typeof mountRidgeline> {
  return mountRidgeline(target, options);
}
export type { RidgelineOptions };
