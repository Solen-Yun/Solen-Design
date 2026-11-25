import { mountMobileDrillMenu, type MobileDrillMenuOptions } from "../../components/mobile-drill-menu/MobileDrillMenuEngine.js";
import type { MotionController } from "../../components/mobile-drill-menu/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: MobileDrillMenuOptions = {}): ReturnType<typeof mountMobileDrillMenu> {
  return mountMobileDrillMenu(target, options);
}
export type { MobileDrillMenuOptions };
