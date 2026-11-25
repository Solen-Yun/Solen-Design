import { mountStarfieldWarp, type StarfieldWarpOptions } from "../../components/starfield-warp/StarfieldWarpEngine.js";
import type { MotionController } from "../../components/starfield-warp/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: StarfieldWarpOptions = {}): ReturnType<typeof mountStarfieldWarp> {
  return mountStarfieldWarp(target, options);
}
export type { StarfieldWarpOptions };
