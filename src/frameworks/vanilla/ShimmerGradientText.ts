import { mountShimmerGradientText, type ShimmerGradientTextOptions } from "../../components/shimmer-gradient-text/ShimmerGradientTextEngine.js";
import type { MotionController } from "../../components/shimmer-gradient-text/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ShimmerGradientTextOptions = {}): ReturnType<typeof mountShimmerGradientText> {
  return mountShimmerGradientText(target, options);
}
export type { ShimmerGradientTextOptions };
