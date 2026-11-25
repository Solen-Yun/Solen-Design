/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountHorizontalPinTrack, type HorizontalPinTrackOptions } from "../../components/horizontal-pin-track/HorizontalPinTrackEngine.js";
import type { MotionController } from "../../components/horizontal-pin-track/motion-runtime";

export function HorizontalPinTrack(props: { options?: HorizontalPinTrackOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountHorizontalPinTrack(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="horizontal-pin-track" />;
}
