import type { MotionOptions, MotionController } from "./motion-runtime";
export type PixelToggleOptions = MotionOptions & { checked?: boolean; sound?: boolean; onCheckedChange?: (checked: boolean) => void; fixedBackground?: boolean };
export function mountPixelToggle(target: HTMLElement, options?: PixelToggleOptions): Omit<MotionController, "update"> & { update(options: PixelToggleOptions): void };
