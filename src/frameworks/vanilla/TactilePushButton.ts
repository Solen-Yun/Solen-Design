import { mountTactilePushButton, type TactilePushButtonOptions } from "../../components/tactile-push-button/TactilePushButtonEngine.js";
import type { MotionController } from "../../components/tactile-push-button/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TactilePushButtonOptions = {}): ReturnType<typeof mountTactilePushButton> {
  return mountTactilePushButton(target, options);
}
export type { TactilePushButtonOptions };
