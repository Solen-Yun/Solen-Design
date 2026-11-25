import type { MotionOptions, MotionController } from "./motion-runtime";
export type BrandPosterCardsOptions = MotionOptions & { images?: (string | { src: string; alt?: string; position?: string })[]; description?: string; logoSrc?: string; symbolSrc?: string };
export function mountBrandPosterCards(target: HTMLElement, options?: BrandPosterCardsOptions): Omit<MotionController, "update"> & { update(options: BrandPosterCardsOptions): void };
