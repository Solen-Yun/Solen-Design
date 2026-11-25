import { mountCompareTray, type CompareTrayOptions } from "../../components/compare-tray/CompareTrayEngine.js";
import type { MotionController } from "../../components/compare-tray/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: CompareTrayOptions = {}): ReturnType<typeof mountCompareTray> {
  return mountCompareTray(target, options);
}
export type { CompareTrayOptions };
