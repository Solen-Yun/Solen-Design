/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAccordionImagePanels, type AccordionImagePanelsOptions } from "../../components/accordion-image-panels/AccordionImagePanelsEngine.js";
import type { MotionController } from "../../components/accordion-image-panels/motion-runtime";

export function AccordionImagePanels(props: { options?: AccordionImagePanelsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAccordionImagePanels(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="accordion-image-panels" />;
}
