/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountRidgeline, type RidgelineOptions } from "../../components/ridgeline/RidgelineEngine.js";
import type { MotionController } from "../../components/ridgeline/motion-runtime";

export function Ridgeline(props: { options?: RidgelineOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountRidgeline(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="ridgeline" />;
}
