import type { MotionOptions, MotionController } from "./motion-runtime";
export type ReasoningEffortSliderOptions = MotionOptions & { value?: "simple" | "medium" | "deep"; onValueChange?: (value: "simple" | "medium" | "deep") => void; disabled?: boolean };
export function mountReasoningEffortSlider(target: HTMLElement, options?: ReasoningEffortSliderOptions): Omit<MotionController, "update"> & { update(options: ReasoningEffortSliderOptions): void };
