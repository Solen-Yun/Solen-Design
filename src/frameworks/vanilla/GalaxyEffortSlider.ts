import { mountGalaxyEffortSlider, type GalaxyEffortSliderOptions } from "../../components/galaxy-effort-slider/GalaxyEffortSliderEngine.js";
import type { MotionController } from "../../components/galaxy-effort-slider/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: GalaxyEffortSliderOptions = {}): ReturnType<typeof mountGalaxyEffortSlider> {
  return mountGalaxyEffortSlider(target, options);
}
export type { GalaxyEffortSliderOptions };
