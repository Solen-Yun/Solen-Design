import type { MotionOptions, MotionController } from "./motion-runtime";
export type BentoFeaturesOptions = MotionOptions;
export function mountBentoFeatures(target: HTMLElement, options?: BentoFeaturesOptions): MotionController;
