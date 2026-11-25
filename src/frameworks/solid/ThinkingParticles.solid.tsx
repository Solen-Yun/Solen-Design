/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountThinkingParticles, type ThinkingParticlesOptions } from "../../components/thinking-particles/ThinkingParticlesEngine.js";
import type { MotionController } from "../../components/thinking-particles/motion-runtime";

export function ThinkingParticles(props: { options?: ThinkingParticlesOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountThinkingParticles(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="thinking-particles" />;
}
