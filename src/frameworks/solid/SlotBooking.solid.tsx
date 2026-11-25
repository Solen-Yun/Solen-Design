/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSlotBooking, type SlotBookingOptions } from "../../components/slot-booking/SlotBookingEngine.js";
import type { MotionController } from "../../components/slot-booking/motion-runtime";

export function SlotBooking(props: { options?: SlotBookingOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSlotBooking(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="slot-booking" />;
}
