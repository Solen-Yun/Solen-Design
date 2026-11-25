/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountCategoryChipScrollspy, type CategoryChipScrollspyOptions } from "../../components/category-chip-scrollspy/CategoryChipScrollspyEngine.js";
import type { MotionController } from "../../components/category-chip-scrollspy/motion-runtime";

export function CategoryChipScrollspy(props: { options?: CategoryChipScrollspyOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountCategoryChipScrollspy(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="category-chip-scrollspy" />;
}
