import type { MotionOptions, MotionController } from "./motion-runtime";
export type ImageAccordionOptions = MotionOptions & { open?: number; reach?: number; bounce?: number; gap?: number; images?: { name: string; src: string }[] };
export function mountImageAccordion(target: HTMLElement, options?: ImageAccordionOptions): Omit<MotionController, "update"> & { update(options: ImageAccordionOptions): void };
