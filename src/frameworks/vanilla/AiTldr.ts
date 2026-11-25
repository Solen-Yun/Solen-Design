import { mountAiTldr, type AiTldrOptions } from "../../components/ai-tldr/AiTldrEngine.js";
import type { MotionController } from "../../components/ai-tldr/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AiTldrOptions = {}): ReturnType<typeof mountAiTldr> {
  return mountAiTldr(target, options);
}
export type { AiTldrOptions };
