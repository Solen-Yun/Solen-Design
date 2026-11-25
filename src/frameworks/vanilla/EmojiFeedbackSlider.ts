import { mountEmojiFeedbackSlider, type EmojiFeedbackSliderOptions } from "../../components/emoji-feedback-slider/EmojiFeedbackSliderEngine.js";
import type { MotionController } from "../../components/emoji-feedback-slider/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: EmojiFeedbackSliderOptions = {}): ReturnType<typeof mountEmojiFeedbackSlider> {
  return mountEmojiFeedbackSlider(target, options);
}
export type { EmojiFeedbackSliderOptions };
