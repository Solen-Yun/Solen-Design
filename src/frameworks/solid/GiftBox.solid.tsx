/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountGiftBox, type GiftBoxOptions } from "../../components/gift-box/GiftBoxEngine.js";
import type { MotionController } from "../../components/gift-box/motion-runtime";

export function GiftBox(props: { options?: GiftBoxOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountGiftBox(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="gift-box" />;
}
