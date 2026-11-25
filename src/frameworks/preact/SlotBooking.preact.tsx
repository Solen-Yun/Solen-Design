/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountSlotBooking, type SlotBookingOptions } from "../../components/slot-booking/SlotBookingEngine.js";
import type { MotionController } from "../../components/slot-booking/motion-runtime";

export function SlotBooking({ options, className }: { options?: SlotBookingOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountSlotBooking(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="slot-booking" />;
}
