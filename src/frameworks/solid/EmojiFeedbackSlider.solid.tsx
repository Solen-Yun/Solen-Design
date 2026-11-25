/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountEmojiFeedbackSlider, type EmojiFeedbackSliderOptions } from "../../components/emoji-feedback-slider/EmojiFeedbackSliderEngine.js";
import type { MotionController } from "../../components/emoji-feedback-slider/motion-runtime";

export function EmojiFeedbackSlider(props: { options?: EmojiFeedbackSliderOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountEmojiFeedbackSlider(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="emoji-feedback-slider" />;
}
