import type { MotionOptions, MotionController } from "./motion-runtime";
export type RegressionDragOptions = MotionOptions;
export function mountRegressionDrag(target: HTMLElement, options?: RegressionDragOptions): MotionController;
