/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountLineMaskReveal, type LineMaskRevealOptions } from "../../components/line-mask-reveal/LineMaskRevealEngine.js";
import type { MotionController } from "../../components/line-mask-reveal/motion-runtime";

export function LineMaskReveal(props: { options?: LineMaskRevealOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountLineMaskReveal(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="line-mask-reveal" />;
}
