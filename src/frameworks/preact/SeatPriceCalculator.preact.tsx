/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountSeatPriceCalculator, type SeatPriceCalculatorOptions } from "../../components/seat-price-calculator/SeatPriceCalculatorEngine.js";
import type { MotionController } from "../../components/seat-price-calculator/motion-runtime";

export function SeatPriceCalculator({ options, className }: { options?: SeatPriceCalculatorOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountSeatPriceCalculator(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="seat-price-calculator" />;
}
