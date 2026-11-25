import { mountFluidTooltip, type FluidTooltipOptions } from "../../components/fluid-tooltip/FluidTooltipEngine.js";
import type { MotionController } from "../../components/fluid-tooltip/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: FluidTooltipOptions = {}): ReturnType<typeof mountFluidTooltip> {
  return mountFluidTooltip(target, options);
}
export type { FluidTooltipOptions };
