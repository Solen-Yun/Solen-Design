/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountStackedMetadata, type StackedMetadataOptions } from "../../components/stacked-metadata/StackedMetadataEngine.js";
import type { MotionController } from "../../components/stacked-metadata/motion-runtime";

export function StackedMetadata(props: { options?: StackedMetadataOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountStackedMetadata(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="stacked-metadata" />;
}
