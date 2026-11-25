/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountDragCardCarousel, type DragCardCarouselOptions } from "../../components/drag-card-carousel/DragCardCarouselEngine.js";
import type { MotionController } from "../../components/drag-card-carousel/motion-runtime";

export function DragCardCarousel(props: { options?: DragCardCarouselOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountDragCardCarousel(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="drag-card-carousel" />;
}
