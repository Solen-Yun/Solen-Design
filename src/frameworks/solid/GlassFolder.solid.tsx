/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountGlassFolder, type GlassFolderOptions } from "../../components/glass-folder/GlassFolderEngine.js";
import type { MotionController } from "../../components/glass-folder/motion-runtime";

export function GlassFolder(props: { options?: GlassFolderOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountGlassFolder(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="glass-folder" />;
}
