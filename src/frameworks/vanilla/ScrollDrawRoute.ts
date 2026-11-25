import { mountScrollDrawRoute, type ScrollDrawRouteOptions } from "../../components/scroll-draw-route/ScrollDrawRouteEngine.js";
import type { MotionController } from "../../components/scroll-draw-route/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ScrollDrawRouteOptions = {}): ReturnType<typeof mountScrollDrawRoute> {
  return mountScrollDrawRoute(target, options);
}
export type { ScrollDrawRouteOptions };
