import { mountAgentComposer, type AgentComposerOptions } from "../../components/agent-composer/AgentComposerEngine.js";
import type { MotionController } from "../../components/agent-composer/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AgentComposerOptions = {}): ReturnType<typeof mountAgentComposer> {
  return mountAgentComposer(target, options);
}
export type { AgentComposerOptions };
