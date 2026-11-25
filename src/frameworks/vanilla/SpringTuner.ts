import { mountSpringTuner, type SpringTunerOptions } from "../../components/spring-tuner/SpringTunerEngine.js";
import type { MotionController } from "../../components/spring-tuner/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SpringTunerOptions = {}): ReturnType<typeof mountSpringTuner> {
  return mountSpringTuner(target, options);
}
export type { SpringTunerOptions };
