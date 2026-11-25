import { mountPaletteGenerator, type PaletteGeneratorOptions } from "../../components/palette-generator/PaletteGeneratorEngine.js";
import type { MotionController } from "../../components/palette-generator/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: PaletteGeneratorOptions = {}): ReturnType<typeof mountPaletteGenerator> {
  return mountPaletteGenerator(target, options);
}
export type { PaletteGeneratorOptions };
