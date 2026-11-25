/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountCartDrawer, type CartDrawerOptions } from "../../components/cart-drawer/CartDrawerEngine.js";
import type { MotionController } from "../../components/cart-drawer/motion-runtime";

export function CartDrawer(props: { options?: CartDrawerOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountCartDrawer(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="cart-drawer" />;
}
