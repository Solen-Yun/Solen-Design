import type { MotionOptions, MotionController } from "./motion-runtime";
export type IsoBlockChartOptions = MotionOptions & { heading?: string; metric?: 0 | 1; onMetricChange?: (metric: 0 | 1) => void };
export function mountIsoBlockChart(target: HTMLElement, options?: IsoBlockChartOptions): Omit<MotionController, "update"> & { update(options: IsoBlockChartOptions): void };
