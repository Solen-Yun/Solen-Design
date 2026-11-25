import type { MotionOptions, MotionController } from "./motion-runtime";
export type DockingMiniPlayerOptions = MotionOptions;
export function mountDockingMiniPlayer(target: HTMLElement, options?: DockingMiniPlayerOptions): MotionController;
