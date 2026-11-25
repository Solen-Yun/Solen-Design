import { mountBentoFeatures, type BentoFeaturesOptions } from "../../components/bento-features/BentoFeaturesEngine.js";
import type { MotionController } from "../../components/bento-features/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: BentoFeaturesOptions = {}): ReturnType<typeof mountBentoFeatures> {
  return mountBentoFeatures(target, options);
}
export type { BentoFeaturesOptions };
