import { mountImageAccordion, type ImageAccordionOptions } from "../../components/image-accordion/ImageAccordionEngine.js";
import type { MotionController } from "../../components/image-accordion/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ImageAccordionOptions = {}): ReturnType<typeof mountImageAccordion> {
  return mountImageAccordion(target, options);
}
export type { ImageAccordionOptions };
