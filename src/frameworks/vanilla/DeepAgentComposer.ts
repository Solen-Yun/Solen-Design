import { mountDeepAgentComposer, type DeepAgentComposerOptions } from "../../components/deep-agent-composer/DeepAgentComposerEngine.js";
import type { MotionController } from "../../components/deep-agent-composer/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: DeepAgentComposerOptions = {}): ReturnType<typeof mountDeepAgentComposer> {
  return mountDeepAgentComposer(target, options);
}
export type { DeepAgentComposerOptions };
