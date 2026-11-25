import { mountLocaleSwitch, type LocaleSwitchOptions } from "../../components/locale-switch/LocaleSwitchEngine.js";
import type { MotionController } from "../../components/locale-switch/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: LocaleSwitchOptions = {}): ReturnType<typeof mountLocaleSwitch> {
  return mountLocaleSwitch(target, options);
}
export type { LocaleSwitchOptions };
