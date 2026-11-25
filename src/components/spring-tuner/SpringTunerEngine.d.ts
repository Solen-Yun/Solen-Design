import type { MotionOptions, MotionController } from "./motion-runtime";
export type SpringTunerOptions = MotionOptions;
export function mountSpringTuner(target: HTMLElement, options?: SpringTunerOptions): MotionController;
