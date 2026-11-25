/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAiImageGeneration, type AiImageGenerationOptions } from "../../components/ai-image-generation/AiImageGenerationEngine.js";
import type { MotionController } from "../../components/ai-image-generation/motion-runtime";

export function AiImageGeneration(props: { options?: AiImageGenerationOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAiImageGeneration(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="ai-generating" />;
}
