/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAiPromptHero, type AiPromptHeroOptions } from "../../components/ai-prompt-hero/AiPromptHeroEngine.js";
import type { MotionController } from "../../components/ai-prompt-hero/motion-runtime";

export function AiPromptHero(props: { options?: AiPromptHeroOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAiPromptHero(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="ai-prompt-hero" />;
}
