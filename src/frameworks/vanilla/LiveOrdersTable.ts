import { mountLiveOrdersTable, type LiveOrdersTableOptions } from "../../components/live-orders-table/LiveOrdersTableEngine.js";
import type { MotionController } from "../../components/live-orders-table/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: LiveOrdersTableOptions = {}): ReturnType<typeof mountLiveOrdersTable> {
  return mountLiveOrdersTable(target, options);
}
export type { LiveOrdersTableOptions };
