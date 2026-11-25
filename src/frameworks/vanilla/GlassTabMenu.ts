import { mountGlassTabMenu, type GlassTabMenuOptions } from "../../components/glass-tab-menu/GlassTabMenuEngine.js";
import type { MotionController } from "../../components/glass-tab-menu/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: GlassTabMenuOptions = {}): ReturnType<typeof mountGlassTabMenu> {
  return mountGlassTabMenu(target, options);
}
export type { GlassTabMenuOptions };
