import type { MotionOptions, MotionController } from "./motion-runtime";
export type MorphingCursorOptions = MotionOptions;
export function mountMorphingCursor(target: HTMLElement, options?: MorphingCursorOptions): MotionController;
