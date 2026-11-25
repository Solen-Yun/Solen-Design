import { mountApiPlayground, type ApiPlaygroundOptions } from "../../components/api-playground/ApiPlaygroundEngine.js";
import type { MotionController } from "../../components/api-playground/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ApiPlaygroundOptions = {}): ReturnType<typeof mountApiPlayground> {
  return mountApiPlayground(target, options);
}
export type { ApiPlaygroundOptions };
