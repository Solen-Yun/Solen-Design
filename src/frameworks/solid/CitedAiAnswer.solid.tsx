/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountCitedAiAnswer, type CitedAiAnswerOptions } from "../../components/cited-ai-answer/CitedAiAnswerEngine.js";
import type { MotionController } from "../../components/cited-ai-answer/motion-runtime";

export function CitedAiAnswer(props: { options?: CitedAiAnswerOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountCitedAiAnswer(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="cited-ai-answer" />;
}
