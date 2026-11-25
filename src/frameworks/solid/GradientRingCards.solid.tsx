/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountGradientRingCards, type GradientRingCardsOptions } from "../../components/gradient-ring-cards/GradientRingCardsEngine.js";
import type { MotionController } from "../../components/gradient-ring-cards/motion-runtime";

export function GradientRingCards(props: { options?: GradientRingCardsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountGradientRingCards(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="gradient-ring-cards" />;
}
