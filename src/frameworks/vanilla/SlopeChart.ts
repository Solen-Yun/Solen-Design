import { mountSlopeChart, type SlopeChartOptions } from "../../components/slope-chart/SlopeChartEngine.js";
import type { MotionController } from "../../components/slope-chart/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SlopeChartOptions = {}): ReturnType<typeof mountSlopeChart> {
  return mountSlopeChart(target, options);
}
export type { SlopeChartOptions };
