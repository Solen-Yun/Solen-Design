import { mountAchievementBadges, type AchievementBadgesOptions } from "../../components/achievement-badges/AchievementBadgesEngine.js";
import type { MotionController } from "../../components/achievement-badges/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AchievementBadgesOptions = {}): ReturnType<typeof mountAchievementBadges> {
  return mountAchievementBadges(target, options);
}
export type { AchievementBadgesOptions };
