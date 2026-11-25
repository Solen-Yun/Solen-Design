import { mountVelocityFocusDrag, type VelocityFocusDragOptions } from "../../components/velocity-drag/VelocityFocusDragEngine.js";
import type { MotionController } from "../../components/velocity-drag/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: VelocityFocusDragOptions = {}): ReturnType<typeof mountVelocityFocusDrag> {
  return mountVelocityFocusDrag(target, options);
}
export type { VelocityFocusDragOptions };
