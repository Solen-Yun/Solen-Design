import { mountMapPinDrop, type MapPinDropOptions } from "../../components/map-pin-drop/MapPinDropEngine.js";
import type { MotionController } from "../../components/map-pin-drop/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: MapPinDropOptions = {}): ReturnType<typeof mountMapPinDrop> {
  return mountMapPinDrop(target, options);
}
export type { MapPinDropOptions };
