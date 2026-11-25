import { mountAiPromptHero, type AiPromptHeroOptions } from "../../components/ai-prompt-hero/AiPromptHeroEngine.js";
import type { MotionController } from "../../components/ai-prompt-hero/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AiPromptHeroOptions = {}): ReturnType<typeof mountAiPromptHero> {
  return mountAiPromptHero(target, options);
}
export type { AiPromptHeroOptions };
