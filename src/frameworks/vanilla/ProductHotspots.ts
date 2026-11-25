import { mountProductHotspots, type ProductHotspotsOptions } from "../../components/product-hotspots/ProductHotspotsEngine.js";
import type { MotionController } from "../../components/product-hotspots/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ProductHotspotsOptions = {}): ReturnType<typeof mountProductHotspots> {
  return mountProductHotspots(target, options);
}
export type { ProductHotspotsOptions };
