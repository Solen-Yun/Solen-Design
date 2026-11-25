import { mountKeyholeZoom, type KeyholeZoomOptions } from "../../components/keyhole-zoom/KeyholeZoomEngine.js";
import type { MotionController } from "../../components/keyhole-zoom/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: KeyholeZoomOptions = {}): ReturnType<typeof mountKeyholeZoom> {
  return mountKeyholeZoom(target, options);
}
export type { KeyholeZoomOptions };
