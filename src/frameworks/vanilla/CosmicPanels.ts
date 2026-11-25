import { mountCosmicPanels, type CosmicPanelsOptions } from "../../components/cosmic-panels/CosmicPanelsEngine.js";
import type { MotionController } from "../../components/cosmic-panels/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: CosmicPanelsOptions = {}): ReturnType<typeof mountCosmicPanels> {
  return mountCosmicPanels(target, options);
}
export type { CosmicPanelsOptions };
