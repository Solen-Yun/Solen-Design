import type { MotionOptions, MotionController } from "./motion-runtime";
export type ImageCompareOptions = MotionOptions & { labels?: boolean; corner?: number; beforeSrc?: string; afterSrc?: string };
export function mountImageCompare(target: HTMLElement, options?: ImageCompareOptions): Omit<MotionController, "update"> & { update(options: ImageCompareOptions): void };
