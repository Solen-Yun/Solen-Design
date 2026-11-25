import { mountTextScrambleDecode, type TextScrambleDecodeOptions } from "../../components/text-scramble-decode/TextScrambleDecodeEngine.js";
import type { MotionController } from "../../components/text-scramble-decode/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TextScrambleDecodeOptions = {}): ReturnType<typeof mountTextScrambleDecode> {
  return mountTextScrambleDecode(target, options);
}
export type { TextScrambleDecodeOptions };
