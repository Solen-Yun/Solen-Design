/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSodaCan, type SodaCanOptions } from "../../components/soda-can/SodaCanEngine.js";
import type { MotionController } from "../../components/soda-can/motion-runtime";

export function SodaCan(props: { options?: SodaCanOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSodaCan(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="soda-can" />;
}
