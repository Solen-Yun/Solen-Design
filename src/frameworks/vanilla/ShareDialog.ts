import { mountShareDialog, type ShareDialogOptions } from "../../components/share-dialog/ShareDialogEngine.js";
import type { MotionController } from "../../components/share-dialog/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ShareDialogOptions = {}): ReturnType<typeof mountShareDialog> {
  return mountShareDialog(target, options);
}
export type { ShareDialogOptions };
