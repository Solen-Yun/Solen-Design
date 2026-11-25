import type { MotionOptions, MotionController } from "./motion-runtime";
export type ImageOptimizerOptions = MotionOptions;
export function mountImageOptimizer(target: HTMLElement, options?: ImageOptimizerOptions): MotionController;
