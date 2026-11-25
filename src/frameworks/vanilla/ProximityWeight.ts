import { mountProximityWeight, type ProximityWeightOptions } from "../../components/proximity-weight/ProximityWeightEngine.js";
import type { MotionController } from "../../components/proximity-weight/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ProximityWeightOptions = {}): ReturnType<typeof mountProximityWeight> {
  return mountProximityWeight(target, options);
}
export type { ProximityWeightOptions };
