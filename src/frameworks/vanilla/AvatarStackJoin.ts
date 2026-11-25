import { mountAvatarStackJoin, type AvatarStackJoinOptions } from "../../components/avatar-stack-join/AvatarStackJoinEngine.js";
import type { MotionController } from "../../components/avatar-stack-join/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AvatarStackJoinOptions = {}): ReturnType<typeof mountAvatarStackJoin> {
  return mountAvatarStackJoin(target, options);
}
export type { AvatarStackJoinOptions };
