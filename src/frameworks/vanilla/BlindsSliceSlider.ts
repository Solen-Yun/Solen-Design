import { mountBlindsSliceSlider, type BlindsSliceSliderOptions } from "../../components/blinds-slice-slider/BlindsSliceSliderEngine.js";
import type { MotionController } from "../../components/blinds-slice-slider/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: BlindsSliceSliderOptions = {}): ReturnType<typeof mountBlindsSliceSlider> {
  return mountBlindsSliceSlider(target, options);
}
export type { BlindsSliceSliderOptions };
