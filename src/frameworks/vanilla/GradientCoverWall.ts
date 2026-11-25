import { mountGradientCoverWall, type GradientCoverWallOptions } from "../../components/gradient-cover-wall/GradientCoverWallEngine.js";
import type { MotionController } from "../../components/gradient-cover-wall/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: GradientCoverWallOptions = {}): ReturnType<typeof mountGradientCoverWall> {
  return mountGradientCoverWall(target, options);
}
export type { GradientCoverWallOptions };
