import { mountCartDrawer, type CartDrawerOptions } from "../../components/cart-drawer/CartDrawerEngine.js";
import type { MotionController } from "../../components/cart-drawer/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: CartDrawerOptions = {}): ReturnType<typeof mountCartDrawer> {
  return mountCartDrawer(target, options);
}
export type { CartDrawerOptions };
