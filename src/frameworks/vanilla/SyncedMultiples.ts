import { mountSyncedMultiples, type SyncedMultiplesOptions } from "../../components/synced-multiples/SyncedMultiplesEngine.js";
import type { MotionController } from "../../components/synced-multiples/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SyncedMultiplesOptions = {}): ReturnType<typeof mountSyncedMultiples> {
  return mountSyncedMultiples(target, options);
}
export type { SyncedMultiplesOptions };
