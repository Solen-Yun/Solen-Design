/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountGrowthBubbles, type GrowthBubblesOptions } from "../../components/growth-bubbles/GrowthBubblesEngine.js";
import type { MotionController } from "../../components/growth-bubbles/motion-runtime";

export function GrowthBubbles(props: { options?: GrowthBubblesOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountGrowthBubbles(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="growth-bubbles" />;
}
