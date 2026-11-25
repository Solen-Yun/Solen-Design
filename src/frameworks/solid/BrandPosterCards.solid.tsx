/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountBrandPosterCards, type BrandPosterCardsOptions } from "../../components/brand-poster-cards/BrandPosterCardsEngine.js";
import type { MotionController } from "../../components/brand-poster-cards/motion-runtime";

export function BrandPosterCards(props: { options?: BrandPosterCardsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountBrandPosterCards(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="brand-poster-cards" />;
}
