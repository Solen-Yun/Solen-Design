/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountImageAccordion, type ImageAccordionOptions } from "../../components/image-accordion/ImageAccordionEngine.js";
import type { MotionController } from "../../components/image-accordion/motion-runtime";

export function ImageAccordion(props: { options?: ImageAccordionOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountImageAccordion(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="image-accordion" />;
}
