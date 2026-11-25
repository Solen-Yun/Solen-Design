import { mountTimelineLightUp, type TimelineLightUpOptions } from "../../components/timeline-light-up/TimelineLightUpEngine.js";
import type { MotionController } from "../../components/timeline-light-up/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TimelineLightUpOptions = {}): ReturnType<typeof mountTimelineLightUp> {
  return mountTimelineLightUp(target, options);
}
export type { TimelineLightUpOptions };
