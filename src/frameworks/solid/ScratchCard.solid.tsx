/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountScratchCard, type ScratchCardOptions } from "../../components/scratch-card/ScratchCardEngine.js";
import type { MotionController } from "../../components/scratch-card/motion-runtime";

export function ScratchCard(props: { options?: ScratchCardOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountScratchCard(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="scratch-card" />;
}
