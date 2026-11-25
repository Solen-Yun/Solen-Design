/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSectionColorShift, type SectionColorShiftOptions } from "../../components/section-color-shift/SectionColorShiftEngine.js";
import type { MotionController } from "../../components/section-color-shift/motion-runtime";

export function SectionColorShift(props: { options?: SectionColorShiftOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSectionColorShift(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="section-color-shift" />;
}
