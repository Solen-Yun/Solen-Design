/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountCouponTear, type CouponTearOptions } from "../../components/coupon-tear/CouponTearEngine.js";
import type { MotionController } from "../../components/coupon-tear/motion-runtime";

export function CouponTear(props: { options?: CouponTearOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountCouponTear(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="coupon-tear" />;
}
