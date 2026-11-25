import type { MotionOptions, MotionController } from "./motion-runtime";
export type ApiPlaygroundOptions = MotionOptions;
export function mountApiPlayground(target: HTMLElement, options?: ApiPlaygroundOptions): MotionController;
