import type { MotionOptions, MotionController } from "./motion-runtime";
export type TiltToFlatScreenOptions = MotionOptions;
export function mountTiltToFlatScreen(target: HTMLElement, options?: TiltToFlatScreenOptions): MotionController;
