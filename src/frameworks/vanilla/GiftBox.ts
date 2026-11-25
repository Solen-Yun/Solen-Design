import { mountGiftBox, type GiftBoxOptions } from "../../components/gift-box/GiftBoxEngine.js";
import type { MotionController } from "../../components/gift-box/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: GiftBoxOptions = {}): ReturnType<typeof mountGiftBox> {
  return mountGiftBox(target, options);
}
export type { GiftBoxOptions };
