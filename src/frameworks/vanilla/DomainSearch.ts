import { mountDomainSearch, type DomainSearchOptions } from "../../components/domain-search/DomainSearchEngine.js";
import type { MotionController } from "../../components/domain-search/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: DomainSearchOptions = {}): ReturnType<typeof mountDomainSearch> {
  return mountDomainSearch(target, options);
}
export type { DomainSearchOptions };
