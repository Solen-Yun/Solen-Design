/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountTopographicContours, type TopographicContoursOptions } from "../../components/topographic-contours/TopographicContoursEngine.js";
import type { MotionController } from "../../components/topographic-contours/motion-runtime";

export function TopographicContours(props: { options?: TopographicContoursOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountTopographicContours(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="topographic-contours" />;
}
