import { mountRepoStarButton, type RepoStarButtonOptions } from "../../components/repo-star-button/RepoStarButtonEngine.js";
import type { MotionController } from "../../components/repo-star-button/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: RepoStarButtonOptions = {}): ReturnType<typeof mountRepoStarButton> {
  return mountRepoStarButton(target, options);
}
export type { RepoStarButtonOptions };
