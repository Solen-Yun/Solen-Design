/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAiImageGenerate, type AiImageGenerateOptions } from "../../components/ai-image-generate/AiImageGenerateEngine.js";
import type { MotionController } from "../../components/ai-image-generate/motion-runtime";

export function AiImageGenerate(props: { options?: AiImageGenerateOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAiImageGenerate(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="ai-image-generate" />;
}
