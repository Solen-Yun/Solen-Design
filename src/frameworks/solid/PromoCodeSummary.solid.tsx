/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountPromoCodeSummary, type PromoCodeSummaryOptions } from "../../components/promo-code-summary/PromoCodeSummaryEngine.js";
import type { MotionController } from "../../components/promo-code-summary/motion-runtime";

export function PromoCodeSummary(props: { options?: PromoCodeSummaryOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountPromoCodeSummary(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="promo-code-summary" />;
}
