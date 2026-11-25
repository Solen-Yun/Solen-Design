import { mountVelocitySkewList, type VelocitySkewListOptions } from "../../components/velocity-skew-list/VelocitySkewListEngine.js";
import type { MotionController } from "../../components/velocity-skew-list/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: VelocitySkewListOptions = {}): ReturnType<typeof mountVelocitySkewList> {
  return mountVelocitySkewList(target, options);
}
export type { VelocitySkewListOptions };
