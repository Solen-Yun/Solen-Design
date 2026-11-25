import type { MotionOptions, MotionController } from "./motion-runtime";
export type StoreLocatorOptions = MotionOptions;
export function mountStoreLocator(target: HTMLElement, options?: StoreLocatorOptions): MotionController;
