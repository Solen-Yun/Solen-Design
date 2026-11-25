/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountCardSwap, type CardSwapOptions } from "../../components/card-swap/CardSwapEngine.js";
import type { MotionController } from "../../components/card-swap/motion-runtime";

export function CardSwap(props: { options?: CardSwapOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountCardSwap(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="card-swap" />;
}
