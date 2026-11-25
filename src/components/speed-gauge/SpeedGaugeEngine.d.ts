import type { MotionOptions, MotionController } from "./motion-runtime";
export type SpeedGaugeOptions = MotionOptions;
export function mountSpeedGauge(target: HTMLElement, options?: SpeedGaugeOptions): MotionController;
