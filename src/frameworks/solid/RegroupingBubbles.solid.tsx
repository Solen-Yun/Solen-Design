/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountRegroupingBubbles, type RegroupingBubblesOptions } from "../../components/regrouping-bubbles/RegroupingBubblesEngine.js";
import type { MotionController } from "../../components/regrouping-bubbles/motion-runtime";

export function RegroupingBubbles(props: { options?: RegroupingBubblesOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountRegroupingBubbles(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="regrouping-bubbles" />;
}
