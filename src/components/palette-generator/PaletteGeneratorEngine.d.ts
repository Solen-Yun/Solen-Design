import type { MotionOptions, MotionController } from "./motion-runtime";
export type PaletteGeneratorOptions = MotionOptions;
export function mountPaletteGenerator(target: HTMLElement, options?: PaletteGeneratorOptions): MotionController;
