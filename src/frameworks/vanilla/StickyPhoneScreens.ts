import { mountStickyPhoneScreens, type StickyPhoneScreensOptions } from "../../components/sticky-phone-screens/StickyPhoneScreensEngine.js";
import type { MotionController } from "../../components/sticky-phone-screens/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: StickyPhoneScreensOptions = {}): ReturnType<typeof mountStickyPhoneScreens> {
  return mountStickyPhoneScreens(target, options);
}
export type { StickyPhoneScreensOptions };
