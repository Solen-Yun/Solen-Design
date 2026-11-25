import { mountTopographicContours, type TopographicContoursOptions } from "../../components/topographic-contours/TopographicContoursEngine.js";
import type { MotionController } from "../../components/topographic-contours/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TopographicContoursOptions = {}): ReturnType<typeof mountTopographicContours> {
  return mountTopographicContours(target, options);
}
export type { TopographicContoursOptions };
