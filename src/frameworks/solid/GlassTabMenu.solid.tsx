/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountGlassTabMenu, type GlassTabMenuOptions } from "../../components/glass-tab-menu/GlassTabMenuEngine.js";
import type { MotionController } from "../../components/glass-tab-menu/motion-runtime";

export function GlassTabMenu(props: { options?: GlassTabMenuOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountGlassTabMenu(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="glass-tab-menu" />;
}
