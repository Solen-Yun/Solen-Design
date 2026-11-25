import { mountCircularThemeSwitch, type CircularThemeSwitchOptions } from "../../components/circular-theme-switch/CircularThemeSwitchEngine.js";
import type { MotionController } from "../../components/circular-theme-switch/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: CircularThemeSwitchOptions = {}): ReturnType<typeof mountCircularThemeSwitch> {
  return mountCircularThemeSwitch(target, options);
}
export type { CircularThemeSwitchOptions };
