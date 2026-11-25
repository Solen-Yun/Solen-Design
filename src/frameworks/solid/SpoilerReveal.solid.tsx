/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSpoilerReveal, type SpoilerRevealOptions } from "../../components/spoiler-reveal/SpoilerRevealEngine.js";
import type { MotionController } from "../../components/spoiler-reveal/motion-runtime";

export function SpoilerReveal(props: { options?: SpoilerRevealOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSpoilerReveal(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="spoiler-reveal" />;
}
