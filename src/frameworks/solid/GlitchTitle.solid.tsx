/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountGlitchTitle, type GlitchTitleOptions } from "../../components/glitch-title/GlitchTitleEngine.js";
import type { MotionController } from "../../components/glitch-title/motion-runtime";

export function GlitchTitle(props: { options?: GlitchTitleOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountGlitchTitle(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="glitch-title" />;
}
