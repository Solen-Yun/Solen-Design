import { mountDotGlobe, type DotGlobeOptions } from "../../components/dot-globe/DotGlobeEngine.js";
import type { MotionController } from "../../components/dot-globe/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: DotGlobeOptions = {}): ReturnType<typeof mountDotGlobe> {
  return mountDotGlobe(target, options);
}
export type { DotGlobeOptions };
