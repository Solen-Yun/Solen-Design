import type { MotionOptions, MotionController } from "./motion-runtime";
export type ParticleNetworkOptions = MotionOptions;
export function mountParticleNetwork(target: HTMLElement, options?: ParticleNetworkOptions): MotionController;
