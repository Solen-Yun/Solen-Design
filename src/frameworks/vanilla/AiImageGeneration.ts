import { mountAiImageGeneration, type AiImageGenerationOptions } from "../../components/ai-image-generation/AiImageGenerationEngine.js";
import type { MotionController } from "../../components/ai-image-generation/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AiImageGenerationOptions = {}): ReturnType<typeof mountAiImageGeneration> {
  return mountAiImageGeneration(target, options);
}
export type { AiImageGenerationOptions };
