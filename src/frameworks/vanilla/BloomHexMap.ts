import { mountBloomHexMap, type BloomHexMapOptions } from "../../components/bloom-hex-map/BloomHexMapEngine.js";
import type { MotionController } from "../../components/bloom-hex-map/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: BloomHexMapOptions = {}): ReturnType<typeof mountBloomHexMap> {
  return mountBloomHexMap(target, options);
}
export type { BloomHexMapOptions };
