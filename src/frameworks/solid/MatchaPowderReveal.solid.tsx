/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountMatchaPowderReveal, type MatchaPowderRevealOptions } from "../../components/matcha-powder-reveal/MatchaPowderRevealEngine.js";
import type { MotionController } from "../../components/matcha-powder-reveal/motion-runtime";

export function MatchaPowderReveal(props: { options?: MatchaPowderRevealOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountMatchaPowderReveal(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="matcha-powder-reveal" />;
}
