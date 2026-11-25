import type { MotionOptions, MotionController } from "./motion-runtime";
export type ParallelCoordsOptions = MotionOptions;
export function mountParallelCoords(target: HTMLElement, options?: ParallelCoordsOptions): MotionController;
