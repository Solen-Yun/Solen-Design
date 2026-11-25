import { mountStatusPage, type StatusPageOptions } from "../../components/status-page/StatusPageEngine.js";
import type { MotionController } from "../../components/status-page/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: StatusPageOptions = {}): ReturnType<typeof mountStatusPage> {
  return mountStatusPage(target, options);
}
export type { StatusPageOptions };
