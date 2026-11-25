/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountBrandLineCards, type BrandLineCardsOptions } from "../../components/brand-line-cards/BrandLineCardsEngine.js";
import type { MotionController } from "../../components/brand-line-cards/motion-runtime";

export function BrandLineCards(props: { options?: BrandLineCardsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountBrandLineCards(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="brand-line-cards" />;
}
