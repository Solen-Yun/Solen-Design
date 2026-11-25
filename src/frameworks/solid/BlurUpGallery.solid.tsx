/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountBlurUpGallery, type BlurUpGalleryOptions } from "../../components/blur-up-gallery/BlurUpGalleryEngine.js";
import type { MotionController } from "../../components/blur-up-gallery/motion-runtime";

export function BlurUpGallery(props: { options?: BlurUpGalleryOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountBlurUpGallery(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="blur-up-gallery" />;
}
