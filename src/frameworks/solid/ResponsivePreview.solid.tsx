/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountResponsivePreview, type ResponsivePreviewOptions } from "../../components/responsive-preview/ResponsivePreviewEngine.js";
import type { MotionController } from "../../components/responsive-preview/motion-runtime";

export function ResponsivePreview(props: { options?: ResponsivePreviewOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountResponsivePreview(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="responsive-preview" />;
}
