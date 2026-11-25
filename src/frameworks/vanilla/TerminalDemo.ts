import { mountTerminalDemo, type TerminalDemoOptions } from "../../components/terminal-demo/TerminalDemoEngine.js";
import type { MotionController } from "../../components/terminal-demo/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TerminalDemoOptions = {}): ReturnType<typeof mountTerminalDemo> {
  return mountTerminalDemo(target, options);
}
export type { TerminalDemoOptions };
