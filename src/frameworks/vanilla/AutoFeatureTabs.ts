import { mountAutoFeatureTabs, type AutoFeatureTabsOptions } from "../../components/auto-feature-tabs/AutoFeatureTabsEngine.js";
import type { MotionController } from "../../components/auto-feature-tabs/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AutoFeatureTabsOptions = {}): ReturnType<typeof mountAutoFeatureTabs> {
  return mountAutoFeatureTabs(target, options);
}
export type { AutoFeatureTabsOptions };
