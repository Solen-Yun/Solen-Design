import { mountDockingMiniPlayer, type DockingMiniPlayerOptions } from "../../components/docking-mini-player/DockingMiniPlayerEngine.js";
import type { MotionController } from "../../components/docking-mini-player/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: DockingMiniPlayerOptions = {}): ReturnType<typeof mountDockingMiniPlayer> {
  return mountDockingMiniPlayer(target, options);
}
export type { DockingMiniPlayerOptions };
