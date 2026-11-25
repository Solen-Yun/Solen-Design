import { mountHideOnScrollHeader, type HideOnScrollHeaderOptions } from "../../components/hide-on-scroll-header/HideOnScrollHeaderEngine.js";
import type { MotionController } from "../../components/hide-on-scroll-header/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: HideOnScrollHeaderOptions = {}): ReturnType<typeof mountHideOnScrollHeader> {
  return mountHideOnScrollHeader(target, options);
}
export type { HideOnScrollHeaderOptions };
