/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountDetailExpand, type DetailExpandOptions } from "../../components/detail-expand/DetailExpandEngine.js";
import type { MotionController } from "../../components/detail-expand/motion-runtime";

export function DetailExpand(props: { options?: DetailExpandOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountDetailExpand(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="detail-expand" />;
}
