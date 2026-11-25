import { mountProductLoupe, type ProductLoupeOptions } from "../../components/product-loupe/ProductLoupeEngine.js";
import type { MotionController } from "../../components/product-loupe/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ProductLoupeOptions = {}): ReturnType<typeof mountProductLoupe> {
  return mountProductLoupe(target, options);
}
export type { ProductLoupeOptions };
