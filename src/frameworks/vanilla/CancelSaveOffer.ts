import { mountCancelSaveOffer, type CancelSaveOfferOptions } from "../../components/cancel-save-offer/CancelSaveOfferEngine.js";
import type { MotionController } from "../../components/cancel-save-offer/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: CancelSaveOfferOptions = {}): ReturnType<typeof mountCancelSaveOffer> {
  return mountCancelSaveOffer(target, options);
}
export type { CancelSaveOfferOptions };
