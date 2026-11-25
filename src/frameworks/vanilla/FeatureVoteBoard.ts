import { mountFeatureVoteBoard, type FeatureVoteBoardOptions } from "../../components/feature-vote-board/FeatureVoteBoardEngine.js";
import type { MotionController } from "../../components/feature-vote-board/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: FeatureVoteBoardOptions = {}): ReturnType<typeof mountFeatureVoteBoard> {
  return mountFeatureVoteBoard(target, options);
}
export type { FeatureVoteBoardOptions };
