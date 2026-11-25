import { mountKineticCaptions, type KineticCaptionsOptions } from "../../components/kinetic-captions/KineticCaptionsEngine.js";
import type { MotionController } from "../../components/kinetic-captions/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: KineticCaptionsOptions = {}): ReturnType<typeof mountKineticCaptions> {
  return mountKineticCaptions(target, options);
}
export type { KineticCaptionsOptions };
