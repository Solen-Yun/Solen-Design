import { mountWordCloud, type WordCloudOptions } from "../../components/word-cloud/WordCloudEngine.js";
import type { MotionController } from "../../components/word-cloud/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: WordCloudOptions = {}): ReturnType<typeof mountWordCloud> {
  return mountWordCloud(target, options);
}
export type { WordCloudOptions };
