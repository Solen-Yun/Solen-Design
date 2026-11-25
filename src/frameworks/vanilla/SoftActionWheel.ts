import { mountSoftActionWheel, type SoftActionWheelOptions } from "../../components/soft-action-wheel/SoftActionWheelEngine.js";
import type { MotionController } from "../../components/soft-action-wheel/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SoftActionWheelOptions = {}): ReturnType<typeof mountSoftActionWheel> {
  return mountSoftActionWheel(target, options);
}
export type { SoftActionWheelOptions };
