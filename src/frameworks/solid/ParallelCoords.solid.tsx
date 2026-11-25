/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountParallelCoords, type ParallelCoordsOptions } from "../../components/parallel-coords/ParallelCoordsEngine.js";
import type { MotionController } from "../../components/parallel-coords/motion-runtime";

export function ParallelCoords(props: { options?: ParallelCoordsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountParallelCoords(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="parallel-coords" />;
}
