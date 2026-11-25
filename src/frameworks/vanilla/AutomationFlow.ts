import { mountAutomationFlow, type AutomationFlowOptions } from "../../components/automation-flow/AutomationFlowEngine.js";
import type { MotionController } from "../../components/automation-flow/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AutomationFlowOptions = {}): ReturnType<typeof mountAutomationFlow> {
  return mountAutomationFlow(target, options);
}
export type { AutomationFlowOptions };
