import { mountSlotBooking, type SlotBookingOptions } from "../../components/slot-booking/SlotBookingEngine.js";
import type { MotionController } from "../../components/slot-booking/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SlotBookingOptions = {}): ReturnType<typeof mountSlotBooking> {
  return mountSlotBooking(target, options);
}
export type { SlotBookingOptions };
