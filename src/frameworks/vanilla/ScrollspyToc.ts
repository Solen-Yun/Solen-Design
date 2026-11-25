import { mountScrollspyToc, type ScrollspyTocOptions } from "../../components/scrollspy-toc/ScrollspyTocEngine.js";
import type { MotionController } from "../../components/scrollspy-toc/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ScrollspyTocOptions = {}): ReturnType<typeof mountScrollspyToc> {
  return mountScrollspyToc(target, options);
}
export type { ScrollspyTocOptions };
