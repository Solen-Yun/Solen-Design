import { mountLevelUpXp, type LevelUpXpOptions } from "../../components/level-up-xp/LevelUpXpEngine.js";
import type { MotionController } from "../../components/level-up-xp/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: LevelUpXpOptions = {}): ReturnType<typeof mountLevelUpXp> {
  return mountLevelUpXp(target, options);
}
export type { LevelUpXpOptions };
