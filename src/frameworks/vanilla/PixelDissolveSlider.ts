import { mountPixelDissolveSlider, type PixelDissolveSliderOptions } from "../../components/pixel-dissolve-slider/PixelDissolveSliderEngine.js";
import type { MotionController } from "../../components/pixel-dissolve-slider/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PixelDissolveSliderOptions = {}): ReturnType<typeof mountPixelDissolveSlider> {
  return mountPixelDissolveSlider(target, options);
}
export type { PixelDissolveSliderOptions };
