import type { MotionOptions, MotionController } from "./motion-runtime";
export type ReadingFocusOptions = MotionOptions;
export function mountReadingFocus(target: HTMLElement, options?: ReadingFocusOptions): MotionController;
