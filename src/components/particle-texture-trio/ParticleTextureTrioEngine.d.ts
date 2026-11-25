import type { MotionOptions, MotionController } from "./motion-runtime";
export type ParticleTextureTrioOptions = MotionOptions & { speed?: number; paused?: boolean; background?: "#000" | "#f4f4f4" };
export function mountParticleTextureTrio(target: HTMLElement, options?: ParticleTextureTrioOptions): Omit<MotionController, "update"> & { update(options: ParticleTextureTrioOptions): void };
