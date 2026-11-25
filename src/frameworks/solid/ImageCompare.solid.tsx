/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountImageCompare, type ImageCompareOptions } from "../../components/image-compare/ImageCompareEngine.js";
import type { MotionController } from "../../components/image-compare/motion-runtime";

export function ImageCompare(props: { options?: ImageCompareOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountImageCompare(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="image-compare" />;
}
