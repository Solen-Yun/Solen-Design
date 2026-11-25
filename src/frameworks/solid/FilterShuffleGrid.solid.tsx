/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountFilterShuffleGrid, type FilterShuffleGridOptions } from "../../components/filter-shuffle-grid/FilterShuffleGridEngine.js";
import type { MotionController } from "../../components/filter-shuffle-grid/motion-runtime";

export function FilterShuffleGrid(props: { options?: FilterShuffleGridOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountFilterShuffleGrid(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="filter-shuffle-grid" />;
}
