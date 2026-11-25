import { mountThinkingParticles, type ThinkingParticlesOptions } from "../../components/thinking-particles/ThinkingParticlesEngine.js";
import type { MotionController } from "../../components/thinking-particles/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ThinkingParticlesOptions = {}): ReturnType<typeof mountThinkingParticles> {
  return mountThinkingParticles(target, options);
}
export type { ThinkingParticlesOptions };
