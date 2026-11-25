import { mountDeliveryCutoff, type DeliveryCutoffOptions } from "../../components/delivery-cutoff/DeliveryCutoffEngine.js";
import type { MotionController } from "../../components/delivery-cutoff/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: DeliveryCutoffOptions = {}): ReturnType<typeof mountDeliveryCutoff> {
  return mountDeliveryCutoff(target, options);
}
export type { DeliveryCutoffOptions };
