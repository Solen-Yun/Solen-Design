import { mountFlowField, type FlowFieldOptions } from "../../components/flow-field/FlowFieldEngine.js";
import type { MotionController } from "../../components/flow-field/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: FlowFieldOptions = {}): ReturnType<typeof mountFlowField> {
  return mountFlowField(target, options);
}
export type { FlowFieldOptions };
