/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountShaderFlood, type ShaderFloodOptions } from "../../components/shader-flood/ShaderFloodEngine.js";
import type { MotionController } from "../../components/shader-flood/motion-runtime";

export function ShaderFlood(props: { options?: ShaderFloodOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountShaderFlood(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="shader-flood" />;
}
