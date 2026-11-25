import { mountCitedAiAnswer, type CitedAiAnswerOptions } from "../../components/cited-ai-answer/CitedAiAnswerEngine.js";
import type { MotionController } from "../../components/cited-ai-answer/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: CitedAiAnswerOptions = {}): ReturnType<typeof mountCitedAiAnswer> {
  return mountCitedAiAnswer(target, options);
}
export type { CitedAiAnswerOptions };
