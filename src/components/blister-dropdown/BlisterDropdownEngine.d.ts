import type { MotionOptions, MotionController } from "./motion-runtime";
export type BlisterDropdownOptions = MotionOptions & { value?: "all" | "open" | "closed"; expanded?: boolean; autoClose?: boolean; sound?: boolean; counts?: Partial<Record<"all" | "open" | "closed", number>>; onValueChange?: (value: "all" | "open" | "closed") => void };
export function mountBlisterDropdown(target: HTMLElement, options?: BlisterDropdownOptions): Omit<MotionController, "update"> & { update(options: BlisterDropdownOptions): void };
