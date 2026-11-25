import { mountA11yPanel, type A11yPanelOptions } from "../../components/a11y-panel/A11yPanelEngine.js";
import type { MotionController } from "../../components/a11y-panel/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: A11yPanelOptions = {}): ReturnType<typeof mountA11yPanel> {
  return mountA11yPanel(target, options);
}
export type { A11yPanelOptions };
