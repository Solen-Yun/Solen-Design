import { mountParticleNetwork, type ParticleNetworkOptions } from "../../components/particle-network/ParticleNetworkEngine.js";
import type { MotionController } from "../../components/particle-network/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ParticleNetworkOptions = {}): ReturnType<typeof mountParticleNetwork> {
  return mountParticleNetwork(target, options);
}
export type { ParticleNetworkOptions };
