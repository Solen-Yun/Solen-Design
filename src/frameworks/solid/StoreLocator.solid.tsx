/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountStoreLocator, type StoreLocatorOptions } from "../../components/store-locator/StoreLocatorEngine.js";
import type { MotionController } from "../../components/store-locator/motion-runtime";

export function StoreLocator(props: { options?: StoreLocatorOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountStoreLocator(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="store-locator" />;
}
