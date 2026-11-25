import { mountPlanCompareTable, type PlanCompareTableOptions } from "../../components/plan-compare-table/PlanCompareTableEngine.js";
import type { MotionController } from "../../components/plan-compare-table/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PlanCompareTableOptions = {}): ReturnType<typeof mountPlanCompareTable> {
  return mountPlanCompareTable(target, options);
}
export type { PlanCompareTableOptions };
