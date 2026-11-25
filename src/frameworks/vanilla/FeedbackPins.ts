import { mountFeedbackPins, type FeedbackPinsOptions } from "../../components/feedback-pins/FeedbackPinsEngine.js";
import type { MotionController } from "../../components/feedback-pins/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: FeedbackPinsOptions = {}): ReturnType<typeof mountFeedbackPins> {
  return mountFeedbackPins(target, options);
}
export type { FeedbackPinsOptions };
