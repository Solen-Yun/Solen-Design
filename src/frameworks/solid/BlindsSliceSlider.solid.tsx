/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountBlindsSliceSlider, type BlindsSliceSliderOptions } from "../../components/blinds-slice-slider/BlindsSliceSliderEngine.js";
import type { MotionController } from "../../components/blinds-slice-slider/motion-runtime";

export function BlindsSliceSlider(props: { options?: BlindsSliceSliderOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountBlindsSliceSlider(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="blinds-slice-slider" />;
}
