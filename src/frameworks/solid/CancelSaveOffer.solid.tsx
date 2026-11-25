/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountCancelSaveOffer, type CancelSaveOfferOptions } from "../../components/cancel-save-offer/CancelSaveOfferEngine.js";
import type { MotionController } from "../../components/cancel-save-offer/motion-runtime";

export function CancelSaveOffer(props: { options?: CancelSaveOfferOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountCancelSaveOffer(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="cancel-save-offer" />;
}
