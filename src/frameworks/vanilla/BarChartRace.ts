import { mountBarChartRace, type BarChartRaceOptions } from "../../components/bar-chart-race/BarChartRaceEngine.js";
import type { MotionController } from "../../components/bar-chart-race/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: BarChartRaceOptions = {}): ReturnType<typeof mountBarChartRace> {
  return mountBarChartRace(target, options);
}
export type { BarChartRaceOptions };
