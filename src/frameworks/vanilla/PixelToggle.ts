import { mountPixelToggle, type PixelToggleOptions } from "../../components/pixel-toggle/PixelToggleEngine.js";
import type { MotionController } from "../../components/pixel-toggle/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PixelToggleOptions = {}): ReturnType<typeof mountPixelToggle> {
  return mountPixelToggle(target, options);
}
export type { PixelToggleOptions };
