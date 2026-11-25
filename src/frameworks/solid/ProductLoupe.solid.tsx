/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountProductLoupe, type ProductLoupeOptions } from "../../components/product-loupe/ProductLoupeEngine.js";
import type { MotionController } from "../../components/product-loupe/motion-runtime";

export function ProductLoupe(props: { options?: ProductLoupeOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountProductLoupe(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="product-loupe" />;
}
