import { mountStickyBuySheet, type StickyBuySheetOptions } from "../../components/sticky-buy-sheet/StickyBuySheetEngine.js";
import type { MotionController } from "../../components/sticky-buy-sheet/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: StickyBuySheetOptions = {}): ReturnType<typeof mountStickyBuySheet> {
  return mountStickyBuySheet(target, options);
}
export type { StickyBuySheetOptions };
