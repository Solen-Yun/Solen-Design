/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountCouponTear, type CouponTearOptions } from "../../components/coupon-tear/CouponTearEngine.js";
import type { MotionController } from "../../components/coupon-tear/motion-runtime";

export function CouponTear({ options, className }: { options?: CouponTearOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountCouponTear(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="coupon-tear" />;
}
