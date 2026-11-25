import { mountRecentPurchaseToast, type RecentPurchaseToastOptions } from "../../components/recent-purchase-toast/RecentPurchaseToastEngine.js";
import type { MotionController } from "../../components/recent-purchase-toast/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: RecentPurchaseToastOptions = {}): ReturnType<typeof mountRecentPurchaseToast> {
  return mountRecentPurchaseToast(target, options);
}
export type { RecentPurchaseToastOptions };
