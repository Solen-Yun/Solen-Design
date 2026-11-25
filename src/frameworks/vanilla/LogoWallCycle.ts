import { mountLogoWallCycle, type LogoWallCycleOptions } from "../../components/logo-wall-cycle/LogoWallCycleEngine.js";
import type { MotionController } from "../../components/logo-wall-cycle/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: LogoWallCycleOptions = {}): ReturnType<typeof mountLogoWallCycle> {
  return mountLogoWallCycle(target, options);
}
export type { LogoWallCycleOptions };
