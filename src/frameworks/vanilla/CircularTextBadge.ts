import { mountCircularTextBadge, type CircularTextBadgeOptions } from "../../components/circular-text-badge/CircularTextBadgeEngine.js";
import type { MotionController } from "../../components/circular-text-badge/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: CircularTextBadgeOptions = {}): ReturnType<typeof mountCircularTextBadge> {
  return mountCircularTextBadge(target, options);
}
export type { CircularTextBadgeOptions };
