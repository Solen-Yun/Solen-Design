/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountBloomHexMap, type BloomHexMapOptions } from "../../components/bloom-hex-map/BloomHexMapEngine.js";
import type { MotionController } from "../../components/bloom-hex-map/motion-runtime";

export function BloomHexMap(props: { options?: BloomHexMapOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountBloomHexMap(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="bloom-hex-map" />;
}
