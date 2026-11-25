/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountTestimonialColumns, type TestimonialColumnsOptions } from "../../components/testimonial-columns/TestimonialColumnsEngine.js";
import type { MotionController } from "../../components/testimonial-columns/motion-runtime";

export function TestimonialColumns(props: { options?: TestimonialColumnsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountTestimonialColumns(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="testimonial-columns" />;
}
