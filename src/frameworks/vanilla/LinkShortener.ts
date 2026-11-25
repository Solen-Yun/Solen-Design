import { mountLinkShortener, type LinkShortenerOptions } from "../../components/link-shortener/LinkShortenerEngine.js";
import type { MotionController } from "../../components/link-shortener/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: LinkShortenerOptions = {}): ReturnType<typeof mountLinkShortener> {
  return mountLinkShortener(target, options);
}
export type { LinkShortenerOptions };
