import type { MotionOptions, MotionController } from "./motion-runtime";
export type FoldedEmojiScrollOptions = MotionOptions & { query?: string; value?: string; foldSize?: number; onSelect?: (emoji: string) => void };
export function mountFoldedEmojiScroll(target: HTMLElement, options?: FoldedEmojiScrollOptions): Omit<MotionController, "update"> & { update(options: FoldedEmojiScrollOptions): void };
