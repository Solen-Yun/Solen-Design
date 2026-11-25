import { mountBlueFlutedGlass, type BlueFlutedGlassOptions } from "../../components/blue-fluted-glass/BlueFlutedGlassEngine.js";
import type { MotionController } from "../../components/blue-fluted-glass/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: BlueFlutedGlassOptions = {}): ReturnType<typeof mountBlueFlutedGlass> {
  return mountBlueFlutedGlass(target, options);
}
export type { BlueFlutedGlassOptions };
