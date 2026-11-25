/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountMapPinDrop, type MapPinDropOptions } from "../../components/map-pin-drop/MapPinDropEngine.js";
import type { MotionController } from "../../components/map-pin-drop/motion-runtime";

export function MapPinDrop(props: { options?: MapPinDropOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountMapPinDrop(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="map-pin-drop" />;
}
