import type { MotionOptions, MotionController } from "./motion-runtime";
export type FluidTooltipOptions = MotionOptions & { active?: "today" | "tasks" | "calendar" | "focus" | "settings" | "profile"; onSelect?: (id: string) => void; profileLabel?: string; logoSrc?: string };
export function mountFluidTooltip(target: HTMLElement, options?: FluidTooltipOptions): Omit<MotionController, "update"> & { update(options: FluidTooltipOptions): void };
