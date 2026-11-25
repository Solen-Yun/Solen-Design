/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAiBrandCoverCards, type AiBrandCoverCardsOptions } from "../../components/ai-brand-cover-cards/AiBrandCoverCardsEngine.js";
import type { MotionController } from "../../components/ai-brand-cover-cards/motion-runtime";

export function AiBrandCoverCards(props: { options?: AiBrandCoverCardsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAiBrandCoverCards(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="ai-brand-cover-cards" />;
}
