import { mountDrumTimePicker, type DrumTimePickerOptions } from "../../components/drum-time-picker/DrumTimePickerEngine.js";
import type { MotionController } from "../../components/drum-time-picker/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: DrumTimePickerOptions = {}): ReturnType<typeof mountDrumTimePicker> {
  return mountDrumTimePicker(target, options);
}
export type { DrumTimePickerOptions };
