/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSeoPreview, type SeoPreviewOptions } from "../../components/seo-preview/SeoPreviewEngine.js";
import type { MotionController } from "../../components/seo-preview/motion-runtime";

export function SeoPreview(props: { options?: SeoPreviewOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSeoPreview(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="seo-preview" />;
}
