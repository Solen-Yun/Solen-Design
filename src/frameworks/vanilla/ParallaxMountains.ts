import { mountParallaxMountains, type ParallaxMountainsOptions } from "../../components/parallax-mountains/ParallaxMountainsEngine.js";
import type { MotionController } from "../../components/parallax-mountains/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ParallaxMountainsOptions = {}): ReturnType<typeof mountParallaxMountains> {
  return mountParallaxMountains(target, options);
}
export type { ParallaxMountainsOptions };
