import { mountStoryProgress, type StoryProgressOptions } from "../../components/story-progress/StoryProgressEngine.js";
import type { MotionController } from "../../components/story-progress/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: StoryProgressOptions = {}): ReturnType<typeof mountStoryProgress> {
  return mountStoryProgress(target, options);
}
export type { StoryProgressOptions };
