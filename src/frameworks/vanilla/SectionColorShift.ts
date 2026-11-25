import { mountSectionColorShift, type SectionColorShiftOptions } from "../../components/section-color-shift/SectionColorShiftEngine.js";
import type { MotionController } from "../../components/section-color-shift/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SectionColorShiftOptions = {}): ReturnType<typeof mountSectionColorShift> {
  return mountSectionColorShift(target, options);
}
export type { SectionColorShiftOptions };
