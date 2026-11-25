/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountGridListFlip, type GridListFlipOptions } from "../../components/grid-list-flip/GridListFlipEngine.js";
import type { MotionController } from "../../components/grid-list-flip/motion-runtime";

export function GridListFlip(props: { options?: GridListFlipOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountGridListFlip(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="grid-list-flip" />;
}
