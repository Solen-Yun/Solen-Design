import type { MotionOptions, MotionController } from "./motion-runtime";
export type WaffleChartOptions = MotionOptions;
export function mountWaffleChart(target: HTMLElement, options?: WaffleChartOptions): MotionController;
