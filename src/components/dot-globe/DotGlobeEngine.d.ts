import type { MotionOptions, MotionController } from "./motion-runtime";
export type DotGlobeOptions = MotionOptions;
export function mountDotGlobe(target: HTMLElement, options?: DotGlobeOptions): MotionController;
