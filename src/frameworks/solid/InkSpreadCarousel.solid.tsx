/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountInkSpreadCarousel, type InkSpreadCarouselOptions } from "../../components/ink-spread-carousel/InkSpreadCarouselEngine.js";
import type { MotionController } from "../../components/ink-spread-carousel/motion-runtime";

export function InkSpreadCarousel(props: { options?: InkSpreadCarouselOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountInkSpreadCarousel(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="ink-spread-carousel" />;
}
