import { mountStoreLocator, type StoreLocatorOptions } from "../../components/store-locator/StoreLocatorEngine.js";
import type { MotionController } from "../../components/store-locator/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: StoreLocatorOptions = {}): ReturnType<typeof mountStoreLocator> {
  return mountStoreLocator(target, options);
}
export type { StoreLocatorOptions };
