import { mountTestimonialColumns, type TestimonialColumnsOptions } from "../../components/testimonial-columns/TestimonialColumnsEngine.js";
import type { MotionController } from "../../components/testimonial-columns/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TestimonialColumnsOptions = {}): ReturnType<typeof mountTestimonialColumns> {
  return mountTestimonialColumns(target, options);
}
export type { TestimonialColumnsOptions };
