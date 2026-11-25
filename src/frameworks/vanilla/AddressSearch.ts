import { mountAddressSearch, type AddressSearchOptions } from "../../components/address-search/AddressSearchEngine.js";
import type { MotionController } from "../../components/address-search/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AddressSearchOptions = {}): ReturnType<typeof mountAddressSearch> {
  return mountAddressSearch(target, options);
}
export type { AddressSearchOptions };
