import { mountAiImageGenerate, type AiImageGenerateOptions } from "../../components/ai-image-generate/AiImageGenerateEngine.js";
import type { MotionController } from "../../components/ai-image-generate/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AiImageGenerateOptions = {}): ReturnType<typeof mountAiImageGenerate> {
  return mountAiImageGenerate(target, options);
}
export type { AiImageGenerateOptions };
