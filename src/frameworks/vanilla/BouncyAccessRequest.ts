import { mountBouncyAccessRequest, type BouncyAccessRequestOptions } from "../../components/bouncy-access-request/BouncyAccessRequestEngine.js";
import type { MotionController } from "../../components/bouncy-access-request/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: BouncyAccessRequestOptions = {}): ReturnType<typeof mountBouncyAccessRequest> {
  return mountBouncyAccessRequest(target, options);
}
export type { BouncyAccessRequestOptions };
