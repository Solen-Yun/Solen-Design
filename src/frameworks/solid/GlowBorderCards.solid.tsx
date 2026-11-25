/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountGlowBorderCards, type GlowBorderCardsOptions } from "../../components/glow-border-cards/GlowBorderCardsEngine.js";
import type { MotionController } from "../../components/glow-border-cards/motion-runtime";

export function GlowBorderCards(props: { options?: GlowBorderCardsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountGlowBorderCards(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="glow-border-cards" />;
}
