import { mountSharedElementDetail, type SharedElementDetailOptions } from "../../components/shared-element-detail/SharedElementDetailEngine.js";
import type { MotionController } from "../../components/shared-element-detail/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SharedElementDetailOptions = {}): ReturnType<typeof mountSharedElementDetail> {
  return mountSharedElementDetail(target, options);
}
export type { SharedElementDetailOptions };
