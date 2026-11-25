import { mountReasoningEffortSlider, type ReasoningEffortSliderOptions } from "../../components/reasoning-effort-slider/ReasoningEffortSliderEngine.js";
import type { MotionController } from "../../components/reasoning-effort-slider/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ReasoningEffortSliderOptions = {}): ReturnType<typeof mountReasoningEffortSlider> {
  return mountReasoningEffortSlider(target, options);
}
export type { ReasoningEffortSliderOptions };
