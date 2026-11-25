import { mountSplitCurtainMenu, type SplitCurtainMenuOptions } from "../../components/split-curtain-menu/SplitCurtainMenuEngine.js";
import type { MotionController } from "../../components/split-curtain-menu/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SplitCurtainMenuOptions = {}): ReturnType<typeof mountSplitCurtainMenu> {
  return mountSplitCurtainMenu(target, options);
}
export type { SplitCurtainMenuOptions };
