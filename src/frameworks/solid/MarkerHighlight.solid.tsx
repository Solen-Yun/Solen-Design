/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountMarkerHighlight, type MarkerHighlightOptions } from "../../components/marker-highlight/MarkerHighlightEngine.js";
import type { MotionController } from "../../components/marker-highlight/motion-runtime";

export function MarkerHighlight(props: { options?: MarkerHighlightOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountMarkerHighlight(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="marker-highlight" />;
}
