import { mountShareInvite, type ShareInviteOptions } from "../../components/share-invite/ShareInviteEngine.js";
import type { MotionController } from "../../components/share-invite/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ShareInviteOptions = {}): ReturnType<typeof mountShareInvite> {
  return mountShareInvite(target, options);
}
export type { ShareInviteOptions };
