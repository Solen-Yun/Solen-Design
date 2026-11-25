import { mountPushNavigationStack, type PushNavigationStackOptions } from "../../components/push-navigation-stack/PushNavigationStackEngine.js";
import type { MotionController } from "../../components/push-navigation-stack/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PushNavigationStackOptions = {}): ReturnType<typeof mountPushNavigationStack> {
  return mountPushNavigationStack(target, options);
}
export type { PushNavigationStackOptions };
