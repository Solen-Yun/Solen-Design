/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAiTldr, type AiTldrOptions } from "../../components/ai-tldr/AiTldrEngine.js";
import type { MotionController } from "../../components/ai-tldr/motion-runtime";

export function AiTldr(props: { options?: AiTldrOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAiTldr(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="ai-tldr" />;
}
