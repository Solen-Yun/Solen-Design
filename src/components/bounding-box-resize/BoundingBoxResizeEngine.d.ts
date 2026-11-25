import type { MotionOptions, MotionController } from "./motion-runtime";
export type BoundingBoxResizeOptions = MotionOptions;
export function mountBoundingBoxResize(target: HTMLElement, options?: BoundingBoxResizeOptions): MotionController;
