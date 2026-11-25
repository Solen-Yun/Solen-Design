import { mountParticleTextureTrio, type ParticleTextureTrioOptions } from "../../components/particle-texture-trio/ParticleTextureTrioEngine.js";
import type { MotionController } from "../../components/particle-texture-trio/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ParticleTextureTrioOptions = {}): ReturnType<typeof mountParticleTextureTrio> {
  return mountParticleTextureTrio(target, options);
}
export type { ParticleTextureTrioOptions };
