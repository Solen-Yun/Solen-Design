import { mountDirectionAwareTiles, type DirectionAwareTilesOptions } from "../../components/direction-aware-tiles/DirectionAwareTilesEngine.js";
import type { MotionController } from "../../components/direction-aware-tiles/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: DirectionAwareTilesOptions = {}): ReturnType<typeof mountDirectionAwareTiles> {
  return mountDirectionAwareTiles(target, options);
}
export type { DirectionAwareTilesOptions };
