/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountProductHotspots, type ProductHotspotsOptions } from "../../components/product-hotspots/ProductHotspotsEngine.js";
import type { MotionController } from "../../components/product-hotspots/motion-runtime";

export function ProductHotspots(props: { options?: ProductHotspotsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountProductHotspots(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="product-hotspots" />;
}
