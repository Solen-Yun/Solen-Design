import type { MotionOptions, MotionController } from "./motion-runtime";
export type SlopeChartOptions = MotionOptions;
export function mountSlopeChart(target: HTMLElement, options?: SlopeChartOptions): MotionController;
