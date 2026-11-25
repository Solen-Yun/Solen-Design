/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountBlurInQuote, type BlurInQuoteOptions } from "../../components/blur-in-quote/BlurInQuoteEngine.js";
import type { MotionController } from "../../components/blur-in-quote/motion-runtime";

export function BlurInQuote(props: { options?: BlurInQuoteOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountBlurInQuote(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="blur-in-quote" />;
}
