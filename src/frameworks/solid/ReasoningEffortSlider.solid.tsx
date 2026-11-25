/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountReasoningEffortSlider, type ReasoningEffortSliderOptions } from "../../components/reasoning-effort-slider/ReasoningEffortSliderEngine.js";
import type { MotionController } from "../../components/reasoning-effort-slider/motion-runtime";

export function ReasoningEffortSlider(props: { options?: ReasoningEffortSliderOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountReasoningEffortSlider(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="reasoning-effort-slider" />;
}
