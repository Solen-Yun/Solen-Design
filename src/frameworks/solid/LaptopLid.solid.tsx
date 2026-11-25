/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountLaptopLid, type LaptopLidOptions } from "../../components/laptop-lid/LaptopLidEngine.js";
import type { MotionController } from "../../components/laptop-lid/motion-runtime";

export function LaptopLid(props: { options?: LaptopLidOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountLaptopLid(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="laptop-lid" />;
}
