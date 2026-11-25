/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSortFlipList, type SortFlipListOptions } from "../../components/sort-flip-list/SortFlipListEngine.js";
import type { MotionController } from "../../components/sort-flip-list/motion-runtime";

export function SortFlipList(props: { options?: SortFlipListOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSortFlipList(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="sort-flip-list" />;
}
