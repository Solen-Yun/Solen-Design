/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountPrizeWheel, type PrizeWheelOptions } from "../../components/prize-wheel/PrizeWheelEngine.js";
import type { MotionController } from "../../components/prize-wheel/motion-runtime";

export function PrizeWheel(props: { options?: PrizeWheelOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountPrizeWheel(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="prize-wheel" />;
}
