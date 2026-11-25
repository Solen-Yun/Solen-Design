import { mountTodayPopup, type TodayPopupOptions } from "../../components/today-popup/TodayPopupEngine.js";
import type { MotionController } from "../../components/today-popup/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TodayPopupOptions = {}): ReturnType<typeof mountTodayPopup> {
  return mountTodayPopup(target, options);
}
export type { TodayPopupOptions };
