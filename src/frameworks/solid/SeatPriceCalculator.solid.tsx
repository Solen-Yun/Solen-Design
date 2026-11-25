/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSeatPriceCalculator, type SeatPriceCalculatorOptions } from "../../components/seat-price-calculator/SeatPriceCalculatorEngine.js";
import type { MotionController } from "../../components/seat-price-calculator/motion-runtime";

export function SeatPriceCalculator(props: { options?: SeatPriceCalculatorOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSeatPriceCalculator(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="seat-price-calculator" />;
}
