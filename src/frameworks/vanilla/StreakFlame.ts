import { mountStreakFlame, type StreakFlameOptions } from "../../components/streak-flame/StreakFlameEngine.js";
import type { MotionController } from "../../components/streak-flame/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: StreakFlameOptions = {}): ReturnType<typeof mountStreakFlame> {
  return mountStreakFlame(target, options);
}
export type { StreakFlameOptions };
