import { mountSailingToc, type SailingTocOptions } from "../../components/sailing-toc/SailingTocEngine.js";
import type { MotionController } from "../../components/sailing-toc/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SailingTocOptions = {}): ReturnType<typeof mountSailingToc> {
  return mountSailingToc(target, options);
}
export type { SailingTocOptions };
