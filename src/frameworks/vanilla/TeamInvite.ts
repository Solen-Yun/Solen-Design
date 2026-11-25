import { mountTeamInvite, type TeamInviteOptions } from "../../components/team-invite/TeamInviteEngine.js";
import type { MotionController } from "../../components/team-invite/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TeamInviteOptions = {}): ReturnType<typeof mountTeamInvite> {
  return mountTeamInvite(target, options);
}
export type { TeamInviteOptions };
