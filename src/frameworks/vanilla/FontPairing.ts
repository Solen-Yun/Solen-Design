import { mountFontPairing, type FontPairingOptions } from "../../components/font-pairing/FontPairingEngine.js";
import type { MotionController } from "../../components/font-pairing/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: FontPairingOptions = {}): ReturnType<typeof mountFontPairing> {
  return mountFontPairing(target, options);
}
export type { FontPairingOptions };
