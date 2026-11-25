import { mountIsoBlockChart, type IsoBlockChartOptions } from "../../components/iso-block-chart/IsoBlockChartEngine.js";
import type { MotionController } from "../../components/iso-block-chart/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: IsoBlockChartOptions = {}): ReturnType<typeof mountIsoBlockChart> {
  return mountIsoBlockChart(target, options);
}
export type { IsoBlockChartOptions };
