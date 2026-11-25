import { mountHorizontalPinTrack, type HorizontalPinTrackOptions } from "../../components/horizontal-pin-track/HorizontalPinTrackEngine.js";
import type { MotionController } from "../../components/horizontal-pin-track/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: HorizontalPinTrackOptions = {}): ReturnType<typeof mountHorizontalPinTrack> {
  return mountHorizontalPinTrack(target, options);
}
export type { HorizontalPinTrackOptions };
