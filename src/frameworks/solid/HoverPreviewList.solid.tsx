/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountHoverPreviewList, type HoverPreviewListOptions } from "../../components/hover-preview-list/HoverPreviewListEngine.js";
import type { MotionController } from "../../components/hover-preview-list/motion-runtime";

export function HoverPreviewList(props: { options?: HoverPreviewListOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountHoverPreviewList(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="hover-preview-list" />;
}
