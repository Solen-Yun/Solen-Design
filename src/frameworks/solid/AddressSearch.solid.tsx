/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAddressSearch, type AddressSearchOptions } from "../../components/address-search/AddressSearchEngine.js";
import type { MotionController } from "../../components/address-search/motion-runtime";

export function AddressSearch(props: { options?: AddressSearchOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAddressSearch(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="address-search" />;
}
