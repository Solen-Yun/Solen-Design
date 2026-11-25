import { mountInfiniteSpiral, type InfiniteSpiralOptions } from "../../components/infinite-spiral/InfiniteSpiralEngine.js";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: InfiniteSpiralOptions = {}): ReturnType<typeof mountInfiniteSpiral> {
  return mountInfiniteSpiral(target, options);
}
export type { InfiniteSpiralOptions, InfiniteSpiralItem } from "../../components/infinite-spiral/InfiniteSpiralEngine.js";
