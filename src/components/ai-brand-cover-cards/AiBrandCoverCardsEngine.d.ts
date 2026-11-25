import type { MotionOptions, MotionController } from "./motion-runtime";
export type AiBrandCoverCardsOptions = MotionOptions & { images?: (string | { src: string; alt?: string; position?: string })[]; description?: string; logoSrc?: string; symbolSrc?: string };
export function mountAiBrandCoverCards(target: HTMLElement, options?: AiBrandCoverCardsOptions): Omit<MotionController, "update"> & { update(options: AiBrandCoverCardsOptions): void };
