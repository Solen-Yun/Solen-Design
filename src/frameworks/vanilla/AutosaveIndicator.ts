import { mountAutosaveIndicator, type AutosaveIndicatorOptions } from "../../components/autosave-indicator/AutosaveIndicatorEngine.js";
import type { MotionController } from "../../components/autosave-indicator/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AutosaveIndicatorOptions = {}): ReturnType<typeof mountAutosaveIndicator> {
  return mountAutosaveIndicator(target, options);
}
export type { AutosaveIndicatorOptions };
