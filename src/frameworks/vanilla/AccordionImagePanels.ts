import { mountAccordionImagePanels, type AccordionImagePanelsOptions } from "../../components/accordion-image-panels/AccordionImagePanelsEngine.js";
import type { MotionController } from "../../components/accordion-image-panels/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AccordionImagePanelsOptions = {}): ReturnType<typeof mountAccordionImagePanels> {
  return mountAccordionImagePanels(target, options);
}
export type { AccordionImagePanelsOptions };
