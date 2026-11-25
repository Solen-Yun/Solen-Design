import { mountTrustBadges, type TrustBadgesOptions } from "../../components/trust-badges/TrustBadgesEngine.js";
import type { MotionController } from "../../components/trust-badges/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TrustBadgesOptions = {}): ReturnType<typeof mountTrustBadges> {
  return mountTrustBadges(target, options);
}
export type { TrustBadgesOptions };
