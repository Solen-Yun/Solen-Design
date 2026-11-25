import { mountBottomSheetDetents, type BottomSheetDetentsOptions } from "../../components/bottom-sheet-detents/BottomSheetDetentsEngine.js";
import type { MotionController } from "../../components/bottom-sheet-detents/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: BottomSheetDetentsOptions = {}): ReturnType<typeof mountBottomSheetDetents> {
  return mountBottomSheetDetents(target, options);
}
export type { BottomSheetDetentsOptions };
