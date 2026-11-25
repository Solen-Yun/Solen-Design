import { mountWaffleChart, type WaffleChartOptions } from "../../components/waffle-chart/WaffleChartEngine.js";
import type { MotionController } from "../../components/waffle-chart/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: WaffleChartOptions = {}): ReturnType<typeof mountWaffleChart> {
  return mountWaffleChart(target, options);
}
export type { WaffleChartOptions };
