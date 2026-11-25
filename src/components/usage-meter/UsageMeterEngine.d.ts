import type { MotionOptions, MotionController } from "./motion-runtime";
export type UsageMeterOptions = MotionOptions;
export function mountUsageMeter(target: HTMLElement, options?: UsageMeterOptions): MotionController;
