/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountQuoteShareTooltip, type QuoteShareTooltipOptions } from "../../components/quote-share-tooltip/QuoteShareTooltipEngine.js";
import type { MotionController } from "../../components/quote-share-tooltip/motion-runtime";

export function QuoteShareTooltip(props: { options?: QuoteShareTooltipOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountQuoteShareTooltip(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="quote-share-tooltip" />;
}
