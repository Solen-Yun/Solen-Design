import { mountWordCube, type WordCubeOptions } from "../../components/word-cube/WordCubeEngine.js";
import type { MotionController } from "../../components/word-cube/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: WordCubeOptions = {}): ReturnType<typeof mountWordCube> {
  return mountWordCube(target, options);
}
export type { WordCubeOptions };
