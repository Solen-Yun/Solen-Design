import { mountHammerheadChart, type HammerheadChartOptions } from "../../components/hammerhead-chart/HammerheadChartEngine.js";
import type { MotionController } from "../../components/hammerhead-chart/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: HammerheadChartOptions = {}): ReturnType<typeof mountHammerheadChart> {
  return mountHammerheadChart(target, options);
}
export type { HammerheadChartOptions };
