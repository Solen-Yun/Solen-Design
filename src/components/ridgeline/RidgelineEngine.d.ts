import type { MotionOptions, MotionController } from "./motion-runtime";
export type RidgelineOptions = MotionOptions;
export function mountRidgeline(target: HTMLElement, options?: RidgelineOptions): MotionController;
