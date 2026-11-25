import type { MotionOptions, MotionController } from "./motion-runtime";
export type FeedbackPinsOptions = MotionOptions;
export function mountFeedbackPins(target: HTMLElement, options?: FeedbackPinsOptions): MotionController;
