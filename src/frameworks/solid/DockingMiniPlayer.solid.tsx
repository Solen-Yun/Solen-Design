/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountDockingMiniPlayer, type DockingMiniPlayerOptions } from "../../components/docking-mini-player/DockingMiniPlayerEngine.js";
import type { MotionController } from "../../components/docking-mini-player/motion-runtime";

export function DockingMiniPlayer(props: { options?: DockingMiniPlayerOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountDockingMiniPlayer(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="docking-mini-player" />;
}
