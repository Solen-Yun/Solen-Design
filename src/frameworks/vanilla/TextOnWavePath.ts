import { mountTextOnWavePath, type TextOnWavePathOptions } from "../../components/text-on-wave-path/TextOnWavePathEngine.js";
import type { MotionController } from "../../components/text-on-wave-path/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TextOnWavePathOptions = {}): ReturnType<typeof mountTextOnWavePath> {
  return mountTextOnWavePath(target, options);
}
export type { TextOnWavePathOptions };
