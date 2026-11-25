/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountFilterDrawer, type FilterDrawerOptions } from "../../components/filter-drawer/FilterDrawerEngine.js";
import type { MotionController } from "../../components/filter-drawer/motion-runtime";

export function FilterDrawer(props: { options?: FilterDrawerOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountFilterDrawer(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="filter-drawer" />;
}
