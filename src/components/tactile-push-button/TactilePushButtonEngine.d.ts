import type { MotionOptions, MotionController } from "./motion-runtime";
export type TactilePushButtonOptions = MotionOptions & {
  label?: string;
  fontSize?: number | string;
  pressScale?: number;
  hoverTextScale?: number;
  motionSpeed?: number;
  surfaceStart?: string;
  surfaceEnd?: string;
  textStart?: string;
  textEnd?: string;
};
export function mountTactilePushButton(target: HTMLElement, options?: TactilePushButtonOptions): Omit<MotionController, "update"> & { update(options: TactilePushButtonOptions): void };
