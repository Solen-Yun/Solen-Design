import { mountAdventDoors, type AdventDoorsOptions } from "../../components/advent-doors/AdventDoorsEngine.js";
import type { MotionController } from "../../components/advent-doors/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AdventDoorsOptions = {}): ReturnType<typeof mountAdventDoors> {
  return mountAdventDoors(target, options);
}
export type { AdventDoorsOptions };
