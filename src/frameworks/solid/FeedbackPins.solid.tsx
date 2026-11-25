/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountFeedbackPins, type FeedbackPinsOptions } from "../../components/feedback-pins/FeedbackPinsEngine.js";
import type { MotionController } from "../../components/feedback-pins/motion-runtime";

export function FeedbackPins(props: { options?: FeedbackPinsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountFeedbackPins(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="feedback-pins" />;
}
