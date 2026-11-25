import { mountMagnifyDock, type MagnifyDockOptions } from "../../components/magnify-dock/MagnifyDockEngine.js";
import type { MotionController } from "../../components/magnify-dock/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: MagnifyDockOptions = {}): ReturnType<typeof mountMagnifyDock> {
  return mountMagnifyDock(target, options);
}
export type { MagnifyDockOptions };
