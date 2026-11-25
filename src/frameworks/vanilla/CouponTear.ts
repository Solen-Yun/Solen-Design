import { mountCouponTear, type CouponTearOptions } from "../../components/coupon-tear/CouponTearEngine.js";
import type { MotionController } from "../../components/coupon-tear/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: CouponTearOptions = {}): ReturnType<typeof mountCouponTear> {
  return mountCouponTear(target, options);
}
export type { CouponTearOptions };
