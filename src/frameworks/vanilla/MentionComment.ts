import { mountMentionComment, type MentionCommentOptions } from "../../components/mention-comment/MentionCommentEngine.js";
import type { MotionController } from "../../components/mention-comment/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: MentionCommentOptions = {}): ReturnType<typeof mountMentionComment> {
  return mountMentionComment(target, options);
}
export type { MentionCommentOptions };
