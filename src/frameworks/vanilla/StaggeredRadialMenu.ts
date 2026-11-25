import { mountStaggeredRadialMenu, type StaggeredRadialMenuOptions } from "../../components/staggered-radial-menu/StaggeredRadialMenuEngine.js";
import type { MotionController } from "../../components/staggered-radial-menu/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: StaggeredRadialMenuOptions = {}): ReturnType<typeof mountStaggeredRadialMenu> {
  return mountStaggeredRadialMenu(target, options);
}
export type { StaggeredRadialMenuOptions };
