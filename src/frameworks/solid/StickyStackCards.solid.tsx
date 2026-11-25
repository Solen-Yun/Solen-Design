/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountStickyStackCards, type StickyStackCardsOptions } from "../../components/sticky-stack-cards/StickyStackCardsEngine.js";
import type { MotionController } from "../../components/sticky-stack-cards/motion-runtime";

export function StickyStackCards(props: { options?: StickyStackCardsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountStickyStackCards(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="sticky-stack-cards" />;
}
